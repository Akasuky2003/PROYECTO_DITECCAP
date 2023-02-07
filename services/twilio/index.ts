import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default async function sendSMS(phoneNumber: string, transaction_amount: number) {
    try {
        const message = client.messages.create({
            body: `Estimado(a), tu pago por S/.${transaction_amount} en Creativos Pariona se realizo con exito y empezaremos a preparar tu pedido. Gracias por tu preferencia.`,
            to: phoneNumber,
            from: "+15392455564"
        });

        return { message };

    } catch (error) {
        return error
    }
};
