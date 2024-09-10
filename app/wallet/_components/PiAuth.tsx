'use client';

import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { Button } from '#/components/ui/button';
import { useToast } from '#/components/ui/use-toast';
import apiClient from '#/lib/api-client';
import { authenticate } from '#/lib/piNetwork';

export interface AuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
}

const PiAuth: React.FC = () => {
  const { toast } = useToast();

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

  const handleAuthenticate = () => {
    const scopes = ['username', 'payments', 'wallet_address'];
    authenticate(scopes)
      .then((authResult) => {
        if (
          authResult &&
          typeof authResult === 'object' &&
          'accessToken' in authResult &&
          'user' in authResult
        ) {
          authMutation.mutate(authResult as AuthResult);
        }
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Authentication failed',
          description:
            error instanceof Error
              ? error.message
              : 'An unknown error occurred',
        });
      });
  };

  return (
    <Button onClick={handleAuthenticate} disabled={authMutation.isPending}>
      {authMutation.isPending
        ? 'Authenticating...'
        : 'Authenticate with Pi Network'}
    </Button>
  );
};

export default PiAuth;
