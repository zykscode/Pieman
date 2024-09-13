import type { User } from '@prisma/client';
import type { SignInResponse } from 'next-auth/react';
import type { IconType } from 'react-icons';

import type { Icons } from '@/components/icons';

export type NavItem = {
  title: string;
  href: string;
  icon: IconType;
  disabled?: boolean;
};

export interface AxiosClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface Trader {
  id: number;
  name: string;
  profit: number;
}
export type NetworkPassphrase = 'Pi Network' | 'Testnet';

export interface PaymentArgs {
  amount: number;
  memo: string;
  metadata: string;
  uid: string;
}

export interface CustomSignInResponse extends SignInResponse {
  token?: {
    accessToken: string;
  };
  error: string | null;
}

import { AuthResult as SDKAuthResult } from '@pinetwork-js/sdk';

export type AuthResult = Omit<SDKAuthResult, 'user'> & {
  user: {
    uid: string;
    username: string | undefined;
  };
};

// export type User = AuthResult['user'];

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
  export function setCookie(
    key: string,
    value: string,
    options?: unknown,
  ): void;
  export function getCookie(key: string): string | undefined;
  export function deleteCookie(key: string): void;
  // Add other functions as needed
}

export interface PaymentDTO {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Record<string, unknown>;
  from_address: string;
  to_address: string;
  direction: 'user_to_app' | 'app_to_user';
  created_at: string;
  network: 'Pi Network' | 'Pi Testnet';
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

// export type User = AuthResult['user'];

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github?: string;
    youtube?: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId'> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export interface PiNetwork {
  authenticate: () => Promise<AuthResult>;
  makePayment: (payment: PaymentData) => Promise<PaymentResult>;
  openShareDialog: (title: string, message: string) => Promise<void>;
  createPayment: (paymentData: PaymentData) => Promise<string>;
  completePayment: (paymentId: string, txid: string) => Promise<PaymentResult>;
  cancelPayment: (paymentId: string) => Promise<void>;
  getUserProfile: () => Promise<UserProfile>;
}

interface AuthResult {
  accessToken: string;
  user: UserProfile;
}

interface UserProfile {
  uid: string;
  username: string;
}

interface PaymentData {
  amount: number;
  memo: string;
  metadata?: object;
}

interface PaymentResult {
  status: 'COMPLETED' | 'CANCELLED' | 'FAILED';
  txid?: string;
}
