import Head from "next/head";

import products from "@/services/products";

import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Style from "../../styles/products.module.css"
import Image from "next/image";
const ProductCard = dynamic(() => import("../../components/ProductCard"))
const Title = dynamic(() => import("../../components/Title"));
const Button = dynamic(() => import("../../components/Button"))


export default function Products() {

  return (
    <div>
      <Head>
        <title>Productos</title>
      </Head>
      <Navbar/>
      <div className={Style.ConteinerProductos}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer/>
    </div>
  )
}