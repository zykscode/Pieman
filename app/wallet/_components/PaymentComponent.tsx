'use client';

import React, { useState } from 'react';

import { useToast } from '#/components/ui/use-toast';
import apiClient from '#/lib/api-client';

interface PaymentComponentProps {
  userInfo: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ userInfo }) => {
  const { toast } = useToast();
  const buyerId = userInfo.uid!;
  const [sellerId, setSellerId] = useState<string>('');
  const [piAmount, setPiAmount] = useState<number>(0);
  const [nairaAmount, setNairaAmount] = useState<number>(0);
  const [rate, setRate] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [txid, setTxid] = useState<string | null>(null);

  const handleCreatePayment = async () => {
    try {
      const response = await apiClient.post('/api/createPayment', {
        sellerId,
        piAmount,
        nairaAmount,
        rate,
        description,
      });
      setPaymentId(response.data.paymentId);
      toast({
        variant: 'default',
        title: 'Payment Created',
        description: `Payment ID: ${response.data.paymentId}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to create payment',
        description: 'An error occurred while creating the payment.',
      });
    }
  };

  const handleSubmitPayment = async () => {
    try {
      const response = await apiClient.post('/api/submitPayment', {
        paymentId,
      });
      setTxid(response.data.txid);
      toast({
        variant: 'default',
        title: 'Payment Submitted',
        description: `Transaction ID: ${response.data.txid}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to submit payment',
        description: 'An error occurred while submitting the payment.',
      });
    }
  };

  const handleCompletePayment = async () => {
    try {
      const response = await apiClient.post('/api/completePayment', {
        paymentId,
        txid,
      });
      toast({
        variant: 'default',
        title: 'Payment Completed',
        description: `Payment: ${response.data.completedPayment.identifier}`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to complete payment',
        description: 'An error occurred while completing the payment.',
      });
    }
  };

  return (
    <div>
      <input type="text" value={buyerId} readOnly placeholder="Buyer ID" />
      <input
        type="text"
        value={sellerId}
        onChange={(e) => setSellerId(e.target.value)}
        placeholder="Seller ID"
      />
      <input
        type="number"
        value={piAmount}
        onChange={(e) => setPiAmount(Number(e.target.value))}
        placeholder="Pi Amount"
      />
      <input
        type="number"
        value={nairaAmount}
        onChange={(e) => setNairaAmount(Number(e.target.value))}
        placeholder="Naira Amount"
      />
      <input
        type="number"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
        placeholder="Rate"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleCreatePayment}>Create Payment</button>
      {paymentId && (
        <>
          <button onClick={handleSubmitPayment}>Submit Payment</button>
          <button onClick={handleCompletePayment}>Complete Payment</button>
        </>
      )}
    </div>
  );
};

export default PaymentComponent;
