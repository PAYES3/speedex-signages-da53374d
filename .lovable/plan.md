## Speedex Signages — Premium Corporate Website

A modern React + Tailwind site for a UAE signage company, with backend (Lovable Cloud) for chatbot, contact, and careers.

### Pages & Routes (TanStack Start)
- `/` Home — hero video, "We Light Up Your Brand" (subtle glow), CTAs, stats counters, services teaser, portfolio teaser, testimonials, client logos, CTA strip
- `/about` — story, mission/vision, core values, timeline, why-choose-us, team teaser
- `/services` — 10 service cards with icons + hover; data sourced from the uploaded "Our Services.docx" (Concept & Design, Fabrication, Installation, Maintenance, Digital, plus Indoor/Outdoor/LED/Acrylic/3D/Vehicle/Wayfinding/CNC/Laser)
- `/explore` — portfolio gallery, category filters, lightbox, before/after slider, video showcase, project detail modal
- `/products` — searchable, filterable catalog across 8 categories with detail drawer + "Request Quote" inquiry
- `/careers` — openings list, benefits, growth, Apply Now form with CV upload
- `/contact` — validated form, address, embedded UAE map (Google Maps iframe — no API key needed), email, phone, WhatsApp button

### Global UI
- Sticky glass navbar (logo, nav, language toggle EN/AR, dark mode toggle, "Get a Quote")
- Floating WhatsApp button (bottom-right, above chatbot)
- AI chatbot widget (bottom-right) — powered by Lovable AI Gateway
- Back-to-top button
- Footer: about blurb, quick links, services, contact, social, newsletter signup
- Cookie-free smooth page transitions

### Animations
- Framer Motion + IntersectionObserver: fade-up / fade-left / fade-right / zoom-in, trigger once
- CountUp on stats when in view
- Subtle text-shadow (not heavy bloom) on hero headline
- Hover lifts, image parallax on hero

### Design System
- Modern dark/light dual theme via `src/styles.css` tokens (oklch)
- Accent: electric cyan + warm amber (signage "light" feel); deep navy base
- Typography: Space Grotesk (display) + Inter (body)
- Glassmorphism cards on hero, stats, and chatbot

### Internationalization
- `react-i18next` with EN + AR JSON dictionaries
- RTL flip when AR selected (`dir="rtl"` on `<html>`)
- Language toggle persists in localStorage

### Backend (Lovable Cloud)
Tables (with RLS + GRANTs):
- `contact_messages` (id, name, email, phone, subject, message, created_at) — public insert; admin read
- `quote_requests` (id, name, email, phone, product/service, message, created_at)
- `job_applications` (id, name, email, phone, position, cover_letter, cv_url, created_at)
- `chat_conversations` (id, session_id, created_at) + `chat_messages` (id, conversation_id, role, content, created_at)

Storage bucket: `cvs` (private) for CV uploads.

Server functions (`createServerFn`):
- `submitContact`, `requestQuote`, `submitJobApplication` (with signed upload URL flow)
- `chat` — streams response from Lovable AI Gateway (`google/gemini-3-flash-preview`) with system prompt grounded in Speedex services/products/contact info

### Content Sources
- Services copy derived from uploaded DOCX
- Hero video: free Pexels signage/manufacturing stock MP4 (direct CDN URL), muted/autoplay/loop, ~10s segment
- Portfolio + product images: AI-generated signage visuals saved to `src/assets/`
- Placeholder UAE phone/email/address with TODO comment for user to replace

### SEO
- Per-route `head()` with unique title/description/og tags
- JSON-LD `LocalBusiness` on Home and `Service` schema on Services
- `public/robots.txt` + `public/sitemap.xml` with relative URLs

### Out of Scope (v1)
- Real Google Analytics ID (placeholder snippet, user adds GA4 ID)
- Real SAML/auth — site is public marketing; no login
- Actual Arabic professional translation — provided translations are functional drafts the user can refine

### Technical Notes
- Stack: TanStack Start, React 19, Tailwind v4, Framer Motion, react-i18next, react-countup, react-intersection-observer, lucide-react, shadcn/ui
- Hero video uses `<video>` with `poster` fallback + `prefers-reduced-motion` swap to static image
- Chatbot streams via server fn → AI gateway; conversation persisted per session id (anonymous)
- Map: standard Google Maps embed iframe for a UAE address (no API key required)

### Build Order
1. Enable Lovable Cloud + create LOVABLE_API_KEY
2. DB migration (tables, RLS, grants, `cvs` bucket)
3. Design tokens + layout shell (navbar, footer, theme, i18n, WhatsApp/back-to-top/chatbot widgets)
4. Home page (hero, stats, sections)
5. About, Services (from DOCX), Careers
6. Explore (gallery + lightbox + filter), Products (catalog + filters + inquiry)
7. Contact (form + map)
8. AI chatbot server fn + streaming UI
9. SEO meta per route, sitemap, robots
10. QA pass: responsive, dark mode, RTL, animations trigger-once
