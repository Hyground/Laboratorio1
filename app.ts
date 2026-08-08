import { cargarDatosOrquestados } from './service/movie.service.js';
import type { Movie } from './entities/movie.entity.js';
import { DataCatalogManager } from './repository/data-catalog.manager.js';

type Language = 'es' | 'en' | 'fr' | 'de' | 'pt';
type Genre = 'todos' | 'favoritos' | `${number}`;

const translations: Record<Language, Record<string, string>> = {
    es: { categories: 'Categorías:', all: 'Todos', action: 'Acción y aventura', comedy: 'Comedia', drama: 'Drama', scifi: 'Ciencia ficción', horror: 'Terror', favorites: '❤️ Favoritos', popular: 'Películas populares', search_placeholder: 'Buscar película...', translating: 'Traduciendo sinopsis...', no_synopsis: 'Sinopsis no disponible.' },
    en: { categories: 'Categories:', all: 'All', action: 'Action & adventure', comedy: 'Comedy', drama: 'Drama', scifi: 'Science fiction', horror: 'Horror', favorites: '❤️ Favorites', popular: 'Popular movies', search_placeholder: 'Search movies...', translating: 'Loading synopsis...', no_synopsis: 'Synopsis unavailable.' },
    fr: { categories: 'Catégories :', all: 'Toutes', action: 'Action et aventure', comedy: 'Comédie', drama: 'Drame', scifi: 'Science-fiction', horror: 'Horreur', favorites: '❤️ Favoris', popular: 'Films populaires', search_placeholder: 'Rechercher un film...', translating: 'Traduction du synopsis...', no_synopsis: 'Synopsis indisponible.' },
    de: { categories: 'Kategorien:', all: 'Alle', action: 'Action & Abenteuer', comedy: 'Komödie', drama: 'Drama', scifi: 'Science-Fiction', horror: 'Horror', favorites: '❤️ Favoriten', popular: 'Beliebte Filme', search_placeholder: 'Film suchen...', translating: 'Inhaltsangabe wird übersetzt...', no_synopsis: 'Keine Inhaltsangabe verfügbar.' },
    pt: { categories: 'Categorias:', all: 'Todos', action: 'Ação e aventura', comedy: 'Comédia', drama: 'Drama', scifi: 'Ficção científica', horror: 'Terror', favorites: '❤️ Favoritos', popular: 'Filmes populares', search_placeholder: 'Pesquisar filme...', translating: 'Traduzindo sinopse...', no_synopsis: 'Sinopse indisponível.' }
};

const movieCatalog = new DataCatalogManager<Movie>();
let favoriteIds = new Set<number>();
let selectedGenre: Genre = 'todos';
let currentLanguage: Language = 'es';
let activeMovie: Movie | null = null;
const synopsisTranslations = new Map<string, Promise<string>>();
const container = required<HTMLElement>('contenedor-peliculas');
const search = required<HTMLInputElement>('input-busqueda');
const modal = required<HTMLElement>('modal-pelicula');
const status = required<HTMLElement>('services-status');
const filters = required<HTMLElement>('filtro-generos');

document.addEventListener('DOMContentLoaded', () => { configureEvents(); void initialize(); });

async function initialize(): Promise<void> {
    favoriteIds = loadFavoriteIds();
    status.textContent = 'Cargando catálogo...';
    try {
        const result = await cargarDatosOrquestados();
        movieCatalog.replaceAll(result.movies);
        const movies = movieCatalog.getAll();
        status.textContent = result.failedGenres.length
            ? `Catálogo cargado (${movies.length}). Sin datos disponibles: ${result.failedGenres.join(', ')}.`
            : `Catálogo cargado correctamente: ${movies.length} películas.`;
        status.className = result.failedGenres.length ? 'status-warning' : 'status-ok';
    } catch (error) {
        console.error('No se pudo cargar la API:', error);
        status.textContent = 'No fue posible conectar con la API. Intenta recargar la página.';
        status.className = 'status-error';
    }
    renderCurrentView();
}

