/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/button-has-type */
// PiPayment.tsx

import type PiNetwork from 'pi-backend';
import React, { useState } from 'react';

import { useToast } from '#/components/ui/use-toast';

export interface PiPaymentProps {
  userUid: string; // assuming you have a way to get the user's unique ID
  piInstance: PiNetwork | null; // PiNetwork instance received from PiAuth
}

const PiPayment: React.FC<PiPaymentProps> = ({ userUid, piInstance }) => {
  const { toast } = useToast();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [txid, setTxid] = useState<string | null>(null);

  const handlePaymentError = (error: any, defaultMessage: string) => {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    toast({
      variant: 'destructive',
      title: defaultMessage,
      description: errorMessage,
    });
  };

  const handleSubmitPayment = async () => {
    if (!piInstance || !paymentId) {
      toast({
        variant: 'destructive',
        title: 'Payment or PiNetwork instance not available',
        description: 'Payment creation is required first.',
      });
      return;
    }

    try {
      // Submit payment to Pi Blockchain and store txid in state
      const newTxid = await piInstance.submitPayment(paymentId);
      setTxid(newTxid);
      toast({
        variant: 'default',
        title: 'Payment Submitted',
        description: `TXID: ${newTxid}`,
      });
    } catch (error) {
      handlePaymentError(error, 'Error submitting payment');
    }
  };

  const handleCompletePayment = async () => {
    if (!piInstance || !paymentId || !txid) {
      toast({
        variant: 'destructive',
        title: 'Payment or PiNetwork instance not available',
        description: 'Payment submission is required first.',
      });
      return;
    }

    try {
      // Complete payment and handle response
      const completedPayment = await piInstance.completePayment(
        paymentId,
        txid,
      );
      toast({
        variant: 'default',
        title: 'Payment Completed',
        description: `Payment Status: ${completedPayment.status.developer_completed ? 'Completed' : 'Not Completed'}`,
      });
    } catch (error) {
      handlePaymentError(error, 'Error completing payment');
    }
  };

  const handleCreatePayment = async () => {
    if (!piInstance) {
      toast({
        variant: 'destructive',
        title: 'PiNetwork instance not available',
        description: 'Authentication with Pi Network is required.',
      });
      return;
    }

    try {
      // Create payment data
      const paymentData = {
        amount: 1, // Amount of Pi to send
        memo: 'Payment for goods/services', // Memo for the payment
        metadata: { productId: 'product_id' }, // Metadata for linking with business logic
        uid: userUid, // User's unique ID in your application
      };

      // Create payment and store paymentId in state
      const newPaymentId = await piInstance.createPayment(paymentData);
      setPaymentId(newPaymentId);
      toast({
        variant: 'default',
        title: 'Payment Created',
        description: `Payment ID: ${newPaymentId}`,
      });
    } catch (error) {
      handlePaymentError(error, 'Error creating payment');
    }
  };

  return (
    <div>
      <h2>Make Payment</h2>
      <button onClick={handleCreatePayment}>Create Payment</button>
      <button onClick={handleSubmitPayment}>Submit Payment</button>
      <button onClick={handleCompletePayment}>Complete Payment</button>
    </div>
  );
};

export default PiPayment;
