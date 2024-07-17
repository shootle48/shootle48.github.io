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
                  `<span class="bg-${type} text-white px-2 py-1 rounded">${type}</span>`
              )
              .join(" ");

            const pokemonElement = document.createElement("div");
            pokemonElement.classList.add(
              "flex",
              "flex-col",
              "justify-evenly",
              "items-center",
              "border-2",
              "border-amber-300",
              "rounded-lg",
              "min-h-96",
              "min-w-60"
            );

            pokemonElement.innerHTML = `
                            <div class='text-2xl'>${pokemonName}</div>
                            <div><img class='w-min h-[90px]' src='${spriteUrl}' alt='Card image cap'></div>
                            <div>${typesHTML}</div>
                            <a href='index.html?name=${pokemonName}' class='btn btn-primary text-slate-300'>More Info</a>
                        `;

            pokemonListElement.appendChild(pokemonElement);
          })
          .catch((err) => console.error("Error fetching Pokémon data:", err));
      });
    })
    .catch((err) => console.error("Error fetching Pokémon ability data:", err));
}
