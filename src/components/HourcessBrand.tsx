/**
 * Real Hourcess brand assets — sourced from the LogoAndIcon-1 Figma import.
 * Use these everywhere instead of placeholder circles or text.
 */
import svgPaths from "@/imports/LogoAndIcon-1/svg-wsz6tkuzdc";

/** The lavender Hourcess icon mark, scaled to `size` px */
export function HourcessIcon({ size = 80, className = "" }: { size?: number; className?: string }) {
  // The source icon is 1024×1024 with the mark at 406×396 centred inside.
  // We scale the whole 1024px canvas to `size`.
  const scale = size / 1024;
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-[calc(70px*var(--icon-scale))]"
        style={{ "--icon-scale": scale } as React.CSSProperties}
      />
      {/* Render just the SVG mark, no background */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 1024 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* The mark lives at (309, 314) inside the 1024px canvas */}
        <g transform="translate(309, 314)">
          <svg
            width="406.149"
            height="396.182"
            viewBox="0 0 406.149 396.182"
            fill="none"
          >
            <path d={svgPaths.p23efee00} fill="#A88EE4" />
          </svg>
        </g>
      </svg>
    </div>
  );
}

/** Full HOURCESS wordmark — white/grey letters with lavender accent on CE */
export function HourcessWordmarkSVG({ width = 200, className = "" }: { width?: number; className?: string }) {
  // Source viewBox: 644 × 67.207
  const height = (67.2071 / 644) * width;
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width, height }}>
      <svg
        className="absolute inset-0 w-full h-full"
        fill="none"
        viewBox="0 0 644 67.2071"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          <path d={svgPaths.p3e145b70} fill="#D9D9D9" />
          <path d={svgPaths.p195abb80} fill="#D9D9D9" />
          <path d={svgPaths.p3188c300} fill="#D9D9D9" />
          <path d={svgPaths.p2cd0d640} fill="#D9D9D9" />
          <path d={svgPaths.p1d1dd000} fill="#D9D9D9" />
          <path d={svgPaths.p365dffb1} fill="#D9D9D9" />
          {/* CE in lavender */}
          <path d={svgPaths.p2d181e00} fill="#A88EE4" />
          <path d={svgPaths.p14d14500} fill="#A88EE4" />
          <path d={svgPaths.p1ca689f0} fill="#D9D9D9" />
          <path d={svgPaths.p38145000} fill="#A88EE4" />
          <path d="M488 37.5H434V28H488V37.5Z" fill="#A88EE4" />
          <path d={svgPaths.p8338b00} fill="#A88EE4" />
        </g>
      </svg>
    </div>
  );
}

/** The icon on a dark rounded-corner background (app-icon style) */
export function HourcessIconOnDark({ size = 80, className = "" }: { size?: number; className?: string }) {
  const radius = Math.round((70 / 1024) * size);
  return (
    <div
      className={`relative shrink-0 bg-background flex items-center justify-center ${className}`}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      <HourcessIcon size={size * 0.85} />
    </div>
  );
}
