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
  title: "Terms of Use",
  description: `Terms governing use of the ${SITE_NAME} app and website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Use">
      <p className="text-primary/80">
        Effective date: <strong className="text-primary">{LEGAL_EFFECTIVE_DATE}</strong>
      </p>
      <p>
        These Terms of Use (“Terms”) are an agreement between you and {LEGAL_ENTITY} (“{SITE_NAME},”
        “we,” “us”) for use of the {SITE_NAME} mobile application, website ({SITE_URL}), waitlist,
        and related services (the “Services”).
      </p>
      <p>
        By downloading, accessing, or using the Services, you agree to these Terms and our{" "}
        <Link href="/privacy" className="text-lavender hover:underline">
          Privacy Policy
        </Link>
        . If you do not agree, do not use the Services.
      </p>

      <LegalSection title="1. The Services">
        <p>
          {SITE_NAME} is a digital wellbeing product that helps you notice scrolling habits and
          choose alternative real-world moments. Features may change over time as we improve the
          product. Some features require a paid subscription — see{" "}
          <Link href="/subscriptions" className="text-lavender hover:underline">
            Subscriptions
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility &amp; accounts">
        <p>
          You must be old enough to consent to these Terms in your country (and at least 13, or
          the age required where you live). You are responsible for your account credentials and
          for activity under your account. Provide accurate information and keep it updated.
        </p>
      </LegalSection>

      <LegalSection title="3. License">
        <p>
          We grant you a personal, limited, non-exclusive, non-transferable, revocable license to
          use the Services for your own non-commercial purposes, subject to these Terms. You may
          not copy, modify, reverse engineer, rent, sell, or create derivative works of the
          Services except as allowed by law.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Misuse the Services or interfere with other users or our infrastructure</li>
          <li>Attempt unauthorized access to accounts, systems, or data</li>
          <li>Use the Services for unlawful, harmful, or abusive purposes</li>
          <li>Scrape, harvest, or automate access in ways that abuse rate limits or APIs</li>
          <li>Misrepresent your identity or affiliation with {SITE_NAME}</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Subscriptions &amp; purchases">
        <p>
          Paid plans are offered as auto-renewable subscriptions through the Apple App Store
          and/or Google Play, managed with RevenueCat. Prices, free trials (if any), and renewal
          terms are shown in the store / in-app purchase sheet at the time of purchase. Payment is
          charged to your Apple ID or Google account. Manage or cancel renewals in your store
          account settings. Full details:{" "}
          <Link href="/subscriptions" className="text-lavender hover:underline">
            Subscriptions
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Intellectual property">
        <p>
          {SITE_NAME}, including its name, logo, design, software, and content we provide, is
          owned by {LEGAL_ENTITY} or its licensors and protected by intellectual property laws.
          These Terms do not transfer ownership to you.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-party services">
        <p>
          The Services may rely on third parties (for example Apple, Google, Supabase, RevenueCat).
          Their terms and privacy policies apply to their services. We are not responsible for
          third-party outages or policies outside our control.
        </p>
      </LegalSection>

      <LegalSection title="8. Disclaimer">
        <p>
          The Services are provided “as is” and “as available.” To the fullest extent permitted by
          law, we disclaim warranties of merchantability, fitness for a particular purpose, and
          non-infringement. {SITE_NAME} is not a medical, mental-health, or clinical service and
          does not provide professional advice.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitation of liability">
        <p>
          To the fullest extent permitted by law, {LEGAL_ENTITY} and its affiliates will not be
          liable for indirect, incidental, special, consequential, or punitive damages, or any loss
          of profits, data, or goodwill, arising from your use of the Services. Our total liability
          for any claim relating to the Services is limited to the greater of (a) the amounts you
          paid us for the Services in the 12 months before the claim, or (b) USD $50.
        </p>
      </LegalSection>

      <LegalSection title="10. Termination">
        <p>
          You may stop using the Services at any time. We may suspend or terminate access if you
          violate these Terms or if we discontinue the Services. Provisions that by nature should
          survive (including ownership, disclaimers, and liability limits) will survive termination.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes">
        <p>
          We may update these Terms. We will post the new version on this page with an updated
          effective date. Continued use after changes constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Questions:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
