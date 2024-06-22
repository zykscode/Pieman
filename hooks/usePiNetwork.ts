// app/hooks/usePiNetwork.ts
import { AuthResult, PaymentDTO } from '#/types';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string, sandbox?: boolean }) => void;
      authenticate: (scopes: string[], onIncompletePaymentFound: (payment: PaymentDTO) => void) => Promise<AuthResult>;
      createPayment: (paymentData: any, callbacks: any) => void;
    };
  }
}

export function usePiNetwork(sandbox: boolean = false) {
  const [Pi, setPi] = useState<Window['Pi']>();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.minepi.com/pi-sdk.js';
    script.async = true;
    script.onload = () => {
      window.Pi?.init({ version: "2.0", sandbox });
      setPi(window.Pi);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [sandbox]);

  return Pi;
}