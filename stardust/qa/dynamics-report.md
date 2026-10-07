# Dynamics parity check — https://main--0f28c839--aemcoder.aem.live — 2026-10-02T11:20:24.680Z

Replayed 9 checks over 3 features · pass 9 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| home video embed (YouTube) | M | done | dom-count | PASS | 1 × iframe[src*="youtube.com/embed/b4Rr_7y068U"] (min 1) | www.youtube.com:200×7 fonts.gstatic.com:200×1 googleads.g.doubleclick.net:302×1 static.doubleclick.net:200×1 googleads.g.doubleclick.net:200×1 www.google.com:200×1 i.ytimg.com:200×1 www.gstatic.com:200×1 yt3.ggpht.com:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| home video embed (YouTube) | M | done | no-page-errors | PASS | none on 1 page(s) |  |
| team tabs (client-only tab switching) | C | done | dom-count | PASS | 3 × .tabs .tab-button (min 3) | www.youtube.com:200×8 fonts.gstatic.com:200×1 static.doubleclick.net:200×1 googleads.g.doubleclick.net:302×1 www.google.com:200×1 googleads.g.doubleclick.net:200×1 i.ytimg.com:200×1 yt3.ggpht.com:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| team tabs (client-only tab switching) | C | done | dom-count | PASS | 1 × .tabs .tab-content.active (min 1) | www.youtube.com:200×8 fonts.gstatic.com:200×1 static.doubleclick.net:200×1 googleads.g.doubleclick.net:302×1 www.google.com:200×1 googleads.g.doubleclick.net:200×1 i.ytimg.com:200×1 yt3.ggpht.com:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| team tabs (client-only tab switching) | C | done | dom-count | PASS | 3 × .tabs .tab-button (min 3) |  |
| team tabs (client-only tab switching) | C | done | dom-count | PASS | 1 × .tabs .tab-content.active (min 1) |  |
| team tabs (client-only tab switching) | C | done | no-page-errors | PASS | none on 2 page(s) |  |
| hot-linked imagery (picsum.photos, randomuser.me) | I | done | dom-count | PASS | 9 × main img (min 9) | www.youtube.com:200×8 fonts.gstatic.com:200×1 googleads.g.doubleclick.net:302×1 static.doubleclick.net:200×1 www.google.com:200×1 googleads.g.doubleclick.net:200×1 i.ytimg.com:200×1 yt3.ggpht.com:200×1 www.youtube.com:204×1 jnn-pa.googleapis.com:200×1 |
| hot-linked imagery (picsum.photos, randomuser.me) | I | done | dom-count | PASS | 6 × main img (min 6) |  |

## Features without checks
