// components/PiSdkLoader.tsx
'use client'; // Ensure this only runs on the client side
import Script from 'next/script';
import { useEffect } from 'react';

const PiSdkLoader = () => {
  useEffect(() => {
    const initPi = () => {
      if (window.Pi) {
        window.Pi.init({ version: '2.0' });
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

  return (
    <>
      <Script
        src="https://sdk.minepi.com/pi-sdk.js"
        strategy="lazyOnload" // Load lazily after the page has loaded
        onLoad={() => {
          if (window.Pi) {
            window.Pi.init({ version: '2.0' });
            window.dispatchEvent(new Event('pi-sdk-loaded'));
          }
        }}
      />
    </>
  );
};

export default PiSdkLoader;
