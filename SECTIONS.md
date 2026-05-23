# Section Specifications — Auxilifiers

Every section the site needs, in order, with full implementation specs. Each section is a folder under `components/sections/`. Build them one at a time, in this order.

---

## 1. Global Layout & Foundation

Files: `app/layout.tsx`, `app/globals.css`, `components/global/Aurora.tsx`, `components/global/CustomCursor.tsx`

### Layout structure (`app/layout.tsx`)

```
<html>
<body>
  <Aurora />              {/* fixed, z-0 */}
  <CustomCursor />        {/* fixed, z-9999 */}
  <Header />              {/* sticky top, z-50 */}
  <main>                  {/* z-10 */}
    {children}
  </main>
  <Footer />
</body>
</html>
```

### Aurora component

Mounts once at root. Renders 4 absolutely-positioned blurred divs with `mix-blend-mode: screen`. CSS keyframe animations drive the float motion (no JS — CSS is sufficient for this). Aurora opacity is 0.32, filter blur is 110px. See `BRAND.md` for blob positions and timings.

### Custom cursor component

Client component. Two `<div>` elements absolutely positioned. Listens to `mousemove`. Dot uses `transform: translate3d()` directly. Ring lags using a requestAnimationFrame loop with 0.18 lerp factor. Hover detection uses `mouseenter`/`mouseleave` on `a, button, .tag, .pillar, .marquee-item`. Mounts a MutationObserver to re-bind to dynamically added elements (like the flipped card back content).

Hidden via `@media (pointer: coarse)` — restore native cursor on touch.

### Animation reset (mobile)

`@media (prefers-reduced-motion: reduce)` disables all GSAP timelines, freezes aurora, removes cursor trail. Static layout still readable.

---

## 2. Header (Top Navigation)

File: `components/global/Header.tsx`

### Layout

Sticky top, full-width, `padding: 18px 6vw`. Three columns:
- Left: logo image (32px) + "Auxilifiers" wordmark in Unbounded weight 500
- Center: nav links (Work, Services, Process, Contact) in DM Sans 13px, muted by default, white on hover
- Right: pill CTA "Book a call →" with gradient background

Background: `rgba(0, 0, 0, 0.55)` with `backdrop-filter: blur(24px) saturate(140%)`. Border-bottom: 1px solid `--border-subtle`.

### Mobile

Below 800px: hide nav. Logo stays left, CTA stays right. Optional hamburger menu (defer to phase 8).

### Animation

Fade and slide down from `y: -10` on initial page load (part of hero timeline).

---

## 3. Hero (Section 1)

File: `components/sections/Hero/`

### Purpose

First impression. Communicate "Orbiting around your success." with editorial confidence. Demonstrate animation capability on first scroll moment.

### Layout

Full viewport height. Left-aligned (not centered). Padding: 60px 6vw 80px.

Structure top-to-bottom:
1. Meta row (eyebrow + live counter)
2. Three-line editorial headline
3. Bottom row (split): sub-block on left (paragraph + CTAs), stats column on right
4. Decorative "drifter" element drifting across horizontally (absolute positioned)

### Meta row

```
[● NOW ORBITING]  ───  12 BRANDS · 4 CONTINENTS · 1 MISSION
```

- Eyebrow: monospace 11px, cyan, with pulsing cyan dot (`@keyframes pulse`)
- Divider: 40px × 1px white 25% opacity
- Counter: monospace 11px, white dim text. Numbers (12, 4, 1) animate from 0 on load via GSAP `onUpdate`

### Headline

Three lines, each with distinct treatment:

**Line 1**: `Orbit*i*ng` (where i = dotless ı + SVG orbit-dot overlay)
- Font: Unbounded, weight 400
- Size: clamp(56px, 11vw, 168px)
- Letter-spacing: -0.045em
- Color: white
- Transform: rotate(-0.5deg)
- The "i" replacement: dotless `ı` character + absolutely-positioned SVG (12px ring + 2px orbiting satellite) above where the dot would be. Satellite rotates around ring continuously, 5-second loop.

**Line 2**: `around`
- Font: Instrument Serif italic, weight 400
- Size: clamp(36px, 7vw, 104px)
- Color: var(--text-dim) — 72% white
- Indent: margin-left clamp(40px, 8vw, 140px)

**Line 3**: `your success.`
- Font: Instrument Serif italic, weight 400
- Size: clamp(72px, 14vw, 220px)
- Background-clip: text, fill: var(--gradient-soft) (3-stop cyan→ice→blue gradient)
- Transform: rotate(0.5deg)
- The period (".") is overridden: Unbounded font, solid cyan, size 0.7em of surrounding, vertical-align -0.05em. The period is the visual punctuation accent.

