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

      // Eyebrow clips in
      gsap.fromTo(section.querySelector(".cta-eyebrow"),
        { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 75%" } });

      // Headline words scale up from small with blur
      const words = section.querySelectorAll(".cta-word");
      gsap.fromTo(words, { opacity: 0, scale: 0.4, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "back.out(1.4)", stagger: 0.1, scrollTrigger: { trigger: section, start: "top 75%" } });

      // Form slides up
      gsap.fromTo(section.querySelector(".cta-form"),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", delay: 0.3, scrollTrigger: { trigger: section, start: "top 75%" } });
    };
    init();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: "clamp(60px, 10vw, 100px) 5vw", maxWidth: 1400, margin: "0 auto", textAlign: "center", scrollMarginTop: 56 }}
    >
      <div className="cta-eyebrow flex items-center justify-center gap-4 mb-5 opacity-0" style={{
        fontFamily: "var(--font-mono)", fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-cyan)",
      }}>
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        One last thing
        <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
      </div>

      <h2 className="mb-8" style={{ textShadow: "var(--text-shadow-safety)", lineHeight: 1.1, perspective: 800 }}>
        <span className="cta-word inline-block opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(28px, 7vw, 96px)", letterSpacing: "-0.035em", color: "white", marginRight: "0.2em",
        }}>
          Ready
        </span>
        <span className="cta-word inline-block opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(28px, 7vw, 96px)", letterSpacing: "-0.035em", color: "white", marginRight: "0.2em",
        }}>
          to
        </span>
        <span className="cta-word inline-block opacity-0" style={{
          fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(28px, 7vw, 96px)",
          background: "var(--gradient-soft)", WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          start
        </span>
        <br />
        <span className="cta-word inline-block opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(14px, 2.5vw, 32px)", color: "var(--color-text-dim)",
          verticalAlign: "0.5em", marginRight: "0.3em",
        }}>
          (actually)
        </span>
        <span className="cta-word inline-block opacity-0" style={{
          fontFamily: "var(--font-display)", fontWeight: 300,
          fontSize: "clamp(28px, 7vw, 96px)", letterSpacing: "-0.035em", color: "white",
        }}>
          scaling?
        </span>
      </h2>

      {/* Centered inline contact form */}
      <div className="cta-form opacity-0 flex justify-center">
        <ContactForm variant="inline" />
      </div>
    </section>
  );
}
