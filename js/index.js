const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR_MOVIES="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
// const API_URL_AWAIT_MOVIES="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1";
const API_URL_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const form=document.querySelector(".header__search__form");
const search=document.querySelector(".header__search");
const moviesEl = document.querySelector(".movies");


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

form.addEventListener("submit",(event) => {
    event.preventDefault();

    let str = search.value.trim();
    const apiSearchUrl=`${API_URL_SEARCH}`+str;

    if(search.value){
        // Очищаем предыдущие фильмы
        const moviesEl = document.querySelector(".movies");
        moviesEl.innerHTML = "";

        getMovies(apiSearchUrl);
        search.value="";
    }


})


getMovies(API_URL_POPULAR_MOVIES);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getMovies(url){
    const response = await fetch(url, {
        headers:{
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    showMovies(responseData);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getByRate(vote){
    if(vote>=7){
        return "green";
    } else if(vote >= 5){
        return "orange";
    } else {
        return "red";
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showMovies(data){
    const moviesEl = document.querySelector(".movies");

    const firstTenFilms = data.films.slice(0, 10); // Получаем только первые десять фильмов

    firstTenFilms.forEach(movie => {
        const filmId = movie.filmId;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
                     <div class="movie__cover-inner">
                        <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
                        <div class="movie__cover--darkened"></div>
                    </div>
                    <div class="movie__info">
                        <a><div class="movie__title">${movie.nameRu}<div class="movie__year">(${movie.year})</div></div></a>
                        <a><div class="movie__category">${movie.genres.map(genre => ` ${genre.genre}`)}</div></a>
                        <a><div class="movie__average movie__average--${getByRate(movie.rating)}">${movie.rating}</div></a>
                        <a><button class="movie__favorite" onclick="() => favorite(${filmId})">❤</button></a>
                    </div>
        `;
        moviesEl.appendChild(movieEl);
    })
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



