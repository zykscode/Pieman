// app/components/PiAuth.tsx
'use client';

import { usePiNetwork } from '#/hooks/usePiNetwork';
import { useState } from 'react';

interface AuthInfo {
  user: {
    uid: string;
    username: string;
  };
  accessToken: string;
}

export default function PiAuth() {
  const Pi = usePiNetwork();
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);

  const authenticate = async () => {
    if (!Pi) return;

    try {
      const scopes = ['payments'];
      const onIncompletePaymentFound = (payment: any) => {
        console.log('Incomplete payment found:', payment);
        // Handle incomplete payment
      };

      const auth: AuthInfo = await Pi.authenticate(scopes, onIncompletePaymentFound);
      setAuthInfo(auth);
      console.log("Authentication successful:", auth);
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <div>
      <button onClick={authenticate}>Authenticate with Pi Network</button>
      {authInfo && <p>Authenticated as: {authInfo.user.username}</p>}
    </div>
  );
}
