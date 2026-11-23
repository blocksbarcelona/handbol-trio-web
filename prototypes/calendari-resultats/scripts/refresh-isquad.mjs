import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const prototypeRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(prototypeRoot, "..", "..");
const schedulePath = path.join(prototypeRoot, "src", "data", "isquad-schedule.json");
const publicDataPath = path.join(repoRoot, "dades", "calendari.json");

const DEFAULT_HEADERS = {
  "user-agent": "CH-Montbui-Calendar/0.1 (+weekly public fixture check)",
  accept: "text/html,application/xhtml+xml"
};
const BETA_BASE_URL = "https://resultadosbalonmano.isquad.es/maqueta/";
const BETA_API_URL = "https://resultadosbalonmano.isquad.es/maqueta/json/beta.php";

function cleanText(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function parseSpanishDate(value) {
  const match = cleanText(value).match(/\b(\d{1,2})[/-](\d{1,2})[/-](\d{4})\b/);
  if (!match) return null;
  return `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

function parseIsoDatePart(value) {
  const match = cleanText(value).match(/\b(\d{4}-\d{2}-\d{2})\b/);
  return match ? match[1] : null;
}

function normalizeTime(value) {
  const match = cleanText(value).match(/\b(\d{1,2}):(\d{2})\b/);
  if (!match) return null;
  const time = `${match[1].padStart(2, "0")}:${match[2]}`;
  return time === "00:00" ? null : time;
}

function buildMapsUrl(lat, lon, venueName, address) {
  const cleanLat = cleanText(lat);
  const cleanLon = cleanText(lon);
  if (cleanLat && cleanLon && !Number.isNaN(Number(cleanLat)) && !Number.isNaN(Number(cleanLon))) {
    return `https://www.google.com/maps/?q=${cleanLat},${cleanLon}`;
  }
  const query = [cleanText(venueName), cleanText(address)].filter(Boolean).join(", ");
  if (!query) return null;
  return `https://www.google.com/maps/?q=${encodeURIComponent(query)}`;
}

