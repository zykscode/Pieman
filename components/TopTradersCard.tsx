import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { Trader, useTopTraders } from '#/hooks/useTopTraders';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

const TopTradersCard: React.FC = () => {
  const { traders, isLoading, error } = useTopTraders(5);

  const renderTraderItem = (trader: Trader, index: number) => (
    <motion.li
      key={trader.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center justify-between rounded-lg bg-muted p-2 sm:p-3"
    >
      <span className="font-medium truncate mr-2">{trader.username}</span>
      <div className="flex items-center">
        <span className="mr-2 font-semibold whitespace-nowrap">
          {trader.rate.toLocaleString()} NGN/Pi
        </span>
        {trader.type === 'buyer' ? (
          <FaArrowUp className="text-green-500" />
        ) : (
          <FaArrowDown className="text-red-500" />
        )}
      </div>
    </motion.li>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (traders.length === 0) {
      return <p>No top traders found at the moment.</p>;
    }

    return (
      <ul className="space-y-2">
        {traders.map((trader, index) => renderTraderItem(trader, index))}
      </ul>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Top 5 Traders</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default TopTradersCard;
