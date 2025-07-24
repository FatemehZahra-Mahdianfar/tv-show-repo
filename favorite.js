document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoriteContainer");
  let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    container.innerHTML =
      "<p class='text-dark  text-center mt-5'>No favorites yet.</p>";
    return;
  }

  favorites.forEach((show, index) => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";

    const card = document.createElement("div");
    card.className = "card bg-dark text-white text-center h-100 w-100";

    const img = document.createElement("img");
    img.src = show.image?.medium || "https://via.placeholder.com/210x295";
    img.className = "card-img-top";
    img.alt = show.name;

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = show.name;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-light mt-3";
    removeBtn.textContent = "Remove from Favorite";

    // Remove
    removeBtn.addEventListener("click", () => {
      favorites = favorites.filter((f) => f.id !== show.id);
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
      col.remove();

      if (favorites.length === 0) {
        container.innerHTML =
          "<p class='text-dark text-center mt-5'>No favorites yet.</p>";
      }
    });

    body.appendChild(title);
    body.appendChild(removeBtn);
    card.appendChild(img);
    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
  });
});
