// next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as NextAuthJWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth' {
  interface Session {
    user: DefaultUser & {
      id: UserId;
      role: string;
      accessToken?: string;
    };
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: UserId;
    role: string;
    emailVerified?: Date | null;
    accessToken?: string;
  }

  interface SignInResponse {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId;
    role: string;
    accessToken?: string;
  }
}
