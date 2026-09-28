import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist", "client");
const pages = [
  ["index.html", "ca-ES", "https://chmontbui.es/", "home"],
  ["club/index.html", "ca-ES", "https://chmontbui.es/club/", "club"],
  ["calendari/index.html", "ca-ES", "https://chmontbui.es/calendari/", "calendar"],
  ["contacte/index.html", "ca-ES", "https://chmontbui.es/contacte/", "contact"],
  ["es/index.html", "es-ES", "https://chmontbui.es/es/", "home"],
  ["es/club/index.html", "es-ES", "https://chmontbui.es/es/club/", "club"],
  ["es/calendario/index.html", "es-ES", "https://chmontbui.es/es/calendario/", "calendar"],
  ["es/contacto/index.html", "es-ES", "https://chmontbui.es/es/contacto/", "contact"],
  ["en/index.html", "en", "https://chmontbui.es/en/", "home"],
  ["en/club/index.html", "en", "https://chmontbui.es/en/club/", "club"],
  ["en/calendar/index.html", "en", "https://chmontbui.es/en/calendar/", "calendar"],
  ["en/contact/index.html", "en", "https://chmontbui.es/en/contact/", "contact"],
];

function matches(html, expression) {
  return [...html.matchAll(expression)].map((match) => match[1]);
}

test("localized pages expose crawlable, canonical and parseable HTML", async () => {
  const titles = new Set();
  for (const [file, language, canonical, page] of pages) {
    const html = await readFile(path.join(root, file), "utf8");
    assert.match(html, new RegExp(`<html lang="${language}">`));
    assert.match(html, new RegExp(`<body data-page="${page}">`));
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(html, /<meta name="robots" content="index, follow, max-image-preview:large"/);
    assert.equal(matches(html, /<h1\b[^>]*>([^<]+)/g).length, 1);
    assert.equal(matches(html, /<link rel="alternate" hreflang="(?:ca-ES|es-ES|en|x-default)" href="([^"]+)"/g).length, 4);
    assert.match(html, /Santa Margarida de Montbui/);
    assert.match(html, /Igualada/);
    assert.match(html, /mailto:chmontbui06@gmail\.com/);

    const [title] = matches(html, /<title>([^<]+)<\/title>/g);
    assert.ok(title);
    assert.ok(!titles.has(title), `Duplicate title: ${title}`);
    titles.add(title);

    const jsonLdBlocks = matches(html, /<script type="application\/ld\+json">([^<]+)<\/script>/g);
    assert.equal(jsonLdBlocks.length, 1);
    const graph = JSON.parse(jsonLdBlocks[0]);
    assert.equal(graph["@context"], "https://schema.org");
    assert.ok(graph["@graph"].some((item) => item["@type"] === "SportsOrganization"));
    assert.ok(graph["@graph"].some((item) => item["@id"] === `${canonical}#webpage`));
    assert.equal(graph["@graph"].some((item) => item["@type"] === "BreadcrumbList"), page !== "home");
  }
});

test("sitemap contains only generated canonical pages and reciprocal language alternatives", async () => {
  const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
  const locations = matches(sitemap, /<loc>([^<]+)<\/loc>/g);
  assert.deepEqual(locations.sort(), pages.map(([, , canonical]) => canonical).sort());
  assert.equal(matches(sitemap, /hreflang="x-default" href="([^"]+)"/g).length, pages.length);
  assert.doesNotMatch(sitemap, /clubhandbolmontbui\.com/);
  assert.doesNotMatch(sitemap, /2025-11-30/);
});

test("robots allows search crawlers while excluding source and documentation paths", async () => {
  const robots = await readFile(path.join(root, "robots.txt"), "utf8");
  assert.match(robots, /User-agent: OAI-SearchBot\nAllow: \//);
  assert.match(robots, /User-agent: \*\nAllow: \//);
  assert.match(robots, /Disallow: \/prototypes\//);
  assert.match(robots, /Sitemap: https:\/\/chmontbui\.es\/sitemap\.xml/);
});

test("legacy language URLs are noindex redirects to canonical directories", async () => {
  for (const [file, target] of [["ca.html", "/"], ["es.html", "/es/"], ["en.html", "/en/"]]) {
    const html = await readFile(path.join(root, file), "utf8");
    assert.match(html, /name="robots" content="noindex, follow"/);
    assert.match(html, new RegExp(`url=${target.replaceAll("/", "\\/")}`));
  }
});

test("machine-readable public resources are generated and valid", async () => {
  const club = JSON.parse(await readFile(path.join(root, "dades", "club.json"), "utf8"));
  const calendar = JSON.parse(await readFile(path.join(root, "dades", "calendari.json"), "utf8"));
  assert.equal(club.name, "Club Handbol Montbui");
  assert.equal(club.address.addressLocality, "Santa Margarida de Montbui");
  assert.equal(club.phoneE164, "+34633556228");
  assert.ok(calendar.matches.length > 0);
  await access(path.join(root, "llms.txt"));
});

test("the interactive application preserves one semantic page heading and mobile navigation", async () => {
  const app = await readFile(path.resolve(root, "..", "..", "src", "App.jsx"), "utf8");
  assert.match(app, /const CalendarHeading = pageView === "calendar" \? "h1" : "h2"/);
  assert.match(app, /<CalendarHeading id="calendar-title">/);
  assert.match(app, /<details className="mobile-nav">/);
  assert.match(app, /aria-label=\{t\.menu\}/);
  assert.match(app, /pageView === "club"/);
  assert.match(app, /pageView === "contact"/);
});
