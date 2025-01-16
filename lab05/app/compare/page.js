"use client";
import React, { useState, useEffect } from "react";
import styles from "./compare.module.css";
import Navigation from "../components/Navigation";

export default function Compare() {
  const [compare, setCompare] = useState([]);
  const [notification, setNotification] = useState("");
  const selectedType = null;
  const limit = null;

  useEffect(() => {
    const storedCompare = JSON.parse(localStorage.getItem("compare")) || [];
    setCompare(storedCompare);
  }, [selectedType, limit]);

  const removeCompare = (pokemon) => {
    const updatedCompare = compare.filter((pok) => pok.id !== pokemon.id);
    setCompare(updatedCompare);
    localStorage.setItem("compare", JSON.stringify(updatedCompare));
    showNotification(`${pokemon.name} został usunięty z porównywarki.`);
  };

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  }

  return (
    <>
      <header className={styles.header}>
        <Navigation />
        <h1>Porównaj dwa pokemony</h1>
      </header>
      <main className={styles.main}>
        {compare.length === 0 ? (
          <div className={styles.noCompare}>Brak Pokemonów w porównywarce.</div>
        ) : (
          <div className={styles.compared}>
            {compare.map((pokemon) => (
              <div className={styles.element} key={pokemon.id}>
                <h3>{pokemon.name}</h3>
                <img src={pokemon.image} alt={pokemon.name} />
                <p>Id: {pokemon.id}</p>
                <p>Typy: {pokemon.types}</p>
                <p>Statystyki bazowe: {pokemon.base_stats}</p>
                <p>Wzrost: {pokemon.height}</p>
                <p>Waga: {pokemon.weight}</p>
                <button onClick={() => removeCompare(pokemon)}>
                  Usuń z porównania
                </button>
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
