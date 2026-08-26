"use client";

import { motion } from "framer-motion";

/** Zero-style scroll cue — quiet, physical, not a chevron animation spam */
export default function ScrollHint({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-24 left-1/2 z-20 -translate-x-1/2 md:bottom-28"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      <div
        className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-md"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-lavender" />
        <span className="font-ui text-[10px] uppercase tracking-[0.38em] text-primary/80">
          Scroll
        </span>
      </div>
    </motion.div>
  );
}
