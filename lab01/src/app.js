async function fetchPokemonList() {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    if (!response.ok) {
      throw new Error(
        `Nie udało się pobrać danych o pokemonach, status: ${response.status}`
      );
    }
    const list = await response.json();
    return list["results"].map((pokemon) => pokemon.name);
  } catch (error) {
    console.error("Wystąpił błąd: ", error);
  }
}

async function fetchPokemon(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    if (!response.ok) {
      throw new Error(
        `Nie udało się pobrać danych o pokemonie, status: ${response.status}`
      );
    } else {
      const pokemon = await response.json();
      const result = {
        name: pokemon.name,
        id: pokemon.id,
        form: pokemon.forms.map((form) => form.url),
        types: pokemon.types.map((type) => type.type.name),
        // abilities: pokemon.abilities.map((ability) => ability.ability.name),
        base_stats: pokemon.stats.map((stat) => stat.base_stat),
        height: pokemon.height,
        weight: pokemon.weight,
        image: pokemon.sprites.front_default,
      };

      return result;
    }
  } catch (error) {
    console.error("Wystąpił błąd: ", error);
  }
}

async function displayPokemonList() {
  const pokemonListElement = document.getElementById("pokemon-list");
  const pokemonList = await fetchPokemonList();

  pokemonListElement.innerHTML = "";

  pokemonList.forEach((pokemon) => {
    const listItem = document.createElement("li");
    listItem.textContent = pokemon;
    listItem.addEventListener("click", () => displayPokemonDetails(pokemon));
    pokemonListElement.appendChild(listItem);
  });
}

async function displayPokemonDetails(pokemonName) {
  const pokemonDetailsElement = document.getElementById("details");
  const pokemon = await fetchPokemon(pokemonName);

  pokemonDetailsElement.innerHTML = `
        <h2>Szczegóły</h2>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <h3>${pokemon.name}</h3>
        <p>Id: ${pokemon.id}</p>
        <p>Types: ${pokemon.types.join(", ")}</p>
        <p>Base stats: ${pokemon.base_stats.join(", ")}</p>
        <p>Height: ${pokemon.height} dm</p>
        <p>Weight: ${pokemon.weight} hg</p>        
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  displayPokemonList();
});

// const pokemon = fetchPokemon("charizard").then((result) => console.log(result));