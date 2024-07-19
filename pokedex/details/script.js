const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");

function updatePokemonInfo(data) {
  const id = data.id;
  const height = data.height;
  const weight = data.weight;
  const types = data.types
    .map((typeInfo) => {
      const typeName = typeInfo.type.name;
      return `<a href="type.html?type=${typeName}" class="bg-${typeName} text-white px-2 py-1 rounded">${typeName}</a>`;
    })
    .join(" ");
  const abilities = data.abilities
    .map((abilityInfo) => {
      const abilityName = abilityInfo.ability.name;
      return `<a href="ability.html?ability=${abilityName}" class="bg-[#3b82f6] px-2 py-1 text-white rounded">${abilityName}</a>`;
    })
    .join(" ");
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
  const stats = data.stats
    .map((statInfo) => {
      const statName = statInfo.stat.name;
      const statValue = statInfo.base_stat;
      const normalizedWidth = Math.min(statValue, 200); // Normalize width to max 200%
      return `<div>${statName}: <div class="stat-bar"><div class="stat-fill" style="width: ${normalizedWidth}%;"></div></div></div>`;
    })
    .join("");
  document.getElementById("sprite").src = spriteUrl;
  const nameElement = document.getElementById("name");
  nameElement.innerText = data.name;
  nameElement.dataset.id = id;
  document.getElementById("height").innerText = `${height / 10} meters`; // height in meters
  document.getElementById("weight").innerText = `${weight / 10} kg`; // weight in kilograms
  document.getElementById("types").innerHTML = types;
  document.getElementById("abilities").innerHTML = abilities;
  document.getElementById("stats").innerHTML = stats;

  // Update buttons
  document.getElementById("prevButton").disabled = id === 1;
  document.getElementById("nextButton").disabled = id === 1010; // Assuming there are 1010 Pokémon
}

function fetchPokemonByName(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((res) => res.json())
    .then((data) => {
      updatePokemonInfo(data);
    })
    .catch((err) => console.error("Error fetching Pokémon data:", err));
}

if (name) {
  fetchPokemonByName(name);
}

document.getElementById("prevButton").addEventListener("click", () => {
  const currentId = parseInt(document.getElementById("name").dataset.id, 10);
  if (currentId > 1) {
    fetchPokemonById(currentId - 1);
  }
});

document.getElementById("nextButton").addEventListener("click", () => {
  const currentId = parseInt(document.getElementById("name").dataset.id, 10);
  fetchPokemonById(currentId + 1);
});

function fetchPokemonById(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
      updatePokemonInfo(data);
      const url = new URL(window.location);
      url.searchParams.set("name", data.name);
      window.history.pushState({}, "", url);
    })
    .catch((err) => console.error("Error fetching Pokémon data:", err));
}
