'use client';

/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';
import React from 'react';

import { useToast } from '#/components/ui/use-toast';
import { usePiNetwork } from '#/hooks/usePiNetwork';

export interface AuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
}

const PiAuth = ({
  setAuthInfo,
  authInfo,
}: {
  setAuthInfo: any;
  authInfo: any;
}) => {
  const { toast } = useToast();
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');

  const handleAuthenticationError = (error: any, defaultMessage: string) => {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    toast({
      variant: 'destructive',
      title: defaultMessage,
      description: errorMessage,
    });
  };

  const verifyAuthenticationWithServer = async (accessToken: string) => {
    try {
      const response = await axios.get('https://api.minepi.com/v2/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const verifiedUser = await response.data;
      toast({
        variant: 'default',
        title: 'Server verified user',
        description: `User ${verifiedUser.username} has been verified by the server.`,
      });

      setAuthInfo(verifiedUser);
    } catch (error) {
      handleAuthenticationError(error, 'Server verification error');
      setAuthInfo(null);
    }
  };

  const authenticate = async () => {
    if (!Pi) return;

    const scopes = ['username', 'payments', 'wallet_address'];

    const handleIncompletePayment = (payment: any) => {
      toast({
        variant: 'destructive',
        title: 'Incomplete payment found',
        description: `Payment from ${payment.from_address} to ${payment.to_address} is incomplete.`,
      });
    };

    try {
      const auth = await Pi.authenticate(scopes, handleIncompletePayment);
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

  return (
    <div className="w-full bg-yellow-800">
      {!authInfo ? (
        <button onClick={authenticate}>Authenticate with Pi Network</button>
      ) : (
        <p>Authenticated as: {authInfo.username}</p>
      )}
    </div>
  );
};

export default PiAuth;
