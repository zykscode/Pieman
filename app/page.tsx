'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';

import LoadingSpinner from '#/components/LoadingSpinner';
import { useWallet } from '#/contexts/UserContext';

interface Trader {
  id: number;
  username: string;
  rate: number;
  type: 'buyer' | 'seller';
}

const Hero = lazy(() => import('../components/Hero'));
const Features = lazy(() => import('../components/Features'));
const FirstTimeVisitor = lazy(() => import('#/components/FirstTimeVisitor'));
const ReturningUserDashboard = lazy(() =>
  import('#/components/ReturningUserDashboard').then((mod) => ({
    default: mod.default as React.ComponentType<{
      user: ReturnType<typeof useUser>['user'];
      balance: string | number;
      address: string;
    }>,
  })),
);
const TopTradersCard = lazy(() => import('#/components/TopTradersCard'));

const Page = () => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(false);
  const { isSignedIn, user } = useUser();
  const { balance, address } = useWallet();
  const [topTraders, setTopTraders] = useState<Trader[]>([]);

  const fetchTopTraders = useCallback(async () => {
    // TODO: Replace this with actual API call to fetch top traders
    const mockTopTraders: Trader[] = [
      { id: 1, username: 'trader1', rate: 500, type: 'buyer' },
      { id: 2, username: 'trader2', rate: 495, type: 'seller' },
      { id: 3, username: 'trader3', rate: 505, type: 'buyer' },
      { id: 4, username: 'trader4', rate: 498, type: 'seller' },
    ];
    setTopTraders(mockTopTraders);
  }, []);

  useEffect(() => {
    const isReturningUser = localStorage.getItem('isReturningUser');
    if (!isReturningUser) {
      setIsFirstTimeVisitor(true);
      localStorage.setItem('isReturningUser', 'true');
    }

    fetchTopTraders();
  }, [fetchTopTraders]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex grow flex-col"
    >
      <Suspense fallback={<LoadingSpinner />}>
        {isFirstTimeVisitor ? (
          <FirstTimeVisitor />
        ) : (
          <div className="space-y-8">
            <Hero />
            {isSignedIn ? (
              <Suspense fallback={<LoadingSpinner />}>
                <ReturningUserDashboard
                  user={user}
                  balance={balance}
                  address={address!}
                />
              </Suspense>
            ) : (
              <Features />
            )}
            <TopTradersCard traders={topTraders} />
          </div>
        )}
      </Suspense>
    </motion.div>
  );
};

export default Page;
