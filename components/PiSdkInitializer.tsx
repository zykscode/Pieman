'use client';

import { useEffect } from 'react';

const PiSdkInitializer = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Pi) {
      window.Pi.init({
        version: '2.0',
        sandbox: process.env.NODE_ENV !== 'production',
      });
    }
  }, []);

  return null;
};

export default PiSdkInitializer;
