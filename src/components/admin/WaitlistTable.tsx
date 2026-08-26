"use client";

import { useTransition } from "react";
import {
  deleteWaitlistEntry,
  markWaitlistRead,
  updateWaitlistNotes,
} from "@/lib/actions/waitlist";

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

export default function WaitlistTable({ rows }: { rows: Row[] }) {
  const [pending, start] = useTransition();

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
        <p className="font-ui text-secondary">No website waitlist signups yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 text-left">
          <thead className="bg-[#121216] font-ui text-[11px] uppercase tracking-[0.18em] text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">When</th>
              <th className="px-4 py-3 font-medium">Notify</th>
              <th className="px-4 py-3 font-medium">Notes</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-black/20">
            {rows.map((row) => (
              <tr key={row.id} className={row.read_at ? "opacity-70" : ""}>
                <td className="px-4 py-3 font-ui text-sm">
                  <a href={`mailto:${row.email}`} className="text-lavender hover:underline">
                    {row.email}
                  </a>
                  <p className="mt-0.5 text-[11px] text-secondary">{row.source}</p>
                </td>
                <td className="px-4 py-3 font-ui text-xs text-secondary">
                  {new Date(row.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-ui text-xs capitalize text-secondary">
                  {row.email_status}
                  {row.email_error ? (
                    <span className="mt-1 block text-red-400">{row.email_error}</span>
                  ) : null}
                </td>
                <td className="px-4 py-3">
                  <input
                    defaultValue={row.notes ?? ""}
                    disabled={pending}
                    placeholder="Add note…"
                    className="w-full rounded-lg border border-white/10 bg-black/40 px-2 py-1.5 font-ui text-xs text-primary outline-none focus:border-lavender/40"
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === (row.notes ?? "")) return;
                      start(() => updateWaitlistNotes(row.id, value));
                    }}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={pending}
                      className="rounded-lg border border-white/12 px-2 py-1 font-ui text-[11px] text-secondary hover:text-primary"
                      onClick={() =>
                        start(() => markWaitlistRead(row.id, !row.read_at))
                      }
                    >
                      {row.read_at ? "Unread" : "Read"}
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      className="rounded-lg border border-red-500/30 px-2 py-1 font-ui text-[11px] text-red-300 hover:bg-red-500/10"
                      onClick={() => {
                        if (confirm(`Delete ${row.email}?`)) {
                          start(() => deleteWaitlistEntry(row.id));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
