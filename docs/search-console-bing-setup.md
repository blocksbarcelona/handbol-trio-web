# Configuración de Google Search Console y Bing Webmaster Tools

Estas acciones requieren una cuenta autorizada del club y no se realizan desde el repositorio.

## Google Search Console

1. Crear o seleccionar una propiedad de dominio para `chmontbui.es`.
2. Verificarla por DNS con la cuenta que controla el dominio.
3. Comprobar las variantes `http`, `https`, `www` y sin `www`; confirmar que consolidan en `https://chmontbui.es/`.
4. Enviar `https://chmontbui.es/sitemap.xml`.
5. Inspeccionar en vivo:
   - `/`
   - `/calendari/`
   - `/es/`
   - `/en/`
6. Confirmar que Google ve el HTML renderizado, canonical y `hreflang` esperados.
7. Revisar semanalmente durante el primer mes: indexación de páginas, sitemaps, mejoras, HTTPS y acciones manuales.
8. Asociar Search Console con GA4 si la gobernanza del club lo permite.

No solicitar indexación de decenas de URLs repetidamente. Para varias páginas, utilizar el sitemap y `lastmod` real.

## Bing Webmaster Tools

1. Crear la propiedad `https://chmontbui.es/` o importarla desde Search Console.
2. Enviar `https://chmontbui.es/sitemap.xml`.
3. Revisar Site Explorer, URL Inspection, robots y backlinks.
4. Verificar que Bing puede recuperar las seis páginas canónicas.
5. Preparar IndexNow únicamente cuando exista una clave guardada de forma segura.

## Diseño de IndexNow

Integración propuesta para el automatismo de calendarios:

1. Detectar qué URLs públicas cambiaron realmente.
2. Publicar y verificar primero la web.
3. Notificar solo esas URLs a `https://api.indexnow.org/indexnow`.
4. Guardar la clave fuera del repositorio y publicar únicamente el archivo de verificación requerido por el protocolo.
5. Registrar fecha, URLs, código HTTP y respuesta.
6. No considerar una respuesta correcta como garantía de indexación.

No se ha activado porque requiere decidir la titularidad y almacenamiento de la clave.

## Comprobaciones después de publicar

```text
https://chmontbui.es/robots.txt
https://chmontbui.es/sitemap.xml
https://chmontbui.es/llms.txt
https://chmontbui.es/dades/club.json
https://chmontbui.es/dades/calendari.json
```

Validar también el resultado enriquecido y la sintaxis de JSON-LD con las herramientas oficiales de Google y Schema.org.
