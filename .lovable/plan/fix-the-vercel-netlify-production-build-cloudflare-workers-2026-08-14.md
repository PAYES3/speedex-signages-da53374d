# Fix the Vercel/Netlify production build (cloudflare:workers)

## Root cause (verified, not guessed)

`@lovable.dev/mcp-js` is a **real runtime dependency**, not editor tooling. It is pulled into the server bundle by app code:

```text
src/routes/[.well-known]/oauth-protected-resource.ts
  -> src/lib/mcp/index.ts  (defineMcp + 4 tools)
     -> @lovable.dev/mcp-js/dist/cors-i00R-ohe.js
```

Inside that SDK file, the metrics recorder for TanStack apps reads secrets from the Cloudflare Workers `env` binding:

```js
cloudflareEnvPromise ??= import(/* @vite-ignore */ "cloudflare:workers").then(m => m.env)
```

`cloudflare:workers` is a virtual module that only exists in the Cloudflare Workers runtime. The Lovable build uses the `cloudflare-module` Nitro preset, so it resolves fine. On Vercel the build runs with `NITRO_PRESET=vercel`, that virtual module does not exist, and Rollup fails hard. So the failure is not a config typo — it is a Cloudflare-only code path being bundled for a non-Cloudflare target.

The Radix `"use client"` messages are warnings only and will be left alone.

## Fix strategy

Make the deployment target explicit, and only ship the Cloudflare-bound MCP server on the Cloudflare target. MCP agent integrations are served from the Lovable/Cloudflare deployment (that is where the registered MCP endpoint and OAuth issuer live); Vercel/Netlify copies of the site do not need to expose `/mcp`. Nothing else in the app touches the SDK, so SSR, admin, AI chat, Supabase and auth are unaffected.

No `rollupOptions.external` workaround, no static export, no deletion of the package.

### 1. Target switch in `vite.config.ts`
- Read `DEPLOY_TARGET` (`lovable` default, plus `vercel` / `netlify`).
- Lovable/Cloudflare path: unchanged behaviour (the Lovable config already forces `cloudflare-module` inside the sandbox and ignores `NITRO_PRESET`).
- Vercel/Netlify path: pass `nitro: { preset: 'vercel' | 'netlify' }` explicitly instead of relying on env sniffing.
- For non-Cloudflare targets, add `tanstackStart.router.routeFileIgnorePattern` covering the MCP metadata route so it is not compiled into the route tree, plus a resolve alias that maps `@lovable.dev/mcp-js` to a tiny no-op stub as a belt-and-braces guard against transitive pickup. The alias is only applied when the target is not Cloudflare.

### 2. MCP route stays intact
`src/lib/mcp/**` and `src/routes/[.well-known]/oauth-protected-resource.ts` are not modified, so the Lovable deployment keeps serving MCP + OAuth metadata exactly as today.

### 3. `vercel.json`
Use the Nitro Vercel build output (`.vercel/output`) rather than a static `dist` publish: build command `DEPLOY_TARGET=vercel bun run build`, no `outputDirectory`/`framework` static assumptions, install via bun.

### 4. `netlify.toml`
Use the Nitro Netlify preset output (`.netlify/`): build command `DEPLOY_TARGET=netlify npm run build`, publish `dist/client` replaced with the preset's generated static dir, no `public/_redirects` hack.

### 5. Environment variables
Update `.env.example` to list client vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`) and server-only vars (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`), with a note that the last two must never be `VITE_`-prefixed. No real values committed. Code already reads all secrets inside server handlers only — this will be re-verified with a grep pass.

### 6. Validation
- Run all three builds locally in the sandbox: default (Cloudflare), `DEPLOY_TARGET=vercel`, `DEPLOY_TARGET=netlify`; confirm zero `cloudflare:workers` resolution errors on the last two.
- Smoke-test the running app: homepage SSR, `/admin` login, an admin server function, `/api/public/chat`, a Supabase read.
- Re-verify the Home Companies slider (arrows, wrap-around, 6s autoplay, pause, indicators, swipe, mobile controls, CMS data, mobile banner fallback) — no files from that work will be touched.

## Files to change
- `vite.config.ts` (target switch + preset + MCP exclusion for non-Cloudflare)
- `vercel.json`
- `netlify.toml`
- `.env.example`
- one new tiny stub module for the non-Cloudflare alias

## Manual dashboard steps (reported at the end)
Vercel/Netlify env vars must be set in each dashboard; `DEPLOY_TARGET` is baked into the build command so no extra variable is required.
