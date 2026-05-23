"use client";

import Image from "next/image";
import Link from "next/link";

const companyLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "How We Work", href: "#pillars" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer style={{ padding: "100px 6vw 100px", borderTop: "1px solid var(--color-border-subtle)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-20" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", justifyItems: "center" }}>
        {/* Col 1 — Brand + Contact + Social */}
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Auxilifiers" width={36} height={36} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18, color: "white" }}>
              Auxilifiers
            </span>
          </div>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 18, color: "var(--color-text-dim)" }}>
            Orbiting around your success.
          </p>

          {/* Contact — email only */}
          <a href="mailto:info@auxilifiers.com"
            className="flex items-center gap-3 mt-2 transition-colors duration-200 hover:text-white"
            style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-text-muted)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-cyan)", flexShrink: 0 }}>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            info@auxilifiers.com
          </a>

          {/* Social icons — bigger, + YouTube */}
          <div className="flex gap-4 mt-4 justify-center">
            {[
              { label: "WhatsApp", href: "https://wa.me/923324619441", icon: <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></> },
              { label: "Instagram", href: "#", icon: <><path d="M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z" /><circle cx="12" cy="12" r="3" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></> },
              { label: "Facebook", href: "#", icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
              { label: "LinkedIn", href: "#", icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></> },
              { label: "YouTube", href: "#", icon: <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></> },
            ].map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                className="flex items-center justify-center transition-all duration-200"
                style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--color-border-default)", color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-cyan)"; e.currentTarget.style.borderColor = "var(--color-border-strong)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; e.currentTarget.style.borderColor = "var(--color-border-default)"; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Company */}
        <div>
          <h4 className="mb-5" style={{ fontFamily: "var(--font-mono)", fontSize: 15, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
            Company
          </h4>
          <div className="flex flex-col gap-3">
            {companyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors duration-200 hover:text-white" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-text-muted)" }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright — centered */}
      <div className="text-center" style={{ paddingTop: 40 }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "var(--color-text-muted)" }}>
          © 2026 Auxilifiers. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
