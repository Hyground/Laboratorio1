/**
 * REQUISITO 2: Sistema de Caché Asíncrono mediante Clausuras
 */
export function crearStorePeliculas(catalogoInicial) {
    // Variable privada encapsulada dentro de la clausura
    const cacheMemoria = {};

    return {
        async filtrarPorGenero(generoId) {
            if (!generoId || generoId === 'todos') {
                return catalogoInicial;
            }

            // 1. Verificación de Caché (Hit)
            if (cacheMemoria[generoId]) {
                console.log(`%c[CACHE HIT ⚡] Género "${generoId}" retornado desde la memoria privada.`, 'color: #51cf66; font-weight: bold;');
                return cacheMemoria[generoId];
            }

            // 2. Simulación de procesamiento asíncrono (Miss)
            console.log(`%c[CACHE MISS 🐢] Filtrando y guardando género "${generoId}" en caché privado...`, 'color: #ff922b; font-weight: bold;');
            await new Promise((res) => setTimeout(res, 200));

            const filtrados = catalogoInicial.filter(m => m.genre_ids.includes(parseInt(generoId)));
            
            // Guardar en el objeto privado
            cacheMemoria[generoId] = filtrados;

            return filtrados;
        }
    };
}