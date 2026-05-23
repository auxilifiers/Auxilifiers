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
      style={{ padding: "160px 6vw 220px", borderTop: "1px solid var(--color-border-subtle)", maxWidth: 1400, margin: "0 auto" }}
    >
      <div className="cta-anim flex items-center gap-4 mb-12 opacity-0" style={{
        fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
      }}>
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        One last thing
      </div>

      <h2 className="cta-anim mb-16 opacity-0" style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.05 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(56px, 12vw, 200px)", letterSpacing: "-0.035em", color: "white",
        }}>
          Ready to{" "}
        </span>
        <span style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(56px, 12vw, 200px)",
          background: "var(--gradient-soft)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          start
        </span>
        <br />
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(20px, 4vw, 56px)", color: "var(--color-text-dim)",
          verticalAlign: "0.7em", display: "inline-block", marginRight: "0.3em",
        }}>
          (actually)
        </span>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(56px, 12vw, 200px)", letterSpacing: "-0.035em", color: "white",
        }}>
          orbiting?
        </span>
      </h2>

      {/* G3b: Inline contact form replaces CTA buttons */}
      <div className="cta-anim opacity-0">
        <ContactForm variant="inline" />
      </div>
    </section>
  );
}
