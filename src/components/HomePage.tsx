"use client";

import { useLenis } from "lenis/react";
import Nav from "@/components/Nav";
import Grain from "@/components/Grain";
import SmoothScroll from "@/components/SmoothScroll";
import Scene00Opening from "@/scenes/Scene00Opening";
import Scene01TheScroll from "@/scenes/Scene01TheScroll";
import Scene02Realization from "@/scenes/Scene02Realization";
import Scene03TheQuestion from "@/scenes/Scene03TheQuestion";
import Scene04Product from "@/scenes/Scene04Product";
import Scene05Meaning from "@/scenes/Scene05Meaning";
import Scene06Waitlist from "@/scenes/Scene06Waitlist";
import ReducedMotionStory from "@/scenes/ReducedMotionStory";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function Film() {
  const lenis = useLenis();

  function scrollToWaitlist() {
    const el = document.getElementById("waitlist");
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="relative bg-background" id="top">
      <a
        href="#waitlist"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-primary"
      >
        Skip to beta signup
      </a>
      <Grain />
      <Nav onWaitlistClick={scrollToWaitlist} />

      <main>
        <Scene00Opening />
        <Scene01TheScroll />
        <Scene02Realization />
        <Scene03TheQuestion />
        <Scene04Product />
        <Scene05Meaning />
        <Scene06Waitlist />
      </main>
    </div>
  );
}

export default function HomePage() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className="relative bg-background" id="top">
        <Nav
          onWaitlistClick={() =>
            document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })
          }
        />
        <ReducedMotionStory />
      </div>
    );
  }

  return (
    <SmoothScroll>
      <Film />
    </SmoothScroll>
  );
}
