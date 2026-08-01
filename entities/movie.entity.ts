/** Entidad interna, ya validada y lista para la interfaz. */
export interface Movie {
    id: number;
    title: string;
    synopsis: string;
    posterUrl: string;
    releaseYear: string;
    rating: number;
    genreIds: number[];
    isFavorite: boolean;
    reviewCount: number;
}
