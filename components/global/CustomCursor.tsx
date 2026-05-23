"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTORS = "a, button, .tag, .pillar, .marquee-item";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(any-pointer: fine)").matches;
    if (!hasFinePointer) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    dot.style.display = "block";
    ring.style.display = "block";

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
    };

    const onEnter = () => {
      isHovering.current = true;
      if (ring) {
        ring.style.width = "70px";
        ring.style.height = "70px";
        ring.style.borderColor = "rgba(0, 245, 255, 0.4)";
        ring.style.backgroundColor = "rgba(0, 245, 255, 0.08)";
      }
      if (dot) {
        dot.style.opacity = "0.3";
        dot.style.transform += " scale(0.5)";
      }
    };

    const onLeave = () => {
      isHovering.current = false;
      if (ring) {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(0, 245, 255, 0.6)";
        ring.style.backgroundColor = "transparent";
      }
      if (dot) {
        dot.style.opacity = "1";
      }
    };

    const bindListeners = () => {
      document.querySelectorAll(INTERACTIVE_SELECTORS).forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    const observer = new MutationObserver(bindListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mousemove", onMouseMove);
    bindListeners();

    let rafId: number;
    const lerp = 0.18;
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * lerp;
      const size = isHovering.current ? 35 : 18;
      ring.style.transform = `translate3d(${ringPos.current.x - size}px, ${ringPos.current.y - size}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.querySelectorAll(INTERACTIVE_SELECTORS).forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        data-custom-cursor
        style={{
          display: "none",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#00F5FF",
          boxShadow: "var(--glow-cyan-soft)",
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        data-custom-cursor
        style={{
          display: "none",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 245, 255, 0.6)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s",
        }}
      />
    </>
  );
}
