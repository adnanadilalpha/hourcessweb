import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
        ) : null}
      </div>
      {children ? <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div> : null}
    </div>
  );
}

export function AdminMetricCard({
  label,
  value,
  hint,
  accent = "default",
  href,
}: {
  label: string;
  value: number | string;
  hint?: string;
  accent?: "default" | "lavender" | "dark";
  href?: string;
}) {
  const styles = {
    default: "bg-zinc-100 border-zinc-200/80",
    lavender: "bg-admin-accent-soft border-admin-accent/20",
    dark: "bg-zinc-900 border-zinc-800 text-white",
  }[accent];

  const inner = (
    <div className={cn("rounded-3xl border p-5 transition hover:shadow-md", styles)}>
      <p
        className={cn(
          "text-[11px] font-medium uppercase tracking-[0.14em]",
          accent === "dark" ? "text-zinc-400" : "text-zinc-500",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-2 font-display text-4xl font-semibold tracking-tight",
          accent === "dark" ? "text-white" : "text-zinc-900",
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className={cn("mt-1.5 text-xs", accent === "dark" ? "text-zinc-400" : "text-zinc-500")}>
          {hint}
        </p>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-admin-accent/40"
      >
        {inner}
      </Link>
    );
  }

  return inner;
}
