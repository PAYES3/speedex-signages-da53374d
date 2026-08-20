# Separate Home "Our Companies" and "Our Groups" sliders + Vercel routing fix

## What changes for you

Today one company list feeds both the Home/About "Our Companies" slider and the Our Groups page. After this change you get two independent slide sets in the admin panel, while company records and logos stay exactly as they are.

- **Admin > Our Companies — Home**: the slides behind the Home page slider (also shown on About).
- **Admin > Our Groups**: a new slider added above the existing card grid on the Our Groups page.
- The current company editor stays where it is and keeps owning names, logos, descriptions and website links.

Each slide links to a company (for logo, name, description) and adds its own background image, order and visibility. Editing one slide set never affects the other, and never touches `logo_url` or any company field.

## Data

New table `slider_slides`:

- `id`, `context` (`home_our_companies` | `our_groups`), `company_id` (nullable reference to companies), `image_url`, `mobile_image_url`, `title`, `description`, `sort_order`, `visible`, `created_at`, `updated_at`
- Grants + RLS: public read only where `visible = true`; create/edit/delete restricted to admin/content-manager via the existing `can_manage_content` check.
- Seed: one `home_our_companies` slide and one `our_groups` slide per existing active company, copying the current banner / mobile banner / hero image so the site looks identical on day one.
- No change to the `companies` table.

## Backend

In `src/lib/admin/content.functions.ts`:

- `publicListSlides({ context })` — public read returning visible slides joined with the company's `name`, `slug`, `logo_url`, `tagline`, `description`, `website_url`, `cta_label`.
- Admin CRUD (`listSlides`, `upsertSlide`, `deleteSlide`, `reorderSlides`) behind `requireSupabaseAuth`.

Queries are keyed `['slides', context]`, so the two contexts never share cache and neither falls back to the other.

## Frontend (no visual redesign)

- `OurCompanies.tsx` gains a `context` prop defaulting to `home_our_companies` and reads slides instead of companies. Animation, arrows, indicators, 6s autoplay, swipe, responsive card layout, logos and typography are unchanged — only the data source moves.
- `about.tsx` and the Home section renderer keep rendering the same component, so both follow "Our Companies — Home".
- `companies.tsx` gets the same slider above the existing grid with `context="our_groups"`. The card grid, video showreel and copy stay as they are.

## Admin UI

- New routes `admin.home-companies.tsx` ("Our Companies — Home") and `admin.group-slides.tsx` ("Our Groups slider"), both using one shared slide-manager component: slide list with company picker, image upload/replace through the existing media system, preview thumbnail, visibility toggle, up/down reorder and delete.
- `AdminShell.tsx` sidebar gains the two entries; the existing company editor stays.
- `admin.manual.tsx` updated to describe the split.

Uploads use the existing storage/media flow; public reads of `media_assets` keep requiring `active = true AND hidden = false`.

## Vercel "Page Not Found"

`vercel.json` sets `framework: null` with a Nitro `.vercel/output` build, so Vercel serves that Build Output tree only if its config and routing manifest are complete. Steps:

1. Run `DEPLOY_TARGET=vercel bun run build` locally and inspect `.vercel/output/config.json`, the static tree and `functions/__server.func`.
2. If the config lacks a catch-all route to `__server`, emit a correct `.vercel/output/config.json` from the post-build script (filesystem handler first, then `{ "src": "/(.*)", "dest": "/__server" }`) so `/`, `/about`, `/services`, `/portfolio`, `/contact`, `/companies` and `/admin` are served by the SSR function on direct navigation and refresh.
3. Keep install/build commands unless inspection shows the output directory is wrong; document required env vars (`VITE_SUPABASE_*`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`) in `.env.example`.

No auth or security checks are relaxed.

## Validation

Production build with no TypeScript errors; browser pass at 390/768/1440 confirming Home, About and Our Groups sliders render, that changing one context's background leaves the other untouched, that company logos and the hero video are unchanged, plus a check of the Vercel build output confirming nested routes resolve to the SSR function.