### Hero animation timeline (GSAP)

Total duration ~3.2s, plays on mount with 0.3s delay.

1. Header: fade in, y from -10 to 0 (0.6s)
2. Meta row: fade + y from -10 to 0 (0.7s, starting at -0.2s overlap)
3. Line 1 chars: each character drops from y: -50, rotates from -8deg, with `back.out(1.4)` ease. Stagger 0.04s per char (0.9s total) starting at -0.3s overlap. The i-dot orbit fades in with the i.
4. Line 2 chars: fade + slide from x: -20, stagger 0.03s (0.6s total) starting at -0.4s overlap
5. Line 3: scramble reveal — characters cycle through random ASCII (`!@#$%^&*<>/?ABC...` etc) and settle to final text over 1.4s. Implemented as a manual rAF loop. The "." period: scale from 0.5 to 1 with `back.out(2)` (0.5s)
6. Sub paragraph: fade + y from 20 to 0 (0.7s)
7. CTA buttons: fade + y from 20 to 0, stagger 0.08s
8. Stats column: fade + x from 20 to 0, stagger 0.1s
9. Drifter: fade in (0.4s), then start the horizontal drift animation
10. Counters: tick up from 0 to target values (1.6-2.0s each)

### Sub-block

Paragraph in DM Sans 17px, max-width 460px:

> We *build* the tech, *automate* the operations, and *grow* the reach — for businesses ready to scale beyond what their team alone can carry.

Words `build`, `automate`, `grow` in Instrument Serif italic, white.

Below: CTA row
- Primary: "See how we orbit →" — gradient bg, black text, pill shape, with magnetic hover effect (button attracts toward cursor)
- Ghost: "Talk to our AI agent" — transparent bg, white text, pulsing cyan dot prefix

### Stats column (right side)

Three rows, each with a large number in Unbounded 36px and a small label in monospace 11px:
- `12` — Live projects in orbit
- `38` — Avg hrs/week saved per client
- `73%` — Of pitches we win on outcomes

(These numbers are placeholders. Replace with real values before launch.)

Stats animate from 0 to target on load. Use a `useCountUp` hook.

### Drifter element

Small SVG (60×60px) of a mini orbital ring with two dots. Starts at `left: -80px, top: 18%`. GSAP `fromTo` animates `x` from 0 to `window.innerWidth + 200` over 18 seconds, ease none, repeat infinite. On each repeat, randomize the `y` position for variety. Spins continuously via CSS animation (separate axis).

### Mobile (under 800px)

- Headline scales via clamp
- Bottom row stacks (sub-block above stats)
- Drifter only visible above 600px wide
- Stats numbers reduce to 28px

---

## 4. Services Marquee

File: `components/sections/ServicesMarquee/`

### Purpose

Show breadth of services immediately after hero. Single horizontal scroll. Establishes "we cover a lot" without overwhelming.

### Layout

Full-width strip, padding 56px 0. Border-top and border-bottom subtle. Background `rgba(0, 0, 0, 0.25)` with backdrop blur.

Absolute-positioned label pill on the left (`Services` in cyan monospace, pill background with cyan border).

### Content

14 services, alternating regular and italic, separated by ✦ stars:

```
Web Development ✦ *Mobile Apps* ✦ Shopify Stores ✦ *AI Workflows* ✦
Chatbots ✦ *Calling Agents* ✦ Voice-on-Site ✦ *SEO* ✦
Google Ads ✦ *Meta Ads* ✦ Social Handling ✦ *Content Strategy* ✦
Integrations ✦ *CRM Sync*
```

Each item rendered as a `<span class="marquee-item">` with optional `italic` class. Font sizes: clamp(32px, 4.5vw, 64px), Unbounded 300 weight (or Instrument Serif italic 400 for italic items).

Duplicate the entire list a second time within the track for seamless loop.

### Animation

Continuous requestAnimationFrame loop translating the track left. When `marqueeX <= -trackWidth` (where trackWidth = scrollWidth / 2 because of duplication), reset to 0 for seamless wrap.

Reactivity to scroll: when user scrolls up, reverse direction and speed up briefly (2x). After 200ms idle, return to default speed (1x, leftward).

### Mobile

Label pill stays. Item font sizes shrink to clamp(28px, 8vw, 40px). Speed unchanged.

---

## 5. Declaration ("A philosophy, briefly")

File: `components/sections/Declaration/`

### Purpose

Brand philosophy moment. Asymmetric editorial type. Personality and humility.

### Layout

