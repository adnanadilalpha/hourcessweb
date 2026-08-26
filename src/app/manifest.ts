import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    icons: [
      {
        src: "/icon.png",
        sizes: "2048x2048",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "2048x2048",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
