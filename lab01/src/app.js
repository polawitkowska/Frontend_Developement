async function fetchPokemonList() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
        if (!response.ok) {
            throw new Error(`Nie udało się pobrać danych o pokemonach, status: ${response.status}`);
        }
        const list = await response.json();
        return list['results'].map(pokemon => pokemon.name);
    } catch (error) {
        console.error('Wystąpił błąd: ', error);
    }  
}

async function fetchPokemon(name) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
        if (!response.ok) {
            throw new Error(`Nie udało się pobrać danych o pokemonie, status: ${response.status}`);
        }
        const pokemon = await response.json();
        const result = {
            name: pokemon.name,
            types: pokemon.types.map(type => type.type.name),
            abilities: pokemon.abilities.map(ability => ability.ability.name),
            base_experience: pokemon.base_experience,
            height: pokemon.height,
            weight: pokemon.weight,
        }
        return result;
    } catch (error) {
        console.error('Wystąpił błąd: ', error);
    }  
}

document.addEventListener('DOMContentLoaded', function general() {
    document.getElementById("search").addEventListener("click", fetchPokemon)
})

// fetchPokemonList().then(list => console.log(list));
// fetchPokemon('charizard').then(pokemon => console.log(pokemon));
general();