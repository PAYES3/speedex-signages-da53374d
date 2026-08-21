# Fix the Vercel production runtime failure

## What the error actually is

"This page didn't load — Something went wrong on our end." is not a Vercel 404 or an SPA-routing failure. It is this app's own error screen, rendered by the root `errorComponent` in `src/routes/__root.tsx` and by the SSR fallback in `src/server.ts`. It appears when the React tree (or SSR) throws. Routing is fine — the server function is being reached, the app is crashing inside it.

## Most likely cause (to be confirmed, not assumed)

The app reads its backend configuration from environment variables in three separate places:

- Browser client (`src/integrations/supabase/client.ts`): `VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`, falling back to `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY` during SSR. It **throws** when both are missing.
- Server admin client (`src/integrations/supabase/client.server.ts`): `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. Every public data read on the site (home sections, companies, sliders, services, portfolio, reviews) goes through this client. It **throws** when either is missing.
- Chat route: `LOVABLE_API_KEY`.

On Lovable these are injected automatically. On Vercel they must be added by hand, and `VITE_*` values are baked in at **build** time, so they must exist in the Vercel project before the build runs. If they are absent, the very first render throws and the whole page becomes the error screen — exactly the reported symptom.

Step 1 of the work is to confirm this against the real deployment rather than treat it as settled.

## Plan

1. **Reproduce and confirm the root cause**
   - Run the real production build in the sandbox (`DEPLOY_TARGET=vercel bun run build` plus the Node adapter step) and boot the generated `.vercel/output` function locally.
   - Run it once with the Supabase env vars present and once with them stripped, and compare against the deployed behaviour. Only the run that reproduces the exact error screen decides the diagnosis.
   - Also verify the emitted `.vercel/output/config.json` still carries the catch-all route to the `__server` function, so `/companies`, `/about`, `/admin`, etc. resolve on direct load and refresh.

2. **Make missing configuration fail readably instead of blanking the site**
   - Public pages should still render their static shell when the backend is unreachable: the public read server functions will return empty results and log the configuration error instead of throwing, so the site degrades to "no CMS content yet" rather than a full-page crash.
   - The root error screen gets a short, non-secret hint when the failure is a configuration error ("backend configuration is missing"), so the cause is visible without opening logs. No keys or URLs are printed.
   - No secret is hard-coded, no service-role key reaches the browser, no second Supabase client is created — the existing clients are reused.

3. **Only fix real code faults found in step 1**
   If the reproduction shows something other than (or in addition to) missing env vars — a browser global touched during SSR, a case-sensitive import, a missing asset, an adapter mismatch — that specific fault gets fixed. No redesign, no UI change, no schema change, no feature removal.

4. **Document the required Vercel environment variables**
   Update `.env.example` / the admin manual with the exact list Vercel needs, split into build-time public and runtime server-only.

5. **Verify**
   - Production build passes with no TypeScript, Vite, or unresolved-import errors.
   - The built Vercel output is booted locally and driven with a browser: `/`, `/about`, `/companies`, `/services`, `/portfolio`, `/explore`, `/products`, `/contact`, `/admin` — each loaded directly and refreshed, checking Supabase data, sliders, company cards, images, and the browser console.
   - The final report states the confirmed root cause, files changed, build result, verification evidence, and any Vercel variable still to be added manually. I will not claim the live deployment is fixed based on a local run alone — the last confirmation has to come from the deployed URL after the env vars are in place.

## Environment variables to set in the Vercel project

Build-time (public, inlined into the browser bundle):
`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`

Runtime (server-only, never `VITE_`-prefixed):
`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`

These must be added in the Vercel dashboard and the deployment redeployed; no code change can substitute for them.

## Files expected to change

- `src/lib/admin/content.functions.ts` and `src/lib/admin/cms.functions.ts` — public reads degrade instead of throwing
- `src/routes/__root.tsx` — configuration-error hint on the existing error screen
- `.env.example`, `src/routes/_authenticated/admin.manual.tsx` — documentation
- possibly `vercel.json` / `scripts/vercel-node-adapter.mjs`, only if step 1 shows an output or routing fault
