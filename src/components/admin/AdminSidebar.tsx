"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAdmin } from "@/lib/actions/auth";
import { HourcessIcon } from "@/components/HourcessBrand";

const LINKS: { href: string; label: string; exact?: boolean }[] = [
  { href: "/admin", label: "Overview", exact: true },
  { href: "/admin/waitlist", label: "Website waitlist" },
  { href: "/admin/analytics", label: "App analytics" },
  { href: "/admin/email", label: "Email setup" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-white/10 bg-[#121216] lg:flex">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <HourcessIcon size={28} />
        <div>
          <p className="font-display text-sm font-semibold tracking-wide text-primary">Admin</p>
          <p className="truncate font-ui text-[11px] text-secondary">{email}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {LINKS.map((link) => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-3 py-2.5 font-ui text-sm transition-colors ${
                active
                  ? "bg-lavender/15 text-lavender"
                  : "text-secondary hover:bg-white/5 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <form action={signOutAdmin} className="border-t border-white/10 p-3">
        <button
          type="submit"
          className="w-full rounded-xl px-3 py-2.5 text-left font-ui text-sm text-secondary transition-colors hover:bg-white/5 hover:text-primary"
        >
          Sign out
        </button>
      </form>
    </aside>
  );
}
