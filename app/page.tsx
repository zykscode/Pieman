'use client';

import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React, { lazy, Suspense } from 'react';

import LoadingSpinner from '#/components/LoadingSpinner';
import { useWallet } from '#/contexts/UserContext';

const Hero = lazy(() => import('../components/Hero'));
const Features = lazy(() => import('../components/Features'));
const FirstTimeVisitor = lazy(() => import('#/components/FirstTimeVisitor'));
const ReturningUserDashboard = lazy(
  () => import('#/components/ReturningUserDashboard'),
);

const Page = () => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = React.useState(false);
  const { isSignedIn, user } = useUser();
  const { balance, address } = useWallet();

  React.useEffect(() => {
    const isReturningUser = localStorage.getItem('isReturningUser');
    if (!isReturningUser) {
      setIsFirstTimeVisitor(true);
      localStorage.setItem('isReturningUser', 'true');
    }
  }, []);

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
          <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-blue-900 to-indigo-800">
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
          </main>
        )}
      </Suspense>
    </motion.div>
  );
};

export default Page;
