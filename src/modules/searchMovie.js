import renderMovie from "./movieCatalog";
import apiKey from "./environment/key";
import { getMovies } from "./showMovie";

const searchButton = document.querySelector('.searchIcon')
const input = document.querySelector('input#movie-name');
const movieCard = document.querySelector('.movies');
const searchImg = document.querySelector('.searchIcon');

searchImg.addEventListener('click', getSearch);
searchButton.addEventListener('click', getSearch);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === 13) {
        getSearch();
    }
})
async function getSearch() {
    const inputValue = input.value;
    if (inputValue != '') {
        cleanAllMovies();
        const movies = await searchMovieName(inputValue)
        movies.forEach(movie => renderMovie(movie))
        homeScreen.addEventListener('click', getMovies);
    }
}
const homeScreen = document.querySelector('h2');
homeScreen.addEventListener('click', () => getMovies);


function cleanAllMovies() {
    return movieCard.innerText = ''
}
async function searchMovieName(movieTitle) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey()}&query=${movieTitle}&language=en-US&page=1`
    const fetchResponse = await fetch(url)
    const { results } = await fetchResponse.json()
    console.log(results)
    return results
}


export { cleanAllMovies }