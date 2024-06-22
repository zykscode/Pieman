// app/components/PiPayment.tsx
'use client';

import { usePiNetwork } from '#/hooks/usePiNetwork';
import { PaymentDTO } from '#/types';
import { useState } from 'react';

type PaymentStatus = 'created' | 'cancelled' | 'error' | 'approved' | 'completed' | null;

interface PaymentData {
  amount: number;
  memo: string;
  metadata: Record<string, any>;
}


interface PaymentCallbacks {
  onReadyForServerApproval: (paymentId: string) => void;
  onReadyForServerCompletion: (paymentId: string, txid: string) => void;
  onCancel: (paymentId: string) => void;
  onError: (error: Error, payment?: PaymentDTO) => void;
}

export default function PiPayment() {
  const Pi = usePiNetwork(process.env.NODE_ENV !== 'production');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null);

  const requestPayment = async () => {
    if (!Pi) return;

    try {
      const paymentData: PaymentData = {
        amount: 1,
        memo: "Test payment",
        metadata: { orderId: "12345" },
      };

      const callbacks: PaymentCallbacks = {
        onReadyForServerApproval: async function(paymentId: string) {
          console.log("Ready for server approval", paymentId);
          setPaymentStatus('approved');
          // Send paymentId to your server for approval
          try {
            const response = await fetch('/api/approve-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ paymentId }),
            });
            if (!response.ok) {
              throw new Error('Payment approval failed');
            }
          } catch (error) {
            console.error("Server approval error:", error);
            setPaymentStatus('error');
          }
        },
        onReadyForServerCompletion: async function(paymentId: string, txid: string) {
          console.log("Ready for server completion", paymentId, txid);
          setPaymentStatus('completed');
          // Send paymentId and txid to your server for completion
          try {
            const response = await fetch('/api/complete-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ paymentId, txid }),
            });
            if (!response.ok) {
              throw new Error('Payment completion failed');
            }
          } catch (error) {
            console.error("Server completion error:", error);
            setPaymentStatus('error');
          }
        },
        onCancel: function(paymentId: string) {
          console.log("Payment cancelled", paymentId);
          setPaymentStatus("cancelled");
        },
        onError: function(error: Error, payment?: PaymentDTO) {
          console.error("Payment error", error, payment);
          setPaymentStatus("error");
        },
      };

      Pi.createPayment(paymentData, callbacks);
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