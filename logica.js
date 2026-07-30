// ==========================================
// CONFIGURACIÓN DE LA API Y ESTADO INICIAL
// ==========================================
const API_KEY = 'TU_API_KEY_AQUI'; 
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';

let currentLang = 'es';
let favoritos = JSON.parse(localStorage.getItem('peliculas_favoritas')) || [];
let searchTimeout = null;

// Mapa de códigos de idioma para TMDB
const apiLangMap = {
    es: 'es-ES',
    en: 'en-US',
    fr: 'fr-FR',
    de: 'de-DE',
    pt: 'pt-PT'
};

// Diccionario de Traducciones para la Interfaz (5 Idiomas)
const translations = {
    es: {
        search_placeholder: "Buscar película...",
        categories: "Categorías:",
        all: "Todos",
        action: "Acción",
        adventure: "Aventura",
        comedy: "Comedia",
        drama: "Drama",
        scifi: "Ciencia Ficción",
        horror: "Terror",
        favorites: "❤️ Favoritos",
        popular: "Películas Populares",
        results_for: "Resultados para:",
        category: "Categoría:",
        play: "▶ Reproducir",
        no_results: "No se encontraron películas.",
        no_favorites: "No tienes películas guardadas en favoritos."
    },
    en: {
        search_placeholder: "Search movie...",
        categories: "Categories:",
        all: "All",
        action: "Action",
        adventure: "Adventure",
        comedy: "Comedy",
        drama: "Drama",
        scifi: "Sci-Fi",
        horror: "Horror",
        favorites: "❤️ Favorites",
        popular: "Popular Movies",
        results_for: "Results for:",
        category: "Category:",
        play: "▶ Play Now",
        no_results: "No movies found.",
        no_favorites: "No movies saved in favorites."
    },
    fr: {
        search_placeholder: "Rechercher un film...",
        categories: "Catégories:",
        all: "Tous",
        action: "Action",
        adventure: "Aventure",
        comedy: "Comédie",
        drama: "Drame",
        scifi: "Science-Fiction",
        horror: "Horreur",
        favorites: "❤️ Favoris",
        popular: "Films Populaires",
        results_for: "Résultats pour:",
        category: "Catégorie:",
        play: "▶ Regarder",
        no_results: "Aucun film trouvé.",
        no_favorites: "Vous n'avez pas de films enregistrés."
    },
    de: {
        search_placeholder: "Film suchen...",
        categories: "Kategorien:",
        all: "Alle",
        action: "Action",
        adventure: "Abenteuer",
        comedy: "Komödie",
        drama: "Drama",
        scifi: "Sci-Fi",
        horror: "Horror",
        favorites: "❤️ Favoriten",
        popular: "Beliebte Filme",
        results_for: "Ergebnisse für:",
        category: "Kategorie:",
        play: "▶ Abspielen",
        no_results: "Keine Filme gefunden.",
        no_favorites: "Keine Favoriten gespeichert."
    },
    pt: {
        search_placeholder: "Pesquisar filme...",
        categories: "Categorias:",
        all: "Todos",
        action: "Ação",
        adventure: "Aventura",
        comedy: "Comédia",
        drama: "Drama",
        scifi: "Ficção Científica",
        horror: "Terror",
        favorites: "❤️ Favoritos",
        popular: "Filmes Populares",
        results_for: "Resultados para:",
        category: "Categoria:",
        play: "▶ Reproduzir",
        no_results: "Nenhum filme encontrado.",
        no_favorites: "Nenhum filme salvo nos favoritos."
    }
};

