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
async function fetchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(query)}`, option);
        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }
        const fetchedData = (await response.json());
        displayMovies(fetchedData.results);
        viewSwap('movie-results');
    }
    catch (error) {
        console.error('Error:', error);
    }
}
function viewSwap(viewName) {
    const movieResultsView = document.querySelector('.movie-results-wrapper');
    const searchFormView = document.querySelector('.search-form-wrapper');
    if (!movieResultsView || !searchFormView) {
        throw new Error('movieResultsView or searchFormView is null');
    }
    if (viewName === 'movie-results') {
        movieResultsView.classList.remove('hidden');
        searchFormView.classList.add('hidden');
    }
    else if (viewName === 'search-form') {
        searchFormView.classList.remove('hidden');
        movieResultsView.classList.add('hidden');
    }
    data.view = viewName;
}
function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    const searchTerm = document.getElementById('search-term');
    if (movieContainer && searchTerm) {
        searchTerm.textContent = `Filtering for: ${decodeURIComponent(searchInput.value)}`;
        for (const movie of movies) {
            const movieEntry = renderEntry(movie);
            movieContainer.appendChild(movieEntry);
        }
    }
}
function renderEntry(movie) {
    const movieDiv = document.createElement('div');
    movieDiv.className = 'movie';
    const img = document.createElement('img');
    img.src = movie.poster;
    img.alt = movie.title;
    movieDiv.appendChild(img);
    const title = document.createElement('h3');
    title.textContent = movie.title;
    movieDiv.appendChild(title);
    const description = document.createElement('div');
    description.textContent = movie.description;
    movieDiv.appendChild(description);
    return movieDiv;
}
