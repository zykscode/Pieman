'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '#/components/ui/use-toast';
import PiNetwork, { PaymentDTO } from 'pi-backend'; // Import PiNetwork and PaymentDTO

interface PaymentComponentProps {
  userInfo: {
    uid: string;
    username: string;
    wallet_address?: string;
  };
  piInstance: PiNetwork;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ userInfo, piInstance }) => {
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
      const paymentData = {
        amount: piAmount,
        memo: description,
        metadata: { nairaAmount, rate, sellerId },
        uid: buyerId,
      };

      const paymentId = await piInstance.createPayment(paymentData);
      setPaymentId(paymentId);
      toast({
        variant: 'default',
        title: 'Payment Created',
        description: `Payment ID: ${paymentId}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: 'destructive',
        title: 'Failed to create payment',
        description: errorMessage,
      });
    }
  };

  const handleSubmitPayment = async () => {
    try {
      const txid = await piInstance.submitPayment(paymentId!);
      setTxid(txid);
      toast({
        variant: 'default',
        title: 'Payment Submitted',
        description: `Transaction ID: ${txid}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: 'destructive',
        title: 'Failed to submit payment',
        description: errorMessage,
      });
    }
  };

  const handleCompletePayment = async () => {
    try {
      const completedPayment: PaymentDTO = await piInstance.completePayment(paymentId!, txid!);
      toast({
        variant: 'default',
        title: 'Payment Completed',
        description: `Payment: ${completedPayment.identifier}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        variant: 'destructive',
        title: 'Failed to complete payment',
        description: errorMessage,
      });
    }
  };

  console.log(buyerId,userInfo)

  return (
    <div>
      <input type="text" value={buyerId} readOnly placeholder="Buyer ID" />
      {/* <input
        type="text"
        value={sellerId}
        onChange={(e) => setSellerId(e.target.value)}
        placeholder="Seller ID"
      /> */}
      <input
        type="number"
        value={piAmount}
        onChange={(e) => setPiAmount(Number(e.target.value))}
        placeholder="Pi Amount"
      />
      {/* <input
        type="number"
        value={nairaAmount}
        onChange={(e) => setNairaAmount(Number(e.target.value))}
        placeholder="Naira Amount"
      /> */}
      {/* <input
        type="number"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
        placeholder="Rate"
      /> */}
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
