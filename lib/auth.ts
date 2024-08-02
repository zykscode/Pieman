/* eslint-disable no-param-reassign */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { CustomUser } from '#/types';

const prisma = new PrismaClient();

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes

const generateAccessToken = (user: CustomUser) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1h' },
  );
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified
            ? new Date(profile.email_verified)
            : null,
          password: '',
          role: 'user',
          archivedts: null,
          accessToken: '',
        } as CustomUser;
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('User not found');
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error('Account is locked. Please try again later.');
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password!,
        );

        if (!isValid) {
          await prisma.user.update({
            where: { email: credentials.email },
            data: {
              failedAttempts: { increment: 1 },
              lockedUntil:
                user.failedAttempts + 1 >= MAX_LOGIN_ATTEMPTS
                  ? new Date(Date.now() + LOCK_TIME)
                  : null,
            },
          });
          throw new Error('Invalid password');
        }

        // Reset failed attempts on successful login
        await prisma.user.update({
          where: { email: credentials.email },
          data: { failedAttempts: 0, lockedUntil: null },
        });

        const accessToken = generateAccessToken(user as CustomUser);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          emailVerified: user.emailVerified,
          accessToken,
          role: user.role,
          archivedts: user.archivedts,
        } as CustomUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.name = customUser.name;
        token.email = customUser.email;
        token.picture = customUser.image;
        token.emailVerified = customUser.emailVerified;
        token.accessToken = customUser.accessToken;
        token.role = customUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string | null;
        session.accessToken = token.accessToken as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error', // Error code passed in query string as ?error=
    newUser: '/auth/get-started', // Custom "Get Started" page for new users
  },
  debug: process.env.NODE_ENV === 'development',
  events: {
    async createUser({ user }) {
      // Custom logic for when a new user is created
      await prisma.user.update({
        where: { id: user.id },
        data: { failedAttempts: 0, lockedUntil: null },
      });
    },
  },
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
};

export default NextAuth(authOptions);
