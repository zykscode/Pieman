/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable unused-imports/no-unused-vars-ts */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';

import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { useToast } from '#/components/ui/use-toast';
import apiClient from '#/lib/api-client';

const WalletCard = () => {
  const { toast } = useToast();
  const [walletConnected, setWalletConnected] = useState(false);

  const { data: walletData, isLoading } = useQuery({
    queryKey: ['walletBalance'],
    queryFn: async () => {
      const response = await apiClient.get('/api/wallet/balance');
      return response.data;
    },
    enabled: walletConnected,
  });

  const handleCopyAddress = () => {
    if (walletData?.address) {
      navigator.clipboard.writeText(walletData.address);
      toast({
        title: 'Address Copied',
        description: 'Wallet address copied to clipboard!',
      });
    }
  };

  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    setWalletConnected(true);
  };

  return (
    <Card className="mx-auto w-full max-w-md p-4 shadow-lg">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Welcome, User</CardTitle>
          <CardDescription>
            {walletConnected ? (
              <>
                <span>{walletData?.address || 'Loading...'}</span>
                <FaRegCopy
                  className="ml-2 inline size-5 cursor-pointer"
                  onClick={handleCopyAddress}
                />
              </>
            ) : (
              <span
                onClick={handleConnectWallet}
                className="cursor-pointer text-blue-500"
              >
                Connect Wallet
              </span>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">
            {isLoading
              ? 'Loading...'
              : `$${walletData?.balance.toFixed(2) || '0.00'} USD`}
          </div>
          <div className="mt-4 flex space-x-4">
            <Button
              onClick={() =>
                toast({
                  title: 'Fund Wallet',
                  description: 'Funding feature coming soon!',
                })
              }
            >
              Fund Wallet
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: 'Withdraw',
                  description: 'Withdrawal feature coming soon!',
                })
              }
            >
              Withdraw
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex justify-between">
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: 'New Transaction',
              description: 'Transaction feature coming soon!',
            })
          }
        >
          + New Escrow Transaction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WalletCard;
