import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Auxilifiers",
  description:
    "How Auxilifiers collects, uses, stores, and protects your personal data. Plain-language privacy policy covering the website and client engagements.",
  alternates: { canonical: "/privacy" },
};

const updatedAt = "May 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updatedAt={updatedAt}
      intro="We respect your privacy. This policy explains what data we collect when you use auxilifiers.com or engage us as a client, why we collect it, how we protect it, and the choices you have. We've tried to keep the language plain — no buried clauses."
      sections={[
        {
          id: "data-collected",
          title: "What we collect",
          body: (
            <>
              <p><strong>From the website:</strong></p>
              <ul style={{ marginTop: 10, paddingLeft: 20, listStyle: "disc" }}>
                <li>Basic analytics (pages visited, time on site, country) via privacy-friendly analytics.</li>
                <li>Information you give us in the contact form (name, email, phone, company, message).</li>
                <li>Testimonials you submit (stored locally in your browser, plus emailed to us if you submit).</li>
              </ul>
              <p className="mt-4"><strong>From client engagements:</strong></p>
              <ul style={{ marginTop: 10, paddingLeft: 20, listStyle: "disc" }}>
                <li>Business details, project requirements, access credentials you choose to share.</li>
                <li>Communications across email, chat, and calls.</li>
                <li>Invoicing details (company name, address, tax ID) for billing.</li>
              </ul>
            </>
          ),
        },
        {
          id: "how-used",
          title: "How we use it",
          body: (
            <>
              <p>We use your data only to:</p>
              <ul style={{ marginTop: 10, paddingLeft: 20, listStyle: "disc" }}>
                <li>Reply to your enquiry and propose work.</li>
                <li>Deliver the services you&apos;ve hired us for.</li>
                <li>Invoice you and keep accounting records as legally required.</li>
                <li>Improve the website and our processes.</li>
              </ul>
              <p className="mt-3">
                We do not sell your data. We do not share it with third parties for their marketing. We do not use your data to train
                AI models.
              </p>
            </>
          ),
        },
        {
          id: "legal-basis",
          title: "Legal basis (for users in the EU/UK)",
          body: (
            <>
              <p>We process data on the following bases:</p>
              <ul style={{ marginTop: 10, paddingLeft: 20, listStyle: "disc" }}>
                <li><strong>Consent</strong> — when you submit the contact form or a testimonial.</li>
                <li><strong>Contract</strong> — when we&apos;re delivering services to you.</li>
                <li><strong>Legitimate interest</strong> — for site analytics and to keep our services secure.</li>
                <li><strong>Legal obligation</strong> — invoice and tax records.</li>
              </ul>
            </>
          ),
        },
        {
          id: "storage",
          title: "Where we store it",
          body: (
            <>
              <p>
                Contact form submissions are received via Resend and forwarded to{" "}
                <a href="mailto:info@auxilifiers.com" style={{ color: "var(--color-cyan)" }}>info@auxilifiers.com</a>. Project files
                are stored in encrypted cloud workspaces (Google Workspace, Notion, GitHub, Vercel). Some providers are based outside
                Pakistan; transfers are protected by their standard contractual clauses or equivalent safeguards.
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "How long we keep it",
          body: (
            <>
              <p>
                Contact form data: kept up to 24 months after our last conversation, then deleted.
                <br />Client project data: kept for the duration of the engagement plus 36 months for warranty/audit, then deleted on
                request.
                <br />Accounting records: kept for the minimum period required by law (typically 6 years).
              </p>
            </>
          ),
        },
        {
          id: "cookies",
          title: "Cookies & similar technologies",
          body: (
            <>
              <p>
                We use a small number of cookies and localStorage entries for essential functions: remembering your theme preference
                (light/dark) and storing testimonials you submit locally. We do not use third-party advertising cookies. Any analytics
                we run is configured to anonymise IPs.
              </p>
            </>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <>
              <p>You have the right to:</p>
              <ul style={{ marginTop: 10, paddingLeft: 20, listStyle: "disc" }}>
                <li>Access the personal data we hold about you.</li>
                <li>Correct anything inaccurate.</li>
                <li>Ask us to delete your data (subject to legal record-keeping obligations).</li>
                <li>Withdraw consent at any time.</li>
                <li>Object to certain processing.</li>
              </ul>
              <p className="mt-3">
                Email{" "}
                <a href="mailto:info@auxilifiers.com" style={{ color: "var(--color-cyan)" }}>info@auxilifiers.com</a> with
                &ldquo;Privacy request&rdquo; in the subject and we&apos;ll respond within 30 days.
              </p>
            </>
          ),
        },
        {
          id: "security",
          title: "Security",
          body: (
            <>
              <p>
                We protect your data with industry-standard measures: encrypted transit (HTTPS), encrypted storage, two-factor
                authentication on all team accounts, principle-of-least-privilege access, and regular reviews. No system is 100%
                secure, but we take reasonable steps to keep yours safe.
              </p>
            </>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: (
            <>
              <p>
                Our services are not directed at children under 16. We do not knowingly collect data from children. If you believe
                we&apos;ve received data from a child, contact us and we&apos;ll delete it.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: (
            <>
              <p>
                If we update this policy, the &ldquo;Last updated&rdquo; date will change. Material changes will also be announced on this page
                for at least 30 days before taking effect.
              </p>
            </>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <>
              <p>
                Questions or concerns?{" "}
                <a href="mailto:info@auxilifiers.com" style={{ color: "var(--color-cyan)" }}>info@auxilifiers.com</a>.
              </p>
            </>
          ),
        },
      ]}
    />
  );
}
