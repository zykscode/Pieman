/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import React from 'react';

import { useToast } from '#/components/ui/use-toast';

import { useUser } from '../contexts/UserContext';

export function PiPayment() {
  useUser();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (typeof window === 'undefined' || !window.Pi) {
      toast({
        title: 'Error',
        description: 'Pi SDK is not available',
        variant: 'destructive',
      });
      return;
    }

    try {
      const paymentData = {
        amount: 1, // Example amount
        memo: 'Test payment',
        metadata: { orderId: '12345' },
      };

      const payment = await window.Pi.createPayment(paymentData, {
        onReadyForServerApproval: function (_paymentId: any) {
          // Server-side code to approve the payment
        },
        onReadyForServerCompletion: function (_paymentId: any, _txid: any) {
          // Server-side code to complete the payment
        },
        onCancel: function (_paymentId: any) {
          toast({
            title: 'Payment Cancelled',
            description: 'The payment was cancelled.',
            variant: 'destructive',
          });
        },
        onError: function (error: { message: any }, _payment: any) {
          console.error(error);
          toast({
            title: 'Payment Error',
            description: error.message,
            variant: 'destructive',
          });
        },
      });

      if (payment.status === 'COMPLETED') {
        toast({
          title: 'Payment Successful',
          description: `Transaction ID: ${payment.transaction.txid}`,
        });
      }
    } catch (error) {
      toast({
        title: 'Payment Error',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  };

  return <button onClick={handlePayment}>Make Pi Payment</button>;
}
