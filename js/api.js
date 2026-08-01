// ==========================================
// TRADUCCIONES Y DICCIONARIO DE INTERFAZ
// ==========================================
export const translations = {
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

// ==========================================
// CATÁLOGO DE 15 PELÍCULAS CON PÓSTERS REALES Y ESPEJOS
// Generos TMDB: Acción=28, Aventura=12, Comedia=35, Drama=18, SciFi=878, Terror=27
// ==========================================
export const mockMovies = [
    {
        id: 101,
        genre_ids: [878, 28],
        vote_average: 8.8,
        release_date: "2010-07-16",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        es: { title: "El Origen", overview: "Un ladrón que ingresa a los sueños para robar secretos corporativos es contratado para la tarea inversa: plantar una idea en la mente de un director ejecutivo." },
        en: { title: "Inception", overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O." },
        fr: { title: "Inception", overview: "Un voleur qui s'approprie des secrets d'entreprises grâce au partage de rêves se voit confier une mission inverse." },
        de: { title: "Inception", overview: "Ein Dieb, der Unternehmensgeheimnisse durch Traum-Sharing stiehlt, erhält den Auftrag, eine Idee einzupflanzen." },
        pt: { title: "A Origem", overview: "Um ladrão que rouba segredos corporativos através de sonhos recebe a missão de plantar uma ideia." }
    },
    {
        id: 102,
        genre_ids: [28, 18],
        vote_average: 9.0,
        release_date: "2008-07-18",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
        es: { title: "El Caballero de la Noche", overview: "Cuando la amenaza conocida como el Joker emerge para sembrar el caos en Gotham, Batman debe someterse a una prueba física y psicológica." },
        en: { title: "The Dark Knight", overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests." },
        fr: { title: "The Dark Knight", overview: "Batman entreprend de démanteler les dernières organisations criminelles que Joker tente de plonger dans l'anarchie." },
        de: { title: "The Dark Knight", overview: "Als der Joker Gotham in Chaos stürzt, muss Batman einen seiner größten Tests bestehen." },
        pt: { title: "Batman: O Cavaleiro das Trevas", overview: "Quando o Coringa causa caos em Gotham, Batman deve enfrentar um de seus maiores testes." }
    },
    {
        id: 103,
        genre_ids: [878, 12, 18],
        vote_average: 8.7,
        release_date: "2014-11-07",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA0LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg",
        es: { title: "Interestelar", overview: "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por garantizar la supervivencia de la humanidad." },
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
        poster_path: "https://image.tmdb.org/t/p/original/10ir0eISr3p1MF1mjZwGTx7u4vv.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg",
        es: { title: "El Conjuro", overview: "Investigadores paranormales trabajan para ayudar a una familia aterrorizada por una presencia oscura en su granja." },
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
        poster_path: "https://upload.wikimedia.org/wikipedia/en/8/8b/Superbad_Poster.png",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BMTc0NjIyMjA2OF5BMl5BanBnXkFtZTcwMzIxNDE1MQ@@._V1_.jpg",
        es: { title: "Súper Cool", overview: "Dos estudiantes de secundaria codependientes enfrentan la ansiedad por la separación mientras intentan llevar alcohol a una fiesta." },
        en: { title: "Superbad", overview: "Two co-dependent high school seniors deal with separation anxiety after their plan to stage a party goes wrong." },
        fr: { title: "SuperGrave", overview: "Deux amis de lycée dépendants l'un de l'autre doivent faire face à leur séparation future." },
        de: { title: "Superbad", overview: "Zwei Highschool-Schüler müssen sich vor dem College mit ihren Trennungsängsten auseinandersetzen." },
        pt: { title: "Superbad: É Hoje", overview: "Dois amigos do ensino médio lidam com a ansiedade da separação enquanto tentam ir a uma festa." }
    },
    {
        id: 106,
        genre_ids: [878, 28, 12],
        vote_average: 8.5,
        release_date: "1999-03-31",
        poster_path: "https://m.media-amazon.com/images/I/81x0yx341IL._AC_UF894,1000_QL80_.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4XkEyXkFqcGc@._V1_.jpg",
        es: { title: "Matrix", overview: "Un hacker descubre por medio de misteriosos rebeldes la verdadera naturaleza de su realidad y su rol en la guerra contra sus controladores." },
        en: { title: "The Matrix", overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers." },
        fr: { title: "Matrix", overview: "Un pirate informatique découvre la vraie nature de sa réalité." },
        de: { title: "Matrix", overview: "Ein Computerhacker erfährt die wahre Natur seiner Realität." },
        pt: { title: "Matrix", overview: "Um hacker descobre a verdadeira natureza da sua realidade." }
    },
    {
        id: 107,
        genre_ids: [18, 28],
        vote_average: 8.8,
        release_date: "1999-10-15",
        poster_path: "https://image.tmdb.org/t/p/original/sgTAWJFaB2kBvdQxRGabYFiQqEK.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg",
        es: { title: "El Club de la Pelea", overview: "Un empleado de oficina insomne y un fabricante de jabón despreocupado forman un club de peleas subterráneo que evoluciona hacia algo mucho más grande." },
        en: { title: "Fight Club", overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more." },
        fr: { title: "Fight Club", overview: "Un employé de bureau insomniaque et un vendeur de savon forment un club de combat." },
        de: { title: "Fight Club", overview: "Ein schlafloser Büroangestellter und ein Seifenhersteller gründen einen Fight Club." },
        pt: { title: "Clube da Luta", overview: "Um trabalhador insoneso e um vendedor de sabão formam um clube de luta underground." }
    },
    {
        id: 108,
        genre_ids: [18],
        vote_average: 8.9,
        release_date: "1994-10-14",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00M2M4LTlhNWItZDI3MDAxNDczN2MyXkEyXkFqcGc@._V1_.jpg",
        es: { title: "Pulp Fiction", overview: "Las vidas de dos matones de la mafia, un boxeador y la esposa de un gánster se entrelazan en cuatro historias de violencia y redención." },
        en: { title: "Pulp Fiction", overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence." },
        fr: { title: "Pulp Fiction", overview: "L'histoire de deux tueurs à gages, d'un boxeur et de la femme d'un gangster." },
        de: { title: "Pulp Fiction", overview: "Die Geschichten von Gangstern, einem Boxer und einer Gangsterbraut verflechten sich." },
        pt: { title: "Pulp Fiction: Tempo de Violência", overview: "As vidas de dois assassinos de aluguel e um boxeador se cruzam em quatro histórias." }
    },
    {
        id: 109,
        genre_ids: [12, 28, 878],
        vote_average: 8.2,
        release_date: "2012-05-04",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWEyMDAtNjk3YTgzZjNcNDlhXkEyXkFqcGc@._V1_.jpg",
        es: { title: "Los Vengadores", overview: "Los héroes más poderosos de la Tierra deben unirse y aprender a luchar en equipo para evitar que el travieso Loki esclavice a la humanidad." },
        en: { title: "The Avengers", overview: "Earth's mightiest heroes must come together and learn to fight as a team to stop Loki from enslaving humanity." },
        fr: { title: "Avengers", overview: "Les héros les plus puissants de la Terre s'unissent contre Loki." },
        de: { title: "Marvel's The Avengers", overview: "Die mächtigsten Helden der Erde müssen als Team zusammenarbeiten." },
        pt: { title: "Os Vingadores", overview: "Os heróis mais poderosos da Terra se unem para deter Loki." }
    },
    {
        id: 110,
        genre_ids: [27, 878],
        vote_average: 7.9,
        release_date: "1979-05-25",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BN2E2OTcwODktZGZjNy00NWJ2LWIxMGMtZGFjM2VmY2NhOWFlXkEyXkFqcGc@._V1_.jpg",
        es: { title: "Alien: El Octavo Pasajero", overview: "La tripulación de una nave espacial comercial investiga una transmisión desconocida y descubre una forma de vida mortífera." },
        en: { title: "Alien", overview: "The crew of a commercial spacecraft encounters a deadly lifeform after investigating an unknown transmission." },
        fr: { title: "Alien, le huitième passager", overview: "L'équipage d'un vaisseau spatial affronte un organisme mortel." },
        de: { title: "Alien – Das unheimliche Wesen aus einer fremden Welt", overview: "Die Besatzung eines Frachters trifft auf eine tödliche Lebensform." },
        pt: { title: "Alien, o Oitavo Passageiro", overview: "A tripulação de uma nave espacial enfrenta uma forma de vida mortal." }
    },
    {
        id: 111,
        genre_ids: [35, 12, 878],
        vote_average: 8.5,
        release_date: "1985-07-03",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BZTAyOTM0ZmEtZDRiNy00NWY2LWE1NTgtZWExOWRkM2IzNWExXkEyXkFqcGc@._V1_.jpg",
        es: { title: "Volver al Futuro", overview: "Marty McFly, un estudiante de secundaria de 17 años, es enviado accidentalmente treinta años al pasado en un DeLorean que viaja en el tiempo." },
        en: { title: "Back to the Future", overview: "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean." },
        fr: { title: "Retour vers le futur", overview: "Marty McFly est envoyé 30 ans dans le passé à bord d'une DeLorean." },
        de: { title: "Zurück in die Zukunft", overview: "Marty McFly reist mit einer Zeitmaschine 30 Jahre in die Vergangenheit." },
        pt: { title: "De Volta para o Futuro", overview: "Marty McFly é enviado acidentalmente 30 anos para o pasado em um DeLorean." }
    },
    {
        id: 112,
        genre_ids: [18],
        vote_average: 8.7,
        release_date: "1994-07-06",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00Y2M5LTljYTYtM2VkM2E1MGMxOWVhXkEyXkFqcGc@._V1_.jpg",
        es: { title: "Forrest Gump", overview: "Las presidencias de Kennedy y Johnson, los eventos de Vietnam y Watergate se desarrollan desde la perspectiva de un hombre de Alabama." },
        en: { title: "Forrest Gump", overview: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold through the perspective of an Alabama man." },
        fr: { title: "Forrest Gump", overview: "Quelques décennies d'histoire américaine à travers les yeux d'un homme simple." },
        de: { title: "Forrest Gump", overview: "Ein Mann mit gutem Herzen erlebt entscheidende Momente der US-Geschichte." },
        pt: { title: "Forrest Gump: O Contador de Histórias", overview: "A história dos EUA vista através dos olhos de um homem simples de Alabama." }
    },
    {
        id: 113,
        genre_ids: [28, 12, 18],
        vote_average: 8.5,
        release_date: "2000-05-01",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BYWQ4YmNjYjctOWE1Zi00Y2U4LWI4NTAtMTU0MjkxNWQ1ZmJiXkEyXkFqcGc@._V1_.jpg",
        es: { title: "Gladiador", overview: "Un ex general romano busca venganza contra el corrupto emperador que asesinó a su familia y lo condenó a la esclavitud." },
        en: { title: "Gladiator", overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery." },
        fr: { title: "Gladiator", overview: "Un général romain déchu cherche à se venger de l'empereur corrompu." },
        de: { title: "Gladiator", overview: "Ein ehemaliger römischer General sinnt auf Rache gegen den Kaiser." },
        pt: { title: "Gladiador", overview: "Um ex-general romano busca vingança contra o imperador corrupto." }
    },
    {
        id: 114,
        genre_ids: [27, 18],
        vote_average: 8.6,
        release_date: "1991-02-14",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGc@._V1_.jpg",
        es: { title: "El Silencio de los Inocentes", overview: "Una joven cadete del FBI debe confiar en un asesino en serie encarcelado para recibir su ayuda en la captura de otro asesino." },
        en: { title: "The Silence of the Lambs", overview: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to catch another serial killer." },
        fr: { title: "Le Silence des agneaux", overview: "Une jeune agente du FBI sollicite l'aide d'un tueur en série incarcéré." },
        de: { title: "Das Schweigen der Lämmer", overview: "Eine junge FBI-Agentin benötigt die Hilfe eines inhaftierten Kannibalen." },
        pt: { title: "O Silêncio dos Inocentes", overview: "Uma jovem cadete do FBI pede ajuda a um assassino canibal encarcerado." }
    },
    {
        id: 115,
        genre_ids: [35, 18],
        vote_average: 8.1,
        release_date: "1998-06-05",
        poster_path: "https://upload.wikimedia.org/wikipedia/en/c/cd/Trumanshow.jpg",
        poster_path_alt: "https://m.media-amazon.com/images/M/MV5BMDIzODcyM2QtGo1ZDAtMzI3LWIyM2MtN2E4YmI2M2UzZDgwXkEyXkFqcGc@._V1_.jpg",
        es: { title: "El Show de Truman", overview: "Un vendedor de seguros descubre que toda su vida es en realidad un reality show de televisión transmitido en vivo las 24 horas." },
        en: { title: "The Truman Show", overview: "An insurance salesman discovers his whole life is actually a reality TV show, broadcast live 24/7 to the entire world." },
        fr: { title: "The Truman Show", overview: "Un homme découvre que sa vie est une émission de télé-réalité." },
        de: { title: "Die Truman Show", overview: "Ein Mann findet heraus, dass sein gesamtes Leben eine Fernsehshow ist." },
        pt: { title: "O Show de Truman", overview: "Um homem descobre que toda a sua vida é um reality show de televisão." }
    }
];

// Fallback visual para las imágenes
export const DEFAULT_POSTER = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80";

// ==========================================
// SERVICIOS FICTICIOS DE BACKEND PARA PROMISE.ALLSETTLED
// ==========================================
const fetchCatalogService = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockMovies), 300);
    });
};

const fetchReviewsService = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.6
                ? resolve({
                    101: '⭐⭐⭐⭐⭐', 102: '⭐⭐⭐⭐⭐', 103: '⭐⭐⭐⭐⭐', 104: '⭐⭐⭐⭐', 105: '⭐⭐⭐⭐',
                    106: '⭐⭐⭐⭐⭐', 107: '⭐⭐⭐⭐⭐', 108: '⭐⭐⭐⭐⭐', 109: '⭐⭐⭐⭐', 110: '⭐⭐⭐⭐',
                    111: '⭐⭐⭐⭐⭐', 112: '⭐⭐⭐⭐⭐', 113: '⭐⭐⭐⭐⭐', 114: '⭐⭐⭐⭐⭐', 115: '⭐⭐⭐⭐'
                })
                : reject(new Error('Servicio de Reseñas fuera de línea (HTTP 503)'));
        }, 500);
    });
};

const fetchAdsService = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.6
                ? resolve({ title: '🍿 Combo Familiar 2x1 en Taquilla' })
                : reject(new Error('Servicio de Anuncios fuera de línea (Timeout)'));
        }, 400);
    });
};

/**
 * REQUISITO 1: Orquestación Concurrente Resiliente con Promise.allSettled
 */
export async function cargarDatosOrquestados() {
    const resultados = await Promise.allSettled([
        fetchCatalogService(),
        fetchReviewsService(),
        fetchAdsService()
    ]);

    const [catalogRes, reviewsRes, adsRes] = resultados;

    return {
        catalog: catalogRes.status === 'fulfilled' ? catalogRes.value : [],
        reviews: reviewsRes.status === 'fulfilled' ? reviewsRes.value : null,
        ads: adsRes.status === 'fulfilled' ? adsRes.value : null,
        statusReport: {
            reviewsStatus: reviewsRes.status,
            adsStatus: adsRes.status,
            reviewsError: reviewsRes.status === 'rejected' ? reviewsRes.reason.message : null,
            adsError: adsRes.status === 'rejected' ? adsRes.reason.message : null
        }
    };
}