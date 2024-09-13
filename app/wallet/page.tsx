'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';

import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { usePiWallet } from '#/hooks/usePiWallet';

const WalletPage = () => {
  const { user, accessToken, error, authenticate } = usePiWallet();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      authenticate();
    } else if (accessToken) {
      fetchWalletAddress(accessToken);
    }
  }, [user, accessToken, authenticate]);

  const fetchWalletAddress = (token: string) => {
    fetch('https://api.minepi.com/v2/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            `Failed to fetch wallet address: ${response.statusText}`,
          );
        }
      })
      .then((data) => {
        console.log('API Response:', data); // Log the entire response for debugging
        if (data && data.wallet && data.wallet.address) {
          setWalletAddress(data.wallet.address);
        } else {
          setApiError('Wallet address not found in API response');
        }
      })
      .catch((error) => {
        console.error('Error fetching wallet address:', error);
        setApiError(error.message || 'Error fetching wallet address');
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaUser className="mr-2" /> User Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Username:</strong> {user?.username || 'Loading...'}
            </p>
            <p>
              <strong>Wallet Address:</strong> {walletAddress || 'Loading...'}
            </p>
            {error && (
              <p className="text-red-500">Authentication Error: {error}</p>
            )}
            {apiError && <p className="text-red-500">API Error: {apiError}</p>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WalletPage;
