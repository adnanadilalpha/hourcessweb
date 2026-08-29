import "server-only";

import { existsSync, readFileSync } from "fs";
import path from "path";
import { EMAIL_LOGO_CID } from "@/lib/email/templates";

let cachedLogo: Buffer | null = null;

/** Resolve logo bytes for Nodemailer — works on Vercel (public/ is not in the function bundle). */
export function getEmailLogoAttachment() {
  if (!cachedLogo) {
    cachedLogo = loadEmailLogoBuffer();
  }

  return {
    filename: "icon.png",
    content: cachedLogo,
    cid: EMAIL_LOGO_CID,
    contentDisposition: "inline" as const,
  };
}

function loadEmailLogoBuffer(): Buffer {
  const candidates = [
    path.join(process.cwd(), "src/lib/email/assets/icon.png"),
    path.join(process.cwd(), "public/icon.png"),
    path.join(process.cwd(), "public/Icon.png"),
  ];

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return readFileSync(candidate);
    }
  }

  throw new Error(
    "Email logo not found. Expected src/lib/email/assets/icon.png in the deployment bundle.",
  );
}
