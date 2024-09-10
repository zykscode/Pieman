'use client';

import { APIUserScopes } from '@pinetwork-js/api-typing';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { Button } from '#/components/ui/button';
import { useToast } from '#/components/ui/use-toast';
import apiClient from '#/lib/api-client';
import { authenticate } from '#/utils/piNetwork';

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
    const scopes: APIUserScopes[] = ['username', 'payments', 'wallet_address'];
    authenticate(scopes)
      .then((authResult) => {
        if (authResult && authResult.user && authResult.accessToken) {
          // Handle successful authentication
          console.log('Authenticated user:', authResult.user);
        }
      })
      .catch((error) => {
        console.error('Authentication failed:', error);
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
