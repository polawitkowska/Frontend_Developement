import Image from "next/image";
import styles from "./page.module.css";
import List from "./components/PokemonList";
import Details from "./components/PokemonDetails";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
        <input type="text" placeholder="Wyszukaj" />
      </header>
      <main className={styles.main}>
        <List />
        <Details />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
