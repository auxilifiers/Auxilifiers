# Build Prompts — Auxilifiers

Copy-paste prompts for Claude Code, in execution order. Each phase ends with a checkpoint before moving on.

Open Claude Code in your project root, then paste these one at a time.

---

## Phase 1 — Project setup

```
Read README.md, CLAUDE.md, BRAND.md, SECTIONS.md, COPY.md, and AGENTS.md in this directory. Confirm you understand:

1. The project context (Auxilifiers tech and growth agency)
2. The locked design system (Electric palette + Geometric Futurist typography)
3. The 9 sections that need to be built and their order
4. The four sub-agents and their roles
5. The plain-language voice rule for service copy

Then verify the project setup:
- Next.js 15 with App Router, TypeScript, Tailwind installed
- public/logo.png exists
- Playwright MCP is connected (run: claude mcp list)

If anything's missing, list what needs to happen before we start. Don't write any code yet — just confirm we're ready.
```

**Checkpoint**: Claude responds with a confirmation summary. If anything's missing (e.g. Playwright MCP not installed), fix that before Phase 2.

---

## Phase 2 — Foundation (Layout, Header, Aurora, Cursor)

```
We're starting the build. Use the section-builder agent to implement the global foundation.

Build:
1. app/layout.tsx with the structure from SECTIONS.md section 1
2. app/globals.css with all CSS custom properties from BRAND.md (colors, spacing, fonts, easings)
3. tailwind.config.ts extending theme with brand tokens
4. components/global/Aurora.tsx (CSS-only animated blurred blobs, see BRAND.md spec)
5. components/global/CustomCursor.tsx (client component: dot + lagging ring with hover detection)
6. components/global/Header.tsx (sticky topbar per SECTIONS.md section 2)
7. data/services.ts (typed service entries — pull all 15 from COPY.md)

Constraints from CLAUDE.md apply. Load Google Fonts via next/font for Unbounded, DM Sans, Instrument Serif, JetBrains Mono.

After building, run pnpm dev. Once it serves clean, use the visual-qa agent to take screenshots at 375, 768, 1024, 1440 and report any issues with the aurora rendering, cursor behavior, or header layout.
```

**Checkpoint**: Visual-QA returns PASS for foundation. Aurora drifts smoothly, cursor follows with lag, header sticks on scroll. Move to Phase 3.

---

## Phase 3 — Hero section

```
Use the section-builder agent to build the Hero section per SECTIONS.md section 3.

Implementation details to get right:
- Three-line editorial headline with the mixed type treatments
- The "i" in "Orbiting" must be a dotless ı (U+0131) character with an SVG mini-orbit overlay (12px ring + 2px satellite that rotates around it on a 5-second loop)
- Hero left-aligned, not centered
- Bottom row split: sub-block on left (paragraph + 2 CTAs), stats column on right
- Drifter element absolute positioned, starts off-screen left

Use the copy in COPY.md exactly. The italic words (build, automate, grow, your success) use Instrument Serif italic.

After structure is built, use the animation-engineer agent to add:
- The full hero entrance timeline from SECTIONS.md (3.2 seconds total)
- The scramble effect for "your success"
- The character drop-in for "Orbiting"
- Counter tick-ups (12 brands, 4 continents, 1 mission; 12/38/73% stats)
- Magnetic effect on the primary CTA
- The continuous horizontal drift for the decorative element
- The i-dot mini orbit rotation

Then copy-keeper verifies the italic accent rule, then visual-qa takes screenshots and verifies the entrance plays correctly.
```

**Checkpoint**: Hero looks like the v4 prototype's hero, with the i-dot orbit replacement working. Visual-QA approves.

---

## Phase 4 — Services Marquee

```
Use the section-builder agent to build the Services Marquee per SECTIONS.md section 4.

Key details:
- Full-width strip with border-top and border-bottom (subtle)
- Absolute-positioned "Services" label pill on the left (cyan border, monospace)
- 14 services from COPY.md, alternating regular (Unbounded 300) and italic (Instrument Serif 400)
- Separated by ✦ stars
- Duplicate the entire list once for seamless loop

After structure, use the animation-engineer agent to add:
- Continuous leftward translation via requestAnimationFrame
- Scroll-direction reactivity: when user scrolls up, reverse direction and speed up to 2x for 200ms
- Wrap-around logic: when track has translated by half its width (= one full list cycle), reset to 0

Visual-QA verifies smooth loop and direction reversal works.
```

