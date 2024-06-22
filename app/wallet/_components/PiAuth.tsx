'use client'

import { useState } from 'react';
import { usePiNetwork } from '#/hooks/usePiNetwork';
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

export default function PiAuth() {
  const { toast } = useToast();
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');
  const [authInfo, setAuthInfo] = useState<AuthResult | null>(null);

  const authenticate = async () => {
    if (!Pi) return;

    const scopes = ['username', 'payments', 'wallet_address'];

    const handleIncompletePayment = (payment: PaymentDTO) => {
      toast({
        variant: 'destructive',
        title: 'Incomplete payment found',
        description: `Payment from ${payment.from_address} to ${payment.to_address} is incomplete.`,
      });
    };

    try {
      const auth = await authenticateWithPi(scopes, handleIncompletePayment);
      if (auth) {
        setAuthInfo(auth);
        toast({
          variant: 'default',
          title: 'Authentication successful',
          description: `Authenticated as ${auth.user.username}`,
        });
        await verifyAuthenticationWithServer(auth.accessToken);
      }
    } catch (error) {
      handleAuthenticationError(error, 'Authentication failed');
    }
  };

  const authenticateWithPi = async (scopes: string[], handleIncompletePayment: (payment: PaymentDTO) => void): Promise<AuthResult | null> => {
    try {
      return await Pi!.authenticate(scopes, handleIncompletePayment);
    } catch (error) {
      handleAuthenticationError(error, 'Pi authentication failed');
      return null;
    }
  };

  const verifyAuthenticationWithServer = async (accessToken: string) => {
    try {
      const response = await fetch('/api/verify-auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error('Server verification failed');
      }

      const verifiedUser = await response.json();
      toast({
        variant: 'default',
        title: 'Server verified user',
        description: `User ${verifiedUser.username} has been verified by the server.`,
      });
    } catch (error) {
      handleAuthenticationError(error, 'Server verification error');
      setAuthInfo(null);
    }
  };

  const handleAuthenticationError = (error: unknown, defaultMessage: string) => {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    toast({
      variant: 'destructive',
      title: defaultMessage,
      description: errorMessage,
    });
  };

  return (
    <div className='bg-yellow-800 w-full'>
      {!authInfo ? (
        <button onClick={authenticate}>Authenticate with Pi Network</button>
      ) : (
        <p>Authenticated as: {authInfo.user.username}</p>
      )}
    </div>
  );
}
