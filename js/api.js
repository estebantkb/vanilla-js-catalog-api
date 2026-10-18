const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");
const statusMsg = document.getElementById("statusMsg");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const pageLabel = document.getElementById("pageLabel");

let page = 1;
let query = "";
let timer;

const loadCharacters = async () => {
  const url = query
    ? `https://rickandmortyapi.com/api/character?page=${page}&name=${encodeURIComponent(query)}`
    : `https://rickandmortyapi.com/api/character?page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    grid.innerHTML = `<p class="text-slate-400">No results found.</p>`;
    return;
  }

  const data = await res.json();
  pageLabel.textContent = `Page ${page}`;
  grid.innerHTML = data.results.map(({ id, name, image, species, status, location }) => `
    <div onclick="openDetail(${id})" class="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 cursor-pointer flex flex-col sm:flex-row">
      <img src="${image}" alt="${name}" class="h-52 w-full sm:h-auto sm:w-1/3 object-cover">
      <div class="p-4 flex flex-col flex-grow sm:w-2/3">
        <h3 class="text-lg font-bold mb-1">${name}</h3>
        <p class="text-slate-400 text-sm mb-4">${location.name}</p>
        <div class="flex gap-2 mt-auto">
          <span class="bg-blue-600/20 text-blue-300 text-xs px-2.5 py-1 rounded-full">${species}</span>
          <span class="bg-emerald-600/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full">${status}</span>
        </div>
      </div>
    </div>
  `).join("");
};

const openDetail = async (id) => {
  const charRes = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character = await charRes.json();

  let location = { name: character.location.name, type: "Unknown", dimension: "Unknown" };
  if (character.location.url) {
    const locRes = await fetch(character.location.url);
    location = await locRes.json();
  }

  modalContent.innerHTML = `
    <img src="${character.image}" alt="${character.name}" class="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-blue-400">
    <h2 class="text-2xl font-bold text-center mb-4">${character.name}</h2>
    <div class="space-y-2 text-sm text-slate-300 bg-slate-900 p-4 rounded-lg">
      <p><strong>Status:</strong> ${character.status}</p>
      <p><strong>Species:</strong> ${character.species}</p>
      <p><strong>Gender:</strong> ${character.gender}</p>
      <p><strong>Origin:</strong> ${character.origin.name}</p>
      <p><strong>Location:</strong> ${location.name}</p>
      <p><strong>Location Type:</strong> ${location.type}</p>
      <p><strong>Dimension:</strong> ${location.dimension}</p>
    </div>
  `;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

searchInput.addEventListener("input", (e) => {
  query = e.target.value.trim();
  page = 1;
  statusMsg.classList.remove("hidden");
  clearTimeout(timer);
  timer = setTimeout(() => {
    statusMsg.classList.add("hidden");
    loadCharacters();
  }, 4000);
});

document.getElementById("closeBtn").addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (page > 1) {
    page--;
    loadCharacters();
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  page++;
  loadCharacters();
});

loadCharacters();
