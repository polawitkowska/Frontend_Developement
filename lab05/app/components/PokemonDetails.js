"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import NotesForm from "./NotesForm";

export default function Details({ pokemonName }) {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [notification, setNotification] = useState("");
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [existingNotes, setExistingNotes] = useState({});

  async function fetchPokemonDetails() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      if (!response.ok) {
        showNotification(`Nie udało się znaleźć pokemona o podanej nazwie`);
        setPokemonDetails({});
        return;
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

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  }

  useEffect(() => {
    if (pokemonName) {
      fetchPokemonDetails();
    }
  }, [pokemonDetails.id, pokemonName]);

  useEffect(() => {
    const loadNotes = () => {
      const notes = JSON.parse(localStorage.getItem("pokemonNotes") || "{}");
      setExistingNotes(notes);
    };
    loadNotes();
  }, [pokemonDetails.id, pokemonName]);

  function handleFavorite(pokemon) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isAlreadyFavorite = favorites.find((fav) => fav.id === pokemon.id);
    if (!isAlreadyFavorite) {
      favorites.push(pokemon);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      showNotification(`${pokemon.name} został dodany do ulubionych!`);
    } else {
      showNotification(`${pokemon.name} jest już w ulubionych.`);
    }
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

  function renderNotes(notes) {
    return notes.map((note, index) => (
      <div key={index} className={styles.noteCard}>
        <p>Taktyka: {note.taktyka}</p>
        <p>Strategia: {note.strategia}</p>
        <p>Warunki: {note.warunki}</p>
        <p>Data utworzenia: {new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    ));
  }

  if (!pokemonName) {
    return (
      <div className={styles.details}>
        <h3>Wybierz Pokemona, aby zobaczyć szczegóły.</h3>
      </div>
    );
  } else {
    return (
      <>
        <div className={styles.details}>
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
          <button onClick={() => handleCompare(pokemonDetails)}>
            Dodaj do porównania
          </button>
          {notification && (
            <div className={styles.notification}>{notification}</div>
          )}
          <button onClick={() => setShowNotesForm(true)}>
            Nowa notatka treningowa
          </button>
        </div>
        {showNotesForm && (
          <div className={styles.overlay}>
            <button
              className={styles.closeButton}
              onClick={() => setShowNotesForm(false)}
            >
              x
            </button>
            <NotesForm pokemonId={pokemonDetails.id} />
          </div>
        )}
        {existingNotes[pokemonDetails.id] && (
          <div className={styles.pokemonNotes}>
            <h3>Notatki treningowe:</h3>
            {renderNotes(existingNotes[pokemonDetails.id])}
          </div>
        )}
      </>
    );
  }
}
