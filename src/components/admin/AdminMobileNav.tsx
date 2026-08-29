"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LayoutDashboard, LogOut, Mail, Menu, Users } from "lucide-react";
import { signOutAdmin } from "@/lib/actions/auth";
import { HourcessIcon } from "@/components/HourcessBrand";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/waitlist", label: "Waitlist", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/email", label: "Email", icon: Mail },
] as const;

export default function AdminMobileNav({ email }: { email: string }) {
  const pathname = usePathname();
  const current = NAV.find((n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href)));

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-zinc-900 text-admin-accent">
          <HourcessIcon size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900">{current?.label ?? "Admin"}</p>
          <p className="truncate text-[11px] text-zinc-500">{email}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon-sm">
              <Menu className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className={cn(active && "font-medium text-admin-accent")}>
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <form action={signOutAdmin}>
          <Button type="submit" variant="ghost" size="icon-sm">
            <LogOut className="size-4" />
          </Button>
        </form>
      </div>
    </header>
  );
}
