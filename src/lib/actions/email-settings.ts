"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  defaultAdminEmailSettings,
  type AdminEmailSettings,
} from "@/lib/email/mail-presets";
import { isSmtpReady, sendAdminTestEmail } from "@/lib/email/waitlist-notify";

export async function saveEmailSettings(input: AdminEmailSettings) {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("admin_email_settings")
    .select("smtp_pass")
    .eq("id", 1)
    .maybeSingle();

  // Don't wipe a stored password if the form sent a blank field
  const smtpPass =
    input.smtp_pass.trim().length > 0
      ? input.smtp_pass
      : (existing?.smtp_pass ?? "");

  const smtpUser = input.smtp_user.trim() || input.from_email.trim();

  const payload: AdminEmailSettings & { id: number; updated_at: string; provider: string } = {
    id: 1,
    enabled: Boolean(input.enabled),
    provider: "smtp",
    to_email: input.to_email.trim(),
    from_email: input.from_email.trim(),
    from_name: input.from_name.trim() || "Hourcess",
    reply_to_submitter: Boolean(input.reply_to_submitter),
    smtp_host: input.smtp_host.trim(),
    smtp_port: Number(input.smtp_port) || 587,
    smtp_secure: Boolean(input.smtp_secure),
    smtp_user: smtpUser,
    smtp_pass: smtpPass,
    updated_at: new Date().toISOString(),
  };

  // If SMTP is complete, default notifications on unless explicitly off was intended —
  // still respect the checkbox the admin set.
  if (!isSmtpReady(payload) && payload.enabled) {
    return {
      ok: false as const,
      error: "Turn on notifications only after Notify to, From, host, and password are filled.",
    };
  }

  const { error } = await supabase.from("admin_email_settings").upsert(payload);
  if (error) return { ok: false as const, error: error.message };

  revalidatePath("/admin/email");
  return { ok: true as const, settings: payload };
}

/** Test with the form values (not a stale DB read). Optionally persist first. */
export async function sendTestEmailAction(
  formSettings: AdminEmailSettings,
  options?: { saveFirst?: boolean },
) {
  await requireAdmin();

  let settings = { ...defaultAdminEmailSettings, ...formSettings };

  if (options?.saveFirst !== false) {
    const saved = await saveEmailSettings(settings);
    if (!saved.ok) return saved;
    settings = { ...settings, ...(saved.settings ?? {}) };
  } else {
    const supabase = createAdminClient();
    const { data: existing } = await supabase
      .from("admin_email_settings")
      .select("smtp_pass")
      .eq("id", 1)
      .maybeSingle();
    if (!settings.smtp_pass.trim() && existing?.smtp_pass) {
      settings.smtp_pass = existing.smtp_pass;
    }
    if (!settings.smtp_user.trim()) settings.smtp_user = settings.from_email.trim();
  }

  return sendAdminTestEmail(settings);
}

export async function loadEmailSettings(): Promise<AdminEmailSettings> {
  await requireAdmin();
  const supabase = createAdminClient();
  const { data } = await supabase.from("admin_email_settings").select("*").eq("id", 1).maybeSingle();
  const merged = { ...defaultAdminEmailSettings, ...(data ?? {}) };
  // Don't send the real password to the browser — use a sentinel so blank save keeps it
  if (merged.smtp_pass) {
    merged.smtp_pass = "";
  }
  return merged;
}
