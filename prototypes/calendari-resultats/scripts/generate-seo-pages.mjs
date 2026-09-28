#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { club, languageRoutes } from "../src/data/club.js";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputRoot = path.join(projectRoot, "dist", "client");
const schedule = JSON.parse(await readFile(path.join(projectRoot, "src", "data", "isquad-schedule.json"), "utf8"));
const viteHtml = await readFile(path.join(outputRoot, "index.html"), "utf8");
const assetTags = [
  ...viteHtml.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="\/assets\/[^>]+>(?:<\/script>)?/g),
].map((match) => match[0]).join("\n    ");

const pageCopy = {
  ca: {
    homeTitle: languageRoutes.ca.title,
    homeDescription: languageRoutes.ca.description,
    calendarTitle: "Calendari i resultats del CH Montbui | Temporada 2026-2027",
    calendarDescription: "Consulta les jornades, partits, rivals i pavellons dels equips del Club Handbol Montbui durant la temporada 2026-2027.",
    clubTitle: "El Club Handbol Montbui | Handbol a Santa Margarida de Montbui",
    clubDescription: "Coneix els equips, entrenaments i àmbit local del Club Handbol Montbui, club d’handbol de Santa Margarida de Montbui i l’Anoia.",
    contactTitle: "Contacte i ubicació | Club Handbol Montbui",
    contactDescription: "Adreça, telèfon, correu, WhatsApp i indicacions per arribar al Club Handbol Montbui des d’Igualada i l’Anoia.",
    h1: "Club Handbol Montbui",
    intro: "El Club Handbol Montbui és un club d’handbol de Santa Margarida de Montbui, a la comarca de l’Anoia, al costat d’Igualada i Vilanova del Camí. El club ofereix entrenaments i competició per a equips de base i sèniors.",
    contact: "Vols jugar a handbol o provar un entrenament? Contacta amb el Club Handbol Montbui per correu electrònic o WhatsApp.",
    calendarH1: "Calendari i resultats del Club Handbol Montbui",
    clubH1: "Club d’handbol a Santa Margarida de Montbui",
    clubIntro: "El Club Handbol Montbui ofereix entrenaments i competició d’handbol a Santa Margarida de Montbui, a l’Anoia, prop d’Igualada i Vilanova del Camí.",
    contactH1: "Contacte i ubicació del Club Handbol Montbui",
    contactIntro: "Contacta amb el club per consultar la incorporació a un equip, una sessió de prova o qualsevol dubte sobre entrenaments i partits.",
    calendarIntro: "Calendari oficial de la temporada 2026-2027 amb les jornades dels equips federats del CH Montbui. Les dates i hores s’actualitzen a partir d’iSquad quan la Federació Catalana d’Handbol les confirma.",
    teamsHeading: "Equips i competicions",
    contactHeading: "Contacte i ubicació",
    matchesHeading: "Partits programats",
    pending: "Dia exacte i hora pendents de confirmació",
    source: "Font oficial a iSquad",
    homeLink: "Tornar a l’inici",
    calendarLink: "Consultar el calendari",
    clubLink: "Conèixer el club",
    contactLink: "Contactar amb el club",
    breadcrumbHome: "Inici",
  },
  es: {
    homeTitle: languageRoutes.es.title,
    homeDescription: languageRoutes.es.description,
    calendarTitle: "Calendario y resultados del CH Montbui | Temporada 2026-2027",
    calendarDescription: "Consulta las jornadas, partidos, rivales y pabellones de los equipos del Club Handbol Montbui durante la temporada 2026-2027.",
    clubTitle: "El Club Handbol Montbui | Balonmano en Santa Margarida de Montbui",
    clubDescription: "Conoce los equipos, entrenamientos y ámbito local del Club Handbol Montbui, club de balonmano de Santa Margarida de Montbui y l’Anoia.",
    contactTitle: "Contacto y ubicación | Club Handbol Montbui",
    contactDescription: "Dirección, teléfono, correo, WhatsApp e indicaciones para llegar al Club Handbol Montbui desde Igualada y l’Anoia.",
    h1: "Club Handbol Montbui",
    intro: "El Club Handbol Montbui es un club de balonmano de Santa Margarida de Montbui, en la comarca de l’Anoia, junto a Igualada y Vilanova del Camí. El club ofrece entrenamientos y competición para equipos de base y sénior.",
    contact: "¿Quieres jugar a balonmano o probar un entrenamiento? Contacta con el Club Handbol Montbui por correo electrónico o WhatsApp.",
    calendarH1: "Calendario y resultados del Club Handbol Montbui",
    clubH1: "Club de balonmano en Santa Margarida de Montbui",
    clubIntro: "El Club Handbol Montbui ofrece entrenamientos y competición de balonmano en Santa Margarida de Montbui, en l’Anoia, cerca de Igualada y Vilanova del Camí.",
    contactH1: "Contacto y ubicación del Club Handbol Montbui",
    contactIntro: "Contacta con el club para consultar la incorporación a un equipo, una sesión de prueba o cualquier duda sobre entrenamientos y partidos.",
    calendarIntro: "Calendario oficial de la temporada 2026-2027 con las jornadas de los equipos federados del CH Montbui. Las fechas y horas se actualizan desde iSquad cuando las confirma la Federació Catalana d’Handbol.",
    teamsHeading: "Equipos y competiciones",
    contactHeading: "Contacto y ubicación",
    matchesHeading: "Partidos programados",
    pending: "Día exacto y hora pendientes de confirmación",
    source: "Fuente oficial en iSquad",
    homeLink: "Volver al inicio",
    calendarLink: "Consultar el calendario",
    clubLink: "Conocer el club",
    contactLink: "Contactar con el club",
    breadcrumbHome: "Inicio",
  },
  en: {
    homeTitle: languageRoutes.en.title,
    homeDescription: languageRoutes.en.description,
    calendarTitle: "CH Montbui fixtures and results | 2026-2027 season",
    calendarDescription: "View matchdays, fixtures, opponents and venues for Club Handbol Montbui teams during the 2026-2027 season.",
    clubTitle: "Club Handbol Montbui | Handball in Santa Margarida de Montbui",
    clubDescription: "Learn about the teams, training sessions and local area of Club Handbol Montbui, a handball club in Santa Margarida de Montbui and Anoia.",
    contactTitle: "Contact and location | Club Handbol Montbui",
    contactDescription: "Address, telephone, email, WhatsApp and directions to Club Handbol Montbui from Igualada and the Anoia area.",
    h1: "Club Handbol Montbui",
    intro: "Club Handbol Montbui is a handball club in Santa Margarida de Montbui, in the Anoia county, next to Igualada and Vilanova del Camí. The club provides training and competition for youth and senior teams.",
    contact: "Would you like to play handball or attend a trial training session? Contact Club Handbol Montbui by email or WhatsApp.",
    calendarH1: "Club Handbol Montbui fixtures and results",
    clubH1: "Handball club in Santa Margarida de Montbui",
    clubIntro: "Club Handbol Montbui provides handball training and competition in Santa Margarida de Montbui, in the Anoia county, near Igualada and Vilanova del Camí.",
    contactH1: "Contact and location of Club Handbol Montbui",
    contactIntro: "Contact the club to ask about joining a team, attending a trial training session, or any questions about training and matches.",
    calendarIntro: "Official 2026-2027 season calendar for CH Montbui’s federated teams. Dates and times are updated from iSquad when they are confirmed by the Catalan Handball Federation.",
    teamsHeading: "Teams and competitions",
    contactHeading: "Contact and location",
    matchesHeading: "Scheduled matches",
    pending: "Exact day and time awaiting confirmation",
    source: "Official iSquad source",
    homeLink: "Back to home",
    calendarLink: "View the calendar",
    clubLink: "Learn about the club",
    contactLink: "Contact the club",
    breadcrumbHome: "Home",
  },
};

const routeEntries = Object.entries(languageRoutes);
const xmlEscape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
const htmlEscape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function absoluteUrl(relativePath) {
  return new URL(relativePath, club.canonicalUrl).href;
}

function alternates(kind) {
  return routeEntries.map(([language, route]) => ({
    language,
    locale: route.locale,
    path: route[`${kind}Path`],
  }));
}

function organizationGraph(language, canonical, title, description, pageType, page) {
  const graph = [
    {
      "@type": "SportsOrganization",
      "@id": club.id,
      name: club.name,
      alternateName: club.shortName,
      description,
      sport: club.sport,
      url: club.canonicalUrl,
      email: club.email,
      telephone: club.phoneE164,
      logo: { "@type": "ImageObject", "@id": `${club.canonicalUrl}#logo`, url: club.logo },
      image: { "@type": "ImageObject", url: club.image },
      address: {
        "@type": "PostalAddress",
        streetAddress: club.address.streetAddress,
        addressLocality: club.address.addressLocality,
        postalCode: club.address.postalCode,
        addressRegion: club.address.addressRegion,
        addressCountry: club.address.addressCountry,
      },
      areaServed: [
        { "@type": "City", name: "Santa Margarida de Montbui" },
        { "@type": "City", name: "Igualada" },
        { "@type": "City", name: "Vilanova del Camí" },
        { "@type": "AdministrativeArea", name: "l’Anoia" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "club enquiries",
        email: club.email,
        telephone: club.phoneE164,
        availableLanguage: club.languages,
      },
      sameAs: [...club.socialProfiles, club.officialReferences.municipality],
    },
    {
      "@type": "WebSite",
      "@id": club.websiteId,
      url: club.canonicalUrl,
      name: club.name,
      inLanguage: club.languages,
      publisher: { "@id": club.id },
    },
    {
      "@type": pageType,
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: languageRoutes[language].locale,
      isPartOf: { "@id": club.websiteId },
      about: { "@id": club.id },
      dateModified: page === "calendar" ? schedule.generatedAt.slice(0, 10) : club.contentLastModified,
      ...(page === "home" ? {} : { breadcrumb: { "@id": `${canonical}#breadcrumb` } }),
    },
  ];

  if (page !== "home") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: pageCopy[language].breadcrumbHome, item: absoluteUrl(languageRoutes[language].homePath) },
        { "@type": "ListItem", position: 2, name: title, item: canonical },
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function teamList(language) {
  const teams = new Map();
  for (const match of schedule.matches) {
    teams.set(match.configuredTeam.id, `${match.competition.category} — ${match.competition.name}, ${match.competition.phase}`);
  }
  return [...teams.values()].sort().concat({ ca: "Aleví · entrenaments", es: "Alevín · entrenamientos", en: "U12 · training" }[language]);
}

function fallbackMarkup(language, page) {
  const copy = pageCopy[language];
  const route = languageRoutes[language];
  const teams = teamList(language).map((team) => `<li>${htmlEscape(team)}</li>`).join("");
  const matches = schedule.matches.map((match) => {
    const side = match.configuredTeam.isHome ? `${club.shortName} – ${match.opponent.name}` : `${match.opponent.name} – ${club.shortName}`;
    const publishedScore = match.score && Number.isFinite(match.score.home) && Number.isFinite(match.score.away)
      ? `${match.score.home}–${match.score.away}` : null;
    const scoreLabel = { ca: "Resultat publicat", es: "Resultado publicado", en: "Published score" }[language];
    const status = [match.readyForPublication && match.time ? match.time : copy.pending, publishedScore ? `${scoreLabel}: ${publishedScore}` : null].filter(Boolean).join(" · ");
    return `<li><article><h2>${htmlEscape(side)}</h2><p>${htmlEscape(match.competition.category)} · Jornada ${match.round.number} · ${htmlEscape(match.date)} · ${htmlEscape(status)}</p><p>${htmlEscape(match.venue.name)} · <a href="${htmlEscape(match.venue.mapsUrl)}">Google Maps</a> · <a href="${htmlEscape(match.source.pageUrl)}">${copy.source}</a></p></article></li>`;
  }).join("");

  const breadcrumb = `<nav aria-label="Breadcrumb"><a href="${route.homePath}">${copy.breadcrumbHome}</a> / <span aria-current="page">${htmlEscape(page === "calendar" ? copy.calendarH1 : page === "club" ? copy.clubH1 : copy.contactH1)}</span></nav>`;

  if (page === "calendar") {
    return `<div class="seo-fallback"><header><a href="${route.homePath}">${club.name}</a></header>${breadcrumb}<main><h1>${copy.calendarH1}</h1><p>${copy.calendarIntro}</p><p><strong>${schedule.summary.matches}</strong> ${copy.matchesHeading.toLowerCase()} · Temporada ${club.season}</p><ol>${matches}</ol><p><a href="${route.clubPath}">${copy.clubLink}</a> · <a href="${route.contactPath}">${copy.contactLink}</a></p></main><footer><address>${club.address.streetAddress}, ${club.address.addressDistrict}, ${club.address.postalCode} ${club.address.addressLocality}</address><a href="mailto:${club.email}">${club.email}</a></footer></div>`;
  }

  if (page === "club") {
    return `<div class="seo-fallback"><header><a href="${route.homePath}">${club.name}</a></header>${breadcrumb}<main><h1>${copy.clubH1}</h1><p>${copy.clubIntro}</p><section><h2>${copy.teamsHeading}</h2><ul>${teams}</ul><p><a href="${route.calendarPath}">${copy.calendarLink}</a></p></section><section><h2>${copy.contactHeading}</h2><address>${club.address.streetAddress}, ${club.address.addressDistrict}, ${club.address.postalCode} ${club.address.addressLocality}, ${club.county}, ${club.autonomousCommunity}</address><p><a href="mailto:${club.email}">${club.email}</a> · <a href="${route.contactPath}">${copy.contactLink}</a></p></section></main></div>`;
  }

  if (page === "contact") {
    return `<div class="seo-fallback"><header><a href="${route.homePath}">${club.name}</a></header>${breadcrumb}<main><h1>${copy.contactH1}</h1><p>${copy.contactIntro}</p><section><h2>${copy.contactHeading}</h2><address>${club.address.streetAddress}, ${club.address.addressDistrict}, ${club.address.postalCode} ${club.address.addressLocality}, ${club.county}, ${club.address.addressRegion}, ${club.autonomousCommunity}</address><p><a href="mailto:${club.email}">${club.email}</a> · <a href="tel:${club.phoneE164}">${club.phoneDisplay}</a> · <a href="https://wa.me/${club.phoneE164.replace("+", "")}">WhatsApp</a></p><p><a href="https://www.google.com/maps/dir/Igualada/41.5719504,1.6030128">Google Maps: Igualada → Club Handbol Montbui</a></p></section><p><a href="${route.calendarPath}">${copy.calendarLink}</a></p></main></div>`;
  }

  return `<div class="seo-fallback"><header><strong>${club.name}</strong></header><main><h1>${copy.h1}</h1><p>${copy.intro}</p><section><h2>${copy.teamsHeading}</h2><ul>${teams}</ul><p><a href="${route.clubPath}">${copy.clubLink}</a> · <a href="${route.calendarPath}">${copy.calendarLink}</a></p></section><section><h2>${copy.contactHeading}</h2><p>${copy.contact}</p><address>${club.address.streetAddress}, ${club.address.addressDistrict}, ${club.address.postalCode} ${club.address.addressLocality}, ${club.county}, ${club.autonomousCommunity}</address><p><a href="mailto:${club.email}">${club.email}</a> · <a href="tel:${club.phoneE164}">${club.phoneDisplay}</a> · <a href="${route.contactPath}">${copy.contactLink}</a></p></section></main></div>`;
}

function renderPage(language, page) {
  const route = languageRoutes[language];
  const copy = pageCopy[language];
  const pageDefinition = {
    home: { title: copy.homeTitle, description: copy.homeDescription, type: "WebPage" },
    club: { title: copy.clubTitle, description: copy.clubDescription, type: "AboutPage" },
    calendar: { title: copy.calendarTitle, description: copy.calendarDescription, type: "CollectionPage" },
    contact: { title: copy.contactTitle, description: copy.contactDescription, type: "ContactPage" },
  }[page];
  const relativePath = route[`${page}Path`];
  const canonical = absoluteUrl(relativePath);
  const { title, description, type } = pageDefinition;
  const hreflang = alternates(page).map(({ locale, path: alternatePath }) => `    <link rel="alternate" hreflang="${locale}" href="${absoluteUrl(alternatePath)}" />`).join("\n");
  const xDefault = absoluteUrl(languageRoutes.ca[`${page}Path`]);
  const graph = organizationGraph(language, canonical, title, description, type, page);

  return `<!doctype html>
<html lang="${route.locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <title>${htmlEscape(title)}</title>
    <meta name="description" content="${htmlEscape(description)}" />
    <meta name="author" content="${club.name}" />
    <meta name="theme-color" content="#1575ef" />
    <link rel="canonical" href="${canonical}" />
${page === "home" ? '    <link rel="preload" as="image" href="/assets/grupo.webp" fetchpriority="high" />' : ""}
${hreflang}
    <link rel="alternate" hreflang="x-default" href="${xDefault}" />
    <link rel="icon" type="image/png" href="/assets/logo.png" />
    <meta property="og:title" content="${htmlEscape(title)}" />
    <meta property="og:description" content="${htmlEscape(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${club.image}" />
    <meta property="og:locale" content="${route.locale.replace("-", "_")}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${htmlEscape(title)}" />
    <meta name="twitter:description" content="${htmlEscape(description)}" />
    <meta name="twitter:image" content="${club.image}" />
    <script type="application/ld+json">${JSON.stringify(graph)}</script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-0RY8SSNERL"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","G-0RY8SSNERL");</script>
    <style>.seo-fallback{max-width:76rem;margin:0 auto;padding:1.5rem;font:16px/1.6 system-ui,sans-serif;color:#1d2330}.seo-fallback h1,.seo-fallback h2{line-height:1.2}.seo-fallback li{margin-block:.5rem}.seo-fallback address{font-style:normal}</style>
    ${assetTags}
  </head>
  <body data-page="${page}">
    <div id="root">${fallbackMarkup(language, page)}</div>
  </body>
</html>
`;
}

async function writeOutput(relativePath, contents) {
  const destination = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, contents, "utf8");
}

