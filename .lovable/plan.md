
## Goal
Restyle the site to match https://speedex-signage-hub.vercel.app — a deep navy background with a bright cyan accent, oversized bold sans headline, minimal pill chip, and two-button CTA row. Keep all existing pages/routes and content; only the visual language changes.

## Changes

### 1. Color tokens (`src/styles.css`)
Shift the theme from current blue (hue 255) to **navy + cyan**:
- `--background` (dark): deep navy `oklch(0.16 0.05 250)` (matches #0a1628-ish)
- `--primary`: bright cyan `oklch(0.78 0.15 220)` (~ #22d3ee / #38bdf8 vibe from reference)
- `--primary-glow`: lighter cyan `oklch(0.86 0.12 220)`
- `--accent`: cyan variant
- `--ring`: cyan
- Update `--gradient-hero`, `--gradient-primary`, `--gradient-accent`, `--shadow-glow` to cyan
- Force **dark mode as default** by adding `.dark` class on `<html>` in the inline bootstrap script (reference is dark-only). Light mode stays available but ships dark.

### 2. Hero (`src/components/sections/Hero.tsx`)
Rework to match reference composition:
- Keep the 5 random background videos (existing feature), but change overlays to a **navy-to-transparent gradient from the left** (content left-aligned) plus a soft bottom fade — not the current centered radial black wash.
- Content **left-aligned** on desktop (max-w container, `text-left`), centered on mobile.
- Remove the glass logo plate and stats grid from the hero (reference has neither).
- Chip: small pill "● PREMIUM SIGNAGE MANUFACTURER" — cyan border, subtle cyan tint background, cyan dot.
- Headline: massive (7xl→9xl) tight sans, white with the last two words ("your brand.") in cyan. Use Space Grotesk (already loaded).
- Subhead: single short paragraph, muted white/70.
- CTAs: solid cyan pill "Start Your Project →" + outlined cyan pill "Explore Our Work". Drop the third button.
- Scroll cue: small "SCROLL ↓" centered at bottom (keep existing but restyle).

### 3. Navbar (`src/components/Navbar.tsx`)
- Transparent-on-hero → solid navy on scroll (likely already handled; just tune colors).
- Logo lockup gets a small cyan rounded-square icon tile to the left of the wordmark (matches reference's ⚡ tile).
- Right side: swap current CTA styling to a **cyan pill "Get a Quote"** button linking to `/contact`.
- Nav link hover/active color → cyan.

### 4. Buttons across site
No component rewrites needed — because `--primary` now resolves to cyan, all existing `bg-primary` / `from-primary` usages inherit the new accent automatically. Spot-fix any remaining hardcoded blue rgb (e.g. `rgba(37,99,235,...)` in Hero shadows) → cyan `rgba(34,211,238,...)`.

### 5. Metadata
- Update `theme-color` meta in `src/routes/__root.tsx` from `#2563EB` → cyan `#22D3EE`.
- Update fallback accent color defaults in `src/lib/admin/content.functions.ts`, `src/routes/companies.$slug.tsx`, `src/routes/_authenticated/admin.companies.tsx` from `#2563EB` → `#22D3EE`.

## Out of scope
- No content/copy changes beyond the hero headline/subhead wording to match the reference tone.
- No route additions, no backend changes.
- Other sections (Companies, Stats, Testimonials, Footer, etc.) keep their current structure — they automatically pick up the new cyan accent via tokens.

## Technical notes
- All color changes go through CSS variables in `src/styles.css`; no component-level color hardcoding.
- Hero video logic (random 1-of-5, autoplay, muted, loop) is preserved as-is.
- Force-dark bootstrap: change the inline `<script>` in `__root.tsx` to always add the `dark` class (still respects an explicit `theme=light` opt-in from localStorage).
