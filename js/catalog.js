const products = [
  {
    name: "Teltonika FMB130",
    image: "img/gps.jpg",
    description: "Advanced GPS tracker with internal backup battery for commercial fleets.",
    labels: ["GPS", "Hardware", "4G"]
  },
  {
    name: "Air Filter X3000",
    image: "img/air-filter.jpg",
    description: "High-efficiency particulate air filter designed for heavy-duty diesel engines.",
    labels: ["Engine", "Diesel", "OEM"]
  },
  {
    name: "OBD-II Pro Scanner",
    image: "img/obd.jpg",
    description: "Full-system diagnostic tablet for reading real-time truck sensor metrics.",
    labels: ["Diagnostics", "24V", "Tools"]
  },
  {
    name: "LED Floodlight Bar",
    image: "img/led.jpg",
    description: "Waterproof IP68 high-lumen work light bar for night cargo operations.",
    labels: ["Lighting", "IP68", "Exterior"]
  },
  {
    name: "Synthetic Oil 15W-40",
    image: "img/oil.jpg",
    description: "Heavy-duty synthetic blend oil for thermal stability under high loads.",
    labels: ["Lubricant", "15W-40", "Motor"]
  },
  {
    name: "Brake Chamber T30",
    image: "img/brake.jpg",
    description: "Double diaphragm spring brake actuator for semi-trailers and heavy axles.",
    labels: ["Brakes", "Safety", "Pneumatic"]
  }
];

const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");

const render = (list) => {
  grid.innerHTML = list.map(({ name, image, description, labels }) => `
    <div class="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-lg flex flex-col">
      <img src="${image}" alt="${name}" class="h-44 w-full object-contain bg-white p-2">
      <div class="p-4 flex flex-col flex-grow">
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

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase().trim();
  const filtered = products.filter(({ name, description, labels }) =>
    name.toLowerCase().includes(query) ||
    description.toLowerCase().includes(query) ||
    labels.some((label) => label.toLowerCase().includes(query))
  );
  render(filtered);
});

render(products);
