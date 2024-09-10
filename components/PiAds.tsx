'use client';

import React, { useEffect } from 'react';

import { isAdReady, requestAd, showAd } from '../lib/api';

interface PiAdsProps {
  adType: 'interstitial' | 'rewarded'; // Remove 'banner' from here
  onAdLoaded?: () => void;
  onAdFailed?: (error: Error) => void;
}

const PiAds: React.FC<PiAdsProps> = ({ adType, onAdLoaded, onAdFailed }) => {
  useEffect(() => {
    const loadAd = async () => {
      try {
        const ready = await isAdReady(adType);
        if (!ready) {
          await requestAd(adType);
        }
        await showAd(adType);
        onAdLoaded?.();
      } catch (error) {
        console.error('Failed to load or show ad:', error);
        onAdFailed?.(error as Error);
      }
    };

    loadAd();
  }, [adType, onAdLoaded, onAdFailed]);

  return null;
};

export default PiAds;
