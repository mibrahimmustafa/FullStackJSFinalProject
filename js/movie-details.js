// movie-details.js

// API configuration and functions
const apiKey = 'b3f80fb0f7f9a63ba5c589e1bb9a7b78';
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/';

async function fetchFromApi(endpoint, params = {}) {
    const url = new URL(`${baseUrl}${endpoint}`);
    url.search = new URLSearchParams({
        api_key: apiKey,
        ...params,
    }).toString();

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
}

async function fetchMovieDetails(movieId) {
    return fetchFromApi(`/movie/${movieId}`);
}

function getImageUrl(path, size = 'w500') {
    return `${imageBaseUrl}${size}${path}`;
}

// Movie details logic
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    fetchMovieDetails(movieId)
        .then(movie => {
            document.getElementById('title').innerText = movie.title;
            document.getElementById('plot').innerText = movie.overview;
            document.getElementById('rating').innerText = `Rating: ${movie.vote_average}`;
            document.getElementById('poster').innerHTML = `<img src="${getImageUrl(movie.poster_path)}" alt="${movie.title}">`;

            document.getElementById('watchlist-btn').addEventListener('click', function() {
                let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
                watchlist.push(movie);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                alert('Movie added to watchlist!');
            });
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
});
