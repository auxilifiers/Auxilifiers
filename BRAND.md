# Brand & Design Tokens — Auxilifiers

Single source of truth for the design system. Every component reads from these tokens. Never hardcode a value that isn't here.

## Color palette — Electric

```css
:root {
  /* Foundation */
  --bg: #000000;
  --surface: #0A0F1A;
  --surface-elevated: rgba(0, 8, 16, 0.72);

  /* Brand */
  --cyan: #00F5FF;
  --blue: #0066FF;
  --ice: #7DD3FC;

  /* Text */
  --text: #FFFFFF;
  --text-muted: #C4C4CB;
  --text-dim: rgba(255, 255, 255, 0.72);
  --text-strike: rgba(255, 255, 255, 0.50);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-default: rgba(255, 255, 255, 0.15);
  --border-strong: rgba(0, 245, 255, 0.35);
  --border-active: rgba(0, 245, 255, 0.70);

  /* Gradient */
  --gradient: linear-gradient(135deg, #00F5FF 0%, #0066FF 100%);
  --gradient-soft: linear-gradient(135deg, #00F5FF 0%, #7DD3FC 50%, #0066FF 100%);

  /* Effects */
  --glow-cyan: 0 0 60px rgba(0, 245, 255, 0.5);
  --glow-cyan-soft: 0 0 14px rgba(0, 245, 255, 0.6);
  --text-shadow-safety: 0 0 24px rgba(0, 0, 0, 0.55);
}
```

### Usage rules

Pure black (`--bg`) is the canvas. White (`--text`) is the dominant text color. Cyan and blue are accent colors used for emphasis, interactive elements, and the gradient. Ice is a tertiary accent used in viz illustrations only. Never use ice for text.

The text-shadow-safety is applied to every text element that overlays the aurora background, to guarantee legibility regardless of where the colored blobs drift.

## Typography

```css
:root {
  --font-display: 'Unbounded', sans-serif;        /* All large headlines */
  --font-body: 'DM Sans', system-ui, sans-serif;  /* Paragraphs, body, UI */
  --font-italic: 'Instrument Serif', serif;       /* Italic accents, emotional emphasis */
  --font-mono: 'JetBrains Mono', monospace;       /* Labels, metadata, code-like */
}
```

Load via Google Fonts. Use weights 300, 400, 500 only. Never 600 or 700.

### Type scale

| Use | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero headline (Unbounded) | clamp(56px, 11vw, 168px) | 400 | 0.95 | -0.045em |
| Section headline (Unbounded) | clamp(40px, 6.5vw, 96px) | 300 | 1.02 | -0.035em |
| Sub-headline (Unbounded) | clamp(36px, 5.5vw, 64px) | 300 | 1.05 | -0.025em |
| Card title (Unbounded) | 36-56px | 400 | 1 | -0.025em |
| Italic accent (Instrument Serif) | Match surrounding +5-15% | 400 italic | inherit | -0.02em |
| Body large | 17-18px | 400 | 1.55 | normal |
| Body | 14-15px | 400 | 1.65 | normal |
| Small | 12-13px | 400 | 1.5 | normal |
| Mono label | 10-11px | 400 | 1.4 | 0.18-0.22em uppercase |

### Italic accent rule

Italic Instrument Serif is reserved for emotional emphasis. Use it on words like: *your success*, *unfair* advantage, *bill hours* (strikethrough), *no pitch*, *actually*, *amplifying*. Never use it for nouns of services or generic descriptors. One italic moment per sentence maximum.

## Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 120px;
  --space-11: 160px;
  --space-12: 200px;
}
```

Section vertical padding: `var(--space-11)` to `var(--space-12)` on desktop, `var(--space-10)` on tablet, `var(--space-9)` on mobile.

Horizontal padding: 6vw on all sections (consistent gutter throughout).

## Border radius

```css
:root {
  --radius-sm: 8px;     /* tags, small badges */
  --radius-md: 14px;    /* buttons, mid-size cards */
  --radius-lg: 18px;    /* nested cards, viz containers */
  --radius-xl: 24px;    /* main pillar cards */
  --radius-pill: 100px; /* pill buttons, ghost CTAs */
}
```

## Animation easings (GSAP curves)

```javascript
const ease = {
  // Primary easings
  default: 'power3.out',
  pop: 'back.out(1.4)',          // Letter drops in hero
  precise: 'power2.out',         // Word stagger
  bounce: 'elastic.out(1, 0.4)', // Magnetic CTA release
  cinematic: 'expo.out',         // Big reveals
  scrub: 'power2.inOut',         // ScrollTrigger scrub
  ringLag: 0.18,                 // Custom cursor ring follow speed (lerp factor)
};
```

### Duration reference

- Micro (hover, button states): 0.2-0.3s
- Small (text fade, card lift): 0.4-0.6s
- Medium (section reveals, card flips): 0.7-1.0s
- Large (hero entrance choreography): 2.5-3.5s total timeline

## Aurora background spec

Four blurred color blobs drifting on different timings, blend-mode: screen.

```css
.aurora { opacity: 0.32; filter: blur(110px); }

.blob-1 { width: 620px; height: 620px; background: #00F5FF; top: -120px; left: -140px; }
.blob-2 { width: 720px; height: 720px; background: #0066FF; bottom: -220px; right: -180px; }
.blob-3 { width: 480px; height: 480px; background: #7DD3FC; top: 30%; right: 18%; }
.blob-4 { width: 400px; height: 400px; background: #0066FF; bottom: 5%; left: 18%; }
```

Animation: each blob translates 200-240px over 28-42 seconds, ease-in-out, infinite. No two blobs share the same duration. Different cycles create non-repeating compositions.

## Custom cursor spec

- Dot: 6px solid cyan, follows cursor 1:1, box-shadow glow
- Ring: 36px hollow cyan, lags cursor with 0.18 lerp factor
- On hover over interactive elements (a, button, .tag, .pillar, .marquee-item): ring grows to 70px with semi-transparent cyan fill, dot fades and scales down
- Hidden via `@media (pointer: coarse)` for touch devices

## Service tag pills

```css
.tag {
  font-family: var(--font-mono);
  font-size: 10-11px;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-strong);
  color: var(--cyan);
  background: rgba(0, 245, 255, 0.06);
  letter-spacing: 0.04em;
}
.tag:hover {
  background: rgba(0, 245, 255, 0.14);
  border-color: var(--border-active);
  transform: translateY(-1px);
}
```

Tags must include a hint indicator (small ↗ arrow) to signal they're clickable.

## Letter-level integrations (signature moves)

The "i" in two specific words gets its dot replaced with a mini orbital ring:

1. **Hero**: "Orbit*i*ng" — first letter is the brand moment
2. **Pillars section**: "miss*i*on" — callback for consistency

Implementation: use dotless "ı" character (U+0131) in the rendered HTML, position an SVG `<g>` (a small ring + orbiting satellite dot) absolutely above where the dot would be. Match the font's x-height. The satellite dot animates around the ring with a 4-6 second GSAP rotation loop.

## Glow effects (use sparingly)

Only on:
- The primary CTA button on hover (`var(--glow-cyan)`)
- The pulsing dot in eyebrow labels (`var(--glow-cyan-soft)`)
- Satellite dots in orbital visualizations
- The "i-dot" mini-orbit elements

Never apply glow to body text, paragraphs, or non-interactive elements.

## Responsive breakpoints

```css
/* Mobile-first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

Bento grid collapses to single column under 900px. Hero typography uses clamp() for fluid scaling. Marquee item sizes scale with vw. Horizontal padding stays at 6vw across all breakpoints for consistent gutters.
