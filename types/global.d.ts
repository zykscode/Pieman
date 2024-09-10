/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  Pi?: {
    init: (config: { version: string; sandbox?: boolean }) => void;
    authenticate: (
      scopes: string[],
      onIncompletePaymentFound: (payment: any) => void,
    ) => Promise<any>;
    createPayment: (paymentData: any, callbacks: any) => Promise<any>;
    // Add other Pi SDK methods as needed
  };
}
