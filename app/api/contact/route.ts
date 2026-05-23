import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 });
    }
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ ok: false, error: "Name must be 2-100 characters." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json({ ok: false, error: "Message must be 10-2000 characters." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    // Send via Resend if API key is configured
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Auxilifiers Contact <onboarding@resend.dev>",
        to: process.env.CONTACT_TO_EMAIL || "info@auxilifiers.com",
        replyTo: email,
        subject: `New inquiry from ${name}`,
        text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
        html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      });
    } else {
      // Development fallback — log to console
      console.log("Contact form submission (no RESEND_API_KEY set):");
      console.log({ name, email, message });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
