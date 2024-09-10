/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIUserScopes } from '@pinetwork-js/api-typing';
import { APIPartialPayment } from '@pinetwork-js/api-typing';
import { Pi } from '@pinetwork-js/sdk';
import { AuthResult } from '@pinetwork-js/sdk/build/types';

export const initPiNetwork = () => {
  if (typeof window !== 'undefined') {
    Pi.init({ version: '2.0', sandbox: process.env.NODE_ENV !== 'production' });
  }
};

export const authenticate = async (
  scopes: APIUserScopes[],
): Promise<AuthResult> => {
  return Pi.authenticate(scopes, onIncompletePaymentFound);
};

export const createPayment = (
  paymentData: APIPartialPayment,
  callbacks: {
    onReadyForServerApproval: (paymentId: string) => void;
    onReadyForServerCompletion: (paymentId: string, txid: string) => void;
    onCancel: (paymentId: string) => void;
    onError: (error: Error, payment?: any) => void;
  },
) => {
  return Pi.createPayment(paymentData, callbacks);
};

export const getWalletInfo = async () => {
  const scopes = ['username', 'payments', 'wallet_address'].join(' ');
  const userInfo = await Pi.openShareDialog(
    'Share Wallet Info',
    `The app is requesting access to: ${scopes}`,
  );
  return userInfo;
};

const onIncompletePaymentFound = (payment: any) => {
  console.log('Incomplete payment found:', payment);
  // Handle incomplete payment
};

export { Pi };
