# Speedex — Slider Responsiveness, Our Groups Fixes, Admin Manual

## What I verified first

- The Home and About "Our Companies" sliders already share one component (`OurCompanies`) reading the same live `companies` records — no duplicate data exists.
- The database has **7 active companies**. Two of them share the same sort order (4), so the slide order is ambiguous today.
- Only 1 of 7 companies has a desktop background image; none have a mobile background. All 7 have logos.
- 3 of 7 have a website URL; 4 are empty. The admin Our Groups editor already has a Website field that saves correctly.
- "Five specialised companies…" and "Companies will appear here once added in the admin panel." are **in the header mega-menu**, not the Our Groups page. The empty-state text appears while the menu's company list is still loading.
- The homepage counters (18+, 2400+, 950+, 65+) are real values in code; they render as 0 until the section scrolls into view. If they stay 0 on the live site it is an animation trigger issue, not missing data — I will confirm in the browser before changing anything.

## 1. Slider card responsiveness (Home + About)

Rework only the foreground white card inside `OurCompanies`:

- Mobile (<640px): card becomes a compact bottom sheet — full-width minus gutters, reduced padding, smaller logo tile, title and description scaled down, description clamped to 3 lines, CTA full width. Background stays clearly visible above the card.
- Tablet (640–1024px): narrower card (about 60% of the slide), medium logo tile and type scale.
- Desktop: keeps the current left-positioned card, capped so a large part of the background stays visible.
- All sizing via `clamp()` / percentage max-widths — no fixed pixel width shared across devices.
- Logo keeps `object-fit: contain`; tile height becomes responsive.
- Arrows: 56px desktop overlay, 44px minimum on mobile; on mobile they move to the control row under the slide so they never sit over the card. Indicators, swipe and autoplay stay as they are.

No change to colours, fonts or overall design. About page keeps using the same component and data.

## 2. Slide ordering

Fix the duplicated sort order so the 7 slides have a stable, admin-controlled sequence (data-only update, no records created or deleted).

## 3. Our Groups page stays separate

The Our Groups page keeps its card grid. Changes there are limited to:

- **Learn More** opens that company's own configured website in a new tab (`target="_blank"`, `rel="noopener noreferrer"`), with URL normalisation so a value entered without `https://` still works. If a company has no website saved, the button keeps its existing internal detail-page behaviour instead of breaking.
- The "five sectors" wording in the page copy and page description becomes dynamic based on the active company count.

No slider controls, slider background behaviour, or slider-only fields are added to Our Groups.

## 4. Mega-menu bugs

- Replace the hard-coded "Five specialised companies" with wording driven by the actual active count.
- Show a loading state while companies are being fetched, and the empty-state message only when the list is genuinely empty.

## 5. Admin — Our Groups website field

The Website field already exists and persists. I will make it clearer: labelled "Website (used by Learn More)", with placeholder, validation feedback, and an explicit clear action, and I'll fill in the missing URLs only if you provide them.

## 6. Admin User Manual

New page at **Admin → User Manual** (`/admin/manual`), written in plain English and covering only what actually exists in this project, audited route by route: Login/Logout, Dashboard, Homepage builder, Our Companies (slider — noting it drives Home and About), Our Groups, Services, Portfolio, Media library, Reviews, Messages/Leads, Settings & SEO, Arabic mode, and how Save/Publish/Preview behave. Includes a print/download-to-PDF action and a link in the admin sidebar.

## 7. Audit pass

After the changes I will walk the site at 390, 430, 768, 1024, 1440 and 1920px in a real browser — Home, About, Our Groups, Services, Portfolio, Explore, Products, Contact, plus Arabic/RTL — checking horizontal overflow, clipped cards, broken images, video playback and form submission, and I will also check the admin screens on tablet and mobile widths. The final report lists what was fixed and anything still outstanding; I will not claim a clean bill of health for anything I did not actually check.

## Technical notes

- Files touched: `src/components/sections/OurCompanies.tsx`, `src/components/Navbar.tsx`, `src/routes/companies.tsx`, `src/routes/_authenticated/admin.companies.tsx`, `src/components/admin/AdminShell.tsx`, plus a new `src/routes/_authenticated/admin.manual.tsx` and a small URL-normalisation helper.
- Database: only a sort-order correction on existing rows. No schema change, no new tables, no record deletion, RLS untouched.
