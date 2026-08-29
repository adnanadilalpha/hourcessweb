"use client";

import { useState, useTransition } from "react";
import {
  CheckCheck,
  Mail,
  MoreHorizontal,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  deleteWaitlistEntry,
  markWaitlistRead,
  resendWaitlistEmail,
  updateWaitlistNotes,
} from "@/lib/actions/waitlist";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Row = {
  id: string;
  email: string;
  source: string;
  created_at: string;
  read_at: string | null;
  notes: string | null;
  email_status: string;
  email_error: string | null;
};

function statusVariant(status: string): "success" | "destructive" | "warning" | "secondary" {
  switch (status) {
    case "sent":
      return "success";
    case "failed":
      return "destructive";
    case "skipped":
      return "warning";
    default:
      return "secondary";
  }
}

export default function WaitlistTable({ rows }: { rows: Row[] }) {
  const [pending, start] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);

  if (rows.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center border-dashed px-6 py-20 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-zinc-100">
          <Mail className="size-6 text-zinc-400" />
        </div>
        <p className="text-base font-medium text-zinc-900">No signups yet</p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          When someone joins from the homepage, they&apos;ll show up here with email delivery status.
        </p>
      </Card>
    );
  }

  const unread = rows.filter((r) => !r.read_at).length;
  const failed = rows.filter((r) => r.email_status === "failed").length;

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary">{rows.length} total</Badge>
        {unread > 0 ? <Badge variant="default">{unread} unread</Badge> : null}
        {failed > 0 ? <Badge variant="destructive">{failed} failed</Badge> : null}
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Email</TableHead>
              <TableHead>Signed up</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={!row.read_at ? "selected" : undefined}
                className={row.read_at ? "opacity-60" : undefined}
              >
                <TableCell>
                  <a
                    href={`mailto:${row.email}`}
                    className="font-medium text-zinc-900 hover:text-admin-accent"
                  >
                    {row.email}
                  </a>
                  <p className="mt-0.5 text-xs text-zinc-400">{row.source}</p>
                </TableCell>
                <TableCell className="text-xs text-zinc-500">
                  {new Date(row.created_at).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell>
                  <div className="space-y-1.5">
                    <Badge variant={statusVariant(row.email_status)}>{row.email_status}</Badge>
                    {row.email_error ? (
                      <p className="max-w-xs text-xs leading-snug text-red-600">{row.email_error}</p>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="min-w-44">
                  <Input
                    defaultValue={row.notes ?? ""}
                    disabled={pending}
                    placeholder="Add note…"
                    className="h-9 text-xs"
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === (row.notes ?? "")) return;
                      start(async () => {
                        await updateWaitlistNotes(row.id, value);
                        toast.success("Note saved");
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" disabled={pending}>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {(row.email_status === "failed" || row.email_status === "skipped") && (
                        <DropdownMenuItem
                          onClick={() =>
                            start(async () => {
                              const result = await resendWaitlistEmail(row.id);
                              if (result.ok) toast.success(`Email sent to ${row.email}`);
                              else toast.error(result.error ?? "Resend failed");
                            })
                          }
                        >
                          <RotateCcw className="size-4" />
                          Resend email
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        onClick={() =>
                          start(async () => {
                            await markWaitlistRead(row.id, !row.read_at);
                            toast.success(row.read_at ? "Marked unread" : "Marked read");
                          })
                        }
                      >
                        <CheckCheck className="size-4" />
                        {row.read_at ? "Mark unread" : "Mark read"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => setDeleteTarget(row)}
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete waitlist entry?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes <strong>{deleteTarget?.email}</strong> from the waitlist. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (!deleteTarget) return;
                start(async () => {
                  await deleteWaitlistEntry(deleteTarget.id);
                  toast.success("Entry deleted");
                  setDeleteTarget(null);
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
