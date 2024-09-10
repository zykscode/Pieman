'use client';

import { useEffect, useState } from 'react';

import { authenticate } from '#/lib/piNetwork';

export function usePiAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const authResult = await authenticate([
          'username',
          'payments',
          'wallet_address',
        ]);
        setUser(authResult.user);
        setIsAuthenticated(true);
      } catch (err) {
        setError(err.message);
      }
    };

    authenticateUser();
  }, []);

  return { user, isAuthenticated, error };
}
