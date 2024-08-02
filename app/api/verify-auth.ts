/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars-ts */
// pages/api/verify-auth.ts
import { env } from 'node:process';

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { accessToken } = req.body;
    try {
      const response = await axios.get('https://api.minepi.com/v2/me', {
        headers: { Authorization: `Bearer ${env.PI_API_KEY}` },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// pages/api/approve-payment.ts and pages/api/complete-payment.ts
// Implement these endpoints to handle server-side approval and completion
// You'll need to make requests to Pi Network's Platform API
