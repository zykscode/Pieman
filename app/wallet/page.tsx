/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Effect running. User:', user, 'AccessToken:', accessToken);

    const fetchData = async () => {
      if (!user && !isLoading) {
        console.log('Authenticating...');
        setIsLoading(true);
        await authenticate();
        setIsLoading(false);
      } else if (accessToken && !apiResponse && !isLoading) {
        console.log('Fetching user data...');
        setIsLoading(true);
        await fetchUserData(accessToken);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user, accessToken, authenticate, apiResponse]);

  const fetchUserData = async (token: string) => {
    try {
      console.log('Fetching user data with token:', token);
      const response = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('API Response:', data);
      setApiResponse(data);
      if (data && data.wallet_address) {
        setWalletAddress(data.wallet_address);
      } else {
        setApiError('Wallet address not found in API response');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setApiError(
        error instanceof Error ? error.message : 'Error fetching user data',
      );
    }
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
              <strong>Username:</strong> {apiResponse?.username || 'Loading...'}
            </p>
            <p>
              <strong>Wallet Address:</strong> {walletAddress || 'Loading...'}
            </p>
            {error && (
              <p className="text-red-500">Authentication Error: {error}</p>
            )}
            {apiError && <p className="text-red-500">API Error: {apiError}</p>}
            {isLoading && <p>Loading...</p>}
            {apiResponse && (
              <div>
                <h3 className="font-bold mt-4">API Response:</h3>
                <pre className="bg-gray-100 p-2 mt-2 rounded overflow-auto max-h-60">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WalletPage;
