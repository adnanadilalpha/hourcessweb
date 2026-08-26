"use client";

import { useMemo, useState, useTransition } from "react";
import {
  applyMailPreset,
  detectMailPreset,
  MAIL_PRESETS,
  type AdminEmailSettings,
  type MailPreset,
} from "@/lib/email/mail-presets";
import { saveEmailSettings, sendTestEmailAction } from "@/lib/actions/email-settings";

export default function EmailSettingsForm({
  initial,
  passwordSaved = false,
}: {
  initial: AdminEmailSettings;
  passwordSaved?: boolean;
}) {
  const [settings, setSettings] = useState(initial);
  const [hasSavedPassword] = useState(passwordSaved);
  const [pending, start] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"ok" | "err">("ok");
  const preset = useMemo(() => detectMailPreset(settings.smtp_host), [settings.smtp_host]);

  function update<K extends keyof AdminEmailSettings>(key: K, value: AdminEmailSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function show(msg: string, tone: "ok" | "err") {
    setMessage(msg);
    setMessageTone(tone);
  }

  return (
    <form
      className="space-y-5 rounded-2xl border border-white/10 bg-[#121216] p-5 md:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const result = await saveEmailSettings(settings);
          if (result.ok) {
            show(
              settings.enabled
                ? "Saved. Waitlist will email admin + the signup."
                : "Saved — but notifications are OFF. Turn on the switch above to send mail.",
              settings.enabled ? "ok" : "err",
            );
          } else {
            show(result.error || "Failed to save.", "err");
          }
        });
      }}
    >
      {message ? (
        <p
          className={`rounded-xl px-3 py-2 font-ui text-sm ${
            messageTone === "ok"
              ? "border border-lavender/30 bg-lavender/10 text-lavender"
              : "border border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {message}
        </p>
      ) : null}

      <label className="flex items-start gap-3 rounded-xl border border-lavender/25 bg-lavender/10 px-4 py-3">
        <input
          type="checkbox"
          checked={settings.enabled}
          onChange={(e) => update("enabled", e.target.checked)}
          className="mt-0.5 size-4 accent-lavender"
        />
        <span className="font-ui text-sm leading-snug">
          <strong className="text-primary">Send emails on waitlist signup</strong>
          <span className="mt-1 block text-secondary">
            Admin alert → Notify to · Confirmation → the person who signed up
          </span>
        </span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Notify admin at">
          <input
            type="email"
            value={settings.to_email}
            onChange={(e) => update("to_email", e.target.value)}
            className={inputClass}
            placeholder="hello@adnanstudios.com"
            required
          />
        </Field>
        <Field label="From email (SMTP login)">
          <input
            type="email"
            value={settings.from_email}
            onChange={(e) => update("from_email", e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="From name">
          <input
            value={settings.from_name}
            onChange={(e) => update("from_name", e.target.value)}
            className={inputClass}
          />
        </Field>
        <label className="flex items-end gap-3 pb-2">
          <input
            type="checkbox"
            checked={settings.reply_to_submitter}
            onChange={(e) => update("reply_to_submitter", e.target.checked)}
            className="size-4 accent-lavender"
          />
          <span className="font-ui text-sm text-secondary">Admin reply-to = signup email</span>
        </label>
      </div>

      <Field label="Mail provider preset">
        <select
          value={preset}
          onChange={(e) => {
            const next = e.target.value as MailPreset;
            setSettings((s) => applyMailPreset(next, s));
          }}
          className={inputClass}
        >
          {Object.entries(MAIL_PRESETS).map(([key, cfg]) => (
            <option key={key} value={key}>
              {cfg.label}
            </option>
          ))}
          <option value="other">Other / custom</option>
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="SMTP host">
          <input
            value={settings.smtp_host}
            onChange={(e) => update("smtp_host", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="SMTP port">
          <input
            type="number"
            value={settings.smtp_port}
            onChange={(e) => update("smtp_port", Number(e.target.value) || 587)}
            className={inputClass}
          />
        </Field>
        <Field label="SMTP user (optional — defaults to From email)">
          <input
            value={settings.smtp_user}
            onChange={(e) => update("smtp_user", e.target.value)}
            className={inputClass}
            autoComplete="off"
            placeholder={settings.from_email || "same as from email"}
          />
        </Field>
        <Field label="SMTP password / app password">
          <input
            type="password"
            value={settings.smtp_pass}
            onChange={(e) => update("smtp_pass", e.target.value)}
            className={inputClass}
            autoComplete="new-password"
            placeholder={hasSavedPassword ? "•••••••• (saved — leave blank to keep)" : "App password"}
          />
        </Field>
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={settings.smtp_secure}
          onChange={(e) => update("smtp_secure", e.target.checked)}
          className="size-4 accent-lavender"
        />
        <span className="font-ui text-sm text-secondary">Use SSL (port 465)</span>
      </label>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-lavender px-5 py-2.5 font-ui text-sm font-medium text-ink disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save settings"}
        </button>
        <button
          type="button"
          disabled={pending}
          className="rounded-xl border border-white/15 px-5 py-2.5 font-ui text-sm text-secondary hover:text-primary disabled:opacity-50"
          onClick={() => {
            start(async () => {
              const result = await sendTestEmailAction(settings, { saveFirst: true });
              show(
                result.ok
                  ? `Test sent to ${settings.to_email || "admin"}. Check inbox + spam.`
                  : result.error || "Test failed.",
                result.ok ? "ok" : "err",
              );
            });
          }}
        >
          Save & send test email
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-ui text-[11px] uppercase tracking-[0.16em] text-secondary">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 font-ui text-sm text-primary outline-none focus:border-lavender/40";
