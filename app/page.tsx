/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React, { lazy, Suspense, useCallback, useEffect, useState } from 'react';

import LoadingSpinner from '#/components/LoadingSpinner';
import { fetchTopTraders } from '#/lib/api';

const Hero = lazy(() => import('../components/Hero'));
const Features = lazy(() => import('../components/Features'));
const FirstTimeVisitor = lazy(() => import('#/components/FirstTimeVisitor'));
const ReturningUserDashboard = lazy(() =>
  import('#/components/ReturningUserDashboard').then((mod) => ({
    default: mod.default as React.ComponentType<{
      user: ReturnType<typeof useUser>['user'];
      balance: string | number;
      address: string;
      onRefresh: () => void;
    }>,
  })),
);
const TopTradersCard = lazy(() => import('#/components/TopTradersCard'));

const Page = () => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const [topTraders, setTopTraders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const traders = await fetchTopTraders();
      setTopTraders(traders);
    } catch (err) {
      setError('Failed to load data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const isReturningUser = localStorage.getItem('isReturningUser');
    if (!isReturningUser) {
      setIsFirstTimeVisitor(true);
      localStorage.setItem('isReturningUser', 'true');
    }

    if (isLoaded) {
      loadData();
    }
  }, [isLoaded, loadData]);

  if (!isLoaded) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex grow flex-col"
    >
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <Suspense fallback={<LoadingSpinner />}>
        {isFirstTimeVisitor ? (
          <FirstTimeVisitor />
        ) : (
          <div className="space-y-8 p-4 md:p-8">
            <Hero />
            {isSignedIn ? (
              <Suspense fallback={<LoadingSpinner />}>
                <ReturningUserDashboard
                  user={user}
                  balance={5}
                  address={'up'}
                  onRefresh={loadData}
                />
              </Suspense>
            ) : (
              <Features />
            )}
            <TopTradersCard traders={topTraders} isLoading={isLoading} />
          </div>
        )}
      </Suspense>
    </motion.div>
  );
};

export default Page;
