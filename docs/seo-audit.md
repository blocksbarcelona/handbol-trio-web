# Auditoría SEO técnica, local y AEO/GEO

Fecha de auditoría: 12 de agosto de 2026  
Dominio canónico detectado: `https://chmontbui.es/`  
Repositorio: `blocksbarcelona/handbol-trio-web`  
Estado inicial: rama `main` limpia; despliegue mediante GitHub Pages; aplicación React 19 y Vite 6 ubicada en `prototypes/calendari-resultats`.

## Resumen

La web funciona y el dominio oficial está indexado por su marca, pero la versión publicada dependía casi por completo del renderizado JavaScript y coexistía con páginas lingüísticas antiguas. El sitemap declaraba URLs duplicadas, fechas obsoletas y una URL de otro dominio. La identidad local era visible principalmente en el pie y no estaba descrita en los metadatos ni en el marcado de entidad.

Se han implementado los P0 y P1 que no requerían información nueva del club: HTML rastreable, doce URLs canónicas por idioma e intención, `hreflang`, sitemap generado, política explícita para OAI-SearchBot sin cambiar la política de GPTBot, entidad centralizada, JSON-LD conectado, datos públicos para agentes y pruebas automatizadas.

La matriz completa con impacto, prioridad, esfuerzo y estado está en `docs/seo-audit-matrix.md`.

## Arquitectura y tecnología

- React 19 con renderizado cliente y Vite 6.
- La fuente de la interfaz está en `prototypes/calendari-resultats/src/`.
- Los calendarios proceden de `src/data/isquad-schedule.json`, generado desde iSquad.
- `npm run build:pages` compila y copia los archivos publicados a la raíz.
- GitHub Actions publica el contenido de la rama principal mediante GitHub Pages.
- `CNAME` fija `chmontbui.es` como dominio.
- Idiomas de interfaz existentes: catalán, castellano e inglés.
- Analytics existente: GA4 `G-0RY8SSNERL`.

## P0 — Bloqueos o incoherencias críticas

### P0.1 Contenido esencial dependiente de JavaScript — corregido

El HTML inicial contenía únicamente `#root`. Los rastreadores capaces de ejecutar JavaScript podían procesarlo, pero otros recuperadores y agentes recibían muy poco texto citable. El build genera ahora HTML semántico visible y coherente con la aplicación para inicio y calendario.

### P0.2 Sitemap incorrecto y obsoleto — corregido

El sitemap anterior:

- duplicaba `index.html` como catalán y castellano;
- indicaba `lastmod` de 2025;
- enlazaba páginas antiguas;
- incluía `www.clubhandbolmontbui.com/privacy_en.html`, fuera del dominio canónico.

Ahora se genera automáticamente y solo incluye las seis URLs canónicas indexables, con `lastmod` derivado del contenido o del calendario.

### P0.3 Versiones lingüísticas contradictorias — corregido

`ca.html` era una redirección a `index.html`; `es.html` y `en.html` conservaban una web antigua, afirmaban que el club era “profesional” y usaban recursos inexistentes. Ahora las URLs canónicas son `/`, `/es/` y `/en/`; las antiguas son redirecciones `noindex, follow`.

### P0.4 Datos estructurados incompletos — corregido

El marcado inicial solo describía un `SportsTeam` sin dirección ni relación local. El nuevo grafo incluye `SportsOrganization`, `WebSite`, `WebPage` o `CollectionPage`, dirección, contacto, área servida, perfiles oficiales e identificadores `@id` estables.

## P1 — Impacto alto

### P1.1 Identidad local poco explícita — corregido

La introducción visible, titles y descriptions explican ahora que el Club Handbol Montbui está en Santa Margarida de Montbui, l’Anoia, junto a Igualada y Vilanova del Camí. No se presenta al club como si estuviera en Igualada.

### P1.2 Calendario sin URL indexable propia — corregido parcialmente

Se han creado `/calendari/`, `/es/calendario/` y `/en/calendar/`. La lista completa es rastreable sin interacción. No se crean todavía páginas `SportsEvent` porque los 82 partidos del archivo actual carecen de día exacto u hora confirmados (`readyForPublication: false`).

### P1.3 Selector lingüístico no rastreable — corregido

Los botones que solo cambiaban estado local se han sustituido por enlaces reales con `hreflang`, URL propia y `aria-current`.

### P1.4 Información de entidad duplicada — corregido

Nombre, dirección, correo, teléfono, URLs, perfiles y rutas lingüísticas se centralizan en `src/data/club.js` y se reutilizan en interfaz, metadatos, JSON-LD y feeds.

### P1.5 Contacto y cómo llegar poco explícitos — corregido

El pie contiene enlace telefónico, correo, dirección textual y enlace descriptivo a Google Maps. La ubicación no depende exclusivamente del mapa.

### P1.6 Falta de validación SEO automatizada — corregido

