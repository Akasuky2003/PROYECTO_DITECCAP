import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <img src="/Paginaprincipal.png" alt="Imagen" />
      </div>
    </>
  );
}
