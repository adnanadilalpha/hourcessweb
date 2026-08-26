export type AdminEmailSettings = {
  enabled: boolean;
  provider: string;
  to_email: string;
  from_email: string;
  from_name: string;
  reply_to_submitter: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_pass: string;
};

export type MailPreset = "gmail" | "outlook" | "yahoo" | "other";

export const MAIL_PRESETS: Record<
  Exclude<MailPreset, "other">,
  { host: string; port: number; secure: boolean; label: string }
> = {
  gmail: {
    label: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
  },
  outlook: {
    label: "Outlook / Microsoft 365",
    host: "smtp.office365.com",
    port: 587,
    secure: false,
  },
  yahoo: {
    label: "Yahoo",
    host: "smtp.mail.yahoo.com",
    port: 587,
    secure: false,
  },
};

export const defaultAdminEmailSettings: AdminEmailSettings = {
  enabled: false,
  provider: "smtp",
  to_email: "",
  from_email: "",
  from_name: "Hourcess",
  reply_to_submitter: true,
  smtp_host: "smtp.gmail.com",
  smtp_port: 587,
  smtp_secure: false,
  smtp_user: "",
  smtp_pass: "",
};

export function detectMailPreset(host: string): MailPreset {
  const h = host.trim().toLowerCase();
  if (h.includes("gmail")) return "gmail";
  if (h.includes("office365") || h.includes("outlook")) return "outlook";
  if (h.includes("yahoo")) return "yahoo";
  return "other";
}

export function applyMailPreset(
  preset: MailPreset,
  current: AdminEmailSettings,
): AdminEmailSettings {
  if (preset === "other") return { ...current, provider: "smtp" };
  const cfg = MAIL_PRESETS[preset];
  return {
    ...current,
    provider: "smtp",
    smtp_host: cfg.host,
    smtp_port: cfg.port,
    smtp_secure: cfg.secure,
  };
}
