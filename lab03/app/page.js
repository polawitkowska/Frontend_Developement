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

  const initialSearch = searchParams.get("search") || "";
  const initialType = searchParams.get("type") || "";
  const initialLimit = parseInt(searchParams.get("limit")) || 20;

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedType, setSelectedType] = useState(initialType);
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
  }, []);

  const updateURL = (newSearchTerm, newType, newLimit) => {
    const params = new URLSearchParams();

    if (newSearchTerm) params.set("search", newSearchTerm);
    if (newType) params.set("type", newType);
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

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    setSelectedType(newType);
    updateURL(searchTerm, newType, limit);
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    setLimit(newLimit);
    updateURL(searchTerm, selectedType, newLimit);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
        <h1>Pokemony</h1>
        <input type="text" placeholder="Wyszukaj" onKeyDown={handleSearch} />
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">Typy</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          max="100"
          value={limit}
          onChange={handleLimitChange}
          placeholder="Limit"
        />
      </header>
      <main className={styles.main}>
        <List
          onPokemonSelect={handlePokemonSelect}
          searchTerm={searchTerm}
          selectedType={selectedType}
          limit={limit}
        />
        <Details pokemonName={selectedPokemon} />
      </main>
    </div>
  );
}
