import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
    const [url, setUrl] = useState<string>("")

    useEffect(() => {

        if (cartItems.length == 0) {
            setTotal(0)
            return
        }

        let t = 0

        for (let i = 0; i < cartItems.length; i++) {
            cartItems[i].inStock ? t += cartItems[i].price * cartItems[i].qty : 0
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

    async function goToMP() {
        const response = await fetch("https://proyectou8.vercel.app/api/mpcheckout", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            mode: "cors",
            body: JSON.stringify({
                title: "Total",
                unit_price: total + (cartItems.length > 0 ? 15 : 0),
                quantity: 1
            })
        })

        const dataUrl = await response.json()
        setUrl(dataUrl.url)
    }

    return (
        <div>
            <Head>
                <title>Pago</title>
            </Head>
            {
                isEmpty ?
                    <div className="d-flex justify-content-between p-4">
                        <Title>No hay productos agregados</Title>
                        <Link href="/products">
                            <Button className="btn btn-info  border">Productos</Button>
                        </Link>
                    </div> :
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between p-4">
                            <h1>DITECCAP</h1>
                            <Link href="/products">
                                <Button className="btn btn-info  border">Productos</Button>
                            </Link>
                        </div>
                        <div className="flex container-md justify-content-center flex-wrap">
                            <div className="col-lg-8 col-sm-12 px-4">
                                <h2>Productos pedidos</h2>
                                <hr />
                                {cartItems.map(item => (item.inStock ?
                                    <div className="card mb-3 border " key={item.id}>
                                        <div className="row g-0">
                                            <div className="w-25 flex justify-content-center align-items-center">
                                                <Image className="rounded"
                                                    src={products[products.findIndex(product => product.id === item.id)].imageSrc}
                                                    alt={products[products.findIndex(product => product.id === item.id)].imageAlt}
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                            <div className="w-75">
                                                <div className="card-body">
                                                    <div className="flex align-items-center justify-content-between">
                                                        <div>
                                                            <h4 className="mb-0">{item.name}</h4>
                                                        </div>
                                                        <div>
                                                            <button className="border border-0 fs-5" onClick={() => removeItem(item.id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <h4>{item.currency} {item.price}</h4>
                                                    <p>Cantidad: {item.qty}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="card mb-3 border" key={item.id}>
                                        <div className="row g-0">
                                            <div className="w-25 flex justify-content-center">
                                                <Image className="img-fluid rounded-start"
                                                    src={products[products.findIndex(product => product.id === item.id)].imageSrc}
                                                    alt={products[products.findIndex(product => product.id === item.id)].imageAlt}
                                                    width={100}
                                                    height={100}
                                                />
                                            </div>
                                            <div className="w-75">
                                                <div className="card-body">
                                                    <div className="flex align-items-center justify-content-between">
                                                        <div>
                                                            <h4 className="mb-0">{item.name}</h4> <p>no está disponible en nuestro stock</p>
                                                        </div>
                                                        <div>
                                                            <button className="border border-0 fs-5" onClick={() => removeItem(item.id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                )
                                )
                                }

                            </div>
                            <div className="col-lg-4 col-sm-12 px-4">
                                <h2>Resumen</h2>
                                <hr />
                                <div className="card mb-3 border border-0">
                                    <div className="card-body">
                                        <div className="flex align-items-center justify-space-between">
                                            <div className="col-8">
                                                <p className="fw-normal fs-5">Subtotal</p>
                                            </div>
                                            <div
                                                className="col-4"
                                                style={{
                                                    textAlign: "right",
                                                }}
                                            >
                                                <p className="fw-normal fs-5">S/. {total}</p>
                                            </div>
                                        </div>
                                        <div className="flex align-items-center justify-space-between">
                                            <div className="col-8">
                                                <p className="fw-normal fs-5">Envío</p>
                                            </div>
                                            <div
                                                className="col-4"
                                                style={{
                                                    textAlign: "right",
                                                }}
                                            >
                                                <p className="fw-normal fs-5">S/. {cartItems.length > 0 ? 15 : 0}</p>
                                            </div>
                                        </div>
                                        <div className="flex align-items-center justify-space-between">
                                            <div className="col-8">
                                                <p className="fw-semibold fs-5 mb-0">Total a pagar</p>
                                            </div>
                                            <div
                                                className="col-4"
                                                style={{
                                                    textAlign: "right",
                                                }}
                                            >
                                                <p className="fw-semibold fs-5 mb-0">S/. {total + (cartItems.length > 0 ? 15 : 0)}</p>
                                            </div>
                                        </div>
                                        
                                            <button className="btn btn-warning mt-4 w-100 fs-4" onClick={goToMP}>
                                                <Link href={url}>
                                                Pagar
                                                </Link>
                                                </button>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}