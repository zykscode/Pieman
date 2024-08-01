import { User } from "@prisma/client"
import type { Icon } from "lucide-react"
import { SignInResponse } from 'next-auth/react';


import { Icons } from "@/components/icons"
import { IconType } from "react-icons"

export type NavItem = {
  title: string
  href: string
  icon : IconType
  disabled?: boolean
}

export interface AxiosClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export type NetworkPassphrase = "Pi Network" | "Testnet";

export interface PaymentArgs {
  amount: number;
  memo: string;
  metadata: string;
  uid: string;
}
export 
interface CustomSignInResponse extends SignInResponse {
  accessToken?: string;
  error: string | null;
}

export type AuthResult = {
  accessToken: string,
  user: {
    uid: string,
    username: string
  }
};

export type User = AuthResult['user'];


export interface CustomUser {
  id: string;
  name?: string;
  email: string;
  image?: string;
  emailVerified?: Date | null;
  password?: string;
  role: string;
  archivedts?: Date | null;
  accessToken?: string;
  failedAttempts?: number;
  lockedUntil?: Date | null;
}



declare module 'cookies-next' {
  export function setCookie(key: string, value: string, options?: any): void;
  export function getCookie(key: string): string | undefined;
  export function deleteCookie(key: string): void;
  // Add other functions as needed
}

export 
interface PaymentDTO {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Record<string, any>;
  from_address: string;
  to_address: string;
  direction: "user_to_app" | "app_to_user";
  created_at: string;
  network: "Pi Network" | "Pi Testnet";
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  transaction: null | {
    txid: string;
    verified: boolean;
    _link: string;
  };
}
export interface MyPaymentMetadata {}


export type User = AuthResult['user'];


export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: NavLink[]
    }
)

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github?: string
    youtube?: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }
