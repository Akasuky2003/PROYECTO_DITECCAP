import { type NextPage } from "next";
import Head from "next/head";

import products from "@/services/products";

import dynamic from "next/dynamic";
import Link from "next/link";

const ProductCard = dynamic(() => import("../../components/ProductCard"))
const Title = dynamic(() => import("../../components/Title"));
const Button = dynamic(() => import("../../components/Button"))

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Productos</title>
      </Head>
      <Title>Productos</Title>
      <Link href="/cart">
        <Button>Ir al carrito de compras</Button>
      </Link>
      <div className="container fluid mt-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home