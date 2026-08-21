# Vercel production hardening + bundle cleanup

The Vercel build already succeeds and the adapter output is valid. This plan is a safe optimization and verification pass — no pages, routes, backend, auth or UI behaviour changes.

## What I found

- Vercel config is correct: `vercel.json` runs `DEPLOY_TARGET=vercel bun run build` plus the Node adapter wrapper, and `vite.config.ts` switches Nitro to the `vercel` preset and stubs the Cloudflare-only MCP SDK on that target.
- Server-only code is already clean: every use of the privileged backend client is a dynamic `import()` inside a handler, so it never enters the client graph.
- One real bundle problem: `ServicesSection.tsx` does `import * as Icons from 'lucide-react'` and looks icons up by name at runtime. That defeats tree-shaking and pulls the entire icon library into the client bundle.
- Animation imports are already named (`{ motion, AnimatePresence }`), which is tree-shakeable.
- The remaining heavy libraries (charts, lightbox, carousel, etc.) are each referenced by a single unused shadcn UI file and are dropped by tree-shaking, so no dependency removals are needed.

## Changes

1. Replace the wildcard icon import in the services section with an explicit map of the icon names the CMS actually offers, keeping the same fallback icon and identical rendering. Icons chosen in the admin panel keep working; unknown names fall back exactly as today.
2. Keep every other import style as-is (named animation imports, dynamic backend-admin imports, generated browser client).
3. Confirm no browser globals run at module scope in the files touched.

## Verification

- Run the production Vercel build locally (`DEPLOY_TARGET=vercel`) and the standard build, and fix any genuine error.
- Inspect `.vercel/output` for a valid `config.json` catch-all route, the `__server.func` function and the wrapped Node handler.
- Compare client bundle output before and after to confirm the icon library is no longer bundled whole.
- Chunk-size warnings are reported, not treated as failures.

## Technical notes

Files touched: `src/components/sections/ServicesSection.tsx` only (plus a small icon-map module if the list is long enough to warrant it). No config, dependency, schema, or route changes unless the build surfaces a real error.
