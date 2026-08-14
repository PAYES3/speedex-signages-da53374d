// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deployment target selector.
//   lovable  (default) -> Nitro cloudflare-module preset, MCP server included
//   vercel             -> Nitro vercel preset  (SSR + server functions)
//   netlify            -> Nitro netlify preset (SSR + server functions)
// The Lovable sandbox build always forces cloudflare-module and ignores this.
const target = (process.env.DEPLOY_TARGET ?? "lovable").toLowerCase();
const isCloudflare = target === "lovable" || target === "cloudflare";

// The MCP SDK (@lovable.dev/mcp-js) reads secrets from the Cloudflare Workers
// `env` binding via `import("cloudflare:workers")`. That specifier only exists
// in the Workers runtime, so bundling it for Vercel/Netlify is an unresolvable
// import. The MCP endpoint + OAuth issuer are registered against the
// Lovable/Cloudflare deployment, so on other targets we drop the MCP route from
// the route tree and alias the SDK to a stub instead of externalizing it.
const mcpAlias = isCloudflare
  ? []
  : [
      {
        find: /^@lovable\.dev\/mcp-js(\/.*)?$/,
        replacement: fileURLToPath(new URL("./src/lib/mcp/stub-non-cloudflare.ts", import.meta.url)),
      },
    ];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isCloudflare
      ? {}
      : { router: { routeFileIgnorePattern: "oauth-protected-resource" } }),
  },
  ...(isCloudflare ? {} : { nitro: { preset: target } }),
  vite: {
    resolve: { alias: mcpAlias },
  },
});
