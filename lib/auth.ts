import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { CustomUser } from '#/types';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
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
          emailVerified: profile.email_verified ? new Date(profile.email_verified) : null,
        };
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
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          const isValid = await bcrypt.compare(credentials.password, user.password!);
          if (!isValid) {
            return null;
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            emailVerified: user.emailVerified,
            accessToken: 'your_access_token_here', // Add your logic to generate an access token
          } as CustomUser;
        } else {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword,
            },
          });
          return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            emailVerified: newUser.emailVerified,
            accessToken: 'your_access_token_here', // Add your logic to generate an access token
          } as CustomUser;
        }
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
        token.accessToken = customUser.accessToken; // Add access token to JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string | null;
        session.accessToken = token.accessToken; // Add access token to session
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);
