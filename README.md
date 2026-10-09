# Modulo-5-redes-sociales

**Río de las Decisiones**: minijuego de la actividad evaluativa del Módulo 5 (redes sociales y conexión real).

Capi, una capibara con sombrero vueltiao, baja por un río. En cada bifurcación aparece una situación y dos letreros con las respuestas. La niebla oculta cuál camino es cuál: si elige la respuesta correcta, el río la lleva a un paisaje tranquilo; si se equivoca, a uno tenebroso, con la retroalimentación de la pregunta.

- 11 preguntas (de la 1 a la 11 de la actividad).
- Se empieza con 100 puntos. Las preguntas 1 a 10 valen 9 puntos y la 11 vale 10.
- Un error no detiene el juego: solo resta el valor de esa pregunta.
- El lado de la respuesta correcta (izquierda o derecha) se sortea en cada partida.
- Se juega con el mouse, con el dedo o con las flechas ← → del teclado.

## Ejecutar en tu computador

Necesitas [Node.js](https://nodejs.org) 18 o superior.

```bash
npm install
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).

## Publicar en GitHub Pages

El repositorio ya trae el flujo `.github/workflows/deploy.yml`, que compila y publica el juego cada vez que subes cambios a la rama `main`.

1. Sube el proyecto a GitHub (`git add .`, `git commit`, `git push`).
2. En GitHub, entra a **Settings → Pages** y en **Source** elige **GitHub Actions**.
3. Ve a la pestaña **Actions** y espera a que termine el flujo "Publicar en GitHub Pages" (si no arrancó solo, ábrelo y pulsa **Run workflow**).
4. El juego queda en `https://<tu-usuario>.github.io/Modulo-5-redes-sociales/`.

## Cambiar preguntas o puntajes

Todo está en `src/data/preguntas.js`. Cada pregunta tiene su situación, la respuesta correcta, la incorrecta, la retroalimentación y los puntos. Si cambias los puntos, procura que la suma siga dando 100.

## Estructura

```
src/
  App.jsx                      flujo del juego, pantallas de inicio y final
  data/preguntas.js            preguntas, respuestas, retroalimentación y puntos
  components/
    Canoa.jsx                  Capi y su canoa (SVG)
    EscenaBifurcacion.jsx      el río que se divide, con niebla
    EscenasDestino.jsx         paisaje tranquilo y paisaje tenebroso
    Letrero.jsx                letreros de madera con las respuestas
```

Hecho con React, Vite y Tailwind CSS.
