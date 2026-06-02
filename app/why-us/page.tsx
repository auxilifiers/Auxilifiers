import Link from "next/link";
import { buildMetadata } from "@/lib/page-seo";
import PageSeoSchema from "@/components/PageSeoSchema";

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata("/why-us");
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
  fontWeight: 300,
  fontSize: "clamp(34px, 5.5vw, 64px)",
  letterSpacing: "-0.03em",
  lineHeight: 1.05,
  color: "var(--color-text)",
};

const reasons = [
  {
    n: "01",
    title: "We bill outcomes, not hours.",
    body:
      "Most agencies celebrate billable hours. We don't. You pay for the result, not the time it takes us to get there.",
  },
  {
    n: "02",
    title: "One team, three pillars.",
    body:
      "Build, automate, and grow — under one roof. No handoffs between three different vendors who blame each other when something breaks.",
  },
  {
    n: "03",
    title: "Weekly progress, never silence.",
    body:
      "Every Friday you get a short update. What shipped, what's next, what's blocked. No 6-week silence before a big reveal.",
  },
  {
    n: "04",
    title: "We stay after launch.",
    body:
      "Most agencies vanish the day the site goes live. We stay close — fixing, tuning, and adding what works.",
  },
  {
    n: "05",
    title: "You own everything.",
    body:
      "Code, accounts, content, data. All in your name. We never hold your business hostage.",
  },
  {
    n: "06",
    title: "Plain language.",
    body:
      "If we can't explain it in one sentence, we're doing it wrong. No buzzwords, no acronyms, no consultant-speak.",
  },
];

const comparisons = [
  {
    label: "Freelancers",
    bad: "Flake out, ghost mid-project, narrow skillsets.",
    us: "One stable team. Build, automate, and grow — all in-house.",
  },
  {
    label: "Big agencies",
    bad: "Expensive, slow, layers of account managers, junior teams.",
    us: "Senior operators on every project. Fast turnaround. No filler.",
  },
  {
    label: "DIY tools",
    bad: "Promise the moon. Take weeks to learn. Half-baked dashboards.",
    us: "We build the system for your business. You just use the result.",
  },
];

const proof = [
  { value: "0", label: "ghosted projects to date" },
  { value: "92%", label: "of clients renew the next quarter" },
  { value: "4.9/5", label: "average client rating" },
  { value: "0", label: "long-term contracts required" },
];

