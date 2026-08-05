# Enterprise CMS for Speedex Signages

Goal: every page, section, text, image, video, logo and setting is managed from the Admin Panel, stored in the backend, and reflected on the live site instantly — no code edits, no rebuilds, no resets to defaults.

This is a large build, so it ships in four phases. Phase 1 covers the four capabilities you selected.

## Phase 1 — Foundation (this build)

### A. Homepage section builder
- New admin page **Homepage Builder** listing all sections: Hero, About, Services, Our Groups, Statistics, Why Choose Us, Process Timeline, Factory Showcase, Before & After, Projects, Gallery, Clients, Testimonials, FAQ, Contact, Footer.
- Per section: show/hide toggle, drag-and-drop reorder, edit fields (heading, subheading, body, CTA label + link, background image/video), duplicate, delete, add section from a library of section types.
- Rich text editor for long-form fields: bold, italic, underline, headings, bullet/number lists, tables, links, images, undo/redo, full-screen.
- Homepage renders strictly from this order and visibility — nothing hardcoded.

### B. Multi-slide hero + Our Groups video
- Hero becomes a slide list: each slide has video **or** image, title, subtitle, description, CTA buttons, order, active flag.
- Auto-slider with manual arrows/dots; slider can be disabled to show a single slide.
- Our Groups gains a full-width promo video below the company list — autoplay, muted, looping, lazy-loaded, responsive. Your current uploaded video becomes its default and stays until you replace it.

### C. Media Library upgrade
- Folders: Hero, Logos, Services, Projects, Gallery, Clients, Companies, Certificates, Backgrounds, Documents.
- Grid with search, folder/type filter, preview, rename, replace-in-place (all usages update), duplicate, delete, copy URL, bulk + drag-and-drop upload, show/hide.
- Built-in image editor before upload: crop, rotate, resize, zoom, compress, convert to WebP.
- Video entries carry thumbnail, title, description, order and active status.
- Uploaded media is permanent; the site never falls back to a built-in default once you have set one.

### D. Global website settings + theme
- One settings screen: company name, logo, favicon, description, address, phone, WhatsApp, email, Google Maps, working hours, social links, footer copyright.
- Appearance: primary / secondary / accent colours, font family, base font size, button style, border radius, container width, animation speed — applied site-wide as live theme variables.

### E. Publishing workflow
- Every content record gets: draft / published state, publish + unpublish, schedule a future publish time, and a preview link that shows drafts.
- Version history on pages, sections, services, projects, companies, media, SEO and settings: list previous versions, compare, restore, undo last update.
- Roles: Super Admin, Admin, Content Manager, Editor, Viewer, with permissions enforced in the backend, plus a user management screen for Super Admin.

### F. Content migration
- All text, images and videos currently written in code are imported into the database as their starting values, so the admin panel shows the real live site content from day one and nothing resets.

## Phase 2 — Remaining page CMS
About, Services, Our Groups (logo, banner, gallery, services, contact, SEO, order, active, duplicate, reorder), Projects, Gallery, Clients, Testimonials, Careers, Contact, Footer — each with the full add / edit / replace / delete / duplicate / hide / draft / publish set.

## Phase 3 — Enquiries, dashboard, SEO
- Contact forms, quote requests, callback requests and WhatsApp enquiries in one inbox: search, filter, CSV export, mark read / replied, delete.
- Dashboard tiles: totals for companies, services, projects, gallery images, clients, testimonials; recent enquiries; recent uploads; activity timeline; storage usage.
- Notifications for publish success, failed upload, new enquiry, login activity, storage warnings.
- Per-page SEO: meta title, description, keywords, canonical, Open Graph, Twitter cards, schema, robots; sitemap generated from published pages.

## Phase 4 — Performance pass
Lazy loading, WebP and responsive images everywhere, optimized font loading, code splitting, caching, and a Lighthouse pass targeting Desktop 95+, Mobile 90+, SEO 100, Accessibility 100, Best Practices 100.

## Technical notes

New backend tables (all with row-level security and role-based policies):
- `pages` — one row per page, with SEO fields and publish state.
- `page_sections` — section type, page reference, sort order, visibility, JSON field payload, draft/published state, scheduled publish time.
- `hero_slides` — media reference, title, subtitle, description, CTA buttons, order, active.
- `content_versions` — polymorphic snapshot table (`entity_type`, `entity_id`, JSON payload, author, timestamp) powering history, compare and restore.
- `site_settings` extended with branding and theme keys.
- `media_assets` extended with `hidden`, `duplicated_from`, `thumbnail_url`, `title`, `description`, `sort_order`, `active`.
- `app_role` enum extended to `super_admin`, `admin`, `content_manager`, `editor`, `viewer`; permission checks via a security-definer role function.

Frontend:
- Section registry maps a section type string to its React component, so `page_sections` drives homepage rendering and new section types are added without touching page code.
- Theme tokens read from settings and injected as CSS variables at the root, so colour/font/radius changes apply everywhere immediately.
- Rich text stored as sanitized HTML and rendered through a sanitizer.
- Image editing and WebP conversion happen in the browser before upload; scheduled publishing runs off a database-side check at read time so no external scheduler is needed.
- Media uploads go to backend storage; frontend reads published content through cached queries that revalidate on publish, so changes appear without a rebuild.

## Scope note
Phase 1 alone is a substantial build. Phases 2–4 follow in later turns; the database design above is future-ready for Blog, Careers, Products, CRM, portals and multi-language without redesign.
