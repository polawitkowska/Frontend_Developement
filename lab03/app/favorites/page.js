"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./favorites.module.css";
import Navigation from "../components/Navigation";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
        <h1>Ulubione</h1>
      </header>
      <main className={styles.main}>
        <h2>Lista ulubionych Pokemonów</h2>
        {favorites.length === 0 ? (
          <p>Brak ulubionych Pokémonów.</p>
        ) : (
          <ul>
            {favorites.map((pokemon) => (
              <li key={pokemon.id}>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>Id: {pokemon.id}</p>
                <p>Typy: {pokemon.types}</p>
                <p>Statystyki bazowe: {pokemon.base_stats}</p>
                <p>Wzrost: {pokemon.height}</p>
                <p>Waga: {pokemon.weight}</p>
                <button onClick={() => removeFavorite(pokemon.id)}>
                  Usuń z ulubionych
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
