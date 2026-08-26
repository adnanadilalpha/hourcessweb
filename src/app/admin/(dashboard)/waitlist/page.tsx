import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import WaitlistTable from "@/components/admin/WaitlistTable";

export default async function AdminWaitlistPage() {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data: rows } = await supabase
    .from("admin_website_waitlist")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Website waitlist</h1>
        <p className="mt-2 font-ui text-sm text-secondary">
          Stored in <code className="text-lavender">admin_website_waitlist</code> — separate from
          app tables.
        </p>
      </div>
      <WaitlistTable rows={rows ?? []} />
    </div>
  );
}
