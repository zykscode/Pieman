/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

import { authenticate } from '#/lib/piNetwork';

export function usePiAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const authResult = await authenticate([
          'username',
          'payments',
          'wallet_address',
        ]);
        setUser((authResult as { user: any }).user);
        setIsAuthenticated(true);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    authenticateUser();
  }, []);

  return { user, isAuthenticated, error };
}
