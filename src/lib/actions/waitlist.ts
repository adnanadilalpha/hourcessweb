"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWaitlistEmails } from "@/lib/email/waitlist-notify";
import { defaultAdminEmailSettings } from "@/lib/email/mail-presets";

export type BetaRequestInput = {
  fullName: string;
  email: string;
  appleIdEmail?: string;
  deviceModel?: string;
  iosVersion?: string;
};

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return Boolean(value) && value.includes("@") && value.includes(".");
}

export async function submitWebsiteWaitlist(input: BetaRequestInput | string) {
  // Back-compat if anything still passes a bare email string
  const payload: BetaRequestInput =
    typeof input === "string"
      ? { fullName: "", email: input }
      : input;

  const fullName = payload.fullName.trim();
  const email = normalizeEmail(payload.email);
  const appleIdEmail = payload.appleIdEmail?.trim()
    ? normalizeEmail(payload.appleIdEmail)
    : email;
  const deviceModel = payload.deviceModel?.trim() || null;
  const iosVersion = payload.iosVersion?.trim() || null;

  if (!fullName || fullName.length < 2) {
    return { success: false as const, error: "Enter your name." };
  }
  if (!isValidEmail(email)) {
    return { success: false as const, error: "Enter a valid email." };
  }
  if (!isValidEmail(appleIdEmail)) {
    return { success: false as const, error: "Enter a valid Apple ID email." };
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("admin_website_waitlist")
      .insert({
        email,
        full_name: fullName,
        apple_id_email: appleIdEmail,
        device_model: deviceModel,
        ios_version: iosVersion,
        source: "testflight-beta",
        invite_status: "pending",
        email_status: "pending",
      })
      .select("id, email, source, full_name, apple_id_email, device_model, ios_version")
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

    const mail = await sendWaitlistEmails(settings ?? defaultAdminEmailSettings, {
      email: data.email,
      source: data.source,
      fullName: data.full_name,
      appleIdEmail: data.apple_id_email,
      deviceModel: data.device_model,
      iosVersion: data.ios_version,
    });

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

export async function updateInviteStatus(
  id: string,
  inviteStatus: "pending" | "invited" | "installed" | "declined",
) {
  await requireAdmin();
  const supabase = createAdminClient();
  await supabase.from("admin_website_waitlist").update({ invite_status: inviteStatus }).eq("id", id);
  revalidatePath("/admin/waitlist");
}

export async function resendWaitlistEmail(id: string) {
  await requireAdmin();
  const supabase = createAdminClient();

  const { data: row, error } = await supabase
    .from("admin_website_waitlist")
    .select("id, email, source, full_name, apple_id_email, device_model, ios_version")
    .eq("id", id)
    .single();

  if (error || !row) {
    return { ok: false as const, error: "Beta request not found." };
  }

  const { data: settings } = await supabase
    .from("admin_email_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  const mail = await sendWaitlistEmails(settings ?? defaultAdminEmailSettings, {
    email: row.email,
    source: row.source,
    fullName: row.full_name,
    appleIdEmail: row.apple_id_email,
    deviceModel: row.device_model,
    iosVersion: row.ios_version,
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
