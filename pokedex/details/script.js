const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");

if (name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
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
      document.getElementById("name").innerText = name;
      document.getElementById("height").innerText = `${height / 10} meters`; // height in meters
      document.getElementById("weight").innerText = `${weight / 10} kg`; // weight in kilograms
      document.getElementById("types").innerHTML = types;
      document.getElementById("abilities").innerHTML = abilities;
      document.getElementById("stats").innerHTML = stats;
    })
    .catch((err) => console.error("Error fetching Pokémon data:", err));
}
