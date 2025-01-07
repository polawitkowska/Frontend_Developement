"use client";
import React, { useState, useEffect } from "react";
import styles from "./compare.module.css";
import Navigation from "../components/Navigation";

export default function Compare() {
  const [compare, setCompare] = useState([]);

  return (
    <>
      <header className={styles.header}>
        <Navigation />
        <h1>Porównaj dwa pokemony</h1>
      </header>
      <main className={styles.main}> </main>
    </>
  );
}
