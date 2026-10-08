---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-10-02T09:48:33Z
  againstInput: https://static-website.david-bosschaert.workers.dev/
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://static-website.david-bosschaert.workers.dev/,
promoted verbatim (no direct invocation, no creative decisions).

Promoted: current/PRODUCT.md → PRODUCT.md · current/DESIGN.md → DESIGN.md ·
current/DESIGN.json → DESIGN.json (at 2026-10-02T09:46:00Z; byte-identical copies, full-prep branch).

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(2 entries: R-01 deferred — favicon; R-02 applied — tab strip overflow fix at ≤ 768 px).

Fidelity: ia verbatim · design verbatim · content verbatim.

Gate breakpoints: 1440 (desktop) and 360 (mobile). Dynamic surface: stardust/dynamic-features.md.
