import mercadopago from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors';

mercadopago.configure({
    access_token: String(process.env.NEXT_MERCADO_PAGO_SAMPLE_ACCESS_TOKEN)
})

export default async function MP(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200,
    });

    if (req.method === "POST") {
        const price = req.body.unit_price
        try {
            let preference = {
                items: [
                    {
                        title: req.body.title,
                        unit_price: req.body.unit_price,
                        quantity: req.body.quantity,
                    },
                ],

                back_urls: {
                    "success": "https://proyectou8.vercel.app/api/feedback",
                    "failure": "https://proyectou8.vercel.app/cart",
                    "pending": "https://proyectou8.vercel.app/cart"
                },
                // auto_return: "approved",
            };
            

            await mercadopago.preferences.create(preference)
                .then((response) =>{
                    return res.status(201).json({
                        url: response.body.sandbox_init_point,                 
                    })
                })

        } catch (error) {
            return res.json({ error })
        }
    }
    // return res.status(400).json({ error: "El método no existe" })
}