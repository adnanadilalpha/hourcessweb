import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppTableCounts } from "@/lib/actions/analytics";
import { AdminMetricCard, AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminOverviewPage() {
  await requireAdmin();
  const supabase = createAdminClient();

  const [{ count: waitlistCount }, { count: unreadCount }, { data: emailSettings }, metrics, appCounts] =
    await Promise.all([
      supabase.from("admin_website_waitlist").select("*", { count: "exact", head: true }),
      supabase
        .from("admin_website_waitlist")
        .select("*", { count: "exact", head: true })
        .is("read_at", null),
      supabase.from("admin_email_settings").select("enabled").eq("id", 1).maybeSingle(),
      supabase
        .from("admin_app_analytics")
        .select("*")
        .order("metric_label", { ascending: true }),
      getAppTableCounts(),
    ]);

  return (
    <div>
      <AdminPageHeader
        title="Overview"
        description="iOS beta requests, email delivery, and app analytics at a glance."
      >
        <Badge variant={emailSettings?.enabled ? "success" : "warning"}>
          Email {emailSettings?.enabled ? "on" : "off"}
        </Badge>
        <Button variant="secondary" size="sm" asChild>
          <Link href="/admin/email">
            <Mail className="size-4" />
            Email setup
          </Link>
        </Button>
      </AdminPageHeader>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard
          label="Beta requests"
          value={waitlistCount ?? 0}
          hint="TestFlight signups"
          accent="lavender"
          href="/admin/waitlist"
        />
        <AdminMetricCard
          label="Unread"
          value={unreadCount ?? 0}
          hint="Needs review"
          href="/admin/waitlist"
        />
        <AdminMetricCard
          label="App profiles"
          value={appCounts.profiles}
          hint="Live count"
          href="/admin/analytics"
        />
        <AdminMetricCard
          label="Recommendations"
          value={appCounts.recommendation_events}
          hint="Live count"
          accent="dark"
          href="/admin/analytics"
        />
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Managed metrics</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/analytics">
              View all
              <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {(metrics.data ?? []).length === 0 ? (
            <p className="text-sm text-zinc-500">
              No custom metrics yet.{" "}
              <Link href="/admin/analytics" className="font-medium text-admin-accent hover:underline">
                Add one
              </Link>
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(metrics.data ?? []).map((m) => (
                <div key={m.id} className="rounded-2xl bg-zinc-100 px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                    {m.metric_label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold text-zinc-900">
                    {Number(m.metric_value)}
                  </p>
                  <p className="text-xs text-zinc-400">{m.period}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