function parseJsonScore(match) {
  if (!Number(match.ver)) return { score: null, scoreSource: ["-"] };
  if (cleanText(match.estado).toLocaleLowerCase("es") === "pendiente") {
    return { score: null, scoreSource: ["-"] };
  }
  if (match.gl === null || match.gl === undefined || match.gl === "") {
    return { score: null, scoreSource: ["-"] };
  }
  if (match.gv === null || match.gv === undefined || match.gv === "") {
    return { score: null, scoreSource: ["-"] };
  }
  const home = Number(match.gl);
  const away = Number(match.gv);
  if (!Number.isInteger(home) || !Number.isInteger(away)) {
    return { score: null, scoreSource: ["-"] };
  }
  return {
    score: { home, away, status: "published" },
    scoreSource: [`${home} - ${away}`]
  };
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchClientToken(timeoutMs = 20_000) {
  const response = await fetch(BETA_BASE_URL, {
    headers: DEFAULT_HEADERS,
    redirect: "follow",
    signal: AbortSignal.timeout(timeoutMs)
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText} fetching iSquad token`);
  }
  const html = await response.text();
  const match = html.match(/<meta\s+name=["']client-token["']\s+content=["']([^"']+)["']/i);
  if (!match?.[1]) {
    throw new Error("iSquad /maqueta/ did not include meta[name='client-token']");
  }
  return match[1];
}

async function fetchBetaApi(tipo, tournamentId, tokenRef, attempts = 3, timeoutMs = 20_000) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      if (!tokenRef.value || attempt > 1) {
        tokenRef.value = await fetchClientToken(timeoutMs);
      }
      const response = await fetch(BETA_API_URL, {
        method: "POST",
        headers: {
          "user-agent": DEFAULT_HEADERS["user-agent"],
          accept: "application/json, text/plain, */*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-client-token": tokenRef.value
        },
        body: new URLSearchParams({ tipo, id: String(tournamentId) }),
        signal: AbortSignal.timeout(timeoutMs)
      });
      if (response.status === 403) tokenRef.value = null;
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      return { data: await response.json(), fetchedAt: new Date().toISOString() };
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await delay(400 * 2 ** (attempt - 1));
    }
  }
  throw lastError;
}

async function fetchBetaTournament(tournamentId, tokenRef, attempts = 3, timeoutMs = 20_000) {
  const result = await fetchBetaApi("torneo", tournamentId, tokenRef, attempts, timeoutMs);
  if (!result.data || !Array.isArray(result.data.partidos) || result.data.partidos.length === 0) {
    throw new Error(`Empty partidos list for tournament ${tournamentId}`);
  }
  return result;
}

async function fetchBetaStandings(tournamentId, tokenRef, attempts = 3, timeoutMs = 20_000) {
  try {
    const result = await fetchBetaApi("clasificacion", tournamentId, tokenRef, attempts, timeoutMs);
    if (!result.data || !Array.isArray(result.data.filas)) return null;
    return result.data;
  } catch {
    return null;
  }
}

function buildTeamNameMap(partidos) {
  const names = new Map();
  for (const item of partidos ?? []) {
    if (item?.l?.id != null && item?.l?.n) names.set(String(item.l.id), cleanText(item.l.n));
    if (item?.v?.id != null && item?.v?.n) names.set(String(item.v.id), cleanText(item.v.n));
  }
  return names;
}

function parseStandings(standingsData, teamNames, team) {
  if (!standingsData?.filas?.length) return null;
  const rows = standingsData.filas
    .map(row => {
      const id = String(row.id_equipo);
      const streak = Array.isArray(standingsData.racha?.[id])
        ? standingsData.racha[id].slice(-5).map(entry => entry.resultado)
        : [];
      return {
        position: Number(row.posicion),
        teamId: id,
        teamName: teamNames.get(id) ?? `Equip ${id}`,
        isClub: id === team.teamId,
        points: Number(row.puntos ?? 0),
        played: Number(row.jugados ?? 0),
        won: Number(row.ganados ?? 0),
        drawn: Number(row.empatados ?? 0),
        lost: Number(row.perdidos ?? 0),
        goalsFor: Number(row.goles_a_favor ?? 0),
        goalsAgainst: Number(row.goles_en_contra ?? 0),
        goalDiff: Number(row.diferencia_goles ?? 0),
        form: streak
      };
    })
    .sort((a, b) => a.position - b.position);

  return {
    teamId: team.id,
    label: team.label,
    competition: team.competition,
    sourceUrl: team.sourcePageUrl,
    rows
  };
}

function deriveTeamConfigs(existing) {
  const byTeamId = new Map();
  for (const match of existing.matches ?? []) {
    const teamId = match.configuredTeam?.id;
    if (!teamId || byTeamId.has(teamId)) continue;
    const isHome = Boolean(match.configuredTeam.isHome);
    const clubSide = isHome ? match.home : match.away;
    byTeamId.set(teamId, {
      id: teamId,
      label: match.configuredTeam.label,
      teamName: match.configuredTeam.name,
      teamId: String(clubSide.id),
      competition: match.competition,
      calendarUrl: match.source.calendarUrl,
      sourcePageUrl: match.source.pageUrl
    });
  }
  const ordered = [];
  for (const status of existing.sourceStatus ?? []) {
    const team = byTeamId.get(status.teamId);
    if (team) ordered.push(team);
  }
  return ordered.length > 0 ? ordered : [...byTeamId.values()];
}

function parseTeamMatches(data, team) {
  const rows = data.partidos ?? [];
  const first = rows[0];
  const competitionTitle = [
    cleanText(first?.competicion),
    cleanText(first?.fase),
    cleanText(first?.grupo)
  ].filter(Boolean).join(" - ");

  const matches = [];
  for (const item of rows) {
    if (!item?.l || !item?.v) continue;
    const home = { id: String(item.l.id), name: cleanText(item.l.n) };
    const away = { id: String(item.v.id), name: cleanText(item.v.n) };
    if (home.id !== team.teamId && away.id !== team.teamId) continue;

    const isHome = home.id === team.teamId;
    const opponent = isHome ? away : home;
    const roundNumber = item.j != null ? Number(item.j) : null;
    const roundDateText = cleanText(item.fj);
    const roundDate = parseSpanishDate(roundDateText) ?? parseIsoDatePart(item.fecha);
    const roundLabel = roundNumber != null
      ? `JORNADA ${roundNumber}${roundDateText ? ` (${roundDateText})` : ""}`
      : roundDateText;

    const isConfirmed = Number(item.confirmada) === 1 || cleanText(item.estado).toLocaleLowerCase("es") === "finalizado";
    const exactDate = isConfirmed ? parseIsoDatePart(item.fecha) : null;
    const time = isConfirmed ? normalizeTime(item.fecha) : null;
    const effectiveDate = exactDate ?? roundDate;

    const venueName = cleanText(item.campo) || null;
    const venueUrl = buildMapsUrl(item.lat, item.lon, venueName, item.dir);
    const { score, scoreSource } = parseJsonScore(item);

    const warnings = [];
    if (!exactDate) warnings.push("iSquad solo muestra la fecha de jornada; falta confirmar el día exacto del partido");
    if (!time) warnings.push("iSquad todavía no muestra una hora válida");
    if (!venueName) warnings.push("iSquad todavía no muestra el pabellón");

    matches.push({
      key: `${roundNumber ?? "x"}-${home.id}-${away.id}`,
      home,
      away,
      score,
      scoreSource,
      round: {
        number: roundNumber,
        date: roundDate,
        label: roundLabel
      },
      date: effectiveDate,
      exactDate,
      dateSource: exactDate ? "match" : "round",
      time,
      venue: {
        name: venueName,
        mapsUrl: venueUrl
      },
      readyForPublication: Boolean(exactDate && time && venueName),
      warnings,
      source: {
        calendarUrl: team.calendarUrl,
        pageUrl: team.sourcePageUrl
      },
      configuredTeam: {
        id: team.id,
        label: team.label,
        name: team.teamName,
        isHome
      },
      opponent,
      competition: team.competition
    });
  }

  if (matches.length === 0) {
    throw new Error(`No matches found for ${team.label} (${team.teamId})`);
  }
  return { competitionTitle, matches };
}

function fingerprint(payload) {
  return JSON.stringify({
    status: payload.status,
    summary: payload.summary,
    standings: (payload.standings ?? []).map(group => ({
      teamId: group.teamId,
      rows: (group.rows ?? []).map(r => [r.position, r.teamId, r.points, r.played, r.won, r.drawn, r.lost, r.goalDiff])
    })),
    matches: (payload.matches ?? []).map(m => ({
      key: m.key,
      team: m.configuredTeam?.id,
      date: m.date,
      exactDate: m.exactDate,
      time: m.time,
      venue: m.venue?.name,
      score: m.score ? `${m.score.home}-${m.score.away}` : null,
      ready: m.readyForPublication
    }))
  });
}

async function main() {
  const existing = JSON.parse(await readFile(schedulePath, "utf8"));
  const teams = deriveTeamConfigs(existing);
  if (teams.length === 0) {
    throw new Error("Could not derive team configurations from isquad-schedule.json");
  }

  const tokenRef = { value: null };
  const sourceStatus = [];
  const allMatches = [];
  const standings = [];

  for (const team of teams) {
    const tournamentId = team.competition?.tournamentId ?? new URL(team.calendarUrl).searchParams.get("id");
    const { data, fetchedAt } = await fetchBetaTournament(tournamentId, tokenRef);
    const parsed = parseTeamMatches(data, team);
    const standingsRaw = await fetchBetaStandings(tournamentId, tokenRef);
    const parsedStandings = parseStandings(standingsRaw, buildTeamNameMap(data.partidos), team);
    if (parsedStandings) standings.push(parsedStandings);

    sourceStatus.push({
      teamId: team.id,
      competitionTitle: parsed.competitionTitle,
      fetchedAt,
      calendarUrl: team.calendarUrl,
      matchesFound: parsed.matches.length
    });
    allMatches.push(...parsed.matches);
  }

  allMatches.sort((left, right) => {
    const leftKey = `${left.date ?? "9999-99-99"}T${left.time ?? "99:99"}`;
    const rightKey = `${right.date ?? "9999-99-99"}T${right.time ?? "99:99"}`;
    return leftKey.localeCompare(rightKey) || left.configuredTeam.id.localeCompare(right.configuredTeam.id);
  });

  const nextPayload = {
    schemaVersion: "1.0",
    generatedAt: new Date().toISOString(),
    timezone: existing.timezone ?? "Europe/Madrid",
    clubName: existing.clubName ?? "Club Handbol Montbui",
    status: allMatches.length === 0 ? "no_matches" : allMatches.every(m => m.readyForPublication) ? "ready" : "pending_confirmation",
    summary: {
      teams: teams.length,
      matches: allMatches.length,
      publishable: allMatches.filter(m => m.readyForPublication).length,
      pendingConfirmation: allMatches.filter(m => !m.readyForPublication).length
    },
    sourceStatus,
    standings,
    matches: allMatches
  };

  const changed = fingerprint(existing) !== fingerprint(nextPayload);
  const scoresCount = allMatches.filter(m => m.score).length;

  if (!changed && !process.argv.includes("--force")) {
    process.stdout.write(`No iSquad changes detected (${allMatches.length} matches, ${scoresCount} scores).\n`);
    if (process.env.GITHUB_OUTPUT) {
      await writeFile(process.env.GITHUB_OUTPUT, "changed=false\n", { flag: "a" });
    }
    return;
  }

  const serialized = `${JSON.stringify(nextPayload, null, 2)}\n`;
  await writeFile(schedulePath, serialized, "utf8");
  await writeFile(publicDataPath, serialized, "utf8");
  process.stdout.write(`Updated iSquad schedule (${allMatches.length} matches, ${scoresCount} scores).\n`);
  if (process.env.GITHUB_OUTPUT) {
    await writeFile(process.env.GITHUB_OUTPUT, "changed=true\n", { flag: "a" });
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
