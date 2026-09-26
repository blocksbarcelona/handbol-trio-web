# Calendar score implementation QA — 2026-09-26

final result: passed

## Visual evidence

- Source: `/Users/josep/.codex/generated_images/019faca2-5e98-7b63-9bae-f041eaa270fb/exec-3d58790f-2861-4952-877c-c81c1ddfedc8.png` (2035×773 component mock).
- Desktop: `/Users/josep/Documents/Hetzner/proposals/isquad-desktop.png` (1271×800 browser viewport, 1× CSS pixels).
- Mobile: `/Users/josep/Documents/Hetzner/proposals/isquad-mobile.png` (390×844, 1×).
- Compared mock and desktop capture together, focusing on the selected Cadet femení card, not the surrounding page which the mock omits. Proportions normalized conceptually to the 1136px existing content width; no pixel-identical claim across different crops.

## Findings and iteration

Initial Results section inherited a three-column empty-state grid which squeezed result cards (P1). Fixed with a full-width results row and a separate heading/season row; rechecked desktop and mobile. Added container-responsive score layout for the existing two-column all-teams view. No outstanding P0/P1/P2 issues in changed content.

- Typography: existing Inter retained; score is the strongest element, team labels remain secondary. Long club names wrap on mobile (P3 possible polish).
- Layout: existing tabs, team marker, rounded card, local badge and source strip retained. Desktop metadata sits beside the score; narrow cards stack metadata below it.
- Colors: existing blue/pink/violet/coral variables retained, no new visual theme.
- Assets: existing Phosphor icons reused, no generated or substitute branding.
- Content: 27–23 and 29–26 verified against extracted data. Published, not final. Pending matches have no invented score. Catalan/Spanish/English switch verified.

## Functional checks

Cadet filter, all-teams view, next/previous matchday, expanded/collapsed full calendar, future match without score, Results section, and three languages checked in browser. No page horizontal overflow at 390px; score elements fit their containers. Browser console error log empty. Extractor: 21 tests passed. Web build and four packaging tests passed. Broader unchanged homepage is outside this focused visual review.

## Intentional differences

Preserve production card density and fonts instead of enlarging all text to the raster mock scale. Do not reproduce screenshot text-selection highlights. Full calendar button text follows its actual expanded/collapsed state. Results section now shows real matches instead of the old empty placeholder.