function renderCurrentView(): void {
    const movies = movieCatalog.getAll();
    const query = search.value.toLocaleLowerCase().trim();
    const list = movies.filter((movie) => {
        const matchesGenre = selectedGenre === 'todos'
            || (selectedGenre === 'favoritos' ? favoriteIds.has(movie.id) : movie.genreIds.includes(Number(selectedGenre)));
        return matchesGenre && movie.title.toLocaleLowerCase().includes(query);
    });
    render(list);
}

function render(list: Movie[]): void {
    container.replaceChildren();
    if (!list.length) {
        const message = document.createElement('p');
        message.className = 'empty-message';
        message.textContent = movieCatalog.size ? 'No hay películas que coincidan con este filtro.' : 'No hay películas disponibles.';
        container.append(message);
        return;
    }
    const fragment = document.createDocumentFragment();
    list.forEach((movie) => fragment.append(createMovieCard(movie)));
    container.append(fragment);
}

function createMovieCard(movie: Movie): HTMLElement {
    const card = document.createElement('article');
    card.className = 'pelicula-card';
    card.tabIndex = 0;
    const poster = document.createElement('div');
    poster.className = 'poster-box generated-poster';
    poster.style.setProperty('--poster-hue', String((movie.id * 47) % 360));
    const initials = document.createElement('span');
    initials.className = 'poster-title';
    initials.textContent = movie.title;
    poster.append(initials);
    appendPosterImage(poster, movie);
    const like = document.createElement('button');
    like.className = `btn-like${favoriteIds.has(movie.id) ? ' active' : ''}`;
    like.type = 'button';
    like.setAttribute('aria-label', favoriteIds.has(movie.id) ? 'Quitar de favoritos' : 'Agregar a favoritos');
    like.textContent = '♥';
    like.addEventListener('click', (event) => { event.stopPropagation(); toggleFavorite(movie.id); });
    poster.append(like);
    const info = document.createElement('div');
    info.className = 'card-info';
    info.innerHTML = `<h3 class="card-title"></h3><div class="card-meta"><span>${movie.releaseYear}</span><span class="rating">${formatRating(movie.rating)}</span></div>`;
    requiredFrom<HTMLElement>(info, '.card-title').textContent = movie.title;
    card.append(poster, info);
    card.addEventListener('click', () => openModal(movie));
    card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openModal(movie); } });
    return card;
}

function configureEvents(): void {
    search.addEventListener('input', renderCurrentView);
    filters.addEventListener('click', (event) => {
        const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.pill-btn');
        if (!button?.dataset.genre) return;
        selectedGenre = button.dataset.genre as Genre;
        filters.querySelectorAll('.pill-btn').forEach((item) => item.classList.toggle('active', item === button));
        renderCurrentView();
    });
    required<HTMLSelectElement>('select-lang').addEventListener('change', (event) => applyLanguage((event.target as HTMLSelectElement).value as Language));
    required<HTMLButtonElement>('btn-cerrar-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
    document.querySelector<HTMLAnchorElement>('.logo')?.addEventListener('click', (event) => { event.preventDefault(); selectedGenre = 'todos'; search.value = ''; filters.querySelectorAll('.pill-btn').forEach((item, index) => item.classList.toggle('active', index === 0)); renderCurrentView(); });
}

function toggleFavorite(movieId: number): void {
    if (favoriteIds.has(movieId)) favoriteIds.delete(movieId); else favoriteIds.add(movieId);
    localStorage.setItem('peliculas_favoritas', JSON.stringify([...favoriteIds]));
    renderCurrentView();
}

function loadFavoriteIds(): Set<number> {
    try {
        const value: unknown = JSON.parse(localStorage.getItem('peliculas_favoritas') ?? '[]');
        if (!Array.isArray(value)) return new Set();
        return new Set(value.flatMap((item) => typeof item === 'number' ? [item] : isStoredMovie(item) ? [item.id] : []));
    } catch { return new Set(); }
}

function applyLanguage(language: Language): void {
    const dictionary = translations[language] ?? translations.es;
    currentLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => { const key = element.dataset.i18n; if (key && dictionary[key]) element.textContent = dictionary[key]; });
    document.querySelectorAll<HTMLInputElement>('[data-i18n-placeholder]').forEach((element) => { const key = element.dataset.i18nPlaceholder; if (key && dictionary[key]) element.placeholder = dictionary[key]; });
    if (activeMovie && modal.classList.contains('active')) void updateSynopsis(activeMovie);
}

