import { NextResponse } from "next/server";

type Body = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  serviceInterest?: string;
  budget?: string;
  businessBrief?: string;
  message?: string;
  consent?: boolean;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function row(label: string, value: string | undefined) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;vertical-align:top;white-space:nowrap">${esc(
    label
  )}</td><td style="padding:6px 0;color:#0a0f1a;font-size:14px;vertical-align:top">${esc(value).replace(
    /\n/g,
    "<br/>"
  )}</td></tr>`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      company = "",
      jobTitle = "",
      serviceInterest = "",
      budget = "",
      businessBrief = "",
      message = "",
      consent = false,
    } = body;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !company.trim() || !businessBrief.trim() || !message.trim() || !serviceInterest) {
      return NextResponse.json({ ok: false, error: "Please fill in all required fields." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ ok: false, error: "Consent is required." }, { status: 400 });
    }
    const nameRe = /^[\p{L}\s'.\-]{2,60}$/u;
    if (!nameRe.test(firstName.trim()) || !nameRe.test(lastName.trim())) {
      return NextResponse.json({ ok: false, error: "Invalid name. Use letters, spaces, hyphens or apostrophes only." }, { status: 400 });
    }
    // Stricter email regex requiring a TLD of 2+ letters
    const emailRe = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
    if (!emailRe.test(email.trim())) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }
    // Reject obvious throwaway/fake addresses
    const disposableDomains = ["mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com", "test.com", "example.com", "fake.com"];
    const emailDomain = email.trim().split("@")[1]?.toLowerCase() || "";
    if (disposableDomains.includes(emailDomain)) {
      return NextResponse.json({ ok: false, error: "Please use a real email address." }, { status: 400 });
    }
    if (phone.trim() && !/^(\+?\d[\d\s\-().]{6,18}\d)$/.test(phone.trim())) {
      return NextResponse.json({ ok: false, error: "Please enter a valid phone number." }, { status: 400 });
    }
    if (businessBrief.length < 10 || businessBrief.length > 300) {
      return NextResponse.json({ ok: false, error: "Business brief must be 10–300 characters." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json({ ok: false, error: "Message must be 10–2000 characters." }, { status: 400 });
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const to = process.env.CONTACT_TO_EMAIL || "info@auxilifiers.com";

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f6f8fb;padding:24px">
        <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden">
          <div style="background:linear-gradient(135deg,#0066FF,#00B4D8);color:#fff;padding:20px 24px">
            <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.85">New website enquiry</div>
            <div style="font-size:22px;font-weight:600;margin-top:4px">${esc(fullName)}${company ? ` · ${esc(company)}` : ""}</div>
          </div>
          <div style="padding:20px 24px">
            <table style="width:100%;border-collapse:collapse">
              ${row("Name", fullName)}
              ${row("Email", email)}
              ${row("Phone", phone)}
              ${row("Company", company)}
              ${row("Job title", jobTitle)}
              ${row("Interested in", serviceInterest)}
              ${row("Budget", budget)}
              ${row("Business brief", businessBrief)}
              ${row("Message", message)}
            </table>
            <p style="margin-top:24px;font-size:12px;color:#6b7280">Sent from auxilifiers.com contact form.</p>
          </div>
        </div>
      </div>
    `.trim();

    const text =
      `New website enquiry\n\n` +
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n` +
      `Company: ${company}\nJob title: ${jobTitle}\n` +
      `Interested in: ${serviceInterest}\nBudget: ${budget}\n\n` +
      `Business brief:\n${businessBrief}\n\n` +
      `Message:\n${message}\n`;

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL || "Auxilifiers Contact <onboarding@resend.dev>",
        to,
        replyTo: email,
        subject: `New enquiry · ${fullName}${company ? ` (${company})` : ""}`,
        text,
        html,
      });
    } else {
      console.log("[contact] no RESEND_API_KEY — would send to:", to);
      console.log(text);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
