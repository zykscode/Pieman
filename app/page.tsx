/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */

'use client';

import React, { useEffect, useState } from 'react';

import Features from '#/components/features';
import FirstTimeVisitor from '#/components/first-time-visitor';
import Hero from '#/components/hero';

const Page = () => {
  const [isFirstTimeVisitor, setIsFirstTimeVisitor] = useState(false);

  useEffect(() => {
    const isReturningUser = localStorage.getItem('isReturningUser');
    if (!isReturningUser) {
      setIsFirstTimeVisitor(true);
      localStorage.setItem('isReturningUser', 'true');
    }
  }, []);
  return (
    <div className="flex grow flex-col">
      {isFirstTimeVisitor ? (
        <div className="flex flex-col">
          <FirstTimeVisitor />
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center bg-blue-900 p-8 text-white">
          <div>
            <Hero />
            <Features />
          </div>
        </main>
      )}
    </div>
  );
};

export default Page;
