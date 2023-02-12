import { Inter } from "@next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Head from "next/head";
import style from "../styles/index.module.css"
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Proyecto DITECCAP</title>
      </Head>
      <Navbar />
      <div className={style.container}>
        <img src="/fondo-index.jpg" alt="Imagen" className={style.fondoindex} />
        <div className={style.textofooter}>
        <h1 className={style.textfondoh1}>DITECCAP</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
