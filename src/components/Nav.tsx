"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { HourcessIcon, HourcessWordmarkSVG } from "@/components/HourcessBrand";

interface NavProps {
  onWaitlistClick: () => void;
}

/**
 * Floating dock — studio pattern (Zero-style), keeps the film uncluttered.
 */
export default function Nav({ onWaitlistClick }: NavProps) {
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setSolid(y > 40));
  }, [scrollY]);

  return (
    <>
      {/* Top wordmark — fades once dock owns the brand */}
      <motion.a
        href="#top"
        className="fixed left-6 top-6 z-50 md:left-10 md:top-8"
        aria-label="Hourcess home"
        initial={{ opacity: 0 }}
        animate={{ opacity: solid ? 0 : 1 }}
        transition={{ duration: 0.45 }}
        style={{ pointerEvents: solid ? "none" : "auto" }}
      >
        <HourcessWordmarkSVG width={128} />
      </motion.a>

      <motion.nav
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 p-1.5 pl-2 pr-1.5 md:bottom-8"
        style={{
          background: solid ? "rgba(18,18,22,0.88)" : "rgba(18,18,22,0.55)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender/15 transition-colors hover:bg-lavender/25"
          aria-label="Hourcess"
        >
          <HourcessIcon size={22} />
        </a>

        <button
          type="button"
          onClick={onWaitlistClick}
          className="rounded-full bg-primary px-5 py-2.5 font-ui text-sm font-medium text-ink transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender"
        >
          Request beta
        </button>
      </motion.nav>
    </>
  );
}
