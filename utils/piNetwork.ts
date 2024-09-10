'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIPartialPayment } from '@pinetwork-js/api-typing';
import { PiClient } from '@pinetwork-js/sdk';
import { PaymentCallbacks } from '@pinetwork-js/sdk/build/types';

export const Pi = new PiClient();

export const initPiNetwork = () => {
  if (typeof window !== 'undefined') {
    Pi.init({ version: '2.0', sandbox: process.env.NODE_ENV !== 'production' });
  }
};

export const authenticate = async (scopes: string[]) => {
  return Pi.authenticate(scopes, onIncompletePaymentFound);
};

export const createPayment = (
  paymentData: APIPartialPayment,
  callbacks: PaymentCallbacks,
) => {
  return Pi.createPayment(paymentData, callbacks);
};

const onIncompletePaymentFound = (payment: any) => {
  console.log('Incomplete payment found:', payment);
  // Handle incomplete payment
};

export { PiClient };