// Datos locales ampliados de respaldo (Unsplash URLs funcionales)
const mockMovies = [
    { 
        id: 101, 
        genre_ids: [878, 28], 
        vote_average: 8.8, 
        release_date: "2010-07-16", 
        poster_path: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
        es: { title: "Inception", overview: "Un ladrón que roba secretos corporativos a través de los sueños recibe la tarea de plantar una idea en la mente de un CEO." },
        en: { title: "Inception", overview: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea." },
        fr: { title: "Inception", overview: "Un voleur qui s'approprie des secrets d'entreprises grâce au partage de rêves se voit confier une mission inverse." },
        de: { title: "Inception", overview: "Ein Dieb, der Unternehmensgeheimnisse durch Traum-Sharing stiehlt, erhält den Auftrag, eine Idee einzupflanzen." },
        pt: { title: "A Origem", overview: "Um ladrão que rouba segredos corporativos através de sonhos recebe a missão de plantar uma ideia." }
    },
    { 
        id: 102, 
        genre_ids: [28, 18], 
        vote_average: 9.0, 
        release_date: "2008-07-18", 
        poster_path: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&q=80",
        es: { title: "El Caballero de la Noche", overview: "Cuando Joker causa estragos en Gotham, Batman debe aceptar una de las mayores pruebas para combatir la injusticia." },
        en: { title: "The Dark Knight", overview: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest tests." },
        fr: { title: "The Dark Knight", overview: "Batman entreprend de démanteler les dernières organisations criminelles que Joker tente de plonger dans l'anarchie." },
        de: { title: "The Dark Knight", overview: "Als der Joker Gotham in Chaos stürzt, muss Batman einen seiner größten Tests bestehen." },
        pt: { title: "Batman: O Cavaleiro das Trevas", overview: "Quando o Coringa causa caos em Gotham, Batman deve enfrentar um de seus maiores testes." }
    },
    { 
        id: 103, 
        genre_ids: [878, 12], 
        vote_average: 8.6, 
        release_date: "2014-11-07", 
        poster_path: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
        es: { title: "Interestelar", overview: "Un equipo de exploradores viaja a través de un agujero de gusano para garantizar la supervivencia de la humanidad." },
        en: { title: "Interstellar", overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival." },
        fr: { title: "Interstellar", overview: "Une équipe d'explorateurs franchit un trou de ver pour assurer la survie de l'humanité." },
        de: { title: "Interstellar", overview: "Ein Team von Forschern reist durch ein Wurmloch, um das Überleben der Menschheit zu sichern." },
        pt: { title: "Interestelar", overview: "Uma equipe de exploradores viaja através de um buraco de minhoca para garantir a sobrevivência da humanidade." }
    },
    { 
        id: 104, 
        genre_ids: [27], 
        vote_average: 7.5, 
        release_date: "2013-07-19", 
        poster_path: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&q=80",
        es: { title: "El Conjuro", overview: "Investigadores paranormales ayudan a una familia aterrorizada por una presencia oscura en su granja." },
        en: { title: "The Conjuring", overview: "Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse." },
        fr: { title: "Conjuring", overview: "Des enquêteurs paranormaux aident une famille terrorisée par une présence sombre dans leur ferme." },
        de: { title: "Conjuring", overview: "Paranormale Ermittler helfen einer Familie, die von einer dunklen Präsenz terrorisiert wird." },
        pt: { title: "Invocação do Mal", overview: "Investigadores paranormais ajudam uma família aterrorizada por uma presença sombria." }
    },
    { 
        id: 105, 
        genre_ids: [35], 
        vote_average: 7.6, 
        release_date: "2007-08-17", 
        poster_path: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&q=80",
        es: { title: "Superbad", overview: "Dos estudiantes de secundaria enfrentan la separación inminente antes de ir a la universidad mientras intentan ir a una fiesta." },
        en: { title: "Superbad", overview: "Two co-dependent high school seniors deal with separation anxiety after their plan to stage a party goes wrong." },
        fr: { title: "SuperGrave", overview: "Deux amis de lycée dépendants l'un de l'autre doivent faire face à leur séparation future." },
        de: { title: "Superbad", overview: "Zwei Highschool-Schüler müssen sich vor dem College mit ihren Trennungsängsten auseinandersetzen." },
        pt: { title: "Superbad: É Hoje", overview: "Dois amigos do ensino médio lidam com a ansiedade da separação enquanto tentam ir a uma festa." }
    }
];

// ==========================================
// REFERENCIAS AL DOM
// ==========================================
const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const inputBusqueda = document.getElementById('input-busqueda');
const contenedorGeneros = document.getElementById('filtro-generos');
const tituloSeccion = document.getElementById('titulo-seccion');
const selectLang = document.getElementById('select-lang');

// Modal Elements
const modal = document.getElementById('modal-pelicula');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const modalImg = document.getElementById('modal-img');
const modalTitulo = document.getElementById('modal-titulo');
const modalFecha = document.getElementById('modal-fecha');
const modalRating = document.getElementById('modal-rating');
const modalSinopsis = document.getElementById('modal-sinopsis');

// ==========================================
// INICIALIZACIÓN Y EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    cargarContenido();
    configurarEventos();
});

function configurarEventos() {
    // Selector de Idioma
    if (selectLang) {
        selectLang.addEventListener('change', (e) => {
            cambiarIdioma(e.target.value);
        });
    }

    // Modal Events
    btnCerrarModal.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    // Búsqueda en tiempo real (Live Search con Debounce)
    inputBusqueda.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        clearTimeout(searchTimeout);

        searchTimeout = setTimeout(() => {
            if (query.length > 0) {
                document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
                tituloSeccion.textContent = `${translations[currentLang].results_for} "${query}"`;
                cargarContenido('todos', query);
            } else {
                const firstPill = document.querySelector('.pill-btn[data-genre="todos"]');
                if (firstPill) firstPill.click();
            }
        }, 300);
    });

    // Filtros por Categoría
    contenedorGeneros.addEventListener('click', (e) => {
        if (!e.target.classList.contains('pill-btn')) return;

        document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        inputBusqueda.value = '';
        const generoId = e.target.dataset.genre;

        if (generoId === 'todos') {
            tituloSeccion.textContent = translations[currentLang].popular;
            cargarContenido('todos');
        } else if (generoId === 'favoritos') {
            tituloSeccion.textContent = translations[currentLang].favorites;
            mostrarPeliculas(favoritos);
        } else {
            tituloSeccion.textContent = `${translations[currentLang].category} ${e.target.textContent}`;
            cargarContenido(generoId);
        }
    });
}

