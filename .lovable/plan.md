## Speedex Group — Premium Corporate Site Upgrade

Most of the foundation already exists (admin CMS, portfolio, services CRUD, testimonials, contact forms, chatbot, dark mode, i18n, SEO scaffolding). This plan focuses on the **new hero, the Group/Companies architecture, Location/Maps, and polish** — not rebuilding what's already shipped.

### 1. Cinematic Hero (homepage)

- Replace current `Hero.tsx` with a full-bleed cinematic hero:
  - Background `<video>` (autoplay, muted, loop, playsInline, `preload="metadata"`, poster fallback) sourced from a new admin-controlled `hero_video_url` setting (so you can swap the clip later without code).
  - Layered dark gradient + subtle vignette + grain for text legibility in light/dark.
  - Glassmorphism logo plate + animated tag chip.
  - Headline: **"Transforming Ideas Into Powerful Visual Identities"**
  - Sub: **"Professional Signage, Transport, Contracting, Trading & Automotive Solutions Across UAE"**
  - 3 CTA buttons: **Explore Our Companies** → `/companies`, **View Our Projects** → `/portfolio`, **Contact Us** → `/contact`.
  - Motion: staggered fade/slide-in, slow Ken Burns on poster, scroll-cue indicator.
- Video asset: I'll generate a short cinematic placeholder via the video tool (signage industry montage). You can replace it in the admin later.

### 2. Group / Companies architecture

- New table `companies` (name, slug, tagline, description, services[], hero_image, accent_color, order, active).
- New public route `/companies` — grid of all 5 group companies with premium cards.
- New dynamic route `/companies/$slug` — per-company landing page (hero, services list, CTA, SEO head per company).
- Seed migration with the 5 companies and their service bullets exactly as you provided (no rewording).
- Admin CRUD page `/admin/companies` (list/create/edit/delete + image upload, reusing `FileUpload`).
- Navbar: add **Companies** link; Footer: list group companies.
- Replace existing `OurCompanies` section on the homepage with a live-from-DB version.

### 3. Site settings (hero video, etc.)

- New `site_settings` key/value table (singleton-style) with admin editor at `/admin/settings` for: hero video URL, hero poster, contact email, phone, WhatsApp, address, Google Maps embed URL.
- Hero and Footer/Contact read from this table.

### 4. Location section + Contact page map

- New `Location` section on homepage and a richer map block on `/contact`:
  - Google Maps embed iframe driven by `site_settings.maps_embed_url`.
  - "Get Directions" button → `https://www.google.com/maps/dir/?api=1&destination=...`.
  - Glass card with address, hours, phone, email.

### 5. SEO sweep

- Per-route `head()` already exists; add for `/companies`, `/companies/$slug`, `/admin/*` (noindex).
- Update `sitemap.xml.ts` to include companies routes (loader-driven from DB).
- Expand root JSON-LD to `Organization` with `subOrganization[]` listing the 5 companies.
- Add `Service` JSON-LD on `/services` and `BreadcrumbList` on company detail pages.

### 6. Light/Dark polish

- Audit hero, glass cards, and new company pages for token usage (no hardcoded white/black). Ensure contrast in both themes.

### 7. Out of scope (already done, won't touch)

- Admin auth + RBAC (`user_roles`, `has_role`)
- Portfolio CMS + categories + filtering
- Services CRUD + media
- Testimonials + approval + stars
- Contact/quote inbox + mailto reply
- AI chatbot (Lovable AI)
- Dark mode toggle, i18n (EN/AR), WhatsApp button, back-to-top
- Word-doc content (preserved verbatim per your rule)

### Technical details

- New migration: `companies` + `site_settings` tables, GRANTs, RLS (public SELECT on active rows; admin write via `has_role('admin')`), seed data, storage bucket `company-media`.
- New server fns in `src/lib/admin/content.functions.ts`: `listCompanies`, `getCompanyBySlug`, `upsertCompany`, `deleteCompany`, `getSettings`, `updateSettings`.
- New files: `src/routes/companies.tsx`, `src/routes/companies.$slug.tsx`, `src/routes/_authenticated/admin.companies.tsx`, `src/routes/_authenticated/admin.settings.tsx`, `src/components/sections/Location.tsx`. Rewrite `src/components/sections/Hero.tsx` and `src/components/sections/OurCompanies.tsx`.
- Hero video: generated via `videogen` (5s, 1080p, 16:9) → stored as asset, URL seeded into `site_settings.hero_video_url`.

### Questions before I build

1. **Google Maps embed URL / address** — do you have a specific Maps link and street address for the UAE office, or should I use a generic Dubai Al Quoz pin as placeholder?
2. **Hero video** — OK with an AI-generated 5s cinematic placeholder (you can swap via admin later), or will you upload your own MP4?
3. **Per-company hero images** — generate AI placeholders per company now, or leave empty and you'll upload via the new admin Companies page?
