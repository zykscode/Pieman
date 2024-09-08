import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { Button } from '#/components/ui/button';
import { useToast } from '#/components/ui/use-toast';
import { usePiNetwork } from '#/hooks/usePiNetwork';
import apiClient from '#/lib/api-client';

export interface AuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
}

interface Payment {
  from_address: string;
  to_address: string;
}

const PiAuth: React.FC = () => {
  const { toast } = useToast();
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');

  const authMutation = useMutation<unknown, Error, AuthResult>({
    mutationFn: (authResult) =>
      apiClient.post('/api/wallet/signin', { authResult }),
    onSuccess: () => {
      toast({
        title: 'Authentication successful',
        description:
          'You have been successfully authenticated with Pi Network.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Authentication failed',
        description: error.message || 'An unknown error occurred',
      });
    },
  });

  const onIncompletePaymentFound = (payment: Payment) => {
    toast({
      variant: 'destructive',
      title: 'Incomplete payment found',
      description: `Payment from ${payment.from_address} to ${payment.to_address} is incomplete.`,
    });
  };

  const authenticate = async () => {
    if (!Pi) return;

    const scopes = ['username', 'payments', 'wallet_address'];

    try {
      const authResult = await Pi.authenticate(
        scopes,
        onIncompletePaymentFound,
      );
      if (authResult) {
        authMutation.mutate(authResult);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Authentication failed',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  return (
    <Button onClick={authenticate} disabled={authMutation.isPending}>
      {authMutation.isPending
        ? 'Authenticating...'
        : 'Authenticate with Pi Network'}
    </Button>
  );
};

export default PiAuth;
