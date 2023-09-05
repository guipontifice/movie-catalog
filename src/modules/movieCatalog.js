import { checkFavorite, getFavoritedMovies, showFavorites } from "./favorite";
export default function renderMovie(movie) {
    
    const { id, title, poster_path, vote_average, release_date, overview } = movie
    const isFavorited = checkFavorite()
    
    const year = new Date(release_date).getFullYear()
    const image = () => {
        if(poster_path != null) {
            return `https://image.tmdb.org/t/p/original${poster_path}`
        } else {
            return '../src/assets/img/heart-fill.svg'
        }
    }

    const movieElement = document.querySelector('.movies');

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie');
    movieElement.appendChild(movieCard);

    const movieInformation = document.createElement('div');
    movieInformation.classList.add('movie-informations');
    movieCard.appendChild(movieInformation);

    const movieImage = document.createElement('div');
    movieImage.classList.add('movie-image');
    movieInformation.appendChild(movieImage);

    const movieImageTitle = document.createElement('img');
    movieImage.appendChild(movieImageTitle);
    movieImageTitle.src = image()

    const movieText = document.createElement('div');
    movieText.classList.add('movie-text');
    movieInformation.appendChild(movieText);

    const movietitle = document.createElement('h4');
    movieText.appendChild(movietitle);
    movietitle.textContent = `${title} (${year})`

    const ratingFavorites = document.createElement('div');
    ratingFavorites.classList.add('rating-favorites');
    movieText.appendChild(ratingFavorites);

    const movieRating = document.createElement('div');
    movieRating.classList.add('rating');
    ratingFavorites.appendChild(movieRating);

    const starImage = document.createElement('img');
    movieRating.appendChild(starImage)
    starImage.src = '../src/assets/img/star.png'

    const spanRating = document.createElement('span')
    movieRating.appendChild(spanRating);
    spanRating.textContent = vote_average

    const favorite = document.createElement('div');
    favorite.classList.add('favorite');
    ratingFavorites.appendChild(favorite);

    const heartImage = document.createElement('img');
    favorite.appendChild(heartImage)
    heartImage.addEventListener('click', (event) => getFavoritedMovies(event, movie))
    heartImage.src = heartImg();
    function heartImg() {
        for(let i = 0; i < isFavorited.length; i++) {
            if(movie.id == isFavorited[i]) {
                return '../src/assets/img/heart-fill.svg';
            } 
        }
        return '../src/assets/img/heart.svg';
}

    const spanFavorite = document.createElement('span');
    favorite.appendChild(spanFavorite);
    spanFavorite.textContent = spanText();
    function spanText() {
            for(let i = 0; i < isFavorited.length; i++) {
                if(movie.id === isFavorited[i]) {
                    return 'Favorite';
                } 
            }
            return '';
    }

    const movieDescription = document.createElement('div');
    movieDescription.classList.add('movie-description');
    movieCard.appendChild(movieDescription);

    const movieDescriptionSpan = document.createElement('span');
    movieDescription.appendChild(movieDescriptionSpan);
    movieDescriptionSpan.textContent = overview;

}
