// import type { NextApiRequest, NextApiResponse } from "next";
import sendSMS from "@/services/twilio";
import { getPhone } from "@/services/supabase";

// export default async function feedback(req: NextApiRequest, res: NextApiResponse) {
//     // const router = useRouter()
//     const q = req.query.status
//     console.log(q)
//     try {
//         const phone = await getPhone()
//         sendSMS(phone[0].phone)
//         console.log("Hola")
//         res.redirect(307, "/products")
//     } catch (error) {
//         res.status(500).send({ error: 'failed to fetch data' })
//     }
//     // if (req.query.status === "approved") {
//     //     const phone = await getPhone()
//     //     sendSMS(phone[0].phone)
//     // }
//     // router.push("/products")
// }

import { IncomingMessage, ServerResponse } from 'http';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const phone = await getPhone()
        sendSMS(phone[0].phone)
    res.writeHead(302, {
        Location: '/products'
    });
    res.end();
};