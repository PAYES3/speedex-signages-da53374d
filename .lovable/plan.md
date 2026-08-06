# Full-site CMS + Hero video overlay fix

## 1. Hero video: remove the white layer

The hero video in `HeroSlider.tsx` is covered by two full-bleed white gradient overlays plus a white section background and a brightness filter — that is the faded/white look.

Changes:
- Remove both white gradient layers, the `bg-white` section background, and the `brightness(1.28)` filter so the clip plays at true colour.
- Replace them with one subtle dark scrim (left-to-right, transparent on the right) purely for text legibility — keeps the video clearly visible while staying WCAG AA.
- Flip hero text, badge and buttons to a light-on-dark treatment so contrast is correct at every breakpoint (desktop, tablet, mobile), keeping the same layout, sizes and spacing.
- Keep `autoplay muted loop playsInline`, poster fallback and `object-cover`.

## 2. One CMS that edits the real site (no duplicate system)

Today there are two half-systems: `page_content` key/value (Website Content screen) and `page_sections` (Homepage Builder), and most sections still render hard-coded copy from `site-data.ts`. The plan unifies everything on `page_sections` and wires the existing frontend components to it.

### Database
- New `pages` table: slug, title, SEO title/description/OG image, visibility.
- `page_sections` already has page, section_type, sort_order, visible, status, publish_at, data (JSON) — reused as-is for every page, not just home.
- A seed migration inserts, for each page (home, about, services, projects, companies, contact, careers), one row per section that page renders today, with `data` pre-filled with the exact current frontend copy, images and video URLs. That is what makes the admin "already show everything on the site".
- Footer and contact info stay in `site_settings`, surfaced inside the CMS UI.

### Section registry
Expand `src/lib/cms/section-types.ts` so every section type used across all pages is declared with its real editable fields (eyebrow, heading, sub heading, paragraphs, button label/link, image, video, cards). Repeater support is added for cards, FAQ items, process steps and stats.

### Frontend wiring
Each section component (`AboutSection`, `ServicesSection`, `ProjectsSection`, `WhyChoose`, `Stats`, `ProcessTimeline`, `FactoryShowcase`, `FAQ`, `CTABanner`, `SeoContent`, `Location`, `ClientLogos`, `Footer`, …) reads its text and media from the section `data`, falling back to today's constants so nothing can go blank. The `about`, `services`, `contact`, `companies`, `portfolio` and `careers` routes switch to the same `SectionRenderer` loop the homepage already uses, so their sections become editable and reorderable too. Layout and styling are unchanged.

### Admin UI
Rework `/admin/content` into a page-wise CMS dashboard:
- Left: page list (Home, About, Services, Projects, Companies, Contact, Careers, Footer, SEO & Settings).
- Right: that page's section tree in display order — each row with Edit, Duplicate, Visibility toggle, Publish/Draft/Schedule, drag-to-reorder and Delete.
- Edit opens the section editor pre-filled with the live content, with media picker/upload for images and videos; saving reflects on the site immediately.
- Per-page SEO tab (title, description, OG image, canonical) writing to `pages`.
- The Homepage Builder is folded into this screen so there is only one place to edit content.

Detail collections that already have their own CMS screens — Services, Portfolio projects, Companies, Testimonials/Reviews — stay where they are and are linked from the relevant page section rather than duplicated.

## Technical notes
- Public reads keep using `publicListSections` (extended to any page slug) plus a new public `pages` fetcher for SEO metadata in each route's `head()`.
- Writes go through `cms.functions.ts` with the existing staff role check and version snapshots, so history/restore covers all pages.
- Seed content is inserted by migration with literal INSERTs, never at page load.