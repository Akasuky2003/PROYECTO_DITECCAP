import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";

const Button = dynamic(() => import("./Button"))

interface Product {
    id: number
    imageSrc: string
    imageAlt: string
    href: string
    name: string
    color: string
    price: number
    currency: string
}

interface Props {
    product: Product
}

interface CartItem {
    cid: string
    products: Array<{
        id: number
        qty: number
    }>
}

export default function ProductCard({ product }: Props): React.ReactElement {

    let cart: CartItem

    function addToCart(): void {
        const cs = localStorage.getItem("cart")

        let isAdded = false

        if (!cs) {
            cart = {
                cid: uuidv4(),
                products: [{
                    id: product.id,
                    qty: 1
                }]
            }
        }
        else {
            cart = JSON.parse(cs)
            cart.products = cart.products.map(ci => {
                if (ci.id == product.id) {
                    isAdded = true
                    return { id: ci.id, qty: ci.qty + 1 }
                }
                return { id: ci.id, qty: ci.qty }
            })

            if (!isAdded) {
                cart.products.push({
                    id: product.id,
                    qty: 1
                })
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    return (
        <div className="card border m-1">
            <Image className="card-img-top"
                src={product.imageSrc}
                alt={product.name}
                width = {200}
                height={200}
                style={{
                    objectFit: "contain"
                }}
                sizes="100vw"
                
            />
            <div className="card-body">
                    <h5 className="card-title">
                        <a className="list-group-item list-group-item-action link-primary" href={product.href}>{product.name}</a>
                    </h5>
                    <p className="card-text">
                        {product.currency} {product.price}
                    </p>

            </div>
            <a className="btn btn-primary fs-6 flex justify-content-center" onClick={addToCart}>Agregar al carrito</a>
        </div>

    )
}