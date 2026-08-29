"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWaitlistEmails } from "@/lib/email/waitlist-notify";
import { defaultAdminEmailSettings } from "@/lib/email/mail-presets";

export async function submitWebsiteWaitlist(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !normalized.includes("@")) {
    return { success: false as const, error: "Enter a valid email." };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("admin_website_waitlist")
      .insert({ email: normalized, source: "website", email_status: "pending" })
      .select("id, email, source")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { success: true as const, duplicate: true };
      }
      return { success: false as const, error: error.message };
    }

    const { data: settings } = await supabase
      .from("admin_email_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    const mail = await sendWaitlistEmails(
      settings ?? defaultAdminEmailSettings,
      { email: data.email, source: data.source },
    );

    await supabase
      .from("admin_website_waitlist")
      .update({
        email_status: mail.skipped ? "skipped" : mail.ok ? "sent" : "failed",
        email_error: mail.error ?? null,
      })
      .eq("id", data.id);

    return { success: true as const };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return { success: false as const, error: message };
  }
}

export async function markWaitlistRead(id: string, read: boolean) {
  await requireAdmin();
  const supabase = createAdminClient();
  await supabase
    .from("admin_website_waitlist")
    .update({ read_at: read ? new Date().toISOString() : null })
    .eq("id", id);
  revalidatePath("/admin/waitlist");
}

export async function deleteWaitlistEntry(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  await supabase.from("admin_website_waitlist").delete().eq("id", id);
  revalidatePath("/admin/waitlist");
  revalidatePath("/admin");
}

export async function updateWaitlistNotes(id: string, notes: string) {
  await requireAdmin();
  const supabase = createAdminClient();
  await supabase.from("admin_website_waitlist").update({ notes }).eq("id", id);
  revalidatePath("/admin/waitlist");
}

export async function resendWaitlistEmail(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: row, error } = await supabase
    .from("admin_website_waitlist")
    .select("id, email, source")
    .eq("id", id)
    .single();

  if (error || !row) {
    return { ok: false as const, error: "Waitlist entry not found." };
  }

  const { data: settings } = await supabase
    .from("admin_email_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const mail = await sendWaitlistEmails(settings ?? defaultAdminEmailSettings, {
    email: row.email,
    source: row.source,
  });

  await supabase
    .from("admin_website_waitlist")
    .update({
      email_status: mail.skipped ? "skipped" : mail.ok ? "sent" : "failed",
      email_error: mail.error ?? null,
    })
    .eq("id", id);

  revalidatePath("/admin/waitlist");
  revalidatePath("/admin");

  return mail.ok
    ? { ok: true as const }
    : { ok: false as const, error: mail.error ?? "Failed to send email." };
}