**Checkpoint**: Marquee loops seamlessly, reverses on scroll up.

---

## Phase 5 — Declaration

```
Use section-builder for the Declaration section per SECTIONS.md section 5.

Implementation:
- Eyebrow with leading horizontal line
- Four-row editorial statement with the specific indentations and type treatments from COPY.md
- Row 2 is strikethrough Instrument Serif italic in --text-strike color
- Row 3's "your business" portion uses gradient-soft text fill

Then animation-engineer adds the ScrollTrigger reveal:
- Fires at 70% viewport entry
- Eyebrow slides in from x: -20
- Each word-anim span fades + slides y from 40 with stagger 0.18

Copy-keeper verifies the strikethrough is contextually appropriate (rejection of competing idea before stating ours). Visual-QA confirms reveal triggers correctly.
```

**Checkpoint**: Declaration reveals on scroll with the asymmetric typography intact.

---

## Phase 6 — Pillars with Flip Cards (likely 2 prompts)

### Phase 6A — Structure and front faces

```
Use section-builder for the Pillars section per SECTIONS.md section 6, FRONT faces only.

Build:
- Section header with eyebrow + "Three orbits. One mission." headline
- The "i" in "mission" gets the same dot-replacement treatment as the hero "Orbiting" (callback)
- Bento grid: 2 columns × 2 rows, with Build top-left, Featured (Automate) spanning right column, Grow bottom-left
- Each pillar has slight rotation (Build -0.4°, Featured +0.3°, Grow +0.4°)
- Container has perspective: 1800px and .pillar-inner has transform-style: preserve-3d
- Front face content from COPY.md pillar cards section
- Service tag pills with data-service attributes (web-dev, mobile-apps, etc.)
- Three custom SVG viz components (Build wireframe, Automate workflow, Grow chart) — see SECTIONS.md viz section for exact specs

Make .pillar-back exist but empty for now (next phase populates).

Visual-QA confirms the three pillars render with correct asymmetric layout and the viz animations loop.
```

### Phase 6B — Flip interaction and back faces

```
Use section-builder to implement the card flip interaction per SECTIONS.md section 6 back content rules.

Build:
- A buildBackContent(pillarId, serviceId) function that generates back face HTML
  - Pulls service data from data/services.ts (sourced from COPY.md)
  - Back face: eyebrow + service title + close button (×) + plain-language pitch + "What you get" header + 4 outcome bullets + "Switch service" row with other pills from same pillar
- Active service in "Switch service" row is highlighted
- Click tag → populate back, add .flipped class to .pillar-inner
- Click "Switch service" pill → fade out current back content, swap in new, fade back in (no flip)
- Click × → remove .flipped class
- ESC key → flip all cards back
- Scroll past pillars section (or 240px+ scroll while flipped) → flip all cards back

Copy-keeper verifies every service uses the plain-language pitch and benefit-focused outcomes from COPY.md exactly.

Visual-QA:
1. Click a tag in Build → screenshot the back face
2. Click "Mobile Apps" in "Switch service" row → screenshot
3. Press ESC → confirm flip back
4. Click a tag, scroll down past pillars → confirm auto-flip back

Verify the 3D flip is smooth (no flicker, no z-index issues) and the back face fills the entire pillar height (including the featured card spanning 2 rows).
```

**Checkpoint**: All three pillars flip, swap, and reset correctly. Featured card's back face fills its full 2-row height. Plain-language copy reads cleanly.

---

## Phase 7 — Why Us + Footer CTA + Footer

