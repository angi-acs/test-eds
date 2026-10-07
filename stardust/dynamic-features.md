<!-- stardust provenance: skill=stardust:replica · phase=preserve-direction (dynamics triage) · curated from stardust/dynamics/dynamic-features.generated-plan.md (9 detector rows) + stardust/current/assets/source-css/script.js · target https://main--0f28c839--aemcoder.aem.page -->

<!-- B2-dynamic verification 2026-10-02T10:13Z: dynamics-detect --from-state --reach re-probed both pages (9 detector rows, identical to the Phase 2 set — YouTube player + its 6 beacon hosts, 3 image hosts; 0 first-party APIs, 0 forms, 0 triggers); dynamics-plan --target-origin https://main--0f28c839--aemcoder.aem.page --migrated stardust/migrated: host-bound 0/0, delivered-by-capture 3 (YouTube, randomuser.me, picsum.photos). No new rows. -->
# Dynamic features — Super Page (static-website.david-bosschaert.workers.dev)

## Listings contract
none — there are no listing blocks, no query index and no same-site data endpoints on either page.

## Features
| # | id | feature | class | reach | disposition | reproducibility | status | pattern | decision / owner | evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | v-video-youtube | YouTube player (embed/b4Rr_7y068U) in the home video section | V media | 1/2 (/) | embed-passthrough | self | planned | media-as-url | none — the video id is public; the iframe is re-authored from the captured src | current/pages/index.json `iframes[0]`; hosts www.youtube.com, i.ytimg.com, yt3.ggpht.com, www.gstatic.com, jnn-pa.googleapis.com, www.google.com, googleads.g.doubleclick.net, static.doubleclick.net are the player's own beacons (detector rows 1, 2, 6, 7, 8 merged here) |
| 2 | c-team-tabs | Team tab switcher (3 buttons, `showTabSection(idx)` toggles `.active` on buttons and panels) | C client-only | 2/2 (/, /page1) | client-only | self | planned | tabs-block | none — 12-line inline script, no network; rebuilt as block JS | current/assets/source-css/script.js; `.tab-buttons button[onclick]` ×3 and `.tab-content` ×3 on both captured pages |
| 3 | i-hotlinked-images | Hot-linked imagery from picsum.photos / fastly.picsum.photos (home) and randomuser.me (both) | I images | 2/2 | static-snapshot | self | planned | capture-state | none — carried verbatim as captured per the replica capture-state policy; unfreeze if the owner supplies first-party assets | detector rows 3, 4, 5 (misclassified as tags: they are `<img src>` hosts, no scripts or beacons) |

No forms, no consent manager, no analytics tags, no search, no personalisation, no hydration placeholders were detected.

## Decision batch
none — every row is reproducibility `self`. (Optional, not blocking: the owner may provide first-party copies of the hot-linked images.)

## Register (decided-out)
| feature | reason | production statement |
|---|---|---|
| — | — | nothing is decided out |
