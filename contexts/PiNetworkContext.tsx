/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AuthResult } from '@pinetwork-js/sdk/build/types';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { usePiNetwork } from '../hooks/usePiNetwork'; // Adjust the import path as needed

type PiNetworkContextType = ReturnType<typeof usePiNetwork> & {
  authenticate: () => Promise<AuthResult>;
  makePayment: (payment: Payment) => Promise<unknown>;
  openShareDialog: (title: string, message: string) => Promise<void>;
  createPayment: (paymentData: any) => Promise<string>;
  completePayment: (
    paymentId: string,
    txid: string,
  ) => Promise<{ status: string; txid: string }>;
  cancelPayment: (paymentId: string) => Promise<void>;
  getUserProfile: () => Promise<any>;
};

const PiNetworkContext = createContext<PiNetworkContextType | null>(null);

type APIUserScopes = 'username' | 'payments' | 'wallet_address';

interface Payment {
  amount: number;
  memo: string;
  metadata: any;
  uid: string;
}

export function PiNetworkProvider({ children }: { children: React.ReactNode }) {
  const piNetwork = usePiNetwork();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      piNetwork.Pi.init({
        version: '2.0',
        sandbox: process.env.NODE_ENV !== 'production',
      });
      setIsInitialized(true);
    }
  }, [isInitialized, piNetwork]);

  const completePiNetwork: PiNetworkContextType = {
    ...piNetwork,
    authenticate: async () => {
      const scopes: APIUserScopes[] = [
        'username',
        'payments',
        'wallet_address',
      ];
      return piNetwork.Pi.authenticate(scopes, onIncompletePaymentFound);
    },
    makePayment: async (payment: Payment) => {
      return new Promise((resolve, reject) => {
        piNetwork.Pi.createPayment(
          {
            amount: payment.amount,
            memo: payment.memo,
            metadata: payment.metadata,
            uid: payment.uid, // Add this line
          },
          {
            onReadyForServerApproval: (paymentId) => {
              // Send paymentId to your server for approval
              // This should be implemented in your API
            },
            onReadyForServerCompletion: (paymentId, txid) => {
              // Send paymentId and txid to your server for completion
              // This should be implemented in your API
              resolve({ status: 'COMPLETED', txid });
            },
            onCancel: (paymentId) => {
              resolve({ status: 'CANCELLED' });
            },
            onError: (error, payment) => {
              reject(error);
            },
          },
        );
      });
    },
    openShareDialog: async (title: string, message: string): Promise<void> => {
      return piNetwork.Pi.openShareDialog(title, message);
    },
    createPayment: async (paymentData): Promise<string> => {
      // This method should be implemented on your server-side
      // Here, we'll just simulate it with a client-side call
      return new Promise((resolve) => {
        piNetwork.Pi.createPayment(paymentData, {
          onReadyForServerApproval: (paymentId) => resolve(paymentId),
          onReadyForServerCompletion: () => {},
          onCancel: () => {},
          onError: () => {},
        });
      });
    },
    completePayment: async (paymentId: string, txid: string) => {
      // This should be implemented on your server-side
      // Here, we'll just simulate a successful completion
      return { status: 'COMPLETED', txid };
    },
    cancelPayment: async (paymentId: string): Promise<void> => {
      // This should be implemented on your server-side
      console.log(`Payment ${paymentId} cancelled`);
    },
    getUserProfile: async () => {
      const authResult = await piNetwork.Pi.authenticate(
        ['username'],
        onIncompletePaymentFound,
      );
      return authResult.user;
    },
  };

  return (
    <PiNetworkContext.Provider value={completePiNetwork}>
      {children}
    </PiNetworkContext.Provider>
  );
}

export const usePiNetworkContext = () => {
  const context = useContext(PiNetworkContext);
  if (!context) {
    throw new Error(
      'usePiNetworkContext must be used within a PiNetworkProvider',
    );
  }
  return context;
};

function onIncompletePaymentFound(payment: any) {
  console.log('Incomplete payment found:', payment);
  // Handle incomplete payment
}
