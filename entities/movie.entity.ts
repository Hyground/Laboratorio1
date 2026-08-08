import type { CatalogEntity } from './catalog.entity.js';

/** Entidad interna, ya validada y lista para la interfaz. */
export interface Movie extends CatalogEntity {
    id: number;
    imdbId?: string;
    title: string;
    synopsis: string;
    posterUrl: string;
    releaseYear: string;
    rating: number;
    genreIds: number[];
    isFavorite: boolean;
    reviewCount: number;
}

export interface MovieCatalogResult {
    movies: Movie[];
    failedGenres: string[];
}
