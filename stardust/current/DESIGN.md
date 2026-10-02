<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-10-02T09:14:00Z
  readArtifacts:
    - https://static-website.david-bosschaert.workers.dev/styles.css
    - stardust/current/_computed-styles.json
    - stardust/current/_brand-extraction.json
    - stardust/current/_cap-probe.json
  synthesizedInputs: []
  stardustVersion: 0.27.0
  mode: descriptive current state (not authored intent)
-->
---
name: Super Page
description: Playful pastel showcase site — purple serif display headings, white rounded cards on a cyan-to-cream gradient ground
colors:
  primary: "#6a1b9a"
  primary-deep: "#4a148c"
  lede: "#5e35b1"
  secondary: "#00897b"
  secondary-accent: "#26c6da"
  tertiary: "#ec407a"
  tab-active: "#2196f3"
  text-primary: "#333333"
  text-block: "#444444"
  text-tab: "#666666"
  text-footer: "#777777"
  surface: "#ffffff"
  surface-muted: "#f8f8f8"
  surface-hover: "#f3e5f5"
  border: "#dddddd"
  border-footer: "#e0e0e0"
  ground-start: "#e0f7fa"
  ground-mid: "#f3e5f5"
  ground-end: "#fff8e1"
  block-end: "#fce4ec"
typography:
  display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: "-0.5px"
  heading:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.6
  lede:
    fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 500
    lineHeight: 1.6
  body:
    fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  block:
    fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.8
  nav:
    fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
  tab:
    fontFamily: "system-ui button default"
    fontSize: "1.1em"
    fontWeight: 700
  footer:
    fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  pill: "50%"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "2.5rem"
components:
  nav-link:
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "0.4rem 1rem"
    typography: "{typography.nav}"
  nav-link-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.primary-deep}"
  media-cell:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "1rem"
  content-block:
    textColor: "{colors.text-block}"
    rounded: "{rounded.lg}"
    padding: "2rem"
    typography: "{typography.block}"
  tabs-section:
    backgroundColor: "{colors.surface-muted}"
    rounded: "{rounded.lg}"
    padding: "1em"
  tab-button:
    textColor: "{colors.text-tab}"
    padding: "1em 2em"
    typography: "{typography.tab}"
  tab-button-active:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tab-active}"
  team-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "1em"
    width: "48%"
---

# Super Page — current-state design system

Descriptive record of the live site as captured on 2026-10-02. Every value is lifted from the site's own `styles.css` or the computed-style census; nothing here is proposed.

## Overview

A single-column, centered page on a soft diagonal gradient ground (cyan `#e0f7fa` → lavender `#f3e5f5` → cream `#fff8e1`, 135°). Content sits in white rounded cards that float on purple-tinted shadows. Headings are a deep purple serif display face; body copy is a medium-weight sans. The feel is playful and pastel.

**The Floating-Card Rule.** Every piece of content lives on a white (or near-white) rounded surface with a soft colored shadow; nothing sits bare on the gradient except the headings and the lede.

## Colors

- **Primary — deep purple (`#6a1b9a`).** The h1 and the nav links; also tints the card shadows (`rgba(106,27,154,0.12)`). Hover deepens to `#4a148c`.
- **Lede purple (`#5e35b1`).** All `<p>` text, which the site centers and caps at 800 px.
- **Secondary — teal (`#00897b`) with cyan accent (`#26c6da`).** The h2 color and its 3 px underline; cyan also becomes the card border on hover.
- **Tertiary — pink (`#ec407a`).** The 4 px left border of the content block, whose ground fades white → `#fce4ec`.
- **Tab blue (`#2196f3`).** Active tab text and 3 px underline — the one color outside the purple/teal/pink family.
- **Neutrals.** Body text `#333`, block text `#444`, tab text `#666`, footer `#777`; surfaces white, tabs section `#f8f8f8`; borders `#ddd` (tab bar) and `#e0e0e0` (footer top).

