function getFavorites() {
    const favoritesJSON = localStorage.getItem("favorites");
    let favorites = [];
    if (favoritesJSON !== null) {
      favorites = JSON.parse(favoritesJSON);
    }
    return favorites;
  }
  
  function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
  
   function addFavorite(filmId, nameRu, year, genres, rating, posterUrlPreview) {
    const favorites = getFavorites();
    const newFavorite = { filmId, nameRu, year, genres, rating, posterUrlPreview };
    favorites.push(newFavorite);
    saveFavorites(favorites);
  }
  
  function showFavorites() {
    const favorites = getFavorites();
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML = "";
    if (favorites.length === 0) {
      const main = document.querySelector(".main");
      main.innerHTML="";
      main.innerHTML=`<h1 style="color:#f6f6f6; margin:50px;">Пока ничего нет ...</h1>`
    } else {
      favorites.forEach(movie => {
        const movieGenres = movie.genres; // получаем каждый фильм свой жанр
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
          <div class="movie__cover-inner">
            <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
            <div class="movie__cover--darkened"></div>
          </div>
          <div class="movie__info">
            <a><div class="movie__title">${movie.nameRu}<div class="movie__year">(${movie.year})</div></div></a>
            <a><div class="movie__category">${movieGenres.split(',').join(', ')}</div></a>
            <a><div class="movie__average movie__average--${getByRate(movie.rating)}">${movie.rating}</div></a>
          </div>
        `;
        moviesEl.appendChild(movieEl);
      });
    }
  }
  