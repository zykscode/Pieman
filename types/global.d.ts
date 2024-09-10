interface Window {
  Pi?: {
    init: (config: { version: string; sandbox: boolean }) => void;
    Ads: {
      isAdReady: (adType: 'banner' | 'interstitial' | 'rewarded') => Promise<boolean>;
      requestAd: (adType: 'banner' | 'interstitial' | 'rewarded') => Promise<void>;
      showAd: (adType: 'banner' | 'interstitial' | 'rewarded') => Promise<void>;
    };
  };
}
