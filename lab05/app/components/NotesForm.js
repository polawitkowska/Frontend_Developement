"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function NotesForm({ pokemonId }) {
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

  const handleSubmit = (values, pokemonId) => {
    const existingNotes = JSON.parse(
      localStorage.getItem("pokemonNotes") || "{}"
    );
    const newNote = {
      ...values,
      pokemonId,
      createdAt: new Date().toISOString(),
    };

    if (!existingNotes[pokemonId]) {
      existingNotes[pokemonId] = [];
    }
    existingNotes[pokemonId].push(newNote);
    localStorage.setItem("pokemonNotes", JSON.stringify(existingNotes));

    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik({
    initialValues: {
      taktyka: "",
      strategia: "",
      skutecznosc: "",
      warunki: "",
      data: "",
      przeciwnicy: "",
    },
    validationSchema: Yup.object({
      taktyka: Yup.string()
        .min(5, "Nazwa taktyki musi mieć od 5 do 50 znaków")
        .max(50, "Nazwa taktyki musi mieć od 5 do 50 znaków")
        .required("Required"),
      strategia: Yup.string()
        .min(10, "Opis strategii musi mieć minimum 10 znaków")
        .required("Required"),
      warunki: Yup.string().min(
        10,
        "Warunki użycia muszą mieć minimum 10 znaków"
      ),
      data: Yup.date(),
    }),
    onSubmit: (values) => {
      handleSubmit(values, pokemonId);
    },
  });

  return (
    <div className={styles.notesForm}>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="taktyka">Nazwa taktyki</label>
        <input
          id="taktyka"
          name="taktyka"
          type="text"
          className={styles.element}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.taktyka}
        />
        {formik.touched.taktyka && formik.errors.taktyka ? (
          <div className={styles.error}>{formik.errors.taktyka}</div>
        ) : null}

        <label htmlFor="strategia">Opis strategii</label>
        <input
          id="strategia"
          name="strategia"
          type="text"
          className={styles.element}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.strategia}
        />
        {formik.touched.strategia && formik.errors.strategia ? (
          <div className={styles.error}>{formik.errors.strategia}</div>
        ) : null}

        <select
          id="skutecznosc"
          name="skutecznosc"
          className={styles.element}
          onChange={formik.handleChange}
          value={formik.values.skutecznosc}
        >
          <option value="">Skuteczność</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        {formik.touched.skuteczność && formik.errors.skuteczność ? (
          <div className={styles.error}>{formik.errors.skuteczność}</div>
        ) : null}

        <label htmlFor="warunki">Warunki użycia</label>
        <input
          id="warunki"
          name="warunki"
          type="text"
          className={styles.element}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.warunki}
        />
        {formik.touched.warunki && formik.errors.warunki ? (
          <div className={styles.error}>{formik.errors.warunki}</div>
        ) : null}

        <label htmlFor="data">Data</label>
        <input
          id="data"
          name="data"
          type="date"
          className={styles.element}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.data}
        />
        {formik.touched.data && formik.errors.data ? (
          <div className={styles.error}>{formik.errors.data}</div>
        ) : null}

        <select
          id="przeciwnicy"
          name="przeciwnicy"
          className={styles.element}
          onChange={formik.handleChange}
          value={formik.values.skutecznosc}
        >
          <option value="">Przeciwnicy</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        {formik.touched.typy && formik.errors.typy ? (
          <div className={styles.error}>{formik.errors.data}</div>
        ) : null}

        <button type="submit" className={styles.submitButton}>
          Zatwierdź notatkę
        </button>
      </form>
    </div>
  );
}
