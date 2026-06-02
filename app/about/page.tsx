import Link from "next/link";
import { buildMetadata } from "@/lib/page-seo";
import PageSeoSchema from "@/components/PageSeoSchema";

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata("/about");
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

const values = [
  {
    n: "01",
    title: "Plain language, always.",
    body:
      "We talk like humans, not consultants. If we can't explain what we're doing in one clear sentence, we're doing it wrong.",
  },
  {
    n: "02",
    title: "Outcomes over outputs.",
    body:
      "We don't bill hours or ship deliverables to feel busy. We ship results — measurable ones — and walk you through what they mean.",
  },
  {
    n: "03",
    title: "Your stack, your data.",
    body:
      "You own the code, the accounts, the data, everything. We never lock you in or hold your business hostage.",
  },
  {
    n: "04",
    title: "Compound, don't churn.",
    body:
      "Quick wins are great. Compounding wins are better. We build for the next 3 years, not the next 30 days.",
  },
];

const stats = [
  { value: "47%", label: "average organic traffic lift in 6 months" },
  { value: "30+", label: "automations shipped across SMB clients" },
  { value: "24h", label: "reply window — every single enquiry" },
  { value: "3", label: "pillars · one mission" },
];

const process = [
  {
    n: "01",
    title: "Listen",
    body:
      "We start with a 30-minute call. No slides, no pitch — just questions about your business, customers, and what's actually broken.",
  },
  {
    n: "02",
    title: "Map",
    body:
      "We send back a written plan with scope, timeline, and the exact outcomes you can expect. You sign off before any work starts.",
  },
  {
    n: "03",
    title: "Build",
    body:
      "Weekly progress updates, fortnightly demos. You see what's shipping in real time — never a 6-week silence followed by a big reveal.",
  },
  {
    n: "04",
    title: "Stay",
    body:
      "We don't disappear after launch. Ongoing care, monthly improvements, and a real human you can message when something breaks.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <PageSeoSchema path="/about" />
      {/* Hero */}
      <section style={{ padding: "clamp(60px, 10vw, 120px) 5vw clamp(40px, 6vw, 60px)", maxWidth: 1400, margin: "0 auto", textAlign: "center" }}>
        <span style={sectionLabel}>About Auxilifiers</span>
        <h1
          className="mt-4 mx-auto"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(48px, 9vw, 132px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.98,
            color: "var(--color-text)",
            textShadow: "var(--text-shadow-safety)",
            maxWidth: 1200,
          }}
        >
          Orbiting around{" "}
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
            your
          </em>{" "}
          success.
        </h1>
        <p
          className="mt-8 mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(17px, 2.4vw, 21px)",
            color: "var(--color-text-dim)",
            maxWidth: 720,
            lineHeight: 1.6,
          }}
        >
          We&apos;re a tech and growth agency for ambitious small and mid-size businesses. Not enterprises, not other developers — the
          founders, operators, and teams who need the tech to just work, the operations to just run, and the audience to just grow.
        </p>
      </section>

      {/* Stats row */}
      <section style={{ padding: "clamp(20px, 4vw, 40px) 5vw", maxWidth: 1400, margin: "0 auto" }}>
        <div
          className="grid grid-cols-2 min-[900px]:grid-cols-4 gap-5"
          style={{
            borderTop: "1px solid var(--color-border-subtle)",
            borderBottom: "1px solid var(--color-border-subtle)",
            padding: "clamp(20px, 4vw, 32px) 0",
          }}
        >
          {stats.map((s) => (
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

      {/* Story */}
      <section style={{ padding: "clamp(60px, 8vw, 100px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <span style={sectionLabel}>The story</span>
            <h2 style={sectionHeading} className="mt-3">
              Why we exist.
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(17px, 2.3vw, 20px)",
                color: "var(--color-text-dim)",
                lineHeight: 1.65,
              }}
            >
              Most growing businesses are stuck in the same trap: a website that looks dated and converts badly, a team buried in
              copy-paste work, and marketing that feels like setting money on fire. The freelancers are unreliable. The big agencies
              are expensive and aloof. The DIY tools all promise the moon and deliver a half-baked dashboard.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(17px, 2.3vw, 20px)",
                color: "var(--color-text-dim)",
                lineHeight: 1.65,
              }}
            >
              Auxilifiers exists to be the team you wish you had in-house — one that builds clean, ships fast, automates the boring
              stuff with AI, and grows your reach with engineering, not gambling. We don&apos;t want to be the spotlight; we want to
              be the satellite that keeps your business orbiting forward.
            </p>
            <p
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "clamp(22px, 3vw, 28px)",
                color: "var(--color-cyan)",
                lineHeight: 1.35,
                marginTop: 8,
              }}
            >
              Build it. Automate it. Grow it. Stay close.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 5vw", maxWidth: 1400, margin: "0 auto" }}>
        <div className="text-center mb-12">
          <span style={sectionLabel}>What we believe</span>
          <h2 style={sectionHeading} className="mt-3">
            Four principles. Zero exceptions.
          </h2>
        </div>
        <div className="grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.n}
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
                {v.n}
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
                {v.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--color-text-muted)",
                }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 5vw", maxWidth: 1400, margin: "0 auto" }}>
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[1fr_1.4fr] gap-10 items-start">
          <div>
            <span style={sectionLabel}>How we work</span>
            <h2 style={sectionHeading} className="mt-3">
              No surprises. Ever.
            </h2>
            <p
              className="mt-5"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: 360,
              }}
            >
              The same four-step rhythm runs through every engagement, whether we&apos;re shipping a website or automating an inbox.
            </p>
          </div>
          <div className="grid grid-cols-1 min-[640px]:grid-cols-2 gap-5">
            {process.map((p) => (
              <div
                key={p.n}
                className="p-6 flex flex-col gap-2"
                style={{
                  background: "var(--color-card-bg)",
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "var(--radius-lg)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    color: "var(--color-cyan)",
                  }}
                >
                  STEP {p.n}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "var(--color-text)",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--color-text-muted)",
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are NOT */}
      <section style={{ padding: "clamp(40px, 6vw, 80px) 5vw", maxWidth: 1200, margin: "0 auto" }}>
        <div className="mb-10 text-center">
          <span style={sectionLabel}>Honest disclosure</span>
          <h2 style={sectionHeading} className="mt-3">
            Who we&apos;re not.
          </h2>
          <p className="mt-5 mx-auto" style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(15px, 2vw, 18px)",
            color: "var(--color-text-muted)", maxWidth: 600, lineHeight: 1.55,
          }}>
            Plenty of agencies fit some of these. We&apos;d rather you know upfront.
          </p>
        </div>
        <div className="grid grid-cols-1 min-[640px]:grid-cols-3 gap-5">
          {[
            { t: "Not an enterprise agency", b: "We don't pitch the Fortune 500. If you need 6-month sales cycles and 20-person account teams, we're the wrong fit." },
            { t: "Not a freelancer collective", b: "Our team is stable and full-time. We don't subcontract your project to whoever's cheapest this week." },
            { t: "Not a tools reseller", b: "We don't push you onto platforms because they pay us referral fees. We pick what's actually right for your business." },
          ].map((x) => (
            <div key={x.t} className="p-6" style={{
              background: "var(--color-card-bg)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-lg)",
            }}>
              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 400, fontSize: 20,
                letterSpacing: "-0.02em", color: "var(--color-text)", lineHeight: 1.2,
              }}>{x.t}</h3>
              <p className="mt-3" style={{
                fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6,
                color: "var(--color-text-muted)",
              }}>{x.b}</p>
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
            <span style={sectionLabel}>Let&apos;s build something</span>
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
              Tell us about your business. We&apos;ll bring the plan.
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
              A 2-line brief is enough to get started. We reply within one business day with concrete next steps — no slides, no jargon.
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
