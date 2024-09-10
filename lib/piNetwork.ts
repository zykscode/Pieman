'use client';

import { APIPayment, APIUserScopes } from '@pinetwork-js/api-typing';
import { APIPartialPayment } from '@pinetwork-js/api-typing';
import { PiClient } from '@pinetwork-js/sdk';
import { PaymentCallbacks } from '@pinetwork-js/sdk/build/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

declare global {
  interface Window {
    Pi: PiClient;
  }
}

const PI_API_URL = 'https://api.minepi.com';
const PI_SANDBOX_API_URL = 'https://api.testnet.minepi.com';

const isPiAvailable = (pi: Window['Pi']): pi is NonNullable<Window['Pi']> => {
  return (
    pi !== undefined &&
    'init' in pi &&
    'authenticate' in pi &&
    'createPayment' in pi
  );
};

export const Pi = {
  init: ({
    version,
    sandbox = false,
  }: {
    version: '2.0';
    sandbox?: boolean;
  }) => {
    if (typeof window !== 'undefined' && isPiAvailable(window.Pi)) {
      window.Pi.init({ version, sandbox });
    }
  },

  authenticate: async (
    scopes: APIUserScopes[],
    onIncompletePaymentFound: (payment: APIPayment) => void,
  ) => {
    if (typeof window === 'undefined' || !isPiAvailable(window.Pi)) {
      throw new Error('Pi SDK is not available');
    }
    return window.Pi.authenticate(scopes, onIncompletePaymentFound);
  },

  createPayment: async (
    paymentData: APIPartialPayment,
    callbacks: PaymentCallbacks,
  ) => {
    if (typeof window === 'undefined' || !isPiAvailable(window.Pi)) {
      throw new Error('Pi SDK is not available');
    }
    return window.Pi.createPayment(paymentData, callbacks);
  },

  openShareDialog: (title: string, message: string) => {
    if (typeof window === 'undefined') {
      throw new Error('Pi SDK is not available in server-side environment');
    }

    window.Pi?.openShareDialog(title, message);
  },

  Ads: {
    showAd: async (adType: 'interstitial' | 'rewarded') => {
      if (typeof window === 'undefined') {
        throw new Error('Pi SDK is not available in server-side environment');
      }

      return window.Pi.Ads.showAd(adType);
    },

    isAdReady: async (adType: 'interstitial' | 'rewarded') => {
      if (typeof window === 'undefined') {
        throw new Error('Pi SDK is not available in server-side environment');
      }

      return window.Pi.Ads.isAdReady(adType);
    },

    requestAd: async (adType: 'interstitial' | 'rewarded') => {
      if (typeof window === 'undefined') {
        throw new Error('Pi SDK is not available in server-side environment');
      }

      return window.Pi.Ads.requestAd(adType);
    },
  },
};

export const initPiNetwork = (sandbox = false) => {
  Pi.init({ version: '2.0', sandbox });
};

export const authenticate = async (scopes: APIUserScopes[]) => {
  return Pi.authenticate(scopes, onIncompletePaymentFound);
};

export const createPayment = async (
  paymentData: {
    amount: number;
    memo: string;
    metadata: { userId: string };
    uid: `${string}-${string}-${string}-${string}-${string}`;
  },
  callbacks: {
    onReadyForServerApproval: (paymentId: any) => Promise<void>;
    onReadyForServerCompletion: () => void;
    onCancel: () => void;
    onError: () => void;
  },
) => {
  return Pi.createPayment(paymentData, callbacks);
};

export const getWalletInfo = async (accessToken: string) => {
  const apiUrl =
    process.env.NODE_ENV === 'production' ? PI_API_URL : PI_SANDBOX_API_URL;
  const response = await axios.get(`${apiUrl}/v2/wallet`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};

const onIncompletePaymentFound = (payment: any) => {
  console.log('Incomplete payment found:', payment);
  // Handle incomplete payment
};

export const completePayment = async (paymentId: string, txid: string) => {
  const apiUrl =
    process.env.NODE_ENV === 'production' ? PI_API_URL : PI_SANDBOX_API_URL;
  const response = await axios.post(
    `${apiUrl}/v2/payments/${paymentId}/complete`,
    { txid },
  );
  return response.data;
};

export const cancelPayment = async (paymentId: any) => {
  const apiUrl =
    process.env.NODE_ENV === 'production' ? PI_API_URL : PI_SANDBOX_API_URL;
  const response = await axios.post(
    `${apiUrl}/v2/payments/${paymentId}/cancel`,
  );
  return response.data;
};

export const getUserProfile = async (accessToken: any) => {
  const apiUrl =
    process.env.NODE_ENV === 'production' ? PI_API_URL : PI_SANDBOX_API_URL;
  const response = await axios.get(`${apiUrl}/v2/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data;
};
