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

  const { email, password } = req.body as { email: string; password: string };

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && (await bcrypt.compare(password, user.password!))) {
    const signInResult = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (
      signInResult &&
      signInResult.ok &&
      'token' in signInResult &&
      signInResult.token
    ) {
      const customSignInResponse: CustomSignInResponse = {
        ...signInResult,
        token: {
          accessToken: signInResult.token as string,
        },
        error: null,
      };

      setCookie('auth-token', customSignInResponse.token?.accessToken, {
        req,
        res,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });

      res.status(200).json({ token: customSignInResponse.token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
}
