# Fuente de entidad local

La fuente ejecutable está en `prototypes/calendari-resultats/src/data/club.js`. Este documento explica qué datos son publicables, su procedencia y qué falta confirmar.

## Datos centralizados

| Campo | Valor | Evidencia |
|---|---|---|
| Nombre | Club Handbol Montbui | Web y encargo del club |
| Nombre abreviado | CH Montbui | Calendario y uso habitual indicado |
| Actividad | Handbol / balonmano | Web e iSquad |
| Tipo | Entidad deportiva local sin ánimo de lucro | Información facilitada por el club |
| Municipio | Santa Margarida de Montbui | Dirección pública y ficha municipal |
| Núcleo | Sant Maure | Información facilitada por el club |
| Comarca | l’Anoia | Información facilitada por el club |
| Provincia | Barcelona | Información facilitada por el club |
| Comunidad autónoma | Catalunya | Información facilitada por el club |
| Dirección | Av. de l’Esport, 08710 Santa Margarida de Montbui | Web actual y encargo |
| Correo | `chmontbui06@gmail.com` | Web actual y encargo |
| Teléfono | `+34 633 556 228` | Publicado actualmente en la web |
| Dominio | `https://chmontbui.es/` | CNAME, canonical y web pública |
| Instagram | `https://www.instagram.com/chmontbui/` | Web actual |
| YouTube | `https://www.youtube.com/@clubhandbolmontbui` | Web actual |
| Referencia municipal | Ficha de entidad en `montbui.cat` | Fuente institucional pública |

## Regla de uso geográfico

Forma recomendada:

> Club d’handbol de Santa Margarida de Montbui, a la comarca de l’Anoia, al costat d’Igualada i Vilanova del Camí.

No utilizar “club de Igualada”, porque el club está en Santa Margarida de Montbui. Se puede indicar proximidad o área servida si refleja la realidad.

## Datos pendientes de confirmar

- Denominación oficial exacta y NIF de la entidad, solo si se desea publicar.
- Año de fundación y si “20 años” continúa siendo exacto.
- Nombre oficial de la instalación: Mont-aQua, Complex Esportiu Mont-aQua u otra denominación.
- Si las coordenadas de iSquad corresponden a la entrada pública correcta.
- Titularidad y autorización de publicación del teléfono y del nombre “Laia”.
- Página oficial específica del club en la Federació Catalana d’Handbol.
- Otros perfiles sociales oficiales, especialmente Facebook.
- Política oficial sobre sesión de prueba, inscripciones, cuotas y edades.
- Confirmación documental de `60+ jugadores/jugadoras` y `100+ victorias`.
- Colores oficiales: el encargo indica azul, amarillo y blanco, mientras la interfaz aprobada utiliza azul y magenta. No se ha alterado el diseño.

## Mantenimiento

Toda modificación de nombre, contacto, dirección, URLs o perfiles debe hacerse primero en `club.js`. Después se debe ejecutar:

```bash
npm run build
npm test
```

El build reutiliza esos datos en HTML, JSON-LD, feeds y páginas localizadas.
