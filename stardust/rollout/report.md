# Rollout report — static-website.david-bosschaert.workers.dev → aem-eds (2026-10-02)

```
rollout — static-website.david-bosschaert.workers.dev → aem-eds
==================================================
Pages       2 total · 2 verified · 0 deployed · 0 pending · 0 content-pending · 0 stale · 0 failed
Templates   2 (index 1/1 · page1 1/1)
Blocks      3 total · 3 converted · 0 pending   (highlight, media-grid, tabs; chrome via foundation header/footer)
Quality     health 98/100 · open P1 0 / P2 0 / P3 1
Pixel table prototypes 2/2 PASS · deployed 2/2 PASS (pixel-only 2/2, 2 documented content overrides) — gates/{prototypes,all}-1440/summary.md
To deliver  none
Content     0 pages awaiting content track
```

## Delivery ledger (published origin https://main--0f28c839--aemcoder.aem.live)

| page | path | template | tier | 1440 px / Δh / clip | 360 px / Δh / clip | content | status |
|---|---|---|---|---|---|---|---|
| index | / | index | archetype | 0.04 % / 0 / 0 | 0.2 % / 0 / 0 | main 0 missing / 0 hidden; nav links via chrome probe (override) | verified · live |
| page1 | /page1 | page1 | archetype | 0.00 % / 0 / 0 | 0.06 % / 0 / 0 | main 0 missing / 0 hidden; nav links via chrome probe (override) | verified · live |

Both pages, the nav and footer documents and the redirects sheet (3 rows mirroring the source's
307s for `/index.html`, `/page1/index.html`, `/page1/`) are published on aem.live; sitemap serves 2.

Overrides: `content-presence` in its default scope reports the two nav links MISSING on both
pages because the origin renders its nav as `<nav class="site-header">` without a `<header>`
landmark, so the instrument counts them as page content, while the served page carries the same
two links inside the header landmark. The `--chrome` probe reports 0 missing / 0 hidden and the
header crop band is 0.00 %. Recorded in `stardust/replica/gates/all-{1440,360}/overrides.json`.

## Dynamic parity (from `stardust/qa/dynamics-report.md`, Phase D2)

| feature | class | reach | disposition | replayed check | result |
|---|---|---|---|---|---|
| home video embed (YouTube) | M (media) | / | passthrough: embed block from the source URL | iframe `youtube.com/embed/b4Rr_7y068U` ×1; 0 page errors | PASS |
| team tabs (client-only switching) | C (client) | /, /page1 | rebuilt as `tabs` block JS (no inline script) | 3 × `.tab-button`, 1 × `.tab-content.active` on both pages; 0 page errors | PASS |
| hot-linked imagery (picsum.photos, randomuser.me) | I (images) | /, /page1 | static snapshot → platform renditions | 9 and 6 `main img` as `/media_*` renditions | PASS |

No forms, search, listings, query-index or host-bound APIs on the source. 9/9 checks PASS.

## Quality

Optimize score 98/100 on the published origin. Open findings: P1 0, P2 0, P3 1 — both pages share
the same meta description because the source carries none (design-pass upstream, not a migration
fix). 3 source-parity rows are informational (the source also lacks description / OG metadata and
loads no web font for its declared Poppins / Playfair Display stack). G-aem autofix: 0 candidates.

## What's missing

Nothing pending, stale, failed or content-pending. The site owner may want to supply per-page
meta descriptions and the licensed web fonts (not part of the replica contract).
