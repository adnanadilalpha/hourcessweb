export type WaitlistSignupPayload = {
  email: string;
  source: string;
};

export const EMAIL_LOGO_CID = "hourcess-icon";

export type EmailTemplateOptions = {
  logoSrc?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function emailLogoMarkup(logoSrc?: string) {
  const src = logoSrc?.trim() || `cid:${EMAIL_LOGO_CID}`;
  return `
    <img
      src="${escapeHtml(src)}"
      width="48"
      height="48"
      alt="Hourcess"
      style="display:block;border:0;outline:none;text-decoration:none;height:48px;width:48px;border-radius:12px;"
    />
  `;
}

function detailRow(label: string, value: string, last = false) {
  const border = last ? "" : "border-bottom:1px solid #2a2a30;";
  return `
    <tr>
      <td style="padding:14px 0;${border}width:120px;vertical-align:top;">
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:#a6a6ad;font-weight:600;">
          ${escapeHtml(label)}
        </p>
      </td>
      <td style="padding:14px 0;${border}vertical-align:top;">
        <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#f7f7f5;">
          ${value}
        </p>
      </td>
    </tr>
  `;
}

function emailShell(options: {
  preheader: string;
  title: string;
  bodyHtml: string;
  footerNote?: string;
  logoSrc?: string;
}) {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <title>Hourcess</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background:#0a0a0c;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    ${escapeHtml(options.preheader)}
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0a0a0c;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background:#141418;border:1px solid #2a2a30;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="background:#18181c;padding:22px 28px;border-bottom:1px solid #2a2a30;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    ${emailLogoMarkup(options.logoSrc)}
                  </td>
                  <td style="vertical-align:middle;padding-left:14px;">
                    <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#f7f7f5;">
                      Hourcess
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="height:3px;background:#a88ee4;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;font-weight:600;color:#f7f7f5;">
                ${escapeHtml(options.title)}
              </h1>
              ${options.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;border-top:1px solid #2a2a30;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#a6a6ad;">
                ${escapeHtml(options.footerNote || "Sent from the Hourcess website admin.")}
              </p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;">
          <tr>
            <td align="center" style="padding:18px 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0;font-size:11px;line-height:1.5;color:#6b6b73;">
                © ${year} Hourcess
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildWaitlistNotificationEmail(
  payload: WaitlistSignupPayload,
  options: EmailTemplateOptions = {},
) {
  const subject = `New waitlist signup — ${payload.email}`;
  const text = [
    "New Hourcess website waitlist signup",
    "",
    `Email: ${payload.email}`,
    `Source: ${payload.source}`,
    "",
    "Open admin → Waitlist to manage.",
  ].join("\n");

  const html = emailShell({
    preheader: `New waitlist signup from ${payload.email}`,
    title: "New waitlist signup",
    logoSrc: options.logoSrc,
    bodyHtml: `
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#a6a6ad;">
        Someone chose their spot on the Hourcess website.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        ${detailRow("Email", `<a href="mailto:${escapeHtml(payload.email)}" style="color:#a88ee4;text-decoration:none;">${escapeHtml(payload.email)}</a>`)}
        ${detailRow("Source", escapeHtml(payload.source), true)}
      </table>
    `,
  });

  return { subject, text, html };
}

export function buildWaitlistConfirmationEmail(
  payload: WaitlistSignupPayload,
  options: EmailTemplateOptions = {},
) {
  const subject = "You're in — Hourcess waitlist";
  const text = [
    "You're in.",
    "",
    "Your spot on the Hourcess waitlist is saved.",
    "We'll email you when it's time to choose your next moment.",
    "",
    "— Hourcess",
  ].join("\n");

  const html = emailShell({
    preheader: "Your Hourcess waitlist spot is saved",
    title: "You're in.",
    logoSrc: options.logoSrc,
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#a6a6ad;">
        Your spot is saved for <strong style="color:#f7f7f5;">${escapeHtml(payload.email)}</strong>.
      </p>
      <p style="margin:0;font-size:15px;line-height:1.6;color:#a6a6ad;">
        We'll reach out when Hourcess is ready — and when your next moment is too.
      </p>
    `,
    footerNote: "You joined the Hourcess waitlist from our website.",
  });

  return { subject, text, html };
}

export function buildTestEmail(options: EmailTemplateOptions = {}) {
  const subject = "Hourcess email setup — test";
  const text = "This is a test email from your Hourcess admin email setup.";
  const html = emailShell({
    preheader: "Hourcess email test",
    title: "Email setup looks good",
    logoSrc: options.logoSrc,
    bodyHtml: `
      <p style="margin:0;font-size:15px;line-height:1.6;color:#a6a6ad;">
        If you received this, SMTP is configured correctly for waitlist notifications
        (admin alert + signup confirmation).
      </p>
    `,
    footerNote: "Test message from Hourcess admin → Email.",
  });
  return { subject, text, html };
}
