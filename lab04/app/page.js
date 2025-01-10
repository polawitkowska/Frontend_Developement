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

  const initialType = searchParams.get("type") || "";
  const initialLimit = parseInt(searchParams.get("limit")) || 20;
  const initialFilters = searchParams.get("filters") || [];

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(initialType);
  const [limit, setLimit] = useState(initialLimit);
  const [filters, setFilters] = useState(initialFilters);

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
  }, [selectedType, limit]);

  const updateURL = (newType, newLimit) => {
    const params = new URLSearchParams();

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
    const selectedType = event.target.value;
    if (selectedType && selectedType !== "all") {
      setFilters((prevFilters) => {
        if (!prevFilters.includes(selectedType)) {
          const updatedFilters = [...prevFilters, selectedType];
          localStorage.setItem("filters", JSON.stringify(updatedFilters));
          return updatedFilters;
        }
        return prevFilters;
      });
    }
  };

  const removeFilter = (filter) => {
    const filters = JSON.parse(localStorage.getItem("filters")) || [];
    const updatedFilters = filters.filter((fil) => fil !== filter);
    setFilters(updatedFilters);
    localStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  const handleLimitChange = (event) => {
    const newLimit = event.target.value;
    if (newLimit < 100) {
      setLimit(newLimit);
      updateURL(selectedType, newLimit);
    } else {
      setLimit(100);
      updateURL(selectedType, 100);
    }
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
        <select onChange={handleTypeChange}>
          <option value="">Typy</option>
          <option>all</option>
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
        />

        {filters.length > 0 ? (
          <div className={styles.filters}>
            {filters.map((fil) => (
              <div key={fil}>
                {fil}
                <button
                  onClick={() => removeFilter(fil)}
                  className={styles.removeButton}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </header>
      <main className={styles.main}>
        <List
          onPokemonSelect={handlePokemonSelect}
          selectedType={selectedType}
          limit={limit}
        />
        <Details pokemonName={selectedPokemon} />
      </main>
    </div>
  );
}
