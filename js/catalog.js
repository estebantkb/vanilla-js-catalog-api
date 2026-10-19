const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");
const apiUrl = "http://localhost:8080/api/products";

const render = (list) => {
  grid.innerHTML = list.map(({ name, image, description, labels }) => `
    <div class="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg flex flex-col sm:flex-row">
      <img src="${image}" alt="${name}" class="h-44 w-full sm:h-auto sm:w-1/3 object-contain bg-white p-2">
      <div class="p-4 flex flex-col flex-grow sm:w-2/3">
        <h3 class="text-lg font-bold mb-1">${name}</h3>
        <p class="text-slate-400 text-sm mb-4 flex-grow">${description}</p>
        <div class="flex flex-wrap gap-2">
          ${labels.map((label) => `
            <span class="bg-blue-600/20 text-blue-300 text-xs px-2.5 py-1 rounded-full border border-blue-500/30">${label}</span>
          `).join("")}
        </div>
      </div>
    </div>
  `).join("");
};

const loadProducts = async (search = "") => {
  const url = search ? `${apiUrl}?search=${encodeURIComponent(search)}` : apiUrl;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not load products.");
  }

  const products = await response.json();
  render(products.map((product) => ({
    ...product,
    labels: product.labels.split(",")
  })));
};

searchInput.addEventListener("input", (event) => {
  loadProducts(event.target.value.trim()).catch((error) => {
    grid.innerHTML = `<p class="text-red-300">${error.message}</p>`;
  });
});

loadProducts().catch((error) => {
  grid.innerHTML = `<p class="text-red-300">${error.message}</p>`;
});
