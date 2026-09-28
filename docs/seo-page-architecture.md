# Arquitectura de páginas e intención de búsqueda

Las rutas en castellano replican únicamente páginas que puedan mantenerse. El inglés se conserva para las cuatro páginas principales actuales; nuevas piezas editoriales se traducirán solo cuando exista capacidad real.

## Inicio — `/`, `/es/`, `/en/`

- Objetivo: presentar el club, su ubicación, actividad, equipos y vías de contacto.
- Intención: marca y descubrimiento local.
- Principal: `Club Handbol Montbui`; variantes: `handbol Santa Margarida de Montbui`, `handbol Anoia`, `balonmano cerca de Igualada`.
- Público: familias, jugadores, entidades y patrocinadores.
- Título/H1: título local por idioma; H1 `Club Handbol Montbui`.
- Meta: descripción factual con Montbui, l’Anoia e Igualada.
- Encabezados: calendario, resultados, temporada, equipo y actualidad.
- Enlaces: club, calendario, contacto, patrocinio.
- CTA: unirse al equipo.
- Schema: `SportsOrganization`, `WebSite`, `WebPage`.

## El club — `/club/`, `/es/club/`, `/en/club/`

- Objetivo: describir qué es el club, equipos verificados, entrenamientos y ámbito local.
- Intención: informativa y de entidad.
- Principal: `club handbol Anoia`; variantes: `club handbol Igualada`, `club de balonmano Montbui`.
- Público: familias, medios, instituciones y posibles jugadores.
- Título: `El Club Handbol Montbui | Handbol a Santa Margarida de Montbui`.
- H1: `Club d’handbol a Santa Margarida de Montbui`.
- Meta: equipos, entrenamientos y ubicación, sin historia no confirmada.
- Encabezados: equipos verificados, ámbito local, equipo, entrenamientos.
- Enlaces: calendario, contacto y captación.
- CTA: contactar con el club.
- Schema: `AboutPage`, `SportsOrganization`, `BreadcrumbList`.

## Calendario — `/calendari/`, `/es/calendario/`, `/en/calendar/`

- Objetivo: responder cuándo y dónde juega cada equipo.
- Intención: operativa y recurrente.
- Principal: `calendari CH Montbui`; variantes: partidos, resultados, jornada y pabellón.
- Público: jugadores, familias, rivales y afición.
- Título/H1: calendario y resultados de la temporada 2026-2027.
- Meta: jornadas, rivales y pabellones.
- Encabezados: jornada, equipo, calendario completo y resultados.
- Enlaces: iSquad, Google Maps, club y contacto.
- CTA: abrir ubicación o fuente federativa.
- Schema: `CollectionPage`, `BreadcrumbList`; `SportsEvent` solo con fecha/hora confirmadas.

## Contacto — `/contacte/`, `/es/contacto/`, `/en/contact/`

- Objetivo: facilitar contacto y llegada desde el entorno de Igualada.
- Intención: local y transaccional.
- Principal: `contacte Club Handbol Montbui`; variantes: `com arribar CH Montbui`, `pavelló handbol Montbui`.
- Público: familias, nuevos jugadores, rivales y entidades.
- Título/H1: contacto y ubicación del Club Handbol Montbui.
- Meta: dirección, teléfono, correo, WhatsApp y rutas.
- Encabezados: dirección, contacto directo y cómo llegar.
- Enlaces: Maps desde Igualada y Vilanova, calendario y página del club.
- CTA: llamar, escribir o abrir la ruta.
- Schema: `ContactPage`, `PostalAddress`, `ContactPoint`, `BreadcrumbList`.

## Equipos y categorías — propuesta `/equips/`

- Objetivo: explicar cada equipo y competición vigente.
- Intención/principal: `equips Club Handbol Montbui`; variantes de categoría y género.
- Público: familias, jugadores y afición.
- Título/H1: equipos del Club Handbol Montbui — temporada vigente.
- Meta/encabezados: una sección por equipo con categoría, competición y enlaces.
- Enlaces/CTA: calendario, entrenamientos y contacto; CTA ver el equipo adecuado.
- Schema: `CollectionPage` y entidades `SportsTeam` solo con datos aprobados.
- Estado: no crear hasta confirmar plantilla editorial, edades y responsables.

## Entrenamientos e inscripciones — propuesta `/entrenaments/`

- Objetivo: concentrar horarios, proceso de incorporación y requisitos.
- Intención/principal: `horaris entrenament CH Montbui`; variantes sobre prueba e inscripción.
- Público: familias y nuevos jugadores.
- Título/H1: entrenamientos del Club Handbol Montbui 2026-2027.
- Meta/encabezados: horarios, lugar, qué llevar, cómo probar y cambios.
- Enlaces/CTA: equipos, contacto y calendario; CTA solicitar información.
- Schema: `WebPage`; FAQ solo si las respuestas son visibles y aprobadas.
- Estado: horarios disponibles; faltan edades, condiciones, cuotas y política de prueba.

## Handbol base y femenino — propuestas temáticas

- Objetivo: responder necesidades reales de iniciación y deporte femenino.
- Principales: `handbol base Igualada`, `handbol femení Anoia`; variantes en castellano.
- Público: niños, niñas, jóvenes y familias.
- Título/H1: factual, vinculado al proyecto real del club.
- Encabezados: equipos existentes, entrenamientos, incorporación y preguntas frecuentes.
- Enlaces/CTA: equipos, horarios y contacto; CTA venir a probar.
- Schema: `WebPage`/`Article` según el contenido.
- Estado: no crear hasta disponer de edades, proyecto y testimonios autorizados.

## Noticias, eventos y crónicas — propuesta `/actualitat/`

- Objetivo: documentar actividad real, resultados y eventos permanentes.
- Intención: actualidad de marca y consultas de partidos.
- Principal: `resultats CH Montbui`; variantes de torneo, jornada y rival.
- Público: afición, familias y medios.
- Título/H1: específico por noticia, equipo y fecha.
- Encabezados: resumen, datos, crónica, siguiente partido y fuentes.
- Enlaces/CTA: equipo, calendario, contacto; CTA ver próxima jornada.
- Schema: `NewsArticle`; `Event` solo para acontecimientos confirmados.

## Patrocinio — páginas existentes y futura guía

- Objetivo: explicar colaboración con el club sin prometer contraprestaciones no aprobadas.
- Principal: `patrocinar esport Anoia`; variantes de patrocinio local.
- Público: empresas, comercios y administraciones.
- Título/H1: cómo colaborar con el Club Handbol Montbui.
- Encabezados: proyectos, modalidades confirmadas, contacto y patrocinadores reales.
- Enlaces/CTA: club, actividad comunitaria y contacto; CTA solicitar información.
- Schema: `WebPage`.

## Preguntas frecuentes — propuesta integrada

- Objetivo: responder dudas reales sin crear una página vacía.
- Intención: prueba, edades, material, ubicación, cuotas y seguros.
- Público: familias y nuevos jugadores.
- Título/H1: preguntas para empezar a jugar a handbol con el CH Montbui.
- Enlaces/CTA: entrenamientos, equipos y contacto; CTA enviar una pregunta.
- Schema: `FAQPage` solo si todas las respuestas se muestran y han sido aprobadas.
