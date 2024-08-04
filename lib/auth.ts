import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { NextAuthOptions } from 'next-auth';
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile): Promise<CustomUser> {
        return Promise.resolve({
          id: profile.sub,
          name: profile.name || undefined,
          email: profile.email,
          image: profile.picture || undefined,
          emailVerified: profile.email_verified
            ? new Date(profile.email_verified)
            : undefined,
          role: 'USER',
          password: undefined,
          archived: false,
          archivedts: undefined,
          failedAttempts: 0,
          lockedUntil: undefined,
          username: undefined,
        });
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
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
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name!,
              email: user.email!,
              image: user.image,
              emailVerified: new Date(),
              role: 'USER',
              archived: false,
              archivedts: null,
              failedAttempts: 0,
              lockedUntil: null,
              username: null,
              password: null,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const customUser = user as CustomUser;
        return {
          ...token,
          id: customUser.id,
          name: customUser.name,
          email: customUser.email,
          picture: customUser.image,
          emailVerified: customUser.emailVerified,
          role: customUser.role,
          accessToken:
            account?.provider === 'credentials'
              ? customUser.accessToken
              : account?.access_token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
            name: token.name,
            email: token.email,
            image: token.picture as string | null,
            role: token.role as string,
          },
          accessToken: token.accessToken as string,
        };
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
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/get-started',
  },
  events: {
    async createUser({ user }) {
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
