# Auxilifiers

**Orbiting Around Your Success.**

A tech and growth agency website built with Next.js 15, featuring editorial typography, GSAP animations, 3D flip cards, and a custom cursor system.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 + CSS custom properties
- **Animation**: GSAP 3 + ScrollTrigger
- **Fonts**: Unbounded, DM Sans, Instrument Serif, JetBrains Mono
- **Deployment**: Vercel

## Features

- Aurora background with animated blurred blobs
- Custom cursor (dot + lagging ring) with hover detection
- Hero with editorial typography, scramble text effect, and orbital i-dot
- Services marquee with scroll-direction reactivity
- 3D flip cards with service details and tag-based navigation
- Gradient text fill driven by scroll position (Why Us section)
- Contact modal with animated entrance
- Inline contact form with API route
- Fully responsive (375px to 1440px+)
- `prefers-reduced-motion` support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form Setup

The contact form works in development without configuration (logs to console). For production email delivery:

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Copy `.env.local.example` to `.env.local`
3. Add your Resend API key

## Project Structure

```
app/
  layout.tsx          # Root layout with fonts, aurora, cursor, header, footer
  page.tsx            # Home page composing all sections
  globals.css         # Design tokens, keyframes, scrollbar styles
  api/contact/        # Contact form API route
components/
  global/             # Header, Footer, Aurora, CustomCursor, ContactModal
  sections/
    Hero/             # Hero with OrbitDot, Drifter, scramble animation
    ServicesMarquee/  # Heading + continuous marquee strip
    Declaration/      # Brand philosophy statement
    Pillars/          # Bento grid with 3D flip cards + SVG viz
    WhyUs/            # Sticky scroll gradient text reveal
    FooterCta/        # Editorial CTA with inline contact form
data/
  services.ts         # 15 typed service entries across Build/Automate/Grow
```

## Design System

- **Palette**: Electric — cyan `#00F5FF`, blue `#0066FF`, ice `#7DD3FC` on black `#000000`
- **Typography**: Unbounded (display), DM Sans (body), Instrument Serif (italic accent), JetBrains Mono (labels)
- **Border radius**: 8px / 14px / 18px / 24px / pill (100px)
- **Animation**: power3.out (default), back.out(1.4) (pop), elastic.out (bounce)

## License

Private. All rights reserved.
