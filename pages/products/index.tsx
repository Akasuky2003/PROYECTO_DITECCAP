import Head from "next/head";

import products from "@/services/products";

import dynamic from "next/dynamic";
import Link from "next/link";

const ProductCard = dynamic(() => import("../../components/ProductCard"))
const Title = dynamic(() => import("../../components/Title"));
const Button = dynamic(() => import("../../components/Button"))


export default function Products() {

  return (
    <div>
      <Head>
        <title>Productos</title>
      </Head>
      <div className="d-flex justify-content-between p-4">
        <Title>Productos</Title>
        <Link href="/cart">
          <Button className="btn btn-success border">Cesta</Button>
        </Link>
      </div>

      <div className="container-fluid flex flex-wrap card-group px-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}