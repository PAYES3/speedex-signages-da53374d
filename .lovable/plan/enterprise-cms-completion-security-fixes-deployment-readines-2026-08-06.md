# Enterprise CMS completion, security fixes, deployment readiness

This is a large scope, so it is split into phases you can approve and review one at a time. Phase 0 fixes things that are broken or unsafe right now.

## What I verified in the current project

- The homepage builder is live, but the `home` layout was seeded twice: every section type exists as a duplicate pair (one visible, one hidden). This must be de-duplicated before more builder work.
- There are 0 hero slides and only 1 media asset stored, so the hero and most media still fall back to bundled files in code.
- Security linter: `public.can_manage_content` is `SECURITY DEFINER` and currently has EXECUTE granted to `anon` and `authenticated`. `has_role` is `SECURITY INVOKER` with EXECUTE for `authenticated`. These grants are what the two warnings point at.
- Most page content is still read from `src/lib/site-data.ts` (About, Services, Footer, Navbar, Stats, FAQ, Clients, Location, Contact, Careers, Products, Explore).

## Phase 0 — Fix what is broken and unsafe

1. De-duplicate `page_sections` for `home` (keep one row per section, preserve order, drop the hidden clones).
2. Security fixes, done properly rather than suppressed:
   - `can_manage_content` stays `SECURITY DEFINER` (it must read `user_roles` past RLS), but EXECUTE is revoked from `PUBLIC` and `anon`; only `authenticated` and `service_role` keep it. It is used inside RLS policies, which run as the policy owner, so app behaviour is unchanged.
   - `has_role` keeps `SECURITY INVOKER`; EXECUTE revoked from `PUBLIC`/`anon`.
   - Re-run the linter to confirm both warnings clear.
3. Run a production build and fix every blocking TypeScript / import / export / config error found.

## Phase 1 — Existing content loads into edit forms everywhere

The core complaint: admin screens let you add, not edit what already exists. For each CMS screen (Homepage sections, Hero slides, Services, Projects, Companies, Testimonials, Media, Settings) the edit action will open a form pre-filled with the current title, subtitle, description, image, video, buttons, links, order and status, with Save updating in place.

Where a section still has no database row, the admin screen will seed it from the current site defaults on first open, so the form is never blank and the site never silently resets to hardcoded values.

Status controls per item: Draft / Published / Scheduled, Hide-Show, Duplicate, Delete, Preview.

## Phase 2 — Media, hero, About carousel, Groups video

- Media Library: folders (Hero, Logos, Services, Projects, Gallery, Clients, Companies, Certificates, Backgrounds, Documents), drag & drop and bulk upload, search + filter, preview, rename, replace, duplicate, copy URL, hide/show, delete. Every upload anywhere registers into the library automatically.
- One reusable media picker used by every image/video field: Upload from computer, or pick from library, with the current media shown as a thumbnail.
- The existing crop / rotate / resize / zoom / compress / WebP editor is wired into that picker.
- Hero: multiple slides with per-slide video or image, poster, text, two CTAs, order, enable/disable, autoplay + manual navigation. Once slides exist the bundled clips are no longer used.
- About page carousel becomes a database-backed, reorderable slide set.
- Our Groups promo video: full-width, autoplay, muted, looping, lazy-loaded block below Our Groups, stored in Supabase Storage with preview / replace / delete / publish in admin.

## Phase 3 — Remaining pages off hardcoded data

Convert the remaining pages to database-driven sections using the same builder: About, Services, Our Groups, Projects, Gallery, Clients, Testimonials, Careers, Contact, Footer. `site-data.ts` becomes seed data only, used once to populate the database, never as a live fallback.

## Phase 4 — Governance and operations

- Per-page SEO record: meta title, description, keywords, canonical, Open Graph, Twitter card, schema JSON-LD, robots; sitemap generated from published pages.
- Version history with restore and undo across pages, media, services, projects, companies, SEO and settings; a simple field-level change list for comparison.
- Roles: Super Admin, Admin, Content Manager, Editor, Viewer, enforced in both RLS and the admin UI.
- Inbox: contact forms, quote requests, callback requests, WhatsApp enquiries with search, filter, read/replied flags, CSV export, delete.
- Dashboard: counts, recent enquiries, recent uploads, activity timeline, storage usage, plus notifications for publish, upload failure, new enquiry, login activity and storage warnings.
- Global settings screen driving logo, favicon, contact details, social links, colours, fonts, radius, container width, animation speed and footer copyright site-wide.

## Phase 5 — Performance and deployment

- Lazy loading, WebP output, responsive image sizes, font preloading, route-level code splitting, cached queries with invalidation on publish.
- Full production build verification and fixes.

## Technical notes

- Data model stays generic (`page_sections` + JSON `data`, `media_assets`, `content_versions`), so blog, careers, products, portals and multi-language can be added later without redesigning tables.
- Publishing updates the frontend immediately through query invalidation; no rebuild is needed for content.

## One thing to confirm about deployment

This project is a TanStack Start app configured for Lovable's Cloudflare-based hosting, and the backend (database, storage, auth, server functions) is Lovable Cloud. Pushing to GitHub works, but a Vercel deploy is not a supported target for this stack as configured — it would need a separate adapter and its own environment variables, and Lovable Cloud secrets are not exposed for that. I will guarantee a clean production build and a working Lovable publish. Tell me if Vercel specifically is a hard requirement and I will scope that separately.