## Typography

- **Display (h1):** serif stack `'Playfair Display', Georgia, serif`, 3 rem / 700, letter-spacing −0.5 px, centered, text-shadow `2px 2px 4px rgba(106,27,154,0.15)`; 1.8 rem at ≤ 768 px.
- **Heading (h2):** same serif, 2 rem / 600, teal, `display: inline-block` with a 3 px cyan bottom border and 0.5 rem padding below; margins 2.5 rem above, 1.5 rem below; 1.4 rem at ≤ 768 px.
- **Lede (p):** sans stack, 1.15 rem / 500, lede purple, centered, max-width 800 px, 2 rem below.
- **Body:** sans stack, line-height 1.6; the content block is 1.05 rem at line-height 1.8.
- **Card names (h4):** 1 em / bold in the body stack, 0.2 em vertical margin.
- **Buttons (tabs):** browser button default family (computed Arial), 1.1 em / bold.

**The No-Webfont Rule.** The stylesheet names Poppins and Playfair Display but the site serves no font files, so the rendered faces are the system fallbacks. The replica keeps the identical stacks and serves no fonts either.

## Layout

- Body padding 2 rem (1 rem at ≤ 768 px); no outer container — each block centers itself with `max-width: 1200px; margin: … auto`.
- Media rows are `<table>`s: `border-collapse: separate; border-spacing: 1.5rem`, two cells per row, each cell a white card; at ≤ 768 px the row stacks (`display: flex; column`, 1 rem gap, 0 spacing).
- Media inside cells: `width: 100%; aspect-ratio: 16/9; border-radius: 8px`.
- The tabs section spans the full body width (`margin: 2em 0`), its two team cards are 48 % each; at ≤ 900 px they stack at 100 % with a 1.2 em gap.
- Header: flex row, 1.5 rem gap, max-width 1200 px, padding 1 rem 1.5 rem, 2 rem below.
- Footer: max-width 1200 px, 2 rem above, 1.5 rem padding, centered, 2 px top border.
- Content caps (measured): 1200 px on the header/footer/tables/content block, 800 px on the lede; the h2 is shrink-wrapped (285 px). The home page's content cap is 1200 px, Page 1's widest content box is the 800 px lede.

## Elevation & Depth

- Card shadow: `0 4px 20px rgba(106,27,154,0.12)` (header, media cells).
- Card hover: `translateY(-4px)`, `0 8px 30px rgba(0,150,136,0.2)`, cyan border; 0.3 s ease.
- Content block shadow: `0 4px 20px rgba(233,30,99,0.1)`.
- Team card shadow: `0 2px 8px rgba(0,0,0,0.07)`.

## Shapes

- 12 px on cards, header, content block, tabs section; 10 px on team cards; 8 px on nav links and media; avatars are 120 px circles (`50%`, `object-fit: cover`).

## Components

- **Nav link:** 0.4 rem 1 rem padding, 8 px radius, 600 weight, purple; hover lavender ground and deep purple text, 0.2 s.
- **Media cell:** white card, 1 rem padding, 2 px transparent border that turns cyan on hover.
- **Content block:** white→pink gradient, 2 rem padding, pink left border.
- **Tabs:** `#f8f8f8` section with 1 em padding; button row with a 2 px `#ddd` bottom border; buttons 1 em 2 em padding, bold, grey; the active button is blue with a 3 px blue bottom border on a white ground. Panels are hidden unless active; the active panel is a flex row with a 2 em gap and fades in over 0.4 s.
- **Team card:** white, 10 px radius, 1 em padding, column-centered: 120 px round avatar, name (h4), one-line bio (p inherits the lede style).

## Do's and Don'ts

- Do keep every value above exactly; this is a same-design migration.
- Don't add fonts, a logo or a favicon the source does not have.
- Don't "fix" the lede styling that the team-card bios inherit (centered purple 1.15 rem text); it is how the source renders.
