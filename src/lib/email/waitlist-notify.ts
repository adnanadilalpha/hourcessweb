import "server-only";

import path from "path";
import nodemailer from "nodemailer";
import {
  defaultAdminEmailSettings,
  type AdminEmailSettings,
} from "@/lib/email/mail-presets";
import {
  buildTestEmail,
  buildWaitlistConfirmationEmail,
  buildWaitlistNotificationEmail,
  EMAIL_LOGO_CID,
  type WaitlistSignupPayload,
} from "@/lib/email/templates";

export type { WaitlistSignupPayload };

const SMTP_TIMEOUT_MS = 20_000;
const EMAIL_LOGO_PATH = path.join(process.cwd(), "public/icon.png");

function formatSmtpError(error: unknown) {
  if (!(error instanceof Error)) return "Failed to send email.";
  const message = error.message || "Failed to send email.";
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: string }).code)
      : "";

  if (code === "ETIMEDOUT" || code === "ESOCKET" || message.toLowerCase().includes("timeout")) {
    return "Could not reach the mail server. Check host/port or try again.";
  }
  if (
    code === "EAUTH" ||
    message.toLowerCase().includes("invalid login") ||
    message.toLowerCase().includes("authentication")
  ) {
    return "Login failed. For Gmail use an App Password (not your normal password).";
  }
  return message;
}

function createTransport(settings: AdminEmailSettings) {
  const port = Number(settings.smtp_port) || 587;
  const secure = Boolean(settings.smtp_secure) || port === 465;
  const user = (settings.smtp_user || settings.from_email).trim();

  return nodemailer.createTransport({
    host: settings.smtp_host.trim(),
    port,
    secure,
    requireTLS: !secure && port === 587,
    auth: {
      user,
      pass: settings.smtp_pass.replaceAll(" ", ""),
    },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
}

export function isSmtpReady(settings: AdminEmailSettings) {
  const user = (settings.smtp_user || settings.from_email).trim();
  return Boolean(
    settings.to_email.trim() &&
      settings.from_email.trim() &&
      settings.smtp_host.trim() &&
      user &&
      settings.smtp_pass.trim(),
  );
}

async function sendViaSmtp(
  settings: AdminEmailSettings,
  options: {
    to: string;
    subject: string;
    text: string;
    html: string;
    replyTo?: string;
  },
) {
  const transport = createTransport(settings);
  await transport.sendMail({
    from: `"${settings.from_name || "Hourcess"}" <${settings.from_email}>`,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: [
      {
        path: EMAIL_LOGO_PATH,
        cid: EMAIL_LOGO_CID,
        contentDisposition: "inline",
      },
    ],
  });
}

export async function sendWaitlistEmails(
  settings: AdminEmailSettings | null | undefined,
  payload: WaitlistSignupPayload,
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  const cfg = normalizeSettings(settings);
  if (!cfg.enabled) {
    return {
      ok: true,
      skipped: true,
      error: "Notifications are off. Enable them in Admin → Email setup.",
    };
  }
  if (!isSmtpReady(cfg)) {
    return { ok: false, error: "Email is enabled but SMTP settings are incomplete." };
  }

  try {
    const adminMail = buildWaitlistNotificationEmail(payload);
    await sendViaSmtp(cfg, {
      to: cfg.to_email,
      ...adminMail,
      replyTo: cfg.reply_to_submitter ? payload.email : undefined,
    });

    const userMail = buildWaitlistConfirmationEmail(payload);
    await sendViaSmtp(cfg, {
      to: payload.email,
      ...userMail,
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatSmtpError(error) };
  }
}

export async function sendAdminTestEmail(
  settings: AdminEmailSettings,
): Promise<{ ok: boolean; error?: string }> {
  const cfg = normalizeSettings(settings);
  if (!isSmtpReady(cfg)) {
    return {
      ok: false,
      error: "SMTP incomplete — need Notify to, From email, host, and password.",
    };
  }
  try {
    const content = buildTestEmail();
    await sendViaSmtp(cfg, { to: cfg.to_email, ...content });
    return { ok: true };
  } catch (error) {
    return { ok: false, error: formatSmtpError(error) };
  }
}

function normalizeSettings(
  settings: AdminEmailSettings | null | undefined,
): AdminEmailSettings {
  const merged = { ...defaultAdminEmailSettings, ...(settings ?? {}) };
  if (!merged.smtp_user.trim()) merged.smtp_user = merged.from_email.trim();
  return merged;
}
