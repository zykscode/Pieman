import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from 'next-auth/react';

import type { CustomSignInResponse } from '#/types';

const prisma = new PrismaClient();

// eslint-disable-next-line consistent-return
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const signInResult = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (signInResult && signInResult.ok) {
      const customSignInResponse = signInResult as CustomSignInResponse;

      if (customSignInResponse.token?.accessToken) {
        setCookie('auth-token', customSignInResponse.token.accessToken, {
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
        res.status(400).json({ error: 'Access token not found' });
      }
    } else {
      res.status(400).json({ error: 'Sign-in failed' });
    }
  } catch (error) {
    res.status(400).json({ error: 'User already exists or other error' });
  }
}
