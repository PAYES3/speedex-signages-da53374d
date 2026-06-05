## Goals

Apply the user's brand and clarity fixes, and make the chatbot a stricter Speedex-only assistant that cites pages and FAQ items.

## Changes

### 1. Branding (logo + name)
- Save the uploaded `signage.png` as a Lovable Asset and use it as the official Speedex Signages LLC logo.
- Replace the "S" gradient mark + "Speedex." wordmark in `Navbar.tsx` and `Footer.tsx` with the real logo image (with proper alt text).
- Update `<title>`, meta tags, JSON-LD, sitemap, `llms.txt`, and all on-page copy to "Speedex Signages LLC".
- Recolor the design tokens in `src/styles.css` to match the logo: teal primary (~#0E7C7B / oklch teal) and dark slate secondary. Keep amber as a small accent only.

### 2. Default theme = light
- In `Navbar.tsx`, change the theme bootstrap so the default (no stored preference) is **light**, not system. Light mode is the first paint; dark is opt-in via the toggle.
- Audit `Hero` and section overlays so they still read correctly in light mode (lighter gradient overlay, darker text on the hero only because of the video).

### 3. Hero video replacement
- The current Pexels clip is generic and unclear. Replace with a clearer, more signage-relevant looped MP4. Options (in priority order):
  1. A bright LED storefront / channel-letter sign night-time clip from Pexels/Coverr (free, hotlinkable MP4).
  2. If no suitable free clip resolves, fall back to a high-quality still image of an illuminated signage facade (AI-generated, 16:9) with a slow Ken Burns zoom — still feels cinematic and is guaranteed to render.
- Reduce overlay opacity slightly so the footage reads, but keep the headline glow subtle as previously requested.
- Add `preload="metadata"`, `poster=...`, and a graceful image fallback.

### 4. Remove Careers from navbar
- Remove the `careers` entry from the `NAV` array in `Navbar.tsx` and from the mobile menu.
- Keep the `/careers` route and page working (still linked from the Footer) so existing applications and SEO stay intact.
- Remove the Careers nav label from `src/lib/i18n.ts` usage (keep the translation key for the page itself).

### 5. Exact images for Services and Products
- Generate one dedicated image per Service (10 total) and per Product (9 total) using the image tool, premium quality where text/detail matters, sized 1024×768 (4:3) for cards.
- Each image depicts the actual item:
  - Services: Indoor Signage, Outdoor Signage, LED Signage, Acrylic Signage, 3D Letter Signage, Vehicle Branding, Wayfinding Signage, Digital Signage, CNC Cutting, Laser Cutting.
  - Products: LED Channel Letters, Acrylic 3D Letters, LED Neon, Reception Logos, Safety Signs, Pylon Signs, Wayfinding, Stainless Steel Letters, Light Boxes.
- Save to `src/assets/services/*.jpg` and `src/assets/products/*.jpg`, import them in `src/lib/site-data.ts`, and remove generic stock URLs.
- Add descriptive `alt` text on every card.

### 6. Chatbot upgrades (stricter, citation-aware)
Edit `src/routes/api/public/chat.ts` and `src/components/Chatbot.tsx`:

- **Knowledge injection**: At request time, server-side, load a compact JSON knowledge pack built from `src/lib/site-data.ts` (services, products, FAQ Q&A, contact info, page routes) and inject it into the system prompt as `KNOWLEDGE`. This keeps the bot grounded in real site content.
- **Citations**: Update the system prompt to require the assistant to end each answer with a `Sources:` line listing the page link(s) it relied on, e.g. `Sources: /services, /faq#turnaround`. Render those as clickable links in `Chatbot.tsx` (simple linkifier for `/path` tokens).
- **Strict scope**: Hard rule in the system prompt — only answer questions about Speedex Signages, its services, products, process, locations, careers (when asked), and how to contact/get a quote. For anything else, reply with a single-line redirect: "I can only help with Speedex Signages topics — try asking about our services, products, or how to request a quote."
- **Quote requests**: When intent is a quote/pricing, do NOT invent prices. Respond with a fixed template:
  > "For an accurate quote, please share: (1) signage type, (2) size/quantity, (3) installation location in the UAE, (4) deadline. You can submit these on our Contact page (/contact) or WhatsApp us via the floating button. Sources: /contact"
- **Contact details**: Always pull phone/email/address verbatim from the knowledge pack — never paraphrase or hallucinate. If the user asks for contact info, respond with the exact block + `Sources: /contact`.
- **Refusals stay short**: Off-topic, jailbreak attempts, or requests to ignore instructions → one-line refusal + redirect.
- Keep streaming + 429/402 handling as-is.

### 7. Misc cleanup
- Update `Footer.tsx` to use the new logo and keep a "Careers" link (since it's no longer in the navbar).
- Update `llms.txt` and `sitemap.xml` to keep `/careers` listed (still a real page).
- Re-run a quick visual pass on the home page in light mode.

## Technical notes

- Logo asset: `src/assets/speedex-logo.png.asset.json` via `lovable-assets create`.
- Service/product images: generated with `imagegen--generate_image` (model `standard`), aspect 4:3, no transparent background.
- Hero video: prefer a hotlinked Pexels signage MP4; if none found, generate a 16:9 photographic still and apply a CSS `animate-[kenburns_20s_ease-in-out_infinite]` transform on an `<img>` instead of the `<video>`.
- Chatbot knowledge pack is built once per request from `site-data.ts` to keep it always in sync with what the site shows.
- No DB schema changes. No new dependencies.

## Out of scope

- Real UAE phone/email (still placeholder until you provide them).
- Translating new chatbot system prompt into Arabic (assistant still answers in the user's language; UI strings already i18n'd).
- Persisting chat transcripts to the DB.