import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppTableCounts } from "@/lib/actions/analytics";
import AnalyticsEditor from "@/components/admin/AnalyticsEditor";
import { AdminMetricCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminAnalyticsPage() {
  await requireAdmin();
  const supabase = createAdminClient();
  const [{ data: metrics }, appCounts] = await Promise.all([
    supabase.from("admin_app_analytics").select("*").order("metric_label"),
    getAppTableCounts(),
  ]);

  return (
    <div className="space-y-10">
      <AdminPageHeader
        title="App analytics"
        description="Live counts from app tables plus metrics you manage manually."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard label="Profiles" value={appCounts.profiles} hint="Read-only" />
        <AdminMetricCard label="Activities" value={appCounts.activities} hint="Read-only" />
        <AdminMetricCard
          label="Recommendations"
          value={appCounts.recommendation_events}
          hint="Read-only"
          accent="lavender"
        />
        <AdminMetricCard
          label="Outcomes"
          value={appCounts.activity_outcomes}
          hint="Read-only"
        />
      </section>

      <AnalyticsEditor metrics={metrics ?? []} />
    </div>
  );
}
