import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listServicesTool from "./tools/list-services";
import listPortfolioTool from "./tools/list-portfolio";
import listContactMessagesTool from "./tools/list-contact-messages";
import listQuoteRequestsTool from "./tools/list-quote-requests";

// OAuth issuer must be the direct Supabase host (not the .lovable.cloud proxy).
// Vite inlines VITE_SUPABASE_PROJECT_ID at build time. Fallback keeps issuer
// well-formed during the throwaway manifest-extract eval.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "speedex-signages-mcp",
  title: "Speedex Signages",
  version: "0.1.0",
  instructions:
    "Tools for the Speedex Signages website. Use list_services and list_portfolio_projects for public catalog content. Use list_contact_messages and list_quote_requests to review recent website enquiries (admin access required).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listServicesTool, listPortfolioTool, listContactMessagesTool, listQuoteRequestsTool],
});