# Speedex Signages — Premium Corporate Redesign Plan

Shift the site from the current dark navy + cyan "tech" look to a clean, spacious, corporate signage-company aesthetic (think premium industrial UAE brand), while preserving all existing content, routes, data, and admin functionality.

## 1. Design tokens (src/styles.css)

Rebuild the token layer around a light-first corporate palette.

- Background: `#FFFFFF` (light gray `#F8F9FA` for alternating sections)
- Foreground / text: charcoal `#1F2937`
- Primary (CTA/accents only): orange `#F58220`
- Secondary surface: light gray `#F8F9FA`
- Muted text: slate `#64748B`
- Border: `#E5E7EB`
- Optional dark accent: navy `#0F172A` (footer, deep sections)
- Remove cyan glows; replace `--shadow-glow` with a soft orange-tinted shadow used sparingly, and `--shadow-elegant` with a neutral soft shadow (`0 10px 30px -12px rgba(15,23,42,0.12)`)
- Gradients: retire hero cyan gradient; keep one subtle `--gradient-primary` (orange → deeper orange) for CTA only
- Dark mode: keep functional, but default the site to **light** (flip `__root.tsx` bootstrap script back to light; remove forced `dark` class)
- Radius: standardize on `--radius: 0.875rem` (14px) for cards/buttons

## 2. Typography

- Load **Inter** (body) + **Manrope** (headings) via `<link>` in `src/routes/__root.tsx` head (drop Space Grotesk)
- Update `body` and `h1–h6` font-family in `styles.css`
- Tighter tracking on headings, comfortable 1.65 line-height on body, max prose width ~68ch

## 3. Layout system

- Container max-width 1280px, `px-6 lg:px-8`
- Section vertical rhythm: `py-20 lg:py-28`
- Alternate white / `bg-secondary` (light gray) sections for visual pacing

## 4. Section-by-section changes

**Hero (`src/components/sections/Hero.tsx`)**
- Full-bleed real signage photograph background (keep existing video as optional, but darken to ~35% with a soft charcoal gradient — not navy)
- ~92vh height, left-aligned content, max-w-3xl
- Small orange eyebrow label, bold Manrope headline (charcoal on light overlay or white on darkened image), supporting paragraph
- Two CTAs: **Get Free Quote** (solid orange) and **View Projects** (white / charcoal-bordered outline)
- Subtle fade-up on load; remove pulsing dot and neon shadows

**Navbar (`src/components/Navbar.tsx`)**
- White background with subtle bottom border, charcoal links, orange hover underline
- Sticky, slight shadow on scroll
- Primary CTA button in orange on the right

**Services / Companies / Portfolio / Stats / FAQ / CTA / ClientLogos / CustomerFeedback / Testimonials / Location / OurCompanies**
- Unified card style: white card, 14px radius, soft neutral shadow, hover = lift + shadow deepen (no glow)
- Consistent Lucide icons, `strokeWidth={1.75}`, size 20–24, orange accent circles on light backgrounds
- Portfolio: larger thumbnails, category filter chips, hover zoom on image, overlay caption
- Testimonials: photo + logo + name + role + stars (orange), quiet slider
- Stats: large charcoal numbers, orange underline accent
- Location: keep map, restyle info card to white + orange icon chips

**Footer (`src/components/Footer.tsx`)**
- Switch to navy `#0F172A` background with white text and orange link hover
- Add optional newsletter row
- Cleaner column rhythm, larger padding

## 5. Buttons

- Update shadcn `Button` variants only via tokens (no component rewrite needed):
  - `default` = orange bg, white text, hover slightly darker orange, soft shadow
  - `outline` = white bg, charcoal border, charcoal text, hover light-gray fill
  - `ghost` / `secondary` retuned to neutral grays
- Standard sizes: h-11 default, h-12 lg, rounded-full for hero CTAs, rounded-xl elsewhere

## 6. Animations

- Keep existing `Reveal` component and framer-motion
- Limit to fade-up, fade-in, subtle scale (1 → 1.02) on card hover, image zoom (scale 1.05) on portfolio hover
- Remove pulses, neon glows, ken-burns intensity

## 7. Images

Content-only note: existing hero videos + uploaded assets stay. Where placeholder imagery is weak, we'll swap to sharper signage-relevant stock via existing image slots (no new asset uploads unless you approve).

## 8. Accent color code cleanup

Replace hard-coded `#22D3EE` fallbacks with `#F58220` in:
- `src/routes/companies.$slug.tsx`
- `src/routes/_authenticated/admin.companies.tsx`
- `src/lib/admin/content.functions.ts`
- `src/routes/__root.tsx` (`theme-color` meta)

## 9. Out of scope

- No backend, schema, routing, or admin-logic changes
- No new routes; existing pages keep their content
- No new asset uploads unless you request them

## Technical notes

- All color changes flow through `src/styles.css` tokens; components consume `bg-primary`, `text-foreground`, etc. — no hardcoded hex in components (except the noted fallback strings).
- Fonts loaded via `<link>` in `__root.tsx` head (Tailwind v4 rule: never `@import` remote URLs in `styles.css`).
- Default theme flipped to light by removing the forced `dark` class in the root bootstrap script.
- Dark mode tokens retained so the theme toggle keeps working.

## Files touched

- `src/styles.css`
- `src/routes/__root.tsx`
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Stats.tsx`
- `src/components/sections/OurCompanies.tsx`
- `src/components/sections/ClientLogos.tsx`
- `src/components/sections/CustomerFeedback.tsx`
- `src/components/sections/Testimonials.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/CTABanner.tsx`
- `src/components/sections/Location.tsx`
- `src/components/sections/SeoContent.tsx`
- `src/routes/index.tsx`, `about.tsx`, `services.tsx`, `portfolio.tsx`, `companies.tsx`, `contact.tsx`, `companies.$slug.tsx` (spacing / card class refinements)
- `src/routes/_authenticated/admin.companies.tsx`, `src/lib/admin/content.functions.ts` (accent fallback swap)

Approve and I'll implement in one pass.
