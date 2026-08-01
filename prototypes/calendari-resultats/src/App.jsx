import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowSquareOut,
  CalendarBlank,
  CalendarDots,
  Clock,
  EnvelopeSimple,
  Heart,
  HouseLine,
  Info,
  InstagramLogo,
  MapPin,
  Medal,
  PersonSimpleThrow,
  Play,
  ShieldCheck,
  Sparkle,
  TShirt,
  Target,
  Trophy,
  UsersThree,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import scheduleData from "./data/isquad-schedule.json";

const locales = {
  ca: "ca-ES",
  es: "es-ES",
  en: "en-GB",
};

const copy = {
  ca: {
    nav: ["Inici", "Equip", "Calendari", "Actualitat", "Patrocini", "Contacte"],
    heroKicker: "Passió · Equip · Victòria",
    heroSeason: "Temporada 2026-2027",
    heroDescription: "Uneix-te al nostre equip d’handbol i viu l’emoció de l’esport en equip. Entrenaments, competició i una gran família esportiva t’esperen.",
    join: "Uneix-te a l’Equip",
    players: "Jugadores",
    history: "Anys d’història",
    victories: "Victòries",
    season: "TEMPORADA 2026/27",
    calendarTitle: "Calendari i resultats",
    calendarSubtitle: "Tots els partits programats dels equips del club.",
    sourceNotice: "Dades reals d’iSquad. El dia i l’hora exactes s’actualitzen quan la federació els confirma.",
    updated: "Actualitzat",
    scheduledMatches: "partits programats",
    previous: "Jornada anterior",
    next: "Jornada següent",
    allTeams: "Tots els equips",
    jornada: "Jornada",
    jornadas: "Jornades",
    preseasonFallback: "La temporada encara no ha començat: mostrem els primers partits disponibles.",
    nextFallback: "Aquesta setmana no hi ha partit: mostrem la pròxima jornada amb partits.",
    currentWeek: "Partits d’aquesta setmana",
    home: "Local",
    away: "Visitant",
    opponent: "Rival",
    date: "Data",
    time: "Hora",
    venue: "Pavelló",
    timePending: "Horari pendent",
    confirmationPending: "El dia exacte i l’hora encara estan pendents de confirmació a iSquad.",
    noMatch: "Sense partit aquesta jornada",
    noMatchDescription: "Aquest equip no té cap partit programat en aquesta jornada.",
    fullCalendar: "Veure tot el calendari",
    hideCalendar: "Amagar el calendari complet",
    completeCalendar: "Calendari complet",
    completeSubtitle: "Tota la temporada, amb els enllaços de cada pavelló.",
    openMaps: "Obrir a Google Maps",
    source: "Font iSquad",
    results: "Resultats",
    resultsSubtitle: "Consulta els resultats de tots els equips del club.",
    noResults: "Encara no hi ha resultats disponibles",
    noResultsDescription: "Els resultats apareixeran aquí quan comenci la temporada.",
    seasonLabel: "Temporada",
    recruitmentEyebrow: "TEMPORADA 2026/27",
    recruitmentTitle: "Uneix-te a la Temporada 2026-2027!",
    recruitmentSubtitle: "Busquem nous jugadors i jugadores",
    recruitmentDescription: "Sigui quin sigui el teu nivell, al Club Handbol Montbui tenim un lloc per a tu. Vine a entrenar amb nosaltres i viu la passió de l’handbol.",
    womenTeam: "Equip femení",
    newWomen: "Noves jugadores",
    menTeam: "Equip masculí",
    newMen: "Nous jugadors sènior",
    interested: "M’interessa",
    shine: "ÉS EL TEU TORN DE BRILLAR!",
    features: ["Passió per l’handbol", "Esperit d’equip", "Competició i amistat", "Entrenaments per a tots els nivells"],
    interestedQuestion: "T’interessa?",
    interestedText: "Parla amb nosaltres i vine a provar un entrenament.",
    family: "LA NOSTRA FAMÍLIA",
    teamTitle: "El Nostre Equip",
    teamSubtitle: "Coneix la passió que ens mou",
    teamText: "Som més que un equip, som una família unida per la passió de l’handbol. Amb anys d’experiència i dedicació, hem construït un llegat d’excel·lència esportiva i valors humans.",
    values: [
      ["Excel·lència", "Busquem la perfecció en cada entrenament i partit."],
      ["Treball en Equip", "Units som més forts, junts assolim les nostres metes."],
      ["Passió", "L’amor per l’handbol ens impulsa a donar el millor."],
    ],
    live: "EL CLUB EN DIRECTE",
    news: "Actualitat",
    newsSubtitle: "No et perdis res a les nostres xarxes socials",
    officialChannel: "Canal oficial de YouTube",
    subscribe: "Subscriu-te",
    featuredVideo: "Vídeo destacat",
    featuredDate: "24 de maig de 2026",
    contact: "Contacte",
    follow: "Segueix-nos",
    contactPerson: "Contacte: Laia · 633 556 228",
    rights: "Tots els drets reservats.",
    webCredit: "Web creada per",
    privacy: "Política de Privacitat",
    legal: "Avís Legal",
  },
  es: {
    nav: ["Inicio", "Equipo", "Calendario", "Actualidad", "Patrocinio", "Contacto"],
    heroKicker: "Pasión · Equipo · Victoria",
    heroSeason: "Temporada 2026-2027",
    heroDescription: "Únete a nuestro equipo de balonmano y vive la emoción del deporte en equipo. Entrenamientos, competición y una gran familia deportiva te esperan.",
    join: "Únete al Equipo",
    players: "Jugadores",
    history: "Años de historia",
    victories: "Victorias",
    season: "TEMPORADA 2026/27",
    calendarTitle: "Calendario y resultados",
    calendarSubtitle: "Todos los partidos programados de los equipos del club.",
    sourceNotice: "Datos reales de iSquad. El día y la hora exactos se actualizan cuando la federación los confirma.",
    updated: "Actualizado",
    scheduledMatches: "partidos programados",
    previous: "Jornada anterior",
    next: "Jornada siguiente",
    allTeams: "Todos los equipos",
    jornada: "Jornada",
    jornadas: "Jornadas",
    preseasonFallback: "La temporada todavía no ha empezado: mostramos los primeros partidos disponibles.",
    nextFallback: "Esta semana no hay partido: mostramos la próxima jornada con partidos.",
    currentWeek: "Partidos de esta semana",
    home: "Local",
    away: "Visitante",
    opponent: "Rival",
    date: "Fecha",
    time: "Hora",
    venue: "Pabellón",
    timePending: "Horario pendiente",
    confirmationPending: "El día exacto y la hora todavía están pendientes de confirmación en iSquad.",
    noMatch: "Sin partido en esta jornada",
    noMatchDescription: "Este equipo no tiene ningún partido programado en esta jornada.",
    fullCalendar: "Ver todo el calendario",
    hideCalendar: "Ocultar el calendario completo",
    completeCalendar: "Calendario completo",
    completeSubtitle: "Toda la temporada, con los enlaces de cada pabellón.",
    openMaps: "Abrir en Google Maps",
    source: "Fuente iSquad",
    results: "Resultados",
    resultsSubtitle: "Consulta los resultados de todos los equipos del club.",
    noResults: "Todavía no hay resultados disponibles",
    noResultsDescription: "Los resultados aparecerán aquí cuando empiece la temporada.",
    seasonLabel: "Temporada",
    recruitmentEyebrow: "TEMPORADA 2026/27",
    recruitmentTitle: "¡Únete a la Temporada 2026-2027!",
    recruitmentSubtitle: "Buscamos nuevos jugadores y jugadoras",
    recruitmentDescription: "Sea cual sea tu nivel, en el Club Handbol Montbui tenemos un lugar para ti. Ven a entrenar con nosotros y vive la pasión del balonmano.",
    womenTeam: "Equipo femenino",
    newWomen: "Nuevas jugadoras",
    menTeam: "Equipo masculino",
    newMen: "Nuevos jugadores sénior",
    interested: "Me interesa",
    shine: "¡ES TU TURNO DE BRILLAR!",
    features: ["Pasión por el balonmano", "Espíritu de equipo", "Competición y amistad", "Entrenamientos para todos los niveles"],
    interestedQuestion: "¿Te interesa?",
    interestedText: "Habla con nosotros y ven a probar un entrenamiento.",
    family: "NUESTRA FAMILIA",
    teamTitle: "Nuestro Equipo",
    teamSubtitle: "Conoce la pasión que nos mueve",
    teamText: "Somos más que un equipo, somos una familia unida por la pasión del balonmano. Con años de experiencia y dedicación, hemos construido un legado de excelencia deportiva y valores humanos.",
    values: [
      ["Excelencia", "Buscamos la perfección en cada entrenamiento y partido."],
      ["Trabajo en Equipo", "Unidos somos más fuertes, juntos alcanzamos nuestras metas."],
      ["Pasión", "El amor por el balonmano nos impulsa a dar lo mejor."],
    ],
    live: "EL CLUB EN DIRECTO",
    news: "Actualidad",
    newsSubtitle: "No te pierdas nada en nuestras redes sociales",
    officialChannel: "Canal oficial de YouTube",
    subscribe: "Suscríbete",
    featuredVideo: "Vídeo destacado",
    featuredDate: "24 de mayo de 2026",
    contact: "Contacto",
    follow: "Síguenos",
    contactPerson: "Contacto: Laia · 633 556 228",
    rights: "Todos los derechos reservados.",
    webCredit: "Web creada por",
    privacy: "Política de Privacidad",
    legal: "Aviso Legal",
  },
  en: {
    nav: ["Home", "Team", "Calendar", "News", "Sponsorship", "Contact"],
    heroKicker: "Passion · Team · Victory",
    heroSeason: "2026-2027 season",
    heroDescription: "Join our handball club and experience the excitement of team sport. Training, competition and a great sporting family are waiting for you.",
    join: "Join the Team",
    players: "Players",
    history: "Years of history",
    victories: "Victories",
    season: "2026/27 SEASON",
    calendarTitle: "Calendar and results",
    calendarSubtitle: "Every scheduled match for all club teams.",
    sourceNotice: "Live iSquad data. The exact day and time are updated when confirmed by the federation.",
    updated: "Updated",
    scheduledMatches: "scheduled matches",
    previous: "Previous matchday",
    next: "Next matchday",
    allTeams: "All teams",
    jornada: "Matchday",
    jornadas: "Matchdays",
    preseasonFallback: "The season has not started yet, so the first available matches are shown.",
    nextFallback: "There is no match this week, so the next matchday with fixtures is shown.",
    currentWeek: "This week’s matches",
    home: "Home",
    away: "Away",
    opponent: "Opponent",
    date: "Date",
    time: "Time",
    venue: "Venue",
    timePending: "Time pending",
    confirmationPending: "The exact day and time are still awaiting confirmation on iSquad.",
    noMatch: "No match on this matchday",
    noMatchDescription: "This team has no scheduled match on this matchday.",
    fullCalendar: "View the full calendar",
    hideCalendar: "Hide the full calendar",
    completeCalendar: "Full calendar",
    completeSubtitle: "The complete season, with a map link for every venue.",
    openMaps: "Open in Google Maps",
    source: "iSquad source",
    results: "Results",
    resultsSubtitle: "Check results for all club teams.",
    noResults: "No results are available yet",
    noResultsDescription: "Results will appear here once the season begins.",
    seasonLabel: "Season",
    recruitmentEyebrow: "2026/27 SEASON",
    recruitmentTitle: "Join us for the 2026-2027 Season!",
    recruitmentSubtitle: "We are looking for new players",
    recruitmentDescription: "Whatever your level, there is a place for you at Club Handbol Montbui. Come and train with us and experience the passion of handball.",
    womenTeam: "Women’s team",
    newWomen: "New players",
    menTeam: "Men’s team",
    newMen: "New senior players",
    interested: "I’m interested",
    shine: "IT’S YOUR TIME TO SHINE!",
    features: ["Passion for handball", "Team spirit", "Competition and friendship", "Training for every level"],
    interestedQuestion: "Interested?",
    interestedText: "Talk to us and come along for a trial training session.",
    family: "OUR HANDBALL FAMILY",
    teamTitle: "Our Team",
    teamSubtitle: "Meet the passion that drives us",
    teamText: "We are more than a team: we are a family brought together by a passion for handball. Years of experience and dedication have helped us build a legacy of sporting excellence and strong human values.",
    values: [
      ["Excellence", "We strive for excellence in every training session and match."],
      ["Teamwork", "We are stronger together and reach our goals as one team."],
      ["Passion", "Our love of handball drives us to give our best."],
    ],
    live: "THE CLUB LIVE",
    news: "News",
    newsSubtitle: "Keep up with everything happening on our social channels",
    officialChannel: "Official YouTube channel",
    subscribe: "Subscribe",
    featuredVideo: "Featured video",
    featuredDate: "24 May 2026",
    contact: "Contact",
    follow: "Follow us",
    contactPerson: "Contact: Laia · +34 633 556 228",
    rights: "All rights reserved.",
    webCredit: "Web created by",
    privacy: "Privacy Policy",
    legal: "Legal Notice",
  },
};

