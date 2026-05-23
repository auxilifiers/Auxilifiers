"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactModal from "./ContactModal";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-50 flex w-full items-center justify-between"
        style={{
          padding: "18px 6vw",
          background: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(24px) saturate(140%)",
          borderBottom: "1px solid var(--color-border-subtle)",
        }}
      >
        {/* Logo — S1: 40×40px */}
        <Link href="/" className="flex items-center gap-3.5">
          <Image src="/logo.png" alt="Auxilifiers logo" width={44} height={44} priority />
          <span
            className="text-white"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 18,
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
                fontSize: 15,
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
            fontSize: 15,
            fontWeight: 500,
            padding: "10px 22px",
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
