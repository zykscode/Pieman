'use client';

import { APIPayment, APIUserScopes } from '@pinetwork-js/api-typing';
import { APIPartialPayment } from '@pinetwork-js/api-typing';
import { PaymentCallbacks } from '@pinetwork-js/sdk/build/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const PI_API_URL = 'https://api.minepi.com';
const PI_SANDBOX_API_URL = 'https://api.testnet.minepi.com';

export const Pi = {
  init: ({
    version,
    sandbox = false,
  }: {
    version: '2.0';
    sandbox?: boolean;
  }) => {
    if (typeof window !== 'undefined') {
      window.Pi = window.Pi || {};
      window.Pi.init = async ({
        version,
        sandbox,
      }: {
        version: string;
        sandbox?: boolean;
      }): Promise<void> => {
        console.log(
          `Pi SDK initialized with version ${version} in ${sandbox ? 'sandbox' : 'production'} mode`,
        );
      };
      window.Pi.init({ version, sandbox });
    }
  },

  authenticate: async (
    scopes: APIUserScopes[],
    onIncompletePaymentFound: (payment: APIPayment) => void,
  ) => {
    if (typeof window === 'undefined') {
      throw new Error('Pi SDK is not available in server-side environment');
    }

    return new Promise((resolve, reject) => {
      window.Pi.authenticate(scopes, onIncompletePaymentFound)
        .then(resolve)
        .catch(reject);
    });
  },

  createPayment: async (
    paymentData: APIPartialPayment,
    callbacks: PaymentCallbacks,
  ) => {
    if (typeof window === 'undefined') {
      throw new Error('Pi SDK is not available in server-side environment');
    }

    return new Promise((resolve, reject) => {
      window.Pi.createPayment(paymentData, {
        ...callbacks,
        onReadyForServerApproval: (paymentId) => {
          callbacks.onReadyForServerApproval(paymentId);
          resolve(paymentId);
        },
        onError: (error, payment) => {
          callbacks.onError(error, payment);
          reject(error);
        },
      });
    });
  },

  openShareDialog: (title: string, message: string) => {
    if (typeof window === 'undefined') {
      throw new Error('Pi SDK is not available in server-side environment');
    }

    window.Pi.openShareDialog(title, message);
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
