"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Users,
} from "lucide-react";
import { signOutAdmin } from "@/lib/actions/auth";
import { HourcessIcon } from "@/components/HourcessBrand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const NAV: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/waitlist", label: "Beta", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/email", label: "Email", icon: Mail },
] as const;

function initials(email: string) {
  return email.slice(0, 2).toUpperCase();
}

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="hidden w-18 shrink-0 flex-col items-center border-r border-zinc-800 bg-zinc-950 py-5 lg:flex">
        <Link
          href="/admin"
          className="mb-8 flex size-11 items-center justify-center rounded-2xl bg-zinc-900 text-admin-accent"
        >
          <HourcessIcon size={22} />
        </Link>

        <nav className="flex flex-1 flex-col items-center gap-2">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex size-11 items-center justify-center rounded-2xl transition-all",
                      active
                        ? "bg-zinc-800 text-white shadow-inner"
                        : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200",
                    )}
                  >
                    <Icon className="size-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex size-11 items-center justify-center rounded-2xl text-zinc-500 transition hover:bg-zinc-900 hover:text-zinc-200"
              >
                <ExternalLink className="size-5" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">View website</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-admin-accent/50"
              >
                <Avatar className="size-10 border border-zinc-800">
                  <AvatarFallback>{initials(email)}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-medium text-zinc-900">Admin</p>
                <p className="truncate text-xs text-zinc-500">{email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/email">
                  <Settings className="size-4" />
                  Email settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={() => {
                  const form = document.getElementById("admin-signout") as HTMLFormElement | null;
                  form?.requestSubmit();
                }}
              >
                <LogOut className="size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </TooltipProvider>
  );
}

export function AdminSignOutForm() {
  return (
    <form id="admin-signout" action={signOutAdmin} className="hidden" />
  );
}
