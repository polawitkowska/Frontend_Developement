let pokemonList = [];
let selectedPokemon = null;

async function fetchPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
  const data = await response.json();
  pokemonList = data.results;
  renderApp();
}

async function fetchPokemonDetails(pokemonName) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    if (!response.ok) {
      throw new Error("Wystąpił błąd");
    }
    const data = await response.json();
    selectedPokemon = {
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,
      types: data.types.map((type) => type.type.name),
      base_stats: data.stats.map((stat) => `${stat.base_stat}`),
      height: data.height,
      weight: data.weight,
    };
    document.getElementById("error").innerHTML = ``;
    renderApp();
  } catch (error) {
    document.getElementById(
      "error"
    ).innerHTML = `<p id="showError">${error.message}</p>`;
    selectedPokemon = null;
    renderApp();
  }
}

const List = ({ pokemonList, onPokemonSelect }) => {
  return (
    <div id="pokemon-list">
      <h2>Lista pokemonów</h2>
      <ul id="pokemon-list-element">
        {pokemonList.map((pokemon, index) => (
          <li key={index} onClick={() => onPokemonSelect(pokemon.name)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Details = ({ pokemon }) => {
  if (!pokemon) {
    return (
      <div id="empty-details">
        <h2>Szczegóły</h2>
        <p>Wybierz Pokemona z listy.</p>
      </div>
    );
  }
  return (
    <div id="pokemon-details">
      <div id="details">
        <h2>Szczegóły</h2>
        <img src={pokemon.image} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
        <p>Id: {pokemon.id}</p>
        <p>Typy: {pokemon.types.join(", ")}</p>
        <p>Statystyki bazowe: {pokemon.base_stats.join(", ")}</p>
        <p>Wzrost: {pokemon.height}</p>
        <p>Waga: {pokemon.weight}</p>
      </div>
    </div>
  );
};

function handleSearch(event) {
  if (event.key === "Enter") {
    const pokemonName = event.target.value.toLowerCase();
    if (pokemonName) {
      fetchPokemonDetails(pokemonName);
    } else {
      selectedPokemon = null;
      document.getElementById("error").innerHTML = ``;
      renderApp();
    }
  }
}

const App = () => {
  return (
    <>
      <header>
        <h1>Pokemony</h1>
        <div className="search">
          <input
            type="text"
            id="search"
            placeholder="Wyszukaj"
            onKeyPress={handleSearch}
          />
        </div>
      </header>
      <div className="elements">
        <List pokemonList={pokemonList} onPokemonSelect={fetchPokemonDetails} />
        <Details pokemon={selectedPokemon} />
      </div>
      <div id="error"></div>
    </>
  );
};

function renderApp() {
  ReactDOM.render(<App />, document.getElementById("app"));
}

fetchPokemonList();
