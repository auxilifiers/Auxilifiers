"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactModal from "./ContactModal";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "How We Work", href: "#pillars" },
  { label: "Why Us", href: "#whyus" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 flex w-full items-center justify-between"
        style={{
          padding: "12px 5vw",
          background: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(24px) saturate(140%)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        {/* Logo — S1: 40×40px */}
        <Link href="/" className="flex items-center gap-3.5">
          <Image src="/logo.png" alt="Auxilifiers logo" width={48} height={48} priority />
          <span
            className="text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 20,
              letterSpacing: "-0.02em",
            }}
          >
            Auxilifiers
          </span>
        </Link>

        {/* Nav links — hidden below 800px */}
        <nav className="hidden min-[800px]:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-200"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "var(--color-text-muted)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text-muted)")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA — G3: "Get in touch" opens modal */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center text-black"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontWeight: 500,
            padding: "12px 26px",
            borderRadius: "var(--radius-pill)",
            background: "var(--gradient)",
            border: "none",
            cursor: "none",
          }}
        >
          Get in touch&nbsp;→
        </button>
      </header>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
