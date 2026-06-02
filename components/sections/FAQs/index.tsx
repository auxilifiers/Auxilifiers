import { FAQS } from "@/data/faqs";

export default function FAQs() {
  return (
    <section
      id="faqs"
      style={{
        padding: "clamp(20px, 3vw, 36px) 5vw clamp(20px, 3vw, 32px)",
        maxWidth: 1000,
        margin: "0 auto",
        scrollMarginTop: 56,
      }}
    >
      <div className="text-center mb-6 min-[768px]:mb-8">
        <div
          className="flex items-center justify-center gap-3 mb-4"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(10px, 2vw, 14px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-cyan)",
          }}
        >
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
          Common questions
          <span style={{ display: "inline-block", width: 40, height: 1, background: "var(--color-cyan)" }} />
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(34px, 5.5vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--color-text)",
            textShadow: "var(--text-shadow-safety)",
          }}
        >
          Questions{" "}
          <em
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontStyle: "italic",
              fontWeight: 400,
              background: "var(--gradient-soft)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            we get
          </em>
          .
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {FAQS.map((f, i) => (
          <details
            key={i}
            className="group"
            style={{
              background: "var(--color-card-bg)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-lg)",
              padding: "20px 24px",
            }}
          >
            <summary
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(17px, 2.4vw, 20px)",
                color: "var(--color-text)",
                letterSpacing: "-0.01em",
                cursor: "none",
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {f.q}
              <span
                className="group-open:rotate-45 transition-transform duration-300"
                style={{ color: "var(--color-cyan)", fontSize: 24, lineHeight: 1, flexShrink: 0 }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--color-text-dim)",
              }}
            >
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
