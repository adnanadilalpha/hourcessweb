"use client";

import { motion, useTransform } from "framer-motion";
import PinnedScene from "@/components/PinnedScene";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/**
 * One still. Two lines. Scroll scrubs the poster into place.
 */
export default function Scene05Meaning() {
  const { ref, progress } = useSectionScroll();

  const scale = useTransform(progress, [0, 1], [1.16, 1]);
  const dim = useTransform(progress, [0, 0.4, 0.9], [0.32, 0.5, 0.6]);
  const titleOp = useTransform(progress, [0.1, 0.28, 1], [0, 1, 1]);
  const titleY = useTransform(progress, [0.1, 0.28], [48, 0]);
  const subOp = useTransform(progress, [0.38, 0.55, 1], [0, 1, 1]);
  const creditOp = useTransform(progress, [0.06, 0.18, 1], [0, 1, 1]);

  return (
    <PinnedScene height="240vh" innerRef={ref} id="meaning">
      <div
        className="absolute inset-0 overflow-hidden"
        aria-label="You don't need less phone. You need more moments worth choosing."
      >
        <motion.img
          src="/story/running-night.png"
          alt="Someone running at night"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale }}
        />
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: dim }} />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/40" />

        <motion.p
          className="absolute left-8 top-28 font-ui text-[10px] uppercase tracking-[0.42em] text-lavender md:left-14 md:top-32"
          style={{ opacity: creditOp }}
        >
          That&apos;s Hourcess
        </motion.p>

        <div className="absolute inset-x-8 bottom-32 md:inset-x-14 md:bottom-36">
          <motion.p
            className="max-w-3xl font-display text-[clamp(2.5rem,7.8vw,5.8rem)] font-semibold leading-[0.95] tracking-tight text-primary"
            style={{ opacity: titleOp, y: titleY }}
          >
            You don&apos;t need
            <br />
            less phone.
          </motion.p>
          <motion.p
            className="mt-6 max-w-lg font-display text-[clamp(1.3rem,3.4vw,2.15rem)] font-medium leading-snug tracking-tight text-lavender"
            style={{ opacity: subOp }}
          >
            You need more moments worth choosing.
          </motion.p>
        </div>
      </div>
    </PinnedScene>
  );
}