```
Use section-builder for all three closing sections per SECTIONS.md sections 7, 8, 9.

For Why Us (section 7):
- Wrapper with min-height: 160vh containing sticky inner section
- Three-row statement with the strikethrough on "bill hours,"
- "we ship outcomes" needs the gradient-fill-on-scroll trick (background-position scrub)

For Footer CTA (section 8):
- Editorial headline "Ready to start (actually) orbiting?" with mixed type treatments
- Meta row with paragraph on left, CTAs on right

For Footer (section 9):
- Standard 4-column footer with services links, company links, newsletter signup, copyright

Use animation-engineer for:
- Why Us gradient fill (ScrollTrigger with scrub: 0.8 from top to bottom of wrap)
- Footer CTA entrance reveal at 75%
- Footer is static, no animation

Copy-keeper verifies all sections against COPY.md.

Visual-QA captures the gradient fill at three scroll positions (0%, 50%, 100%) to confirm the scrub works smoothly.
```

**Checkpoint**: Site has all 9 sections rendering. Final scroll-through feels coherent.

---

## Phase 8 — Polish and cross-cutting

```
Polish pass. No new sections, just refinement.

Tasks:
1. Verify all letter-level integrations work — i-dot orbits in hero "Orbiting" and pillars "mission" (animation-engineer to debug if any are misaligned with the x-height of the surrounding font)
2. Verify magnetic CTA works on Hero and Footer CTA (animation-engineer)
3. Verify ESC and scroll-to-close flip back work on all three pillars (section-builder)
4. Add prefers-reduced-motion handling: disable GSAP timelines, freeze aurora, hide cursor trail (animation-engineer)
5. Add focus-visible styles for keyboard navigation on all interactive elements (section-builder)
6. Confirm mobile menu solution for header (section-builder — implement hamburger menu if not done)
7. Add metadata in app/layout.tsx (title, description, OpenGraph, favicon)

Then visual-qa runs a full pass at all 4 breakpoints across all 9 sections. Report any inconsistencies.
```

**Checkpoint**: Full visual-QA pass returns minimal issues. Anything outstanding gets a targeted fix.

---

## Phase 9 — Performance and deploy

```
Final performance audit before launch.

Tasks:
1. Run Lighthouse via Playwright in the visual-qa agent. Targets:
   - Performance: 95+
   - LCP: under 2.5s
   - INP: under 200ms
   - CLS: under 0.1
   
2. If LCP fails: identify the heaviest element (likely the hero font or aurora) and optimize:
   - next/font with display: swap and fallback already enabled
   - Aurora using transform animations only (no width/height changes that cause repaints)
   - Hero image (logo) using next/image with priority

3. Bundle size check: build with pnpm build and verify initial JS payload is under 200KB gzipped.

4. SEO basics:
   - Meta title and description on app/layout.tsx
   - OpenGraph image (1200x630, can be the logo on the gradient bg)
   - robots.txt and sitemap.xml in public/
   - Structured data (JSON-LD Organization schema)

5. Accessibility audit:
   - Lighthouse a11y score 95+
   - All interactive elements have aria-label or visible text
   - prefers-reduced-motion respected
   - Color contrast WCAG AA minimum

6. Deploy to Vercel:
   - vercel link the project to your account
   - vercel --prod for production deployment
   - Add custom domain (auxilifiers.com or whichever)
   - Configure Vercel Analytics

Visual-QA does a final post-deploy pass against the production URL.
```

**Checkpoint**: Site is live. Lighthouse scores meet targets. You can share the URL.

---

## Notes on iteration

These prompts assume things go right. They usually don't on the first pass. Real iteration looks like:

- Phase 3 might take 2-3 prompts as you refine the hero's letter timing or scramble visibility
- Phase 6 almost always needs a second pass for the flip card UX edge cases
- Phase 9 LCP issues sometimes need a third pass

That's normal. The four-agent chain compresses iteration: visual-qa catches issues fast, routes to the specialist, you don't lose your place.

## When to break the workflow

If something blocks you, escape the agent chain and ask the main Claude Code orchestrator directly. Phrases that work:
- "Skip visual-qa for this fix, it's a typo"
- "Try a different approach for the i-dot — the current SVG positioning is fighting the font's baseline"
- "Roll back the last commit and rebuild that section from scratch"

The agents are tools. You're the director.
