export type Service = {
  id: string;
  pillar: "build" | "automate" | "grow";
  title: string;
  pitch: string;
  outcomes: string[];
};

export const services: Service[] = [
  // Build
  {
    id: "web-dev",
    pillar: "build",
    title: "Custom Websites",
    pitch:
      "Beautiful, fast websites built from scratch for your business — designed to actually convert visitors into customers, not just look pretty.",
    outcomes: [
      "A website that loads in under 2 seconds",
      "Mobile-friendly out of the box",
      "Easy to update yourself, no calls to us",
      "Built to rank on Google from day one",
    ],
  },
  {
    id: "mobile-apps",
    pillar: "build",
    title: "Mobile Apps",
    pitch:
      "iPhone and Android apps that look great and work smoothly. Your brand, in your customers' pockets.",
    outcomes: [
      "One app that works on both iPhone and Android",
      "Your branding throughout, not a template",
      "App Store and Play Store submission handled",
      "Ongoing updates and bug fixes",
    ],
  },
  {
    id: "shopify",
    pillar: "build",
    title: "Online Stores",
    pitch:
      "Stores built on Shopify that actually sell — designed for your products and your customers, not a generic template.",
    outcomes: [
      "A store that matches your brand exactly",
      "Built to maximize sales, not just visits",
      "All payment systems set up and tested",
      "Monthly improvements as your business grows",
    ],
  },
  {
    id: "integrations",
    pillar: "build",
    title: "Connecting Your Tools",
    pitch:
      "If you use 5 different tools to run your business, we make them all work together — so your team stops copying data between them.",
    outcomes: [
      "All your tools talking to each other",
      "No more manual data entry",
      "Hours saved every single week",
      "One source of truth, no conflicts",
    ],
  },
  // Automate
  {
    id: "ai-workflows",
    pillar: "automate",
    title: "Smart Automations",
    pitch:
      "We take the boring, repetitive work that drains your team's day and build automations that handle it — 24/7, no breaks needed.",
    outcomes: [
      "Your team stops doing repetitive tasks",
      "Work gets done in minutes, not hours",
      "Far fewer human errors",
      "20-40 hours saved per week",
    ],
  },
  {
    id: "chatbots",
    pillar: "automate",
    title: "Smart Chatbots",
    pitch:
      "An AI assistant on your website that answers questions, captures leads, and even closes sales — while you sleep.",
    outcomes: [
      "24/7 customer support, no team needed",
      "More leads captured, even at 3am",
      "Common questions answered instantly",
      "Fewer support tickets reaching your team",
    ],
  },
  {
    id: "voice-agents",
    pillar: "automate",
    title: "AI Calling Agents",
    pitch:
      "AI that picks up your phone, handles inquiries, books appointments, and follows up with leads — like your best receptionist, but never sleeps.",
    outcomes: [
      "Every single call answered, day or night",
      "Appointments booked automatically",
      "Leads captured 24/7",
      "Your team freed up for real work",
    ],
  },
  {
    id: "voice-on-site",
    pillar: "automate",
    title: "Voice Assistant on Your Site",
    pitch:
      "Your customers can literally TALK to your website — asking questions and getting instant answers, hands-free.",
    outcomes: [
      "A customer experience your competitors don't have",
      "Better accessibility for everyone",
      "Instant answers, no typing needed",
      "Your brand feels future-forward",
    ],
  },
  {
    id: "crm-sync",
    pillar: "automate",
    title: "Customer Data, Synced Everywhere",
    pitch:
      "Whether you use HubSpot, Salesforce, Pipedrive — or all three — we make them talk to each other so your team never copy-pastes data again.",
    outcomes: [
      "One single source of truth",
      "No more conflicting customer info",
      "Team focuses on selling, not data entry",
      "Cleaner, simpler reporting",
    ],
  },
  {
    id: "inbox-triage",
    pillar: "automate",
    title: "AI Email Assistant",
    pitch:
      "AI that reads your team's emails, sorts them by what's important, drafts replies, and routes them to the right person — automatically.",
    outcomes: [
      "Inbox finally under control",
      "Faster reply times to customers",
      "Nothing important slips through",
      "Hours saved on email every day",
    ],
  },
  // Grow
  {
    id: "seo",
    pillar: "grow",
    title: "SEO (Google Rankings)",
    pitch:
      "We make sure when customers search for what you offer, your business shows up first — not your competitors.",
    outcomes: [
      "Higher rankings on Google over time",
      "More free traffic to your website",
      "More leads without paying for ads",
      "Long-term brand authority that compounds",
    ],
  },
  {
    id: "google-ads",
    pillar: "grow",
    title: "Google Ads",
    pitch:
      "Google Ads campaigns built to bring you customers — not just clicks. We track what works and double down on it.",
    outcomes: [
      "Ads shown to people actively searching",
      "Lower cost per lead over time",
      "Clear reporting on what's working",
      "Real ROI, not vanity metrics",
    ],
  },
  {
    id: "meta-ads",
    pillar: "grow",
    title: "Facebook & Instagram Ads",
    pitch:
      "Ads on Facebook and Instagram that grab attention and drive real sales — with fresh creative tested every week.",
    outcomes: [
      "More leads from social platforms",
      "New ad creative every single week",
      "Audience that keeps growing",
      "Full transparency on what you spend",
    ],
  },
  {
    id: "social",
    pillar: "grow",
    title: "Social Media, Handled",
    pitch:
      "We run your Instagram, TikTok, LinkedIn, and Facebook — content, posting, replying to comments, all of it.",
    outcomes: [
      "Consistent presence on all platforms",
      "Daily posts without you lifting a finger",
      "Replies to comments and DMs handled",
      "Followers that keep growing",
    ],
  },
  {
    id: "content",
    pillar: "grow",
    title: "Content That Works",
    pitch:
      "We plan and create the content that builds your brand — blogs, videos, social posts — all aligned to your business goals.",
    outcomes: [
      "A clear content plan, not random posting",
      "Regular publishing on a real schedule",
      "Content that actually brings leads in",
      "One idea, used 5 ways (blog → social → email)",
    ],
  },
];

export function getServicesByPillar(pillar: Service["pillar"]) {
  return services.filter((s) => s.pillar === pillar);
}

export function getServiceById(id: string) {
  return services.find((s) => s.id === id);
}
