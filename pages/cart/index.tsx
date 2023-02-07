import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
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

export default function Cart() {

    const [cartItems, setCartItems] = useState<Displaycart[]>([])
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const [total, setTotal] = useState<number>(0)
    const [cartId, setCartId] = useState<string>("")

    useEffect(() => {

        if (cartItems.length == 0) {
            return
        }

        let t = 0

        for (let i =0; i < cartItems.length; i++){
            t += cartItems[i].price * cartItems[i].qty
        }

        setTotal(t)

    }, [cartItems])

    useEffect(() => {
        const cs = localStorage.getItem("cart")
        if (!cs) {
            setIsEmpty(true)
            return
        }

        const cart = JSON.parse(cs)

        setCartId(cart.cid)

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
        setCartItems(cartItemsArray)

    }, [])

    function removeItem(id: number) {
        const newCart = cartItems.filter(ci => ci.id != id)
        setCartItems(newCart)
        const cart = {
            cid: cartId,
            products: newCart.map(item => ({ id: item.id, qty: item.qty }))
        }
        localStorage.setItem("cart", JSON.stringify(cart))
    }


    return (
        <>
            <Head>
                <title>Pago</title>
            </Head>
            {
                isEmpty ? <Title>No hay productos agregados</Title> :
                    <div className="container-fluid">
                        <h1 className="center">Carrito de compras</h1>
                        <div className="row mt-5 flex flex-center">
                            <div className="col-md-6"
                                style={{
                                    width: "40%"
                                }}>
                                <h2>Pago</h2>
                                <hr />
                                <div id="cardPaymentBrick_container"></div>
                            </div>
                            <div className="col-md-6" style={{
                                width: "40%"
                            }}>
                                <h2>Productos pedidos</h2>
                                <hr />
                                {cartItems.map(item => (item.inStock ?
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-8">
                                                    <h3>{item.name}</h3>
                                                </div>
                                                <div className="col-2">
                                                    <h3>{item.currency} {item.price}</h3>
                                                </div>
                                                <div className="col-2">
                                                    <h3>x {item.qty}</h3>
                                                </div>
                                                <button className="btn btn-danger" onClick={() => removeItem(item.id)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>{item.name} no está disponible en nuestro stock</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                                )
                                }
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-6">
                                                <h3>Total</h3>
                                            </div>
                                            <div
                                                className="col-6"
                                                style={{
                                                    textAlign: "right",
                                                }}
                                            >
                                                <h3>{total}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }         
        </>
    )
}