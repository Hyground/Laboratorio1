import type { MovieDbMovieDto } from '../dtos/movie-db.dto.js';
import type { Movie } from '../entities/movie.entity.js';

const DEFAULT_POSTER = 'https://placehold.co/500x750?text=Sin+poster';

/** Convierte el payload externo en la entidad que consume la interfaz. */
export function mapMovieDtoToEntity(dto: MovieDbMovieDto, genreId: number): Movie {
    const numericRating = Number(dto.rating);
    return {
        id: dto.id,
        title: dto.title?.trim() || 'Sin título',
        synopsis: `Película disponible en Sample APIs${dto.imdbId ? ` (${dto.imdbId})` : ''}.`,
        posterUrl: dto.posterURL || DEFAULT_POSTER,
        releaseYear: dto.year ? String(dto.year) : 'N/A',
        rating: Number.isFinite(numericRating) ? numericRating : 0,
        genreIds: [genreId],
        isFavorite: false,
        reviewCount: 0
    };
}
