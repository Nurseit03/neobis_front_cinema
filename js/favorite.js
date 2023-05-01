function addFavorite(filmId,name,year,genre,rating,posterUrlPrewiev){
    localStorage.setItem('FilmId',JSON.stringify(filmId));  
    localStorage.setItem('Name',JSON.stringify(name));  
    localStorage.setItem('Year',JSON.stringify(year));      
    localStorage.setItem('Genre',JSON.stringify(genre));
    localStorage.setItem('Rating',JSON.stringify(rating));  
    localStorage.setItem('PosterUrlPrewiev',JSON.stringify(posterUrlPrewiev));  
    let localStorageData = JSON.stringify(localStorage); // преобразуем содержимое в строку JSON и сохраняем в переменную
    let test = JSON.parse(localStorageData);
    console.log(test);          
      
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showFavorites(){
    let FilmId =localStorage.getItem('FilmId');  
    let name = localStorage.getItem('Name');  
    let year = localStorage.getItem('Year');      
    let genre = localStorage.getItem('Genre');
    let rating = localStorage.getItem('Rating');  
    let posterUrl = localStorage.getItem('PosterUrlPrewiev');          
    let poster=JSON.parse(posterUrl);
    // Очищаем предыдущие фильмы
    const moviesEl = document.querySelector(".movies");
    moviesEl.innerHTML = "";
    let localStorageData = JSON.stringify(localStorage); // преобразуем содержимое в строку JSON и сохраняем в переменную
    let test = JSON.parse(localStorageData);
    console.log(test);


        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML=`
                     <div class="movie__cover-inner">
                        <img src="${poster}" alt="${name}" class="movie__cover">
                        <div class="movie__cover--darkened"></div>
                    </div>
                    <div class="movie__info">
                        <a><div class="movie__title">${name}<div class="movie__year">(${year})</div></div></a>
                        <a><div class="movie__category">${genre}</div></a>
                        <a><div class="movie__average movie__average--${getByRate(rating)}">${rating}</div></a>
                        <button type='button' class="movie__favorite">❤️</button>
                    </div>
                    </div>
        `;
    moviesEl.appendChild(movieEl);
    

    
}

