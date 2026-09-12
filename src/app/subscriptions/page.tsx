import type { Metadata } from "next";
import Link from "next/link";
import LegalShell, { LegalSection } from "@/components/LegalShell";
import PaywallPreview from "@/components/PaywallPreview";
import {
  LEGAL_EFFECTIVE_DATE,
  SITE_NAME,
  SUBSCRIPTION_PLANS,
  SUPPORT_EMAIL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Subscriptions & In-App Purchases",
  description: `${SITE_NAME} subscription plans (Lite monthly, Pro yearly), billing, renewal, and cancellation — for App Store and Google Play.`,
  alternates: { canonical: "/subscriptions" },
};

export default function SubscriptionsPage() {
  return (
    <LegalShell title="Subscriptions & In-App Purchases">
      <p className="text-primary/80">
        Effective date: <strong className="text-primary">{LEGAL_EFFECTIVE_DATE}</strong>
      </p>
      <p>
        This page describes {SITE_NAME} paid subscriptions for Apple App Store and Google Play
        reviewers and users. Purchases are processed by Apple or Google and subscription status is
        managed with <strong className="text-primary">RevenueCat</strong>. We never see your full
        card number.
      </p>

      <LegalSection title="Plans">
        <div className="grid gap-4 sm:grid-cols-2">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl border border-white/10 bg-white/3 p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-ui text-[11px] uppercase tracking-[0.2em] text-lavender">
                  {plan.billing}
                </p>
                {plan.popular ? (
                  <span className="rounded-full bg-lavender/20 px-2 py-0.5 font-ui text-[10px] font-semibold text-lavender">
                    Popular
                  </span>
                ) : null}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-primary">{plan.name}</h3>
              <p className="mt-1 font-ui text-lg font-semibold tabular-nums text-primary">
                {plan.displayPrice}
              </p>
              <p className="mt-1 font-ui text-sm text-secondary/80">{plan.productHint}</p>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{plan.summary}</p>
            </div>
          ))}
        </div>
        <p className="mt-4">
          <strong className="text-primary">Hourcess Lite</strong> is the monthly plan.{" "}
          <strong className="text-primary">Hourcess Pro</strong> is the yearly plan. Both unlock
          the same paid {SITE_NAME} experience; they differ only in billing period and store
          pricing.
        </p>
        <p>
          Prices above are typical US reference amounts shown for clarity. Exact prices are shown
          in the App Store / Google Play / in-app purchase sheet for your region and currency at
          the time of purchase. Taxes may apply.
        </p>
      </LegalSection>

      <LegalSection title="In-app paywall">
        <p className="mb-6">
          Below is a preview of the paywall users see inside the {SITE_NAME} apps. Purchases are
          completed through Apple or Google (via RevenueCat) — not on this website.
        </p>
        <PaywallPreview />
      </LegalSection>

      <LegalSection title="What you get">
        <p>
          An active Lite or Pro subscription unlocks paid {SITE_NAME} features available at the
          time of your purchase (for example full recommendation experience and premium app
          capabilities we designate as paid). Free or limited features may remain available without
          a subscription. Feature sets can evolve; material changes will be reflected in the app
          and store listings when required.
        </p>
      </LegalSection>

      <LegalSection title="Billing &amp; auto-renewal">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Payment is charged to your Apple ID or Google Play account when you confirm purchase.
          </li>
          <li>
            Subscriptions <strong className="text-primary">auto-renew</strong> unless you turn off
            auto-renew at least 24 hours before the end of the current period.
          </li>
          <li>
            Your account will be charged for renewal within 24 hours prior to the end of the
            current period at the then-current price for that plan.
          </li>
          <li>
            If a free trial is offered, unused trial time is forfeited when you purchase a
            subscription where required by store rules.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="How to manage or cancel">
        <p>
          Cancel or change renewals in your store account — not inside RevenueCat billing portals
          we do not operate for end users:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-primary">Apple:</strong> Settings → [your name] → Subscriptions
            → {SITE_NAME} (or via{" "}
            <a
              href="https://apps.apple.com/account/subscriptions"
              className="text-lavender hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              apps.apple.com/account/subscriptions
            </a>
            )
          </li>
          <li>
            <strong className="text-primary">Google:</strong> Google Play → Profile → Payments &amp;
            subscriptions → Subscriptions → {SITE_NAME}
          </li>
        </ul>
        <p>
          Deleting the app does <strong className="text-primary">not</strong> cancel your
          subscription. Refunds are handled by Apple or Google under their policies.
        </p>
      </LegalSection>

      <LegalSection title="Restore purchases">
        <p>
          If you reinstall {SITE_NAME} or switch devices signed into the same Apple ID / Google
          account, use Restore Purchases in the app (where available) so RevenueCat can re-apply
          your entitlements.
        </p>
      </LegalSection>

      <LegalSection title="Account deletion vs subscription">
        <p>
          Requesting account deletion (see{" "}
          <Link href="/privacy" className="text-lavender hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/delete-account" className="text-lavender hover:underline">
            Delete your account
          </Link>
          ) removes your {SITE_NAME} account data we control. It does not automatically cancel an
          active App Store or Play subscription — cancel that separately as above.
        </p>
      </LegalSection>

      <LegalSection title="Support">
        <p>
          Billing questions about charges on your statement should go to Apple or Google. Product
          questions:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-lavender hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          or our{" "}
          <Link href="/support" className="text-lavender hover:underline">
            Support
          </Link>{" "}
          page.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
