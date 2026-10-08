<!-- stardust provenance: skill=stardust:replica · phase=preserve-direction (dynamics triage) · pairs with stardust/dynamic-features.md -->
# Dynamic features plan — Super Page replica

Static first, then wire: both archetypes render as complete static pages before any behaviour is added; the inventory never blocks the static path.

## Phase M — media (row 1, embed-passthrough)
- **Deliverable:** the home video section carries the YouTube iframe (`https://www.youtube.com/embed/b4Rr_7y068U`) as an `embed` block authored from the URL (media-as-url).
- **Authoring contract:** one block row with the video URL; the block renders the iframe with the captured frame size.
- **Verification:** pixel gate at 1440/360 (the player's poster frame is inside the capture); `dynamics-check.mjs` confirms the iframe src on the preview URL.
- **Owner decision:** none. **Effort:** small.

## Phase C — client-only (row 2, team tabs)
- **Deliverable:** a `tabs` block whose JS reproduces `showTabSection`: clicking button *i* sets `.active` on button *i* and panel *i* and removes it elsewhere; first tab active on load.
- **Authoring contract:** one block row per tab (label cell + content cell); no inline scripts in content.
- **Verification:** motion-observe on live vs served prototype with the same `--click` pokes (Phase 3 interaction parity), then the pixel gate value must return to the gated number; `dynamics-check.mjs` on the preview URL.
- **Owner decision:** none. **Effort:** small.

## Phase S — static snapshot (row 3, hot-linked images)
- **Deliverable:** image URLs carried as captured; media-reconcile records them as external.
- **Verification:** content-presence (no MISSING images) in the all-pages gate.
- **Unfreeze condition:** the owner supplies first-party assets. **Effort:** none.
