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
