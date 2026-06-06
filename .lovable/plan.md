## Goals
Improve UX (visible navbar, working hero video/WhatsApp, prominent logo), apply the uploaded Services content verbatim, add an "Our Companies" section, and deliver comprehensive UAE-focused SEO across the site.

---

## 1. Hero video background
- `src/components/sections/Hero.tsx`: replace the still image with `<video autoPlay muted loop playsInline preload="metadata" poster={heroSignage}>` using a signage/manufacturing-relevant free Coverr/Pexels MP4 (e.g. neon storefront / workshop). Keep the existing image as the `poster` fallback. Tone down overlay so it stays readable in light mode.
- Keep H1 "We Light Up Your Brand".

## 2. Navbar visibility & sticky polish (`src/components/Navbar.tsx`)
- Default state (top of page) gets a solid light background `bg-background/95 backdrop-blur` + bottom border, not transparent — fixes the invisible nav over the hero.
- Scrolled state keeps glass + shadow.
- Bigger logo: `h-12 sm:h-14` (was `h-9`), plus `drop-shadow-sm` for contrast.
- Strengthen link contrast (`text-foreground` + `font-semibold`) and underline-on-hover indicator.
- Keep sticky (`fixed top-0`), mobile menu, dark mode toggle, language toggle.

## 3. WhatsApp button (`src/components/WhatsAppButton.tsx` + `site-data.ts`)
- Update `COMPANY.whatsapp` to a real-format UAE international number (placeholder `971501234567` — flag in plan for user to replace) and `COMPANY.phone` accordingly.
- Use `https://wa.me/<digits>?text=<encoded>` with a richer prefilled message ("Hello Speedex Signages, I would like a quote for …. My name is …."). Use `encodeURIComponent`.
- Add `rel="noopener noreferrer"`, visible WhatsApp SVG icon (not generic chat bubble), tooltip label, and slight pulse ring.

## 4. Services page = exact DOCX content (`src/routes/services.tsx` + `src/lib/site-data.ts`)
- Replace the `PROCESS` list with the 5 items verbatim from the DOCX (Concept & Design, Fabrication/Printing, Installation, Maintenance and Repair, Digital Signage Solutions).
- Add new structured data sections rendered on `/services`:
  - **Exterior / External Signages** (3D Illuminated, Metal Signs, Illumination Styles, Flags, Banners, Billboards)
  - **Interior / Internal Signages** (Reception Signs, Wayfinding & Directional, Room/Office Plaques, Hanging Directional)
  - **Compliance and Safety Signs** (Compliant, Safety/Exit, Regulatory)
  - **Promotional & Informational Signage** (POP, Digital Displays/Kiosks, Floor Graphics, Wall Graphics, Frosted Glass, Wide Format)
  - **Wide Format Printing** (Signage & Displays, Vehicle Wraps, Decor & Murals, Textiles, Offset & Screen Printing)
- Each rendered as a titled card grid with the exact DOCX bullet copy (no paraphrase, no placeholder). Keep existing service image grid above as the visual catalog.

## 5. "Our Companies" section
- New component `src/components/sections/OurCompanies.tsx` rendering 4 cards:
  - Speedex Signages — internal link `/`
  - Arabsat — https://www.arabsat.ae
  - Excellent General Trading — https://www.excellentgroup.ae
  - Speedex Auto Workshop — https://www.speedexgroups.ae
