"use client";

import { motion, useTransform } from "framer-motion";
import PinnedScene from "@/components/PinnedScene";
import { HourcessIcon, HourcessWordmarkSVG } from "@/components/HourcessBrand";
import { useSectionScroll } from "@/hooks/useSectionScroll";

/**
 * Three film cuts scrubbed by scroll — long holds so nothing skips.
 * Each photograph is the argument; type just names it.
 */
export default function Scene03TheQuestion() {
  const { ref, progress } = useSectionScroll();

  const habitOp = useTransform(progress, [0, 0.04, 0.22, 0.3], [0, 1, 1, 0]);
  const habitScale = useTransform(progress, [0, 0.28], [1.1, 1]);
  const habitLine = useTransform(progress, [0.05, 0.12, 0.2, 0.28], [0, 1, 1, 0]);
  const habitY = useTransform(progress, [0.05, 0.12], [32, 0]);

  const gapOp = useTransform(progress, [0.28, 0.36, 0.5, 0.58], [0, 1, 1, 0]);
  const gapClip = useTransform(progress, [0.3, 0.4], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  const worldOp = useTransform(progress, [0.54, 0.62, 1], [0, 1, 1]);
  const worldScale = useTransform(progress, [0.54, 1], [1.12, 1]);
  const worldLine = useTransform(progress, [0.6, 0.7, 1], [0, 1, 1]);
  const markOp = useTransform(progress, [0.72, 0.82, 1], [0, 1, 1]);
  const wordOp = useTransform(progress, [0.8, 0.88, 1], [0, 1, 1]);

  return (
    <PinnedScene height="320vh" innerRef={ref} id="hourcess-reveal">
      <div
        className="absolute inset-0 overflow-hidden"
        aria-label="Maybe the problem isn't the phone. It's not knowing what to do instead. What if your phone could help you choose?"
      >
        {/* CUT 1 */}
        <motion.div className="absolute inset-0" style={{ opacity: habitOp }} aria-hidden>
          <motion.img
            src="/story/phone-down.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: habitScale }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-[20%] z-10 px-8 md:px-16"
          style={{ opacity: habitLine, y: habitY }}
        >
          <p className="max-w-xl font-display text-[clamp(1.85rem,4.5vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-primary">
            Maybe the problem isn&apos;t
            <br />
            that you use your phone.
          </p>
        </motion.div>

        {/* CUT 2 */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center bg-background px-8"
          style={{ opacity: gapOp }}
        >
          <motion.p
            className="max-w-2xl text-center font-display text-[clamp(1.55rem,4vw,2.9rem)] font-medium leading-snug tracking-tight text-primary"
            style={{ clipPath: gapClip }}
          >
            It&apos;s that sometimes you don&apos;t know
            <br />
            <span className="text-lavender">what you want to do instead.</span>
          </motion.p>
        </motion.div>

        {/* CUT 3 */}
        <motion.div className="absolute inset-0" style={{ opacity: worldOp }} aria-hidden>
          <motion.img
            src="/story/football-dusk.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: worldScale }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-black/40" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-7 px-6 text-center">
          <motion.p
            className="font-display text-[clamp(1.9rem,5.2vw,3.6rem)] font-semibold leading-[1.05] tracking-tight text-primary"
            style={{ opacity: worldLine }}
          >
            What if your phone
            <br />
            could help you choose?
          </motion.p>
          <motion.div style={{ opacity: markOp }} aria-hidden>
            <HourcessIcon size={64} />
          </motion.div>
          <motion.div style={{ opacity: wordOp }} aria-hidden>
            <HourcessWordmarkSVG width={176} />
          </motion.div>
        </div>
      </div>
    </PinnedScene>
  );
}
