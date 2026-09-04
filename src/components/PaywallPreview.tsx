"use client";

import { useState } from "react";
import Link from "next/link";
import { HourcessIcon } from "@/components/HourcessBrand";
import {
  PAYWALL_HEADLINE,
  PAYWALL_TAGLINE,
  SUBSCRIPTION_PLANS,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type PlanId = (typeof SUBSCRIPTION_PLANS)[number]["id"];

/**
 * Visual recreation of the iOS `HourcessPaywallView` (RevenueCat catalog + custom UI).
 * Purchases happen in the app — this page is for store reviewers and web visitors.
 */
export default function PaywallPreview() {
  const defaultId =
    SUBSCRIPTION_PLANS.find((p) => p.popular)?.id ?? SUBSCRIPTION_PLANS[0].id;
  const [selectedId, setSelectedId] = useState<PlanId>(defaultId);
  const selected = SUBSCRIPTION_PLANS.find((p) => p.id === selectedId) ?? SUBSCRIPTION_PLANS[0];

  return (
    <div className="mx-auto w-full max-w-[390px]">
      <div
        className="overflow-hidden rounded-[36px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.55)]"
        style={{ background: "#0a0a0c" }}
      >
        {/* Status / chrome */}
        <div className="flex items-center justify-between px-5 pt-4">
          <span className="font-ui text-[13px] font-semibold text-primary/90">Close</span>
          <span className="font-ui text-[11px] text-secondary/50">Paywall</span>
          <span className="w-10" />
        </div>

        <div className="px-6 pb-8 pt-6">
          <div className="space-y-3">
            <HourcessIcon size={44} />
            <h2 className="font-display text-[34px] font-semibold leading-none tracking-tight text-primary">
              {PAYWALL_HEADLINE}
            </h2>
            <p className="font-ui text-[15px] leading-snug text-secondary">{PAYWALL_TAGLINE}</p>
          </div>

          <div className="mt-8 space-y-2.5">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const selected = plan.id === selectedId;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedId(plan.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left transition",
                    selected
                      ? "bg-[#18181c] ring-2 ring-lavender"
                      : "bg-[#18181c]/80 ring-1 ring-white/10",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-ui text-[15px] font-semibold text-primary">
                        {plan.shortName}
                      </span>
                      {plan.popular ? (
                        <span className="rounded-full bg-lavender px-2 py-0.5 font-ui text-[10px] font-semibold text-ink">
                          Popular
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 font-ui text-[12px] text-secondary">{plan.subtitle}</p>
                  </div>
                  <span className="shrink-0 font-ui text-[15px] font-semibold tabular-nums text-primary">
                    {plan.displayPrice}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/support"
              className="flex w-full items-center justify-center rounded-xl bg-lavender py-3.5 font-ui text-[15px] font-semibold text-ink transition hover:opacity-90"
            >
              Continue with {selected.shortName}
            </Link>
            <p className="text-center font-ui text-[13px] text-lavender">Restore purchases</p>
            <p className="text-center font-ui text-[11px] leading-relaxed text-secondary">
              Billed {selected.billedHint}. Cancel anytime in Settings.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-ui text-[11px] text-secondary/70">
        Preview of the in-app paywall · purchases happen in the Hourcess iOS / Android apps via
        RevenueCat
      </p>
    </div>
  );
}
