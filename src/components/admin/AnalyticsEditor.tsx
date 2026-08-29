"use client";

import { useState, useTransition } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteAppMetric, upsertAppMetric } from "@/lib/actions/analytics";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Metric = {
  id: string;
  metric_key: string;
  metric_label: string;
  metric_value: number;
  period: string;
  notes: string | null;
};

export default function AnalyticsEditor({ metrics }: { metrics: Metric[] }) {
  const [pending, start] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<Metric | null>(null);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-zinc-900">Managed metrics</h2>
        <p className="mt-1 text-sm text-zinc-500">Custom numbers for reporting — separate from live app counts.</p>
      </div>

      <div className="grid gap-4">
        {metrics.length === 0 ? (
          <Card className="border-dashed px-6 py-12 text-center">
            <p className="text-sm text-zinc-500">No metrics yet. Add your first one below.</p>
          </Card>
        ) : (
          metrics.map((m) => (
            <Card key={m.id} className="p-5">
              <form
                className="grid gap-4 md:grid-cols-[1.2fr_0.5fr_0.5fr_auto]"
                action={(fd) => {
                  start(async () => {
                    const result = await upsertAppMetric({
                      id: m.id,
                      metric_key: String(fd.get("metric_key") ?? m.metric_key),
                      metric_label: String(fd.get("metric_label") ?? m.metric_label),
                      metric_value: Number(fd.get("metric_value") ?? 0),
                      period: String(fd.get("period") ?? "all_time"),
                      notes: String(fd.get("notes") ?? ""),
                    });
                    if (result.ok) toast.success("Saved");
                    else toast.error(result.error || "Failed");
                  });
                }}
              >
                <div className="space-y-1.5">
                  <Label>Label</Label>
                  <Input name="metric_label" defaultValue={m.metric_label} />
                  <input type="hidden" name="metric_key" value={m.metric_key} />
                </div>
                <div className="space-y-1.5">
                  <Label>Value</Label>
                  <Input name="metric_value" type="number" step="any" defaultValue={Number(m.metric_value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Period</Label>
                  <Input name="period" defaultValue={m.period} />
                </div>
                <div className="flex items-end gap-2">
                  <Button type="submit" size="sm" disabled={pending}>
                    <Save className="size-3.5" />
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={pending}
                    onClick={() => setDeleteTarget(m)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </form>
            </Card>
          ))
        )}
      </div>

      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Add metric</CardTitle>
          <CardDescription>Use snake_case keys like beta_users or waitlist_goal.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-3 md:grid-cols-4"
            action={(fd) => {
              start(async () => {
                const key = String(fd.get("metric_key") ?? "").trim();
                const label = String(fd.get("metric_label") ?? "").trim();
                if (!key || !label) {
                  toast.error("Key and label required");
                  return;
                }
                const result = await upsertAppMetric({
                  metric_key: key,
                  metric_label: label,
                  metric_value: Number(fd.get("metric_value") ?? 0),
                  period: "all_time",
                });
                if (result.ok) toast.success("Metric added");
                else toast.error(result.error || "Failed");
              });
            }}
          >
            <Input name="metric_key" placeholder="metric_key" />
            <Input name="metric_label" placeholder="Display label" />
            <Input name="metric_value" type="number" defaultValue={0} />
            <Button type="submit" disabled={pending}>
              <Plus className="size-4" />
              Add
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete metric?</AlertDialogTitle>
            <AlertDialogDescription>
              Remove <strong>{deleteTarget?.metric_label}</strong> from managed metrics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (!deleteTarget) return;
                start(async () => {
                  await deleteAppMetric(deleteTarget.id);
                  toast.success("Deleted");
                  setDeleteTarget(null);
                });
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
