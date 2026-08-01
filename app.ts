import { cargarDatosOrquestados } from './service/movie.service.js';
import type { Movie } from './entities/movie.entity.js';

let movies: Movie[] = [];
let favorites: Movie[] = [];
const container = required<HTMLElement>('contenedor-peliculas');
const search = required<HTMLInputElement>('input-busqueda');
const modal = required<HTMLElement>('modal-pelicula');

document.addEventListener('DOMContentLoaded', () => { void initialize(); configureEvents(); });

async function initialize(): Promise<void> {
    try { movies = await cargarDatosOrquestados(); } catch (error) { console.error('No se pudo cargar la API:', error); movies = []; }
    favorites = loadFavorites();
    render(movies);
}

function render(list: Movie[]): void {
    container.replaceChildren();
    if (!list.length) { container.innerHTML = '<p>No se encontraron películas. Verifica la conexión con la API.</p>'; return; }
    list.forEach((movie) => {
        const card = document.createElement('article'); card.className = 'pelicula-card';
        card.innerHTML = `<div class="poster-box"><img src="${movie.posterUrl}" alt="${movie.title}"><button class="btn-like" type="button">♥</button></div><div class="card-info"><h3 class="card-title">${movie.title}</h3><div class="card-meta"><span>${movie.releaseYear}</span><span class="rating">★ ${movie.rating.toFixed(1)}</span></div><div>Reseñas: ${movie.reviewCount}</div></div>`;
        card.addEventListener('click', () => openModal(movie));
        card.querySelector<HTMLButtonElement>('.btn-like')?.addEventListener('click', (event) => { event.stopPropagation(); toggleFavorite(movie); render(currentList()); });
        container.append(card);
    });
}

function configureEvents(): void {
    search.addEventListener('input', () => { const query = search.value.toLowerCase().trim(); render(movies.filter((movie) => movie.title.toLowerCase().includes(query))); });
    required<HTMLElement>('filtro-generos').addEventListener('click', (event) => { const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.pill-btn'); if (!button) return; const genre = button.dataset.genre; render(genre === 'favoritos' ? favorites : genre === 'todos' ? movies : movies.filter((movie) => movie.genreIds.includes(Number(genre)))); });
    required<HTMLButtonElement>('btn-cerrar-modal').addEventListener('click', closeModal);
}

function currentList(): Movie[] { return favorites; }
function toggleFavorite(movie: Movie): void { const index = favorites.findIndex((item) => item.id === movie.id); if (index >= 0) favorites.splice(index, 1); else favorites.push(movie); localStorage.setItem('peliculas_favoritas', JSON.stringify(favorites)); }
function loadFavorites(): Movie[] { try { return JSON.parse(localStorage.getItem('peliculas_favoritas') ?? '[]') as Movie[]; } catch { return []; } }
function openModal(movie: Movie): void { required<HTMLImageElement>('modal-img').src = movie.posterUrl; required<HTMLElement>('modal-titulo').textContent = movie.title; required<HTMLElement>('modal-fecha').textContent = movie.releaseYear; required<HTMLElement>('modal-rating').textContent = `★ ${movie.rating.toFixed(1)}`; required<HTMLElement>('modal-sinopsis').textContent = movie.synopsis; modal.classList.add('active'); }
function closeModal(): void { modal.classList.remove('active'); }
function required<T extends HTMLElement>(id: string): T { const element = document.getElementById(id); if (!element) throw new Error(`Falta #${id}`); return element as T; }
