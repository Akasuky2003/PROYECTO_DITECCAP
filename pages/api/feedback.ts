// import type { NextApiRequest, NextApiResponse } from "next";
import sendSMS from "@/services/twilio";
import { getPhone } from "@/services/supabase";

import { IncomingMessage, ServerResponse } from 'http';

export default async (req: IncomingMessage, res: ServerResponse) => {
    const phone = await getPhone()
        sendSMS(phone[0].phone)
    res.writeHead(302, {
        Location: '/products'
    });
    res.end();
};