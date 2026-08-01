# Laboratorio 3: CineStream en TypeScript

## Iniciar y ver la página

Desde la raíz de `Pruea` ejecuta:

```powershell
npm run build
```

Después abre `index.html` con Live Server. La conexión está centralizada en `service/movie.service.ts` y consulta tres endpoints reales de Sample APIs: acción-aventura, comedia y drama. Esta API es pública y no requiere API key.

Para validar sin generar JavaScript:

```powershell
npx tsc --noEmit
```

Las fuentes de entrega son TypeScript: `dtos/`, `entities/`, `mappers/`, `service/` y `app.ts`.
