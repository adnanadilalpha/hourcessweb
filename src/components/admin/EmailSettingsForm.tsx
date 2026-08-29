"use client";

import { useMemo, useState, useTransition } from "react";
import { Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  applyMailPreset,
  detectMailPreset,
  MAIL_PRESETS,
  type AdminEmailSettings,
  type MailPreset,
} from "@/lib/email/mail-presets";
import { saveEmailSettings, sendTestEmailAction } from "@/lib/actions/email-settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const preset = useMemo(() => detectMailPreset(settings.smtp_host), [settings.smtp_host]);

  function update<K extends keyof AdminEmailSettings>(key: K, value: AdminEmailSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  function save() {
    start(async () => {
      const result = await saveEmailSettings(settings);
      if (result.ok) {
        toast.success(settings.enabled ? "Settings saved — emails enabled" : "Saved — emails off");
      } else {
        toast.error(result.error || "Failed to save");
      }
    });
  }

  return (
    <Tabs defaultValue="notifications" className="space-y-2">
      <TabsList>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="smtp">SMTP</TabsTrigger>
        <TabsTrigger value="test">Test</TabsTrigger>
      </TabsList>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle>Waitlist emails</CardTitle>
                <CardDescription>
                  Sends an admin alert and a confirmation to each new signup.
                </CardDescription>
              </div>
              <Switch
                checked={settings.enabled}
                onCheckedChange={(checked) => update("enabled", checked)}
              />
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Field label="Notify admin at">
              <Input
                type="email"
                value={settings.to_email}
                onChange={(e) => update("to_email", e.target.value)}
                placeholder="hello@adnanstudios.com"
              />
            </Field>
            <Field label="From email">
              <Input
                type="email"
                value={settings.from_email}
                onChange={(e) => update("from_email", e.target.value)}
              />
            </Field>
            <Field label="From name">
              <Input
                value={settings.from_name}
                onChange={(e) => update("from_name", e.target.value)}
              />
            </Field>
            <div className="flex items-end gap-3 pb-1">
              <Switch
                id="reply-to"
                checked={settings.reply_to_submitter}
                onCheckedChange={(checked) => update("reply_to_submitter", checked)}
              />
              <Label htmlFor="reply-to" className="font-normal text-zinc-500">
                Reply-to = signup email
              </Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="smtp">
        <Card>
          <CardHeader>
            <CardTitle>SMTP configuration</CardTitle>
            <CardDescription>Gmail requires an App Password — not your normal login.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Provider preset">
              <select
                value={preset}
                onChange={(e) => {
                  const next = e.target.value as MailPreset;
                  setSettings((s) => applyMailPreset(next, s));
                }}
                className="flex h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm shadow-sm focus:border-admin-accent/50 focus:outline-none focus:ring-2 focus:ring-admin-accent/20"
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
              <Field label="Host">
                <Input
                  value={settings.smtp_host}
                  onChange={(e) => update("smtp_host", e.target.value)}
                />
              </Field>
              <Field label="Port">
                <Input
                  type="number"
                  value={settings.smtp_port}
                  onChange={(e) => update("smtp_port", Number(e.target.value) || 587)}
                />
              </Field>
              <Field label="User">
                <Input
                  value={settings.smtp_user}
                  onChange={(e) => update("smtp_user", e.target.value)}
                  placeholder={settings.from_email || "same as from email"}
                />
              </Field>
              <Field label="Password">
                <Input
                  type="password"
                  value={settings.smtp_pass}
                  onChange={(e) => update("smtp_pass", e.target.value)}
                  placeholder={hasSavedPassword ? "Leave blank to keep saved" : "App password"}
                />
              </Field>
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="ssl"
                checked={settings.smtp_secure}
                onCheckedChange={(checked) => update("smtp_secure", checked)}
              />
              <Label htmlFor="ssl" className="font-normal text-zinc-500">
                Use SSL (port 465)
              </Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="test">
        <Card>
          <CardHeader>
            <CardTitle>Send test email</CardTitle>
            <CardDescription>
              Saves your settings first, then sends a test to{" "}
              <Badge variant="secondary" className="ml-1 normal-case">
                {settings.to_email || "admin"}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              type="button"
              disabled={pending}
              onClick={() => {
                start(async () => {
                  const result = await sendTestEmailAction(settings, { saveFirst: true });
                  if (result.ok) toast.success("Test email sent — check inbox + spam");
                  else toast.error(result.error || "Test failed");
                });
              }}
            >
              <Send className="size-4" />
              Save & send test
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <div className="flex gap-3 pt-2">
        <Button type="button" onClick={save} disabled={pending}>
          <ShieldCheck className="size-4" />
          {pending ? "Saving…" : "Save all settings"}
        </Button>
      </div>
    </Tabs>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
