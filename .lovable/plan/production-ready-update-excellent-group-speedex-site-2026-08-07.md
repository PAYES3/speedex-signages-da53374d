# Production-ready update — Excellent Group / Speedex site

No redesign. Same design language, spacing, animations. The existing backend stays exactly as-is (same project, same data, same buckets) — only policy cleanups and CMS fields.

## 1. Our Companies carousel
- Company type gains optional `image`, `bg_url`, `website_url`; background uses `image ?? bg_url` with a safe fallback.
- Load companies from the database when rows exist, fall back to the current built-in list.
- Logos: every filename verified against the files actually on disk (the workshop logo filename contains spaces and brackets, the likely cause of the missing Speedex Auto Workshop logo). Any broken logo falls back to an initials badge so nothing renders blank.
- "Explore Company": if Website URL starts with http(s), open the external site in a new tab; otherwise keep internal routing.

## 2. Slider timing (both sliders)
- One single interval per slider, reset cleanly on index change so manual clicks restart the same timer instead of stacking.
- Identical dwell time for every slide, no skipped or duplicated slides, transitions unchanged.

## 3. Hero video gallery (section below the hero)
- Remove the white overlay and blur that make the photos look faded and soft.
- Use full-resolution sources with `object-cover`, first slide eager and the rest lazy.
- All four slides present and equally timed; card, badge and button design unchanged.

## 4. Hero video
- Keeps autoplay / muted / loop / playsInline / preload / poster and full-bleed cover behaviour, responsive on mobile.
- Admin can set the hero video (MP4 upload into the existing hero-videos storage) and poster per slide from Homepage Builder → Hero Slides; an uploaded video takes priority over the bundled clips.

## 5. Admin panel
- Remove the public website navbar, footer and floating widgets from every `/admin` screen — admin routes render only the admin shell.

## 6. Explore buttons
- All "Explore" buttons use white label text with a readable hover state.

## 7. Company CMS
- Company editor gains Logo upload, Background image upload and Website URL, alongside the existing name, tagline and description fields.
- Website URL drives the Explore behaviour above — fully editable, no code changes needed.

## 8. Image quality site-wide
- Drop decorative overlays that dull photos, keep `object-cover`, serve original resolution, add lazy loading and async decoding below the fold.

## 9. Backend security (no data loss)
- Storage: merge the two overlapping public read rules into one policy covering exactly `services-media`, `portfolio-media`, `company-logos`, `hero-videos`. Public access unchanged. One current rule also exposes the private `testimonial-avatars` bucket — that leak is closed.
- Site settings: public reading limited to an approved key allowlist (contact email, phone, WhatsApp, address, hero media, map URLs, socials, logo). Admins keep full access, so any future API key, SMTP credential or secret stored there can never become public.
- Nothing is dropped, reset or migrated: same project, keys, auth, storage objects, tables and CMS rows.

## 10. Verification
- Type-check and production build must pass; preview loads with no console, runtime or image errors, followed by a short report of root causes, files changed and policy changes.

## Technical notes
- Files touched: `OurCompanies.tsx`, `SignageShowcase.tsx`, `HeroSlider.tsx`, `Hero.tsx`, `__root.tsx` (admin layout split), `AdminShell.tsx`, `admin.companies.tsx`, `admin.homepage.tsx`, `cms.functions.ts`, plus small button-style edits.
- One migration: consolidated storage read policy plus a replacement public read policy on `site_settings` using a key allowlist. Company background image reuses the existing `banner_url` column, so no destructive schema change.