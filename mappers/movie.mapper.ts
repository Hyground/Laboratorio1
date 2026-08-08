import type { MovieDbMovieDto } from '../dtos/movie-db.dto.js';
import type { Movie } from '../entities/movie.entity.js';

/** Convierte el payload externo en la entidad que consume la interfaz. */
export function mapMovieDtoToEntity(dto: MovieDbMovieDto, genreId: number): Movie {
    const numericRating = Number(dto.rating);
    return {
        // Sample APIs reutiliza identificadores entre categorías; se crea una clave estable por género.
        id: genreId * 10000 + dto.id,
        imdbId: dto.imdbId,
        title: dto.title?.trim() || 'Sin título',
        synopsis: 'Sinopsis no disponible.',
        posterUrl: dto.posterURL ?? '',
        releaseYear: dto.year ? String(dto.year) : 'Año no disponible',
        rating: Number.isFinite(numericRating) ? numericRating : 0,
        genreIds: [genreId],
        isFavorite: false,
        reviewCount: 0
    };
}
