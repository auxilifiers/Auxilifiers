# Copy — Auxilifiers

All user-facing text. Voice: plain language, outcome-focused, no tech jargon. Assume the reader runs a business, not a startup.

## Brand voice rules

1. Plain language. Default to words a 14-year-old understands.
2. Outcomes, not features. "We save you 30 hours a week" beats "n8n workflow orchestration."
3. Italic Instrument Serif used sparingly. Only for emotional emphasis: *your success*, *unfair* advantage, *actually*, *no pitch*. One italic moment per sentence maximum.
4. Strikethrough used for rhetorical contrast (rejecting an idea before stating yours). Only in declaration and why-us sections.
5. Numbers preferred over adjectives. "12 brands" beats "many clients."

## Hero

**Eyebrow**: NOW ORBITING

**Counter**: 12 BRANDS · 4 CONTINENTS · 1 MISSION

**Headline**:
```
Orbiting
  around
your success.
```

**Sub paragraph**:
> We *build* the tech, *automate* the operations, and *grow* the reach — for businesses ready to scale beyond what their team alone can carry.

**Primary CTA**: See how we orbit →

**Ghost CTA**: Talk to our AI agent

**Hero stats**:
- 12 — Live projects in orbit
- 38 — Avg hrs/week saved per client
- 73% — Of pitches we win on outcomes

## Services Marquee

**Label**: Services

**Items** (alternating regular/italic):
Web Development · *Mobile Apps* · Shopify Stores · *AI Workflows* · Chatbots · *Calling Agents* · Voice-on-Site · *SEO* · Google Ads · *Meta Ads* · Social Handling · *Content Strategy* · Integrations · *CRM Sync*

## Declaration

**Eyebrow**: A philosophy, briefly

**Body**:
```
We don't
take the spotlight.
We orbit your business
— amplifying what's already yours.
```

## Pillars section

**Eyebrow**: How we orbit · three pillars

**Headline**: Three orbits. *One* mission.

(The "i" in "orbits" gets the mini-orbit dot treatment.)

## Pillar cards (FRONT face)

### Build (Pillar 01)
**Title**: Build
**Description**: The products, platforms, and stores your customers actually touch. *Tap a tag* for details.
**Service tags**: Web Dev · Mobile Apps · Shopify · Integrations
**Counter**: 14

### Featured — Automate (Pillar 02)
**Title**: The *unfair* advantage.
**Description**: The operations that drain your team — turned into systems that run themselves. Workflows, chatbots, voice agents, AI integrations. We're an *n8n + Claude + Vapi* shop. That stack is most of why our clients call us in the first place. *Tap a tag* for details.
**Service tags**: AI Workflows · Chatbots · Voice Agents · Voice-on-Site · CRM Sync · Inbox Triage
**Counter**: 42

### Grow (Pillar 03)
**Title**: Grow
**Description**: The audiences and revenue that compound — engineered, not gambled. *Tap a tag* for details.
**Service tags**: SEO · Google Ads · Meta Ads · Social · Content
**Counter**: 28

---

# Service Cards — Plain Language for Non-Tech Clients

Each service in this format:

```typescript
{
  id: string;           // matches data-service attribute
  pillar: 'build' | 'automate' | 'grow';
  title: string;        // Plain English title
  pitch: string;        // One-sentence what-is-this
  outcomes: string[];   // 4 benefit-focused bullets
  icon: string;         // Suggested icon for back face
}
```

Use these exact entries in `data/services.ts`.

---

## Pillar: Build (4 services)

### 1. web-dev
**Title**: Custom Websites
**Pitch**: Beautiful, fast websites built from scratch for your business — designed to actually convert visitors into customers, not just look pretty.
**What you get**:
- A website that loads in under 2 seconds
- Mobile-friendly out of the box
- Easy to update yourself, no calls to us
- Built to rank on Google from day one

**Icon concept**: Browser window outline with a small play indicator

---

### 2. mobile-apps
**Title**: Mobile Apps
**Pitch**: iPhone and Android apps that look great and work smoothly. Your brand, in your customers' pockets.
**What you get**:
- One app that works on both iPhone and Android
- Your branding throughout, not a template
- App Store and Play Store submission handled
- Ongoing updates and bug fixes

**Icon concept**: Phone outline with a dot indicator

---

### 3. shopify
**Title**: Online Stores
**Pitch**: Stores built on Shopify that actually sell — designed for your products and your customers, not a generic template.
**What you get**:
- A store that matches your brand exactly
- Built to maximize sales, not just visits
- All payment systems set up and tested
- Monthly improvements as your business grows

**Icon concept**: Shopping bag with a small dot

---

### 4. integrations
**Title**: Connecting Your Tools
**Pitch**: If you use 5 different tools to run your business, we make them all work together — so your team stops copying data between them.
**What you get**:
- All your tools talking to each other
- No more manual data entry
- Hours saved every single week
- One source of truth, no conflicts

**Icon concept**: Two interlocking rings

---

## Pillar: Automate (6 services)

### 5. ai-workflows
**Title**: Smart Automations
**Pitch**: We take the boring, repetitive work that drains your team's day and build automations that handle it — 24/7, no breaks needed.
**What you get**:
- Your team stops doing repetitive tasks
- Work gets done in minutes, not hours
- Far fewer human errors
- 20-40 hours saved per week

**Icon concept**: Gears in motion

---

