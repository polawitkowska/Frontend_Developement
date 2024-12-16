"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import List from "./components/PokemonList";
import Details from "./components/PokemonDetails";
import Navigation from "./components/Navigation";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handlePokemonSelect = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  function handleSearch(event) {
    if (event.key === "Enter") {
      const searchedName = event.target.value.toLowerCase();
      if (searchedName) {
        setSelectedPokemon(searchedName);
      }
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
        <h1>Pokemony</h1>
        <input type="text" placeholder="Wyszukaj" onKeyPress={handleSearch} />
      </header>
      <main className={styles.main}>
        <List onPokemonSelect={handlePokemonSelect} />
        <Details pokemonName={selectedPokemon} />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
