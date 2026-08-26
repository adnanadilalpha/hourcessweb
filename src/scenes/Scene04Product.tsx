"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Device from "@/components/Device";
import { HourcessIcon } from "@/components/HourcessBrand";
import { easeOutExpo } from "@/lib/motion";

export type ProductChoice = "go" | "not-now" | null;

/**
 * Product chapter — the world waiting behind the phone.
 * Not a centered SaaS stack: editorial stage + one real artifact + one choice.
 */
export default function Scene04Product() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const wasInView = useRef(false);
  const [choice, setChoice] = useState<ProductChoice>(null);
  const [visit, setVisit] = useState(0);

  useEffect(() => {
    if (inView && !wasInView.current) {
      setVisit((v) => v + 1);
      setChoice(null);
    }
    wasInView.current = inView;
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh overflow-hidden bg-background"
      aria-label="Still scrolling? Hourcess offers football. Let's go or not now."
    >
      <AnimatePresence mode="sync">
        {choice === "go" ? (
          <WorldBreak key={`world-${visit}`} />
        ) : (
          <InsideApp key={`app-${visit}`} choice={choice} onChoose={setChoice} />
        )}
      </AnimatePresence>
    </section>
  );
}

function InsideApp({
  choice,
  onChoose,
}: {
  choice: ProductChoice;
  onChoose: (c: ProductChoice) => void;
}) {
  return (
    <motion.div
      className="relative h-dvh overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      {/* The alternative life — waiting behind the glass */}
      <motion.img
        src="/story/feed-concert.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: easeOutExpo }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/40" />
      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/50" />

      <div className="relative z-10 mx-auto grid h-dvh max-w-6xl items-center gap-8 px-6 pb-28 pt-16 md:grid-cols-[1fr_auto] md:gap-10 md:px-12 md:pb-32">
        {/* Editorial copy — left, like a title card */}
        <div className="order-2 max-w-md md:order-1">
          <motion.p
            className="font-ui text-[10px] uppercase tracking-[0.42em] text-lavender"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            One offer
          </motion.p>
          <motion.h2
            className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.02] tracking-tight text-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.85, ease: easeOutExpo }}
          >
            Still
            <br />
            scrolling?
          </motion.h2>
          <motion.p
            className="mt-5 max-w-sm font-ui text-[15px] leading-relaxed text-primary/65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Hourcess notices the pattern — and offers one thing worth doing instead.
          </motion.p>

          <div className="mt-8 max-w-sm">
            <AnimatePresence mode="wait">
              {choice === "not-now" ? (
                <motion.div
                  key="pass"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="font-display text-xl font-semibold text-primary">Your choice.</p>
                  <p className="mt-2 font-ui text-sm text-secondary">
                    Nothing happens. No shame. That&apos;s the point.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="cta"
                  className="flex flex-col gap-3 sm:flex-row"
                  role="group"
                  aria-label="Choose an alternative"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6, ease: easeOutExpo }}
                >
                  <button
                    type="button"
                    onClick={() => onChoose("go")}
                    className="flex-1 rounded-full py-3.5 font-ui text-sm font-medium text-ink transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #8d6be9 0%, #bba1f0 100%)",
                      boxShadow: "0 12px 40px rgba(168,142,228,0.35)",
                    }}
                  >
                    Let&apos;s go
                  </button>
                  <button
                    type="button"
                    onClick={() => onChoose("not-now")}
                    className="flex-1 rounded-full border border-white/20 bg-black/30 py-3.5 font-ui text-sm font-medium text-primary/80 backdrop-blur-md transition-colors hover:border-white/35 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender active:scale-[0.98]"
                  >
                    Not now
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Phone — the artifact */}
        <motion.div
          className="order-1 flex justify-center md:order-2 md:justify-end"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.12 }}
        >
          <div className="relative">
            <Device scale={0.5} className="md:hidden">
              <img
                src="/app/home.png"
                alt="Hourcess suggesting Football for 60 minutes"
                className="h-full w-full object-cover object-top"
              />
            </Device>
            <Device scale={0.58} className="hidden md:block">
              <img
                src="/app/home.png"
                alt="Hourcess suggesting Football for 60 minutes"
                className="h-full w-full object-cover object-top"
              />
            </Device>
            <div
              className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[85%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-2xl"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function WorldBreak() {
  return (
    <motion.div
      className="relative h-dvh overflow-hidden"
      initial={{ clipPath: "inset(20% 34% 20% 34% round 44px)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
      transition={{ duration: 1.4, ease: easeOutExpo }}
      aria-label="You chose football. See you out there."
    >
      <motion.img
        src="/story/friends-night.png"
        alt="Friends together at night"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.7, ease: easeOutExpo }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-black/45" />

      <div className="absolute inset-x-0 bottom-0 p-8 pb-28 md:p-14 md:pb-32">
        <motion.div
          className="mb-5 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.65, ease: easeOutExpo }}
        >
          <HourcessIcon size={30} />
          <span className="font-ui text-[11px] uppercase tracking-[0.4em] text-primary/70">
            Football · 60 min
          </span>
        </motion.div>
        <motion.p
          className="font-display text-[clamp(2.3rem,6.5vw,4.4rem)] font-semibold tracking-tight text-primary"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.75, ease: easeOutExpo }}
        >
          See you out there.
        </motion.p>
      </div>
    </motion.div>
  );
}
