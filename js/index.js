const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR_MOVIES="https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH="https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const form=document.querySelector(".header__search__form");
const search=document.querySelector(".header__search");


// Навешываем на поле поиска событие
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
// Получение фильмов
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

// Вывод рейтинга с соответсвующим цветом
function getByRate(vote){
    if(vote>=7){
        return "green";
    } else if(vote >= 5){
        return "orange";
    } else {
        return "red";
    }
}

// Вывод фильмов 
function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
  
    const firstTenFilms = data.films.slice(0, 10);
  
    firstTenFilms.forEach(movie => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
        <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <a><div class="movie__title">${movie.nameRu}<div class="movie__year">(${movie.year})</div></div></a>
          <a><div class="movie__category">${movie.genres.map(genre => `${genre.genre}`)}</div></a>
          <a><div class="movie__average movie__average--${getByRate(movie.rating)}">${movie.rating}</div></a>
          <button type='button' class="movie__favorite">❤️</button>
        </div>
      `;
      moviesEl.appendChild(movieEl);
  
      //получаем все кнопки на странице
      const favoriteButtons = movieEl.querySelectorAll(".movie__favorite");
  
      //добавляем обработчик клика на каждую кнопку
      favoriteButtons.forEach(button => {
        button.addEventListener("click", () => {
          console.log("Клик на кнопке сердечка");
          addFavorite(movie.filmId, movie.nameRu, movie.year, `${movie.genres.map(genre => genre.genre)}`, movie.rating, movie.posterUrlPreview);
        });
      });
    });
  }
  
  // здесь код который я не хочу писать вручную при работе 
/* <a><button class="movie__favorite" onclick="favorite(${filmId})">❤</button></a> */
// ${movie.filmId},'${movie.nameRu}','${movie.year}','${movie.genres.map(genre => `${genre.genre}`)}','${movie.rating}','${movie.posterUrlPreview}'




