import { useState } from 'react';

import Pi from '../utils/piNetwork';

export function usePiWallet() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const authenticate = async () => {
    try {
      const scopes = ['username', 'payments', 'wallet_address'];
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(auth.user);
      setAccessToken(auth.accessToken);
    } catch (err) {
      setError(err.message);
    }
  };

  const onIncompletePaymentFound = (payment) => {
    console.log('Incomplete payment found:', payment);
    // Handle incomplete payment
  };

  return { user, accessToken, error, authenticate };
}
s;