function openModal(movie: Movie): void {
    activeMovie = movie;
    const poster = required<HTMLElement>('modal-poster-title');
    poster.replaceChildren();
    const fallbackTitle = document.createElement('span');
    fallbackTitle.className = 'poster-title';
    fallbackTitle.textContent = movie.title;
    poster.append(fallbackTitle);
    appendPosterImage(poster, movie);
    poster.style.setProperty('--poster-hue', String((movie.id * 47) % 360));
    required<HTMLElement>('modal-titulo').textContent = movie.title;
    required<HTMLElement>('modal-fecha').textContent = movie.releaseYear;
    required<HTMLElement>('modal-rating').textContent = formatRating(movie.rating);
    void updateSynopsis(movie);
    modal.classList.add('active');
    required<HTMLButtonElement>('btn-cerrar-modal').focus();
}

function closeModal(): void { modal.classList.remove('active'); activeMovie = null; }
async function updateSynopsis(movie: Movie): Promise<void> {
    const synopsis = required<HTMLElement>('modal-sinopsis');
    const language = currentLanguage;
    if (movie.synopsis === 'Sinopsis no disponible.') {
        synopsis.textContent = translations[language].no_synopsis ?? 'Sinopsis no disponible.';
        return;
    }
    if (language === 'en') {
        synopsis.textContent = movie.synopsis;
        return;
    }

    synopsis.textContent = translations[language].translating ?? 'Traduciendo sinopsis...';
    const cacheKey = `${movie.id}:${language}`;
    let translation = synopsisTranslations.get(cacheKey);
    if (!translation) {
        translation = translateText(movie.synopsis, language).catch(() => movie.synopsis);
        synopsisTranslations.set(cacheKey, translation);
    }
    const translatedText = await translation;
    if (activeMovie?.id === movie.id && currentLanguage === language) synopsis.textContent = translatedText;
}

async function translateText(text: string, targetLanguage: Language): Promise<string> {
    const chunks = splitForTranslation(text);
    const translated: string[] = [];
    for (const chunk of chunks) {
        const parameters = new URLSearchParams({ q: chunk, langpair: `en|${targetLanguage}` });
        const response = await fetch(`https://api.mymemory.translated.net/get?${parameters}`);
        if (!response.ok) throw new Error(`Error de traducción HTTP ${response.status}`);
        const payload = await response.json() as { responseData?: { translatedText?: string } };
        const value = payload.responseData?.translatedText?.trim();
        if (!value) throw new Error('La API no devolvió una traducción.');
        translated.push(decodeHtml(value));
    }
    return translated.join(' ');
}

function splitForTranslation(text: string): string[] {
    const chunks: string[] = [];
    let current = '';
    for (const word of text.split(/\s+/)) {
        const candidate = current ? `${current} ${word}` : word;
        if (new TextEncoder().encode(candidate).length <= 450) current = candidate;
        else { if (current) chunks.push(current); current = word; }
    }
    if (current) chunks.push(current);
    return chunks;
}

function decodeHtml(value: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
}
function formatRating(rating: number): string { return rating > 0 && Number.isFinite(rating) ? `★ ${rating.toFixed(1)}` : 'Sin puntuación'; }
function appendPosterImage(container: HTMLElement, movie: Movie): void {
    if (!movie.posterUrl) return;
    const image = document.createElement('img');
    image.src = movie.posterUrl.replace(/^http:\/\//i, 'https://');
    image.alt = `Portada de ${movie.title}`;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.referrerPolicy = 'no-referrer';
    image.addEventListener('error', () => image.remove(), { once: true });
    container.append(image);
}
function isStoredMovie(value: unknown): value is { id: number } { return typeof value === 'object' && value !== null && typeof (value as { id?: unknown }).id === 'number'; }
function required<T extends HTMLElement>(id: string): T { const element = document.getElementById(id); if (!element) throw new Error(`Falta #${id}`); return element as T; }
function requiredFrom<T extends Element>(parent: ParentNode, selector: string): T { const element = parent.querySelector<T>(selector); if (!element) throw new Error(`Falta ${selector}`); return element; }
