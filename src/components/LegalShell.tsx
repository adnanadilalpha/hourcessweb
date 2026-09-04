import Link from "next/link";
import { HourcessIcon, HourcessWordmarkSVG } from "@/components/HourcessBrand";
import { LEGAL_LINKS, SITE_NAME, SUPPORT_EMAIL } from "@/lib/site";

export default function LegalShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background text-primary">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(168,142,228,0.12),_transparent_55%)]" />

      <header className="relative z-10 border-b border-white/8">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <HourcessIcon size={28} />
            <HourcessWordmarkSVG width={120} />
          </Link>
          <Link
            href="/#waitlist"
            className="font-ui text-sm text-secondary transition hover:text-primary"
          >
            Waitlist
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-12 md:py-16">
        <p className="font-ui text-[11px] uppercase tracking-[0.28em] text-lavender">{SITE_NAME}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        <article className="legal-prose mt-10 space-y-8 font-ui text-[15px] leading-relaxed text-secondary">
          {children}
        </article>
      </main>

      <footer className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-ui text-xs text-secondary/80 transition hover:text-lavender"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-ui text-xs text-secondary/70 hover:text-primary"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-semibold tracking-tight text-primary">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
