# Responsive pass, transformation image CMS, company image separation, media security

No redesign: colours, fonts, animations, hero video, logos, routes, tables and buckets stay exactly as they are. Only the items below change.

## 1. Media library security (database)

Today the public read rule on the media library is unconditional, so the hidden/inactive flags are ignored for public reads. All 4 existing rows have real true/false values (no blanks), so no data cleanup is needed.

- Replace only the public read rule so visitors can read a media item only when it is active and not hidden.
- Admin access (view all, create, edit, delete, including hidden/inactive) is left untouched.
- No rows, columns, URLs, buckets or other rules are touched.

## 2. "See the Transformation" image CMS

The before/after slider currently uses two hardcoded stock photos.

- Add two independent image fields (Before image, After image) to the Before & After block in the homepage builder, alongside the existing heading fields.
- The section reads those images from CMS data and falls back to the current images when empty, so nothing breaks before an admin uploads.
- Uses the existing media upload and section storage — no new tables or buckets.

## 3. Our Companies: logo vs background kept separate

The company editor already has separate Logo and Background fields writing to distinct columns, and the public slider already reads the background from `banner_url` and the logo from `logo_url`. Work here is verification plus:

- Confirm a logo upload only writes the logo field and a background upload only writes the background field (no cross-writing), on both Home → Our Companies and the About company section.
- Keep fallbacks: default background when none set, initials badge when no logo. Never a broken image.
- No new columns; `banner_url` remains the background.

## 4. Full responsive behaviour

Applied to the hero, hero video/gallery slider, Our Companies slider, transformation slider and other homepage sliders:

- Fluid heading, description, badge and button sizing with `clamp()` instead of only breakpoint jumps.
- Fluid section padding and min-heights replacing the fixed values that clip on 1366x768 and short laptops (e.g. hero `min-h-[92svh]` plus `pt-32 pb-24`).
- Slider card padding, image ratios and slide heights scale with the viewport; buttons wrap instead of overflowing.
- No horizontal scrolling, no clipped or overlapping content at any size.
- Hero video stays full-bleed with its current source, fallbacks and playback behaviour untouched.

## 5. Verification

- Screenshot checks at 1280x720, 1366x768, 1440x900, 1920x1080, 1024x768, 768x1024, 430x932, 390x844, 375x667, 320x568 (portrait and landscape for tablet).
- Check public vs admin visibility of hidden/inactive media after the rule change.
- Typecheck/build plus a console check for React, asset and data errors.

## Technical notes

- RLS: drop `Public can view media` and recreate as `FOR SELECT TO anon, authenticated USING (active = true AND hidden = false)`; `Admins manage media` (ALL, has_role admin) untouched.
- `src/lib/cms/section-types.ts`: add `before_image` / `after_image` (`kind: 'image'`) to the `before_after` type; `BeforeAfter.tsx` accepts a `data` prop from `SectionRenderer` with the current URLs as defaults.
- Responsive work is confined to className/style in `HeroSlider.tsx`, `Hero.tsx`, `OurCompanies.tsx`, `SignageShowcase.tsx`, `BeforeAfter.tsx` and a few `clamp()` utilities in `src/styles.css`.