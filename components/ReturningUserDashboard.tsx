import { User } from '@clerk/nextjs/server';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { FaExchangeAlt, FaHistory, FaWallet } from 'react-icons/fa';

import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ReturningUserDashboardProps {
  user: User | null;
  balance: number;
  address: string | null;
}

const ReturningUserDashboard: React.FC<ReturningUserDashboardProps> = ({
  user,
  balance,
  address,
}) => {
  return (
    <div className="w-full max-w-4xl p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-3xl font-bold text-white"
      >
        Welcome back, {user?.username}!
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaWallet className="mr-2" /> Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{balance} Pi</p>
              <p className="text-sm text-gray-500 truncate">{address}</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaExchangeAlt className="mr-2" /> Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Button variant="outline">
                <Link href="/exchange">Exchange Pi/Naira</Link>
              </Button>
              <Button variant="outline">
                <Link href="/deposit">Deposit Funds</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FaHistory className="mr-2" /> Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-sm">Exchange: 10 Pi to 5000 Naira</li>
                <li className="text-sm">Deposit: 20 Pi</li>
                <li className="text-sm">Withdrawal: 2000 Naira</li>
              </ul>
              <Button variant="link" className="mt-2 text-sm">
                <Link href="/transactions">View all transactions</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturningUserDashboard;
