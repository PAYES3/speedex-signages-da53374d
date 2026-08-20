// Build-time stub used on non-Cloudflare deploy targets (Vercel / Netlify).
// The real @lovable.dev/mcp-js SDK dynamically imports `cloudflare:workers`,
// a virtual module that only exists in the Cloudflare Workers runtime.
// The MCP server is served from the Lovable/Cloudflare deployment, so on other
// targets nothing should reach this module at runtime.
const unavailable = () => {
  throw new Error('MCP is only available on the Lovable/Cloudflare deployment target.');
};

export const defineMcp = (config: unknown) => config;
export const defineTool = (config: unknown) => config;
export const auth = {
  oauth: { issuer: (opts: unknown) => opts },
};
export class ToolError extends Error {}
export type ToolContext = never;

/** Metadata/MCP route handlers: respond 404 off the Cloudflare deployment. */
export const createTanStackOAuthProtectedResourceMetadataHandler = () => () =>
  new Response('Not Found', { status: 404 });
export const createTanStackMcpHandler = createTanStackOAuthProtectedResourceMetadataHandler;
export const createTanStackOAuthAuthorizationServerMetadataHandler =
  createTanStackOAuthProtectedResourceMetadataHandler;
export const createTanStackOAuthConsentHandler =
  createTanStackOAuthProtectedResourceMetadataHandler;

export default { defineMcp, defineTool, auth };
export { unavailable };
