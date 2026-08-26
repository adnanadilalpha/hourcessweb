"use client";

import { type ReactNode } from "react";

interface DeviceProps {
  children: ReactNode;
  className?: string;
  scale?: number;
}

/** Premium phone frame — thin bezel, soft depth, no chrome noise. */
export default function Device({ children, className = "", scale = 0.58 }: DeviceProps) {
  const w = 393 * scale;
  const h = 852 * scale;

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: w, height: h }}>
      <div
        className="absolute inset-0 overflow-hidden bg-black"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: 393,
          height: 852,
          borderRadius: 52,
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.12),
            0 0 0 3px rgba(0,0,0,0.85),
            0 28px 80px rgba(0,0,0,0.65),
            0 8px 24px rgba(0,0,0,0.4)
          `,
        }}
      >
        <div
          className="absolute top-3 left-1/2 z-20 h-7 w-30 -translate-x-1/2 rounded-[20px] bg-black"
          aria-hidden
        />
        {children}
      </div>
    </div>
  );
}
