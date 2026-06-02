// Single source of truth for FAQ content — used by the on-page FAQ section
// (components/sections/FAQs) and the FAQPage JSON-LD schema (app/layout.tsx).
export type FAQ = { q: string; a: string };

export const FAQS: FAQ[] = [
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
