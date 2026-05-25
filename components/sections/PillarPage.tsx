import Link from "next/link";
import { getServicesByPillar, getPillar, type PillarId } from "@/data/services";

export default function PillarPage({ pillarId }: { pillarId: PillarId }) {
  const pillar = getPillar(pillarId);
  const services = getServicesByPillar(pillarId);
  if (!pillar) return null;

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section
        style={{
          padding: "clamp(60px, 10vw, 120px) 5vw clamp(40px, 6vw, 60px)",
          maxWidth: 1600,
          margin: "0 auto",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-6"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(10px, 2vw, 13px)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-cyan)",
          }}
        >
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>Home</Link>
          <span style={{ color: "var(--color-text-muted)" }}>/</span>
          <span>{pillar.label}</span>
        </div>

        <h1
          className="text-center"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(48px, 9vw, 120px)",
            letterSpacing: "-0.035em",
            lineHeight: 1,
            color: "var(--color-text)",
            textShadow: "var(--text-shadow-safety)",
          }}
        >
          {pillar.title}.
        </h1>
        <p
          className="text-center mx-auto mt-6"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(20px, 3vw, 32px)",
            color: "var(--color-cyan)",
            maxWidth: 720,
            lineHeight: 1.3,
          }}
        >
          {pillar.tagline}
        </p>
        <p
          className="text-center mx-auto mt-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(15px, 2.4vw, 19px)",
            color: "var(--color-text-muted)",
            maxWidth: 720,
            lineHeight: 1.6,
          }}
        >
          {pillar.description}
        </p>
      </section>

      {/* Services grid */}
      <section
        style={{
          padding: "clamp(20px, 4vw, 40px) 5vw clamp(60px, 10vw, 120px)",
          maxWidth: 1600,
          margin: "0 auto",
        }}
      >
        <div
          className="flex items-center gap-3 mb-8"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--color-cyan)" }} />
          {services.length} services
        </div>

        <div className="svc-grid">
          {services.map((svc) => (
            <Link
              key={svc.id}
              href={`/services/${svc.id}`}
              className="svc-card svc-grid-item group relative flex flex-col overflow-hidden"
              style={{
                background: "var(--color-card-bg)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border-subtle)",
                textDecoration: "none",
                color: "inherit",
                cursor: "none",
              }}
            >
              <div className="relative" style={{ height: 200, overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={svc.image}
                  alt={svc.title}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.7s ease" }}
                  className="group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "var(--color-card-img-overlay)" }} />
              </div>
              <div className="flex flex-col flex-1 p-6 gap-2">
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(20px, 3vw, 24px)",
                    letterSpacing: "-0.02em",
                    color: "var(--color-text)",
                    lineHeight: 1.15,
                  }}
                >
                  {svc.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {svc.summary}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {pillar.label}
                  </span>
                  <span
                    className="flex items-center gap-1.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                      color: "var(--color-cyan)",
                    }}
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
