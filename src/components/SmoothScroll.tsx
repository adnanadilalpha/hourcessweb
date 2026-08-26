"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";

function LenisFramerSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const instance = lenis;
    function update(data: { timestamp: number }) {
      instance.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [lenis]);

  return null;
}

/**
 * Butter-smooth scroll (Zero / Apple product-page feel).
 * Story progress is driven by real scroll — works both directions.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.15,
        wheelMultiplier: 0.9,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <LenisFramerSync />
      {children}
    </ReactLenis>
  );
}
