"use client";
import React, { useState, useEffect } from "react";
import styles from "./compare.module.css";
import Navigation from "../components/Navigation";

export default function Compare() {
  const [compare, setCompare] = useState([]);
  const selectedType = null;
  const limit = null;

  useEffect(() => {
    const storedCompare = JSON.parse(localStorage.getItem("compare")) || [];
    setCompare(storedCompare);
  }, [selectedType, limit]);

  const removeCompare = (id) => {
    const updatedCompare = compare.filter((pokemon) => pokemon.id !== id);
    setCompare(updatedCompare);
    localStorage.setItem("compare", JSON.stringify(updatedCompare));
  };

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
                <button onClick={() => removeCompare(pokemon.id)}>
                  Usuń z porównania
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
