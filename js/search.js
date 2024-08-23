document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'b3f80fb0f7f9a63ba5c589e1bb9a7b78';
    const baseUrl = 'https://api.themoviedb.org/3';

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    document.getElementById('search-query').innerText = query;

    fetch(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('results-container');
            data.results.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                                      <p>${movie.title}</p>`;
                container.appendChild(movieDiv);

                movieDiv.addEventListener('click', function() {
                    window.location.href = `movie-details.html?id=${movie.id}`;
                });
            });
        });
});
