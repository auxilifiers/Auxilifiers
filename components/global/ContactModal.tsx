"use client";

import { useState, useEffect, useRef } from "react";
import Select from "@/components/ui/Select";

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 15,
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border-default)",
  background: "var(--color-input-bg)",
  color: "var(--color-text)",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 14,
  fontWeight: 500,
  letterSpacing: "0.01em",
  color: "var(--color-text)",
  marginBottom: 6,
  display: "block",
  textAlign: "left",
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  serviceInterest: string;
  budget: string;
  businessBrief: string;
  message: string;
  consent: boolean;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  jobTitle: "",
  serviceInterest: "",
  budget: "",
  businessBrief: "",
  message: "",
  consent: false,
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: "var(--color-cyan)" }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function focusStyles(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = "var(--color-cyan)";
  e.target.style.boxShadow = "0 0 8px rgba(0,245,255,0.18)";
}
function blurStyles(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = "var(--color-border-default)";
  e.target.style.boxShadow = "none";
}

export function ContactForm({ variant = "modal" }: { variant?: "modal" | "inline" }) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRe = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
    const phoneRe = /^(\+?\d[\d\s\-().]{6,18}\d)?$/;
    const nameRe = /^[\p{L}\s'.\-]{2,60}$/u;
    if (!nameRe.test(form.firstName.trim()) || !nameRe.test(form.lastName.trim())) {
      setStatus("error"); setErrorMsg("Please enter a valid first and last name."); return;
    }
    if (!emailRe.test(form.email.trim())) {
      setStatus("error"); setErrorMsg("Please enter a valid email address."); return;
    }
    if (form.phone.trim() && !phoneRe.test(form.phone.trim())) {
      setStatus("error"); setErrorMsg("Please enter a valid phone number."); return;
    }
    if (!form.consent) {
      setStatus("error"); setErrorMsg("Please agree to be contacted."); return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) setStatus("success");
      else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, color: "var(--color-text)" }}>
          Thanks, {form.firstName || "we got it"}.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--color-text-dim)", textAlign: "center", maxWidth: 360 }}>
          We&apos;ll review your brief and reply within one business day.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm(initialForm); }}
          style={{
            fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-cyan)",
            background: "none", border: "none", cursor: "none", textDecoration: "underline", textUnderlineOffset: 3,
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const isInline = variant === "inline";

  return (
    <form onSubmit={handleSubmit} className="w-full" style={{ maxWidth: isInline ? 760 : undefined }}>
      <div className="grid gap-4 grid-cols-1 min-[520px]:grid-cols-2">
        <Field label="First name" required>
          <input type="text" required minLength={2} maxLength={60} value={form.firstName}
            onChange={(e) => update("firstName", e.target.value)} placeholder="Hafiz"
            pattern="^[\p{L}\s'.\-]{2,60}$"
            title="Use letters, spaces, hyphens or apostrophes only."
            style={inputStyle} onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
        <Field label="Last name" required>
          <input type="text" required minLength={2} maxLength={60} value={form.lastName}
            onChange={(e) => update("lastName", e.target.value)} placeholder="Arham"
            pattern="^[\p{L}\s'.\-]{2,60}$"
            title="Use letters, spaces, hyphens or apostrophes only."
            style={inputStyle} onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
        <Field label="Email" required>
          <input type="email" required value={form.email}
            onChange={(e) => update("email", e.target.value)} placeholder="hafiz@yourcompany.com"
            pattern="^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
            title="Enter a valid email like name@company.com"
            style={inputStyle} onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
        <Field label="Phone (optional)">
          <input type="tel" value={form.phone}
            onChange={(e) => update("phone", e.target.value)} placeholder="+92 321 4567890"
            pattern="^(\+?\d[\d\s\-().]{6,18}\d)?$"
            title="Use digits, spaces, dashes, parentheses. 7–20 characters."
            style={inputStyle} onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
        <Field label="Company" required>
          <input type="text" required maxLength={120} value={form.company}
            onChange={(e) => update("company", e.target.value)} placeholder="Acme Co."
            style={inputStyle} onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
        <Field label="Job title (optional)">
          <input type="text" maxLength={120} value={form.jobTitle}
            onChange={(e) => update("jobTitle", e.target.value)} placeholder="Founder, Marketing Lead..."
            style={inputStyle} onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
        <Field label="What are you interested in?" required>
          <Select
            required
            value={form.serviceInterest}
            onChange={(v) => update("serviceInterest", v)}
            placeholder="Choose one…"
            disabled={status === "sending"}
            ariaLabel="Service interest"
            options={[
              { value: "build", label: "Build (Websites / Apps / Stores)" },
              { value: "automate", label: "Automate (AI / Chatbots / Voice)" },
              { value: "grow", label: "Grow (SEO / Ads / Social)" },
              { value: "multiple", label: "Multiple pillars" },
              { value: "unsure", label: "Not sure yet — advise me" },
            ]}
          />
        </Field>
        <Field label="Budget range (optional)">
          <Select
            value={form.budget}
            onChange={(v) => update("budget", v)}
            placeholder="Prefer not to say"
            disabled={status === "sending"}
            ariaLabel="Budget range"
            options={[
              { value: "", label: "Prefer not to say" },
              { value: "<1k", label: "Under $1,000" },
              { value: "1-5k", label: "$1,000 – $5,000" },
              { value: "5-15k", label: "$5,000 – $15,000" },
              { value: "15-50k", label: "$15,000 – $50,000" },
              { value: "50k+", label: "$50,000+" },
            ]}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Brief your business in 2 lines" required>
          <textarea required minLength={10} maxLength={300} value={form.businessBrief}
            onChange={(e) => update("businessBrief", e.target.value)}
            placeholder="e.g. We sell handmade leather goods online to customers in the UK and UAE. We're a 4-person team based in Lahore."
            rows={2} style={{ ...inputStyle, minHeight: 72, resize: "vertical" }}
            onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="What do you need help with?" required>
          <textarea required minLength={10} maxLength={2000} value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us what you're trying to do, the timeline, and any constraints we should know about."
            rows={4} style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
            onFocus={focusStyles} onBlur={blurStyles} disabled={status === "sending"} />
        </Field>
      </div>

      <label className="mt-4 flex items-start gap-2.5" style={{ cursor: "none" }}>
        <input type="checkbox" required checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          style={{ marginTop: 3, accentColor: "var(--color-cyan)", cursor: "none" }} />
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--color-text-muted)", lineHeight: 1.5 }}>
          I agree to be contacted by Auxilifiers about my enquiry. We&apos;ll never share your data.
        </span>
      </label>

      {status === "error" && (
        <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#ff6b6b" }}>
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className="mt-5 inline-flex items-center"
        style={{
          fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 500,
          padding: "14px 32px", borderRadius: "var(--radius-pill)",
          background: "var(--gradient)", color: "var(--color-cta-text)", border: "none",
          cursor: "none", opacity: status === "sending" ? 0.7 : 1,
        }}>
        {status === "sending" ? "Sending…" : "Send enquiry →"}
      </button>
    </form>
  );
}

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9000] flex items-start justify-center overflow-y-auto py-8"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "modal-fade-in 0.25s ease",
      }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div
        className="relative w-full mx-4 my-auto"
        style={{
          maxWidth: 640,
          background: "var(--color-surface-elevated)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-xl)",
          padding: "clamp(24px, 5vw, 40px) clamp(20px, 5vw, 36px)",
          animation: "modal-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 flex items-center justify-center"
          style={{
            width: 32, height: 32, borderRadius: "50%",
            border: "1px solid var(--color-border-default)",
            color: "var(--color-text-muted)", fontSize: 16,
            background: "transparent", cursor: "none",
          }}>×</button>

        <span className="block mb-3"
          style={{
            fontFamily: "var(--font-mono)", fontSize: 11,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "var(--color-cyan)",
          }}>
          Get in touch
        </span>

        <h3 className="mb-2"
          style={{
            fontFamily: "var(--font-display)", fontWeight: 500,
            fontSize: "clamp(28px, 5vw, 36px)",
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
          }}>
          Let&apos;s talk about your business.
        </h3>

        <p className="mb-6"
          style={{
            fontFamily: "var(--font-body)", fontSize: 15,
            color: "var(--color-text-muted)", lineHeight: 1.55,
          }}>
          Tell us a bit about what you do and what you need. We reply within one business day with a tailored plan.
        </p>

        <ContactForm variant="modal" />
      </div>
    </div>
  );
}
