'use client';

import * as React from "react";
import { usePiNetwork } from '#/hooks/usePiNetwork';
import { useState } from 'react';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '#/components/ui/toast';
import { useToast } from '#/components/ui/use-toast';

export interface AuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
}

export interface PaymentDTO {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Object;
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

export default function PiAuth() {
  const { addToast } = useToast();
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');
  const [authInfo, setAuthInfo] = useState<AuthResult | null>(null);

  const authenticate = async () => {
    if (!Pi) return;

    try {
      const scopes = ['username', 'payments', 'wallet_address'];
      const onIncompletePaymentFound = (payment: PaymentDTO) => {
        addToast({
          variant: 'warning',
          title: 'Incomplete payment found',
          description: `Payment from ${payment.from_address} to ${payment.to_address} is incomplete.`,
        });
      };

      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
      setAuthInfo(auth);
      addToast({
        variant: 'success',
        title: 'Authentication successful',
        description: `Authenticated as ${auth.user.username}`,
      });

      // Verify the authentication with your server
      try {
        const response = await fetch('/api/verify-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken: auth.accessToken }),
        });

        if (!response.ok) {
          throw new Error('Server verification failed');
        }

        const verifiedUser = await response.json();
        addToast({
          variant: 'success',
          title: 'Server verified user',
          description: `User ${verifiedUser.username} has been verified by the server.`,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        addToast({
          variant: 'error',
          title: 'Server verification error',
          description: errorMessage,
        });
        setAuthInfo(null);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      addToast({
        variant: 'error',
        title: 'Authentication failed',
        description: errorMessage,
      });
    }
  };

  return (
    <ToastProvider>
      <div className='yell bg-yellow-300 w-full'>
        <button onClick={authenticate}>Authenticate with Pi Network</button>
        {authInfo && <p>Authenticated as: {authInfo.user.username}</p>}
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
