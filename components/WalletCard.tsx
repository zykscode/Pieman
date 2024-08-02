/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable unused-imports/no-unused-vars-ts */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa6';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

const WalletCard = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('0x1234...abcd');
  const [balance, setBalance] = useState(0);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    alert('Wallet address copied to clipboard!');
  };

  const handleConnectWallet = () => {
    // Logic to connect wallet
    setWalletConnected(true);
  };

  return (
    <Card className="mx-auto w-full max-w-md p-4 shadow-lg">
      <CardHeader className="flex items-center justify-between">
        <div>
          <CardTitle>Welcome, JONATHAN</CardTitle>
          <CardDescription>
            {walletConnected ? (
              <>
                <span>{walletAddress}</span>
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
          <div className="text-xl font-bold">${balance.toFixed(2)} USD</div>
          <div className="mt-4 flex space-x-4">
            <Button onClick={() => alert('Fund Wallet')}>Fund Wallet</Button>
            <Button variant="outline" onClick={() => alert('Withdraw')}>
              Withdraw
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex justify-between">
        <Button variant="outline" onClick={() => alert('New Transaction')}>
          + New Xcrow Transaction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WalletCard;
