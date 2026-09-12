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
  description: `Get help with ${SITE_NAME} — account deletion, subscriptions, and privacy.`,
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

      <LegalSection title="FAQ">
        <ul className="space-y-5">
          <li>
            <p className="font-medium text-primary">How do I delete my account?</p>
            <p className="mt-1.5">
              Open Hourcess → <strong className="text-primary">Profile → Delete account</strong> →
              confirm. Full steps:{" "}
              <Link href="/delete-account" className="text-lavender hover:underline">
                Delete your account
              </Link>
              .
            </p>
            <p className="mt-2">
              If you can’t access the app, email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
                {SUPPORT_EMAIL}
              </a>{" "}
              and ask for account deletion, including the email used to sign up. In-app deletion is
              the primary method.
            </p>
            <p className="mt-2 text-sm">
              Deleting your account does not cancel Apple subscriptions. Manage those in{" "}
              <strong className="text-primary">
                iPhone Settings → Apple ID → Subscriptions
              </strong>
              .
            </p>
          </li>
          <li>
            <p className="font-medium text-primary">How do subscriptions work?</p>
            <p className="mt-1.5">
              {SITE_NAME} offers {SUBSCRIPTION_PLANS.map((p) => p.name).join(" and ")} (
              {SUBSCRIPTION_PLANS.map((p) => p.billing.toLowerCase()).join(" / ")}). Manage billing
              and cancel in Apple or Google account settings. Details:{" "}
              <Link href="/subscriptions" className="text-lavender hover:underline">
                Subscriptions
              </Link>
              .
            </p>
          </li>
          <li>
            <p className="font-medium text-primary">How do I restore purchases?</p>
            <p className="mt-1.5">
              Use Restore Purchases in the app while signed into the same App Store / Play account
              used to buy.
            </p>
          </li>
          <li>
            <p className="font-medium text-primary">How do refunds work?</p>
            <p className="mt-1.5">
              Requested through Apple or Google, not through {SITE_NAME} directly.
            </p>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Legal">
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-lavender hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
      </LegalSection>
    </LegalShell>
  );
}
