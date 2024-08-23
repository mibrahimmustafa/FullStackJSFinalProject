document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'b3f80fb0f7f9a63ba5c589e1bb9a7b78';
    const baseUrl = 'https://api.themoviedb.org/3';

    function fetchMovies(url, containerId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById(containerId);
                data.results.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                                          <p>${movie.title}</p>`;
                    container.appendChild(movieDiv);
                });
            });
    }

    fetchMovies(`${baseUrl}/movie/popular?api_key=${apiKey}`, 'featured-container');
    fetchMovies(`${baseUrl}/movie/upcoming?api_key=${apiKey}`, 'incoming-container');
    fetchMovies(`${baseUrl}/movie/top_rated?api_key=${apiKey}`, 'top-rated-container');
    fetchMovies(`${baseUrl}/trending/movie/week?api_key=${apiKey}`, 'trending-container');

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            window.location.href = `search.html?query=${e.target.value}`;
        }
    });
});
