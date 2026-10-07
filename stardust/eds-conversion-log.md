# EDS conversion log — Super Page replica

## Publish decision (2026-10-02T09:48:33Z)
Decision: **publish**. Every delivered page, the redirects sheet and the chrome documents (nav, footer) go live on the aem.live origin (deploy-batch.mjs without --no-publish). Decided for the run up front; not re-asked.

## archetype:index — C-deliver unit (2026-10-02)

Page `/` (DA `/index`, template `index`, type landing). Preview `https://main--0f28c839--aemcoder.aem.page/`, published to aem.live (deploy-batch, publish=true, ledger `stardust/deploy/ledger-index.json`). Authored document `content/index.html`: 4 content sections (`<div>`s, no `<hr>`) + metadata (Title "Good Morning!"); strings verbatim from `stardust/migrated/index.html`; no header/footer markup (live `/nav`, `/footer`).

### Decode tiers per section
| # | source | authored | block | tier |
|---|---|---|---|---|
| 1 | h1 "Super page" + lede p | default content | — | n/a (styles.css canon h1 / p) |
| 2 | table (YouTube iframe, image) | `media-grid` row, 2 cells | media-grid | reconstructive — cells classified by content (embed link vs picture), never by index |
| 3 | h2 "Here is a subheading" | default content | — | n/a (canon h2) |
| 4 | table (image, image) | `media-grid` row, 2 cells | media-grid | reconstructive |
| 5 | div.content-block (bare text) | `highlight`, 1 cell, 1 p | highlight | template-slotted — the block element is the card, the cell's children move into `.highlight-body` |
| 6 | .tabs-section (3 buttons, 3 panels × 2 team cards) | `tabs`, 1 row per tab: label cell + panel cell | tabs | shell template-slotted (strip + panels); team cards reconstructive — a card opens at each portrait (or the first element), closes before the next portrait |

### Decisions
- **YouTube embed (dynamic-features row 1, embed-passthrough).** The embed card is authored as two metadata paragraphs: `<p>YouTube video</p>` (the captured iframe `title`) and `<p><a href="https://www.youtube.com/embed/b4Rr_7y068U">…</a></p>` (the captured `src`); `media-grid.js` builds the identical iframe (560×315, frameborder 0, allow list, allowfullscreen). Both paragraphs are declared `@ew-exempt` (EW5a text-as-metadata). A link-only cell would trip davids-model-lint D1 🔴 (embed URL authored as a block) and auto-blocking lives in the frozen `scripts/scripts.js`; the two-paragraph model passes D1 and keeps the title editable.
- **Hot-linked images (row 3, static-snapshot).** Authored verbatim (picsum.photos ×3, randomuser.me ×6); `media-reconcile`: 9 keep, exit 0. The DA/preview pipeline rehosted them onto the media bus as `<picture>` (original size kept as `width`/`height` attributes); the blocks handle `picture` and `img` alike.
- **media-grid column split.** The source table is auto-laid-out: cell widths = card padding/border (36px) + content width proportional to intrinsic width (iframe 300, image natural 800). Measured origin at 1440: video|image 324|804, image|image 564|564. `media-grid.js` sets each row's `grid-template-columns` from those weights (embed 300, image = `width` attribute, fallback 800); CSS fallback equal columns. Rows are grids (gap + padding 1.5rem = border-spacing). Mobile (≤768) rows stack as in the source.
- **Tabs (row 2, client-only).** Only the click fired in the motion record; `tabs.js` toggles `.active` on labels and panels (plus Enter/Space on the focusable label). EW7: labels are `div.tab-button[role=tab]` wrappers holding the authored `<p>`; `tabs.css` carries the canon `.tab-buttons button` values plus the UA button face measured on the live page (`font-family: Arial`, line-height normal, text centred vertically). content-presence therefore reports 🟠 MISSING BUTTON ×3 (it counts `<button>` tags) — not a verdict criterion; the labels are present and paired as text.
- **highlight 🟡 D1 advisory** (single-column prose block, default-content candidate): kept as a block — the gradient card is a bespoke style and `styles/styles.css` is frozen (no section style available).
- **Section schema.** `section-schema.mjs` against the prototype found 0 sections (no `data-section` markers); the migrated HTML numbers default-content sections too, which mis-pairs qa-gate's order matcher. Schema regenerated from a scratch copy of the prototype (`stardust/.work/rollout/index/proto/`, `data-section` only on the 4 block elements) → `stardust/eds-schema/index.json`; qa-gate PASS 22 ok / 1 warn (tabs full-bleed, correct: the source `.tabs-section` has no max-width).
- **Gate wiring.** `gate-all.mjs` selects `state.pages[].status === "deployed"` with `liveUrl`, which no lifecycle writer sets; a scratch state (`stardust/.work/rollout/index/state-gate.json`, derived from `stardust/state.json`, never copied back) was passed with `--state`. `--eds-host` must carry the scheme (`https://…`), a bare host builds an invalid URL.
- **Content criterion (documented override, `stardust/replica/gates/all-{1440,360}/overrides.json`).** Default-scope content-presence reports MISSING LINK ×2 = the nav links: the origin nav is `<nav class="site-header">` with no `<header>` landmark (page content), the served nav sits in the `<header>` landmark, which the instrument leaves to the chrome crop gate. Evidence: `content-presence --chrome` 1440 → missing 0 / hidden 0 (`stardust/.work/rollout/index/presence-chrome-1440.json`); crop-compare header band 0.00%, footer band 0.00%; chrome-parity header ✓ 2/2 texts. Raw numbers are reported, not replaced.
- **chrome-parity footer Δ 1**: EXTRA build `<p>` "© 2026 …" — the live footer text is a bare text node, the frozen footer block moves the authored `<p>` (EW1); pixel parity 0.00% on the footer band. No foundation change requested.
- **Stock blocks removed**: `blocks/cards`, `blocks/hero`, `blocks/columns` (unused; referenced the removed `--background-color`). `blocks/widget`, `blocks/fragment` kept (autoblocked by the frozen scripts).
- **Code serving note**: after the second push the identity-encoding object of `/blocks/media-grid/media-grid.js` stayed at the previous version on the edge for >10 min while the gzip/br object (what browsers fetch) was current; admin code-sync POST answered 401 (no admin token in this unit). Browser-facing rendering verified by the gate.

