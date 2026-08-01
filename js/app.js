import { translations, mockMovies, cargarDatosOrquestados, DEFAULT_POSTER } from './api.js';
import { crearStorePeliculas } from './cache.js';

let currentLang = 'es';
let favoritos = JSON.parse(localStorage.getItem('peliculas_favoritas')) || [];
let searchTimeout = null;
let movieStore = null;
let reseñasGlobales = null;
let catalogoCompleto = [];

// Elementos del DOM
const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const inputBusqueda = document.getElementById('input-busqueda');
const contenedorGeneros = document.getElementById('filtro-generos');
const tituloSeccion = document.getElementById('titulo-seccion');
const selectLang = document.getElementById('select-lang');

// Elementos del Modal
const modal = document.getElementById('modal-pelicula');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const modalImg = document.getElementById('modal-img');
const modalTitulo = document.getElementById('modal-titulo');
const modalFecha = document.getElementById('modal-fecha');
const modalRating = document.getElementById('modal-rating');
const modalSinopsis = document.getElementById('modal-sinopsis');

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarPlataforma();
    configurarEventos();
});

async function inicializarPlataforma() {
    // REQUISITO 1: Orquestación con Promise.allSettled
    const { catalog, reviews } = await cargarDatosOrquestados();
    
    catalogoCompleto = catalog;
    reseñasGlobales = reviews;
    
    // REQUISITO 2: Inicializar la clausura del caché
    movieStore = crearStorePeliculas(catalogoCompleto);

    mostrarPeliculas(catalogoCompleto);
}

// ==========================================
// RENDERIZADO DE PELÍCULAS CON PÓSTERS Y LIKES
// ==========================================
function mostrarPeliculas(peliculas) {
    contenedorPeliculas.innerHTML = '';

    if (!peliculas || peliculas.length === 0) {
        const activeGenre = document.querySelector('.pill-btn.active')?.dataset.genre;
        const msg = activeGenre === 'favoritos' 
            ? translations[currentLang].no_favorites 
            : translations[currentLang].no_results;

        contenedorPeliculas.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem; font-size: 1.1rem;">${msg}</p>`;
        return;
    }

    peliculas.forEach((pelicula) => {
        const { id, vote_average, release_date } = pelicula;

        // Selección de textos según idioma activo
        const langData = pelicula[currentLang] || pelicula['es'] || {};
        const title = langData.title || pelicula.title;
        const overview = langData.overview || pelicula.overview || '';
        const poster = pelicula.poster_path || DEFAULT_POSTER;
        const anio = release_date ? release_date.split('-')[0] : 'N/A';
        const esFavorito = favoritos.some(fav => fav.id === id);

        // Badge de Reseñas resiliente
        const resenaBadge = reseñasGlobales ? (reseñasGlobales[id] || '⭐') : '⚠️ Sin servicio de reseñas';

        const peliculaEl = document.createElement('article');
        peliculaEl.classList.add('pelicula-card');

        peliculaEl.innerHTML = `
            <div class="poster-box">
                <img src="${poster}" alt="${title}" loading="lazy" onerror="this.src='${DEFAULT_POSTER}'">
                <button class="btn-like ${esFavorito ? 'active' : ''}" data-id="${id}" title="Favorito">♥</button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${title}</h3>
                <div class="card-meta">
                    <span>${anio}</span>
                    <span class="rating">★ ${vote_average ? Number(vote_average).toFixed(1) : 'N/A'}</span>
                </div>
                <div style="font-size: 0.75rem; margin-top: 8px; color: var(--accent-gold);">
                    Reseñas: ${resenaBadge}
                </div>
            </div>
        `;

        // Abrir Modal al hacer clic en la tarjeta
        peliculaEl.addEventListener('click', () => {
            abrirModal({ title, overview, release_date, vote_average }, poster);
        });

        // FUNCIONALIDAD DEL BOTÓN LIKE (FAVORITOS)
        const btnLike = peliculaEl.querySelector('.btn-like');
        btnLike.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita abrir el modal al dar Like
            toggleLike(pelicula, btnLike);
        });

        contenedorPeliculas.appendChild(peliculaEl);
    });
}

