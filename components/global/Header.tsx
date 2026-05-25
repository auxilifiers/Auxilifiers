"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactModal from "./ContactModal";
import ThemeToggle from "./ThemeToggle";

const navLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About Us", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 flex w-full items-center justify-between"
        style={{
          padding: "10px 5vw",
          background: "var(--color-header-bg)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          borderBottom: "1px solid var(--color-border-subtle)",
          transition: "background-color 0.35s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Auxilifiers" width={38} height={38} priority style={{ width: 38, height: 38 }} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "clamp(14px, 3.5vw, 20px)",
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
            }}
          >
            Auxilifiers
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden min-[900px]:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                color: "var(--color-text-muted)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* CTA — desktop only */}
          <button
            onClick={() => setModalOpen(true)}
            className="hidden min-[900px]:flex items-center"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 500,
              padding: "11px 26px",
              borderRadius: "var(--radius-pill)",
              background: "var(--gradient)",
              color: "var(--color-cta-text)",
              border: "none",
              cursor: "none",
            }}
          >
            Get in touch&nbsp;→
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex min-[900px]:hidden items-center justify-center"
            style={{
              width: 40,
              height: 40,
              background: "transparent",
              border: "1px solid var(--color-border-default)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-text)",
              cursor: "none",
            }}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="17" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 min-[900px]:hidden"
          style={{ top: 58, background: "var(--color-mobile-menu-bg)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 20,
                  color: "var(--color-text-muted)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setModalOpen(true); }}
              className="flex items-center mt-4"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 28px",
                borderRadius: "var(--radius-pill)",
                background: "var(--gradient)",
                color: "var(--color-cta-text)",
                border: "none",
              }}
            >
              Get in touch&nbsp;→
            </button>
          </nav>
        </div>
      )}

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
