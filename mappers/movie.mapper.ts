import type { IncompleteMovieDbDto } from '../dtos/movie-db.dto.js';
import type { Movie } from '../entities/movie.entity.js';

/** Convierte el payload externo en la entidad que consume la interfaz. */
export function mapMovieDtoToEntity(dto: IncompleteMovieDbDto, genreId: number, fallbackIndex = 0): Movie {
    const numericRating = Number(dto.rating);
    const safeSourceId = typeof dto.id === 'number' && Number.isFinite(dto.id) ? dto.id : fallbackIndex + 1;
    const defaults: Pick<Movie, 'title' | 'synopsis' | 'posterUrl' | 'releaseYear' | 'rating'> = {
        title: 'Sin título',
        synopsis: 'Sinopsis no disponible.',
        posterUrl: '',
        releaseYear: 'Año no disponible',
        rating: 0
    };
    return {
        // Sample APIs reutiliza identificadores entre categorías; se crea una clave estable por género.
        id: genreId * 10000 + safeSourceId,
        ...(dto.imdbId ? { imdbId: dto.imdbId } : {}),
        title: dto.title?.trim() || defaults.title,
        synopsis: defaults.synopsis,
        posterUrl: dto.posterURL?.trim() || defaults.posterUrl,
        releaseYear: typeof dto.year === 'number' && Number.isFinite(dto.year) ? String(dto.year) : defaults.releaseYear,
        rating: Number.isFinite(numericRating) && numericRating >= 0 ? numericRating : defaults.rating,
        genreIds: [genreId],
        isFavorite: false,
        reviewCount: 0
    };
}
