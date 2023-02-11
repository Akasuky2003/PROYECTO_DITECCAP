import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Head>
      <title>Proyecto DITECCAP</title>
    </Head>
      <div className={styles.container}>
        <Navbar />
        <img style={{height:"auto"}} src="/Paginaprincipal.png" alt="Imagen" />
      </div>
    </>
  );
}