### 6. chatbots
**Title**: Smart Chatbots
**Pitch**: An AI assistant on your website that answers questions, captures leads, and even closes sales — while you sleep.
**What you get**:
- 24/7 customer support, no team needed
- More leads captured, even at 3am
- Common questions answered instantly
- Fewer support tickets reaching your team

**Icon concept**: Chat bubble with a small dot inside

---

### 7. voice-agents
**Title**: AI Calling Agents
**Pitch**: AI that picks up your phone, handles inquiries, books appointments, and follows up with leads — like your best receptionist, but never sleeps.
**What you get**:
- Every single call answered, day or night
- Appointments booked automatically
- Leads captured 24/7
- Your team freed up for real work

**Icon concept**: Headset outline

---

### 8. voice-on-site
**Title**: Voice Assistant on Your Site
**Pitch**: Your customers can literally TALK to your website — asking questions and getting instant answers, hands-free.
**What you get**:
- A customer experience your competitors don't have
- Better accessibility for everyone
- Instant answers, no typing needed
- Your brand feels future-forward

**Icon concept**: Microphone with sound waves

---

### 9. crm-sync
**Title**: Customer Data, Synced Everywhere
**Pitch**: Whether you use HubSpot, Salesforce, Pipedrive — or all three — we make them talk to each other so your team never copy-pastes data again.
**What you get**:
- One single source of truth
- No more conflicting customer info
- Team focuses on selling, not data entry
- Cleaner, simpler reporting

**Icon concept**: Two arrows in a circle (sync)

---

### 10. inbox-triage
**Title**: AI Email Assistant
**Pitch**: AI that reads your team's emails, sorts them by what's important, drafts replies, and routes them to the right person — automatically.
**What you get**:
- Inbox finally under control
- Faster reply times to customers
- Nothing important slips through
- Hours saved on email every day

**Icon concept**: Envelope with a small star

---

## Pillar: Grow (5 services)

### 11. seo
**Title**: SEO (Google Rankings)
**Pitch**: We make sure when customers search for what you offer, your business shows up first — not your competitors.
**What you get**:
- Higher rankings on Google over time
- More free traffic to your website
- More leads without paying for ads
- Long-term brand authority that compounds

**Icon concept**: Magnifying glass with upward arrow

---

### 12. google-ads
**Title**: Google Ads
**Pitch**: Google Ads campaigns built to bring you customers — not just clicks. We track what works and double down on it.
**What you get**:
- Ads shown to people actively searching
- Lower cost per lead over time
- Clear reporting on what's working
- Real ROI, not vanity metrics

**Icon concept**: Target with a small dot

---

### 13. meta-ads
**Title**: Facebook & Instagram Ads
**Pitch**: Ads on Facebook and Instagram that grab attention and drive real sales — with fresh creative tested every week.
**What you get**:
- More leads from social platforms
- New ad creative every single week
- Audience that keeps growing
- Full transparency on what you spend

**Icon concept**: Heart with sparkle

---

### 14. social
**Title**: Social Media, Handled
**Pitch**: We run your Instagram, TikTok, LinkedIn, and Facebook — content, posting, replying to comments, all of it.
**What you get**:
- Consistent presence on all platforms
- Daily posts without you lifting a finger
- Replies to comments and DMs handled
- Followers that keep growing

**Icon concept**: Hashtag

---

### 15. content
**Title**: Content That Works
**Pitch**: We plan and create the content that builds your brand — blogs, videos, social posts — all aligned to your business goals.
**What you get**:
- A clear content plan, not random posting
- Regular publishing on a real schedule
- Content that actually brings leads in
- One idea, used 5 ways (blog → social → email)

**Icon concept**: Pencil with a small dot

---

## Why Us section

**Eyebrow**: Why us, briefly

**Body**:
```
While agencies
bill hours,
we ship outcomes.
```

(Line 1 white, line 2 italic strikethrough dim, line 3 italic with gradient text fill on scroll)

## Footer CTA

**Eyebrow**: One last thing

**Headline**: Ready to *start* (actually) orbiting?

**Sub**: A *20-minute call*. We diagnose your three biggest tech bottlenecks. *No pitch.*

**Primary**: Book the call →
**Ghost**: Talk to our AI first

## Footer

**Tagline under logo**: Orbiting around your success.

**Services links**:
- Build: Web Dev, Mobile Apps, Shopify, Integrations
- Automate: AI Workflows, Chatbots, Voice Agents, Voice-on-Site, CRM Sync, Email Assistant
- Grow: SEO, Google Ads, Meta Ads, Social, Content

**Company links**: About, Process, Case Studies, Contact, Careers

**Newsletter heading**: Stay in orbit.
**Newsletter sub**: Monthly. Tactical. No fluff.
**Submit button**: Subscribe →

**Bottom row**:
- Left: © 2026 Auxilifiers
- Right: Privacy · Terms

---

# Voice DO/DON'T quick reference

| Don't write | Do write |
|---|---|
| "n8n workflow automation" | "Automations that run themselves" |
| "RAG over your knowledge base" | "Smart answers from your own content" |
| "API integrations" | "Tools that talk to each other" |
| "Lighthouse 95+" | "Loads in under 2 seconds" |
| "Conversion rate optimization" | "More visitors becoming customers" |
| "Customer Relationship Management" | "Your customer data" |
| "Best-in-class" | (just drop it; show, don't tell) |
| "Leveraging AI" | "Using AI to" |
| "Holistic solutions" | (replace with specific outcome) |
