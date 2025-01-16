"use client";
import React, { useState, useEffect } from "react";
import styles from "../page.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function NotesForm() {
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

  const formik = useFormik({
    initialValues: {
      taktyka: "",
      strategia: "",
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
      warunki: Yup.string().min("Warunki użycia muszą mieć minimum 10 znaków"),
      data: Yup.date(),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="taktyka">Nazwa taktyki</label>
      <input
        id="taktyka"
        name="taktyka"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.taktyka}
      />
      {formik.touched.taktyka && formik.errors.taktyka ? (
        <div>{formik.errors.taktyka}</div>
      ) : null}

      <label htmlFor="strategia">Opis strategii</label>
      <input
        id="strategia"
        name="strategia"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.strategia}
      />
      {formik.touched.strategia && formik.errors.strategia ? (
        <div>{formik.errors.strategia}</div>
      ) : null}

      <select>
        <option value="">Skuteczność</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>

      <label htmlFor="warunki">Warunki użycia</label>
      <input
        id="warunki"
        name="warunki"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.warunki}
      />
      {formik.touched.warunki && formik.errors.warunki ? (
        <div>{formik.errors.warunki}</div>
      ) : null}

      <label htmlFor="data">Data</label>
      <input
        id="data"
        name="data"
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.data}
      />
      {formik.touched.data && formik.errors.data ? (
        <div>{formik.errors.data}</div>
      ) : null}

      <select>
        <option value="">Typy</option>
        <option>all</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </form>
  );
}
