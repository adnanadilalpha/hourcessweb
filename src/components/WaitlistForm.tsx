"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitWebsiteWaitlist } from "@/lib/actions/waitlist";
import { HourcessIcon } from "@/components/HourcessBrand";
import { easeOutExpo } from "@/lib/motion";

type State = "idle" | "loading" | "success" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setState("loading");
    const result = await submitWebsiteWaitlist(email);

    if (result.success) {
      setState("success");
    } else {
      setErrorMsg(result.error || "Your spot wasn't saved. Try again.");
      setState("error");
    }
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="py-2 text-center"
          >
            <div className="mb-5 flex justify-center">
              <HourcessIcon size={56} />
            </div>
            <h3 className="mb-2 font-display text-2xl font-semibold text-primary md:text-3xl">
              You&apos;re in.
            </h3>
            <p className="font-ui text-sm text-secondary md:text-base">Your next moment is waiting.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              placeholder="your@email.com"
              aria-label="Email address"
              required
              disabled={state === "loading"}
              autoComplete="email"
              className="min-w-0 flex-1 rounded-2xl border border-white/12 bg-black/35 px-5 py-3.5 font-ui text-base text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-lavender/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={state === "loading" || !email.trim()}
              className="shrink-0 rounded-2xl px-6 py-3.5 font-ui text-sm font-medium text-ink transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
              style={{
                background: "linear-gradient(135deg, #8d6be9 0%, #a88ee4 55%, #bba1f0 100%)",
                boxShadow: "0 10px 36px rgba(168, 142, 228, 0.3)",
              }}
            >
              {state === "loading" ? "Saving..." : "Choose my spot"}
            </button>

            {state === "error" && (
              <p className="basis-full font-ui text-sm text-red-400 sm:order-last" role="alert">
                Something went wrong. {errorMsg}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
