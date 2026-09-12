"use client";

import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";
import { HourcessIcon, HourcessWordmarkSVG } from "@/components/HourcessBrand";
import { easeOutExpo } from "@/lib/motion";

/**
 * Final destination — iOS TestFlight beta request.
 */
export default function Scene06Waitlist() {
  return (
    <section
      id="waitlist"
      className="relative flex min-h-dvh items-end overflow-hidden md:items-center"
      aria-label="Request Hourcess iOS TestFlight beta"
    >
      <img
        src="/story/leaving-room.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/58" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/55" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/30" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 pb-36 pt-24 text-center md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 1, ease: easeOutExpo }}
          className="flex w-full flex-col items-center"
        >
          <HourcessIcon size={52} />

          <p className="mt-8 font-ui text-[10px] uppercase tracking-[0.42em] text-lavender">
            iOS beta
          </p>

          <h2 className="mt-5 font-display text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[1.02] tracking-tight text-primary">
            Try Hourcess
            <br />
            on TestFlight
          </h2>

          <p className="mt-5 max-w-md font-ui text-[15px] leading-relaxed text-primary/65 md:text-base">
            Request a beta invite. We&apos;ll email you a TestFlight link for iPhone.
          </p>

          <div className="mt-8 mb-8">
            <HourcessWordmarkSVG width={168} />
          </div>

          <div
            className="w-full max-w-md rounded-3xl border border-white/12 p-5 text-left backdrop-blur-xl md:p-6"
            style={{
              background: "rgba(12,12,16,0.55)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <WaitlistForm />
          </div>

          <p className="mt-10 font-ui text-[11px] tracking-wide text-primary/35">
            Hourcess · iOS TestFlight beta
          </p>

          <nav
            aria-label="Legal"
            className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-ui text-[11px] text-primary/40"
          >
            <a href="/privacy" className="transition hover:text-lavender">
              Privacy
            </a>
            <span aria-hidden className="text-primary/20">
              ·
            </span>
            <a href="/terms" className="transition hover:text-lavender">
              Terms
            </a>
            <span aria-hidden className="text-primary/20">
              ·
            </span>
            <a href="/support" className="transition hover:text-lavender">
              Support
            </a>
            <span aria-hidden className="text-primary/20">
              ·
            </span>
            <a href="/delete-account" className="transition hover:text-lavender">
              Delete account
            </a>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
