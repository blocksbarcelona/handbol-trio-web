# Plan de medición SEO, local y de conversión

## Línea base

Registrar la línea base el día de publicación de los cambios y compararla a 30, 60 y 90 días. No interpretar cambios diarios como tendencia.

| Área | Métrica | Fuente | Segmentación | Frecuencia |
|---|---|---|---|---|
| Indexación | URLs válidas, excluidas y con error | Google Search Console, Bing Webmaster Tools | Idioma y tipo de página | Semanal el primer mes; mensual después |
| Descubrimiento | Impresiones y clics | Search Console/Bing | Marca, no marca, local, catalán, castellano | Mensual |
| Resultado | CTR y posición orientativa | Search Console/Bing | Consulta y página | Mensual; no usar posición como único KPI |
| Conversión | Clics en correo | GA4 | Página, idioma, fuente | Mensual |
| Conversión | Clics en teléfono y WhatsApp | GA4 | Página, idioma, fuente | Mensual |
| Conversión | Solicitudes de prueba o inscripción | Formulario/registro manual | Fuente declarada | Mensual |
| Local | Visitas a “cómo llegar” | GA4 y Google Business Profile | Dispositivo y fuente | Mensual |
| Autoridad | Enlaces y menciones locales nuevas | Search Console, Bing, revisión manual | Ayuntamiento, federación, medios, escuelas | Mensual |
| IA | Referencias desde asistentes | GA4 y benchmark manual | Referente y landing page | Mensual |
| Calidad | Exactitud de respuestas de asistentes | Benchmark fijo | Consulta, idioma, ubicación | Mensual |

## Agrupación de consultas

- Marca: `Club Handbol Montbui`, `CH Montbui` y variantes.
- No marca local: `handbol Anoia`, `balonmano cerca de Igualada` y similares.
- Operativa: calendario, partidos, resultados, horarios, contacto, pabellón.
- Captación: apuntarse, probar, empezar, niños, niñas, juvenil.
- Idioma: catalán frente a castellano; no mezclar conclusiones.

## Eventos analíticos recomendados

Sin incorporar herramientas nuevas ni cookies adicionales, configurar en GA4:

- `contact_email_click` para `mailto:`.
- `contact_phone_click` para `tel:`.
- `contact_whatsapp_click` para `wa.me`.
- `directions_click` para Google Maps.
- `calendar_source_click` para iSquad.
- `trial_request_start` y `trial_request_submit` si se incorpora formulario.
- `language_change` para navegación entre versiones lingüísticas.

No enviar correos, teléfonos, nombres u otros datos personales como parámetros de Analytics.

## Referencias de asistentes

Crear una exploración por `page_referrer` y mantener una agrupación revisable de dominios conocidos. No asumir que todo tráfico de asistentes conserva referrer; parte aparecerá como directo. Registrar al menos referencias que contengan dominios oficiales de ChatGPT, Perplexity, Copilot/Bing o Gemini/Google cuando sean visibles.

## Objetivos razonables a 90 días

- Sitemap procesado sin errores.
- Las seis URLs canónicas principales descubiertas e indexables.
- Cero páginas lingüísticas antiguas indexadas como contenido independiente.
- Primeras impresiones no de marca para consultas de Montbui y l’Anoia.
- Medición fiable de clics de contacto y cómo llegar.
- Al menos tres menciones institucionales o locales revisadas y coherentes.
- Benchmark de asistentes repetido tres veces con metodología constante.

No se fija un objetivo de “posición 1”; depende de distancia, competencia, autoridad y sistemas externos.

## Plantilla de revisión mensual

| Mes | URLs indexadas / válidas | Errores de cobertura | Clics orgánicos | Impresiones no marca | Consultas locales destacadas | Clics contacto | Solicitudes de incorporación | Consultas patrocinio | Enlaces/menciones nuevas | Referencias de asistentes | Incidencias de calendario | Decisión siguiente |
|---|---:|---:|---:|---:|---|---:|---:|---:|---|---|---|---|
| AAAA-MM | — | — | — | — | — | — | — | — | — | — | — | — |

### Revisión cualitativa

1. Anotar las cinco consultas locales con mayor crecimiento y su página de destino.
2. Separar marca, no marca, calendario, captación y patrocinio.
3. Revisar si aparecen resultados enriquecidos o cambios de canonical elegida.
4. Verificar manualmente las conversiones; no enviar datos personales a Analytics.
5. Comparar el benchmark de asistentes con el mes anterior, sin inferir una tendencia de una sola prueba.
6. Registrar contenidos publicados, enlaces obtenidos y datos institucionales corregidos.
7. Elegir como máximo tres acciones para el mes siguiente.
