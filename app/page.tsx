'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React, { lazy, Suspense, useEffect, useState } from 'react';

import LoadingSpinner from '#/components/LoadingSpinner';
import { useWallet } from '#/contexts/UserContext';

const Hero = lazy(() => import('../components/Hero'));
const Features = lazy(() => import('../components/Features'));
const FirstTimeVisitor = lazy(() => import('#/components/FirstTimeVisitor'));
const ReturningUserDashboard = lazy(
  () => import('#/components/ReturningUserDashboard'),
);
const TopTradersCard = lazy(() => import('#/components/TopTradersCard'));

const Page = () => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(false);
  const { isSignedIn, user } = useUser();
  const { balance, address } = useWallet();
  const [topTraders, setTopTraders] = useState([]);

  useEffect(() => {
    const isReturningUser = localStorage.getItem('isReturningUser');
    if (!isReturningUser) {
      setIsFirstTimeVisitor(true);
      localStorage.setItem('isReturningUser', 'true');
    }

    // Fetch top traders data
    fetchTopTraders();
  }, []);

  const fetchTopTraders = async () => {
    // Replace this with actual API call to fetch top traders
    const mockTopTraders = [
      { id: 1, username: 'trader1', rate: 500, type: 'buyer' },
      { id: 2, username: 'trader2', rate: 495, type: 'seller' },
      { id: 3, username: 'trader3', rate: 505, type: 'buyer' },
      { id: 4, username: 'trader4', rate: 498, type: 'seller' },
    ];
    setTopTraders(mockTopTraders);
  };

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
              <ReturningUserDashboard
                user={user}
                balance={balance}
                address={address}
              />
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
