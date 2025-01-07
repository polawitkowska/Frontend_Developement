"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function List({ onPokemonSelect, selectedType, limit }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
        );
        if (!response.ok) {
          throw new Error(
            `Nie udało się pobrać danych o pokemonach, status: ${response.status}`
          );
        }
        const data = await response.json();
        const results = data.results;

        const pokemonsWithTypes = await Promise.all(
          results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              types: details.types.map((typeInfo) => typeInfo.type.name),
            };
          })
        );

        const filteredPokemons = selectedType
          ? selectedType === "Typy"
            ? results
            : pokemonsWithTypes.filter((pok) =>
                pok.types.includes(selectedType)
              )
          : results;

        setPokemonList(filteredPokemons);
      } catch (error) {
        console.error("Wystąpił błąd: ", error);
      }
    }
    fetchPokemonList();
  }, [selectedType, limit]);

  return (
    <div className={styles.list}>
      <h2>Lista Pokemonów</h2>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index} onClick={() => onPokemonSelect(pokemon.name)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
