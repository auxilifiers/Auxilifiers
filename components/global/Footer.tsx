"use client";

import Image from "next/image";
import Link from "next/link";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/settings-defaults";

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const s = settings ?? DEFAULT_SETTINGS;
  const companyLinks = s.footerLinks;
  const socials = [
    { label: "WhatsApp", href: s.whatsapp, icon: <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></> },
    { label: "Instagram", href: s.instagram, icon: <><path d="M16 4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z" /><circle cx="12" cy="12" r="3" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></> },
    { label: "Facebook", href: s.facebook, icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /> },
    { label: "LinkedIn", href: s.linkedin, icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></> },
    { label: "YouTube", href: s.youtube, icon: <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></> },
    { label: "X", href: s.x, filled: true, icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> },
    { label: "Threads", href: s.threads, filled: true, icon: <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.726 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.166 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.85 13.85 0 0 1 2.06.043c-.107-.659-.327-1.182-.66-1.56-.456-.518-1.16-.781-2.092-.788h-.057c-.747 0-1.761.207-2.408 1.198l-1.72-1.155c.857-1.34 2.243-2.07 3.911-2.07h.03c2.81.02 4.483 1.755 4.683 4.787.085.054.169.11.252.169 1.292.85 2.225 2.072 2.61 3.422.566 1.99.198 5.013-2.225 7.391-1.838 1.804-4.064 2.61-7.183 2.633z" /> },
  ].filter((x) => x.href && x.href.trim() && x.href !== "#");
  return (
    <footer style={{ padding: "clamp(40px, 8vw, 60px) 5vw", borderTop: "1px solid var(--color-border-subtle)" }}>
      <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-6 min-[640px]:gap-16 mb-8 min-[640px]:mb-20" style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", justifyItems: "center" }}>
        {/* Col 1 — Brand + Contact + Social */}
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Auxilifiers" width={36} height={36} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18, color: "var(--color-text)" }}>
              Auxilifiers
            </span>
          </div>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: 18, color: "var(--color-text-dim)" }}>
            Orbiting around your success.
          </p>

          {/* Contact — email only */}
          <a href={`mailto:${s.contactEmail}`}
            className="flex items-center gap-3 mt-2 transition-colors duration-200 hover:text-white"
            style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-text-muted)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--color-cyan)", flexShrink: 0 }}>
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            {s.contactEmail}
          </a>

          {/* Social icons */}
          <div className="flex gap-4 mt-4 justify-center">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                className="flex items-center justify-center transition-all duration-200"
                style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--color-border-default)", color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-cyan)"; e.currentTarget.style.borderColor = "var(--color-border-strong)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; e.currentTarget.style.borderColor = "var(--color-border-default)"; }}>
                <svg width="20" height="20" viewBox="0 0 24 24"
                  fill={(social as { filled?: boolean }).filled ? "currentColor" : "none"}
                  stroke={(social as { filled?: boolean }).filled ? "none" : "currentColor"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
