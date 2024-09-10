// components/PiPayment.tsx
import React from 'react';

import { useToast } from '#/components/ui/use-toast';
import { PaymentData } from '#/types';

import { usePiNetworkContext } from '../contexts/PiNetworkContext';

export function PiPayment() {
  const piNetwork = usePiNetworkContext();
  const { toast } = useToast();

  const handlePayment = async () => {
    try {
      const paymentData: PaymentData = {
        amount: 1, // Example amount
        memo: 'Test payment',
        metadata: { orderId: '12345' },
      };

      const result = await piNetwork.makePayment(paymentData);

      if (result.status === 'COMPLETED') {
        toast({
          title: 'Payment Successful',
          description: `Transaction ID: ${result.txid}`,
        });
      } else {
        toast({
          title: 'Payment Cancelled',
          description: 'The payment was cancelled.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Payment Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return <button onClick={handlePayment}>Make Pi Payment</button>;
}
