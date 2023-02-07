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
            <div className="group relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <div className="h-full w-full object-cover object-center lg:h-full lg:w-full">
                        <Image
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            width={300}
                            height={300}
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <div className="space-y-2">
                        <h3 className="text-sm text-gray-700">
                            <a href={product.href}>
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {product.name}
                            </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                        {product.currency}
                        {product.price}
                    </p>
                </div>
                <Button onClick={addToCart}>Add to cart</Button>
            </div>
            
    )
}