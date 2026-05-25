import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  services,
  getServiceById,
  getPillar,
  getServicesByPillar,
  pillarDetails,
} from "@/data/services";

type Params = { id: string };

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const svc = getServiceById(id);
  if (!svc) return { title: "Service not found | Auxilifiers" };
  return {
    title: `${svc.title} | Auxilifiers`,
    description: svc.summary,
    openGraph: {
      title: `${svc.title} — Auxilifiers`,
      description: svc.summary,
      images: [{ url: svc.image }],
      type: "article",
    },
  };
}

const sectionLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--color-cyan)",
};
const sectionHeading: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontSize: "clamp(28px, 4.5vw, 44px)",
  letterSpacing: "-0.025em",
  lineHeight: 1.1,
  color: "var(--color-text)",
  marginTop: 8,
};

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const svc = getServiceById(id);
  if (!svc) notFound();
  const pillar = getPillar(svc.pillar)!;
  const detail = pillarDetails[svc.pillar];
  const siblings = getServicesByPillar(svc.pillar).filter((s) => s.id !== svc.id);

  return (
    <div className="relative z-10">
      {/* Breadcrumb + Hero */}
      <section style={{ padding: "clamp(40px, 8vw, 80px) 5vw 0", maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="flex items-center gap-2 mb-6 flex-wrap"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href={pillar.href} style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>{pillar.title}</Link>
          <span>/</span>
          <span style={{ color: "var(--color-cyan)" }}>{svc.title}</span>
        </div>

        <span style={sectionLabel}>{pillar.label} · service</span>
        <h1
          className="mt-3 mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(36px, 6.5vw, 80px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--color-text)",
          }}
        >
          {svc.title}
        </h1>
        <p
          className="mb-6"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: "italic",
            fontSize: "clamp(20px, 3vw, 28px)",
            color: "var(--color-cyan)",
            lineHeight: 1.3,
            maxWidth: 720,
          }}
        >
          {svc.summary}
        </p>

        <div className="flex flex-wrap gap-3 mb-7">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              padding: "6px 14px",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--color-border-strong)",
              color: "var(--color-cyan)",
              background: "rgba(0, 245, 255, 0.06)",
              letterSpacing: "0.06em",
            }}
          >
            ⏱ {detail.timeline}
          </span>
          <Link
            href="#contact"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              padding: "6px 14px",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--color-border-default)",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            Free 20-min consultation →
          </Link>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={svc.image}
          alt={svc.title}
          style={{
            width: "100%",
            height: "clamp(220px, 40vw, 440px)",
            objectFit: "cover",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border-subtle)",
            display: "block",
          }}
        />
      </section>

      {/* Pitch + Outcomes */}
      <section style={{ padding: "clamp(40px, 6vw, 60px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-2 gap-10">
          <div>
            <span style={sectionLabel}>The pitch</span>
            <h2 style={sectionHeading}>What you're really buying</h2>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(17px, 2.4vw, 19px)",
                lineHeight: 1.65,
                color: "var(--color-text-dim)",
              }}
            >
              {svc.pitch}
            </p>
          </div>
          <div>
            <span style={sectionLabel}>What you get</span>
            <h2 style={sectionHeading}>Concrete deliverables</h2>
            <ul className="flex flex-col gap-3 mt-5">
              {svc.outcomes.map((o, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: "var(--color-text-dim)",
                  }}
                >
                  <span
                    className="shrink-0 mt-2"
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--color-cyan)",
                      boxShadow: "var(--glow-cyan-soft)",
                    }}
                  />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section style={{ padding: "clamp(20px, 4vw, 40px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <span style={sectionLabel}>Who this is for</span>
        <h2 style={sectionHeading}>The right fit looks like…</h2>
        <div className="grid grid-cols-1 min-[640px]:grid-cols-3 gap-5 mt-8">
          {detail.whoFor.map((line, i) => (
            <div
              key={i}
              className="p-6"
              style={{
                background: "var(--color-card-bg)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                className="mb-3 flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-pill)",
                  border: "1px solid var(--color-border-strong)",
                  color: "var(--color-cyan)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  fontWeight: 500,
                  background: "rgba(0, 245, 255, 0.06)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--color-text-dim)",
                }}
              >
                {line}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "clamp(40px, 6vw, 60px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <span style={sectionLabel}>How we work</span>
        <h2 style={sectionHeading}>From kickoff to live in 4 steps</h2>
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4 gap-5 mt-8">
          {detail.process.map((step) => (
            <div
              key={step.step}
              className="p-6 flex flex-col gap-3"
              style={{
                background: "var(--color-card-bg)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  color: "var(--color-cyan)",
                }}
              >
                {step.step}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text)",
                  lineHeight: 1.15,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--color-text-muted)",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools / tech */}
      <section style={{ padding: "clamp(20px, 4vw, 40px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <span style={sectionLabel}>Tech we work with</span>
        <h2 style={sectionHeading}>Battle-tested tools, not buzzwords</h2>
        <div className="flex flex-wrap gap-2.5 mt-7">
          {detail.tools.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                padding: "8px 16px",
                borderRadius: "var(--radius-pill)",
                border: "1px solid var(--color-border-default)",
                color: "var(--color-text)",
                background: "var(--color-card-bg)",
                letterSpacing: "0.04em",
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "clamp(40px, 6vw, 60px) 5vw", maxWidth: 1000, margin: "0 auto" }}>
        <span style={sectionLabel}>Questions you might have</span>
        <h2 style={sectionHeading}>FAQs</h2>
        <div className="mt-8 flex flex-col gap-3">
          {detail.faqs.map((faq, i) => (
            <details
              key={i}
              className="group"
              style={{
                background: "var(--color-card-bg)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 22px",
              }}
            >
              <summary
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(17px, 2.4vw, 19px)",
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
                {faq.q}
                <span
                  className="group-open:rotate-45 transition-transform duration-300"
                  style={{
                    color: "var(--color-cyan)",
                    fontSize: 22,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
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
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section id="contact" style={{ padding: "clamp(40px, 6vw, 60px) 5vw", maxWidth: 1200, margin: "0 auto", scrollMarginTop: 80 }}>
        <div
          className="flex flex-wrap items-center justify-between gap-5 p-7 min-[640px]:p-10"
          style={{
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border-strong)",
            background: "var(--color-card-bg)",
          }}
        >
          <div style={{ maxWidth: 520 }}>
            <span style={sectionLabel}>Ready when you are</span>
            <h3
              className="mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(24px, 4vw, 34px)",
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Let's talk about your {svc.title.toLowerCase()} project.
            </h3>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "var(--color-text-muted)",
                lineHeight: 1.55,
              }}
            >
              Share a 2-line brief and we'll come back within one business day with a tailored plan and timeline.
            </p>
          </div>
          <Link
            href="/#contact"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 16,
              fontWeight: 500,
              padding: "14px 32px",
              borderRadius: "var(--radius-pill)",
              background: "var(--gradient)",
              color: "var(--color-cta-text)",
              textDecoration: "none",
            }}
          >
            Get in touch&nbsp;→
          </Link>
        </div>
      </section>

      {/* Related services */}
      {siblings.length > 0 && (
        <section style={{ padding: "0 5vw clamp(60px, 10vw, 120px)", maxWidth: 1600, margin: "0 auto" }}>
          <span style={sectionLabel}>Keep exploring</span>
          <h2 style={sectionHeading} className="mb-8">More in {pillar.title}</h2>
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 gap-5">
            {siblings.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.id}`}
                className="svc-card flex gap-4 p-4"
                style={{
                  background: "var(--color-card-bg)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border-subtle)",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "none",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  style={{ width: 88, height: 88, objectFit: "cover", borderRadius: "var(--radius-sm)", flexShrink: 0 }}
                />
                <div className="flex flex-col justify-center min-w-0">
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: 17,
                      color: "var(--color-text)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "var(--color-text-muted)",
                      marginTop: 4,
                      lineHeight: 1.4,
                    }}
                  >
                    {s.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
