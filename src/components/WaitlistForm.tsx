"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitWebsiteWaitlist } from "@/lib/actions/waitlist";
import { HourcessIcon } from "@/components/HourcessBrand";
import { easeOutExpo } from "@/lib/motion";

type State = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border border-white/12 bg-black/35 px-4 py-3 font-ui text-sm text-primary outline-none transition-colors placeholder:text-secondary/40 focus:border-lavender/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender disabled:opacity-50";

export default function WaitlistForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [appleIdEmail, setAppleIdEmail] = useState("");
  const [sameAppleId, setSameAppleId] = useState(true);
  const [deviceModel, setDeviceModel] = useState("");
  const [iosVersion, setIosVersion] = useState("");
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setState("loading");
    const result = await submitWebsiteWaitlist({
      fullName,
      email,
      appleIdEmail: sameAppleId ? undefined : appleIdEmail,
      deviceModel,
      iosVersion,
    });

    if (result.success) {
      setState("success");
    } else {
      setErrorMsg(result.error || "Request wasn't saved. Try again.");
      setState("error");
    }
  }

  function clearError() {
    if (state === "error") setState("idle");
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
              Request received.
            </h3>
            <p className="font-ui text-sm text-secondary md:text-base">
              We&apos;ll send a TestFlight invite to your Apple ID email soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="mb-1 font-ui text-xs leading-relaxed text-secondary">
              Request an iOS beta invite via TestFlight. Use the email tied to your Apple ID.
            </p>

            <label className="block">
              <span className="mb-1.5 block font-ui text-[11px] uppercase tracking-[0.14em] text-secondary">
                Name
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  clearError();
                }}
                placeholder="Your name"
                required
                autoComplete="name"
                disabled={state === "loading"}
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block font-ui text-[11px] uppercase tracking-[0.14em] text-secondary">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError();
                }}
                placeholder="you@email.com"
                required
                autoComplete="email"
                disabled={state === "loading"}
                className={fieldClass}
              />
            </label>

            <label className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-black/20 px-3 py-2.5">
              <input
                type="checkbox"
                checked={sameAppleId}
                onChange={(e) => setSameAppleId(e.target.checked)}
                disabled={state === "loading"}
                className="mt-0.5 size-4 accent-[#a88ee4]"
              />
              <span className="font-ui text-xs leading-snug text-secondary">
                This email is also my Apple ID (TestFlight invite goes here)
              </span>
            </label>

            {!sameAppleId ? (
              <label className="block">
                <span className="mb-1.5 block font-ui text-[11px] uppercase tracking-[0.14em] text-secondary">
                  Apple ID email for TestFlight
                </span>
                <input
                  type="email"
                  value={appleIdEmail}
                  onChange={(e) => {
                    setAppleIdEmail(e.target.value);
                    clearError();
                  }}
                  placeholder="appleid@icloud.com"
                  required={!sameAppleId}
                  autoComplete="email"
                  disabled={state === "loading"}
                  className={fieldClass}
                />
              </label>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-ui text-[11px] uppercase tracking-[0.14em] text-secondary">
                  iPhone model
                </span>
                <input
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder="e.g. iPhone 15"
                  disabled={state === "loading"}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-ui text-[11px] uppercase tracking-[0.14em] text-secondary">
                  iOS version
                </span>
                <input
                  type="text"
                  value={iosVersion}
                  onChange={(e) => setIosVersion(e.target.value)}
                  placeholder="e.g. 18.2"
                  disabled={state === "loading"}
                  className={fieldClass}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={state === "loading" || !fullName.trim() || !email.trim()}
              className="mt-1 w-full rounded-2xl px-6 py-3.5 font-ui text-sm font-medium text-ink transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
              style={{
                background: "linear-gradient(135deg, #8d6be9 0%, #a88ee4 55%, #bba1f0 100%)",
                boxShadow: "0 10px 36px rgba(168, 142, 228, 0.3)",
              }}
            >
              {state === "loading" ? "Sending…" : "Request TestFlight invite"}
            </button>

            {state === "error" && (
              <p className="font-ui text-sm text-red-400" role="alert">
                Something went wrong. {errorMsg}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
