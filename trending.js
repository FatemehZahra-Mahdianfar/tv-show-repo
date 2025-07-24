document.addEventListener("DOMContentLoaded", () => {
  fetch("https://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((data) => {
      const sorted = data
        .sort((a, b) => b.rating.average - a.rating.average)
        .slice(0, 30);
      const container = document.getElementById("trendingGrid");

      sorted.forEach((show) => {
        const card = document.createElement("div");
        card.className = "col-md-3 mb-4";
        card.innerHTML = `
          <div class="card h-100" style="cursor:pointer;">
            <img src="${show.image?.medium || ""}" class="card-img-top" alt="${
          show.name
        }">
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">Rating: ${show.rating.average}</p>
            </div>
          </div>
        `;

        card.addEventListener("click", () => {
          window.open(`https://www.tvmaze.com/shows/${show.id}`, "_blank");
        });

        container.appendChild(card);
      });
    });
});
