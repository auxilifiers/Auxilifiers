const FAQS = [
  {
    q: "How long does it take to launch?",
    a: "Websites & stores: 4–8 weeks typical. AI automations: 2–6 weeks. SEO & ads start producing results in 2–12 weeks depending on scope. We give a concrete timeline before any work begins, and weekly progress updates throughout.",
  },
  {
    q: "Will I own everything you build?",
    a: "Yes — fully. You own the code, the design files, the accounts, the data. We hand over everything on launch and never lock you in. If you decide to leave us, you keep working with what we built.",
  },
  {
    q: "What if I don't know exactly what I need?",
    a: "That's normal — most founders don't. We start with a free 20-minute call. We listen, ask the right questions, and write back a plan with options. No slides, no pressure.",
  },
  {
    q: "Do you work with businesses outside Pakistan?",
    a: "Yes. We work with clients in the UK, US, UAE, Canada, and across Europe. All meetings happen on Zoom or Google Meet, and we collaborate across time zones with overlap windows.",
  },
  {
    q: "What if something breaks after launch?",
    a: "We don't disappear. Critical bugs in the first 30 days are fixed free. After that we offer simple care plans or fixed-scope updates — your choice. We keep your access; you don't have to chase us.",
  },
  {
    q: "Can you take over an existing project?",
    a: "Often, yes. We audit what's already built, keep what works, fix what doesn't, and document everything before continuing. We've taken over from freelancers and agencies — the goal is always to leave you in a stable place.",
  },
  {
    q: "Do you require long contracts?",
    a: "No. Project work is fixed-scope. Retainers run month-to-month with a one-month notice period. If you're unhappy, you can leave. We'd rather earn the next month than lock you into twelve.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes — happy to sign a mutual NDA before sharing anything sensitive. We can also use yours. Just send it over after the first call and we'll turn it around the same day.",
  },
];

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
