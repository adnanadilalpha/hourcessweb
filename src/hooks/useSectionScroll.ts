import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Reliable section scroll progress.
 * Uses global window scrollY + ResizeObserver instead of framer-motion's
 * target ref, which breaks when body has overflow rules or is in an iframe.
 */
export function useSectionScroll(): {
  ref: React.RefObject<HTMLElement>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [top, setTop] = useState(0);
  const [totalHeight, setTotalHeight] = useState(1);

  useEffect(() => {
    function measure() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const docTop = rect.top + window.scrollY;
      setTop(docTop);
      setTotalHeight(el.scrollHeight);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  // progress goes 0→1 as the section scrolls from entering to leaving the viewport
  const progress = useTransform(scrollY, [top, top + totalHeight - vh], [0, 1], {
    clamp: true,
  });

  return { ref: ref as React.RefObject<HTMLElement>, progress };
}
