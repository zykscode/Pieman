// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth" {
  interface Session {
    user: DefaultUser & {
      id: UserId;
    };
    accessToken?: string;
  }

  interface User extends DefaultUser {
    id: UserId;
  }

  interface SignInResponse {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    accessToken?: string;
  }
}
