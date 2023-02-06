import type { NextApiRequest, NextApiResponse } from 'next'
import { getName } from '@/services/supabase'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let name = getName()
    res.status(200).json({ name })
}
