"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import List from "./components/PokemonList";
import Details from "./components/PokemonDetails";
import Navigation from "./components/Navigation";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);

  async function fetchTypes() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type/");
      if (!response.ok) {
        throw new Error(
          `Nie udało się pobrać typów, status: ${response.status}`
        );
      }
      const data = await response.json();
      setTypes(data.results);
    } catch (error) {
      console.error("Wystąpił błąd podczas pobierania typów: ", error);
    }
  }

  useEffect(() => {
    fetchTypes();
  }, []);

  const handlePokemonSelect = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const searchedName = event.target.value.toLowerCase();
      if (searchedName) {
        setSelectedPokemon(searchedName);
      }
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
        <h1>Pokemony</h1>
        <input type="text" placeholder="Wyszukaj" onKeyDown={handleSearch} />
        <select>
          <option value="">Typy</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </header>
      <main className={styles.main}>
        <List onPokemonSelect={handlePokemonSelect} />
        <Details pokemonName={selectedPokemon} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
