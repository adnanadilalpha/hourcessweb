"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";

export async function upsertAppMetric(input: {
  id?: string;
  metric_key: string;
  metric_label: string;
  metric_value: number;
  period: string;
  notes?: string;
}) {
  await requireAdmin();
  const supabase = createAdminClient();

  const payload = {
    metric_key: input.metric_key.trim(),
    metric_label: input.metric_label.trim(),
    metric_value: Number(input.metric_value) || 0,
    period: input.period.trim() || "all_time",
    notes: input.notes?.trim() || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = input.id
    ? await supabase.from("admin_app_analytics").update(payload).eq("id", input.id)
    : await supabase.from("admin_app_analytics").upsert(payload, {
        onConflict: "metric_key,period",
      });

  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/admin/analytics");
  revalidatePath("/admin");
  return { ok: true as const };
}

export async function deleteAppMetric(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  await supabase.from("admin_app_analytics").delete().eq("id", id);
  revalidatePath("/admin/analytics");
  revalidatePath("/admin");
}

/** Read-only rollup from app tables for admin overview (does not write into app tables). */
export async function getAppTableCounts() {
  await requireAdmin();
  const supabase = createAdminClient();

  const [profiles, events, outcomes, activities] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("recommendation_events").select("*", { count: "exact", head: true }),
    supabase.from("activity_outcomes").select("*", { count: "exact", head: true }),
    supabase.from("activities").select("*", { count: "exact", head: true }),
  ]);

  return {
    profiles: profiles.count ?? 0,
    recommendation_events: events.count ?? 0,
    activity_outcomes: outcomes.count ?? 0,
    activities: activities.count ?? 0,
  };
}
