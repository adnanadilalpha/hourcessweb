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
  updateInviteStatus,
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

type InviteStatus = "pending" | "invited" | "installed" | "declined";

type Row = {
  id: string;
  email: string;
  source: string;
  created_at: string;
  read_at: string | null;
  notes: string | null;
  email_status: string;
  email_error: string | null;
  full_name: string | null;
  apple_id_email: string | null;
  device_model: string | null;
  ios_version: string | null;
  invite_status: string | null;
};

function statusVariant(status: string): "success" | "destructive" | "warning" | "secondary" {
  switch (status) {
    case "sent":
    case "invited":
    case "installed":
      return "success";
    case "failed":
    case "declined":
      return "destructive";
    case "skipped":
    case "pending":
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
        <p className="text-base font-medium text-zinc-900">No beta requests yet</p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          TestFlight requests from the homepage appear here. Send invites in App Store Connect.
        </p>
      </Card>
    );
  }

  const unread = rows.filter((r) => !r.read_at).length;
  const pendingInvite = rows.filter((r) => (r.invite_status || "pending") === "pending").length;
  const failed = rows.filter((r) => r.email_status === "failed").length;

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="secondary">{rows.length} total</Badge>
        {pendingInvite > 0 ? <Badge variant="warning">{pendingInvite} await invite</Badge> : null}
        {unread > 0 ? <Badge variant="default">{unread} unread</Badge> : null}
        {failed > 0 ? <Badge variant="destructive">{failed} email failed</Badge> : null}
      </div>

      <Card className="overflow-hidden p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Tester</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Invite</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const tfEmail = row.apple_id_email || row.email;
              const invite = (row.invite_status || "pending") as InviteStatus;
              return (
                <TableRow
                  key={row.id}
                  data-state={!row.read_at ? "selected" : undefined}
                  className={row.read_at ? "opacity-60" : undefined}
                >
                  <TableCell>
                    <p className="font-medium text-zinc-900">{row.full_name || "—"}</p>
                    <a
                      href={`mailto:${row.email}`}
                      className="text-xs text-admin-accent hover:underline"
                    >
                      {row.email}
                    </a>
                    {tfEmail !== row.email ? (
                      <p className="mt-0.5 text-xs text-zinc-400">TF: {tfEmail}</p>
                    ) : (
                      <p className="mt-0.5 text-xs text-zinc-400">Apple ID = email</p>
                    )}
                    <p className="mt-0.5 text-[10px] text-zinc-400">
                      {new Date(row.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </TableCell>
                  <TableCell className="text-xs text-zinc-500">
                    <p>{row.device_model || "—"}</p>
                    <p className="text-zinc-400">{row.ios_version ? `iOS ${row.ios_version}` : ""}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(invite)}>{invite}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <Badge variant={statusVariant(row.email_status)}>{row.email_status}</Badge>
                      {row.email_error ? (
                        <p className="max-w-xs text-xs leading-snug text-red-600">{row.email_error}</p>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="min-w-40">
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
                        <DropdownMenuItem
                          onClick={() =>
                            start(async () => {
                              await updateInviteStatus(row.id, "invited");
                              toast.success("Marked invited in TestFlight");
                            })
                          }
                        >
                          Mark TestFlight invited
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            start(async () => {
                              await updateInviteStatus(row.id, "installed");
                              toast.success("Marked installed");
                            })
                          }
                        >
                          Mark installed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            start(async () => {
                              await updateInviteStatus(row.id, "pending");
                              toast.success("Invite set to pending");
                            })
                          }
                        >
                          Reset invite to pending
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete beta request?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes <strong>{deleteTarget?.email}</strong> from the beta list. This cannot be
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
