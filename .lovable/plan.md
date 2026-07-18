## Goal
Elevate Speedex Signages into a luxury, dark-mode-first, enterprise signage site that outperforms rainbowcraft.ae on design, UX, SEO, and lead conversion — reusing the existing TanStack Start + Supabase + CMS foundation rather than rebuilding.

## Scope (what changes)

### 1. Global design system (dark-first, premium)
- Flip default theme to **dark**; keep light as opt-in.
- New palette: near-black `#05070C` bg, deep-navy `#0B1220` surfaces, electric-blue `#3EA6FF` + gold `#D4AF37` accents.
- Add glassmorphism utility (`.glass-panel`), gradient borders, and Apple-style spacing scale.
- Typography: keep Manrope/Inter, retune to hero 40–56 / section 32–40 / body 16–18, higher line-height, WCAG AA contrast pairs.
- Add scroll-reveal, hover-glow, and card-tilt primitives (framer-motion) shared across sections.

### 2. Hero (cinematic)
- Full-viewport background video, 5 clips already uploaded — keep random rotation, add proper `poster`, `preload="metadata"`, `playsInline`, fade-in on `canplay`, and pause when tab hidden.
- Restyle overlay to dark gradient with gold/blue chip, big luxe headline, subcopy, and two CTAs: **Get Free Quote** + **View Portfolio**.
- Optional low-motion image fallback for `prefers-reduced-motion`.

### 3. Home layout (rebuild order)
Navbar → Hero Video → Client Logos → Services → Featured Projects → Before/After slider → Why Speedex → Factory Showcase → Process Timeline → Testimonials → Blog Teaser → Contact/CTA → Footer.
- New sections: **BeforeAfter** (draggable slider), **FactoryShowcase** (machines/team/production grid), **ProcessTimeline** (animated 6-step: Consultation → Design → Fabrication → Quality → Installation → Maintenance), **BlogTeaser**.
- Restyle existing Stats, ClientLogos, WhyChoose, Testimonials, CTABanner to dark-premium tokens.

### 4. Services
- Premium cards: image + icon + glass hover + tilt.
- Per-service detail route `services/$slug` with Hero, Gallery, Process, Materials, FAQ, CTA (driven by `services` table + new `materials` JSON column).

### 5. Portfolio
- Masonry grid with category filters (LED, Retail, Corporate, Vehicle, Exhibition, Indoor) sourced from `portfolio_categories`.
- Add reusable **BeforeAfterSlider** component; portfolio items can carry a `before_image` field.

### 6. Trust & Factory
- Statistics counters (already exist — restyle).
- Google Reviews section (static curated list now; live API optional later).
- UAE coverage map (SVG of 7 emirates with highlighted service coverage).
- Factory showcase grid.

### 7. Admin CMS extensions
Add admin pages / fields for anything missing today: hero video URL + poster, logo, hero image, blog posts (new `blog_posts` table), contact details + social links + SEO defaults (extend `site_settings`), materials & FAQ on services, before-image + category on projects, client logos table.

### 8. AI features
- Enhance existing chatbot into an **AI Quote Assistant** flow: guided questions (service, size, quantity, location) → structured quote request written to `quote_requests`, with cited pages.
- Keep floating WhatsApp button; add smart enquiry form on Contact with inline AI field suggestions.

### 9. SEO & performance
- Per-route `head()` audit: unique title/description/canonical/OG on every page including new service and portfolio detail routes.
- JSON-LD: LocalBusiness + Service + FAQ + BreadcrumbList; dynamic sitemap already exists — extend for new routes.
- `fetchPriority`/dimensions on LCP images, `loading="lazy"` elsewhere, `preload` hero poster, hero video `preload="metadata"` only.
- Verify robots.txt + llms.txt.

### 10. Accessibility
- Focus-visible rings on all interactives, `aria-label` on icon buttons, min 44×44 tap targets, `prefers-reduced-motion` respected on hero + reveals, single `<main>` per route.

## Out of scope
- Google Reviews live API (stub with curated quotes now).
- New multilingual copy beyond current EN/AR toggle.
- Payment / e-commerce.
- Replacing existing Supabase schema — only additive migrations.

## Technical notes

**New/changed files (indicative):**
- `src/styles.css` — dark-first tokens, glass/tilt utilities.
- `src/routes/__root.tsx` — default `dark` class, updated meta.
- `src/components/sections/Hero.tsx` — cinematic rebuild.
- New sections: `BeforeAfter.tsx`, `FactoryShowcase.tsx`, `ProcessTimeline.tsx`, `BlogTeaser.tsx`, `CoverageMap.tsx`, `GoogleReviews.tsx`.
- `src/routes/index.tsx` — reordered composition.
- `src/routes/services.$slug.tsx` (new), extend `services.tsx`.
- `src/routes/portfolio.tsx` — masonry + filters + before/after.
- `src/routes/blog.tsx` + `blog.$slug.tsx` (new).
- Admin: `_authenticated/admin.blog.tsx`, extend `admin.settings.tsx`, `admin.services.tsx`, `admin.portfolio.tsx`.
- `src/components/Chatbot.tsx` + `src/routes/api/public/chat.ts` — quote-assistant mode.
- Migrations: `blog_posts` table (+ grants + RLS + owner/admin policies), `client_logos` table, add `materials jsonb`, `faq jsonb` to `services`, add `before_image`, `category_id` on `portfolio_projects` if missing, extend `site_settings` keys.
- `src/routes/sitemap[.]xml.ts` — include new routes.

**Approach:** one PR-sized pass per group (design tokens → hero → home sections → services/portfolio detail → CMS/schema → AI/SEO/a11y polish), verifying build + preview after each.
