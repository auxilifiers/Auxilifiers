# Claude Code Memory — Auxilifiers Project

You are building the Auxilifiers website. This file is your persistent memory across sessions.

## What Auxilifiers is

A tech and growth agency. Tagline: "Orbiting Around Your Success." The brand positions itself as the satellite around the client's business — not the spotlight, the support force. Services span building (web/mobile/Shopify), automating (AI workflows/chatbots/voice agents/CRM), and growing (SEO/ads/social/content). Target clients: small and mid-size businesses, not enterprises and not developers. Copy must be plain language.

## The four sub-agents you can invoke

Located in `.claude/agents/`. Use them via the Task tool:

- `section-builder` — implements section UI per `SECTIONS.md`
- `animation-engineer` — adds GSAP motion per `BRAND.md` easings
- `copy-keeper` — checks all text against plain-language voice in `COPY.md`
- `visual-qa` — uses Playwright MCP to screenshot and verify the live dev server

Default workflow per section: section-builder → animation-engineer → copy-keeper → visual-qa. If visual-qa flags issues, loop back to the relevant agent.

## Things you must never do

1. **Never use Inter, Roboto, system fonts, or Space Grotesk anywhere.** The font system is Unbounded + DM Sans + Instrument Serif + JetBrains Mono, locked. Anything else is wrong.
2. **Never use a color that isn't in `BRAND.md`.** No custom hex values. No off-spec gradients.
3. **Never write tech jargon in user-facing copy.** "n8n workflows" is wrong. "Smart automations that save your team time" is right. Verify with copy-keeper before commit.
4. **Never disable animations on mobile.** Reduce intensity (fewer particles, simpler curves) but maintain the same visual language.
5. **Never use `position: fixed` for cursor without the canvas guard.** It breaks on touch devices. Use `@media (pointer: coarse)` to hide custom cursor and restore native.
6. **Never commit without running `pnpm dev` and verifying the section renders without console errors.**
7. **Never skip the visual-qa pass.** Every section ships after Playwright screenshots are reviewed.

## File conventions

- Components live in `components/` organized by section
- Reusable atoms (Button, Tag, Badge) in `components/ui/`
- Animation hooks in `components/animations/`
- Page sections in `components/sections/` (one folder per section)
- Service data in `data/services.ts` (typed, single source)
- Global styles in `app/globals.css`
- Brand tokens as CSS custom properties in `app/globals.css`, exposed via Tailwind config

## Architecture decisions already made

- Single-page site (one route, sections stacked vertically)
- App Router (`app/page.tsx`)
- Server components by default, client components only where interactivity demands
- GSAP loaded as a client component via dynamic import to keep SSR clean
- Custom cursor and aurora background are client components, mounted once at root layout
- Pillar flip cards use CSS 3D transforms + React state, not GSAP
- Marquee uses requestAnimationFrame, not GSAP, for continuous motion
- ScrollTrigger powers all section reveals and the gradient text fill on "Why Us"

## Performance targets (non-negotiable)

- Lighthouse Performance: 95+
- Largest Contentful Paint: under 2.5s
- Interaction to Next Paint: under 200ms
- Cumulative Layout Shift: under 0.1
- Total page weight on initial load: under 500KB (excluding fonts)

If a feature can't meet these, simplify it. Performance beats polish.

## When you're stuck

Read `SECTIONS.md` for layout questions. Read `BRAND.md` for design questions. Read `COPY.md` for text questions. If still unclear, ask the user before guessing. Don't invent specs.

## Reference prototype

The file `auxilifiers-animations-v4.html` (if provided in the project root) is the closest visual target. When in doubt about how something should look or behave, open that file and match it. The production Next.js site is a refactored, performant version of that prototype.
