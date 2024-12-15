import Image from "next/image";
import styles from "./page.module.css";
import List from "./components/PokemonList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <List />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
