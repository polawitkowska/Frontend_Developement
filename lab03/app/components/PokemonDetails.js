"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function Details({ pokemonName }) {
  const [pokemonDetails, setPokemonDetails] = useState({});

  async function fetchPokemonDetails() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        throw new Error(
          `Nie udało się pobrać danych, status: ${response.status}`
        );
      }
      const data = await response.json();
      setPokemonDetails({
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        types: data.types.map((type) => type.type.name).join(", "),
        base_stats: data.stats.map((stat) => `${stat.base_stat}`).join(", "),
        height: data.height,
        weight: data.weight,
      });
    } catch (error) {
      console.error("Wystąpił błąd: ", error);
    }
  }

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonDetails();
    }
  }, [pokemonName]);

  function handleFavorite(pokemon) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.find((fav) => fav.id === pokemon.id);
    if (!isAlreadyFavorite) {
      favorites.push(pokemon);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${pokemon.name} dodany do ulubionych!`);
    } else {
      alert(`${pokemon.name} jest już w ulubionych.`);
    }
  }

  if (!pokemonName) {
    return (
      <div className="details">
        <h3>Wybierz Pokemona, aby zobaczyć szczegóły.</h3>
      </div>
    );
  } else {
    return (
      <div className="details">
        <h2>Szczegóły</h2>
        <h3>{pokemonDetails.name}</h3>
        <img src={pokemonDetails.image} alt={pokemonDetails.name} />
        <p>Id: {pokemonDetails.id}</p>
        <p>Typy: {pokemonDetails.types}</p>
        <p>Statystyki bazowe: {pokemonDetails.base_stats}</p>
        <p>Wzrost: {pokemonDetails.height}</p>
        <p>Waga: {pokemonDetails.weight}</p>
        <button onClick={() => handleFavorite(pokemonDetails)}>
          Dodaj do ulubionych
        </button>
      </div>
    );
  }
}
