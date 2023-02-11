import twilio from "twilio";

const client = twilio(
    process.env.NEXT_TWILIO_ACCOUNT_SID,
    process.env.NEXT_TWILIO_AUTH_TOKEN
);

export default async function sendSMS(phoneNumber: string) {
    try {
        const message = client.messages.create({
            body: `Estimado(a), su compra en Creativos Pariona se realizo con exito y empezaremos a preparar tu pedido. Gracias por tu preferencia.`,
            to: phoneNumber,
            from: "+15392455564"
        });

        return { message };

    } catch (error) {
        return error
    }
};
