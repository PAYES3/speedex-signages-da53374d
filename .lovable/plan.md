## Homepage updates — video, map link, email

Hero already ships 5 randomized cinematic videos with a single `<video>` element that swaps source per refresh, autoplay/muted/loop/playsInline, and a crossfade in — no changes needed. The remaining work is the map click-through and the email swap.

### 1. Google Maps click-through (Location section)

Update `src/components/sections/Location.tsx`:
- Wrap the map iframe in an `<a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">` with `pointer-events-none` on the iframe so the anchor captures the click across the whole map surface (iframes swallow clicks otherwise). Add a subtle hover overlay + "Open in Google Maps" chip for affordance.
- Keep the existing "Get Directions" button.

Update `src/routes/index.tsx` and `src/lib/site-data.ts` to use the real Speedex Auto Workshop URL:
- `mapsDirectionsUrl` default → `https://www.google.com/maps/place/Speedex+Auto+Workshop+L.L.C/@24.3564359,54.4925938,514m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5e4195316879d7:0xd4cfbd6175b97d6c!8m2!3d24.3564342!4d54.4935042`
- `mapEmbed` in `COMPANY` → embed variant centered on the same coords: `https://www.google.com/maps?q=Speedex+Auto+Workshop+L.L.C&ll=24.3564342,54.4935042&z=17&output=embed`

### 2. Email update → `speedexsignages@excellentgroup.ae`

Replace `info@speedexsignages.ae` everywhere it's hardcoded:
- `src/lib/site-data.ts` (`COMPANY.email`)
- `src/routes/__root.tsx` (JSON-LD Organization email)

`Footer`, `contact.tsx`, `Location.tsx`, admin settings default all read from `COMPANY.email`, so they pick up the change automatically. `admin.settings` `contact_email` DB value (if set) still overrides — leave that alone; user can update in admin if needed.

### 3. Out of scope

- Hero video system (already correct: 5 clips, random per refresh, single element, muted/autoplay/loop).
- Admin settings row edits (user-managed).
- Any content/design changes beyond above.

### Files touched

- `src/components/sections/Location.tsx` — make map clickable, open in new tab
- `src/lib/site-data.ts` — email + mapEmbed
- `src/routes/index.tsx` — default `mapsDirectionsUrl` prop
- `src/routes/__root.tsx` — JSON-LD email
