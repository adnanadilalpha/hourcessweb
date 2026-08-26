"use client";

import { type ReactNode, type RefObject } from "react";

interface PinnedSceneProps {
  children: ReactNode;
  height: string;
  className?: string;
  id?: string;
  innerRef?: RefObject<HTMLElement | null>;
}

export default function PinnedScene({
  children,
  height,
  className = "",
  id,
  innerRef,
}: PinnedSceneProps) {
  return (
    <section ref={innerRef as RefObject<HTMLElement>} id={id} className={`relative ${className}`} style={{ height }}>
      <div className="sticky top-0 h-dvh overflow-hidden bg-background">{children}</div>
    </section>
  );
}
