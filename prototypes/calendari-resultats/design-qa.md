# Design QA — Portada compacta, calendari i contingut preservat

## Comparison target

- Homepage source: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/reference/portada-actual.png`
- Calendar source: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/reference/opcion-3.png`
- Integrated desktop capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-home-calendar-final.png`
- Calendar-section capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-calendar-section-final.png`
- Mobile capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-home-calendar-mobile-final.png`
- Corrected integrated top capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-home-calendar-preserved.png`
- Preserved recruitment capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-recruitment-preserved.png`
- Preserved team capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-team-preserved.png`
- Preserved Actualitat capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-actualitat-preserved.png`
- Preserved contact/footer capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-contact-preserved.png`
- Corrected mobile captures: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-mobile-preserved.png`, `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-recruitment-mobile-preserved.png`, `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-team-mobile-preserved.png`, `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-actualitat-mobile-preserved.png`
- Real-data calendar capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-real-calendar-1487x1058.png`
- Full 82-match season capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-full-season-82.png`
- Real-data mobile capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-real-schedule-mobile.png`
- Full-season mobile capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-full-season-mobile.png`
- English calendar capture: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-full-season-en.png`
- Normalized real-data comparison: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/qa-real-calendar-comparison.png`
- Homepage comparison: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/qa-home-comparison-final.png`
- Calendar focused comparison: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/qa-calendar-integration-comparison-final.png`
- Homepage source and implementation pixels: 1531 × 871 px
- Calendar source and implementation pixels: 1487 × 1058 px
- Mobile pixels: 375 × 844 px
- Density normalization: 1:1 pixel comparison; no resize was applied.
- Compared states: homepage at the top; calendar anchor with `21–27 setembre 2026`, `Tots els equips`, and the full-calendar panel closed.

## Full-view comparison evidence

The homepage comparison confirms the requested transformation: the original hero is reduced from roughly 810 px to 410 px, the large title and supporting copy are scaled down proportionally, the hero-level `Calendari` button is removed, and the join CTA and three club statistics remain. The calendar now starts immediately below the hero and is visible within the original 1531 × 871 frame.

The existing blue-to-magenta overlay, real `grupo.jpg` photograph, white typography, club logo, and top navigation are preserved.

No actionable P0, P1, or P2 visual mismatch remains.

## Focused region comparison evidence

The calendar comparison covers the section title, iSquad confirmation notice, week controls, team filters, 2 × 2 fixture grid, home/away badges, verified opponent and venue data, pending-information banners, and complete-calendar action.

The integrated calendar retains the selected option 3 anatomy and styling. The new section title creates a clear independent destination for the `Calendari` menu link. The top navigation stays visible after jumping to the calendar.

## Required fidelity surfaces

- Fonts and typography: Inter is bundled locally at weights 400–800. The hero title was intentionally reduced to 58 px maximum on desktop and 39 px on mobile. Calendar typography and hierarchy remain unchanged.
- Spacing and layout rhythm: the hero is approximately half its former height. The calendar begins directly below it with a compact section heading. Desktop and mobile spacing were checked visually.
- Colors and visual tokens: the original blue-magenta hero treatment and the selected calendar palette are preserved. Pending data remains visually separate from confirmed venue and opponent data.
- Image quality and asset fidelity: the prototype uses the real `grupo.jpg` homepage photograph and official club logo. Phosphor provides all UI icons; no logo or photograph was approximated.
- Copy and content: Catalan copy is used throughout. There is only one visible `Calendari` link, in the top menu. The hero contains only `Uneix-te a l’Equip`. No unconfirmed exact date, time, or result was invented.

## Interaction and browser checks

- `Calendari` menu anchor: passed (`#calendari-main`).
- Sticky top menu after calendar jump: passed (`headerTop: 0`).
- Hero-level calendar CTA absent: passed; one calendar link remains in the menu.
- Join CTA present: passed.
- Week previous/next controls: passed.
- Matchday navigation boundaries: passed (`Jornada 1`: 0 previous controls, 1 next control; `Jornada 2`: 1 previous control, 1 next control).
- Team filters and single-team state: passed.
- Complete-calendar expand/collapse: passed.
- Season selector: passed.
- Mobile layout at 375 × 844: passed.
- Mobile horizontal overflow: none (`clientWidth: 375`, `scrollWidth: 375`).
- Browser console errors after primary interactions: 0.
- Production build: passed.
- Sites packaging tests: 4 passed, 0 failed.

## Comparison history

### Iteration 1

- [P2] The first integrated version allowed the `Calendari` anchor to scroll the top menu out of view.
- Fix: converted the existing header to sticky positioning and changed the app shell from `overflow: hidden` to horizontal clipping so sticky positioning can work.
- Earlier evidence: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-calendar-section-before-sticky.png`

### Final iteration

- Post-fix evidence: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-calendar-section-final.png`
- The header remains at `top: 0` and the calendar section starts below it.
- No actionable P0, P1, or P2 issue remains.

### Preservation correction

- The calendar is now inserted directly after the compact hero instead of replacing the original homepage body.
- Confirmed document order: `calendari-main`, `nueva-temporada`, `team`, `social-hub`, followed by the original contact/footer.
- Recruitment content is preserved with the existing `f1.png` and `m1.png` player assets, both recruitment routes, the four value points, and WhatsApp/email actions.
- Team content is preserved with the existing `equipos-25-26.jpg` group photograph, explanatory copy, and the three club values.
- Actualitat is preserved with the club YouTube channel, featured match video, and three existing video links.
- Contact details, social links, privacy notice, and legal notice remain in the footer.
- Desktop anchor positions were checked with the sticky header: each restored section lands at approximately 68 px from the viewport top.
- Mobile section order and content were checked at 375 × 844. No horizontal overflow was found (`clientWidth: 360`, `scrollWidth: 360`).
- Browser console errors after calendar and section navigation checks: 0.
- Production build: passed.
- Sites packaging tests: 4 passed, 0 failed.

