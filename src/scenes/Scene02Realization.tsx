"use client";

import { motion, useMotionTemplate, useTransform } from "framer-motion";
import PinnedScene from "@/components/PinnedScene";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/**
 * Realization — scrubbed film cut. Scroll forward or back through every line.
 */
export default function Scene02Realization() {
  const { ref, progress } = useSectionScroll();

  const meantOp = useTransform(progress, [0, 0.08, 0.22, 0.3], [0, 1, 1, 0]);
  const meantClip = useTransform(progress, [0, 0.1], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  const somehowOp = useTransform(progress, [0.26, 0.34, 0.42, 0.5], [0, 1, 1, 0]);

  const fortyScale = useTransform(progress, [0.44, 0.58, 0.7, 0.8], [0.16, 7.4, 7.4, 1]);
  const fortyOp = useTransform(progress, [0.42, 0.5, 0.8, 0.88], [0, 1, 1, 0]);
  const fortyBlur = useTransform(progress, [0.44, 0.52, 0.7, 0.78], [18, 0, 0, 4]);
  const fortyFilter = useMotionTemplate`blur(${fortyBlur}px)`;
  const minOp = useTransform(progress, [0.52, 0.6, 0.8, 0.88], [0, 1, 1, 0]);

  const familiarOp = useTransform(progress, [0.86, 0.94], [0, 1]);
  const familiarClip = useTransform(progress, [0.86, 0.95], ["inset(0 0 80% 0)", "inset(0 0 0% 0)"]);

  return (
    <PinnedScene height="200vh" innerRef={ref} id="realization">
      <div
        className="absolute inset-0"
        aria-label="You only meant to check something. Forty-seven minutes later. Sound familiar?"
      >
        <motion.p
          className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(1.45rem,3.4vw,2.3rem)] font-medium text-secondary"
          style={{ opacity: meantOp, clipPath: meantClip }}
        >
          You only meant to check something.
        </motion.p>

        <motion.p
          className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center font-ui text-sm uppercase tracking-[0.4em] text-lavender"
          style={{ opacity: somehowOp }}
        >
          And somehow...
        </motion.p>

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: fortyOp, scale: fortyScale, filter: fortyFilter }}
          aria-hidden
        >
          <p className="font-display text-[22vw] font-semibold leading-none tracking-tighter text-primary">
            47
          </p>
        </motion.div>

        <motion.p
          className="absolute bottom-[18%] left-0 right-0 text-center font-display text-[clamp(1.2rem,3vw,2rem)] font-medium tracking-[0.35em] text-lavender"
          style={{ opacity: minOp }}
        >
          MINUTES
        </motion.p>

        <motion.p
          className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center font-display text-[clamp(2.1rem,6.5vw,4.6rem)] font-semibold tracking-tight text-primary"
          style={{ opacity: familiarOp, clipPath: familiarClip }}
        >
          Sound familiar?
        </motion.p>
      </div>
    </PinnedScene>
  );
}
