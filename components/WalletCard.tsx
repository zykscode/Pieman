import React, { useState } from 'react';

import { FaRegCopy } from "react-icons/fa6";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
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
    <Card className="w-full max-w-md mx-auto p-4 shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Welcome, JONATHAN</CardTitle>
          <CardDescription>
            {walletConnected ? (
              <>
                <span>{walletAddress}</span>
                <FaRegCopy className="inline h-5 w-5 ml-2 cursor-pointer" onClick={handleCopyAddress} />
              </>
            ) : (
              <span onClick={handleConnectWallet} className="cursor-pointer text-blue-500">
                Connect Wallet
              </span>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold">${balance.toFixed(2)} USD</div>
          <div className="flex space-x-4 mt-4">
            <Button onClick={() => alert('Fund Wallet')}>Fund Wallet</Button>
            <Button variant="outline" onClick={() => alert('Withdraw')}>Withdraw</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <Button variant="outline" onClick={() => alert('New Transaction')}>+ New Xcrow Transaction</Button>
      </CardFooter>
    </Card>
  );
};

export default WalletCard;
