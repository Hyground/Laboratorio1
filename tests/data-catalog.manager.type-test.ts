import type { Documentary } from '../entities/documentary.entity.js';
import type { Movie } from '../entities/movie.entity.js';
import type { Series } from '../entities/series.entity.js';
import {
    DataCatalogManager,
    type CatalogCreate,
    type CatalogIdentity,
    type CatalogUpdate
} from '../repository/data-catalog.manager.js';

const movieCatalog = new DataCatalogManager<Movie>();
const seriesCatalog = new DataCatalogManager<Series>();
const documentaryCatalog = new DataCatalogManager<Documentary>();

const movieData: CatalogCreate<Movie> = {
    title: 'Película de prueba',
    synopsis: 'Demuestra la creación tipada.',
    posterUrl: '',
    releaseYear: '2026',
    rating: 8,
    genreIds: [18],
    isFavorite: false,
    reviewCount: 0
};

movieCatalog.create(1, movieData);

const movieIdentity: CatalogIdentity<Movie> = { id: 1 };
const movieUpdate: CatalogUpdate<Movie> = { rating: 8.5, isFavorite: true };
movieCatalog.update(movieIdentity.id, movieUpdate);

seriesCatalog.add({
    id: 'series-1',
    title: 'Serie de prueba',
    synopsis: 'Valida el mismo repositorio con Series.',
    posterUrl: '',
    releaseYear: '2025',
    rating: 7.8,
    seasonCount: 2,
    episodeCount: 16,
    status: 'running',
    genreIds: [18]
});

documentaryCatalog.add({
    id: 'documentary-1',
    title: 'Documental de prueba',
    synopsis: 'Valida el mismo repositorio con Documentary.',
    posterUrl: '',
    releaseYear: '2024',
    rating: 9,
    subject: 'Tecnología',
    durationMinutes: 90,
    educational: true
});

const filteredMovies: Movie[] = movieCatalog.filter((movie) => movie.rating >= 8);
const foundSeries: Series | undefined = seriesCatalog.findById('series-1');
const documentaries: Documentary[] = documentaryCatalog.findBy('educational', true);

void filteredMovies;
void foundSeries;
void documentaries;
