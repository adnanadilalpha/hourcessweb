import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_ENTITY,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses, and protects your information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy">
      <p className="text-primary/80">
        Effective date: <strong className="text-primary">{LEGAL_EFFECTIVE_DATE}</strong>
      </p>
      <p>
        This Privacy Policy explains how {LEGAL_ENTITY} (“{SITE_NAME},” “we,” “us,” or “our”)
        collects, uses, discloses, and protects information when you use the {SITE_NAME} mobile
        application, website at{" "}
        <a href={SITE_URL} className="text-lavender hover:underline">
          {SITE_URL}
        </a>
        , waitlist, and related services (collectively, the “Services”).
      </p>
      <p>
        By using the Services, you agree to this Policy. If you do not agree, please do not use
        the Services.
      </p>

      <LegalSection title="1. Who we are">
        <p>
          {SITE_NAME} helps you notice phone habits and choose real-world moments instead of
          endless scrolling. Controller of personal data: {LEGAL_ENTITY}. Contact:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Information we collect">
        <p>
          <strong className="text-primary">Account &amp; profile.</strong> Email address, display
          name or handle (if you provide one), authentication identifiers, and account settings.
        </p>
        <p>
          <strong className="text-primary">App usage.</strong> Interactions inside {SITE_NAME}{" "}
          (for example recommendations shown, activities chosen, outcomes you log), device
          preferences, and feature usage needed to operate and improve the product.
        </p>
        <p>
          <strong className="text-primary">Device &amp; technical data.</strong> Device type, OS
          version, app version, language, time zone, crash logs, and diagnostic data.
        </p>
        <p>
          <strong className="text-primary">Purchases &amp; subscriptions.</strong> We do not
          receive your full payment card details. Purchases are processed by Apple App Store,
          Google Play, and/or RevenueCat. We receive subscription status, product identifiers,
          renewal state, and related entitlements so we can unlock paid features.
        </p>
        <p>
          <strong className="text-primary">Website beta requests.</strong> If you request an iOS
          TestFlight invite, we store the name, email, Apple ID email (if different), device info
          you provide, and related status (for example confirmation email delivery).
        </p>
        <p>
          <strong className="text-primary">Support.</strong> Information you send when you email
          us for help.
        </p>
        <p>
          We do not knowingly collect sensitive categories of personal data beyond what is needed
          to run {SITE_NAME}. We do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection title="3. How we use information">
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide, maintain, and improve the Services</li>
          <li>Authenticate accounts and secure access</li>
          <li>Personalize recommendations and moments inside the app</li>
          <li>Process subscriptions and restore purchases</li>
          <li>Send transactional messages (account, waitlist, support)</li>
          <li>Monitor reliability, prevent abuse, and fix bugs</li>
          <li>Comply with law and enforce our Terms</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Analytics &amp; third parties">
        <p>We may use trusted processors to operate the Services, including:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-primary">Supabase</strong> — authentication and database
            hosting
          </li>
          <li>
            <strong className="text-primary">RevenueCat</strong> — subscription status and
            purchase receipt validation
          </li>
          <li>
            <strong className="text-primary">Apple / Google</strong> — billing for in-app
            purchases
          </li>
          <li>
            <strong className="text-primary">Email delivery providers</strong> — transactional
            mail (for example waitlist confirmations)
          </li>
        </ul>
        <p>
          These providers process data only as needed to provide their services and under
          appropriate agreements. We do not use your content to sell ads.
        </p>
      </LegalSection>

      <LegalSection title="5. Permissions on your device">
        <p>
          {SITE_NAME} may request system permissions that are necessary for features you choose
          to use (for example notifications). You can revoke permissions in your device settings.
          Denying optional permissions may limit related features but should not block basic app
          use where possible.
        </p>
      </LegalSection>

      <LegalSection title="6. Data retention">
        <p>
          We keep personal data only as long as needed for the purposes above, including legal,
          accounting, and security requirements. You may request deletion of your account data
          (see below). Backup copies may persist for a limited period before permanent removal.
        </p>
      </LegalSection>

      <LegalSection title="7. Your rights &amp; choices">
        <p>
          Depending on where you live, you may have rights to access, correct, delete, or export
          your personal data, and to object to or restrict certain processing. To exercise these
          rights (other than in-app account deletion below), email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Account deletion">
        <p>
          You can delete your {SITE_NAME} account from inside the iOS app. Path:{" "}
          <strong className="text-primary">Profile → Delete account</strong> (also under{" "}
          <strong className="text-primary">Profile → Account → Delete account</strong>).
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Open the Hourcess app</li>
          <li>Go to Profile</li>
          <li>Tap Delete account (or open Account, then Delete account)</li>
          <li>Confirm deletion</li>
          <li>You’ll be signed out and returned to the welcome screen</li>
        </ol>
        <p>
          Deletion is permanent and cannot be undone. It removes your account and associated
          server data for that account (profile, preferences, recommendation history, and related
          analytics stored for that account). Local device data related to {SITE_NAME} (Screen
          Time settings, onboarding state, cached intervention data) is cleared on that device when
          deletion completes.
        </p>
        <p>
          Subscriptions purchased through Apple are <strong className="text-primary">not</strong>{" "}
          cancelled by deleting your {SITE_NAME} account. Manage or cancel subscriptions in{" "}
          <strong className="text-primary">
            iPhone Settings → Apple ID → Subscriptions
          </strong>
          . See also{" "}
          <Link href="/subscriptions" className="text-lavender hover:underline">
            Subscriptions
          </Link>{" "}
          and{" "}
          <Link href="/delete-account" className="text-lavender hover:underline">
            Delete your account
          </Link>
          .
        </p>
        <p>
          If you cannot access the app, contact{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          and ask for account deletion, including the email used to sign up. In-app deletion is the
          primary method.
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>
          The Services are not directed to children under 13 (or the minimum age required in your
          country). We do not knowingly collect personal information from children. If you believe
          a child provided data to us, contact{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          and we will take appropriate steps.
        </p>
      </LegalSection>

      <LegalSection title="10. International transfers">
        <p>
          We may process data in countries other than your own. Where required, we use appropriate
          safeguards. By using the Services, you understand your information may be transferred to
          our processors as described in this Policy.
        </p>
      </LegalSection>

      <LegalSection title="11. Security">
        <p>
          We use reasonable technical and organizational measures to protect personal data.
          No method of transmission or storage is 100% secure.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes">
        <p>
          We may update this Policy from time to time. We will post the revised version on this
          page and update the effective date. Continued use after changes means you accept the
          updated Policy.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <p>
          Questions about privacy:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
        <p>
          Related:{" "}
          <Link href="/terms" className="text-lavender hover:underline">
            Terms of Use
          </Link>
          {" · "}
          <Link href="/subscriptions" className="text-lavender hover:underline">
            Subscriptions
          </Link>
          {" · "}
          <Link href="/support" className="text-lavender hover:underline">
            Support
          </Link>
          {" · "}
          <Link href="/delete-account" className="text-lavender hover:underline">
            Delete account
          </Link>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
