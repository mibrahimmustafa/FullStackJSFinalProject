document.addEventListener('DOMContentLoaded', function() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    const container = document.getElementById('watchlist-container');
    watchlist.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.innerHTML = `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
                              <p>${movie.title}</p>
                              <button class="remove-btn">Remove</button>`;
        container.appendChild(movieDiv);

        movieDiv.querySelector('.remove-btn').addEventListener('click', function() {
            const updatedWatchlist = watchlist.filter(m => m.id !== movie.id);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
            window.location.reload();
        });
    });
});