// ==========================================
// CONFIGURACIÓN DE EVENTOS
// ==========================================
function configurarEventos() {
    // Selector de Idioma funcional
    if (selectLang) {
        selectLang.addEventListener('change', (e) => {
            cambiarIdioma(e.target.value);
        });
    }

    // Eventos del Modal
    btnCerrarModal.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    // Búsqueda en tiempo real con Debounce
    inputBusqueda.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            if (query.length > 0) {
                document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
                tituloSeccion.textContent = `${translations[currentLang].results_for} "${query}"`;
                
                const filtradas = catalogoCompleto.filter(m => {
                    const t = (m[currentLang] ? m[currentLang].title : m.es.title).toLowerCase();
                    return t.includes(query);
                });
                mostrarPeliculas(filtradas);
            } else {
                const firstPill = document.querySelector('.pill-btn[data-genre="todos"]');
                if (firstPill) firstPill.click();
            }
        }, 250);
    });

    // Filtros por Categoría usando el Caché por Clausura
    contenedorGeneros.addEventListener('click', async (e) => {
        if (!e.target.classList.contains('pill-btn')) return;

        document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        inputBusqueda.value = '';
        const generoId = e.target.dataset.genre;

        if (generoId === 'todos') {
            tituloSeccion.textContent = translations[currentLang].popular;
            mostrarPeliculas(catalogoCompleto);
        } else if (generoId === 'favoritos') {
            tituloSeccion.textContent = translations[currentLang].favorites;
            mostrarPeliculas(favoritos);
        } else {
            tituloSeccion.textContent = `${translations[currentLang].category} ${e.target.textContent}`;
            // Llamada al método encapsulado dentro de la clausura
            const peliculasFiltradas = await movieStore.filtrarPorGenero(generoId);
            mostrarPeliculas(peliculasFiltradas);
        }
    });
}

// ==========================================
// SISTEMA DE TRADUCCIÓN Y FAVORITOS
// ==========================================
function cambiarIdioma(nuevoIdioma) {
    currentLang = nuevoIdioma;

    // Actualización de textos con atributos data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });

    const activePill = document.querySelector('.pill-btn.active');
    const generoId = activePill ? activePill.dataset.genre : 'todos';

    if (generoId === 'favoritos') {
        mostrarPeliculas(favoritos);
    } else if (generoId === 'todos') {
        mostrarPeliculas(catalogoCompleto);
    } else {
        movieStore.filtrarPorGenero(generoId).then(mostrarPeliculas);
    }
}

function toggleLike(pelicula, boton) {
    const existeIndice = favoritos.findIndex(fav => fav.id === pelicula.id);

    if (existeIndice !== -1) {
        favoritos.splice(existeIndice, 1);
        boton.classList.remove('active');
        
        // Si estamos viendo la sección de Favoritos, refrescar la lista
        if (document.querySelector('.pill-btn.active')?.dataset.genre === 'favoritos') {
            mostrarPeliculas(favoritos);
        }
    } else {
        favoritos.push(pelicula);
        boton.classList.add('active');
    }

    localStorage.setItem('peliculas_favoritas', JSON.stringify(favoritos));
}

function abrirModal(pelicula, poster) {
    modalImg.src = poster;
    modalTitulo.textContent = pelicula.title;
    modalFecha.textContent = pelicula.release_date ? pelicula.release_date.split('-')[0] : 'N/A';
    modalRating.textContent = `★ ${pelicula.vote_average ? Number(pelicula.vote_average).toFixed(1) : 'N/A'}`;
    modalSinopsis.textContent = pelicula.overview || 'Sinopsis no disponible.';
    modal.classList.add('active');
}

function cerrarModal() {
    modal.classList.remove('active');
}