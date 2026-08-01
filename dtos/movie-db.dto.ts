/** Respuesta cruda de Sample APIs (API pública, sin API key). */
export interface MovieDbMovieDto {
    id: number;
    title: string;
    posterURL?: string;
    imdbId?: string;
    rating?: string | number;
    runtime?: number;
    year?: number;
}

export interface MovieDbResponseDto {
    results: MovieDbMovieDto[];
}
