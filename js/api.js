const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");
const statusMsg = document.getElementById("statusMsg");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const pageLabel = document.getElementById("pageLabel");

let currentPage = 1;
let currentQuery = "";
let debounceTimer;

const loadCharacters = async (page = 1, name = "") => {
  try {
    const url = name
      ? `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
      : `https://rickandmortyapi.com/api/character/?page=${page}`;

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      grid.innerHTML = `<p class="text-slate-400">No results found.</p>`;
      return;
    }

    pageLabel.textContent = `Page ${page}`;
    renderCards(data.results);
  } catch (err) {
    grid.innerHTML = `<p class="text-red-400">Error loading API.</p>`;
  }
};

const renderCards = (characters) => {
  grid.innerHTML = characters.map(({ id, name, image, species, status, location }) => `
    <div onclick="openDetail(${id})" class="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg cursor-pointer hover:border-blue-500 transition flex flex-col">
      <img src="${image}" alt="${name}" class="h-52 w-full object-cover">
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-bold mb-1">${name}</h3>
        <p class="text-slate-400 text-sm mb-4">Location: ${location.name}</p>
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
  const { name, image, status, species, gender, origin, location, episode } = await charRes.json();

  const epRes = await fetch(episode[0]);
  const epData = await epRes.json();

  modalContent.innerHTML = `
    <img src="${image}" alt="${name}" class="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-blue-400">
    <h2 class="text-2xl font-bold text-center mb-4">${name}</h2>
    <div class="space-y-2 text-sm text-slate-300 bg-slate-900 p-4 rounded-lg">
      <p><strong>Status:</strong> ${status}</p>
      <p><strong>Species:</strong> ${species}</p>
      <p><strong>Gender:</strong> ${gender}</p>
      <p><strong>Origin:</strong> ${origin.name}</p>
      <p><strong>Location:</strong> ${location.name}</p>
      <p><strong>First Seen In:</strong> ${epData.name} (${epData.episode})</p>
    </div>
  `;
  modal.classList.remove("hidden");
};

searchInput.addEventListener("input", (e) => {
  currentQuery = e.target.value.trim();
  currentPage = 1;
  statusMsg.classList.remove("hidden");

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    statusMsg.classList.add("hidden");
    loadCharacters(currentPage, currentQuery);
  }, 4000);
});

document.getElementById("closeBtn").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadCharacters(currentPage, currentQuery);
  }
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentPage++;
  loadCharacters(currentPage, currentQuery);
});

loadCharacters();