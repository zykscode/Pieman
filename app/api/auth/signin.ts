// pages/api/auth/login.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setCookie } from 'cookies-next';
import { signIn, SignInResponse } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: { method: string; body: { email: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; token?: SignInResponse; }): void; new(): any; }; }; }) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && await bcrypt.compare(password, user.password!)) {
    const token = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (token?.ok) {
      setCookie('auth-token', token.accessToken, {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
}
