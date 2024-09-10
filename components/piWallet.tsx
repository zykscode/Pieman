'use client';

import { useState, useEffect } from 'react';

export default function PiWallet() {
  const [walletDetails, setWalletDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWalletDetails() {
      try {
        const response = await fetch('/api/pi-wallet');
        if (!response.ok) {
          throw new Error('Failed to fetch wallet details');
        }
        const data = await response.json();
        setWalletDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWalletDetails();
  }, []);

  if (loading) return <div>Loading wallet details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Pi Wallet Details</h2>
      <p>Public Key: {walletDetails.publicKey}</p>
      <h3>Balances:</h3>
      <ul>
        {walletDetails.balances.map((balance, index) => (
          <li key={index}>
            {balance.asset_type === 'native' ? 'Pi' : balance.asset_code}: {balance.balance}
          </li>
        ))}
      </ul>
    </div>
  );
}