## Goal

Expand the Speedex Signages site with an admin CMS (services, portfolio, reviews, contact inbox), polish the homepage, and keep all current features (SEO, dark mode, Arabic, chatbot, video hero).

## Important note on the admin credentials

You asked for username `Speedex_Signages` / password `Speedex@Siganges.com`. I can't hardcode credentials in the client (anyone viewing the site source could read them and take over the database). The correct, equally one-step approach: I seed a single admin account in Lovable Cloud Auth using your email + that password, gate the admin panel with proper login, and grant admin via a separate `user_roles` table. You'll log in at `/admin/login` with:

- email: `admin@speedexsignages.ae` (or any email you tell me — Supabase Auth needs an email, not a username)
- password: `Speedex@Siganges.com`

Tell me the email you want and I'll seed it.

## What I'll build

### 1. Backend (Lovable Cloud)

New tables, all with RLS + GRANTs:
- `services` — title, slug, description, icon, image_url, sort_order, published
- `portfolio_projects` — title, slug, category, description, cover_url, media (jsonb of image/video URLs), published, sort_order
- `portfolio_categories` — name, slug
- `testimonials` — name, company, rating (1–5), content, avatar_url, approved, created_at
- `user_roles` + `app_role` enum + `has_role()` SECURITY DEFINER (per the user-roles rule)

Reuse existing `contact_messages` and `quote_requests` for the inbox.

Storage buckets (private, signed URLs for admin uploads; public read for published media):
- `services-media`
- `portfolio-media`
- `testimonial-avatars`

RLS pattern:
- Public can SELECT only `published = true` rows (services, portfolio) and `approved = true` testimonials.
- Public can INSERT into `testimonials` (defaults to `approved = false`) via a server function.
- Admin (has_role admin) can do everything via authenticated server functions.

### 2. Admin panel (`/admin/*`, gated by `_authenticated` + admin role)

- `/admin/login` — email+password sign-in
- `/admin` — dashboard: counts (messages, pending reviews, services, projects), recent activity
- `/admin/services` — list / create / edit / delete, upload service image from local PC
- `/admin/portfolio` — list / create / edit / delete projects, multi-file image+video upload, category management, drag-to-reorder
- `/admin/reviews` — pending queue with Approve / Reject, rating display
- `/admin/messages` — contact + quote inbox; one-click "Reply" opens `mailto:` with prefilled subject/body
- `/admin/media` — browse uploaded files per bucket, delete

### 3. Public site changes

- Homepage polish: add a live "Featured Projects" strip (from portfolio), a "What clients say" carousel (approved testimonials only), and keep the existing video hero, glassmorphism, dark mode, Arabic, chatbot. No layout overhaul — just real CMS content replacing the current static testimonials/work mentions.
- `/services` — read from `services` table (falls back to current static list if empty so the site never looks empty).
- `/portfolio` — new route. Grid with category filter chips, lazy-loaded images, video lightbox, animations. SEO `head()` + JSON-LD `ItemList`.
- Testimonials section — public "Leave a review" form (name, company, rating stars, message); submissions go to moderation queue.
- Contact form already exists — keep it; ensure submissions land in `/admin/messages`.

### 4. SEO + perf (incremental on top of what's already done)

- Add `/portfolio` and each portfolio project to `sitemap.xml.ts` (driven by DB).
- Per-route `head()` titles/descriptions for `/portfolio` and `/admin/*` (noindex on admin).
- `Product`-style JSON-LD on portfolio items, `Review`/`AggregateRating` JSON-LD where testimonials are shown.
- Lazy-loaded images with width/height + `loading="lazy"` on all CMS imagery.

### 5. AI chatbot

Already exists at `/api/public/chat` and works against your current site copy. I'll extend its system prompt to include the live services + portfolio list (server-side fetch) so it can answer specific project/service questions. No UI change.

### What I'm NOT changing

- Existing routes, copy uploaded from your Word docs, brand colors, fonts, animations, navbar/footer, dark mode, Arabic toggle, WhatsApp button, chatbot UI.
- Logo size (already enlarged in earlier turn).
- Existing security migrations.

## Technical details

- Stack stays TanStack Start + React + TS + Tailwind + Lovable Cloud (Supabase). No new frameworks.
- All admin DB writes via `createServerFn` + `requireSupabaseAuth` + `has_role(uid, 'admin')` check. Public reads via the publishable-key server client with narrow `TO anon` policies.
- Uploads via `supabase.storage.from(bucket).upload(...)` from the admin browser client (admin is signed in; RLS allows admin INSERT).
- Routing: `/admin` lives under `src/routes/_authenticated/admin/*`; a child `beforeLoad` calls a `requireAdmin` server fn and redirects non-admins to `/`.
- Seed: a migration inserts your email into `auth.users` (via admin API in a one-shot server fn the first time you visit `/admin/login`, OR I can ask you to sign up once and then I grant the role — tell me which you prefer).

## Open questions before I build

1. What email should the admin account use? (Supabase Auth requires an email.)
2. Office address + Google Maps embed URL for the Location section — do you have specific coordinates / Maps link, or should I use a generic Dubai pin until you provide one?
3. Any existing portfolio content (images/case studies) to seed, or start empty and you'll upload via admin?

Once you confirm (1) and (2), I'll switch to build mode and ship it in one pass.