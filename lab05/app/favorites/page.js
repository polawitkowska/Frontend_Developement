"use client";
import React, { useState, useEffect } from "react";
import styles from "./favorites.module.css";
import Navigation from "../components/Navigation";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [expandedPokemonIds, setExpandedPokemonIds] = useState([]);
  const [notification, setNotification] = useState("");

  const selectedType = null;
  const limit = null;

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [selectedType, limit]);

  const removeFavorite = (pokemon) => {
    const updatedFavorites = favorites.filter((pok) => pok.id !== pokemon.id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    showNotification(`${pokemon.name} został usunięty z ulubionych.`);
  };

  const showDetails = (id) => {
    setExpandedPokemonIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  }

  function handleCompare(pokemon) {
    const compare = JSON.parse(localStorage.getItem("compare")) || [];
    const isAlreadyCompared = compare.find((pok) => pok.id === pokemon.id);
    if (!isAlreadyCompared && compare.length < 2) {
      compare.push(pokemon);
      localStorage.setItem("compare", JSON.stringify(compare));
      showNotification(`${pokemon.name} został dodany do porównywarki!`);
    } else if (!isAlreadyCompared && compare.length >= 2) {
      showNotification(`W porównywarce są już dwa pokemony!`);
    } else {
      showNotification(`${pokemon.name} jest już w porównywarce.`);
    }
  }

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
                <button onClick={() => removeFavorite(pokemon)}>
                  Usuń z ulubionych
                </button>
                <button onClick={() => handleCompare(pokemon)}>
                  Dodaj do porównania
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
        {notification && (
          <div className={styles.notification}>{notification}</div>
        )}
      </main>
    </>
  );
}
