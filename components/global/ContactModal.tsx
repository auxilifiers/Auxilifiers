"use client";

import { useState, useEffect, useRef } from "react";

const inputStyle = {
  fontFamily: "var(--font-body)",
  fontSize: 16,
  padding: "14px 16px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-border-default)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "var(--color-text-muted)",
  marginBottom: 6,
  display: "block",
};

export function ContactForm({ variant = "modal" }: { variant?: "modal" | "inline" }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
      } else {
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
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 400,
            color: "white",
          }}
        >
          Thanks!
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--color-text-dim)",
            textAlign: "center",
          }}
        >
          We&apos;ll be in touch within one business day.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", message: "" });
          }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--color-cyan)",
            background: "none",
            border: "none",
            cursor: "none",
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  const isInline = variant === "inline";

  return (
    <form onSubmit={handleSubmit} className="w-full" style={{ maxWidth: isInline ? 720 : undefined }}>
      <div className={`grid gap-4 ${isInline ? "grid-cols-1 min-[640px]:grid-cols-2" : "grid-cols-1"}`}>
        <div>
          <input
            type="text"
            required
            minLength={2}
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-cyan)";
              e.target.style.boxShadow = "0 0 8px rgba(0,245,255,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--color-border-default)";
              e.target.style.boxShadow = "none";
            }}
            disabled={status === "sending"}
          />
        </div>
        <div>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            style={inputStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--color-cyan)";
              e.target.style.boxShadow = "0 0 8px rgba(0,245,255,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--color-border-default)";
              e.target.style.boxShadow = "none";
            }}
            disabled={status === "sending"}
          />
        </div>
      </div>
      <div className="mt-4">
        <textarea
          required
          minLength={10}
          maxLength={2000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us what you need..."
          rows={4}
          style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--color-cyan)";
            e.target.style.boxShadow = "0 0 8px rgba(0,245,255,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--color-border-default)";
            e.target.style.boxShadow = "none";
          }}
          disabled={status === "sending"}
        />
      </div>
      {status === "error" && (
        <p className="mt-3" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#ff6b6b" }}>
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex items-center"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          fontWeight: 500,
          padding: "14px 28px",
          borderRadius: "var(--radius-pill)",
          background: "var(--gradient)",
          color: "black",
          border: "none",
          cursor: "none",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Sending..." : "Send →"}
      </button>
    </form>
  );
}

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9000] flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        animation: "modal-fade-in 0.25s ease",
      }}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div
        className="relative w-full mx-4"
        style={{
          maxWidth: 520,
          background: "var(--color-surface-elevated)",
          border: "1px solid var(--color-border-default)",
          borderRadius: "var(--radius-xl)",
          padding: "40px 36px",
          animation: "modal-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid var(--color-border-default)",
            color: "var(--color-text-muted)",
            fontSize: 16,
            background: "transparent",
            cursor: "none",
          }}
        >
          ×
        </button>

        {/* Eyebrow */}
        <span
          className="block mb-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-cyan)",
          }}
        >
          Get in touch
        </span>

        {/* Heading */}
        <h3
          className="mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 36,
            color: "white",
          }}
        >
          Let&apos;s talk.
        </h3>

        {/* Sub */}
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 15,
            color: "var(--color-text-muted)",
            lineHeight: 1.55,
          }}
        >
          Tell us what you need. We&apos;ll reply within one business day.
        </p>

        <ContactForm variant="modal" />
      </div>
    </div>
  );
}
