"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "@/lib/actions/auth";

const LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Home", exact: true },
  { href: "/admin/waitlist", label: "Waitlist" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/email", label: "Email" },
];

export default function AdminMobileNav({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="font-display text-sm font-semibold">Hourcess Admin</p>
          <p className="font-ui text-[11px] text-secondary">{email}</p>
        </div>
        <form action={signOutAdmin}>
          <button type="submit" className="font-ui text-xs text-lavender">
            Sign out
          </button>
        </form>
      </header>
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-[#121216]/90 backdrop-blur-xl">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex-1 py-3 text-center font-ui text-[11px] ${
                active ? "text-lavender" : "text-secondary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
