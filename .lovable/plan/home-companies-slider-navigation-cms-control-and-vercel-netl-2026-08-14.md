# Home Companies Slider — Navigation, CMS Control, and Vercel/Netlify Deploys

Scope is deliberately narrow: the "Our Companies" slider on the homepage, the admin screen that feeds it, and the production build. No redesign of any other section.

## 1. Slider fixes (highest priority)

File: `src/components/sections/OurCompanies.tsx`

- **Prev/Next buttons**: large circular controls (56px desktop, 44px mobile touch target), always visible (no hover-only), vertically centred outside the card's stacking context, solid high-contrast surface with border + shadow so they read on light and dark backgrounds, hover and pressed states, `aria-label` "Previous slide" / "Next slide". Kept above the background layer and above the info card, never clipped.
- **On small screens** the card is full-width, so the arrows move to a clearly labelled control row directly under the slide (still 44px circles, same styling) instead of overlapping the text.
- **Navigation behaviour**: one slide per press, wrap-around in both directions, single source of truth for the active index. Indicators, card content and background always come from that one index.
- **Autoplay**: single timer at 6s, cleared on unmount, restarted on every manual change (arrow, dot, swipe). Paused on pointer hover/focus inside the slider and while the tab is hidden; resumes after. Respects `prefers-reduced-motion` (no autoplay).
- **Indicators**: larger hit areas, stronger active pill, visible inactive dots, click jumps directly to that slide and resets the timer.
- **Touch**: swipe left = next, swipe right = previous, with a distance threshold so vertical page scrolling is unaffected. RTL-aware.
- **No overflow**: verified at 1440 / 1024 / 768 / 390 px.

Existing visuals (card layout, logo tile, category badge, title, description, Explore Company button, colours, fonts) stay as they are.

## 2. CMS control

The slider is already driven by the existing `companies` table via `publicListCompanies`, and `src/routes/_authenticated/admin.companies.tsx` already covers add / edit / delete / active / logo / banner / website URL. No new table, no duplicate slider system. Gaps to close there:

- **Drag-and-drop reorder** of the company list, saving `sort_order` in one batch — replacing the manual number field (kept as a fallback). Homepage order follows immediately after save.
- **Duplicate slide** action.
- **Optional mobile background image** (`mobile_banner_url`) so portrait screens can use a better-framed shot; falls back to the desktop banner when empty.
- Small correctness pass: cache invalidation so the public homepage query refreshes right after a save, clearer upload/loading/error states, and confirmation the logo and background uploads remain fully separate (existing `logo_url` vs `banner_url`).

Uploads continue through the existing `FileUpload` component and existing Supabase storage buckets.

The hard-coded `ALL_COMPANIES` array stays only as an empty-database fallback; whenever the table has rows, the database is the single source of truth. If you prefer, it can be removed entirely.

## 3. Database and security

One small migration: add the nullable `mobile_banner_url` column to `companies`. Existing tables, data, RLS policies and buckets are left alone — public read stays public, admin writes stay behind the authenticated role check.

## 4. Vercel + Netlify deployment

Current state: the app is a full-stack TanStack Start app built through Nitro, targeting Cloudflare Workers by default — which is where the `cloudflare:workers` import comes from. It is genuine server code (SSR pages, admin server functions, chat API), so a static `dist` folder is not an option and `public/_redirects` would not help.

Fix: make the build target selectable instead of hard-wired.

- Add `vercel.json` and `netlify.toml` that build with Nitro's own Vercel / Netlify presets, so each platform gets serverless functions plus static assets and the Cloudflare-only module is never emitted.
- Keep the default (Lovable/Cloudflare) build untouched so the current live site keeps working.
- Add `.env.example` documenting the required variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`, plus server-side `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` and `LOVABLE_API_KEY`. No credentials committed; no service key in client code.
- Run the production build for each target and fix real errors (no suppressions).

Note: the same Supabase project is reused; Vercel/Netlify deploys need those variables set in their own dashboards, and the service-role key must be configured there for admin/chat features to work.

## 5. Final verification

Playwright pass on the homepage at desktop/tablet/mobile: arrows visible and working, wrap-around, indicators in sync, autoplay timing, swipe, no horizontal overflow, no blank slide. Admin pass: create, edit, reorder, disable, upload, and confirm the homepage reflects it. Then a clean production build for Cloudflare, Vercel and Netlify targets.

## Report at the end

Files changed, tables reused (`companies`) vs created (none), the single column added, policies touched (none), the exact cause of the Cloudflare build failure on Vercel/Netlify and the fix, build results, and any dashboard settings you still need to enter.
