'use client';

import React, { useEffect, useState } from 'react';

import FirstTimeVisitor from '#/components/first-time-visitor';

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
    <div className="flex grow flex-col bg-green-500">
      {isFirstTimeVisitor ? (
        <div className="flex flex-col">
          <FirstTimeVisitor />
          <div className="h min-h-screen bg-yellow-200">hdhd</div>
        </div>
      ) : (
        <div>
          <h1>Welcome back!</h1>
          <p>This is the regular content for returning users.</p>
        </div>
      )}
    </div>
  );
};

export default Page;
