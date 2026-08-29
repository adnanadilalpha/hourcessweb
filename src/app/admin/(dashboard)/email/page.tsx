import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { defaultAdminEmailSettings } from "@/lib/email/mail-presets";
import EmailSettingsForm from "@/components/admin/EmailSettingsForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default async function AdminEmailPage() {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data } = await supabase.from("admin_email_settings").select("*").eq("id", 1).maybeSingle();
  const passwordSaved = Boolean(data?.smtp_pass);
  const settings = {
    ...defaultAdminEmailSettings,
    ...(data ?? {}),
    smtp_pass: "",
  };

  return (
    <div className="mx-auto max-w-3xl">
      <AdminPageHeader
        title="Email setup"
        description="Configure SMTP for waitlist notifications. Gmail users need an App Password."
      />
      <EmailSettingsForm initial={settings} passwordSaved={passwordSaved} />
    </div>
  );
}