export default function WhyUsPage() {
  return (
    <div className="relative z-10">
      <PageSeoSchema path="/why-us" />
      {/* Hero */}
      <section style={{ padding: "clamp(60px, 10vw, 120px) 5vw clamp(40px, 6vw, 60px)", maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
        <span style={sectionLabel}>Why Auxilifiers</span>
        <h1
          className="mt-4 mx-auto"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(44px, 8vw, 124px)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--color-text)",
            textShadow: "var(--text-shadow-safety)",
            maxWidth: 1100,
          }}
        >
          A different kind of{" "}
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
            agency
          </em>
          .
        </h1>
        <p
          className="mt-8 mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(17px, 2.4vw, 21px)",
            color: "var(--color-text-dim)",
            maxWidth: 760,
            lineHeight: 1.6,
          }}
        >
          We don&apos;t bill hours. We don&apos;t disappear after launch. We don&apos;t speak agency-jargon. Here&apos;s why
          founders and operators choose us over freelancers, big agencies, and DIY tools.
        </p>
      </section>

      {/* Stats */}
      <section style={{ padding: "clamp(20px, 4vw, 40px) 5vw", maxWidth: 1400, margin: "0 auto" }}>
        <div
          className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-5"
          style={{
            borderTop: "1px solid var(--color-border-subtle)",
            borderBottom: "1px solid var(--color-border-subtle)",
            padding: "clamp(20px, 4vw, 32px) 0",
          }}
        >
          {proof.map((s) => (
            <div key={s.label} className="text-center">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontSize: "clamp(36px, 6vw, 60px)",
                  letterSpacing: "-0.04em",
                  background: "var(--gradient)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Six reasons */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 5vw", maxWidth: 1400, margin: "0 auto" }}>
        <div className="text-center mb-12">
          <span style={sectionLabel}>The case for us</span>
          <h2 style={sectionHeading} className="mt-3">
            Six reasons clients stay.
          </h2>
        </div>
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div
              key={r.n}
              className="p-7 flex flex-col gap-3"
              style={{
                background: "var(--color-card-bg)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-xl)",
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
                {r.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 22,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text)",
                  lineHeight: 1.2,
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--color-text-muted)",
                }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div className="mb-10">
          <span style={sectionLabel}>How we&apos;re different</span>
          <h2 style={sectionHeading} className="mt-3">
            Us vs. the alternatives.
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {comparisons.map((c) => (
            <div
              key={c.label}
              className="grid grid-cols-1 min-[800px]:grid-cols-[200px_1fr_1fr] gap-4 min-[800px]:gap-8 p-6"
              style={{
                background: "var(--color-card-bg)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-lg)",
                alignItems: "center",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  vs.
                </span>
                <h3
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 24,
                    letterSpacing: "-0.02em",
                    color: "var(--color-text)",
                  }}
                >
                  {c.label}
                </h3>
              </div>
              <div>
                <span
                  className="block mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#ff8a8a",
                  }}
                >
                  ✗ Them
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "var(--color-text-muted)",
                    lineHeight: 1.55,
                  }}
                >
                  {c.bad}
                </p>
              </div>
              <div>
                <span
                  className="block mb-2"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-cyan)",
                  }}
                >
                  ✓ Us
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "var(--color-text-dim)",
                    lineHeight: 1.55,
                  }}
                >
                  {c.us}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What it's like to work with us */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div className="mb-10">
          <span style={sectionLabel}>The rhythm</span>
          <h2 style={sectionHeading} className="mt-3">
            What week one looks like.
          </h2>
        </div>
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-5">
          {[
            { d: "Day 1", t: "Discovery call", b: "30-minute video call. We listen, ask sharp questions, take notes. No deck, no pitch." },
            { d: "Day 2", t: "Plan in your inbox", b: "Written scope, timeline, deliverables — and a fixed quote. You review and edit before signing." },
            { d: "Day 3–5", t: "Kickoff & access", b: "We set up the shared workspace, get access to whatever we need, and book your standing weekly slot." },
            { d: "Day 7", t: "First demo", b: "By Friday you see real progress on your screen. Not a roadmap — actual working pieces." },
          ].map((s) => (
            <div key={s.d} className="p-6" style={{
              background: "var(--color-card-bg)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-lg)",
            }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em",
                color: "var(--color-cyan)",
              }}>{s.d}</span>
              <h3 className="mt-2" style={{
                fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 22,
                letterSpacing: "-0.02em", color: "var(--color-text)", lineHeight: 1.2,
              }}>{s.t}</h3>
              <p className="mt-2" style={{
                fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6,
                color: "var(--color-text-muted)",
              }}>{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 5vw clamp(60px, 10vw, 120px)", maxWidth: 1200, margin: "0 auto" }}>
        <div
          className="flex flex-wrap items-center justify-between gap-6 p-8 min-[640px]:p-12"
          style={{
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border-strong)",
            background: "var(--color-card-bg)",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <span style={sectionLabel}>Pick the team that stays</span>
            <h3
              className="mt-3"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(26px, 4vw, 38px)",
                color: "var(--color-text)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              Ready for an agency that doesn&apos;t ghost?
            </h3>
            <p
              className="mt-3"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "var(--color-text-muted)",
                lineHeight: 1.55,
              }}
            >
              Send us a 2-line brief. We reply within one business day with a tailored plan — and stay with you long after launch.
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
    </div>
  );
}
