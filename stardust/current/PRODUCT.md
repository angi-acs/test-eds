<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-10-02T09:12:00Z
  readArtifacts:
    - https://static-website.david-bosschaert.workers.dev/
    - https://static-website.david-bosschaert.workers.dev/page1
    - stardust/current/pages/index.json
    - stardust/current/pages/page1.json
    - stardust/current/_brand-extraction.json
  synthesizedInputs: []
  stardustVersion: 0.27.0
  mode: descriptive current state (not authored intent)
-->
# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Visitors of a small demonstration site ("Super Page"). The site presents a home page with sample media and a team roster, and one secondary page with the same team roster. No audience is named on the site; the copy is placeholder text.

_provenance: inferred — basis: the two captured pages contain only demo copy, stock photos (picsum.photos) and random portraits (randomuser.me)._

## Product Purpose

A static showcase site: a titled home page with an embedded YouTube video, three sample photographs, a decorative text block and a tabbed "team" section (Team Alpha / Beta / Gamma, six members), plus a second page that repeats the intro and the team tabs. Success for the migration is that both pages look and behave the same on the new platform.

## Capabilities and Constraints

- Two pages: `/` (home) and `/page1`.
- One interactive widget: a three-tab team switcher driven by a small inline script (`showTabSection`), toggling an `active` class on buttons and panels; the panel fades in over 0.4 s.
- One third-party embed: a YouTube iframe (`b4Rr_7y068U`) on the home page.
- All images are hot-linked from third-party hosts (picsum.photos, randomuser.me); no first-party media.
- No forms, no search, no data endpoints, no analytics of the site's own (YouTube's own beacons only).
- No logo, no favicon, no web fonts served.

## Brand Commitments

- Name: **Super Page** (footer: "© 2026 Super Page. All rights reserved."). Document `<title>` is "Good Morning!" on both pages.
- Register: `brand` (a decorative marketing-style page, not a tool).
- Observed personality: playful and pastel — a soft cyan → lavender → cream page gradient, deep purple display headings with a soft text shadow, teal/cyan accents, white floating cards with purple-tinted shadows, a pink-bordered content block.
- Anti-references observed: nothing dark, nothing flat or corporate; no hard edges (every surface is rounded 8–12 px).

## Evidence on Hand

- `stardust/current/pages/index.json`, `page1.json` — full content, headings, CTAs, media inventory, dynamic surface.
- `stardust/current/pages/index.html`, `page1.html` — settled rendered DOM.
- `stardust/current/assets/screenshots/index.png` (1440×2110), `page1.png` (1440×900).
- `stardust/current/assets/source-css/styles.css`, `script.js` — the site's own stylesheet and tab script (the source of every lifted value).
- `stardust/current/_computed-styles.json` — computed-style census at 1440 and 360.
- `stardust/current/_cap-probe.json` — container sizing model.
- Absent (do not fabricate): logo, favicon, font files, first-party images, meta description, Open Graph tags.

## Product Principles

- Keep what is there: the two pages are migrated as they are, content verbatim.
- One shared chrome (floating white nav bar, centered footer) on every page.
- One shared team-tabs widget whose behavior is identical on both pages.
