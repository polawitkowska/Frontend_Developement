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
        } else {
            const pokemon = await response.json();
            const result = {
                name: pokemon.name,
                types: pokemon.types.map(type => type.type.name),
                abilities: pokemon.abilities.map(ability => ability.ability.name),
                base_experience: pokemon.base_experience,
                height: pokemon.height,
                weight: pokemon.weight
            }

            const pokemonDetailsElement = document.getElementById('Szczegoly');
            pokemonDetailsElement.innerHTML = `
            <h3>${pokemon.name}</h3>
            <p>Typy: ${pokemon.types.join(', ')}</p>
            <p>Umiejętności: ${pokemon.abilities.join(', ')}</p>
            <p>Doświadczenie bazowe: ${pokemon.base_experience}</p>
            <p>Wzrost: ${pokemon.height} dm</p>
            <p>Waga: ${pokemon.weight} hg</p>
            `;
        }
    } catch (error) {
        console.error('Wystąpił błąd: ', error);
    }  
}

document.getElementById("search").onclick = fetchPokemon('charizard')

// function displayPokemonList(pokemonList) {
//     const pokemonListElement = document.getElementById('pokemon-list');
//     pokemonListElement.innerHTML = '';
//     pokemonList.forEach(pokemon => {
//         const listItem = document.createElement('li');
//         listItem.textContent = pokemon;
//         listItem.addEventListener('click', () => displayPokemonDetails(pokemon));
//         pokemonListElement.appendChild(listItem);
//     });
// }



// fetchPokemonList().then(list => console.log(list));
// fetchPokemon('charizard').then(pokemon => console.log(pokemon));