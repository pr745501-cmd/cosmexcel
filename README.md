# Cosmexcel 2027 — Cosmetics Leadership Summit (frontend)

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · React Three Fiber · GSAP + Lenis · Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Structure
- `data/` — all event content as typed static data (event, agenda, themes, audience, pricing, companies). Replace with API/CMS calls later without touching components.
- `components/sections/` — page sections. `components/3d/` — procedural Three.js scenes (no model downloads), loaded with `next/dynamic` (client only).
- `components/ui/`, `components/navigation/`, `hooks/`, `lib/` — shared building blocks.
- `public/logos/` — Trusted-by logos cropped from the brochure. `public/images/` — brochure imagery.

## Performance & accessibility
- 3D tiers via `useSceneQuality` (desktop high / tablet medium / phone low / no WebGL → SVG poster). Rendering pauses off-screen; DPR capped.
- `prefers-reduced-motion` disables Lenis, reveals, cursor and 3D movement.

## Before launch
1. Set `NEXT_PUBLIC_SITE_URL` to the production domain (used for metadata, sitemap, robots).
2. Registration is a **front-end preview only**: nothing is submitted. Connect `components/sections/RegistrationFlow.tsx` to a backend/payment provider when ready.
3. Logos are raster crops from the brochure PDF; swap in official SVGs in `public/logos/` (same filenames) when supplied.

## Content audit (brochure = only source of truth)
Removed as unsourced: theme-to-session mapping, delegate-type descriptions, the "Projected by 2030" stat label, "by School of Manufacturing" organiser wording in metadata, and a "partner brand" data field.
Added from the brochure: the registration form link decoded from the brochure's QR code (`contact.registrationForm` in `data/event.ts`).
The review step's discount-before-GST arithmetic is a preview assumption; the brochure does not specify it.

## Brochure inconsistencies flagged
- Page 2 says "Cosmexcel 2026"; the site uses **Cosmexcel 2027** throughout (cover, title and registration page all say 2027).
- Typos corrected on the site: "Comsetics" → "Cosmetics" (Day 2, 2:00–2:45), "thr Summit" → "the Summit".
- Page 2 labels the "#4" card "Ranking" without saying what is ranked; shown verbatim.
- The brochure gives dates but no start time; the countdown targets 00:00 IST on 28 Jan 2027.
- No venue address, speakers or social links appear in the brochure, so none are shown.
- Early Bird "till 30 Oct 2026" and Regular "from 1 Nov" leave 31 Oct unassigned; Regular ends 15 Dec and Late starts 15 Dec (overlap). Shown as printed.
