import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import WaitlistTable from "@/components/admin/WaitlistTable";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminWaitlistPage() {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data: rows } = await supabase
    .from("admin_website_waitlist")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <div>
      <AdminPageHeader
        title="iOS beta (TestFlight)"
        description="Requests from the homepage. Send TestFlight invites in App Store Connect, then mark Invited here. Failed emails can be resent from the row menu."
      />
      <WaitlistTable rows={rows ?? []} />
    </div>
  );
}
