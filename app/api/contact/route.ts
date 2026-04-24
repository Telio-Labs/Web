import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactPayload = {
  name: string;
  role?: string;
  company?: string;
  email: string;
  companyType?: string;
  industry?: string;
  services?: string[];
  timing?: string;
};

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();

    // Validación básica
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const fromEmail = process.env.FROM_EMAIL || "";
    const contactEmail = process.env.CONTACT_EMAIL || "";

    // Enviamos los dos emails en paralelo para mayor rapidez
    const [internalResult, confirmationResult] = await Promise.all([
      // 1. Email interno al equipo de TelioLabs
      resend.emails.send({
        from: `TelioLabs Website <${fromEmail}>`,
        to: [contactEmail],
        replyTo: body.email,
        subject: `New lead — ${body.name}${body.company ? ` (${body.company})` : ""}`,
        html: buildInternalEmail(body),
      }),

      // 2. Email de confirmación al cliente (lead)
      resend.emails.send({
        from: `TelioLabs <${fromEmail}>`,
        to: [body.email],
        replyTo: contactEmail,
        subject: `Thanks, ${body.name.split(" ")[0]} — we got your message`,
        html: buildConfirmationEmail(body),
      }),
    ]);

    if (internalResult.error) {
      console.error("Internal email error:", internalResult.error);
    }
    if (confirmationResult.error) {
      console.error("Confirmation email error:", confirmationResult.error);
    }

    // Si al menos el interno se envió, consideramos éxito
    if (internalResult.error && confirmationResult.error) {
      return NextResponse.json(
        { error: "Failed to send emails" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      internalId: internalResult.data?.id,
      confirmationId: confirmationResult.data?.id,
    });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ═══════════════════════════════════════════════════
   EMAIL 1: Notificación interna (para el equipo)
   ═══════════════════════════════════════════════════ */
function buildInternalEmail(data: ContactPayload): string {
  const services = data.services?.length
    ? data.services.join(", ")
    : "Not specified";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F7FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FA;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;max-width:600px;">
        <tr><td style="background:#111111;padding:32px 40px;">
          <img src="https://www.teliolabs.io/Telio-Labs.svg" alt="TelioLabs" width="120" style="display:block;margin-bottom:20px;height:auto;" />
          <div style="color:#A8BEFF;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">New Lead</div>
          <h1 style="color:#FFFFFF;font-size:26px;font-weight:800;margin:0;letter-spacing:-0.5px;">${escapeHtml(data.name)} wants to talk.</h1>
        </td></tr>
        <tr><td style="padding:32px 40px 24px;">
          <h2 style="color:#0D1828;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 16px;">Contact</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Name", escapeHtml(data.name))}
            ${data.role ? row("Role", escapeHtml(data.role)) : ""}
            ${data.company ? row("Company", escapeHtml(data.company)) : ""}
            ${row("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#4A6FE8;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
          </table>
        </td></tr>
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#E2E8F0;"></div></td></tr>
        <tr><td style="padding:24px 40px 32px;">
          <h2 style="color:#0D1828;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 16px;">Project</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${row("Company Type", escapeHtml(data.companyType || "—"))}
            ${row("Industry", escapeHtml(data.industry || "—"))}
            ${row("Services", escapeHtml(services))}
            ${row("Timing", escapeHtml(data.timing || "—"))}
          </table>
        </td></tr>
        <tr><td style="padding:0 40px 32px;">
          <a href="mailto:${escapeHtml(data.email)}" style="display:inline-block;background:#111111;color:#FFFFFF;font-size:14px;font-weight:500;padding:12px 24px;border-radius:100px;text-decoration:none;">Reply to ${escapeHtml(data.name.split(" ")[0])} →</a>
        </td></tr>
        <tr><td style="background:#F5F7FA;padding:20px 40px;border-top:1px solid #E2E8F0;">
          <p style="color:#6B7D9C;font-size:12px;margin:0;line-height:1.5;">This lead came from the TelioLabs contact form.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

/* ═══════════════════════════════════════════════════
   EMAIL 2: Confirmación al cliente (lead)
   ═══════════════════════════════════════════════════ */
function buildConfirmationEmail(data: ContactPayload): string {
  const firstName = data.name.split(" ")[0];
  const services = data.services?.length
    ? data.services.join(", ")
    : "your project";

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F7FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F7FA;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;max-width:600px;">

        <!-- Header con logo -->
        <tr><td style="background:#111111;padding:40px 40px;text-align:left;">
          <img src="https://www.teliolabs.io/Telio-Labs.svg" alt="TelioLabs" width="140" style="display:block;margin-bottom:28px;height:auto;" />
          <div style="color:#A8BEFF;font-size:11px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:10px;">Message Received</div>
          <h1 style="color:#FFFFFF;font-size:32px;font-weight:800;margin:0;letter-spacing:-0.8px;line-height:1.1;">
            Thanks, ${escapeHtml(firstName)}.
          </h1>
          <p style="color:rgba(255,255,255,0.7);font-size:16px;margin:14px 0 0;line-height:1.5;font-weight:300;">
            Your message has landed with us.
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 40px 32px;">
          <p style="color:#0D1828;font-size:16px;line-height:1.7;margin:0 0 20px;">
            Hi ${escapeHtml(firstName)},
          </p>
          <p style="color:#0D1828;font-size:15px;line-height:1.7;margin:0 0 16px;">
            Thanks for reaching out to TelioLabs. We've received your message about <strong style="color:#4A6FE8;">${escapeHtml(services)}</strong> and someone from our senior team will get back to you <strong>within 24 hours</strong>.
          </p>
          <p style="color:#0D1828;font-size:15px;line-height:1.7;margin:0 0 16px;">
            In the meantime, feel free to explore what we do or check out our recent work.
          </p>
        </td></tr>

        <!-- CTA buttons -->
        <tr><td style="padding:0 40px 32px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:12px;">
                <a href="https://www.teliolabs.io" style="display:inline-block;background:#111111;color:#FFFFFF;font-size:14px;font-weight:500;padding:13px 28px;border-radius:100px;text-decoration:none;">Visit our website →</a>
              </td>
              <td>
                <a href="https://www.teliolabs.io/about" style="display:inline-block;background:transparent;color:#6B7D9C;font-size:14px;font-weight:500;padding:13px 20px;border-radius:100px;text-decoration:none;">About us</a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="height:1px;background:#E2E8F0;"></div></td></tr>

        <!-- What happens next -->
        <tr><td style="padding:32px 40px;">
          <h2 style="color:#0D1828;font-size:13px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 20px;">What happens next</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${nextStep("1", "We review your request", "A senior partner reviews your message personally — not a bot, not an intern.")}
            ${nextStep("2", "We reach out within 24 hours", "Expect an email from us with next steps, questions, or a calendar link to book a call.")}
            ${nextStep("3", "We scope the work together", "If there's a fit, we'll walk through your goals, timeline, and budget — no pressure, no upsells.")}
          </table>
        </td></tr>

        <!-- Signature -->
        <tr><td style="padding:0 40px 40px;">
          <p style="color:#0D1828;font-size:15px;line-height:1.7;margin:0 0 6px;">
            Talk soon,
          </p>
          <p style="color:#0D1828;font-size:15px;line-height:1.7;margin:0;font-weight:600;">
            The TelioLabs Team
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#F5F7FA;padding:24px 40px;border-top:1px solid #E2E8F0;">
          <p style="color:#6B7D9C;font-size:12px;margin:0 0 4px;line-height:1.6;">
            TelioLabs · Las Vegas, NV · USA
          </p>
          <p style="color:#6B7D9C;font-size:12px;margin:0;line-height:1.6;">
            You received this email because you submitted the contact form on <a href="https://www.teliolabs.io" style="color:#6B7D9C;text-decoration:underline;">teliolabs.io</a>.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim();
}

/* ─── Helpers ─── */

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 0;color:#6B7D9C;font-size:13px;width:120px;vertical-align:top;">${label}</td><td style="padding:8px 0;color:#0D1828;font-size:14px;font-weight:500;vertical-align:top;">${value}</td></tr>`;
}

function nextStep(num: string, title: string, desc: string): string {
  return `
    <tr>
      <td style="padding:0 0 20px 0;vertical-align:top;width:44px;">
        <div style="width:32px;height:32px;background:#EBF0FF;border-radius:50%;color:#4A6FE8;font-size:13px;font-weight:700;text-align:center;line-height:32px;">${num}</div>
      </td>
      <td style="padding:0 0 20px 0;vertical-align:top;">
        <div style="color:#0D1828;font-size:14px;font-weight:600;margin-bottom:4px;">${title}</div>
        <div style="color:#6B7D9C;font-size:13px;line-height:1.6;">${desc}</div>
      </td>
    </tr>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}