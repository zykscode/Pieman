'use client';

import { useEffect } from 'react';

const PiSdkLoader = () => {
  useEffect(() => {
    const initPi = () => {
      if (window.Pi) {
        window.Pi.init({
          version: '2.0',
          sandbox: process.env.NODE_ENV !== 'production',
        });
      }
    };

    if (window.Pi) {
      initPi();
    } else {
      window.addEventListener('pi-sdk-loaded', initPi);
    }

    return () => {
      window.removeEventListener('pi-sdk-loaded', initPi);
    };
  }, []);

  return null;
};

export default PiSdkLoader;
