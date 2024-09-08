import PiNetwork from 'pi-backend';

const apiKey = process.env.PI_API_KEY;
const walletPrivateSeed = process.env.PI_WALLET_PRIVATE_SEED;

if (!apiKey || !walletPrivateSeed) {
  throw new Error(
    'PI_API_KEY and PI_WALLET_PRIVATE_SEED must be set in environment variables',
  );
}

const pi = new PiNetwork(apiKey, walletPrivateSeed);

export default pi;
