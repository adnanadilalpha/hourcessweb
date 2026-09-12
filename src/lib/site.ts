/** Canonical site URL — set NEXT_PUBLIC_SITE_URL in production (e.g. https://hourcess.com). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://hourcess.com";
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

export const SITE_URL = getSiteUrl();

export const SITE_NAME = "Hourcess";

export const SITE_TAGLINE = "Choose what happens next";

export const SITE_DESCRIPTION =
  "You opened your phone for one thing. Somehow you're still here. Hourcess notices the pattern and offers one real moment worth choosing instead — without stopping you.";

export const SITE_KEYWORDS = [
  "Hourcess",
  "Hourcess app",
  "stop doomscrolling",
  "phone habit",
  "digital wellbeing",
  "choose offline",
  "mindful phone use",
  "screen time alternative",
  "iOS waitlist",
  "real moments",
  "break the scroll",
] as const;

/** Public support / legal contact (also used for App Store & Play Console). */
export const SUPPORT_EMAIL = "hello@adnanstudios.com";

export const LEGAL_ENTITY = "Hourcess";

export const LEGAL_EFFECTIVE_DATE = "September 5, 2026";

/** Matches in-app HourcessPaywallView copy. */
export const PAYWALL_HEADLINE = "Choose what happens next";
export const PAYWALL_TAGLINE =
  "Unlock Hourcess and get a real moment when the scroll takes over.";

/**
 * RevenueCat / App Store / Play Store subscription products.
 * Prices shown on the web are illustrative — live store prices may vary by region.
 */
export const SUBSCRIPTION_PLANS = [
  {
    id: "hourcess_lite",
    name: "Hourcess Lite",
    shortName: "Lite",
    billing: "Monthly",
    periodLabel: "month",
    productHint: "Monthly auto-renewable subscription",
    subtitle: "Billed monthly",
    displayPrice: "$4.99/mo",
    billedHint: "monthly",
    popular: false,
    summary:
      "Full Hourcess access billed every month. Cancel anytime in your store account settings.",
  },
  {
    id: "hourcess_pro",
    name: "Hourcess Pro",
    shortName: "Pro",
    billing: "Yearly",
    periodLabel: "year",
    productHint: "Yearly auto-renewable subscription",
    subtitle: "Best value · billed yearly",
    displayPrice: "$29.99/yr",
    billedHint: "yearly",
    popular: true,
    summary:
      "Full Hourcess access billed once a year — typically the better value vs monthly. Cancel anytime in your store account settings.",
  },
] as const;

export const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/support", label: "Support" },
  { href: "/delete-account", label: "Delete account" },
] as const;

/** In-app account deletion steps (App Store Review / user help). */
export const ACCOUNT_DELETION_STEPS = [
  "Open the Hourcess app",
  "Go to Profile",
  "Tap Delete account (or open Account, then Delete account)",
  "Confirm deletion",
  "You’ll be signed out and returned to the welcome screen",
] as const;
