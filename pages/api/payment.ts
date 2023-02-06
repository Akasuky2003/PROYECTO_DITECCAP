import mercadopago from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from 'nextjs-cors';
import sendSMS from "@/services/twilio";
import { getPhone } from "@/services/supabase";

mercadopago.configure({
    access_token: String(process.env.MERCADOPAGO_ACCESS_TOKEN)
});

export default async function paymentMercadoPago(req: NextApiRequest, res: NextApiResponse) {

    await NextCors(req, res, {
        methods: ['POST'],
        origin: '*',
        optionsSuccessStatus: 200,
     });

    if (req.method === "POST") {
        try {
            const { body } = await mercadopago.payment.save(req.body);

            const { status, status_detail, id, transaction_amount } = body

            const phone = await getPhone()

            if (status === "approved") {
                sendSMS(phone[0].phone, transaction_amount)
            }

            return res.status(201).json({ status, status_detail, id })

        } catch (error) {
            return res.json({ error })
        }
    };
    return res.status(400).json({ error: "El método no existe" })
};