const generatedPages = [];
for (const [language, route] of routeEntries) {
  for (const page of ["home", "club", "calendar", "contact"]) {
    const routePath = route[`${page}Path`];
    const relativePath = routePath === "/" ? "index.html" : `${routePath.replace(/^\//, "")}index.html`;
    await writeOutput(relativePath, renderPage(language, page));
    generatedPages.push({ language, page, routePath, relativePath });
  }
}

const legacyRedirects = {
  "ca.html": "/",
  "es.html": "/es/",
  "en.html": "/en/",
};
for (const [file, target] of Object.entries(legacyRedirects)) {
  await writeOutput(file, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex, follow"><link rel="canonical" href="${absoluteUrl(target)}"><meta http-equiv="refresh" content="0;url=${target}"><title>Club Handbol Montbui</title></head><body><p><a href="${target}">Club Handbol Montbui</a></p></body></html>\n`);
}

await writeOutput("404.html", `<!doctype html>
<html lang="ca-ES"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, follow"><title>Pàgina no trobada | Club Handbol Montbui</title><link rel="icon" href="/assets/logo.png"><style>body{margin:0;display:grid;min-height:100vh;place-items:center;background:#f5f7fb;color:#1d2330;font:16px/1.6 system-ui,sans-serif}main{max-width:38rem;padding:2rem;text-align:center}h1{font-size:clamp(3rem,12vw,7rem);margin:0;color:#1575ef}a{color:#c42592;font-weight:700}</style></head><body><main><h1>404</h1><h2>Pàgina no trobada</h2><p>La pàgina no existeix o ha canviat d’adreça.</p><p><a href="/">Torna al web del Club Handbol Montbui</a></p></main></body></html>\n`);

const sitemapEntries = generatedPages.map(({ page, routePath }) => {
  const lastmod = page === "calendar" ? schedule.generatedAt.slice(0, 10) : club.contentLastModified;
  const links = alternates(page).map(({ locale, path: alternatePath }) => `    <xhtml:link rel="alternate" hreflang="${locale}" href="${xmlEscape(absoluteUrl(alternatePath))}"/>`).join("\n");
  const xDefault = absoluteUrl(languageRoutes.ca[`${page}Path`]);
  return `  <url>\n    <loc>${xmlEscape(absoluteUrl(routePath))}</loc>\n    <lastmod>${lastmod}</lastmod>\n${links}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(xDefault)}"/>\n  </url>`;
}).join("\n");

await writeOutput("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries}\n</urlset>\n`);
await writeOutput("robots.txt", `User-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: *\nAllow: /\nDisallow: /prototypes/\nDisallow: /docs/\nDisallow: /.github/\n\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`);
await writeOutput("llms.txt", `# Club Handbol Montbui\n\nOfficial website of Club Handbol Montbui, a handball club in Santa Margarida de Montbui, l'Anoia, near Igualada, Catalonia. This file is a complementary navigation aid and does not replace HTML pages, robots.txt or sitemap.xml.\n\n## Canonical pages\n\n- Català: ${absoluteUrl("/")}\n- El club: ${absoluteUrl("/club/")}\n- Calendari: ${absoluteUrl("/calendari/")}\n- Contacte: ${absoluteUrl("/contacte/")}\n- Castellano: ${absoluteUrl("/es/")}\n- El club (ES): ${absoluteUrl("/es/club/")}\n- Calendario: ${absoluteUrl("/es/calendario/")}\n- Contacto: ${absoluteUrl("/es/contacto/")}\n- English: ${absoluteUrl("/en/")}\n- The club: ${absoluteUrl("/en/club/")}\n- Calendar: ${absoluteUrl("/en/calendar/")}\n- Contact: ${absoluteUrl("/en/contact/")}\n- Sitemap: ${absoluteUrl("/sitemap.xml")}\n\n## Verified contact\n\n- Email: ${club.email}\n- Address: ${club.address.streetAddress}, ${club.address.addressDistrict}, ${club.address.postalCode} ${club.address.addressLocality}, ${club.county}, ${club.autonomousCommunity}\n\nCalendar data is sourced from iSquad and updated when the Catalan Handball Federation confirms changes.\n`);
await writeOutput("dades/club.json", `${JSON.stringify(club, null, 2)}\n`);
await writeOutput("dades/calendari.json", `${JSON.stringify(schedule, null, 2)}\n`);

process.stdout.write(`Generated ${generatedPages.length} crawlable localized pages, sitemap.xml, robots.txt, llms.txt and public data feeds.\n`);
