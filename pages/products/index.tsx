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
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"></link>
      </Head>
      <div className="d-flex justify-content-between p-4">
      <Title>Productos</Title>
      <Link href="/cart">
        <Button>Ir al carrito de compras</Button>
      </Link>
      </div>

      <div className="container-fluid flex flex-wrap mt-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home