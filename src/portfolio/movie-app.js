const img_url    = 'https://image.tmdb.org/t/p/w1280';
const api_url    = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const api_key    =  '04c35731a5ee918f014970082a0088b1';
const search_api = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const main       = document.getElementById('main');
const form       = document.getElementById('form');
const search     = document.getElementById('search');

/*   TODO

    1)  Hide api keys
    2) like the recipe app show the movie details in a pop up
    3) Sort out overview padding and spacing
    4) Add teh search term to the header when you search
    5) Pagination?
    
*/

//initially get fav movies
getMovies(api_url);

async function getMovies(url) {
    const response = await fetch(url);
    const responseData = await response.json();

    showMovies(responseData.results);    
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview} = movie;

        if(poster_path) {
        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img 
            src="${img_url + movie.poster_path}" 
            alt="${movie.title}"
            />
            <div class="movie-info">
            <h3>${movie.title}</h3>
            <span class="${getClassByRate(vote_average)}">${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${overview}</div>
        `;

        main.appendChild(movieEl);
        }
    });

}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green';
    }
    else if(vote >= 6) {
        return 'orange';
    } else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(search_api + searchTerm);
        search.value = '';
    }
});
