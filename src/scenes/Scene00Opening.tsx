"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollHint from "@/components/ScrollHint";
import { HourcessIcon } from "@/components/HourcessBrand";
import { easeOutExpo } from "@/lib/motion";

export type OpeningBeat = "black" | "honest" | "why" | "remember" | "ready";

/**
 * Opening as a single cinematic still — type on photography, not floating cards.
 */
export default function Scene00Opening() {
  const [beat, setBeat] = useState<OpeningBeat>("black");

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setBeat("honest"), 600),
      window.setTimeout(() => setBeat("why"), 2400),
      window.setTimeout(() => setBeat("remember"), 5800),
      window.setTimeout(() => setBeat("ready"), 8600),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const showStill = beat !== "black";
  const showMark = beat === "remember" || beat === "ready";

  return (
    <section
      className="relative h-dvh overflow-hidden bg-background"
      aria-label="Opening. A short question about why you picked up your phone."
    >
      <motion.img
        src="/story/face-phone.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{
          opacity: showStill ? 1 : 0,
          scale: showStill ? 1 : 1.08,
        }}
        transition={{ duration: 1.6, ease: easeOutExpo }}
      />
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: showStill ? 0.55 : 1 }}
        transition={{ duration: 1.4, ease: easeOutExpo }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/50" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-9 px-6">
        <AnimatePresence mode="wait">
          {beat === "honest" && (
            <Line
              key="honest"
              className="font-ui text-sm uppercase tracking-[0.42em] text-primary/70 md:text-base"
            >
              Be honest.
            </Line>
          )}
          {beat === "why" && (
            <Line
              key="why"
              className="max-w-4xl text-center font-display text-[clamp(2rem,6vw,4.6rem)] font-semibold leading-[1.08] tracking-tight text-primary"
              hold
            >
              Why did you pick up your phone?
            </Line>
          )}
          {(beat === "remember" || beat === "ready") && (
            <Line
              key="remember"
              className="w-full text-center font-display text-[clamp(1.5rem,3.6vw,2.5rem)] font-medium tracking-tight text-primary/75"
            >
              You probably don&apos;t remember.
            </Line>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: showMark ? 1 : 0, scale: showMark ? 1 : 0.9 }}
          transition={{ duration: 1, ease: easeOutExpo }}
          aria-hidden
        >
          <HourcessIcon size={64} />
        </motion.div>
      </div>

      <ScrollHint visible={beat === "ready"} />
    </section>
  );
}

function Line({
  children,
  className,
  hold = false,
}: {
  children: string;
  className: string;
  hold?: boolean;
}) {
  return (
    <motion.p
      className={className}
      role="status"
      initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(8px)", transition: { duration: 0.4 } }}
      transition={{ duration: hold ? 1.2 : 0.9, ease: easeOutExpo }}
    >
      {children}
    </motion.p>
  );
}
