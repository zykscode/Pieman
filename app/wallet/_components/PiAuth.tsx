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

const PiAuth = () => {
  const { toast } = useToast();
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');

  const authMutation = useMutation({
    mutationFn: async (authResult: AuthResult) => {
      const response = await apiClient.post('/api/wallet/signin', {
        authResult,
      });
      return response.data;
    },
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
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

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

  const onIncompletePaymentFound = (payment: any) => {
    toast({
      variant: 'destructive',
      title: 'Incomplete payment found',
      description: `Payment from ${payment.from_address} to ${payment.to_address} is incomplete.`,
    });
  };

  return (
    <Button onClick={authenticate} disabled={authMutation.isLoading}>
      {authMutation.isLoading
        ? 'Authenticating...'
        : 'Authenticate with Pi Network'}
    </Button>
  );
};

export default PiAuth;
