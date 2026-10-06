# Speedex Digital: a separate website within the site

## What changes for visitors
- `/speedex-digital` becomes its own small website. It gets its own header (Home, About, Services, Portfolio, Industries, Contact, Arabic toggle, "Get a Consultation"), its own footer, and its own AI assistant called "Speedex Digital AI". The Speedex Signages header, footer and chatbot are hidden on these pages.
- **Services mega menu** with two columns, Web & Design (10 services) and Digital Marketing (7 services). Each service gets its own page at `/speedex-digital/services/<service>` with a description, benefits, process, FAQ and a call to action. On phones the menu becomes a tidy accordion.
- **Home page:** hero with the tagline "Driving Business Growth Through Digital Solutions", Explore Our Services and Get a Consultation buttons, the two service categories, selected portfolio, the 6-step process (Discover, Strategy, Create, Launch, Optimise, Report), why choose us, industries, testimonials (only shown if real ones are added), FAQ and a contact section.
- **New pages:** About, Services overview, Portfolio, Industries, Contact, and Website Designing. The Website Designing page has a "Get Experience" button. Until you send the Draftly link, the button shows "Coming soon" and can't be clicked. Once the link is added in admin, it opens the Draftly experience in a new tab.
- **All prices removed.** Package buttons become "Request a Quote" or "Talk to Our Team".
- `/speedex-design` keeps redirecting to `/speedex-digital`.
- Speedex Signages pages, Services menu and footer stay exactly as they are. Speedex Digital appears there only as the 5th card in Our Groups, straight after Speedex Signages. That order is already in place and stays fixed.

## Admin
- A new **Admin → Speedex Digital** area with tabs for Homepage, About, Services, Portfolio, Testimonials, Industries, FAQs, AI knowledge, Contact and footer, SEO, Media and logos, and the Draftly link.
- Speedex Digital content is saved separately, so editing it can never change Speedex Signages content.

## Content and assets
- Logo: no new file came with your brief, so I'll use the Speedex Digital logo you uploaded earlier, which is already stored publicly. If you have a different official file, send it and I'll swap it in.
- I'll write starter text for each service, editable in admin. The assistant only answers from this approved content and never makes up prices or results.
- Contact details: +971 50 776 1493, admin@excellentgroup.ae, Mussaffah, Abu Dhabi. Social media links stay hidden until you add them.

## Technical section
- Layout: `src/routes/speedex-digital.tsx` becomes a layout route with its own DigitalHeader, DigitalFooter and DigitalChatbot, plus child leaf routes (index, about, services.index, services.$slug, portfolio, industries, contact, web-design). The shared `Layout` skips the Signages header, footer and chatbot under `/speedex-digital`.
- Database: new tables `digital_services`, `digital_portfolio`, `digital_testimonials`, `digital_faqs`, `digital_industries` and `digital_settings` (key/value for homepage text, contact, footer, SEO, AI knowledge and `draftly_url`). Each table gets GRANTs and RLS: the public can read active rows, and only admins can write (`has_role`). Seeded with the services, FAQs and industries.
- Assistant: a new `digitalChat` server function using the Lovable AI Gateway. Its system prompt is built only from `digital_*` data and is sanitized the same way as `chat.ts`.
- Consultation form: reuses `submitDigitalConsultation`, which saves to the existing admin inbox.
- Pricing: remove packages and add-ons from `speedex-digital-content.ts`.
- Each route gets its own head(), canonical URL on www.speedexsignages.com and Service/Organization JSON-LD. Sitemap entries added.
- Checks: Playwright at 390, 820 and 1280 widths. Confirm no prices, no Digital services in the Signages menu, no horizontal overflow, and the Our Groups order.