Section padding: 200px 6vw. Max-width 1400px centered.

Eyebrow label at top: "A philosophy, briefly" with leading horizontal cyan line.

Below: four-line editorial statement, each line with distinct treatment and indentation:

**Row 1**: "We don't"
- Indent: margin-left 4vw
- Font: Unbounded 300
- Size: 0.6× of base
- Color: var(--text-dim)

**Row 2**: "take the spotlight."
- Font: Instrument Serif italic 400
- Size: 1.1× of base
- Color: var(--text-strike) (50% white)
- Text-decoration: line-through, 2px thickness, same color

**Row 3**: "We orbit *your business*"
- Font: Unbounded 400
- Size: 1.15× of base
- Color: white
- The "your business" portion: Instrument Serif italic 400, gradient-soft text fill

**Row 4**: "— amplifying what's already yours."
- Indent: margin-left 6vw
- Font: Unbounded 300
- Size: 0.55× of base
- Color: var(--text-dim)

### Base size

`clamp(40px, 6.5vw, 96px)`. Each row scales from that base by its multiplier.

### Animation

ScrollTrigger fires when section enters viewport at 70%:
1. Eyebrow fades + slides x from -20 (0.7s)
2. Each word-anim span fades + slides y from 40, with `power3.out`, stagger 0.18s

### Mobile

All rows reduce indentation. Strikethrough thickness reduces to 1.5px. Sizes scale via clamp.

---

## 6. Pillars (Bento with Flip Cards)

File: `components/sections/Pillars/`

### Purpose

Communicate three service categories (Build, Automate, Grow) and let users explore individual services via card flip interaction.

### Section header

Eyebrow: "How we orbit · three pillars" (monospace, cyan, with leading horizontal line)
Headline: "Three orb*i*ts. *One* mission." 
- "Three orbits." in Unbounded 300
- "One" in Instrument Serif italic 400, gradient-soft fill
- "mission." in Unbounded 400, size 1.4×

The "i" in "orbits" gets the same dot-replacement treatment as the hero "Orbiting" — this is the brand callback.

### Bento layout

CSS Grid: 2 columns, 2 rows.
- Build pillar: col 1, row 1 (small)
- Featured pillar (Automate): col 2, rows 1-2 (tall featured)
- Grow pillar: col 1, row 2 (small)

Each pillar rotates slightly: Build -0.4°, Featured +0.3°, Grow +0.4°. On hover: same rotation + translateY(-4px) lift.

Each pillar has `perspective: 1800px` on the container and `transform-style: preserve-3d` on the inner. 3D flips work on the inner element.

### Pillar front content

- Header row: PILLAR/0X label (monospace) + counter (Unbounded, cyan, counts to target on scroll-in)
- H3 title (Unbounded 36-56px)
- Description paragraph (DM Sans 14-16px, muted)
- Pillar viz (live animated SVG specific to each pillar — see below)
- Service tag pills at bottom

### Pillar viz (per pillar)

**Build viz**: 3×3 grid of nodes connected by lines. Each line draws in via stroke-dashoffset animation, on a staggered 4-second loop. Nodes pulse independently. Label: "// WIREFRAME ASSEMBLY".

**Automate viz** (featured): 6 workflow nodes (INPUT, CLASSIFY, ENRICH, plus 3 outputs DISPATCH and two unlabeled). Curved paths connect them. Paths have `stroke-dasharray: 6 18` and animate `stroke-dashoffset` for flowing data effect. Nodes pulse on different delays. Label: "// LIVE WORKFLOW · 3 AGENTS ACTIVE".

**Grow viz**: Bar chart with 6 ascending bars (each grows from bottom on a stagger). Curved line drawn over top via `stroke-dasharray: 400` animation. Three milestone markers pulse along the curve. Label: "// COMPOUND GROWTH · Q1-Q4".

All SVG viz files in `components/pillars/viz/` as separate components.

### Service tag pills

Each tag has `data-service="{serviceId}"`. On click, triggers flip-to-back with that service's content.

Tags include a hint indicator (small ↗ arrow) to signal they're clickable.

### Pillar back content

When a tag is clicked, the pillar's `.pillar-inner` adds class `flipped`, triggering a 0.75s 3D flip via cubic-bezier easing.

Back face structure:
- Top header row:
  - Left: small monospace eyebrow ("Build · service"), service name in Unbounded 26-36px
  - Right: close button (32px circle, ×)
