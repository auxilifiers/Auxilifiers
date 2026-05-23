"use client";

import { useEffect, useRef } from "react";
import { ContactForm } from "@/components/global/ContactModal";

export default function FooterCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".cta-anim"),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: section, start: "top 75%" } }
      );
    };
    init();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: "100px 6vw 120px", borderTop: "1px solid var(--color-border-subtle)", maxWidth: 1400, margin: "0 auto", textAlign: "center" }}
    >
      <div className="cta-anim flex items-center justify-center gap-4 mb-10 opacity-0" style={{
        fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
      }}>
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        One last thing
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
      </div>

      <h2 className="cta-anim mb-8 opacity-0" style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.1 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(36px, 7vw, 96px)", letterSpacing: "-0.035em", color: "white",
        }}>
          Ready to{" "}
        </span>
        <span style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(36px, 7vw, 96px)",
          background: "var(--gradient-soft)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          start
        </span>
        <br />
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(14px, 2.5vw, 32px)", color: "var(--color-text-dim)",
          verticalAlign: "0.5em", display: "inline-block", marginRight: "0.3em",
        }}>
          (actually)
        </span>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(36px, 7vw, 96px)", letterSpacing: "-0.035em", color: "white",
        }}>
          scaling?
        </span>
      </h2>

      {/* Centered inline contact form */}
      <div className="cta-anim opacity-0 flex justify-center">
        <ContactForm variant="inline" />
      </div>
    </section>
  );
}
