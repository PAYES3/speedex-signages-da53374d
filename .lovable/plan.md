# Responsive media, CMS video, Our Groups video, marquee, and full Arabic

Keeps the current design, colours, fonts, routes, hero video, company data, and media security exactly as they are. Everything below is additive or a responsiveness fix.

## 1. Device-adaptive media (main effort)

Every hero, slider, and background media block gets a shared responsive treatment instead of one fixed desktop crop:

- Container heights driven by viewport width AND height (`svh`/`dvh` with `clamp`/`min`/`max`), so short laptops and tall phones each get a sensible frame.
- Focal positioning: images and videos keep their natural aspect ratio (`object-fit: cover`, never stretched) but the focal point shifts per breakpoint — e.g. subject-left media anchors left on phones instead of centre-cropping the subject out.
- Portrait vs landscape handled separately, so an iPad in landscape and a phone in portrait both look composed.
- Content card, badge, heading, body, buttons, arrows, and dots scale together with the background, not independently.
- No horizontal scrolling, no clipped text, no button overflow at any tested size.

Sections covered: Hero slider, Home main slider (Signage Showcase), Our Companies slider, Before/After transformation, Factory/Process video blocks, Our Groups video.

Verified with automated browser passes at 1920x1080, 1440x900, 1366x768, 1280x720, 1024x768, 768x1024, 430x932, 390x844, 375x667, 320x568 — in both English and Arabic.

## 2. Home slider: optional background video (CMS)

Each hero slide already supports image or video. The Home main slider gains an optional background video field per slide, managed in the existing Homepage Builder with the existing media/storage system (no new bucket). If a video is set it plays muted, looped, inline, and covers the slide; otherwise the current background image is used. The card and controls stay above it.

## 3. Before & After images from the CMS

The Before and After image fields already exist in the Homepage Builder section definition; this wires the admin form and the public section end to end so each image uploads and replaces independently, with the current hardcoded images as fallbacks until an admin uploads.

## 4. Our Groups page video

`ALL-COMPANIES.mp4` is moved to CDN hosting and added to the Companies (Our Groups) page directly under the page heading, above the existing company content. Autoplay, muted, looped, inline, no controls and no download button, responsive height and focal point across devices. The rest of the page is untouched.

## 5. Trusted Clients marquee

The static client row becomes a seamless right-to-left infinite ticker: duplicated track, CSS-driven continuous motion with no visible jump, pause on hover on desktop, edge fade for a premium look, readable at phone sizes, and contained so the page never scrolls sideways.

## 6. Full English / Arabic bilingual site with RTL

- Every fixed UI string across navbar, hero, sliders, sections, forms, validation and success messages, footer, loading and empty states moves into the translation files with full Arabic copy. No English UI text remains in Arabic mode.
- Arabic switches the document to `dir="rtl"`, and layouts, navigation, dropdowns, cards, forms, carousels, and pagination mirror correctly. Directional arrows flip; brand and non-directional icons do not.
- An Arabic web font (Noto Kufi Arabic / IBM Plex Sans Arabic) is loaded via the root head link, with line-height and sizing tuned so Arabic never clips or overlaps.
- Language choice persists across navigation and reloads.

### CMS content in Arabic

Per your choice, database-driven text becomes bilingual through new optional Arabic columns — companies (name, tagline, description), services (title, description), hero slides (title, subtitle, description, button labels), and page sections. Admin forms gain an Arabic tab next to each English field. The public site shows the Arabic value when set and falls back to English when empty, so nothing breaks before translations are entered.

## Technical notes

- Migration adds nullable `*_ar` columns only. No table, column, bucket, policy, or row is dropped or renamed. `media_assets` RLS (public sees `active = true AND hidden = false`) is untouched.
- Hero video sources, company `logo_url` / `banner_url` mapping, and all existing storage stay as-is; logo and background uploads remain strictly separate fields.
- A shared `ResponsiveMedia` helper centralises aspect-safe sizing and breakpoint focal positioning so every section behaves consistently.
- i18n stays on the existing `react-i18next` setup; resources are split into namespaced files for maintainability.
- Finishes with a typecheck, a production build, and a console/network error check.
