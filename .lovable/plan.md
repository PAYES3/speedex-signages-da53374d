## Goal
Turn Speedex Signages into a bright, Fortune-500-style corporate website (white/light-grey, premium spacing) with a full admin CMS so text, images, companies, services, projects, contact and SEO are all editable without code.

This is a large program of work, so it ships in five phases. Each phase is verifiable on its own; I'll do them in order unless you re-prioritise.

---

## Phase 1 — Bright corporate design pass
- Strip every dark background, grid/pattern overlay, abstract texture and dark decorative graphic from all sections (Hero, Stats, WhyChoose, ProcessTimeline, FactoryShowcase, BeforeAfter, CTABanner, SeoContent, Footer).
- New surface rhythm: white → soft light-grey (#F7F8FA) → white alternating bands, very subtle gradients only.
- Hero video: brightness/exposure filter on the video itself (`filter: brightness(1.25) contrast(0.95) saturate(1.05)`), black overlay replaced by a soft white/near-white gradient scrim; headline switches to charcoal with a light halo so it stays readable.
- Consistent spacing scale (section padding, container widths), unified card style (12–16px radius, soft layered shadow, subtle border), refined hover states, tuned button styles, smooth scrolling, scroll-reveal timing cleanup.
- Footer moves from charcoal to light corporate grey with an orange accent rule.

## Phase 2 — Header, logo and Our Groups mega menu
- Rename nav item to "Our Groups" and turn it into a premium mega-menu dropdown: each company shows logo, name, short description and a "View Details" button, with staged hover animation. Mobile gets an accordion equivalent.
- Single source of truth for the logo: admin uploads once (`site_settings.logo_url`) and it drives navbar, footer, favicon link, Open Graph/Twitter image and the loading screen.

## Phase 3 — Media Library + image pipeline
- New `media_assets` table (folder, filename, url, mime, size, width/height, alt) + admin **Media Library** page: bulk upload, drag & drop, folder filter (Logos, Hero, Services, Projects, Gallery, Clients, Partners, Certificates, Backgrounds, Documents), search, preview, rename, delete.
- Upload pipeline in the browser before storage: resize to sensible max dimensions, compress, convert to WebP, then upload. Simple square/16:9 crop tool on upload.
- An `<ImagePicker>` reused by every admin form so images are always chosen from the library or uploaded inline.

## Phase 4 — Full CMS coverage
- Extend the `companies` table with banner, email, phone, address, industry, gallery, services, SEO fields — full add/edit/delete in admin.
- Extend `services` with features, gallery, SEO. Extend `portfolio_projects` with client, location, completion date, gallery.
- New `page_content` table (page + section + key → value) so every heading, paragraph, stat, button label and image on Home/About/Services/Projects/Gallery/Careers/Contact is editable. Frontend sections read from it with the current copy as seeded defaults, so nothing goes blank.
- New admin pages: Homepage, About, Gallery, Clients, Testimonials (exists), SEO, Contact — plus reorganised sidebar: Dashboard, Website Settings, Homepage, About, Services, Our Groups, Projects, Gallery, Clients, Testimonials, Media Library, SEO, Contact, Users.
- Save invalidates the relevant query keys so the public site refreshes immediately — no rebuild.

## Phase 5 — SEO & performance
- Admin-editable per-page SEO: title, description, keywords, canonical, robots, OG/Twitter image, schema type; routes read these with current values as defaults. Sitemap picks up all dynamic slugs.
- `loading="lazy"` + width/height on every non-LCP image, `fetchPriority="high"` on the LCP one, responsive `srcset` from the WebP pipeline, hero video `preload="metadata"` with poster.
- Accessibility sweep: focus-visible rings, aria-labels on icon buttons, 44px tap targets, contrast checks in the new light palette.

---

## Technical notes
- Migrations (additive only): `media_assets`, `page_content`, new columns on `companies`, `services`, `portfolio_projects`, new `site_settings` keys. Each with GRANTs, RLS, public read for published rows, admin-only writes.
- Image processing runs client-side with Canvas (resize/crop/WebP) before hitting storage — no server image binaries, which the edge runtime can't run.
- Content reads go through public server functions + TanStack Query; admin writes through `requireSupabaseAuth` server functions.

## Out of scope for now
- Backup and Analytics admin pages (Analytics would need a separate provider; Backup is handled by the platform's data export).
- Rewriting any copy that came from your uploaded Word documents — it moves into the CMS verbatim.
