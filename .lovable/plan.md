# Plan

## 1. Admin Panel — prominent "Add" buttons

Today every admin page (Companies, Services, Portfolio, Reviews) renders a small `<Button>Add…</Button>` in the page header — easy to miss on a busy list.

Changes:
- Add a shared `AdminPageHeader` component with: large title, subtitle, and a primary CTA slot rendered as a **large gradient pill button** (`h-12 px-6`, primary→primary-glow, shadow, hover lift, leading `Plus` icon).
- Apply it to `admin.companies.tsx`, `admin.services.tsx`, `admin.portfolio.tsx`, `admin.reviews.tsx`.
- Also add a **sticky bottom-right floating action button** ("+ Add") on those four pages for thumb-reach on mobile and instant visibility on long lists.

## 2. Homepage hero — 5 randomized signage videos

- Generate **5 cinematic 10-second signage manufacturing videos** with `videogen--generate_video` (1080p, 16:9): LED channel-letter fabrication, CNC acrylic cutting, 3D illuminated signboard install, vehicle wrap application, UAE night cityscape of lit signage. Save under `src/assets/hero/hero-1.mp4` … `hero-5.mp4` as Lovable Asset pointers.
- Update `Hero.tsx`:
  - Import the 5 asset pointers into an array.
  - On mount, pick `Math.floor(Math.random() * 5)` so each refresh shows a different clip (admin-supplied `hero_video_url` from Settings still wins if set).
  - `autoPlay muted loop playsInline preload="auto"` + `<source>` per pick; smooth crossfade in via framer-motion opacity.

## 3. Hero readability

- Strengthen the existing overlay stack: darker base gradient (`from-black/85 via-black/65 to-black/90`) + a true neutral `bg-black/45` flat layer behind the content column only, so video stays visible at the edges.
- Add `text-shadow: 0 2px 24px rgba(0,0,0,0.6)` utility (`drop-shadow-[0_2px_24px_rgba(0,0,0,0.6)]`) on headline, sub, chip, stats.
- Bump sub copy from `text-white/85` → `text-white font-medium`, headline weight stays bold, chip border `border-white/30`.
- CTA outlines get `bg-black/30 backdrop-blur-md` so they stay legible over bright frames.

## 4. Smart merge of `Our Services.docx`

The doc's **Types** sections (Exterior, Interior, Compliance, Promotional, Wide Format) are already present verbatim in `SERVICE_GROUPS` and render on `/services`. The doc's **page 1 "Our Services" workflow list** (Concept & Design, Fabrication/Printing, Installation, Maintenance and Repair, Digital Signage Solutions) is **not** displayed verbatim anywhere.

Changes (no invented content):
- Add a `SERVICE_WORKFLOW` array in `src/lib/site-data.ts` containing only those 5 items, copying the doc's exact titles and descriptions.
- Add a new "Our Services" section near the top of `/services` (above "How we work") that renders these 5 items as cards — title, dash, description — preserving doc order. Light/dark mode safe via existing tokens (`bg-card`, `text-muted-foreground`).
- No changes to `SERVICE_GROUPS` (already verbatim). No new copy beyond the doc.

## Out of scope

Hero video upload UI changes, admin auth, other doc files, redesign of non-admin pages.

## Files

- New: `src/components/admin/AdminPageHeader.tsx`, `src/assets/hero/hero-{1..5}.mp4.asset.json`
- Edit: `src/components/admin/AdminShell.tsx` (only if FAB needs portal), `src/routes/_authenticated/admin.{companies,services,portfolio,reviews}.tsx`, `src/components/sections/Hero.tsx`, `src/lib/site-data.ts`, `src/routes/services.tsx`
