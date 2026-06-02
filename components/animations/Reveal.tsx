"use client";

import { useEffect, useRef } from "react";

// Reusable scroll-reveal. Wrap any block; its direct children animate in
// (staggered) when scrolled into view. Pick a different `anim` per page for
// variety. Matches the site's GSAP pattern (dynamic import + ScrollTrigger).
//
// Children start hidden via the global `.reveal-group > *` CSS rule so there
// is no flash before GSAP runs, and prefers-reduced-motion shows them instantly.

export type RevealAnim = "up" | "fade" | "left" | "right" | "scale" | "blur";

const FROM: Record<RevealAnim, Record<string, number | string>> = {
  up: { opacity: 0, y: 44 },
  fade: { opacity: 0 },
  left: { opacity: 0, x: -56 },
  right: { opacity: 0, x: 56 },
  scale: { opacity: 0, scale: 0.88 },
  blur: { opacity: 0, y: 28, filter: "blur(12px)" },
};

const EASE: Record<RevealAnim, string> = {
  up: "power3.out",
  fade: "power2.out",
  left: "expo.out",
  right: "expo.out",
  scale: "back.out(1.4)",
  blur: "power3.out",
};

export default function Reveal({
  children,
  anim = "up",
  mode = "each",
  stagger = 0.12,
  duration = 0.8,
  start = "top 82%",
  className = "",
  style,
}: {
  children: React.ReactNode;
  anim?: RevealAnim;
  // "each": every child gets its own trigger (animates as it scrolls in — best
  // for stacked page sections). "stagger": one trigger, children cascade (best
  // for a grid/row of cards).
  mode?: "each" | "stagger";
  stagger?: number;
  duration?: number;
  start?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.children.length ? Array.from(el.children) : [el];

    // Respect reduced-motion: just show everything.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((t) => ((t as HTMLElement).style.opacity = "1"));
      return;
    }

    let cleanup = () => {};
    (async () => {
      try {
        const gsap = (await import("gsap")).default;
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        const to = {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration,
          ease: EASE[anim],
        };

        if (mode === "stagger") {
          const tween = gsap.fromTo(targets, FROM[anim], {
            ...to,
            stagger,
            scrollTrigger: { trigger: el, start },
          });
          cleanup = () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        } else {
          // Each child animates when it individually scrolls into view.
          const tweens = targets.map((t) =>
            gsap.fromTo(t, FROM[anim], { ...to, scrollTrigger: { trigger: t, start } }),
          );
          cleanup = () => tweens.forEach((tw) => { tw.scrollTrigger?.kill(); tw.kill(); });
        }
      } catch {
        // If GSAP fails to load, reveal the content so nothing stays hidden.
        targets.forEach((t) => ((t as HTMLElement).style.opacity = "1"));
      }
    })();

    return () => cleanup();
  }, [anim, mode, stagger, duration, start]);

  return (
    <div ref={ref} className={`reveal-group ${className}`} style={style}>
      {children}
    </div>
  );
}