### Gate rows (preview origin)
- 1440: pixel 0.04% (text 0%), Δh 0px, clipped 0, content MISSING 2 / HIDDEN 0 (both nav links, override above; main content 0/0).
- 360: pixel 0.2% (text 0.18%), Δh 0px, clipped 0, content MISSING 2 / HIDDEN 0 (same).
- Crop 1440: header 0.00%, footer 0.00%. chrome-parity: header parity, footer 1 structural delta (text node vs `<p>`).
- Rounds: 1 fix round (media-grid column split: 27.96% / Δh 135px → 0.04% / 0).

### Lint remainder
`npm run lint`: 0 errors; 1 pre-existing warning (`stardust/scripts/deploy/sanitise.js` no-console, not a runtime file). delivery-lint 0/0/0; davids-model-lint PASS (1 🟡 above); block-roundtrip --ew all blocks closed (media-grid exempt 2, dead 0, duplicated 0); localize-links CHECK PASS (`stardust/redirects.tsv` does not exist — run without it; 0 source-host links). foundation-freeze check: unchanged (16 files).

## archetype:page1 — C-deliver unit (2026-10-02)

Page `/page1` (DA `/page1`, template `page1`, type static). Preview `https://main--0f28c839--aemcoder.aem.page/page1`, published to aem.live (deploy-batch, publish=true, ledger `stardust/deploy/ledger-page1.json`). Authored document `content/page1.html`: 2 content sections + metadata (Title "Good Morning!"); strings verbatim from `stardust/migrated/page1/index.html`; no header/footer markup (live `/nav`, `/footer`). Block reuse only: `tabs` as delivered by `archetype:index`, same table authoring (one row per tab: label cell + panel cell), no variant needed (gate 0.00% / 0.06% without one). No block file changed.

