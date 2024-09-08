import PiNetwork from 'pi-backend';

const apiKey = process.env.PI_API_KEY;
const walletPrivateSeed = process.env.PI_WALLET_PRIVATE_SEED;

if (!apiKey || !walletPrivateSeed) {
  throw new Error(
    'PI_API_KEY and PI_WALLET_PRIVATE_SEED must be set in environment variables',
  );
}

const pi = new PiNetwork(apiKey, walletPrivateSeed);

export const createPayment = async (
  paymentData: PaymentData,
): Promise<string> => {
  return pi.createPayment(paymentData);
};

export const submitPayment = async (paymentId: string): Promise<string> => {
  return pi.submitPayment(paymentId);
};

export const completePayment = async (
  paymentId: string,
  txid: string,
): Promise<any> => {
  return pi.completePayment(paymentId, txid);
};

export const getPayment = async (paymentId: string): Promise<any> => {
  return pi.getPayment(paymentId);
};

export const cancelPayment = async (paymentId: string): Promise<any> => {
  return pi.cancelPayment(paymentId);
};

export const getIncompleteServerPayments = async (): Promise<any[]> => {
  return pi.getIncompleteServerPayments();
};

export default pi;
