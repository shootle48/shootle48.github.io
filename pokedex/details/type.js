const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type");

if (type) {
  const typeElement = document.getElementById("type");
  typeElement.innerText = type;
  typeElement.classList.add(
    `bg-${type}`,
    "text-white",
    "text-2xl" ,
    "px-2",
    "py-1",
    "rounded",
    "mb-6"
  );
  fetch(`https://pokeapi.co/api/v2/type/${type}`)
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
            pokemonListElement.innerHTML += `
                    <div class='flex flex-col justify-evenly items-center border-2 border-amber-300 rounded-lg min-h-96 w-60'>
                      <div class='text-2xl'>${pokemonName}</div>
                      <div><img class='w-min h-[90px]' src='${spriteUrl}' alt='Not Found'></div>
                      <div>${typesHTML}</div>
                      <a href='index.html?name=${pokemonName}' class='btn btn-primary text-slate-300'>More Info</a>
                    </div>
            `;
          })
          .catch((err) => console.error("Error fetching Pokémon data:", err));
      });
    })
    .catch((err) => console.error("Error fetching Pokémon type data:", err));
}
