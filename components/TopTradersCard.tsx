import { motion } from 'framer-motion';
import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Trader {
  id: number;
  username: string;
  rate: number;
  type: 'buyer' | 'seller';
}

interface TopTradersCardProps {
  traders: Trader[];
}

const TopTradersCard: React.FC<TopTradersCardProps> = ({ traders }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Top Traders</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {traders.map((trader, index) => (
            <motion.li
              key={trader.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between rounded-lg bg-muted p-2"
            >
              <span className="font-medium">{trader.username}</span>
              <div className="flex items-center">
                <span className="mr-2 font-semibold">{trader.rate} NGN/Pi</span>
                {trader.type === 'buyer' ? (
                  <FaArrowUp className="text-green-500" />
                ) : (
                  <FaArrowDown className="text-red-500" />
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TopTradersCard;
