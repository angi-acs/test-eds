# Inconsistency register — Super Page (static-website.david-bosschaert.workers.dev) replica

Everything not listed here is frozen; any design delta found by the gate is a
defect, not an improvement. Hands-off policy: no audit findings adopted, no
user-supplied items. The rendered pages are a pure replica; the single entry
below concerns browser chrome (the tab icon), not page pixels.

## R-01 — Source ships no favicon; the Edge Delivery boilerplate ships a default one

- **Evidence:** stardust/current/_crawl-log.json (no `<link rel="icon">` on either page; no logo asset captured); stardust/current/_brand-extraction.json `logo: none`.
- **Finding:** The source has no site icon, so browsers show a blank tab icon. The boilerplate's default `favicon.ico` would introduce an icon the source never had.
- **Minimal change:** none in this run — ship the boilerplate default icon as-is (outside every gate's capture area); the owner may supply a brand icon later.
- **Status:** deferred
- **Where:** all pages (browser tab only; no in-page pixel zone)

## Notes (not entries — source intent, frozen)

- The two page types use different content caps (home 1200 px, Page 1 800 px per DESIGN.json `extensions.breakpoints`). This is how the source behaves and is replicated as-is; the cap-probe row checks each archetype against its own cap.
- Page imagery is hot-linked from picsum.photos and randomuser.me. Per the capture-state policy the replica carries the same URLs as captured; nothing is re-hosted or "fixed".

## R-02 — Team tab strip overflows the viewport on narrow screens (live defect)

- **Evidence:** measure.mjs on the live /page1 at 360 px: `.tab-buttons button` ×3 at x 32 / 151 / 266, widths 119 / 115 / 135 → the strip ends at x 401 on a 360 px viewport; the live document scrolls horizontally by 41 px. The same strip renders on `/` (stardust/replica/gates/page1-360/overflow-iter1.txt recorded the mirrored build at 401 px before the fix).
- **Finding:** The three tab buttons (`padding: 1em 2em`, 1.1em bold) do not fit the 328 px tabs section at 360 px and the source has no narrow-screen rule for the strip, so the whole page overflows sideways on phones.
- **Minimal change:** `.tab-buttons { overflow-x: auto }` — the strip itself scrolls; no other value changes (canon.css). The gate's horizontal-overflow assert then holds on the build (scrollWidth 360 = viewport); at 1440 the rule has no effect.
- **Status:** applied
- **Where:** landing and static page types, team tabs section, ≤ 768 px (zone: the tab button row only; expected delta at 360: the third tab is cut at the viewport edge on both sides, so no pixel delta beyond the strip's own scroll affordance)
