"use client";
import React, { useState, useEffect } from "react";
import styles from "./favorites.module.css";
import Navigation from "../components/Navigation";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [expandedPokemonIds, setExpandedPokemonIds] = useState([]);
  const limit = null;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [limit]);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const showDetails = (id) => {
    setExpandedPokemonIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <header className={styles.header}>
        <Navigation />
        <h1>Lista ulubionych Pokemonów</h1>
      </header>
      <main className={styles.main}>
        {favorites.length === 0 ? (
          <div className={styles.noFavorites}>Brak ulubionych Pokemonów.</div>
        ) : (
          <div className={styles.favorites}>
            {favorites.map((pokemon) => (
              <div className={styles.element} key={pokemon.id}>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>Id: {pokemon.id}</p>

                <button onClick={() => showDetails(pokemon.id)}>
                  {expandedPokemonIds.includes(pokemon.id)
                    ? "Schowaj szczegóły"
                    : "Pokaż szczegóły"}
                </button>
                <button onClick={() => removeFavorite(pokemon.id)}>
                  Usuń z ulubionych
                </button>

                {expandedPokemonIds.includes(pokemon.id) && (
                  <div className={styles.additionalDetails}>
                    <p>Typy: {pokemon.types}</p>
                    <p>Statystyki bazowe: {pokemon.base_stats}</p>
                    <p>Wzrost: {pokemon.height}</p>
                    <p>Waga: {pokemon.weight}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
