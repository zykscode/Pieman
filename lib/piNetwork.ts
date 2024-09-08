/* eslint-disable @typescript-eslint/no-explicit-any */
import PiNetwork from 'pi-backend';

interface PaymentData {
  amount: number;
  memo: string;
  metadata: {
    nairaAmount: number;
    rate: number;
    sellerId: string;
  };
  uid: string;
}

export const PI_API_KEY =
  'tprjoipbmycfphacmeocljtu3pbwoghujrkqiifuim32ogjwiehy0w2pypy2efru';
export const PI_WALLET_PRIVATE_SEED =
  'SCR6OLW5T5HUF6Y5Q52UZ7JH2LNJ4YQKNSHZZFS4WQXYYL22JG72LNET';
// Initialize PiNetwork SDK
const pi = new PiNetwork(PI_API_KEY, PI_WALLET_PRIVATE_SEED);

export async function createPayment(paymentData: PaymentData): Promise<string> {
  return pi.createPayment(paymentData);
}

export async function submitPayment(paymentId: string): Promise<string> {
  return pi.submitPayment(paymentId);
}

export async function completePayment(
  paymentId: string,
  txid: string,
): Promise<any> {
  return pi.completePayment(paymentId, txid);
}

export async function getPayment(paymentId: string): Promise<any> {
  return pi.getPayment(paymentId);
}

export async function cancelPayment(paymentId: string): Promise<any> {
  return pi.cancelPayment(paymentId);
}

export async function getIncompleteServerPayments(): Promise<any[]> {
  return pi.getIncompleteServerPayments();
}

export default pi;
