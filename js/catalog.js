// BLOQUE A: Lista de datos locales (Con imagen y precio para que luzca como Card)
const items = [
  {
    name: "Teltonika FMB130",
    price: "$145",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80",
    description: "GPS tracker with backup battery for heavy trucks.",
    labels: ["GPS", "Hardware", "4G"]
  },
  {
    name: "Air Filter X3000",
    price: "$85",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=500&q=80",
    description: "High efficiency engine filter for diesel units.",
    labels: ["Engine", "Spare Part"]
  },
  {
    name: "OBD-II Scanner",
    price: "$320",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80",
    description: "Diagnostic tablet for reading vehicle sensors.",
    labels: ["Tools", "Electronics"]
  },
  {
    name: "LED Bar 24V",
    price: "$60",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=500&q=80",
    description: "Waterproof high-lumen floodlight for night routes.",
    labels: ["Lighting", "24V", "IP68"]
  },
  {
    name: "Synthetic Oil 15W-40",
    price: "$110",
    image: "https://images.unsplash.com/photo-1635784063388-1ff609e12d7c?auto=format&fit=crop&w=500&q=80",
    description: "Heavy-duty synthetic blend for long-haul protection.",
    labels: ["Lubricant", "Diesel"]
  },
  {
    name: "Brake Chamber T30",
    price: "$195",
    image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=500&q=80",
    description: "Double diaphragm spring brake actuator for trailers.",
    labels: ["Brakes", "Safety"]
  }
];

const grid = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");

// BLOQUE B: Función Arrow para dibujar las Cards
const render = (list) => {
  grid.innerHTML = list.map(({ name, price, image, description, labels }) => {
    
    // Labels con diseño de "píldora" (rounded-full)
    const badges = labels.map(label => 
      `<span class="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs px-2.5 py-0.5 rounded-full font-medium">${label}</span>`
    ).join("");

    // Estructura clásica de Card: overflow-hidden para recortar las esquinas de la foto + sombra
    return `
      <div class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:border-blue-500 hover:-translate-y-1 transition duration-200 flex flex-col">
        <img src="${image}" alt="${name}" class="h-44 w-full object-cover">
        <div class="p-5 flex flex-col flex-grow">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-bold text-white">${name}</h3>
            <span class="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2 py-1 rounded">${price}</span>
          </div>
          <p class="text-gray-400 text-sm mb-4 flex-grow">${description}</p>
          <div class="flex flex-wrap gap-1.5 pt-3 border-t border-gray-700/60">${badges}</div>
        </div>
      </div>
    `;
  }).join("");
};

// BLOQUE C: Búsqueda inmediata al escribir
searchInput.addEventListener("input", (e) => {
  const text = e.target.value.toLowerCase();

  const filtered = items.filter(({ name, description, labels }) => 
    name.toLowerCase().includes(text) || 
    description.toLowerCase().includes(text) ||
    labels.some(l => l.toLowerCase().includes(text))
  );

  render(filtered);
});

render(items);