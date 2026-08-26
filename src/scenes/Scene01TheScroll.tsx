"use client";

import { useMemo } from "react";
import { motion, useTransform } from "framer-motion";
import PinnedScene from "@/components/PinnedScene";
import { useSectionScroll } from "@/hooks/useSectionScroll";

const LINES = [
  "just one more",
  "for you",
  "liked",
  "live",
  "wait",
  "new",
  "watch next",
  "don't miss",
  "again",
  "unmute",
  "reply",
  "seen",
  "skip",
  "typing…",
  "one more",
  "follow",
] as const;

function seed(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Chaos scrub — scroll owns the pace both ways.
 */
export default function Scene01TheScroll() {
  const { ref, progress } = useSectionScroll();

  const field = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        text: LINES[i % LINES.length],
        x: 8 + seed(i + 1) * 74,
        y: 12 + seed(i + 9) * 70,
        accent: i % 4 === 0,
        in: 0.04 + (i / 28) * 0.38,
        out: 0.52 + (i % 7) * 0.025,
      })),
    [],
  );

  const fieldY = useTransform(progress, [0.02, 0.58], [50, -300]);
  const fieldOp = useTransform(progress, [0.01, 0.06, 0.55, 0.65], [0, 1, 1, 0]);
  const density = useTransform(progress, [0.06, 0.5], [0.9, 1.12]);

  const stopOp = useTransform(progress, [0.62, 0.7, 0.82, 0.88], [0, 1, 1, 0]);
  const waitOp = useTransform(progress, [0.86, 0.93], [0, 1]);
  const waitClip = useTransform(progress, [0.86, 0.95], ["inset(50% 0 50% 0)", "inset(0% 0 0% 0)"]);

  return (
    <PinnedScene height="220vh" innerRef={ref} id="the-scroll">
      <div className="absolute inset-0" aria-label="The scroll. Feed language builds, then stop.">
        <motion.div
          className="absolute inset-0"
          style={{ y: fieldY, opacity: fieldOp, scale: density }}
        >
          {field.map((item) => (
            <DriftLine key={item.id} item={item} progress={progress} />
          ))}
        </motion.div>

        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: stopOp }}
        >
          <p className="font-display text-[clamp(4rem,16vw,10rem)] font-semibold leading-none tracking-tight text-primary">
            STOP.
          </p>
        </motion.div>

        <motion.p
          className="absolute inset-x-6 top-1/2 z-10 -translate-y-1/2 text-center font-display text-[clamp(1.6rem,4vw,2.8rem)] font-medium text-secondary"
          style={{ opacity: waitOp, clipPath: waitClip }}
        >
          Wait.
        </motion.p>
      </div>
    </PinnedScene>
  );
}

function DriftLine({
  item,
  progress,
}: {
  item: {
    id: number;
    text: string;
    x: number;
    y: number;
    accent: boolean;
    in: number;
    out: number;
  };
  progress: ReturnType<typeof useSectionScroll>["progress"];
}) {
  const opacity = useTransform(
    progress,
    [item.in, item.in + 0.05, item.out, item.out + 0.07],
    [0, item.accent ? 0.95 : 0.48, item.accent ? 0.95 : 0.48, 0],
  );

  return (
    <motion.p
      className={`absolute select-none whitespace-nowrap ${
        item.accent ? "font-display font-semibold text-lavender" : "font-ui text-primary/55"
      }`}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        fontSize: item.accent ? "clamp(1.1rem, 3.2vw, 2rem)" : "clamp(0.85rem, 2vw, 1.15rem)",
        letterSpacing: item.accent ? "0.06em" : "0.02em",
        opacity,
      }}
    >
      {item.text}
    </motion.p>
  );
}
