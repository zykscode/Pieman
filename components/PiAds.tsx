// components/PiAds.tsx
import React from 'react';

import { useToast } from '#/components/ui/use-toast';

import { usePiNetworkContext } from '../contexts/PiNetworkContext';

export function PiAds() {
  const piNetwork = usePiNetworkContext();
  const { toast } = useToast();

  const handleShowAd = async (adType: 'interstitial' | 'rewarded') => {
    try {
      const isReady = await piNetwork.isAdReady(adType);
      if (!isReady.ready) {
        await piNetwork.requestAd(adType);
      }

      const result = await piNetwork.showAd(adType);

      if (result.result === 'AD_CLOSED' || result.result === 'AD_REWARDED') {
        toast({
          title: 'Ad Displayed',
          description: `Ad type: ${adType}, Result: ${result.result}`,
        });
      } else {
        toast({
          title: 'Ad Display Error',
          description: `Error: ${result.result}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ad Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <button onClick={() => handleShowAd('interstitial')}>
        Show Interstitial Ad
      </button>
      <button onClick={() => handleShowAd('rewarded')}>Show Rewarded Ad</button>
    </div>
  );
}
