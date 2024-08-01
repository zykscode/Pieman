import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setCookie } from 'cookies-next';
import { signIn } from 'next-auth/react';

const prisma = new PrismaClient();

interface CustomSignInResponse {
  ok: boolean;
  token?: {
    accessToken: string;
  };
  [key: string]: any; // other possible fields
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body as { email: string; password: string };

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && await bcrypt.compare(password, user.password!)) {
    const token: CustomSignInResponse | null | undefined = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (token && token.ok && token.token?.accessToken) {
      setCookie('auth-token', token.token.accessToken, {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
      res.status(200).json({ token: token.token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
}
