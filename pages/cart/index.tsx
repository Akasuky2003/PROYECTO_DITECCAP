import { useState, useEffect } from "react";
import Head from "next/head";
import products from "@/services/products";
import dynamic from "next/dynamic";

const Title = dynamic(() => import("../../components/Title"))

interface Displaycart {
    id: number,
    price: number,
    qty: number,
    currency: string,
    inStock: boolean,
    name: string
}

export default function Cart() {

    const [cartItems, setCartItems] = useState<Displaycart[]>([])
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)

    useEffect(()=>{
        if (cartItems.length == 0){
            return
        }

        const t = cartItems.reduce((sum, item: Displaycart) => {
            if (item.inStock){
                sum = sum + item.price
                return sum
            }
            
        }, 0)
    }, [cartItems])

    useEffect(() => {
        const cs = localStorage.getItem("cart")
        if (!cs) {
            setIsEmpty(true)
            return
        }

        const cart = JSON.parse(cs)

        let cartItemsArray = cart.products.map((cartItem: {
            id: number
            qty: number
        }) => {
            const product = products.filter((p) => p.id == cartItem.id)

            return {
                id: cartItem.id,
                name: product[0].name,
                price: product[0].price,
                qty: cartItem.qty,
                currency: product[0].currency,
                inStock: product[0].stock >= cartItem.qty ? true : false
            }
        }
        )
        console.log(cartItemsArray)
        setCartItems(cartItemsArray)

    }, [])
    return (
        <div>
            <div className="container mt-3">
                <h1 className="center">Carrito de compras</h1>
            </div>
        </div>

    )
}