'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';

import { Pi } from '../utils/piNetwork';

// Add this type declaration
declare module '../utils/piNetwork' {
  interface PiClient {
    Ads: {
      showAd: (adType: 'interstitial' | 'rewarded') => Promise<any>;
      isAdReady: (adType: 'interstitial' | 'rewarded') => Promise<boolean>;
      requestAd: (adType: 'interstitial' | 'rewarded') => Promise<any>;
    };
  }
}

export function usePiNetwork() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      Pi.init({
        version: '2.0',
        sandbox: process.env.NODE_ENV !== 'production',
      });
      setIsInitialized(true);
    }
  }, [isInitialized]);

  return {
    Pi,
    isInitialized,
    showAd: (adType: 'interstitial' | 'rewarded') => Pi.Ads.showAd(adType),
    isAdReady: (adType: 'interstitial' | 'rewarded') =>
      Pi.Ads.isAdReady(adType),
    requestAd: (adType: 'interstitial' | 'rewarded') =>
      Pi.Ads.requestAd(adType),
  };
}
