'use client';

import React, { useEffect, useState } from 'react';

import { useToast } from '#/components/ui/use-toast';
import { authenticate, createPayment } from '#/utils/piNetwork';

interface PaymentComponentProps {
  sellerId: string;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ sellerId }) => {
  const [user, setUser] = useState(null);
  const [piAmount, setPiAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authResult = await authenticate([
          'username',
          'payments',
          'wallet_address',
        ]);
        setUser(authResult.user);
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    };
    initAuth();
  }, []);

  const handleCreatePayment = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please wait for authentication to complete.',
      });
      return;
    }

    const paymentData = {
      amount: parseFloat(piAmount),
      memo: 'Payment for goods or services',
      metadata: { sellerId },
    };

    createPayment(paymentData, {
      onReadyForServerApproval: (paymentId) => {
        console.log('Ready for server approval:', paymentId);
        toast({
          variant: 'default',
          title: 'Payment Created',
          description: `Payment ID: ${paymentId}`,
        });
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        console.log('Ready for server completion:', paymentId, txid);
        toast({
          variant: 'default',
          title: 'Payment Approved',
          description: `Transaction ID: ${txid}`,
        });
      },
      onCancel: (paymentId) => {
        console.log('Payment cancelled:', paymentId);
        toast({
          variant: 'destructive',
          title: 'Payment Cancelled',
          description: `Payment ID: ${paymentId}`,
        });
      },
      onError: (error, payment) => {
        console.error('Payment error:', error, payment);
        toast({
          variant: 'destructive',
          title: 'Payment Error',
          description: error.message,
        });
      },
    });
  };

  return (
    <div>
      {!user ? (
        <p>Authenticating...</p>
      ) : (
        <>
          <input
            type="number"
            value={piAmount}
            onChange={(e) => setPiAmount(e.target.value)}
            placeholder="Pi Amount"
          />
          <button onClick={handleCreatePayment}>Create Payment</button>
        </>
      )}
    </div>
  );
};

export default PaymentComponent;
