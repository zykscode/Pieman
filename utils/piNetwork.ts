'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { PiClient } from '@pinetwork-js/sdk';

export const Pi = new PiClient();

export const initPiNetwork = () => {
  if (typeof window !== 'undefined' && window.Pi) {
    window.Pi.init({
      version: '2.0',
      sandbox: process.env.NODE_ENV !== 'production',
    });
  }
};

export const authenticate = async (scopes: string[]) => {
  if (typeof window === 'undefined' || !window.Pi) {
    throw new Error('Pi SDK is not available');
  }
  return window.Pi.authenticate(scopes, onIncompletePaymentFound);
};

export const createPayment = (paymentData: any, callbacks: any) => {
  if (typeof window === 'undefined' || !window.Pi) {
    throw new Error('Pi SDK is not available');
  }
  return window.Pi.createPayment(paymentData, callbacks);
};

const onIncompletePaymentFound = (payment: any) => {
  console.log('Incomplete payment found:', payment);
  // Handle incomplete payment
};

export { PiClient };
