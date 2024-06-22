// app/components/PiAuth.tsx
'use client';

import { usePiNetwork } from '#/hooks/usePiNetwork';
import { useState } from 'react';

export interface AuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
}

export interface PaymentDTO {
  identifier: string;
  user_uid: string;
  amount: number;
  memo: string;
  metadata: Object;
  from_address: string;
  to_address: string;
  direction: "user_to_app" | "app_to_user";
  created_at: string;
  network: "Pi Network" | "Pi Testnet";
  status: {
    developer_approved: boolean;
    transaction_verified: boolean;
    developer_completed: boolean;
    cancelled: boolean;
    user_cancelled: boolean;
  };
  transaction: null | {
    txid: string;
    verified: boolean;
    _link: string;
  };
}

export default function PiAuth() {
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');
  const [authInfo, setAuthInfo] = useState<AuthResult | null>(null);

  const authenticate = async () => {
    if (!Pi) return;

    try {
      const scopes = ['username', 'payments', 'wallet_address'];
      const onIncompletePaymentFound = (payment: PaymentDTO) => {
        console.log('Incomplete payment found:', payment);
        // Handle incomplete payment (e.g., send to your server for completion)
      };

      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
      setAuthInfo(auth);
      console.log("Authentication successful:", auth);

      // Verify the authentication with your server
      try {
        const response = await fetch('/api/verify-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken: auth.accessToken }),
        });
        
        if (!response.ok) {
          throw new Error('Server verification failed');
        }
        
        const verifiedUser = await response.json();
        console.log("Server verified user:", verifiedUser);
      } catch (error) {
        console.error("Server verification error:", error);
        setAuthInfo(null);
      }
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