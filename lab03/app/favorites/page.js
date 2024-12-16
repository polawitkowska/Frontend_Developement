import Image from "next/image";
import styles from "../page.module.css";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navigation />
        <h1>Ulubione</h1>
      </header>
      <main className={styles.main}>
        <h2>Lista ulubionych Pokemonów</h2>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
