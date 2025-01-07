"use client";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function Navigation() {
  const router = useRouter();

  const handleClick1 = () => {
    router.push("/");
  };
  const handleClick2 = () => {
    router.push("../favorites");
  };
  const handleClick3 = () => {
    router.push("../compare");
  };

  return (
    <nav>
      <button onClick={handleClick1}>Home</button>
      <button onClick={handleClick2}>Ulubione</button>
      <button onClick={handleClick3}>Porównaj</button>
    </nav>
  );
}
