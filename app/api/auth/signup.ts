import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setCookie } from 'cookies-next';
import { signIn } from 'next-auth/react';
import { CustomSignInResponse } from '#/types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = await signIn('credentials', {
      redirect: false,
      email,
      password,
    }) as CustomSignInResponse | undefined;

    if (token?.ok) {
      setCookie('auth-token', token.accessToken!, {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60, // 1 minute
        path: '/',
      });
      res.status(200).json({ user });
    } else {
      res.status(400).json({ error: 'Sign-in failed' });
    }
  } catch (error) {
    res.status(400).json({ error: 'User already exists or other error' });
  }
}