### Decode tiers per section
| # | source | authored | block | tier |
|---|---|---|---|---|
| 1 | h1 "Super page" + lede p | default content | — | n/a (styles.css canon h1 / p) |
| 2 | .tabs-section (3 buttons, 3 panels × 2 team cards) | `tabs`, 1 row per tab | tabs (reused) | shell template-slotted; team cards reconstructive (as index) |

### Decisions
- **Hot-linked images (row 3, static-snapshot).** randomuser.me ×6 authored verbatim; `media-reconcile`: 6 keep, exit 0. The DA/preview pipeline rehosted them onto the media bus (`.plain.html`: 6 `<img>`, 0 `/img/`, 0 `about:error`).
- **Section schema.** As on index, `section-schema.mjs` against the prototype on :8791 found 0 sections (no `data-section` markers; `stardust/.work/rollout/page1/schema-8791.json`). Regenerated from a scratch copy (`stardust/.work/rollout/page1/proto/`, `data-section="tabs"` on the one block element, served on :8794) → `stardust/eds-schema/page1.json` (tabs: 6 img, 12 editable texts).
- **qa-gate #124 content cap.** With the site `DESIGN.json` (containerMaxWidth 1200, derived from the index tables) the check fails on page1: the page has no 1200px element — origin and build both cap at 800px (the lede `p`), measured by `cap-probe.mjs` on the live page1 and the harness (compare: `content cap: live 800px = build 800px`, PASS, evidence `stardust/replica/gates/page1-2560/cap-harness.json`). qa-gate re-run with a page1-derived sizing model written by `cap-probe.mjs --write-design` into a scratch copy (`stardust/.work/rollout/page1/DESIGN-page1.json`; the real `DESIGN.json` is unchanged) → PASS 14 ok / 1 warn (tabs full-bleed, correct: source `.tabs-section` has no max-width).
- **block-roundtrip** needs `--map tabs=.tabs-section` against the unmarked prototype; with it: tabs round-trip closed, EW editable 15/15, dead 0, duplicated 0, exempt 0 (`--blocks tabs --ew` and whole-page).
- **Gate wiring.** Scratch state `stardust/.work/rollout/page1/state-gate.json` (page1 set to `deployed` + `liveUrl`, derived from `stardust/state.json`, never copied back) passed with `--state`; `--eds-host` with scheme.
- **Content criterion (documented override, `page1` entries in `stardust/replica/gates/all-{1440,360}/overrides.json`).** MISSING LINK ×2 = the nav links (home → /, page 1 → /page1; origin y 48 at 1440, y 32 at 360), identical cause to index (origin `<nav class="site-header">` has no `<header>` landmark). Evidence: `content-presence --chrome` 1440 → missing 0 / hidden 0 (`stardust/.work/rollout/page1/presence-chrome-1440.json`); crop-compare on the gate captures header band y0+136 0.00%, footer band y762+138 0.00%; chrome-parity with the index region map header ✓ 2/2 texts. 🟠 MISSING BUTTON ×3 = the tab labels (EW7 `div.tab-button` wrappers), not a verdict criterion. Main content 0/0.
- **chrome-parity footer Δ 1**: EXTRA build `<p>` "© 2026 …" (live footer text is a bare text node; the frozen footer block moves the authored `<p>`, EW1) — same as index; footer band pixel 0.00%. No foundation change requested.

### Gate rows (preview origin)
- 1440: pixel 0.00% (text 0%), Δh 0px, clipped 0, content MISSING 2 / HIDDEN 0 (nav links, override above; main content 0/0).
- 360: pixel 0.06% (text 0.44%), Δh 0px, clipped 0, content MISSING 2 / HIDDEN 0 (same).
- Crop 1440: header 0.00%, footer 0.00%. chrome-parity: header parity 2/2, footer 1 structural delta (text node vs `<p>`).
- Rounds: 0 fix rounds.

### Lint remainder
`npm run lint`: 0 errors; 1 pre-existing warning (`stardust/scripts/deploy/sanitise.js` no-console). delivery-lint 0/0/0; davids-model-lint PASS 0 🔴 0 🟡; localize-links CHECK PASS (0 source-host links, no `stardust/redirects.tsv`). foundation-freeze check: unchanged.
