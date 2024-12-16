"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function List({ onPokemonSelect }) {
  const [pokemonList, setPokemonList] = useState([]);

  async function fetchPokemonList() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
      if (!response.ok) {
        throw new Error(
          `Nie udało się pobrać danych o pokemonach, status: ${response.status}`
        );
      }
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error("Wystąpił błąd: ", error);
    }
  }

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div className="list">
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
