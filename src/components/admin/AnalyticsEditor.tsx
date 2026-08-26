"use client";

import { useState, useTransition } from "react";
import { deleteAppMetric, upsertAppMetric } from "@/lib/actions/analytics";

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
  const [message, setMessage] = useState<string | null>(null);

  return (
    <section className="space-y-4">
      <h2 className="font-display text-lg font-semibold">Admin-managed metrics</h2>
      {message ? <p className="font-ui text-sm text-lavender">{message}</p> : null}

      <div className="space-y-3">
        {metrics.map((m) => (
          <form
            key={m.id}
            className="grid gap-3 rounded-2xl border border-white/10 bg-[#121216] p-4 md:grid-cols-[1.2fr_0.6fr_0.6fr_auto]"
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
                setMessage(result.ok ? "Saved." : result.error || "Failed.");
              });
            }}
          >
            <label className="block">
              <span className="font-ui text-[11px] text-secondary">Label</span>
              <input
                name="metric_label"
                defaultValue={m.metric_label}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-ui text-sm outline-none focus:border-lavender/40"
              />
              <input type="hidden" name="metric_key" value={m.metric_key} />
            </label>
            <label className="block">
              <span className="font-ui text-[11px] text-secondary">Value</span>
              <input
                name="metric_value"
                type="number"
                step="any"
                defaultValue={Number(m.metric_value)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-ui text-sm outline-none focus:border-lavender/40"
              />
            </label>
            <label className="block">
              <span className="font-ui text-[11px] text-secondary">Period</span>
              <input
                name="period"
                defaultValue={m.period}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-ui text-sm outline-none focus:border-lavender/40"
              />
            </label>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                disabled={pending}
                className="rounded-lg bg-lavender px-3 py-2 font-ui text-xs font-medium text-ink disabled:opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                disabled={pending}
                className="rounded-lg border border-red-500/30 px-3 py-2 font-ui text-xs text-red-300"
                onClick={() => {
                  if (confirm(`Delete ${m.metric_label}?`)) {
                    start(() => deleteAppMetric(m.id));
                  }
                }}
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <form
        className="rounded-2xl border border-dashed border-white/15 p-4"
        action={(fd) => {
          start(async () => {
            const key = String(fd.get("metric_key") ?? "").trim();
            const label = String(fd.get("metric_label") ?? "").trim();
            if (!key || !label) {
              setMessage("Key and label required.");
              return;
            }
            const result = await upsertAppMetric({
              metric_key: key,
              metric_label: label,
              metric_value: Number(fd.get("metric_value") ?? 0),
              period: String(fd.get("period") ?? "all_time"),
            });
            setMessage(result.ok ? "Metric added." : result.error || "Failed.");
          });
        }}
      >
        <p className="mb-3 font-ui text-sm text-secondary">Add metric</p>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            name="metric_key"
            placeholder="metric_key"
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-ui text-sm outline-none"
          />
          <input
            name="metric_label"
            placeholder="Label"
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-ui text-sm outline-none"
          />
          <input
            name="metric_value"
            type="number"
            defaultValue={0}
            className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-ui text-sm outline-none"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-lavender px-3 py-2 font-ui text-sm font-medium text-ink"
          >
            Add
          </button>
        </div>
        <input type="hidden" name="period" value="all_time" />
      </form>
    </section>
  );
}
