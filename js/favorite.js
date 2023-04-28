const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const form=document.querySelector(".header__search__form");
const search=document.querySelector(".header__search");


let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
favoriteMovies.push(filmId);
localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
favoriteMovies.forEach(filmId => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML=`
                 <div class="movie__cover-inner">
                    <img src="${filmId.posterUrlPreview}" alt="${filmId.nameRu}" class="movie__cover">
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <a><div class="movie__title">${filmId.nameRu}<div class="movie__year">(${filmId.year})</div></div></a>
                    <a><div class="movie__category">${filmId.genres.map(genre => ` ${genre.genre}`)}</div></a>
                    <a><div class="movie__average movie__average--${getByRate(filmId.rating)}">${filmId.rating}</div></a>
                    <a><button class="movie__favorite" onclick="favorite(${filmId})">❤</button></a>
                </div>
    `;
    moviesEl.appendChild(movieEl);
});