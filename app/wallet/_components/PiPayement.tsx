// app/components/PiPayment.tsx
'use client';

import { usePiNetwork } from '#/hooks/usePiNetwork';
import { useState } from 'react';

type PaymentStatus = 'created' | 'cancelled' | 'error' | null;

interface PaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: any) => void;
}

export default function PiPayment() {
  const Pi = usePiNetwork();
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null);

  const requestPayment = async () => {
    if (!Pi) return;

    try {
      const paymentData = {
        amount: 1, // Amount of Pi to be paid
        memo: "Test payment", // Explanation of the payment
        metadata: { orderId: "12345" }, // Arbitrary developer-provided metadata
      };

      const callbacks: PaymentCallbacks = {
        onReadyForServerApproval: function(paymentId: string) {
          console.log("Ready for server approval", paymentId);
          // Call your server to approve the payment
        },
        onReadyForServerCompletion: function(paymentId: string, txid: string) {
          console.log("Ready for server completion", paymentId, txid);
          // Call your server to complete the payment
        },
        onCancel: function(paymentId: string) {
          console.log("Payment cancelled", paymentId);
          setPaymentStatus("cancelled");
        },
        onError: function(error: Error, payment?: any) {
          console.error("Payment error", error);
          setPaymentStatus("error");
        },
      };

      const payment = await Pi.createPayment(paymentData, callbacks);

      console.log("Payment created:", payment);
      setPaymentStatus("created");
    } catch (error) {
      console.error("Error creating payment:", error);
      setPaymentStatus("error");
    }
  };

  return (
    <div>
      <button onClick={requestPayment}>Request Payment</button>
      {paymentStatus && <p>Payment status: {paymentStatus}</p>}
    </div>
  );
}