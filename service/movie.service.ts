import type { MovieDbMovieDto } from '../dtos/movie-db.dto.js';
import type { Movie, MovieCatalogResult } from '../entities/movie.entity.js';
import { mapMovieDtoToEntity } from '../mappers/movie.mapper.js';

// API pública gratuita: no requiere registro ni API key.
const API_BASE_URL = 'https://api.sampleapis.com/movies';
const CINEMETA_BASE_URL = 'https://v3-cinemeta.strem.io/meta/movie';
const ENDPOINTS: ReadonlyArray<readonly [string, number, string]> = [
    ['action-adventure', 28, 'Acción y aventura'],
    ['comedy', 35, 'Comedia'],
    ['drama', 18, 'Drama'],
    ['horror', 27, 'Terror'],
    ['scifi-fantasy', 878, 'Ciencia ficción']
];

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response.json() as Promise<T>;
}

/** Conecta tres endpoints reales y los consulta en paralelo. */
export async function cargarDatosOrquestados(): Promise<MovieCatalogResult> {
    const results = await Promise.allSettled(ENDPOINTS.map(([genre]) => fetchJson<unknown>(`${API_BASE_URL}/${genre}`)));
    const mappedMovies = results.flatMap((result, index) => result.status === 'fulfilled'
        ? normalizeMovies(result.value).map((movie) => mapMovieDtoToEntity(movie, ENDPOINTS[index][1]))
        : []);
    const failedGenres = results.flatMap((result, index) => {
        const hasMovies = result.status === 'fulfilled' && normalizeMovies(result.value).length > 0;
        return hasMovies ? [] : [ENDPOINTS[index][2]];
    });
    const movies = deduplicate(mappedMovies);
    await enrichMovies(movies);
    return { movies, failedGenres };
}

interface CinemetaResponse {
    meta?: {
        description?: string;
        imdbRating?: string | number;
        poster?: string;
        releaseInfo?: string;
    };
}

/** Completa metadatos faltantes mediante Cinemeta, una API gratuita sin clave. */
async function enrichMovies(movies: Movie[]): Promise<void> {
    const pending = movies.filter((movie) => movie.imdbId);
    const concurrency = 8;
    let nextIndex = 0;

    async function worker(): Promise<void> {
        while (nextIndex < pending.length) {
            const movie = pending[nextIndex++];
            try {
                const payload = await fetchJson<CinemetaResponse>(`${CINEMETA_BASE_URL}/${encodeURIComponent(movie.imdbId!)}.json`);
                const meta = payload.meta;
                if (!meta) continue;
                if (meta.description?.trim()) movie.synopsis = meta.description.trim();
                if (meta.poster?.trim()) movie.posterUrl = meta.poster.trim();
                if (movie.releaseYear === 'Año no disponible' && meta.releaseInfo?.trim()) movie.releaseYear = meta.releaseInfo.trim();
                const externalRating = Number(meta.imdbRating);
                if ((!movie.rating || !Number.isFinite(movie.rating)) && Number.isFinite(externalRating)) movie.rating = externalRating;
            } catch {
                // La información original permanece disponible si Cinemeta no responde.
            }
        }
    }

    await Promise.all(Array.from({ length: Math.min(concurrency, pending.length) }, () => worker()));
}

function deduplicate(movies: Movie[]): Movie[] {
    const unique = new Map<string, Movie>();
    for (const movie of movies) {
        const key = `${movie.title.toLocaleLowerCase()}-${movie.releaseYear}`;
        const existing = unique.get(key);
        if (existing) existing.genreIds = [...new Set([...existing.genreIds, ...movie.genreIds])];
        else unique.set(key, movie);
    }
    return [...unique.values()];
}

/** Algunos endpoints entregan un arreglo y otros lo envuelven en data/results/items. */
function normalizeMovies(payload: unknown): MovieDbMovieDto[] {
    if (Array.isArray(payload)) return payload.filter(isMovieDto);
    if (!isRecord(payload)) return [];
    for (const key of ['results', 'data', 'movies', 'items']) {
        const value = payload[key];
        if (Array.isArray(value)) return value.filter(isMovieDto);
    }
    return isMovieDto(payload) ? [payload] : [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}

function isMovieDto(value: unknown): value is MovieDbMovieDto {
    return isRecord(value) && typeof value.id === 'number' && typeof value.title === 'string';
}
