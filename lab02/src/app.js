let pokemonList = [];
let selectedPokemon = null;

async function fetchPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=151");
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
      throw new Error("Nie znaleziono Pokemona");
    }
    const data = await response.json();
    selectedPokemon = {
      name: data.name,
      id: data.id,
      image: data.sprites.front_default,
      types: data.types.map((type) => type.type.name),
      base_stats: data.stats.map(
        (stat) => `${stat.stat.name}: ${stat.base_stat}`
      ),
      height: data.height,
      weight: data.weight,
    };
    document.getElementById("error").innerHTML = ``;
    renderApp();
  } catch (error) {
    document.getElementById("error").innerHTML = `<p>${error.message}</p>`;
    selectedPokemon = null;
    renderApp();
  }
}

const List = ({ pokemonList }) => {
  return (
    <div id="list">
      <h2>Lista pokemonów</h2>
      <ul id="pokemon-list-element"></ul>
    </div>
  );
};

const Details = ({ selectedPokemon }) => {
  return (
    <div id="details">
      <h2>Szczegóły</h2>
    </div>
  );
};

ReactDOM.render(
  <List pokemonList={pokemonList} />,
  document.getElementById("pokemon-list")
);
ReactDOM.render(<Details />, document.getElementById("pokemon-details"));
