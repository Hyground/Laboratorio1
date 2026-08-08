# CineStream: repositorio genérico en TypeScript

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

## Arquitectura de la Tarea 4

`DataCatalogManager<T extends { id: string | number }>` implementa un repositorio genérico en memoria para `Movie`, `Series` y `Documentary`. Sus contratos de identidad, creación y actualización aplican `Pick`, `Omit` y `Partial` sin recurrir a `any`.

```text
API → unknown → validador → Partial<DTO> → mapper → entidad → repositorio → interfaz
```

Archivos clave:

- `repository/data-catalog.manager.ts`: repositorio y Utility Types.
- `entities/`: contratos polimórficos de contenido.
- `dtos/` y `mappers/`: aislamiento y saneamiento de red.
- `tests/data-catalog.manager.type-test.ts`: demostración compilable con tres entidades.
- `docs/Reporte-Tecnico-Tarea-4.pdf`: reporte formal de entrega.

Para validar los tipos sin generar JavaScript:

```powershell
npm run build
```

La configuración activa `strict`, `strictNullChecks`, `noUncheckedIndexedAccess` y `exactOptionalPropertyTypes`.

Las fuentes de entrega son TypeScript: `dtos/`, `entities/`, `mappers/`, `service/` y `app.ts`.
