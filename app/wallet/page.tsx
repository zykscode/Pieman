'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaExchangeAlt, FaHistory, FaWallet } from 'react-icons/fa';

import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { fetchTransactions, fetchWalletBalance } from '#/lib/api';

const WalletPage = () => {
  const [balance, setBalance] = useState({ pi: 0, naira: 0 });
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceData, transactionsData] = await Promise.all([
          fetchWalletBalance(),
          fetchTransactions(5),
        ]);
        setBalance(balanceData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Wallet</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaWallet className="mr-2" /> Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pi Balance</p>
                <p className="text-2xl font-bold">{balance.pi} Pi</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Naira Balance</p>
                <p className="text-2xl font-bold">₦{balance.naira}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button className="flex-1" asChild>
            <Link href="/exchange">
              <FaExchangeAlt className="mr-2" /> Exchange
            </Link>
          </Button>
          <Button className="flex-1" variant="outline">
            Add Funds
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaHistory className="mr-2" /> Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {transactions.map((tx: any) => (
                <li key={tx.id} className="flex justify-between items-center">
                  <span>{tx.type}</span>
                  <span>
                    {tx.amount} {tx.currency}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default WalletPage;
