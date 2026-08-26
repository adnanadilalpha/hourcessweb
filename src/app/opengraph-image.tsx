import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card (Open Graph / Twitter) — brand mark + title on black. */
export default async function OgImage() {
  const iconData = await readFile(join(process.cwd(), "public/icon.png"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0c",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(168,142,228,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={iconSrc}
          width={168}
          height={168}
          alt=""
          style={{ borderRadius: 36, marginBottom: 36 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#f7f7f5",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a88ee4",
              letterSpacing: "0.02em",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
