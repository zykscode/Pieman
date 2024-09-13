'use client';

import React, { useEffect, useState } from 'react';

import Features from '#/components/Features';
import Hero from '#/components/Hero';
import TopTradersCard from '#/components/TopTradersCard';
import { Trader } from '#/types';

import ReturningUserDashboard from '../components/ReturningUserDashboard';
import { fetchTopTraders } from '../lib/api';

const Page: React.FC = () => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState<boolean>(false);
  const [topTraders, setTopTraders] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    checkFirstTimeVisitor();
    loadTopTraders();
    simulateSignInCheck();
  }, []);

  const checkFirstTimeVisitor = (): void => {
    const isReturningUser = localStorage.getItem('isReturningUser');
    if (!isReturningUser) {
      setIsFirstTimeVisitor(true);
      localStorage.setItem('isReturningUser', 'true');
    }
  };

  const loadTopTraders = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const traders = await fetchTopTraders();
      setTopTraders(traders);
    } catch (error) {
      console.error('Failed to fetch top traders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateSignInCheck = (): void => {
    // Replace this with actual authentication logic
    setIsSignedIn(Math.random() > 0.5);
  };

  if (isFirstTimeVisitor) {
    return <div>Welcome, first-time visitor!</div>;
  }

  return (
    <div className="flex grow flex-col space-y-8 p-4 md:p-8">
      <Hero />
      {isSignedIn ? <ReturningUserDashboard /> : <Features />}
      <TopTradersCard traders={topTraders} isLoading={isLoading} />
    </div>
  );
};

export default Page;
