# Our Companies Slider — Fully CMS-Controlled (7 Slides)

Scope: the homepage "Our Companies" slider and the Admin → Companies screen only. The top hero slider and all other sections stay untouched.

## Current state (verified in the database)

The `companies` table already holds exactly 7 active records, in this saved order:

1. Arabsat Transport Passengers by Buses LLC (sort 0)
2. Speedex Auto Workshop (1)
3. Excellent General Trading (2)
4. Speedex Cars Rental (4)
5. Speedex Signages (4)
6. Excellent Field Contracting (5)
7. Speedex Facility Management (6)

Confirmed today:
- All 7 have a logo saved.
- **None of the 7 has a background image saved** (`banner_url` and `mobile_banner_url` are empty for every row) — that is why the slides currently fall back to shared stock/showcase imagery. The fields exist and are wired; they simply have never been filled in.
- Two rows share sort order 4, so their relative position is arbitrary.
- The slider already reads live rows through `publicListCompanies`, and already has one active index, wrap-around, 6s single-timer autoplay with reduced-motion and tab-hidden handling, swipe, circular arrows and indicators. That behaviour is kept as-is.

Field mapping (no duplicates created):
- Company title → `name`
- Category / badge → `tagline`
- Description → `description`
- Logo → `logo_url`
- Background → `banner_url`; mobile → `mobile_banner_url`
- Explore URL → `website_url` (external) or the internal `/companies/<slug>` page
- Order → `sort_order`; visibility → `active`

## 1. Database (one small migration)

Add a single nullable column: `cta_label` on `companies` (button text per company, blank = "Explore Company"). Everything else is reused. No table is created, no row deleted or recreated, no ids or existing values touched.

## 2. Admin → Companies edit form

Reorganise the existing edit form into clearly labelled groups, and add the missing controls:

- **Company basic information** — Name, Category (tagline), Description, Website URL, Explore button text (new).
- **Company logo** — current preview, upload / replace / remove. Independent of the background.
- **Slider background** — current preview, upload / replace / remove (`banner_url`).
- **Mobile background (optional)** — upload / replace / remove; empty falls back to the desktop background.
- **Display** — Active toggle and sort order.

Uploads keep using the existing FileUpload component and existing storage buckets; logo and background write to different fields and can never overwrite each other.

## 3. Live slide preview in admin

Beside the edit form, a preview card that mirrors the real homepage slide: background image, logo tile, category badge, title, description and Explore button, updating as fields change, with a desktop/mobile toggle so the mobile background can be checked before saving.

## 4. Ordering

Keep the existing drag-and-drop list; on drop it writes clean sequential `sort_order` values 0–6 (which also resolves the duplicate 4s). The public query invalidates on save so the homepage order updates immediately.

## 5. Homepage slider

- Renders one slide per active company record — 7 slides, 7 indicators — from the database. No per-company hard-coded components or image imports.
- Background per slide: `mobile_banner_url` on portrait/small screens, else `banner_url`, else hero image, else the generic fallback.
- Explore button uses the company's `cta_label` and links to `website_url` when it is an external URL, otherwise to `/companies/<slug>`.
- The `ALL_COMPANIES` array stays only as an empty-database fallback.
- Navigation, autoplay, indicators, swipe and mobile control row keep their current behaviour; only data wiring and the button label/URL change.

## 6. Background images

Because no row currently has a background, after the code change every slide still shares the generic fallback until images are uploaded. Two options — tell me which you prefer:
- I upload one distinct background per company from existing project/media assets so all 7 differ immediately, or
- you upload the 7 backgrounds yourself in Admin → Companies once the fields are in place.

## 7. Vercel / Netlify runtime

The build now completes for both targets (the Cloudflare-only MCP module is excluded from non-Cloudflare bundles). "This page didn't load" after a successful build is a runtime failure, and the cause is not yet confirmed — the usual suspects are missing environment variables on the platform (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`, plus the three `VITE_` values) and the Nitro output directory Vercel serves.

Steps: reproduce a production build locally for the Vercel target, inspect the emitted output/config, verify the SSR entry and server-function routes are wired to the right output paths, then have you paste the Vercel runtime log for the failing request so the actual error drives the fix. I will not call the deployment done on a green build alone. Secrets stay server-side; RLS and admin write policies are untouched.

## Verification

Playwright pass on the homepage at desktop, tablet and mobile: 7 slides and 7 indicators, per-slide background/logo/category/title/description/button all from the same record, prev/next with wrap-around, indicator jumps, autoplay timing, swipe, no horizontal overflow. Admin pass: edit each field, upload each image type, reorder, disable/enable, and confirm the homepage reflects it.
