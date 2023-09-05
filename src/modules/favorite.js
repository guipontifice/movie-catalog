import renderMovie from "./movieCatalog";
import { cleanAllMovies } from "./searchMovie";
import { showMovie, getPopularMovies } from "./showMovie";
import apiKey from "./environment/key";
import { getMovies } from "./showMovie";
const inputBox = document.querySelector('input[type="checkbox"]')
inputBox.addEventListener('change', (movie) => {   
        const isChecked = inputBox.checked;
        if (isChecked === true) {
            cleanAllMovies()
            const favorites = saveFavoriteMovies();
            favorites.forEach(movie => searchMovieId(movie));
        } else if(isChecked === false){ 
            cleanAllMovies();
            getMovies()
            console.log('We came here')
        }
        homeScreen.addEventListener('click', getMovies);

});

const homeScreen = document.querySelector('h2');

async function searchMovieId(movieId) {
    console.log(movieId)
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey()}&language=en-US`
    const fetchResponse = await fetch(url)
    const movieData = await fetchResponse.json()
    console.log(movieData)
    return renderMovie(movieData)
}


function getFavoritedMovies(event, movie) {
    const favoriteState = {
        favorited: 'http://127.0.0.1:5500/src/assets/img/heart-fill.svg',
        notFavorited: 'http://127.0.0.1:5500/src/assets/img/heart.svg'
    }
    if (event.target.src === favoriteState.notFavorited) {
        event.target.src = favoriteState.favorited;
        saveToLocalStorage(movie);
        console.log('Favorited');
    } else if (event.target.src === favoriteState.favorited) {
        event.target.src = favoriteState.notFavorited
        removeFromLocalStorage(movie.id);
        console.log('Desfavorited');
    }

}
function saveToLocalStorage(movie) {
    const movies = saveFavoriteMovies();
    console.log(movies)
    if (movies != null) {
        movies.push(movie.id);
    }
    const newMovies = [...new Set(movies)]
    const moviesJSON = JSON.stringify(newMovies);
    return localStorage.setItem('favoriteMovies', moviesJSON);
}
function removeFromLocalStorage(movie) {
    const favorites = checkFavorite();

    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === movie) {
            favorites.splice(i, 1)
            localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
            break;
        }
    }
}

function saveFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies'))
}

function checkFavorite() {
    const checkJSON = JSON.parse(localStorage.getItem("favoriteMovies"));
    let newCheckJSON = [];
    if (checkJSON) {
        newCheckJSON.push(...checkJSON);
    }
    return newCheckJSON;
}



export { getFavoritedMovies, checkFavorite };
