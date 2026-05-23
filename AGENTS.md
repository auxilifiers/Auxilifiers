# Multi-Agent Workflow — Auxilifiers Build

This project uses four specialized sub-agents that the main Claude Code orchestrator invokes via the Task tool. Each agent has a focused responsibility, its own context window, and its own constraints.

## Why multi-agent for this build

A single agent handling everything has two problems: context pollution (the agent's working memory fills up with details from many concerns at once) and quality drift (one agent that writes code, checks copy, and reviews visuals will do all three at average quality).

Splitting into focused agents gives each a smaller, sharper context and lets the orchestrator coordinate them like a small studio: one writes, another animates, a third checks the copy, a fourth opens a browser and looks at the result.

## The four agents

### `section-builder`

**Role**: Implements section UI from `SECTIONS.md` specifications.

**When invoked**: For any new section build. Also for layout-only changes to existing sections.

**Inputs it expects**: section name, reference to its spec in `SECTIONS.md`, current state of related files.

**Outputs**: TypeScript React component files in the correct location, related styles, type definitions.

**Constraints**:
- Reads `BRAND.md` for tokens — never invents colors or sizes
- Uses Tailwind utility classes where possible, custom CSS only for the design tokens layer
- Writes server components by default, client components only when interactivity demands
- Mobile responsive at 375 / 768 / 1024 / 1440 breakpoints, verified
- No console errors on `pnpm dev`

### `animation-engineer`

**Role**: Adds GSAP animations and scroll interactions per `SECTIONS.md` motion specs.

**When invoked**: After a section has its static structure built. Also for any animation polish or debugging.

**Inputs it expects**: section files from section-builder, animation spec from `SECTIONS.md`, easing curves from `BRAND.md`.

**Outputs**: Updated section files with animation hooks/components added. Animation logic isolated in `components/animations/` where reusable.

**Constraints**:
- All easings come from `BRAND.md` — `power3.out`, `back.out(1.4)`, `elastic.out(1, 0.4)`, etc.
- Maintains 60fps target. If anything jitters, reduces particle counts, switches to canvas, or uses `will-change` strategically.
- Respects `prefers-reduced-motion` — fades and slides become instant transitions
- ScrollTrigger animations clean up on unmount
- No animation on mobile reduces functionality, only intensity

### `copy-keeper`

**Role**: Reviews user-facing text for voice, plain language, and consistency.

**When invoked**: Before any section ships. Also when new copy is added or existing copy is changed.

**Inputs it expects**: section files, `COPY.md` canonical entries.

**Outputs**: Approved copy left as-is; flagged text gets a suggestion and the file is updated with the approved version.

**Constraints**:
- Cross-checks every visible string against `COPY.md` — service descriptions, headlines, button labels
- Flags any tech jargon that wouldn't pass the "would my mother understand this?" test
- Verifies italic Instrument Serif usage rule (one moment per sentence, emotional emphasis only)
- Confirms no strikethrough outside declaration and why-us sections
- Numbers use the conventional formatting (12, not "twelve"; 73%, not "73 percent")

### `visual-qa`

**Role**: Opens the live dev server via Playwright MCP, takes screenshots, verifies the rendered output matches the spec.

**When invoked**: After section-builder, animation-engineer, and copy-keeper have all passed. Final gate before a section is considered done.

**Inputs it expects**: section name, expected behavior from `SECTIONS.md`, URL of dev server (default `http://localhost:3000`).

**Outputs**: Screenshots saved to `.playwright/screenshots/{section}/{breakpoint}.png`. A structured report in the format:

```
SECTION: hero
RESOLUTIONS TESTED: 375, 768, 1024, 1440
PASS:
  - Headline renders three lines with mixed type treatments
  - i-dot orbit animation runs continuously
  - Magnetic CTA attracts on hover
  - Stats column counts up from 0
ISSUES:
  1. Drifter element clips off-screen on 1440 width — should drift across full viewport
  2. Custom cursor ring lags noticeably on Safari (test in Firefox too)
RECOMMENDATIONS:
  - Builder: extend drifter `x: window.innerWidth + 400` instead of +200
  - Animation-engineer: check ring lerp factor for Safari Math.sign behavior
```

**Constraints**:
- Always tests at 4 breakpoints
- Captures both initial state and post-animation state where relevant
- Checks browser console for errors and warnings
- Never approves a section with console errors
- Always reports in the same structured format above

## Workflow per section

```
┌──────────────────┐
│   Orchestrator   │ ◄── you (or main Claude Code)
└────────┬─────────┘
         │
         │ 1. "Build section X per SECTIONS.md"
         ▼
┌──────────────────┐
│ section-builder  │
└────────┬─────────┘
         │ static structure done
         ▼
┌──────────────────┐
│animation-engineer│
└────────┬─────────┘
         │ motion added
         ▼
┌──────────────────┐
│   copy-keeper    │
└────────┬─────────┘
         │ language verified
         ▼
┌──────────────────┐
│    visual-qa     │ ◄── Playwright opens browser, screenshots
└────────┬─────────┘
         │
         ├── PASS → commit, move to next section
         │
         └── ISSUES → route back to the relevant agent
```

## How to invoke agents in Claude Code

In Claude Code, agents defined in `.claude/agents/*.md` are automatically discovered. You can invoke them three ways:

**1. Explicit Task tool call** (most reliable):
> Use the section-builder agent to build the Hero section per SECTIONS.md.

**2. Mention by name**:
> Have section-builder implement the marquee, then animation-engineer add the scroll-reactive reversal.

**3. Let orchestrator decide** (after a few sections, Claude learns the pattern):
> Build the Pillars section.
> (Orchestrator routes to section-builder, then continues the chain.)

## Iteration discipline

When visual-qa flags an issue, the orchestrator routes the fix to the relevant agent:
- Layout / structure issue → section-builder
- Animation timing / jank → animation-engineer
- Text / voice issue → copy-keeper
- Cross-cutting performance → orchestrator handles directly

Never have one agent fix another agent's domain. Boundaries keep each agent's context clean.

## Playwright MCP setup

Install once at project start:

```bash
claude mcp add playwright npx '@playwright/mcp@latest'
```

The visual-qa agent uses Playwright commands like:

```bash
npx playwright codegen http://localhost:3000
# or programmatically:
npx playwright screenshot --viewport-size 1440,900 \
  --output .playwright/screenshots/hero/desktop.png \
  http://localhost:3000
```

For animated sections, visual-qa scripts a sequence: wait for animation to complete, then screenshot. This catches "did the headline actually render" issues that a single snapshot misses.

## When to escape the workflow

The workflow is a default, not a law. Skip steps when:
- A typo fix doesn't need visual-qa
- A pure style refactor doesn't need copy-keeper
- A trivial component addition doesn't need animation-engineer

The orchestrator uses judgment. The four-agent chain is for substantive section work where quality matters.

## Common failure modes

**Agent over-reach**: section-builder starts adding GSAP animations on its own. Fix: explicit role boundaries in agent definition files. If it happens, remind the agent of its scope and re-route.

**Spec drift**: animation-engineer invents new easings not in `BRAND.md`. Fix: copy-keeper has read access to `BRAND.md` and can flag during review, even though motion isn't its primary domain.

**Visual-QA passes broken builds**: agent takes screenshot before animation has settled. Fix: always include explicit waits (`await page.waitForTimeout(3500)` for hero) in visual-qa scripts.

**Context pollution**: orchestrator's context fills up with detailed code review feedback. Fix: orchestrator delegates feedback application to the relevant agent, doesn't try to apply the fix itself.

## Final tip

The agents are not magic. They're focused workers. Treat them like a small team you're managing remotely: give clear briefs, trust their domain, but verify outputs. The Playwright visual checkpoint is the most important quality gate — never skip it.