- Description paragraph in DM Sans 13-15px
- "What you get" section header (monospace 10px, uppercase)
- Bullet list of 4 outcomes (DM Sans 12.5-14px, with small cyan dot bullets)
- Bottom: divider + "Switch service" row (monospace 9px) + horizontal pill list of OTHER services in the same pillar. Active service is highlighted. Click another pill: fade out current back content, swap in new service's content, fade in.

Back content is generated from a typed service data file (`data/services.ts`) — see `COPY.md` for all 15 service entries.

### Flip behavior rules

- Click tag → flip card to that service
- Click another tag in "Switch service" row → fade-swap content (no second flip)
- Click close button (×) → flip back to front
- Press ESC → flip ALL cards back to front
- Scroll past pillars section → flip ALL cards back to front
- Scroll significantly (240px+) while a card is flipped → flip back

### Mobile

Bento collapses to single column. Pillars become full-width cards, no rotation. Featured card no longer spans rows. Card height auto-fits content.

---

## 7. Why Us (Pinned scroll moment)

File: `components/sections/WhyUs/`

### Purpose

Differentiation. Gradient text fill driven by scroll position. Memorable single statement.

### Structure

A wrapping section with `min-height: 160vh` containing a `sticky` inner section at `top: 0, min-height: 100vh`. As the user scrolls through the wrap, the inner sticks and the gradient text fill animates.

### Content

Eyebrow: "Why us, briefly"

Three-line statement (Unbounded 300, sizes scale via clamp):

```
While agencies
    *bill hours,*       (Instrument Serif italic, struck-through, indented 6vw)
we ship outcomes.       (Instrument Serif italic, fills with gradient on scroll)
```

### Animation

The "we ship outcomes" element has a CSS background composed of a linear-gradient that's twice as wide as the text, with `background-clip: text`. Default: `background-position: 100% 0` (showing the dim part). As scroll progresses through the wrap section, `background-position` animates to `0% 0` (showing the cyan part). This is a scrubbed ScrollTrigger (`scrub: 0.8`).

Initial entrance: eyebrow and rows fade + slide y from 30, stagger 0.15s when section enters at 70%.

### Mobile

Same effect, smaller type. Strikethrough thickness reduces to 1.5px.

---

## 8. Footer CTA

File: `components/sections/FooterCta/`

### Purpose

Final big editorial moment. One CTA, one specific offer.

### Layout

Padding: 160px 6vw 220px. Border-top subtle. Max-width 1400px centered.

Eyebrow: "One last thing"

Headline: "Ready to *start* (actually) orbiting?"
- "Ready to" + "orbiting?" in Unbounded 300
- "start" in Instrument Serif italic 400, gradient-soft fill
- "(actually)" in small Unbounded 300 muted, vertically offset (0.7em up from baseline)
- Size: clamp(56px, 12vw, 200px)

Below: meta row (flex, space-between)
- Left: sub paragraph "A *20-minute call*. We diagnose your three biggest tech bottlenecks. *No pitch.*" — italic words in Instrument Serif
- Right: CTA row (primary "Book the call →" + ghost "Talk to our AI first")

### Animation

ScrollTrigger at 75%: eyebrow + headline + meta-row children fade + slide y from 40, stagger 0.12s.

### Mobile

Headline stays large. Meta row stacks. CTAs full-width.

---

## 9. Footer

File: `components/global/Footer.tsx`

### Purpose

Standard footer. Not flashy. Functional.

### Layout

Padding: 80px 6vw 60px. Border-top subtle.

Four-column grid (collapses to 2 on tablet, 1 on mobile):

**Col 1**: Logo + Auxilifiers wordmark + tagline ("Orbiting around your success.") + social icons row

**Col 2**: Services links (Build / Automate / Grow categories — each links to anchor on page)

**Col 3**: Company links (About / Process / Case Studies / Contact)

**Col 4**: Newsletter signup
- Heading: "Stay in orbit."
- Input + submit pill button

Below: bottom row (flex, space-between)
- Left: copyright "© 2026 Auxilifiers"
- Right: Privacy · Terms

### No animation

Just static. Performance budget.

---

## 10. Build order summary

Phase 3 (Foundation): Sections 1-2 (Layout + Header)
Phase 4 (Hero): Section 3
Phase 5 (Mid-page): Sections 4-5 (Marquee + Declaration)
Phase 6 (Pillars): Section 6 — biggest section, may take 2 prompts
Phase 7 (Closing): Sections 7-9 (Why Us + Footer CTA + Footer)
Phase 8 (Polish): Letter integrations, magnetic CTAs, ESC handlers, scroll listeners
Phase 9 (QA + Deploy): Full Playwright pass, Lighthouse, deploy to Vercel

See `PROMPTS.md` for the exact prompt at each phase.
