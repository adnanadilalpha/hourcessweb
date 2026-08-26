import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppTableCounts } from "@/lib/actions/analytics";
import AnalyticsEditor from "@/components/admin/AnalyticsEditor";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const supabase = createAdminClient();
  const [{ data: metrics }, appCounts] = await Promise.all([
    supabase.from("admin_app_analytics").select("*").order("metric_label"),
    getAppTableCounts(),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">App analytics</h1>
        <p className="mt-2 font-ui text-sm text-secondary">
          Live counts are read from app tables. Editable metrics live in{" "}
          <code className="text-lavender">admin_app_analytics</code> only.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ReadOnlyStat label="Profiles" value={appCounts.profiles} />
        <ReadOnlyStat label="Activities" value={appCounts.activities} />
        <ReadOnlyStat label="Recommendation events" value={appCounts.recommendation_events} />
        <ReadOnlyStat label="Activity outcomes" value={appCounts.activity_outcomes} />
      </section>

      <AnalyticsEditor metrics={metrics ?? []} />
    </div>
  );
}

function ReadOnlyStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#121216] px-5 py-4">
      <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-secondary">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      <p className="mt-1 font-ui text-[11px] text-secondary/60">From app tables (read-only)</p>
    </div>
  );
}
