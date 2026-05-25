"use client";

import { useEffect, useRef, useState } from "react";

type Option = { value: string; label: string };

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Choose…",
  disabled = false,
  required = false,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setFocusIdx((i) => Math.min(i + 1, options.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setFocusIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && focusIdx >= 0) {
        e.preventDefault();
        onChange(options[focusIdx].value);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, focusIdx, options, onChange]);

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          padding: "12px 40px 12px 14px",
          borderRadius: "var(--radius-md)",
          border: `1px solid ${open ? "var(--color-cyan)" : "var(--color-border-default)"}`,
          background: "var(--color-input-bg)",
          color: selected ? "var(--color-text)" : "var(--color-input-placeholder)",
          outline: "none",
          width: "100%",
          textAlign: "left",
          cursor: "none",
          boxShadow: open ? "0 0 0 3px color-mix(in srgb, var(--color-cyan) 18%, transparent)" : "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          position: "relative",
        }}
      >
        {selected ? selected.label : placeholder}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            transition: "transform 0.2s",
            color: "var(--color-cyan)",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1,1 6,7 11,1" />
          </svg>
        </span>
      </button>

      {required && (
        <input
          type="text"
          value={value}
          required
          onChange={() => {}}
          tabIndex={-1}
          aria-hidden="true"
          style={{
            position: "absolute", opacity: 0, height: 1, width: 1,
            top: 0, left: 0, pointerEvents: "none",
          }}
        />
      )}

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 w-full mt-2 overflow-hidden"
          style={{
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border-default)",
            borderRadius: "var(--radius-md)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
            maxHeight: 280,
            overflowY: "auto",
            padding: 4,
            listStyle: "none",
          }}
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isFocused = i === focusIdx;
            return (
              <li
                key={opt.value || `_empty_${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setFocusIdx(i)}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                style={{
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  color: isSelected ? "var(--color-cyan)" : "var(--color-text)",
                  background: isFocused
                    ? "color-mix(in srgb, var(--color-cyan) 14%, transparent)"
                    : "transparent",
                  cursor: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  transition: "background 0.12s",
                }}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span aria-hidden="true" style={{ color: "var(--color-cyan)" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2,7 6,11 12,3" />
                    </svg>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
