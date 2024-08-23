// api.js

const apiKey = 'b3f80fb0f7f9a63ba5c589e1bb9a7b78';
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/';

// Function to make a generic API request
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

// Fetch popular movies
async function fetchPopularMovies() {
    return fetchFromApi('/movie/popular');
}

// Fetch upcoming movies
async function fetchUpcomingMovies() {
    return fetchFromApi('/movie/upcoming');
}

// Fetch top-rated movies
async function fetchTopRatedMovies() {
    return fetchFromApi('/movie/top_rated');
}

// Fetch trending movies
async function fetchTrendingMovies() {
    return fetchFromApi('/trending/movie/week');
}

// Fetch movie details by ID
async function fetchMovieDetails(movieId) {
    return fetchFromApi(`/movie/${movieId}`);
}

// Fetch movies by search query
async function searchMovies(query) {
    return fetchFromApi('/search/movie', { query });
}

// Get the full image URL for posters, backdrops, etc.
function getImageUrl(path, size = 'w500') {
    return `${imageBaseUrl}${size}${path}`;
}

// Example Usage in Other JS Files
// const popularMovies = await fetchPopularMovies();
// const movieDetails = await fetchMovieDetails(movieId);

export {
    fetchPopularMovies,
    fetchUpcomingMovies,
    fetchTopRatedMovies,
    fetchTrendingMovies,
    fetchMovieDetails,
    searchMovies,
    getImageUrl,
};
