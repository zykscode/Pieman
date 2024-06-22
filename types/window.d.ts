interface Pi {
  init(arg0: { version: string; }): unknown;
  authenticate(scopes: string[], onIncompletePaymentFound: (payment: PaymentDTO) => void): Promise<AuthResult>;
  createPayment(paymentData: any, callbacks: any): Promise<any>;
}

interface Window {
  Pi: Pi;
}
