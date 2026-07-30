# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Prototype decision

The user selected ideation option 3: a club-wide weekly hub with a photographic club banner, week navigation, team filters, a 2x2 match-card grid, an empty results state, and the existing blue-magenta Club Handbol Montbui identity. Keep the prototype local until the user explicitly approves publishing.

The user then asked to test the calendar directly below the existing homepage hero. The homepage hero should be roughly half its former height, may use smaller typography, must keep only the `Uneix-te a l’Equip` CTA, and must remove the hero-level calendar button. Keep `Calendari` in the top navigation and retain the calendar as its own section below the compact hero.

The calendar is an insertion, not a replacement for the rest of the homepage. Preserve the recruitment, team, Actualitat/YouTube, contact, and footer sections after the new calendar/results block. The intended order is compact hero, calendar/results, recruitment, team, Actualitat, and contact/footer.

The calendar must use the complete real iSquad season dataset for all configured teams, not a few sample weeks. Every venue name must link to the Google Maps URL supplied by iSquad and open in a separate tab. The default view must show matches in the current Monday-to-Sunday week; before the season starts it falls back to the first available fixtures. Navigation is labelled by `Jornada` rather than ISO week number. The entire prototype, including the restored homepage sections, must switch locally between Catalan, Spanish, and English.

Calendar navigation must stop at the real boundaries: do not show a previous arrow on Jornada 1, do not show a next arrow on the final jornada, and do not wrap from one end of the season to the other.

The top-level `Calendari` navigation item must open a dedicated calendar view. That dedicated view keeps the site header and calendar/results experience, but must not show the photographic Club Handbol Montbui homepage hero, recruitment, team, Actualitat, contact, or footer content. The `Inici` view remains the complete homepage and includes the same calendar experience between the compact Club Handbol Montbui hero and the 2026–2027 recruitment section.

The homepage hero must show `Temporada 2026-2027` directly between `Club Handbol Montbui` and the `Passió · Equip · Victòria` kicker, translated together with the rest of the interface. The season line keeps the title weight and styling but uses 80% of the `Club Handbol Montbui` font size. The calendar heading remains `Calendari i resultats` without the season.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
