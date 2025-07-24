const API_ALL_SHOWS = "https://api.tvmaze.com/shows";
let allShows = [];

document.addEventListener("DOMContentLoaded", async () => {
  allShows = await fetchAllShows();
  renderCarousel(allShows.slice(0, 5));
  renderMovieGrid(allShows);

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = allShows.filter((show) =>
      show.name.toLowerCase().startsWith(query)
    );
    renderMovieGrid(filtered);
  });
});

async function fetchAllShows() {
  const response = await fetch(API_ALL_SHOWS);
  const data = await response.json();
  return data;
}

// Card
function renderMovieGrid(shows) {
  const grid = document.getElementById("movieGrid");
  grid.innerHTML = "";

  shows.forEach((show) => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";

    col.innerHTML = `
      <div class="card h-100 bg-light text-dark shadow" style="position:relative; cursor:pointer;" data-show-id="${
        show.id
      }">
        <img src="${show.image?.medium || ""}" class="card-img-top" alt="${
      show.name
    }" />
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-sm  me-md-3 btn-dark favorite-btn">Add to Favorite</button>
          </div>
        </div>
      </div>
    `;

    // Add favorite button
    const favBtn = col.querySelector(".favorite-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToFavorite(show);
      favBtn.textContent = "Added";
      favBtn.disabled = true;
    });

    // Show episodes
    col.querySelector(".card").addEventListener("click", () => {
      fetchEpisodes(show.id, show.name);
    });

    grid.appendChild(col);
  });
}

const addToFavorite = (show) => {
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  const exists = favorites.some((item) => item.id === show.id);
  if (!exists) {
    favorites.push(show);
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
const favoriteBtn = document.createElement("button");
favoriteBtn.textContent = "Add to Favorite";
favoriteBtn.className = "btn btn-outline-light mt-2";

favoriteBtn.addEventListener("click", () => addToFavorite(show));

async function fetchEpisodes(showId, showName) {
  const grid = document.getElementById("movieGrid");
  grid.innerHTML = `<h3 class="text-white mb-4">Episodes of ${showName}</h3>`;

  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`
  );
  const episodes = await response.json();

  episodes.forEach((ep) => {
    const col = document.createElement("div");
    col.className = "col-md-4 mb-3";

    col.innerHTML = `
      <div class="card bg-dark text-white">
        ${
          ep.image
            ? `<img src="${ep.image.medium}" class="card-img-top" alt="${ep.name}" />`
            : ""
        }
        <div class="card-body">
          <h6>${ep.name}</h6>
          <p>Season ${ep.season} - Episode ${ep.number}</p>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

// Carousel
function renderCarousel(shows) {
  const carouselInner = document.getElementById("carouselInner");
  carouselInner.innerHTML = "";

  shows.forEach((show, index) => {
    const item = document.createElement("div");
    item.className = `carousel-item ${index === 0 ? "active" : ""}`;

    item.innerHTML = `
      <img src="${
        show.image?.original || ""
      }" class="d-block w-100 bg-light shadow border rounded" alt="${show.name}"
           style="height: 570px; object-fit:fill;" />
      <div class="carousel-caption d-none d-md-block top-center">
        <h5>${show.name}</h5>
        <p>${show.summary?.replace(/<[^>]+>/g, "").slice(0, 100)}...</p>
      </div>
    `;

    carouselInner.appendChild(item);
  });
}
