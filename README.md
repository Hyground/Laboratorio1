# Laboratorio 3: CineStream en TypeScript

## Iniciar y ver la página

La primera vez, instala las dependencias desde la raíz del proyecto:

```powershell
npm install
```

Para iniciar la página ejecuta:

```powershell
npm run dev
```

Abre la dirección local que aparece en la terminal. Vite transforma TypeScript en memoria, por lo que no genera archivos `.js` dentro del proyecto. No abras `index.html` con Live Server, ya que el navegador no puede ejecutar TypeScript directamente.

La conexión está centralizada en `service/movie.service.ts`. El catálogo se obtiene de Sample APIs y se completa mediante Cinemeta con sinopsis, puntuación, año y portada. Las sinopsis se traducen bajo demanda con MyMemory al idioma seleccionado. Las tres fuentes son públicas y no requieren API key.

Para validar los tipos sin generar JavaScript:

```powershell
npm run build
```

Las fuentes de entrega son TypeScript: `dtos/`, `entities/`, `mappers/`, `service/` y `app.ts`.
