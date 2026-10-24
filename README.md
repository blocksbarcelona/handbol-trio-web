# Club Handbol Montbui - Web Oficial

Web oficial del Club Handbol Montbui, desarrollada con HTML5, CSS3 y JavaScript Vanilla.

## Estructura del Proyecto

- `index.html`: Página principal (Español)
- `index.html`: Versión en Catalán
- `en.html`: Versión en Inglés
- `css/styles.css`: Estilos principales y sistema de diseño
- `js/`: Lógica de la web (menú móvil, feed social)
- `assets/`: Imágenes y recursos estáticos

## Últimas Actualizaciones (v1.1 - Noviembre 2025)

- **Optimización SEO**: Implementación completa de meta etiquetas, canonicals, hreflang y Open Graph.
- **Datos Estructurados**: Añadido esquema JSON-LD para mejorar la indexación en Google.
- **Sitemap y Robots**: Creación de `sitemap.xml` y `robots.txt` para guiar a los buscadores.
- **GitHub Pages**: Configuración de dominio personalizado (`CNAME`) y página de error `404.html`.
- **Analítica**: Integración de Google Analytics (GA4).

## Vídeos de YouTube

La sección Actualitat consulta en el navegador la playlist de subidas del canal
mediante YouTube Data API v3. Muestra los cuatro últimos vídeos públicos, con el
más reciente como destacado y fechas de publicación traducidas. Consulta al abrir
la página, cada cinco minutos mientras está visible y al volver a la pestaña
(como máximo una vez por minuto). No requiere recompilar para mostrar nuevos vídeos.

La compilación reutiliza la configuración de API de navegador ya existente en
`js/social-feed.js`; se puede sustituir la clave al compilar con `YOUTUBE_API_KEY`.
Si YouTube falla, aparece un aviso y un botón para reintentar; si ya se había
cargado una lista, se conserva con un aviso de que no se pudo actualizar.

Desde `prototypes/calendari-resultats`, ejecutar `npm run build:pages` y `npm test`
antes de publicar. Las reconstrucciones automáticas del calendario conservan esta
integración.

## Licencia y Derechos de Uso

**© 2025 Club Handbol Montbui. Todos los derechos reservados.**

Este sitio web, incluyendo su diseño, código fuente, textos, imágenes y logotipos, es propiedad exclusiva del **Club Handbol Montbui**.

Queda estrictamente prohibida la copia, reproducción, distribución, comunicación pública o transformación total o parcial de este proyecto sin la autorización previa y por escrito del titular de los derechos.

---

Web realizada por [uberleap.com](https://uberleap.com) - 2025