// ==========================================
// SISTEMA DE IDIOMA
// ==========================================
function cambiarIdioma(nuevoIdioma) {
    currentLang = nuevoIdioma;

    // Actualización de textos en el DOM
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

    // Recargar la vista según la sección activa
    const activePill = document.querySelector('.pill-btn.active');
    const generoId = activePill ? activePill.dataset.genre : 'todos';

    if (generoId === 'favoritos') {
        mostrarPeliculas(favoritos);
    } else {
        cargarContenido(generoId);
    }
}

// ==========================================
// OBTENCIÓN Y FILTRADO DE DATOS
// ==========================================
async function cargarContenido(genreId = 'todos', query = '') {
    const langCode = apiLangMap[currentLang] || 'es-ES';

    if (API_KEY !== 'TU_API_KEY_AQUI') {
        let url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=${langCode}`;
        if (query) {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${langCode}&query=${encodeURIComponent(query)}`;
        } else if (genreId !== 'todos') {
            url += `&with_genres=${genreId}`;
        }

        try {
            const res = await fetch(url);
            const data = await res.json();
            mostrarPeliculas(data.results);
        } catch (e) {
            console.error("Error al conectar con la API, cargando fallback:", e);
            filtrarMockData(genreId, query);
        }
    } else {
        filtrarMockData(genreId, query);
    }
}

function filtrarMockData(genreId, query) {
    let resultado = mockMovies;

    if (query) {
        resultado = resultado.filter(m => {
            const t = (m[currentLang] ? m[currentLang].title : m.es.title).toLowerCase();
            return t.includes(query.toLowerCase());
        });
    } else if (genreId && genreId !== 'todos') {
        resultado = resultado.filter(m => m.genre_ids.includes(parseInt(genreId)));
    }

    mostrarPeliculas(resultado);
}

function obtenerPosterURL(pelicula) {
    if (pelicula.poster_full_url) return pelicula.poster_full_url;
    if (pelicula.poster_path) {
        if (pelicula.poster_path.startsWith('http')) return pelicula.poster_path;
        return `${IMG_PATH}${pelicula.poster_path}`;
    }
    return 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80';
}

// ==========================================
// RENDERIZADO Y TARJETAS
// ==========================================
function mostrarPeliculas(peliculas) {
    contenedorPeliculas.innerHTML = '';

    if (!peliculas || peliculas.length === 0) {
        const msg = document.querySelector('.pill-btn.active')?.dataset.genre === 'favoritos' 
            ? translations[currentLang].no_favorites 
            : translations[currentLang].no_results;

        contenedorPeliculas.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">${msg}</p>`;
        return;
    }

    peliculas.forEach((pelicula) => {
        const { id, vote_average, release_date } = pelicula;

        // Selección de texto de acuerdo al idioma activo
        const langData = pelicula[currentLang] || pelicula['es'] || {};
        const title = langData.title || pelicula.title || pelicula.original_title;
        const overview = langData.overview || pelicula.overview || '';
        const poster = obtenerPosterURL(pelicula);
        const anio = release_date ? release_date.split('-')[0] : 'N/A';
        const esFavorito = favoritos.some(fav => fav.id === id);

        const peliculaEl = document.createElement('article');
        peliculaEl.classList.add('pelicula-card');

        peliculaEl.innerHTML = `
            <div class="poster-box">
                <img src="${poster}" alt="${title}" loading="lazy">
                <button class="btn-like ${esFavorito ? 'active' : ''}" data-id="${id}" title="Favorito">
                    ♥
                </button>
            </div>
            <div class="card-info">
                <h3 class="card-title">${title}</h3>
                <div class="card-meta">
                    <span>${anio}</span>
                    <span class="rating">★ ${vote_average ? Number(vote_average).toFixed(1) : 'N/A'}</span>
                </div>
            </div>
        `;

        // Abrir Modal
        peliculaEl.addEventListener('click', () => {
            abrirModal({ title, overview, release_date, vote_average }, poster);
        });

        // Botón Me Gusta
        const btnLike = peliculaEl.querySelector('.btn-like');
        btnLike.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLike({ 
                id, 
                vote_average, 
                release_date, 
                poster_full_url: poster, 
                [currentLang]: { title, overview } 
            }, btnLike);
        });

        contenedorPeliculas.appendChild(peliculaEl);
    });
}

// ==========================================
// MODAL & FAVORITOS
// ==========================================
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

function toggleLike(pelicula, boton) {
    const existeIndice = favoritos.findIndex(fav => fav.id === pelicula.id);

    if (existeIndice !== -1) {
        favoritos.splice(existeIndice, 1);
        boton.classList.remove('active');
        
        if (document.querySelector('.pill-btn.active')?.dataset.genre === 'favoritos') {
            mostrarPeliculas(favoritos);
        }
    } else {
        favoritos.push(pelicula);
        boton.classList.add('active');
    }

    localStorage.setItem('peliculas_favoritas', JSON.stringify(favoritos));
}