- Each card: company name, one-line description, external link with `target="_blank" rel="noopener"`. Logo placeholder circle with initials (since we don't have logos).
- Mount on Home (`src/routes/index.tsx`) below stats/testimonials, and also on About page.

## 6. Logo prominence
- Increase navbar logo size (see §2).
- Add a larger logo lockup at the top of the Hero on mobile (since the dark hero swallows it) — small inline logo + wordmark above the H1, white-tinted for contrast.

## 7. SEO overhaul
### Per-route metadata (`head()` in every route file)
For `/`, `/about`, `/services`, `/products`, `/explore`, `/careers`, `/contact`:
- Unique `<title>` ≤ 60 chars with primary keyword (e.g. `Signage Company in UAE | Speedex Signages — LED, Acrylic, 3D`).
- Unique meta description ≤ 160 chars naturally weaving target keywords.
- `og:title`, `og:description`, `og:url` (relative), `og:type` (`website` / leaf appropriate), `twitter:card="summary_large_image"`, `og:image` set to `/og.jpg` (will generate one hero share image and save to `public/og.jpg`).
- `<link rel="canonical">` on each leaf (relative href) — not on root, per TanStack dedupe rule.

### Structured data (JSON-LD via `head().scripts`)
- Root: `Organization` + `LocalBusiness` (name, url, logo, address Al Quoz Dubai, areaServed UAE, telephone, sameAs social links).
- `/services`: `Service` items + `ItemList` of services.
- `/products`: `ItemList` of products.
- `/contact`: `LocalBusiness` repeat with `ContactPoint`.
- FAQ section: `FAQPage` schema generated from the existing FAQ array.
- Breadcrumbs: `BreadcrumbList` on inner pages.

### sitemap.xml & robots.txt
- Convert static `public/sitemap.xml` to a server route `src/routes/sitemap[.]xml.ts` listing all 7 public routes with `lastmod` = build time and priorities. Delete the static file.
- `public/robots.txt`: keep `User-agent: *` + `Allow: /`, add `Sitemap: /sitemap.xml` line (relative is invalid per spec → use the preview URL with a TODO until a custom domain is set; ask user during build if they want their domain baked in).

### Image alt tags
- Audit all `<img>` in Hero, Navbar logo, Services cards, Products cards, Explore portfolio, About, Testimonials, OurCompanies. Replace generic `alt={s.title}` with descriptive UAE-keyword alts like `"LED illuminated channel letter signage installation in Dubai by Speedex"`.

### Content / on-page SEO
- Add an SEO content block on the Home page below Stats: 2–3 short paragraphs introducing "Speedex Signages — A Leading Signage & Branding Company in the UAE", weaving in the target keyword list naturally (no stuffing). Include H2/H3 hierarchy.
- About page: expand intro paragraph with location, years of experience, services covered, UAE-wide coverage (Dubai, Abu Dhabi, Sharjah, Ajman, RAK).
- Services page: add intro paragraph + per-section short descriptions referencing UAE.
- Products page: add intro paragraph; rename product cards to use SEO-friendly titles (e.g. "LED Channel Letter Signage — Dubai").
- Contact page: H1 includes "Contact Speedex Signages — UAE Signage Company"; add NAP block (Name/Address/Phone) in structured `<address>` element.

### Technical SEO / Core Web Vitals
- Hero video: `preload="metadata"`, `poster`, lazy by virtue of being above-the-fold (do not lazy). Preload the poster image via `head().links` on `/` with `rel="preload" as="image" fetchpriority="high"`.
- All non-hero images keep `loading="lazy"` and add `decoding="async"` + explicit `width`/`height` to reduce CLS.
- Ensure single `<h1>` per page; demote duplicates to `<h2>`.
- Add `lang`/`dir` to `<html>` based on i18n (already partially in place — keep).
- Confirm semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` with aria-labels).

### URLs
- Current routes are already SEO-friendly (`/services`, `/products`, etc.) — no changes needed. Confirm no hash navigation is used for primary nav.

## 8. Responsive & theme preservation
- All new sections use existing semantic tokens (`bg-card`, `text-foreground`, `text-primary`) so dark mode and Arabic RTL work unchanged.
- New OurCompanies + SEO content sections tested at mobile/tablet/desktop breakpoints via existing Tailwind grid utilities.

---

## Out of scope / assumptions
- Real Speedex phone/email/WhatsApp numbers: using realistic placeholders; will flag for user replacement.
- Logos for Arabsat / Excellent / Speedex Auto: using initials avatars (no logo files provided).
- Arabic translations of the new DOCX-sourced content: English only this round (existing `i18n.ts` AR strings remain for UI chrome).
- No backend / schema changes.

## Files touched (summary)
- Edit: `Navbar.tsx`, `WhatsAppButton.tsx`, `sections/Hero.tsx`, `lib/site-data.ts`, `routes/__root.tsx`, `routes/index.tsx`, `routes/about.tsx`, `routes/services.tsx`, `routes/products.tsx`, `routes/explore.tsx`, `routes/careers.tsx`, `routes/contact.tsx`, `public/robots.txt`
- Create: `components/sections/OurCompanies.tsx`, `components/sections/SeoContent.tsx`, `routes/sitemap[.]xml.ts`, `public/og.jpg` (generated)
- Delete: `public/sitemap.xml`