const teamMeta = {
  "senior-masculi-tercera-b": {
    tone: "blue",
    labels: { ca: "Sènior masculí", es: "Sénior masculino", en: "Men’s senior" },
    competition: {
      ca: "Tercera Catalana Sènior Masculina · Grup B",
      es: "Tercera Catalana Sénior Masculina · Grupo B",
      en: "Catalan Senior Men’s Third Division · Group B",
    },
  },
  "senior-femeni-primera-a": {
    tone: "pink",
    labels: { ca: "Sènior femení", es: "Sénior femenino", en: "Women’s senior" },
    competition: {
      ca: "Primera Catalana Sènior Femenina · Grup A",
      es: "Primera Catalana Sénior Femenina · Grupo A",
      en: "Catalan Senior Women’s First Division · Group A",
    },
  },
  "juvenil-femeni-segona-unic": {
    tone: "violet",
    labels: { ca: "Juvenil femení", es: "Juvenil femenino", en: "Women’s youth" },
    competition: {
      ca: "Segona Catalana Juvenil Femenina · Grup Únic",
      es: "Segunda Catalana Juvenil Femenina · Grupo Único",
      en: "Catalan Youth Women’s Second Division · Single Group",
    },
  },
  "cadet-femeni-segona-a": {
    tone: "coral",
    labels: { ca: "Cadet femení", es: "Cadete femenino", en: "Girls’ cadet" },
    competition: {
      ca: "Segona Catalana Cadet Femenina · Grup A",
      es: "Segunda Catalana Cadete Femenina · Grupo A",
      en: "Catalan Cadet Girls’ Second Division · Group A",
    },
  },
};

