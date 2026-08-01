import type { MovieDbMovieDto } from '../dtos/movie-db.dto.js';
import type { Movie } from '../entities/movie.entity.js';
import { mapMovieDtoToEntity } from '../mappers/movie.mapper.js';

// API pública gratuita: no requiere registro ni API key.
const API_BASE_URL = 'https://api.sampleapis.com/movies';
const ENDPOINTS: ReadonlyArray<readonly [string, number]> = [
    ['action-adventure', 12],
    ['comedy', 35],
    ['drama', 18]
];

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
    return response.json() as Promise<T>;
}

/** Conecta tres endpoints reales y los consulta en paralelo. */
export async function cargarDatosOrquestados(): Promise<Movie[]> {
    const results = await Promise.allSettled(ENDPOINTS.map(([genre]) => fetchJson<unknown>(`${API_BASE_URL}/${genre}`)));
    const mappedMovies = results.flatMap((result, index) => result.status === 'fulfilled'
        ? normalizeMovies(result.value).map((movie) => mapMovieDtoToEntity(movie, ENDPOINTS[index][1]))
        : []);
    return mappedMovies.length ? mappedMovies : [mapMovieDtoToEntity({ id: 0, title: 'CineStream', posterURL: 'https://placehold.co/500x750?text=CineStream', rating: 0 }, 0)];
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
