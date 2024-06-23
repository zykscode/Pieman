'use client';

import * as React from "react";
import { usePiNetwork } from '#/hooks/usePiNetwork';
import { useState } from 'react';

import { useToast } from '#/components/ui/use-toast';
import axios from "axios";

export interface AuthResult {
  accessToken: string;
  user: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
}

export interface UserInfo {
    uid: string;
    username: string;
    wallet_address?: string; 
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
  const { toast } = useToast();
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');
  const [authInfo, setAuthInfo] = useState<UserInfo| null | any >(null);

  const authenticate = async () => {
    if (!Pi) return;
  
    const scopes = ['username', 'payments', 'wallet_address'];
  
    const handleIncompletePayment = (payment: { from_address: any; to_address: any; }) => {
      toast({
        variant: 'destructive',
        title: 'Incomplete payment found',
        description: `Payment from ${payment.from_address} to ${payment.to_address} is incomplete.`,
      });
    };
  
    try {
      const auth = await authenticateWithPi(scopes, handleIncompletePayment);
      setAuthInfo(auth!);
      toast({
        variant: 'default',
        title: 'Authentication successful',
        description: `Authenticated as ${auth!.user.username}`,
      });
      await verifyAuthenticationWithServer(auth!.accessToken);
    } catch (error) {
      handleAuthenticationError(error, 'Authentication failed');
    }
  };
  
  const authenticateWithPi = async (scopes: string[], handleIncompletePayment: { (payment: any): void; (payment: PaymentDTO): void; }) => {
    try {
      return await Pi!.authenticate(scopes, handleIncompletePayment);
    } catch (error) {
      handleAuthenticationError(error, 'Pi authentication failed');
    }
  };
  
  const verifyAuthenticationWithServer = async (accessToken: string) => {
   try {
          const response = await axios.get('https://api.minepi.com/v2/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
  
      const verifiedUser = await response.data;
      toast({
        variant: 'default',
        title: 'Server verified user',
        description: `User ${verifiedUser.username} has been verified by the server.`,
      });

      setAuthInfo(verifiedUser)
    } catch (error) {
      handleAuthenticationError(error, 'Server verification error');
      setAuthInfo(null);
    }
  };
  
  const handleAuthenticationError = (error: unknown, defaultMessage: string) => {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    toast({
      variant: 'destructive',
      title: defaultMessage,
      description: errorMessage,
    });
  };
  
  console.log(authInfo)

  return (
      <div className='yell bg-gray-800 w-full'>
      {!authInfo ?  <button onClick={authenticate}>Authenticate with Pi Network</button>
        : <p>Authenticated as: {authInfo.username}</p>}
      </div>
    
  );
}


