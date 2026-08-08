/** Entidad interna, ya validada y lista para la interfaz. */
export interface Movie {
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
