// utils/piNetwork.ts
import PiNetwork from 'pi-backend';

const pi = new PiNetwork(
  process.env.PI_API_KEY!,
  process.env.walletPrivateSeed!,
);

export default pi;
