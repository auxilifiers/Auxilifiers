import LegalPage from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/page-seo";
import PageSeoSchema from "@/components/PageSeoSchema";

export const revalidate = 60;

export async function generateMetadata() {
  return buildMetadata("/terms");
}

const updatedAt = "May 2026";

export default function TermsPage() {
  return (
    <>
      <PageSeoSchema path="/terms" />
      <LegalPage
      path="/terms"
      title="Terms & Conditions"
      updatedAt={updatedAt}
      intro="These terms describe the basis on which Auxilifiers provides its services and you use this website. By using auxilifiers.com or engaging us for work, you agree to these terms. We've kept the language as plain as we could."
      sections={[
        {
          id: "who-we-are",
          title: "Who we are",
          body: (
            <>
              <p>
                Auxilifiers (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a tech and growth agency providing web development,
                automation, AI, and marketing services to small and mid-size businesses. You can reach us at{" "}
                <a href="mailto:info@auxilifiers.com" style={{ color: "var(--color-cyan)" }}>info@auxilifiers.com</a>.
              </p>
            </>
          ),
        },
        {
          id: "use-of-site",
          title: "Use of this website",
          body: (
            <>
              <p>
                This website is provided for informational purposes. You may browse, read, and contact us. You may not (a) attempt to
                disrupt the site, (b) scrape or copy substantial portions of content for commercial use without permission, or (c) use
                the site to send unlawful or abusive material.
              </p>
            </>
          ),
        },
        {
          id: "engagements",
          title: "Engaging our services",
          body: (
            <>
              <p>
                Any work we do for you is governed by a separate written proposal or statement of work (&ldquo;SOW&rdquo;) signed by both
                parties. The SOW takes precedence over these general terms where they conflict. Until an SOW is signed, no commitments
                are made on either side.
              </p>
              <p className="mt-3">
                Project work is fixed-scope. Retainers run month-to-month with a 30-day notice period unless the SOW says otherwise.
              </p>
            </>
          ),
        },
        {
          id: "payments",
          title: "Payments",
          body: (
            <>
              <p>
                Project work typically requires a 50% deposit on signing, with the balance due on launch or per the SOW schedule.
                Retainers are billed monthly in advance. Invoices are due within 14 days of issue. Late payments may incur a 2%
                monthly late fee and may pause work in progress.
              </p>
            </>
          ),
        },
        {
          id: "ip-ownership",
          title: "Intellectual property",
          body: (
            <>
              <p>
                Upon full payment, you own everything we deliver under the SOW — code, designs, copy, and configurations — unless that
                deliverable is explicitly built on a third-party platform (e.g. Shopify, n8n) whose own licence applies. We retain the
                right to use general know-how, frameworks, and reusable components across our practice.
              </p>
              <p className="mt-3">
                We may reference your project in our portfolio with your logo and a brief description, unless you ask us in writing
                not to.
              </p>
            </>
          ),
        },
        {
          id: "confidentiality",
          title: "Confidentiality",
          body: (
            <>
              <p>
                Both parties agree to keep confidential information private and use it only to deliver the agreed work. This obligation
                survives the end of the engagement. Standard exceptions apply (e.g. information that becomes public without our fault,
                or is required to be disclosed by law).
              </p>
            </>
          ),
        },
        {
          id: "warranties",
          title: "Warranties & liability",
          body: (
            <>
              <p>
                We promise to perform our services with reasonable skill and care. We do not guarantee specific business outcomes
                (rankings, conversions, sales) because they depend on many factors outside our control.
              </p>
              <p className="mt-3">
                To the maximum extent permitted by law, our total liability under any engagement is limited to the fees you paid us in
                the three months preceding the claim. We are not liable for indirect or consequential losses (lost profits, lost
                opportunity, data loss beyond what reasonable backups would cover).
              </p>
            </>
          ),
        },
        {
          id: "third-party",
          title: "Third-party services",
          body: (
            <>
              <p>
                Our work often relies on third-party platforms (Google, Meta, Vercel, OpenAI, Shopify, etc.). Their availability,
                pricing, and policies are outside our control. If a third party changes its terms or pricing, we will tell you and
                propose an alternative — but we cannot guarantee the third party&apos;s behaviour.
              </p>
            </>
          ),
        },
        {
          id: "termination",
          title: "Termination",
          body: (
            <>
              <p>
                Either party may terminate an engagement for material breach not cured within 14 days of written notice. On
                termination, you pay for all work delivered up to that point, and we hand over deliverables produced so far.
              </p>
            </>
          ),
        },
        {
          id: "changes",
          title: "Changes to these terms",
          body: (
            <>
              <p>
                We may update these terms occasionally. The &ldquo;Last updated&rdquo; date at the top shows when. Continued use of the site
                after a change means you accept the new terms.
              </p>
            </>
          ),
        },
        {
          id: "law",
          title: "Governing law",
          body: (
            <>
              <p>
                These terms are governed by the laws of Pakistan, without regard to conflict-of-law principles. Disputes will be
                resolved in the courts of Lahore unless we agree in writing to arbitration or another forum.
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
                Questions about these terms?{" "}
                <a href="mailto:info@auxilifiers.com" style={{ color: "var(--color-cyan)" }}>info@auxilifiers.com</a>. We reply within
                one business day.
              </p>
            </>
          ),
        },
      ]}
    />
    </>
  );
}