Las pruebas comprueban idioma, canonical, title único, H1, alternativas recíprocas, JSON-LD parseable, sitemap, robots, redirecciones y feeds.

### P1.7 Navegación principal ausente en móvil — corregido

Por debajo de 860 px el menú de escritorio quedaba oculto sin alternativa. Se ha añadido un menú móvil nativo, navegable con teclado, con foco visible y textos localizados en catalán, castellano e inglés.

### P1.8 Falta de páginas de entidad y contacto — corregido

Se han añadido páginas equivalentes de “El club” y “Contacto/localización” en los tres idiomas. Incluyen HTML rastreable, enlaces internos, breadcrumbs visibles, `BreadcrumbList` y únicamente datos ya presentes en el proyecto.

### P1.9 Imágenes activas pesadas — corregido

Las cuatro imágenes activas de mayor tamaño se sirven ahora como WebP sin metadatos. Se conservan dimensiones explícitas y carga diferida donde corresponde; la imagen principal mantiene prioridad alta y precarga justificada.

## P2 — Mejoras importantes pendientes

- Crear páginas de equipo cuando el club apruebe textos y responsables editoriales.
- Generar una URL por partido confirmado y marcado `SportsEvent` fiel al contenido visible.
- Crear páginas editoriales de club, entrenamientos, “ven a probar” y preguntas frecuentes.
- Comprimir las imágenes PNG de captación y servir variantes WebP/AVIF con dimensiones explícitas.
- Añadir noticias o crónicas como HTML estático con `Article`/`NewsArticle`.
- Revisar la afirmación visible de `60+`, `20 años` y `100+ victorias`.
- Confirmar si “Laia” y el teléfono deben seguir figurando públicamente.
- Añadir una política editorial y de consentimiento de imágenes de menores.
- Preparar notificación IndexNow después de cada cambio público significativo.

## P3 — Trabajo futuro

- Histórico de temporadas con separación clara respecto a la temporada activa.
- Feed RSS/Atom de noticias y resultados.
- Suscripción ICS por equipo.
- Páginas diferenciadas para actividades reales con escuelas o municipios, sin páginas puerta.
- Monitorización automática de enlaces rotos y cambios de schema.org.
- Optimización avanzada de imágenes, vídeo y métricas Web Vitals basada en datos de campo.

## Rastreo e indexación

- `robots.txt`: permite buscadores; declara `OAI-SearchBot`; excluye rutas de código y documentación.
- GPTBot: no se ha cambiado su política; continúa sujeto a la regla general permitida. La decisión sobre entrenamiento debe tomarla el propietario por separado.
- No hay `noindex` en páginas canónicas.
- Las redirecciones lingüísticas antiguas sí son `noindex, follow`.
- La 404 es una página independiente con `noindex, follow` y recursos válidos.
- No se detectaron cabeceras `X-Robots-Tag` en el repositorio; deben revisarse en la respuesta pública tras publicar.

## SEO local

Datos visibles coherentes:

- Club Handbol Montbui / CH Montbui.
- Av. de l’Esport, Sant Maure, 08710 Santa Margarida de Montbui.
- Comarca de l’Anoia, Barcelona, Catalunya.
- `chmontbui06@gmail.com`.
- Instagram y YouTube oficiales usados por la web.
- Referencia municipal oficial incluida como `sameAs`.

Pendiente: comprobar Google Business Profile, Bing Places, ficha federativa, titularidad del teléfono y denominación oficial de la instalación.

## Rendimiento y accesibilidad

Observaciones de build iniciales:

- JavaScript final: 412,21 kB sin comprimir y 95,85 kB gzip.
- CSS final: 33,36 kB sin comprimir y 7,41 kB gzip.
- Imágenes principales: entre 384 y 584 kB; existe una carpeta heredada de imágenes más pesada.
- Las fuentes se alojan localmente y evitan una dependencia externa de Google Fonts en la aplicación nueva.

Mejoras aplicadas:

- navegación lingüística mediante enlaces;
- identidad y contacto disponibles en texto;
- teléfono mediante `tel:` y correo mediante `mailto:`;
- ubicación legible sin depender del color o del mapa;
- landmarks y jerarquía presentes tanto en HTML inicial como en React.
- menú principal móvil accesible, sin desbordamiento horizontal a 390 × 844 px.

Pendiente: medición Lighthouse de producción después de publicar, revisión de foco/contraste en todos los estados y conversión de imágenes a formatos modernos.

## Fuentes técnicas consultadas

- Google Search Central: optimización para funciones generativas, datos estructurados, eventos, organizaciones, sitios multilingües y políticas contra spam.
- OpenAI: documentación oficial de OAI-SearchBot y controles separados respecto a GPTBot.
- Bing Webmaster Tools: sitemap, directrices e IndexNow.
- Schema.org: `SportsOrganization`, `SportsTeam`, `SportsEvent`, `PostalAddress` y `ContactPoint`.
