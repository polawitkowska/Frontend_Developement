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
        let results = data.results;

        setPokemonList(results);
      } catch (error) {
        console.error("Wystąpił błąd: ", error);
      }
    }
    fetchPokemonList();
  }, [limit]);

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
