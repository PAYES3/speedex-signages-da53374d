# Speedex Signages — Premium Redesign Plan

## Goal
Elevate the site to a bright, corporate, premium UAE signage brand. Build on the existing white/orange system already in place, and push it further into a polished, spacious, trust-building experience.

## Scope
Frontend + design system only. No schema, routing, or admin logic changes. Content stays; presentation is upgraded.

---

## 1. Design tokens (`src/styles.css`)
- Add gold accent `--gold: oklch(0.78 0.13 84)` (#D4A017) for premium highlights.
- Introduce surface tokens: `--surface-beige: #FAF7F2`, `--surface-gray: #F5F6F7`, `--surface-warm: #E5E7EB`.
- Bump base body to `1.125rem`, keep 1.7 line-height. Widen H1 clamp to `clamp(3rem, 6vw, 5rem)`; H2 to `clamp(2.25rem, 4vw, 3.5rem)`.
- Add `--section-y: clamp(6rem, 10vw, 9rem)` for consistent 100–140px vertical rhythm.
- Card radius token `--radius-card: 1rem` (16px); soft shadow `--shadow-card` and lifted `--shadow-card-hover`.
- Remove leftover glow utilities from cards (keep `glow-text` for optional accents only).

## 2. Layout container
- New `.container-x` utility (max-width 1280px, responsive padding) applied consistently across sections instead of ad-hoc `max-w-7xl`.

## 3. Hero (`src/components/sections/Hero.tsx`)
- Full-viewport (`100svh`) autoplay/muted/loop/playsinline video (already wired) with slightly stronger clarity: `opacity: 1` when ready, plus a light gradient overlay (white 55% → 20%) — no dark tints.
- Headline: "Premium Signage Solutions For Your Business" at 72–80px.
- Subhead: "Custom design, manufacturing and installation services for commercial brands." at 22–26px.
- CTAs: primary orange, secondary white with orange border. Both 56px tall, 18–20px text.
- Subtle scroll indicator, tighter entrance animation stack.

## 4. New section — Signage slider (`src/components/sections/SignageShowcase.tsx`)
- Auto-advancing full-bleed slider (5–6 slides) using existing portfolio-style imagery: facades, LED boards, acrylic letters, office/retail/mall branding.
- Each slide: overlay card with headline + one-line description + CTA button. Dot navigation, framer-motion crossfade, pause on hover.

## 5. New section — Manufacturing process (`src/components/sections/ProcessVideo.tsx`)
- Heading: "From Design to Installation — We Build Signage That Represents Your Brand".
- Cinematic 16:9 video card with 16px radius, soft shadow, poster image, play-button overlay, lazy-loaded.
- Right column: 4 process steps (Design → Fabrication → Finishing → Installation) with numbered gold accents.

## 6. Services (`src/routes/services.tsx` grid + shared card)
- Redesign cards to white bg, 16px radius, image on top, icon chip, bold 26–32px title, description, "Learn More" arrow link.
- Reorganize into the 8 categories listed (LED, Acrylic, Building, Office, Retail, Vehicle, Indoor, Outdoor). Use existing service data; only visuals change.

## 7. Portfolio (`src/routes/portfolio.tsx`)
- Larger 3-col grid, category filter chips (orange active state), hover image zoom (scale 1.05), overlay with project name + category.
- Keep existing data source.

## 8. Why Choose Speedex (new or upgraded section on `index.tsx`)
- 8 feature cards in a 4×2 grid: Quality Materials, Experienced Team, Custom Designs, Fast Delivery, Professional Installation, Competitive Pricing, Warranty Support, Complete Solutions. Icon + title + short line each.

## 9. Trust strip (upgrade `Stats.tsx` + `ClientLogos.tsx`)
- Stats: keep the current large-number treatment; add gold underline accent option.
- Client logos: grayscale by default, colored on hover, tidy 6-per-row grid on desktop.

## 10. Testimonials (`Testimonials.tsx`)
- Slider with photo + logo + name + designation + quote + orange 5-star rating. Quiet auto-advance, arrow controls.

## 11. About page (`src/routes/about.tsx`)
- Add Mission / Vision / Core Values trio, factory/team image band, experience highlights row. Keep copy structure; upgrade layout to editorial with generous whitespace.

## 12. Contact (`src/routes/contact.tsx`)
- Two-column: form (white card, 16px radius) on left; contact details, hours, WhatsApp CTA, map embed on right. Larger form fields (h-14), 18px labels.

## 13. Buttons (shadcn `button.tsx`)
- Tune `default` (orange bg, white text) and `outline` (white bg, orange border, orange text → filled on hover) variants. Bump default `lg` size to h-14 / px-8 / text-lg. Rounded-full retained.

## 14. Cards & motion cleanup
- Sweep components and remove residual heavy shadows, neon glows, ken-burns. Standardize on: fade-up on enter, image zoom 1.05 on hover, card lift `translateY(-4px)` + `--shadow-card-hover`.

## 15. Footer (`Footer.tsx`)
- Already charcoal (#222); add a thin top gold hairline, bump link/label sizes to 16–18px, tighten column widths, add gold hover on links.

## 16. Navbar (`Navbar.tsx`)
- Keep white translucent bar; increase link font-weight/spacing, orange underline hover (already present), CTA button to h-11 rounded-full.

## 17. Mobile & performance
- Verify all new sections stack cleanly at 375/768/1024. Videos use `preload="metadata"` + poster. Images use `loading="lazy"` and `decoding="async"`. No horizontal overflow.

## 18. SEO
- Keep per-route `head()` metadata; refresh homepage title/description to reflect premium positioning. No new routes.

## Out of scope
- No backend/schema/auth changes.
- No new admin fields.
- No new asset uploads unless you provide them; new sections reuse existing hero videos and portfolio imagery.

## Files touched (approx.)
`src/styles.css`, `src/components/ui/button.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/sections/Hero.tsx`, `Stats.tsx`, `ClientLogos.tsx`, `Testimonials.tsx`, `CTABanner.tsx`, `OurCompanies.tsx`, `FAQ.tsx`, `SeoContent.tsx`, `Location.tsx`, new `SignageShowcase.tsx`, new `ProcessVideo.tsx`, new `WhyChoose.tsx`, `src/routes/index.tsx`, `about.tsx`, `services.tsx`, `portfolio.tsx`, `contact.tsx`.
