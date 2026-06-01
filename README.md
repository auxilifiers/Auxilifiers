# Auxilifiers

**Orbiting Around Your Success.**

A tech and growth agency website built with Next.js (App Router), featuring editorial typography, GSAP animations, 3D flip cards, a custom cursor system, a database-backed blog, and a full admin control panel.

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript, React 19)
- **Styling**: Tailwind CSS v4 + CSS custom properties (light & dark themes)
- **Animation**: GSAP 3 + ScrollTrigger
- **Backend / DB**: Supabase (Postgres, Auth, Storage)
- **Email**: Resend (contact-form delivery)
- **Editor**: TipTap rich-text (admin only)
- **Fonts**: Unbounded, DM Sans, Instrument Serif, JetBrains Mono
- **Hosting**: Hostinger (Node.js app via `server.js`)

## Features

- Aurora background, custom cursor, hero scramble text, services marquee, 3D flip cards, scroll-driven gradient text
- Contact form → email (Resend) **and** saved to Supabase (Leads)
- User-submitted testimonials (Supabase) with duplicate prevention
- **Blog**: database-backed, each post its own SEO page (`/blog/[slug]`), banner image, auto sitemap + Article schema
- **Admin control panel** (`/admin`): Blog editor (with image upload), SEO & site settings, testimonials moderation, leads inbox
- SEO infra: dynamic metadata, OG image, JSON-LD, sitemap, robots, manifest
- Fully responsive (375px → 1440px+), light & dark themes, `prefers-reduced-motion`

## Getting Started

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Set these in `.env.local` (local) and in the Hostinger dashboard (production):

| Key | Purpose |
|-----|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public-safe) |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (e.g. `https://auxilifiers.com`) |
| `RESEND_API_KEY` | Resend API key (contact email) |
| `CONTACT_FROM_EMAIL` | Sender, e.g. `Auxilifiers <noreply@auxilifiers.com>` (verified domain) |
| `CONTACT_TO_EMAIL` | Where enquiries are received (e.g. `info@auxilifiers.com`) |

> Never commit `.env.local`. The `service_role` key is **never** used in the app or repo.

## Supabase Setup (run once, in SQL Editor)

Run these files in order from the `supabase/` folder:

1. `blog_setup.sql` — `blog_posts` table + policies
2. `admin_setup.sql` — `site_settings`, testimonials `hidden`, leads policies, `blog-images` storage policies
3. `security_hardening.sql` — **required** — locks all admin actions to an explicit admin allow-list

Then create your admin user: **Authentication → Users → Add user** (auto-confirm).
Add that user's ID to the `admins` table (see `security_hardening.sql`).

## 🔒 Security Checklist (before going live)

- [ ] Run `security_hardening.sql` (admin allow-list — without it, any logged-in user has admin rights)
- [ ] **Disable public sign-ups**: Authentication → Sign In / Providers → Email → turn **off** "Allow new users to sign up"
- [ ] Rotate any keys that were ever shared in plain text (Resend, GitHub, Supabase `service_role`)
- [ ] Confirm `info@…` mailbox exists and Resend domain is verified
- [ ] `/admin` is `noindex` + blocked in `robots.txt` ✅ (already configured)

## Admin Usage

1. Go to `/admin` → sign in with your admin email/password.
2. **Blog** → New post → write (see in-editor "How to format" note), upload a banner, Publish.
3. **SEO & Site Settings** → edit meta title/description/keywords, social links, GA ID, contact email.
4. **Testimonials** → hide/show/delete (reflects on the site after refresh).
5. **Leads** → view & reply to contact-form enquiries.

## Project Structure

```
app/
  layout.tsx              # Root layout (dynamic metadata + JSON-LD from settings, GA)
  page.tsx                # Home
  blog/                   # Public blog list + [slug] post pages
  admin/                  # Control panel: blog, seo, testimonials, leads (auth-gated)
  api/contact/            # Contact form (email + Supabase)
  api/testimonials/       # Testimonials read/submit (dedupe)
  sitemap.ts robots.ts manifest.ts opengraph-image.tsx
components/
  global/                 # Header, Footer, Aurora, CustomCursor, ContactModal
  sections/               # Hero, ServicesMarquee, Pillars, WhyUs, Testimonials, FooterCta
  admin/                  # AdminGate, BlogEditor (TipTap — admin bundle only)
lib/
  supabase.ts             # Supabase client (anon)
  settings.ts             # getSiteSettings() (server, cached) + defaults
  settings-defaults.ts    # client-safe defaults/types
data/services.ts          # Service entries
supabase/                 # SQL setup files (blog, admin, security)
```

## Design System

- **Palette**: Electric — cyan `#00F5FF`, blue `#0066FF`, ice `#7DD3FC`; theme-aware light/dark tokens
- **Typography**: Unbounded (display), DM Sans (body), Instrument Serif (italic accent), JetBrains Mono (labels)
- **Radius**: 8 / 14 / 18 / 24 / pill (100px)

## License

Private. All rights reserved.
