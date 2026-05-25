type Section = { id?: string; title: string; body: React.ReactNode };

export default function LegalPage({
  title,
  intro,
  updatedAt,
  sections,
}: {
  title: string;
  intro: string;
  updatedAt: string;
  sections: Section[];
}) {
  return (
    <div className="relative z-10">
      <section
        style={{
          padding: "clamp(60px, 10vw, 120px) 5vw clamp(40px, 6vw, 60px)",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-cyan)",
          }}
        >
          Legal · Last updated {updatedAt}
        </span>
        <h1
          className="mt-4"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(40px, 7vw, 84px)",
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--color-text)",
            textShadow: "var(--text-shadow-safety)",
          }}
        >
          {title}
        </h1>
        <p
          className="mt-6"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(16px, 2.2vw, 19px)",
            color: "var(--color-text-dim)",
            lineHeight: 1.65,
          }}
        >
          {intro}
        </p>
      </section>

      <section
        style={{
          padding: "0 5vw clamp(60px, 10vw, 120px)",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {sections.map((s, i) => (
          <div key={i} id={s.id} className="mb-10" style={{ scrollMarginTop: 80 }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(22px, 3.4vw, 30px)",
                letterSpacing: "-0.02em",
                color: "var(--color-text)",
                marginBottom: 12,
                lineHeight: 1.2,
              }}
            >
              {i + 1}. {s.title}
            </h2>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 2vw, 17px)",
                color: "var(--color-text-dim)",
                lineHeight: 1.7,
              }}
            >
              {s.body}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