### Real iSquad data, maps, matchdays, and languages

- Source visual truth: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-calendar-section-final.png`.
- Browser-rendered implementation: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-real-calendar-1487x1058.png`.
- Comparison input: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/qa-real-calendar-comparison.png`.
- Source and implementation pixels: 1487 × 1058 px each. Density normalization: 1:1; no resize was applied.
- Compared state: Catalan, calendar anchor, initial pre-season fallback, Jornada 1, all teams selected, full-season panel closed.
- The approved Option 3 anatomy, team colors, filter strip, 2 × 2 card grid, results block, typography, spacing rhythm, and Phosphor icon language are preserved.
- Intentional content changes are the requested real-data additions: `Jornada 1` replaces the ISO week number, each card shows the real scheduled date, the venue is a map link, the iSquad source is linked, and the full-calendar action states that 82 matches are available.
- All four cards use the live iSquad Jornada 1 fixtures and the first available period because 28 July 2026 is before the first scheduled match week.

#### Full-view and focused evidence

- Full-view comparison confirms that the calendar retains the approved proportions and hierarchy while making the real opponent, date, venue, and confirmation state readable.
- Focused full-season evidence confirms 82 rendered match rows, each with `Jornada`, team, opponent, date, venue link, and time status.
- Google Maps contract: all 82 source matches contain `venue.mapsUrl`; card and season-list links use that exact URL with `target="_blank"`.
- Language controls change the complete page, not only the calendar. Verified headings in Catalan, Spanish, and English for calendar, recruitment, team, Actualitat/News, and contact; `document.documentElement.lang` updates to `ca`, `es`, or `en`.

#### Required fidelity surfaces

- Fonts and typography: Inter 400–800 remains unchanged. Matchday, opponent, date, and venue hierarchy is readable at desktop and mobile sizes.
- Spacing and layout rhythm: the real metadata uses a 2 × 2 grid inside each desktop match card, preserving the original 2 × 2 team-card layout. Mobile uses a single metadata column.
- Colors and visual tokens: the original blue, pink, violet, and coral team treatments and blue-magenta brand gradient are unchanged.
- Image quality and asset fidelity: existing club photographs and official logo remain in place. All UI symbols are Phosphor icons.
- Copy and content: all page sections are available in Catalan, Spanish, and English. Proper team, opponent, and venue names remain as supplied by iSquad.

#### Comparison history

- [P2] First real-data pass used four metadata columns inside each half-width match card, truncating opponent, date, and venue.
  - Fix: changed real metadata to a 2 × 2 grid and retained a one-column mobile layout.
  - Post-fix evidence: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-real-schedule-ca.png`.
- [P2] First mobile full-calendar pass placed the panel title beneath the sticky header and made the narrow `Jornada` column wrap excessively.
  - Fix: increased the panel scroll margin to 78 px on mobile and widened the mobile matchday column.
  - Post-fix evidence: `/Volumes/WD5Tb/Projects/chm/handbol-trio-web/prototypes/calendari-resultats/implementation-full-season-mobile.png`.
- Post-fix horizontal overflow: none (`clientWidth: 360`, `scrollWidth: 360`).
- Browser console errors after matchday navigation, team filtering, 82-row expansion, map-link inspection, and three-language switching: 0.
- Production build: passed.
- Sites packaging tests: 4 passed, 0 failed.

### Matchday navigation boundary correction

- [P2] The earlier calendar treated the season as a circular carousel, so Jornada 1 displayed a previous arrow that wrapped to the final match period.
- Fix: bounded the period index between the first and final available periods and removed the unavailable control at each boundary.
- Jornada 1 browser verification: `Jornada anterior` controls = 0; `Jornada següent` controls = 1.
- Jornada 2 browser verification: `Jornada anterior` controls = 1; `Jornada següent` controls = 1.
- The empty boundary grid slot remains 44 px wide on desktop, keeping the Jornada title centered without rendering an arrow or interactive control.
- Browser console errors: 0.
- Production build: passed.
- Sites packaging tests: 4 passed, 0 failed.

### Dedicated Calendar view and embedded Home calendar

- [P1] The earlier navigation used `#calendari-main` only as an anchor within the full homepage, so choosing `Calendari` still exposed the Club Handbol Montbui hero and all subsequent homepage content.
- Fix: `Calendari` now opens a dedicated view that renders the shared calendar/results experience below the site header and omits all homepage-only sections.
- Dedicated Calendar browser verification: calendar areas = 1; photographic hero = 0; recruitment = 0; team = 0; Actualitat = 0; footer/contact = 0; active navigation item = `Calendari`.
- Home browser verification: hero = 1; calendar = 1; recruitment = 1; team = 1; Actualitat = 1; footer/contact = 1; active navigation item = `Inici`.
- Confirmed Home document order: `home`, `home-calendar`, `nueva-temporada`, `team`, `social-hub`, `contacte`.
- The calendar data, Jornada navigation, team filters, map links, complete-season expansion, results state, and CA/ES/EN switching are shared by both views.
- Browser console errors after switching Home → Calendar → Home → Calendar: 0.
- Production build: passed.
- Sites packaging tests: 4 passed, 0 failed.

## Follow-up polish

- [P3] On narrow phones, the team filters intentionally use horizontal scrolling so labels retain readable size.
- [P3] Real opponent and venue names make some cards denser than the original placeholder mock.

## Final result

final result: passed
