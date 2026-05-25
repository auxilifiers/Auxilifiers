export type PillarId = "build" | "automate" | "grow";

export type Service = {
  id: string;
  pillar: PillarId;
  title: string;
  pitch: string;
  summary: string;
  outcomes: string[];
  image: string;
};

export type Pillar = {
  id: PillarId;
  label: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
};

export const pillars: Pillar[] = [
  {
    id: "build",
    label: "PILLAR/01",
    title: "Build",
    tagline: "Products people touch.",
    description:
      "The websites, apps, stores, and integrations your customers actually use. Designed to convert, engineered to last.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    href: "/build",
  },
  {
    id: "automate",
    label: "PILLAR/02",
    title: "Automate",
    tagline: "The unfair advantage.",
    description:
      "The repetitive operations that drain your team, turned into systems that run themselves — 24/7, no breaks.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    href: "/automate",
  },
  {
    id: "grow",
    label: "PILLAR/03",
    title: "Grow",
    tagline: "Reach that compounds.",
    description:
      "The audiences and revenue that grow month over month. Engineered through SEO, ads, social, and content.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    href: "/grow",
  },
];

export const services: Service[] = [
  // Build
  {
    id: "web-dev",
    pillar: "build",
    title: "Custom Websites",
    summary: "Fast, conversion-focused websites built from scratch.",
    pitch:
      "Beautiful, fast websites built from scratch for your business — designed to actually convert visitors into customers, not just look pretty.",
    outcomes: [
      "A website that loads in under 2 seconds",
      "Mobile-friendly out of the box",
      "Easy to update yourself, no calls to us",
      "Built to rank on Google from day one",
    ],
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mobile-apps",
    pillar: "build",
    title: "Mobile Apps",
    summary: "iPhone & Android apps with your branding, ready to ship.",
    pitch:
      "iPhone and Android apps that look great and work smoothly. Your brand, in your customers' pockets.",
    outcomes: [
      "One app that works on both iPhone and Android",
      "Your branding throughout, not a template",
      "App Store and Play Store submission handled",
      "Ongoing updates and bug fixes",
    ],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "shopify",
    pillar: "build",
    title: "Online Stores",
    summary: "Shopify stores tuned to maximise sales, not just visits.",
    pitch:
      "Stores built on Shopify that actually sell — designed for your products and your customers, not a generic template.",
    outcomes: [
      "A store that matches your brand exactly",
      "Built to maximize sales, not just visits",
      "All payment systems set up and tested",
      "Monthly improvements as your business grows",
    ],
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "integrations",
    pillar: "build",
    title: "Connecting Your Tools",
    summary: "Make your 5+ tools talk to each other — no more copy-paste.",
    pitch:
      "If you use 5 different tools to run your business, we make them all work together — so your team stops copying data between them.",
    outcomes: [
      "All your tools talking to each other",
      "No more manual data entry",
      "Hours saved every single week",
      "One source of truth, no conflicts",
    ],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  },
  // Automate
  {
    id: "ai-workflows",
    pillar: "automate",
    title: "Smart Automations",
    summary: "Automations that handle the boring work — 24/7.",
    pitch:
      "We take the boring, repetitive work that drains your team's day and build automations that handle it — 24/7, no breaks needed.",
    outcomes: [
      "Your team stops doing repetitive tasks",
      "Work gets done in minutes, not hours",
      "Far fewer human errors",
      "20-40 hours saved per week",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "chatbots",
    pillar: "automate",
    title: "Smart Chatbots",
    summary: "AI assistants that answer, capture leads, and even sell.",
    pitch:
      "An AI assistant on your website that answers questions, captures leads, and even closes sales — while you sleep.",
    outcomes: [
      "24/7 customer support, no team needed",
      "More leads captured, even at 3am",
      "Common questions answered instantly",
      "Fewer support tickets reaching your team",
    ],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "voice-agents",
    pillar: "automate",
    title: "AI Calling Agents",
    summary: "AI receptionists that never sleep — answer, book, follow up.",
    pitch:
      "AI that picks up your phone, handles inquiries, books appointments, and follows up with leads — like your best receptionist, but never sleeps.",
    outcomes: [
      "Every single call answered, day or night",
      "Appointments booked automatically",
      "Leads captured 24/7",
      "Your team freed up for real work",
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "voice-on-site",
    pillar: "automate",
    title: "Voice Assistant on Your Site",
    summary: "Customers literally talk to your website. Hands-free.",
    pitch:
      "Your customers can literally TALK to your website — asking questions and getting instant answers, hands-free.",
    outcomes: [
      "A customer experience your competitors don't have",
      "Better accessibility for everyone",
      "Instant answers, no typing needed",
      "Your brand feels future-forward",
    ],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "crm-sync",
    pillar: "automate",
    title: "Customer Data, Synced Everywhere",
    summary: "HubSpot, Salesforce, Pipedrive — all talking to each other.",
    pitch:
      "Whether you use HubSpot, Salesforce, Pipedrive — or all three — we make them talk to each other so your team never copy-pastes data again.",
    outcomes: [
      "One single source of truth",
      "No more conflicting customer info",
      "Team focuses on selling, not data entry",
      "Cleaner, simpler reporting",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "inbox-triage",
    pillar: "automate",
    title: "AI Email Assistant",
    summary: "AI that reads, sorts, drafts, and routes your team's email.",
    pitch:
      "AI that reads your team's emails, sorts them by what's important, drafts replies, and routes them to the right person — automatically.",
    outcomes: [
      "Inbox finally under control",
      "Faster reply times to customers",
      "Nothing important slips through",
      "Hours saved on email every day",
    ],
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
  },
  // Grow
  {
    id: "seo",
    pillar: "grow",
    title: "SEO (Google Rankings)",
    summary: "Rank first on Google when customers search what you offer.",
    pitch:
      "We make sure when customers search for what you offer, your business shows up first — not your competitors.",
    outcomes: [
      "Higher rankings on Google over time",
      "More free traffic to your website",
      "More leads without paying for ads",
      "Long-term brand authority that compounds",
    ],
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "google-ads",
    pillar: "grow",
    title: "Google Ads",
    summary: "Campaigns that bring customers — not just clicks.",
    pitch:
      "Google Ads campaigns built to bring you customers — not just clicks. We track what works and double down on it.",
    outcomes: [
      "Ads shown to people actively searching",
      "Lower cost per lead over time",
      "Clear reporting on what's working",
      "Real ROI, not vanity metrics",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "meta-ads",
    pillar: "grow",
    title: "Facebook & Instagram Ads",
    summary: "Scroll-stopping ads with fresh creative weekly.",
    pitch:
      "Ads on Facebook and Instagram that grab attention and drive real sales — with fresh creative tested every week.",
    outcomes: [
      "More leads from social platforms",
      "New ad creative every single week",
      "Audience that keeps growing",
      "Full transparency on what you spend",
    ],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "social",
    pillar: "grow",
    title: "Social Media, Handled",
    summary: "Instagram, TikTok, LinkedIn, Facebook — all run for you.",
    pitch:
      "We run your Instagram, TikTok, LinkedIn, and Facebook — content, posting, replying to comments, all of it.",
    outcomes: [
      "Consistent presence on all platforms",
      "Daily posts without you lifting a finger",
      "Replies to comments and DMs handled",
      "Followers that keep growing",
    ],
    image:
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "content",
    pillar: "grow",
    title: "Content That Works",
    summary: "Content plans aligned to your business goals — not random posts.",
    pitch:
      "We plan and create the content that builds your brand — blogs, videos, social posts — all aligned to your business goals.",
    outcomes: [
      "A clear content plan, not random posting",
      "Regular publishing on a real schedule",
      "Content that actually brings leads in",
      "One idea, used 5 ways (blog → social → email)",
    ],
    image:
      "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "video-editing",
    pillar: "grow",
    title: "Video Editing",
    summary: "Scroll-stopping reels, ads, and YouTube edits — turnaround in days.",
    pitch:
      "We turn your raw footage into edits that actually get watched — short-form reels, YouTube videos, product demos, and ad creative tuned for each platform.",
    outcomes: [
      "Short-form reels & TikToks edited weekly",
      "YouTube videos with chapters, thumbnails, captions",
      "Ad creatives tested and iterated",
      "Subtitles, motion graphics, and sound mixing included",
    ],
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "graphic-design",
    pillar: "grow",
    title: "Graphic Design",
    summary: "On-brand visuals for ads, social, decks, and product — done weekly.",
    pitch:
      "From logos and brand systems to weekly social graphics, ad creative, and pitch decks — we keep your brand looking sharp across every surface.",
    outcomes: [
      "Brand identity & logo suite if you need one",
      "Weekly social and ad creative on schedule",
      "Pitch decks, one-pagers, and proposals",
      "Reusable templates your team can edit later",
    ],
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getServicesByPillar(pillar: PillarId) {
  return services.filter((s) => s.pillar === pillar);
}

export function getServiceById(id: string) {
  return services.find((s) => s.id === id);
}

export function getPillar(id: PillarId) {
  return pillars.find((p) => p.id === id);
}

// ===== Service detail metadata (per-pillar defaults) =====

export type ProcessStep = { step: string; title: string; description: string };
export type FAQ = { q: string; a: string };

export type PillarDetail = {
  timeline: string;
  whoFor: string[];
  tools: string[];
  process: ProcessStep[];
  faqs: FAQ[];
};

export const pillarDetails: Record<PillarId, PillarDetail> = {
  build: {
    timeline: "4–10 weeks typical",
    whoFor: [
      "Founders launching a new product, store, or brand",
      "Established businesses ready to replace a tired or slow website",
      "Teams that need an app or store designed to actually convert, not just exist",
    ],
    tools: ["Next.js", "React", "Shopify", "WooCommerce", "Flutter", "React Native", "Webflow", "Figma", "Vercel"],
    process: [
      { step: "01", title: "Discover", description: "We learn your business, customers, goals, and constraints — then map the shortest path between you and outcomes." },
      { step: "02", title: "Design", description: "We design what your customers will actually see and touch. Wireframes first, then polished screens you can review and steer." },
      { step: "03", title: "Build", description: "We build it cleanly, mobile-first, and fast. You see progress every week, not just at the end." },
      { step: "04", title: "Launch & support", description: "We launch, monitor, and stay on call. Bugs get fixed fast; small improvements ship monthly." },
    ],
    faqs: [
      { q: "Will I own the code and content?", a: "Yes — fully. You own the repository, the design files, and every asset. We don't lock you in." },
      { q: "Can you redesign an existing site instead of starting fresh?", a: "Often, yes. We audit what's already there, keep what works, and rebuild the parts that don't." },
      { q: "Do you handle hosting and domains?", a: "We handle the setup and point you to the most cost-effective hosting for your traffic. You stay in control of accounts." },
      { q: "What if I want changes after launch?", a: "Small changes are included in the first 30 days. After that we offer ongoing care plans or fixed-scope updates — your choice." },
    ],
  },
  automate: {
    timeline: "2–6 weeks typical",
    whoFor: [
      "Teams drowning in repetitive manual work (copy-paste, sorting, replying)",
      "Businesses receiving more leads, calls, or messages than humans can handle",
      "Operations leaders ready to scale without doubling headcount",
    ],
    tools: ["n8n", "Make", "Zapier", "OpenAI", "Anthropic Claude", "Vapi", "ElevenLabs", "Twilio", "HubSpot", "Pipedrive"],
    process: [
      { step: "01", title: "Map the workflow", description: "We sit with your team, document the current manual process step-by-step, and find the points where automation actually saves hours." },
      { step: "02", title: "Design the automation", description: "We design the new flow, picking the right AI model, integrations, and fallbacks for when things go off-script." },
      { step: "03", title: "Build & test", description: "We build it in a sandbox, run real cases through it, and tune until it behaves like your best team member." },
      { step: "04", title: "Deploy & monitor", description: "We go live behind your existing tools so nothing breaks. Dashboards show what's running, and we tune as you grow." },
    ],
    faqs: [
      { q: "Will AI replace my team?", a: "No — it removes the boring repetitive work so your team can focus on customers, strategy, and growth. Most clients hire more after automating." },
      { q: "What happens when the AI gets it wrong?", a: "Every automation has guardrails and human-in-the-loop checkpoints for sensitive cases. Edge cases route to a real person." },
      { q: "Do you use my data to train models?", a: "Never. Your data stays in your systems. We only use it to power your own automations, never to train shared models." },
      { q: "How is this different from buying a chatbot tool myself?", a: "Tools are generic. We build automations tuned to your business, your tone, your data — and connect them to the systems you actually use." },
    ],
  },
  grow: {
    timeline: "Ongoing engagement (3-month minimum)",
    whoFor: [
      "Businesses tired of paying for traffic that doesn't convert",
      "Brands ready to compound reach instead of renting it month-to-month",
      "Founders who want clear, no-nonsense growth reporting (not vanity metrics)",
    ],
    tools: ["Google Search Console", "Google Ads", "Meta Ads Manager", "GA4", "Ahrefs", "SEMrush", "Klaviyo", "Buffer", "Adobe Premiere", "After Effects", "Photoshop", "Illustrator", "Figma", "Canva"],
    process: [
      { step: "01", title: "Audit & strategy", description: "We audit your current presence, study your market, and write a 90-day plan with clear KPIs you can hold us to." },
      { step: "02", title: "Production", description: "We produce — content, creative, ad sets, posts. Quality over volume, but always on schedule." },
      { step: "03", title: "Launch & optimise", description: "We launch campaigns, monitor daily, and double down on what's working. Weekly tuning, monthly reviews." },
      { step: "04", title: "Compound", description: "Every month we layer on what's working. Costs go down, results go up. We share the numbers in plain language." },
    ],
    faqs: [
      { q: "How long before I see results?", a: "Paid ads: leads in the first 2 weeks. SEO: meaningful movement in 60–90 days. Content & social compound steadily over 3–6 months." },
      { q: "Do you guarantee rankings or ROI?", a: "No serious agency does — anyone who guarantees Google rankings is selling you a fairy tale. What we guarantee is transparent reporting and continuous improvement." },
      { q: "Will you work with my existing ad accounts?", a: "Yes. We always work inside your accounts so you keep ownership and history. We never lock you to ours." },
      { q: "What's the minimum ad spend?", a: "We don't take a percentage cut of ad spend. Even modest budgets can work — we'll tell you honestly if your goal isn't realistic for what you can invest." },
    ],
  },
};

