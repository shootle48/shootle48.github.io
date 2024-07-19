const limit = 20;
let offset = 0;
let totalCount = 0;

function fetchTotalPokemon() {
  return fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((data) => data.count);
}

function fetchPokemon() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => {
      const datas = data.results;
      const ele = document.getElementById("name");

      datas.forEach((element, index) => {
        const id = data.id
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
          offset + index + 1
        }.gif`;

        fetch(element.url)
          .then((res) => res.json())
          .then((data) => {
            const types = data.types.map((typeInfo) => typeInfo.type.name);
            const name = data.name;

            let typesHTML = types
              .map(
                (type) =>
                  `<span class="bg-${type} text-slate-200 px-2 py-1 rounded">${type}</span>`
              )
              .join(" ");

            // Get the border color based on the first type
            const borderColor = calculateTypeColor(types[0]);

            ele.innerHTML += `
              <div class='flex flex-col justify-evenly items-center border-2 rounded-lg min-h-96 min-w-60' style='border-color: ${borderColor};'>
                <div class='text-2xl'>${name}</div>
                <div><img class='w-min h-[90px]' src='${img}' alt='Not Found'></div>
                <div>${typesHTML}</div>
                <a href='details/index.html?name=${name}' class='btn btn-primary text-slate-300'>More Info</a>
              </div>
            `;
          })
          .catch((err) => console.error(err));
      });

      offset += limit;
      if (offset >= totalCount) {
        document.getElementById("loadMore").style.display = "none";
      }
    })
    .catch((err) => console.error(err));
}

// Initial fetch to get total Pokémon count and set up first batch
fetchTotalPokemon().then((count) => {
  totalCount = count;
  fetchPokemon();
});

document.getElementById("loadMore").addEventListener("click", () => {
  fetchPokemon();
});

// Function to get color for the type
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
