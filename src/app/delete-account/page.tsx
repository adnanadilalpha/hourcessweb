import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import {
  ACCOUNT_DELETION_STEPS,
  SITE_NAME,
  SUPPORT_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete your Hourcess account",
  description: `How to permanently delete your ${SITE_NAME} account from the iOS app.`,
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <LegalShell title="Delete your Hourcess account">
      <p>
        You can permanently delete your {SITE_NAME} account from inside the iOS app. Deletion
        cannot be undone.
      </p>

      <LegalSection title="Steps in the app">
        <ol className="list-decimal space-y-3 pl-5 text-secondary">
          {ACCOUNT_DELETION_STEPS.map((step) => (
            <li key={step}>
              <span className="text-primary">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-secondary">
          Path: <strong className="text-primary">Profile → Delete account</strong> (also under{" "}
          <strong className="text-primary">Profile → Account → Delete account</strong>).
        </p>
      </LegalSection>

      <LegalSection title="What gets deleted">
        <p>
          Deletion removes your account and associated server data for that account (profile,
          preferences, recommendation history, and related analytics). Local device data related to{" "}
          {SITE_NAME} (Screen Time settings, onboarding state, cached intervention data) is cleared
          on that device when deletion completes.
        </p>
      </LegalSection>

      <LegalSection title="Apple subscriptions">
        <p>
          Deleting your {SITE_NAME} account does <strong className="text-primary">not</strong>{" "}
          cancel subscriptions purchased through Apple. Manage or cancel them in{" "}
          <strong className="text-primary">
            iPhone Settings → Apple ID → Subscriptions
          </strong>
          .
        </p>
      </LegalSection>

      <LegalSection title="Can’t open the app?">
        <p>
          Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          and ask for account deletion. Include the email address you used to sign up. In-app
          deletion remains the primary method when you can open {SITE_NAME}.
        </p>
      </LegalSection>

      <LegalSection title="More information">
        <p>
          Full details are in our{" "}
          <Link href="/privacy" className="text-lavender hover:underline">
            Privacy Policy
          </Link>
          . Need help?{" "}
          <Link href="/support" className="text-lavender hover:underline">
            Support
          </Link>
          .
        </p>
      </LegalSection>
    </LegalShell>
  );
}
