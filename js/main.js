"use strict";
const searchReset = document.getElementById('search-reset');
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-bar input');
if (searchReset) {
    searchReset.addEventListener('click', () => {
        searchForm.reset();
        searchInput.value = '';
        const movieContainer = document.getElementById('movie-container');
        if (movieContainer) {
            movieContainer.textContent = '';
        }
        const searchTerm = document.getElementById('search-term');
        if (searchTerm) {
            searchTerm.textContent = '';
        }
        viewSwap('search-form');
    });
}
if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchFind = searchInput.value;
        if (!searchFind) {
            throw new Error('Nothing to search!');
        }
        await fetchMovies(searchFind);
    });
}
const option = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGRhMGI2ZDI1MTRkYjkxY2U1MDYyN2NmOWFmZTY1OSIsIm5iZiI6MTcyNDM4MTI0NS4xMzkyNjQsInN1YiI6IjY2YzdlNzI2NmU2YmVlZjU2MmVhY2E2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V_3OV5zOhM0LohBCLtaEDJNs9kb4geGr6QkZrx2Fvzs',
    },
};
function viewSwap(viewName) {
    const movieResultsView = document.querySelector('.movie-results-wrapper');
    const searchFormView = document.querySelector('.search-form-wrapper');
    const logo = document.getElementById('image');
    const searchBar = document.querySelector('.search-bar');
    const noResult = document.querySelector('.no-result');
    if (!movieResultsView || !searchFormView) {
        throw new Error('movieResultsView or searchFormView is null');
    }
    if (viewName === 'movie-results') {
        movieResultsView.classList.remove('hidden');
        searchFormView.classList.add('hidden');
        logo?.classList.add('hidden');
        searchBar?.classList.add('hidden');
    }
    else if (viewName === 'search-form') {
        searchFormView.classList.remove('hidden');
        movieResultsView.classList.add('hidden');
        logo?.classList.remove('hidden');
        searchBar?.classList.remove('hidden');
        noResult?.classList.add('hidden');
    }
    data.view = viewName;
    writeData();
}
function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    const searchTerm = document.getElementById('search-term');
    if (movieContainer && searchTerm) {
        searchTerm.textContent = `Filtering for: ${decodeURIComponent(searchInput.value)}`;
        searchTerm.classList.remove('hide');
        for (const movie of movies) {
            const movieEntry = renderEntry(movie);
            movieContainer.appendChild(movieEntry);
        }
    }
}
async function fetchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(query)}`, option);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const fetchedData = (await response.json());
        const noResult = document.querySelector('.no-result');
        if (fetchedData.results.length === 0) {
            noResult?.classList.remove('hidden');
        }
        else {
            noResult?.classList.add('hidden');
        }
        displayMovies(fetchedData.results);
        data.movies = fetchedData.results;
        writeData();
        viewSwap('movie-results');
    }
    catch (error) {
        console.error('Error:', error);
    }
}
function renderEntry(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    const img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    img.alt = movie.title;
    img.className = 'movie-poster';
    movieDiv.appendChild(img);
    const textContent = document.createElement('div');
    textContent.className = 'text-content';
    const title = document.createElement('h3');
    title.className = 'movie-title';
    title.textContent = movie.title;
    textContent.appendChild(title);
    const date = document.createElement('h5');
    date.className = 'release-date';
    date.textContent = movie.release_date;
    textContent.appendChild(date);
    const description = document.createElement('div');
    description.className = 'movie-description';
    description.textContent = movie.overview;
    textContent.appendChild(description);
    movieDiv.appendChild(textContent);
    return movieDiv;
}
