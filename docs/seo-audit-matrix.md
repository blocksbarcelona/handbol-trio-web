# Matriz de auditoría SEO, local y AEO/GEO

Auditoría actualizada el 23 de noviembre de 2026. Validada en build local y verificada en producción (`chmontbui.es`).

| Problema | Página o archivo afectado | Impacto SEO | Impacto en LLM y agentes | Prioridad | Esfuerzo | Solución propuesta | Estado |
|---|---|---|---|---|---|---|---|
| Contenido principal dependiente de JavaScript | Rutas React | Rastreo y comprensión incompletos | Poco texto recuperable y citable | Crítica | Alta | Generar HTML semántico por ruta | Corregido |
| URLs de idioma antiguas contradictorias | `ca.html`, `es.html`, `en.html` | Duplicidad y señales lingüísticas confusas | Respuestas basadas en contenido obsoleto | Crítica | Media | Rutas limpias, `noindex`, `lang` correcto y redirección heredada | Corregido; 301 real no disponible en Pages |
| Sitemap duplicado y obsoleto | `sitemap.xml` | Descubrimiento y actualización incorrectos | Recuperación de URLs no canónicas | Crítica | Baja | Generarlo desde las rutas canónicas (incl. patrocinio) | Corregido |
| Entidad local incompleta | Inicio y schema anterior | Menor relevancia local | Dificulta desambiguar club, municipio y comarca | Alta | Media | Entidad única con dirección, área, perfiles y `SportsTeam` | Corregido |
| Contacto solo dentro del inicio | Footer | Menor cobertura para intención local/transaccional | Respuesta de contacto menos directa | Alta | Media | Página `/contacte/` y equivalentes | Corregido |
| Falta página propia del club | Inicio | Intención informativa concentrada en una página amplia | Menos contexto factual reutilizable | Alta | Media | Página `/club/` y equivalentes con datos verificados | Corregido |
| Calendario sin URL permanente | Navegación por hash | Indexación limitada | Los agentes no pueden citar una URL estable | Alta | Media | Página de calendario por idioma | Corregido |
| Partidos sin datos estructurados de evento | Calendario | Menor cobertura de eventos concretos | Difícil responder sobre un partido específico | Alta | Media | Emitir `SportsEvent` JSON-LD para partidos confirmados | Corregido |
| Páginas de patrocinio sin `hreflang`, schema o `og:image` válida | `patrocinadors.html`, `patrocinadores.html`, `sponsors.html` | Señales multilingües rotas y enlaces internos a redirecciones | Menor descubrimiento e imagen social rota | Alta | Baja | `hreflang` recíproco, `og:image` absoluta, JSON-LD, sitemap y enlaces canónicos | Corregido |
| Selector lingüístico basado en botones | Cabecera anterior | Versiones difíciles de descubrir | Idioma ambiguo | Alta | Baja | Enlaces reales, `hreflang` y `aria-current` | Corregido |
| Sin breadcrumbs en páginas interiores | Calendario, club, contacto y patrocinio | Contexto jerárquico limitado | Menor claridad de relación entre recursos | Media | Baja | Breadcrumb visible y `BreadcrumbList` | Corregido |
| Títulos o descripciones no diferenciados | Versiones antiguas | CTR y relevancia poco precisos | Resúmenes genéricos | Alta | Baja | Metadatos únicos por idioma e intención + `og:site_name`/`og:locale:alternate` | Corregido |
| Jerarquía H1 inconsistente al hidratar | Calendario directo | Señal principal ambigua | Extracción del tema menos fiable | Alta | Baja | H1 condicional para páginas directas | Corregido |
| Menú principal oculto en móvil | `<860px` | Peor navegación y enlaces internos | Menos rutas accesibles desde el cliente | Alta | Baja | Menú móvil nativo y traducido | Corregido |
| PNG y JPEG pesados | Imágenes de portada, equipo y captación | LCP y transferencia mayores | Sin efecto semántico directo | Media | Baja | WebP sin metadatos y dimensiones explícitas | Corregido en imágenes activas |
| Código JavaScript relativamente grande | Bundle React | Puede afectar interacción en móvil | Recuperadores sin JS dependen del fallback | Media | Alta | HTML previo ya aplicado; estudiar división por secciones | Parcial |
| Ausencia de validación automatizada | Build | Regresiones silenciosas | Canonical/schema podrían romperse | Alta | Media | Tests de rutas, schema, `SportsEvent`, sitemap, patrocinio y robots | Corregido |
| Códigos y cabeceras públicas sin verificar | Producción | Posible `X-Robots-Tag`, 404 blanda o caché | Acceso real del agente incierto | Alta | Baja | Validación HTTP tras despliegue (`200` en 15 rutas + `404` real) | Corregido |
| Sin datos de campo de Core Web Vitals | Producción | Rendimiento real desconocido | Sin impacto directo probado | Media | Media | Search Console, CrUX y Lighthouse tras publicar | Pendiente externo |
| Datos institucionales sin confirmar | Estadísticas, teléfono, instalación | Riesgo de incoherencia NAP y confianza | Posibles respuestas incorrectas | Alta | Baja | Confirmación por el club y actualización central | Pendiente del club |
| Sin fichas ni medición externa verificadas | Google, Bing, Apple, Federación | Menor autoridad y visibilidad local | Menos fuentes independientes corroborantes | Alta | Media | Ejecutar el checklist de presencia local | Pendiente externo |

## Evidencia de validación local

- Compilación Vite y generación de páginas completadas.
- Tests de servidor y SEO ejecutados.
- Sitemap validado como XML.
- Rutas principales comprobadas en servidor local.
- Revisión móvil a 390 × 844 px, sin desbordamiento horizontal ni imágenes rotas.
- JSON-LD parseado en pruebas automatizadas; la validación pública de resultados enriquecidos queda pendiente.
