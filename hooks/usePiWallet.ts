/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIUser } from '@pinetwork-js/api-typing';
import { APIUserScopes } from '@pinetwork-js/api-typing';
import { useState } from 'react';

import { Pi } from '#/lib/piNetwork';

export function usePiWallet() {
  const [user, setUser] = useState<APIUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const authenticate = async () => {
    try {
      const scopes: APIUserScopes[] = [
        'username',
        'payments',
        'wallet_address',
      ];
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(auth.user);
      setAccessToken(auth.accessToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const onIncompletePaymentFound = (payment: any) => {
    console.log('Incomplete payment found:', payment);
    // Handle incomplete payment
  };

  return { user, accessToken, error, authenticate };
}
