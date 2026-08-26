import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { defaultAdminEmailSettings } from "@/lib/email/mail-presets";
import EmailSettingsForm from "@/components/admin/EmailSettingsForm";

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
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Email setup</h1>
        <p className="mt-2 font-ui text-sm text-secondary">
          SMTP for waitlist: admin notification + signup confirmation. For Gmail use an{" "}
          <strong className="text-primary">App Password</strong>.
        </p>
      </div>
      <EmailSettingsForm initial={settings} passwordSaved={passwordSaved} />
    </div>
  );
}
