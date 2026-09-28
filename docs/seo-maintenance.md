# Mantenimiento SEO y de datos públicos

## Antes de cada publicación

1. Actualizar primero la fuente correspondiente: entidad en `src/data/club.js`, calendario mediante el extractor o contenido editorial aprobado.
2. Comprobar que no se incluyen datos personales de menores ni metadatos sensibles.
3. Ejecutar `npm run build` y `npm test` dentro de `prototypes/calendari-resultats`.
4. Revisar `dist/client/index.html`, una versión traducida y el calendario renderizado.
5. Ejecutar `npm run build:pages` solo cuando se vaya a preparar la publicación.
6. Revisar el diff, crear commit informativo y publicar únicamente con autorización.
7. Tras desplegar, comprobar HTML público, sitemap, robots, JSON-LD y enlaces de contacto.

## Datos que cambian con frecuencia

- `isquad-schedule.json`: generado automáticamente; no editar manualmente.
- `generatedAt` y `lastmod` del calendario: deben reflejar el cambio real de datos.
- Temporada visible: actualizar conjuntamente interfaz, entidad, calendario y contenido editorial.
- Equipos y categorías: deben coincidir con iSquad o una confirmación explícita del club.

## Política de crawlers

- `OAI-SearchBot`: permitido para facilitar aparición y citas en ChatGPT Search.
- `GPTBot`: no tiene una regla propia; se conserva la política previa derivada de `User-agent: *`. Cualquier cambio debe aprobarlo el propietario como decisión separada sobre entrenamiento.
- Googlebot y Bingbot: permitidos por la regla general.
- Rutas de código y documentación: excluidas del rastreo, aunque el despliegue debería evolucionar hacia un artefacto que contenga solo archivos públicos.

`llms.txt` es complementario y experimental. No sustituye HTML, sitemap, robots, autoridad ni contenido útil.
