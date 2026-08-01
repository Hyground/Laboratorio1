/** Contrato crudo del endpoint concurrente de reseñas. */
export interface ReviewsDto {
    movieId: number;
    averageRating: number;
    totalReviews: number;
}