const teamIds = Object.keys(teamMeta);
const teamIndex = Object.fromEntries(teamIds.map((teamId, index) => [teamId, index]));

function asDate(value) {
  return new Date(`${value}T12:00:00`);
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function weekStartFor(value) {
  const date = asDate(value);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return toIsoDate(date);
}

const matches = [...scheduleData.matches].sort((a, b) => {
  return a.date.localeCompare(b.date)
    || a.round.number - b.round.number
    || teamIndex[a.configuredTeam.id] - teamIndex[b.configuredTeam.id];
});

const periods = [...matches.reduce((groups, match) => {
  const key = weekStartFor(match.date);
  const group = groups.get(key) ?? [];
  group.push(match);
  groups.set(key, group);
  return groups;
}, new Map()).entries()].map(([weekStart, groupMatches]) => {
  const weekEnd = asDate(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  return {
    weekStart,
    weekEnd: toIsoDate(weekEnd),
    matches: groupMatches,
    rounds: [...new Set(groupMatches.map((match) => match.round.number))].sort((a, b) => a - b),
    dates: [...new Set(groupMatches.map((match) => match.date))].sort(),
  };
});

function getInitialPeriod() {
  const today = new Date();
  const todayIso = toIsoDate(today);
  const currentIndex = periods.findIndex((period) => period.weekStart <= todayIso && period.weekEnd >= todayIso);

  if (currentIndex >= 0) {
    return { index: currentIndex, mode: "current" };
  }

  if (todayIso < periods[0].weekStart) {
    return { index: 0, mode: "preseason" };
  }

  const nextIndex = periods.findIndex((period) => period.weekStart > todayIso);
  if (nextIndex >= 0) {
    return { index: nextIndex, mode: "next" };
  }

  return { index: periods.length - 1, mode: "finished" };
}

const initialPeriod = getInitialPeriod();

function formatDate(value, language, options = {}) {
  return new Intl.DateTimeFormat(locales[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(asDate(value));
}

function formatPeriodDates(period, language) {
  if (period.dates.length === 1) {
    return formatDate(period.dates[0], language);
  }
  const first = formatDate(period.dates[0], language, { day: "numeric", month: "short", year: undefined });
  const last = formatDate(period.dates.at(-1), language, { day: "numeric", month: "short" });
  return `${first} – ${last} ${asDate(period.dates.at(-1)).getFullYear()}`;
}

function formatRoundLabel(period, language) {
  const dictionary = copy[language];
  if (period.rounds.length === 1) {
    return `${dictionary.jornada} ${period.rounds[0]}`;
  }
  return `${dictionary.jornadas} ${period.rounds.join(" · ")}`;
}

function Header({ language, onLanguageChange, pageView }) {
  const t = copy[language];
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Club Handbol Montbui">
        <img src="/assets/logo.png" alt="" />
        <span>Club Handbol <strong>Montbui</strong></span>
      </a>

      <nav className="main-nav" aria-label={t.nav[0]}>
        <a className={pageView === "home" ? "active" : ""} href="#home">{t.nav[0]}</a>
        <a href="#team">{t.nav[1]}</a>
        <a className={pageView === "calendar" ? "active" : ""} href="#calendari-main">{t.nav[2]}</a>
        <a href="#social-hub">{t.nav[3]}</a>
        <a href="https://chmontbui.es/patrocinadors.html">{t.nav[4]}</a>
        <a href="#contacte">{t.nav[5]}</a>
      </nav>

      <div className="languages" aria-label="Language">
        {["es", "ca", "en"].map((code) => (
          <button
            type="button"
            key={code}
            className={language === code ? "active" : ""}
            onClick={() => onLanguageChange(code)}
            aria-pressed={language === code}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}

function TeamFilter({ selected, onSelect, language }) {
  const t = copy[language];
  return (
    <div className="team-filters" aria-label={t.allTeams}>
      <button
        className={selected === "all" ? "selected all-teams" : "all-teams"}
        type="button"
        onClick={() => onSelect("all")}
        aria-pressed={selected === "all"}
      >
        <UsersThree size={21} weight="bold" />
        {t.allTeams}
      </button>
      {teamIds.map((teamId) => {
        const team = teamMeta[teamId];
        return (
          <button
            className={`${team.tone} ${selected === teamId ? "selected" : ""}`}
            type="button"
            key={teamId}
            onClick={() => onSelect(teamId)}
            aria-pressed={selected === teamId}
          >
            <TShirt size={20} weight="fill" />
            {team.labels[language]}
          </button>
        );
      })}
    </div>
  );
}

function MatchCard({ teamId, match, language }) {
  const t = copy[language];
  const team = teamMeta[teamId];

  if (!match) {
    return (
      <article className={`match-card no-match ${team.tone}`}>
        <div className={`team-marker ${team.tone}`}>
          <TShirt size={32} weight="fill" />
          <span>{team.labels[language]}</span>
        </div>
        <div className="match-card-body">
          <p className="competition">{team.competition[language]}</p>
          <h2>{t.noMatch}</h2>
          <div className="empty-match">
            <CalendarBlank size={20} aria-hidden="true" />
            <span>{t.noMatchDescription}</span>
          </div>
        </div>
      </article>
    );
  }

  const isHome = match.configuredTeam.isHome;

  return (
    <article className={`match-card ${team.tone}`}>
      <div className={`team-marker ${team.tone}`}>
        <TShirt size={34} weight="fill" />
        <span>{team.labels[language]}</span>
      </div>

      <div className="match-card-body">
        <div className="card-heading-row">
          <div>
            <p className="competition">{team.competition[language]}</p>
            <h2>{t.jornada} {match.round.number}</h2>
          </div>
          <span className={`side-badge ${isHome ? "home" : "away"}`}>
            {isHome ? <HouseLine size={15} weight="bold" /> : <ArrowRight size={15} weight="bold" />}
            {isHome ? t.home : t.away}
          </span>
        </div>

        <dl className="match-meta real-data">
          <div>
            <dt><UsersThree size={20} weight="fill" /><span>{t.opponent}</span></dt>
            <dd>{match.opponent.name}</dd>
          </div>
          <div>
            <dt><CalendarBlank size={20} /><span>{t.date}</span></dt>
            <dd>{formatDate(match.date, language)}</dd>
          </div>
          <div>
            <dt><Clock size={20} /><span>{t.time}</span></dt>
            <dd>{match.time ?? t.timePending}</dd>
          </div>
          <div>
            <dt><MapPin size={20} weight="fill" /><span>{t.venue}</span></dt>
            <dd>
              <a href={match.venue.mapsUrl} target="_blank" rel="noreferrer" title={t.openMaps}>
                {match.venue.name}
                <ArrowSquareOut size={14} weight="bold" />
              </a>
            </dd>
          </div>
        </dl>

        <div className="pending-note" role="status">
          <Info size={18} weight="fill" />
          <span>{t.confirmationPending}</span>
          <a href={match.source.pageUrl} target="_blank" rel="noreferrer">
            {t.source}
            <ArrowSquareOut size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}

function CompleteCalendar({ selectedTeam, language }) {
  const t = copy[language];
  const visibleMatches = selectedTeam === "all"
    ? matches
    : matches.filter((match) => match.configuredTeam.id === selectedTeam);

  return (
    <section className="calendar-expanded" id="calendari-complet" aria-label={t.completeCalendar}>
      <div className="complete-calendar-heading">
        <div className="section-title">
          <div className="section-icon"><CalendarDots size={26} weight="duotone" /></div>
          <div>
            <p className="eyebrow">{t.season}</p>
            <h2>{t.completeCalendar}</h2>
            <p>{t.completeSubtitle}</p>
          </div>
        </div>
        <strong>{visibleMatches.length} {t.scheduledMatches}</strong>
      </div>

      <div className="calendar-list">
        {visibleMatches.map((match) => {
          const team = teamMeta[match.configuredTeam.id];
          return (
            <article className="calendar-row" key={`${match.configuredTeam.id}-${match.key}`}>
              <div className={`calendar-team-dot ${team.tone}`} aria-hidden="true" />
              <div className="calendar-date">
                <strong>{t.jornada} {match.round.number}</strong>
                <span>{formatDate(match.date, language, { month: "short" })}</span>
              </div>
              <div className="calendar-team">
                <strong>{team.labels[language]}</strong>
                <span>{match.configuredTeam.isHome ? t.home : t.away} · {match.opponent.name}</span>
              </div>
              <div className="calendar-row-venue">
                <a href={match.venue.mapsUrl} target="_blank" rel="noreferrer" title={t.openMaps}>
                  <MapPin size={17} weight="fill" />
                  <span>{match.venue.name}</span>
                  <ArrowSquareOut size={14} />
                </a>
              </div>
              <div className="calendar-status">
                <Clock size={17} />
                {match.time ?? t.timePending}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ResultsSection({ language }) {
  const t = copy[language];
  return (
    <section className="results-section" aria-labelledby="results-title">
      <div className="section-title">
        <div className="section-icon"><Trophy size={26} weight="duotone" /></div>
        <div>
          <h2 id="results-title">{t.results}</h2>
          <p>{t.resultsSubtitle}</p>
        </div>
      </div>

      <div className="results-empty">
        <div className="empty-icon"><CalendarBlank size={38} weight="duotone" /></div>
        <div>
          <h3>{t.noResults}</h3>
          <p>{t.noResultsDescription}</p>
        </div>
      </div>

      <label className="season-select">
        <span>{t.seasonLabel}</span>
        <select defaultValue="2026/27" aria-label={t.seasonLabel}><option>2026/27</option></select>
      </label>
    </section>
  );
}

function RecruitmentSection({ language }) {
  const t = copy[language];
  const whatsappUrl = "https://wa.me/34633556228";
  const featureIcons = [Heart, UsersThree, Trophy, Target];

  return (
    <section className="recruitment-section" id="nueva-temporada" aria-labelledby="recruitment-title">
      <div className="content-heading">
        <p className="eyebrow">{t.recruitmentEyebrow}</p>
        <h2 id="recruitment-title">{t.recruitmentTitle}</h2>
        <p className="content-subtitle">{t.recruitmentSubtitle}</p>
        <p className="content-description">{t.recruitmentDescription}</p>
      </div>

      <div className="recruitment-grid">
        <article className="recruit-card female">
          <div className="recruit-card-copy">
            <span>{t.womenTeam}</span>
            <h3>{t.newWomen}</h3>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsappLogo size={20} weight="fill" />{t.interested}</a>
          </div>
          <img src="/assets/f1.png" alt="" />
        </article>

        <article className="recruit-card male">
          <div className="recruit-card-copy">
            <span>{t.menTeam}</span>
            <h3>{t.newMen}</h3>
            <a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsappLogo size={20} weight="fill" />{t.interested}</a>
          </div>
          <img src="/assets/m1.png" alt="" />
        </article>
      </div>

      <div className="recruit-features">
        <h3><Sparkle size={22} weight="fill" />{t.shine}</h3>
        <div>
          {t.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return <span key={feature}><Icon size={20} weight="fill" />{feature}</span>;
          })}
        </div>
      </div>

      <div className="recruitment-cta-strip">
        <div><strong>{t.interestedQuestion}</strong><span>{t.interestedText}</span></div>
        <div>
          <a className="whatsapp-action" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsappLogo size={20} weight="fill" />WhatsApp</a>
          <a className="email-action" href="mailto:chmontbui06@gmail.com"><EnvelopeSimple size={20} weight="bold" />Email</a>
        </div>
      </div>
    </section>
  );
}

function TeamSection({ language }) {
  const t = copy[language];
  const icons = [Medal, ShieldCheck, Heart];
  return (
    <section className="team-section" id="team" aria-labelledby="team-title">
      <div className="section-shell">
        <div className="content-heading compact">
          <p className="eyebrow">{t.family}</p>
          <h2 id="team-title">{t.teamTitle}</h2>
          <p className="content-subtitle">{t.teamSubtitle}</p>
        </div>

        <div className="team-layout">
          <img src="/assets/equipos-25-26.jpg" alt="Club Handbol Montbui" />
          <div className="team-copy">
            <p>{t.teamText}</p>
            <div className="club-values">
              {t.values.map(([title, text], index) => {
                const Icon = icons[index];
                return (
                  <article key={title}>
                    <span><Icon size={24} weight="duotone" /></span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const clubVideos = [
  { id: "FNRuSIof8YA", title: "CHM - CH Sant Esteve Sesrovires B · Primera Catalana", date: "2/3/2026" },
  { id: "UKiLHjdMxG8", title: "CHM - CH Montgrí · Cadet", date: "2/3/2026" },
  { id: "Oefcro06JNA", title: "Sant Boi - CHM · Cadet · Partit 2", date: "1/2/2026" },
];

function SocialHubSection({ language }) {
  const t = copy[language];
  return (
    <section className="social-hub-section" id="social-hub" aria-labelledby="social-title">
      <div className="section-shell">
        <div className="content-heading compact">
          <p className="eyebrow">{t.live}</p>
          <h2 id="social-title">{t.news}</h2>
          <p className="content-subtitle">{t.newsSubtitle}</p>
        </div>

        <div className="youtube-heading">
          <div>
            <span><YoutubeLogo size={25} weight="fill" /></span>
            <div><strong>Club Handbol Montbui</strong><small>{t.officialChannel}</small></div>
          </div>
          <a href="https://www.youtube.com/@clubhandbolmontbui" target="_blank" rel="noreferrer">{t.subscribe}<ArrowSquareOut size={17} weight="bold" /></a>
        </div>

        <div className="video-grid">
          <article className="featured-video">
            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/fyYuH7XItXU"
                title="CHM - CEACA Tàrrega"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div><span>{t.featuredVideo}</span><h3>CHM - CEACA Tàrrega · Sènior Femení · Semifinals de Copa</h3><p>{t.featuredDate}</p></div>
          </article>

          <div className="video-list">
            {clubVideos.map((video) => (
              <a key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                <span className="video-thumbnail">
                  <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" />
                  <Play size={19} weight="fill" aria-hidden="true" />
                </span>
                <span><strong>{video.title}</strong><small>{video.date}</small></span>
                <ArrowSquareOut size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ language }) {
  const t = copy[language];
  const suffix = language === "es" ? "" : `_${language}`;
  return (
    <footer className="site-footer" id="contacte">
      <div className="footer-grid">
        <a className="footer-brand" href="https://chmontbui.es/"><img src="/assets/logo.png" alt="" /><span>Club Handbol Montbui</span></a>
        <div>
          <h2>{t.contact}</h2>
          <p><MapPin size={18} weight="fill" /> Av. de l’Esport<br />08710 Santa Margarida de Montbui</p>
          <p>{t.contactPerson}</p>
          <a href="mailto:chmontbui06@gmail.com">chmontbui06@gmail.com</a>
        </div>
        <div>
          <h2>{t.follow}</h2>
          <div className="social-links">
            <a href="https://www.instagram.com/chmontbui/" aria-label="Instagram"><InstagramLogo size={22} /></a>
            <a href="https://www.youtube.com/@clubhandbolmontbui" aria-label="YouTube"><YoutubeLogo size={22} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copyright">
          © 2026 Club Handbol Montbui. {t.rights}
          <span className="footer-credit">
            {t.webCredit}{" "}
            <a href="https://uberleap.com" target="_blank" rel="noreferrer">uberleap.com</a>
          </span>
        </span>
        <div>
          <a href={`https://chmontbui.es/privacy${suffix}.html`}>{t.privacy}</a>
          <a href={`https://chmontbui.es/legal${suffix}.html`}>{t.legal}</a>
        </div>
      </div>
    </footer>
  );
}

function getPageView() {
  if (typeof window === "undefined") return "home";
  return ["#calendari", "#calendari-main"].includes(window.location.hash) ? "calendar" : "home";
}

export function App() {
  const [language, setLanguage] = useState("ca");
  const [pageView, setPageView] = useState(getPageView);
  const [periodIndex, setPeriodIndex] = useState(initialPeriod.index);
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);
  const t = copy[language];
  const currentPeriod = periods[periodIndex];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    function syncPageView() {
      setPageView(getPageView());
    }

    window.addEventListener("hashchange", syncPageView);
    return () => window.removeEventListener("hashchange", syncPageView);
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const targetId = pageView === "calendar"
        ? "calendari-main"
        : window.location.hash.slice(1) || "home";
      document.getElementById(targetId)?.scrollIntoView({ block: "start" });
    });
  }, [pageView]);

  const visibleTeamIds = useMemo(
    () => selectedTeam === "all" ? teamIds : [selectedTeam],
    [selectedTeam],
  );

  function changePeriod(direction) {
    setPeriodIndex((current) => {
      const next = current + direction;
      return Math.min(Math.max(next, 0), periods.length - 1);
    });
  }

  function toggleCalendar() {
    setShowCalendar((visible) => !visible);
    window.setTimeout(() => {
      document.querySelector("#calendari-complet")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  const initialNotice = periodIndex === initialPeriod.index
    ? initialPeriod.mode === "preseason"
      ? t.preseasonFallback
      : initialPeriod.mode === "next"
        ? t.nextFallback
        : initialPeriod.mode === "current"
          ? t.currentWeek
          : null
    : null;

  return (
    <div className="app-shell">
      <Header language={language} onLanguageChange={setLanguage} pageView={pageView} />

      {pageView === "home" && (
        <section id="home" className="home-hero" aria-labelledby="page-title">
          <img src="/assets/grupo.jpg" alt="" />
          <div className="home-hero-overlay" />
          <div className="home-hero-content">
            <h1 id="page-title">Club Handbol Montbui</h1>
            <p className="home-hero-season">{t.heroSeason}</p>
            <p className="home-hero-kicker">{t.heroKicker}</p>
            <p className="home-hero-description">{t.heroDescription}</p>
            <a className="home-cta" href="#nueva-temporada"><UsersThree size={20} weight="bold" />{t.join}</a>
            <div className="home-stats" aria-label="Club statistics">
              <div><strong>60+</strong><span>{t.players}</span></div>
              <div><strong>20</strong><span>{t.history}</span></div>
              <div><strong><Trophy size={25} weight="duotone" />100+</strong><span>{t.victories}</span></div>
            </div>
          </div>
        </section>
      )}

      <main className={pageView === "calendar" ? "calendar-only-main" : ""}>
        <div className="calendar-area" id={pageView === "calendar" ? "calendari-main" : "home-calendar"}>
          <section className="calendar-intro" aria-labelledby="calendar-title">
            <div>
              <h2 id="calendar-title">{t.calendarTitle}</h2>
              <span>{t.calendarSubtitle}</span>
            </div>
            <div className="calendar-data-summary">
              <div className="calendar-intro-status"><Info size={18} weight="fill" />{t.sourceNotice}</div>
              <small>
                {t.updated}: {formatDate(scheduleData.generatedAt.slice(0, 10), language)} · {scheduleData.summary.matches} {t.scheduledMatches}
              </small>
            </div>
          </section>

          <section className="calendar-hub" aria-label={t.calendarTitle}>
            <div className="week-switcher round-switcher">
              {periodIndex > 0
                ? <button type="button" onClick={() => changePeriod(-1)} aria-label={t.previous}><ArrowLeft size={22} weight="bold" /></button>
                : <span className="round-switcher-placeholder" aria-hidden="true" />}
              <div aria-live="polite">
                <CalendarBlank size={28} weight="duotone" />
                <div>
                  <strong>{formatRoundLabel(currentPeriod, language)}</strong>
                  <span>{formatPeriodDates(currentPeriod, language)}</span>
                </div>
              </div>
              {periodIndex < periods.length - 1
                ? <button type="button" onClick={() => changePeriod(1)} aria-label={t.next}><ArrowRight size={22} weight="bold" /></button>
                : <span className="round-switcher-placeholder" aria-hidden="true" />}
            </div>

            {initialNotice && <div className="calendar-initial-note"><Info size={17} weight="fill" />{initialNotice}</div>}

            <TeamFilter selected={selectedTeam} onSelect={setSelectedTeam} language={language} />

            <div className={`match-grid ${selectedTeam !== "all" ? "single-team" : ""}`}>
              {visibleTeamIds.flatMap((teamId) => {
                const teamMatches = currentPeriod.matches.filter((match) => match.configuredTeam.id === teamId);
                if (teamMatches.length === 0) {
                  return <MatchCard key={`${currentPeriod.weekStart}-${teamId}`} teamId={teamId} language={language} />;
                }
                return teamMatches.map((match) => (
                  <MatchCard key={`${teamId}-${match.key}`} teamId={teamId} match={match} language={language} />
                ));
              })}
            </div>

            <button className="calendar-toggle" type="button" onClick={toggleCalendar} aria-expanded={showCalendar} aria-controls="calendari-complet">
              <CalendarDots size={20} weight="bold" />
              {showCalendar ? t.hideCalendar : `${t.fullCalendar} · ${scheduleData.summary.matches}`}
            </button>
          </section>

          {showCalendar && <CompleteCalendar selectedTeam={selectedTeam} language={language} />}
          <ResultsSection language={language} />
          <PersonSimpleThrow className="court-motif" size={420} weight="thin" aria-hidden="true" />
        </div>

        {pageView === "home" && (
          <>
            <RecruitmentSection language={language} />
            <TeamSection language={language} />
            <SocialHubSection language={language} />
          </>
        )}
      </main>

      {pageView === "home" && <Footer language={language} />}
    </div>
  );
}
