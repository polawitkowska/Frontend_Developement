"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import List from "./components/PokemonList";
import Details from "./components/PokemonDetails";
import Navigation from "./components/Navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialLimit = parseInt(searchParams.get("limit")) || 20;

  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(initialLimit);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
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
  }, [limit]);

  const updateURL = (searchTerm, newLimit) => {
    const params = new URLSearchParams();

    if (newLimit) params.set("limit", newLimit);

    router.push(`?${params.toString()}`);
  };

  const handlePokemonSelect = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const searchedName = event.target.value.toLowerCase();
      if (searchedName) {
        setSelectedPokemon(event.target.value);
      } else {
        setSelectedPokemon("");
      }
    }
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    setLimit(newLimit);
    updateURL(searchTerm, newLimit);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
        <h1>Pokemony</h1>
        <input
          className={styles.search}
          type="text"
          placeholder="Wyszukaj"
          onKeyDown={handleSearch}
        />
        <select>
          <option value="">Typy</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          className={styles.limit}
          type="number"
          min="1"
          max="100"
          value={limit}
          onChange={handleLimitChange}
          placeholder="Limit"
        />
      </header>
      <main className={styles.main}>
        <List onPokemonSelect={handlePokemonSelect} limit={limit} />
        <Details pokemonName={selectedPokemon} />
      </main>
    </div>
  );
}
