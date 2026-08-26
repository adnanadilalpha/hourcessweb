import Link from "next/link";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppTableCounts } from "@/lib/actions/analytics";

export default async function AdminOverviewPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const [{ count: waitlistCount }, { count: unreadCount }, metrics, appCounts] =
    await Promise.all([
      supabase.from("admin_website_waitlist").select("*", { count: "exact", head: true }),
      supabase
        .from("admin_website_waitlist")
        .select("*", { count: "exact", head: true })
        .is("read_at", null),
      supabase
        .from("admin_app_analytics")
        .select("*")
        .order("metric_label", { ascending: true }),
      getAppTableCounts(),
    ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 font-ui text-sm text-secondary">
          Website waitlist and app analytics — admin tables only.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Waitlist signups" value={waitlistCount ?? 0} href="/admin/waitlist" />
        <StatCard label="Unread signups" value={unreadCount ?? 0} href="/admin/waitlist" />
        <StatCard label="App profiles" value={appCounts.profiles} href="/admin/analytics" />
        <StatCard
          label="Recommendations logged"
          value={appCounts.recommendation_events}
          href="/admin/analytics"
        />
      </div>

      <section className="rounded-2xl border border-white/10 bg-[#121216] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Managed metrics</h2>
          <Link href="/admin/analytics" className="font-ui text-sm text-lavender">
            Edit
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(metrics.data ?? []).map((m) => (
            <div key={m.id} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
              <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-secondary">
                {m.metric_label}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">{Number(m.metric_value)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-[#121216] px-5 py-4 transition-colors hover:border-lavender/30"
    >
      <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-secondary">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
    </Link>
  );
}
