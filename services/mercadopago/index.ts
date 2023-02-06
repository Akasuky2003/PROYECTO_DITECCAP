import mercadopago from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";
import sendSMS from "../twilio";

mercadopago.configure({
    access_token: String(process.env.MERCADOPAGO_ACCESS_TOKEN)
});

export default async function paymentMercadoPago (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const { body } = await mercadopago.payment.save(req.body);

            const { status, status_detail, id, transaction_amount } = body

            if (status ==="approved"){
                sendSMS("+51976776844", transaction_amount)
            }
            
            return res.status(201).json({ body })
            
        } catch (error){
            return res.json({error})
        }
    };
    return res.status(400).json({error: "El método no existe"})
};
