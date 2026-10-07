# Learnings — static-website.david-bosschaert.workers.dev replica run (2026-10-02)

One entry per failure class this run surfaced. Shape per `skills/stardust/reference/learnings.md`.

### Nav links reported MISSING when the origin has no header landmark
- failure class: false-measurement (landmark asymmetry between origin and served chrome)
- evidence: `content-presence` default scope reported MISSING LINK ×2 (home → /, page 1 → /page1) on both `/` and `/page1` at 1440 and 360; origin nav is `<nav class="site-header">` with no `<header>` landmark, served nav lives in the header block's `<header>`; `--chrome` probe 0 missing / 0 hidden, header crop band 0.00 %. Needed a documented override on every roster row (`stardust/replica/gates/all-1440/overrides.json`, `all-360/overrides.json`).
- proposed change: `skills/diff/scripts/content-presence.mjs` — when the served side has a `<header>`/`<footer>` landmark and the origin does not, derive the origin's chrome region from the served chrome's link set (same href + text) or from a `--chrome-origin <selector>` flag, so chrome links are excluded on both sides symmetrically; document in `skills/replica/reference/source-fidelity-gate.md` § The all-pages published-origin gate (an override should never be the expected path for a clean site).
- status: pending

### Roster gate reads deployment from state.json, which never records it
- failure class: state-contract (gate-all roster selection keyed on a status the core state machine does not emit)
- evidence: `gate-all.mjs` selects pages with `status: deployed` + `liveUrl` from the state file; the core state machine ends at `migrated`, so the C-final roster run needed a scratch state at `stardust/.work/rollout/final/state-gate.json` (journal, C-deliver section, 2026-10-02).
- proposed change: `skills/replica/scripts/gate-all.mjs` — build the roster from `stardust/rollout/coverage/pages.json` (`delivery.status` in deployed/verified, `delivery.deployedUrl`) when that file exists, falling back to the state file; note in `skills/replica/reference/handoff-contract.md` § 4 Script usage.
- status: pending

### EW1 paragraph wrapper counted as a chrome structural delta
- failure class: false-measurement (granularity parity on chrome text)
- evidence: `chrome-parity.mjs` reported 1 delta per page at 1440 and 360: the footer text is an authored `<p>` on the build (required by deploy EW1) and a bare text node on the live site; footer crop band 0.00 % on both pages.
- proposed change: `skills/replica/scripts/chrome-parity.mjs` — treat a text-only `<p>` whose normalized text equals a bare text node in the same parent as parity (EW1 mandates the wrapper); record the rule in `skills/replica/reference/source-fidelity-gate.md` § Chrome parity next to the JOIN/SPLIT granularity policy.
- status: pending

### gate-all --eds-host silently needs the scheme
- failure class: doc-gap (flag format)
- evidence: `gate-all.mjs --eds-host main--0f28c839--aemcoder.aem.live` did not resolve the published origin; `--eds-host https://main--0f28c839--aemcoder.aem.live` did (journal, C-deliver section).
- proposed change: `skills/replica/reference/handoff-contract.md` § 4 Script usage and `skills/replica/SKILL.md` § Phase 5 — write the usage line as `--eds-host https://<host>`; or make `gate-all.mjs` prepend `https://` when the value has no scheme.
- status: pending

### Admin code-sync POST answers 401 with the migration token
- failure class: api-dependency (code-sync not available to the run's credential)
- evidence: `POST https://admin.hlx.page/code/...` returned 401 with the token this run holds; the ordinary git push followed by polling the preview URL for the new code sufficed (journal, C-deliver section).
- proposed change: `skills/deploy/SKILL.md` § code deploy / `skills/replica/reference/handoff-contract.md` § 2 — state that code-sync may be unauthorized for a migration token and that push → poll is the primary path, so the step does not retry the POST.
- status: pending

### Boilerplate blocks left referencing a token the foundation removed
- failure class: silent-render (stock blocks pointing at an undefined custom property after the token rewrite)
- evidence: after the foundation unit replaced the boilerplate tokens, the stock `cards` and `hero` blocks still referenced the removed `--background-color`; caught by reading the lint output, removed in the cluster unit (journal, foundation section, 2026-10-02).
- proposed change: `skills/deploy/SKILL.md` § foundation (C0) — when the foundation drops a boilerplate token, delete or re-point the unused stock blocks in the same unit, and have `skills/rollout/scripts/delivery-lint.mjs` flag `var(--x)` references with no definition in `styles/styles.css`.
- status: pending
