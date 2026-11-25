
const products = [
  {
    id: 1,
    name: "Smartfon Pro 256 GB",
    category: "electronics",
    price: 1299,
    image: "assets/products/smartphone.jpg"
  },
  {
    id: 2,
    name: "Słuchawki Gaming Pro RGB",
    category: "audio",
    price: 249,
    image: "assets/products/headphones.jpg"
  },
  {
    id: 3,
    name: "Laptop Business 16",
    category: "computers",
    price: 1899,
    image: "assets/products/laptop.jpg"
  },
  {
    id: 4,
    name: "Kamera 4K Ultra HD",
    category: "electronics",
    price: 299,
    image: "assets/products/camera.jpg"
  },
  {
    id: 5,
    name: "Dron Pro 4K GPS",
    category: "electronics",
    price: 599,
    image: "assets/products/drone.jpg"
  },
  {
    id: 6,
    name: "Akcesoria komputerowe",
    category: "accessories",
    price: 199,
    image: ""
  }
];

let selectedCategory = "all";
let searchQuery = "";
let favorites = [];
let cart = [];

const grid = document.getElementById("productGrid");
const emptyMessage = document.getElementById("emptyMessage");
const toast = document.getElementById("toast");

function formatPrice(price) {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "EUR"
  }).format(price);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function renderProducts() {
  let filtered = products.filter(product => {
    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFavorites =
      !showFavoritesOnly || favorites.includes(product.id);

    return matchesCategory && matchesSearch && matchesFavorites;
  });

  const sort = document.getElementById("sortProducts").value;

  if (sort === "priceAsc") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "priceDesc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  grid.innerHTML = "";

  filtered.forEach(product => {
    const isFavorite = favorites.includes(product.id);

    const card = document.createElement("article");
    card.className = "product-card";

    const imageArea = product.image
      ? `<img src="${product.image}" alt="${product.name}"
           onerror="this.style.display='none';
           this.nextElementSibling.style.display='block'">
         <span class="image-placeholder" style="display:none">R</span>`
      : `<span class="image-placeholder">R</span>`;

    card.innerHTML = `
      <div class="product-image">
        ${imageArea}
        <button class="favorite ${isFavorite ? "selected" : ""}"
          data-favorite="${product.id}" aria-label="Ulubione">
          ${isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>

        <div class="product-bottom">
          <span class="product-price">
            ${formatPrice(product.price)}
          </span>

          <button class="add-cart"
            data-cart="${product.id}"
            aria-label="Dodaj do koszyka">
            🛒
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  emptyMessage.hidden = filtered.length > 0;

  updateCounters();
}

let showFavoritesOnly = false;

function updateCounters() {
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("favoritesCount").textContent = favorites.length;
}

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");
    selectedCategory = button.dataset.category;
    showFavoritesOnly = false;

    renderProducts();
  });
});

document.getElementById("searchInput")
  .addEventListener("input", event => {
    searchQuery = event.target.value;
    renderProducts();
  });

document.getElementById("searchButton").addEventListener("click", () => {
  searchQuery = document.getElementById("searchInput").value;
  renderProducts();
});

document.getElementById("sortProducts")
  .addEventListener("change", renderProducts);

grid.addEventListener("click", event => {
  const favoriteButton = event.target.closest("[data-favorite]");
  const cartButton = event.target.closest("[data-cart]");

  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.favorite);

    favorites = favorites.includes(id)
      ? favorites.filter(item => item !== id)
      : [...favorites, id];

    renderProducts();
    showToast("Zaktualizowano ulubione.");
  }

  if (cartButton) {
    const id = Number(cartButton.dataset.cart);
    const product = products.find(item => item.id === id);

    if (product) {
      cart.push(id);
      updateCounters();
      showToast("Dodano do koszyka: " + product.name);
    }
  }
});

document.getElementById("favoritesButton")
  .addEventListener("click", () => {
    showFavoritesOnly = !showFavoritesOnly;
    selectedCategory = "all";

    document.querySelectorAll(".category").forEach(item =>
      item.classList.toggle(
        "active",
        item.dataset.category === "all"
      )
    );

    renderProducts();
    showToast(
      showFavoritesOnly
        ? "Wyświetlasz ulubione produkty."
        : "Wyświetlasz wszystkie produkty."
    );

    document.getElementById("products").scrollIntoView();
  });

document.getElementById("cartButton").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Twój koszyk jest pusty.");
    return;
  }

  const total = cart.reduce((sum, id) => {
    const product = products.find(item => item.id === id);
    return sum + (product ? product.price : 0);
  }, 0);

  showToast(
    `Produkty: ${cart.length} | Razem: ${formatPrice(total)}`
  );
});

document.getElementById("year").textContent =
  new Date().getFullYear();

document.getElementById("language").addEventListener("change", event => {
  showToast(
    event.target.value === "de"
      ? "Wersja niemiecka wymaga uzupełnienia tłumaczeń."
      : "Wybrano język polski."
  );
});

renderProducts();
