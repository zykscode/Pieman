'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { useToast } from '#/components/ui/use-toast';
import { createExchange } from '#/lib/api';

const ExchangePage = () => {
  const [amount, setAmount] = useState('');
  const [exchangeType, setExchangeType] = useState<'buy' | 'sell'>('buy');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExchange = async () => {
    if (!amount) {
      toast({
        title: 'Error',
        description: 'Please enter an amount',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await createExchange(
        exchangeType,
        parseFloat(amount),
        exchangeType === 'buy' ? 'NGN' : 'PI',
      );
      toast({
        title: 'Success',
        description: `${exchangeType === 'buy' ? 'Bought' : 'Sold'} ${amount} ${exchangeType === 'buy' ? 'Pi' : 'Naira'}`,
      });
      setAmount('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process exchange. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Exchange Pi/Naira</h1>
      <Card>
        <CardHeader>
          <CardTitle>{exchangeType === 'buy' ? 'Buy Pi' : 'Sell Pi'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button
                onClick={() => setExchangeType('buy')}
                variant={exchangeType === 'buy' ? 'default' : 'outline'}
              >
                Buy
              </Button>
              <Button
                onClick={() => setExchangeType('sell')}
                variant={exchangeType === 'sell' ? 'default' : 'outline'}
              >
                Sell
              </Button>
            </div>
            <Input
              type="number"
              placeholder={`Amount in ${exchangeType === 'buy' ? 'Naira' : 'Pi'}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="text-sm">
              Estimated {exchangeType === 'buy' ? 'Pi' : 'Naira'}:{' '}
              {amount
                ? parseFloat(amount) * (exchangeType === 'buy' ? 0.5 : 2)
                : 0}
            </div>
            <Button
              className="w-full"
              onClick={handleExchange}
              disabled={isLoading}
            >
              {isLoading
                ? 'Processing...'
                : exchangeType === 'buy'
                  ? 'Buy Pi'
                  : 'Sell Pi'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExchangePage;
