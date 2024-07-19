const urlParams = new URLSearchParams(window.location.search);
const ability = urlParams.get("ability");

if (ability) {
  const abilityElement = document.getElementById("ability");
  abilityElement.innerText = ability;
  abilityElement.classList.add(
    "bg-[#60a5fa]",
    "text-white",
    "px-2",
    "py-1",
    "rounded"
  );

  fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
    .then((res) => res.json())
    .then((data) => {
      const pokemonList = data.pokemon.map((p) => p.pokemon);
      const pokemonListElement = document.getElementById("pokemon-list");

      pokemonList.forEach((pokemon) => {
        const pokemonName = pokemon.name;

        // Fetch each Pokémon's details to get the image and other information
        fetch(pokemon.url)
          .then((res) => res.json())
          .then((pokemonData) => {
            const id = pokemonData.id;
            const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;

            const types = pokemonData.types.map(
              (typeInfo) => typeInfo.type.name
            );
            let typesHTML = types
              .map(
                (type) =>
                  `<span class="bg-${type} text-white px-2 py-1 rounded" style="background-color: ${calculateTypeColor(
                    type
                  )};">${type}</span>`
              )
              .join(" ");
            const borderColor = calculateTypeColor(types[0]);
            pokemonListElement.innerHTML += `
                          <div class='flex flex-col justify-evenly items-center border-2 rounded-lg min-h-96 min-w-60' style='border-color: ${borderColor};'>
                              <div class='text-2xl'>${pokemonName}</div>
                              <div><img class='w-min h-[90px]' src='${spriteUrl}' alt='Card image cap'></div>
                              <div>${typesHTML}</div>
                              <a href='index.html?name=${pokemonName}' class='btn btn-primary text-slate-300'>More Info</a>
                          </div>
                        `;
          })
          .catch((err) => console.error("Error fetching Pokémon data:", err));
      });
    })
    .catch((err) => console.error("Error fetching Pokémon ability data:", err));
}

function calculateTypeColor(type) {
  const typeColors = {
    normal: "#a9a878",
    fire: "#f07f2f",
    water: "#6890f0",
    electric: "#f8d030",
    grass: "#78c84f",
    ice: "#98d8d8",
    fighting: "#c02f29",
    poison: "#a040a1",
    ground: "#e0c069",
    flying: "#9781d7",
    psychic: "#f85888",
    bug: "#a8b821",
    rock: "#b7a038",
    ghost: "#705798",
    dragon: "#7038f9",
    dark: "#6f5848",
    steel: "#b8b8d0",
    fairy: "#f1b6bc",
  };

  return typeColors[type] || "#000"; // Fallback to black if type is not found
}
