'use client';

import React, { useEffect } from 'react';

import { isAdReady, requestAd, showAd } from '#/lib/api';

interface PiAdsProps {
  adType: 'banner' | 'interstitial' | 'rewarded';
}

const PiAds: React.FC<PiAdsProps> = ({ adType }) => {
  useEffect(() => {
    const loadAd = async () => {
      try {
        const ready = await isAdReady(adType);
        if (!ready) {
          await requestAd(adType);
        }
        await showAd(adType);
      } catch (error) {
        console.error('Error loading or showing ad:', error);
      }
    };

    loadAd();
  }, [adType]);

  return null; // This component doesn't render anything
};

export default PiAds;
