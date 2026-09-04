import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import {
  LEGAL_LINKS,
  SITE_NAME,
  SUBSCRIPTION_PLANS,
  SUPPORT_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description: `Get help with ${SITE_NAME} — account, subscriptions, and privacy.`,
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return (
    <LegalShell title="Support">
      <p>
        We’re here to help with the {SITE_NAME} app, waitlist, subscriptions, and privacy
        requests. For the fastest response, email us with your account email and device type
        (iPhone / Android).
      </p>

      <LegalSection title="Contact">
        <p>
          <a
            href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`${SITE_NAME} support`)}`}
            className="inline-flex rounded-full bg-lavender px-5 py-2.5 font-ui text-sm font-medium text-ink transition hover:opacity-90"
          >
            Email {SUPPORT_EMAIL}
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Common topics">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-primary">Subscriptions</strong> — {SITE_NAME} offers{" "}
            {SUBSCRIPTION_PLANS.map((p) => p.name).join(" and ")} (
            {SUBSCRIPTION_PLANS.map((p) => p.billing.toLowerCase()).join(" / ")}). Manage billing
            and cancel in Apple or Google account settings. Details:{" "}
            <Link href="/subscriptions" className="text-lavender hover:underline">
              Subscriptions
            </Link>
            .
          </li>
          <li>
            <strong className="text-primary">Restore purchases</strong> — Use Restore Purchases in
            the app while signed into the same App Store / Play account used to buy.
          </li>
          <li>
            <strong className="text-primary">Delete account</strong> — Email us from your account
            address requesting deletion. See our{" "}
            <Link href="/privacy" className="text-lavender hover:underline">
              Privacy Policy
            </Link>
            .
          </li>
          <li>
            <strong className="text-primary">Refunds</strong> — Requested through Apple or Google,
            not through {SITE_NAME} directly.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Legal">
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lavender hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </LegalSection>
    </LegalShell>
  );
}
