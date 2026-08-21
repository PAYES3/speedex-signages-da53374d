# Fix the Vercel SSR 500

## What the evidence says so far

`GET /` and `GET /favicon.png` both fail the same way. `/favicon.png` is not a real file in `public/` (only `favicon.ico` exists), so that request falls through to the SSR function and should render the app's 404 page. The fact that it returns the same `HTTPError` 500 means the failure happens **before any route-specific logic** — it is not the homepage's data loading. Something in the server bundle throws on every request (module init, the root shell render, or the Nitro/Vercel handler wiring).

The exact cause is **not yet confirmed** — the error text is the wrapper in `src/server.ts` reporting that h3 already swallowed the original throw, so the real stack never reached the logs. Confirming it is step 1 and everything after depends on what it shows.

Candidates to rule in or out, in order:

- The out-of-band error capture in `src/lib/error-capture.ts` isn't recovering the original error on Node/Vercel (Cloudflare-shaped `globalThis` listeners), so the real cause is invisible. Making the wrapper surface the true stack on Node is a prerequisite for diagnosis, not the fix itself.
- Module-scope failure in the SSR graph on the Vercel target: the non-Cloudflare MCP stub alias, `package.json` `"sideEffects": false` combined with the side-effect-only `@/lib/i18n` import in `Layout.tsx`, or backend client construction during render.
- Backend configuration: the browser client falls back to `process.env.SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` during SSR and **throws** when both are absent; the admin client throws without `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`. If any of these is missing in Vercel Production, an SSR crash on every page is the expected symptom.
- The Node adapter wrapper (`scripts/vercel-node-adapter.mjs`) mismatching what the Nitro `vercel` preset emits.

## Plan

1. **Reproduce with the real production output**
   Run `DEPLOY_TARGET=vercel bun run build` plus the adapter step outside the sandbox override (the sandbox otherwise forces the Cloudflare preset), then boot `.vercel/output/functions/__server.func` under Node and request `/` and `/favicon.png`. Compare against the deployed behaviour so the local run is a genuine reproduction, not a lookalike.

2. **Recover the real stack**
   Extend the SSR wrapper's error capture so it also hooks Node's `process.on('uncaughtException')` / `'unhandledRejection'` (in addition to the existing `globalThis` listeners). This is diagnostic plumbing, not a catch-all: it makes the original error and stack print in Vercel's runtime logs instead of the opaque `HTTPError`.

3. **Fix the root cause found in step 1–2**
   Whatever the stack names — a module-init throw, a browser global touched during SSR, a stripped side-effect import, an adapter mismatch, or missing configuration — gets fixed at its source. No design change, no route removal, no framework switch.

4. **Make missing configuration fail readably**
   If (and only if) configuration is implicated: public read paths return empty results and log the missing variable **name** (never a value) instead of throwing, so the site degrades to its existing empty state rather than a whole-page 500. Admin and authenticated paths keep failing loudly.

5. **`/favicon.png`**
   Confirm nothing in the app references it (current grep shows only `/favicon.ico`); the request most likely comes from a browser/crawler probe. Add the missing static file or a small static route so it returns a real icon or a clean 404 instead of entering SSR. No effect on app routes.

6. **Verify**
   - `bun run build` (default target) clean.
   - `DEPLOY_TARGET=vercel bun run build` + adapter clean, `.vercel/output/config.json` still has the filesystem handler and `/(.*) → /__server` catch-all.
   - Boot the built output and confirm `200` on `/`, plus `/about`, `/companies`, `/services`, `/portfolio`, `/explore`, `/products`, `/contact`, `/admin`, each on direct load and refresh, with a clean console.
   - `/favicon.png` returns a non-500 status.
   - Report the confirmed root cause, the files changed, and any Vercel Production variable that still has to be set by hand. I will not claim the live URL is fixed from a local run alone.

## Environment variables Vercel Production must have

Build-time (public, inlined into the browser bundle): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`

Runtime (server-only, never `VITE_`-prefixed): `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`

Names only — no values are printed anywhere.

## Files likely to change

- `src/lib/error-capture.ts`, `src/server.ts` — surface the real stack on Node
- the specific module the trace blames (unknown until step 1)
- `public/` favicon asset or a tiny static route
- possibly `vite.config.ts` / `package.json` `sideEffects`, only if the trace implicates bundling
