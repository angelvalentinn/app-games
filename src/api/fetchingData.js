export const apiConfig = {
    KEY : 'bfb9be538399484eb07b25ef84481265',
}

export const URLS = {
    plataformas : `https://api.rawg.io/api/platforms/lists/parents?key=${apiConfig.KEY}`,
    generos: `https://api.rawg.io/api/genres?key=${apiConfig.KEY}`,
    juegos: `https://api.rawg.io/api/games?key=${apiConfig.KEY}&page=1`,
    juegoDetail: (id) => `https://api.rawg.io/api/games/${id}?key=${apiConfig.KEY}`,
    juegoStore: (id) => `https://api.rawg.io/api/games/${id}/stores?key=${apiConfig.KEY}`,
    juegoLogros: (id) => `https://api.rawg.io/api/games/${id}/achievements?key=${apiConfig.KEY}`,
    juegoCreadores: (id) => `https://api.rawg.io/api/games/${id}/development-team?key=${apiConfig.KEY}`,
    juegoMismaSerie: (id) => `https://api.rawg.io/api/games/${id}/game-series?key=${apiConfig.KEY}`,
    juegoImagenes: (id) => `https://api.rawg.io/api/games/${id}/screenshots?key=${apiConfig.KEY}`,
    juegosFiltros: ({idPlat,genre,ord,anio,search,tags}) => `https://api.rawg.io/api/games?key=${apiConfig.KEY}${idPlat ? `&platforms=${idPlat == 2 ? 27 : idPlat}` : genre ?`&genres=${genre}` : search ? `&search=${search}` : tags ? `&tags=${tags}` : ''}&page=1&ordering=${ord && ord}&dates=${anio && `${anio}-01-01,${anio}-12-31`}`

}

export const fetchingData = async (setFunction,url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        await setFunction(data);
    } catch {
        console.log("Error");
    }
    
}