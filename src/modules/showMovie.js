import apiKey from "./environment/key";
import renderMovie from "./movieCatalog";
import getSearch from "./searchMovie";
import { saveFavoriteMovies } from "./favorite";
import { cleanAllMovies } from "./searchMovie";

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey()}&language=en-US&page=1`
    const fetchResponse = await fetch(url)
    const { results } = await fetchResponse.json()
    return results;
}

async function getMovies() {
    const movies = await getPopularMovies();
    movies.forEach(movie => renderMovie(movie));
}
    
const homeScreen = document.querySelector('h2');
homeScreen.addEventListener('click', getMovies);    

window.onload = function() {
    getMovies();
}
const inputBox = document.querySelector('input[type="checkbox"]')
// inputBox.addEventListener('change', showFavorites);

export { getMovies }