import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const getExchangeRate = async (): Promise<number> => {
  const response = await fetch('/api/exchange-rate');
  if (!response.ok) {
    throw new Error('Failed to fetch exchange rate');
  }
  const data = await response.json();
  return data.rate;
};

export async function fetchTopTraders(limit = 10) {
  try {
    const topTraders = await prisma.user.findMany({
      orderBy: {
        tradingVolume: 'desc',
      },
      take: limit,
      select: {
        id: true,
        username: true,
        tradingVolume: true,
        profileImage: true,
      },
    });

    return topTraders;
  } catch (error) {
    console.error('Error fetching top traders:', error);
    throw new Error('Failed to fetch top traders');
  }
}

// Add these new methods for Pi Network ads
export const isAdReady = async (
  adType: 'banner' | 'interstitial' | 'rewarded',
): Promise<boolean> => {
  if (typeof window !== 'undefined' && window.Pi) {
    return window.Pi.Ads.isAdReady(adType);
  }
  throw new Error('Pi SDK not available');
};

export const requestAd = async (
  adType: 'banner' | 'interstitial' | 'rewarded',
): Promise<void> => {
  if (typeof window !== 'undefined' && window.Pi) {
    return window.Pi.Ads.requestAd(adType);
  }
  throw new Error('Pi SDK not available');
};

export const showAd = async (
  adType: 'banner' | 'interstitial' | 'rewarded',
): Promise<void> => {
  if (typeof window !== 'undefined' && window.Pi) {
    return window.Pi.Ads.showAd(adType);
  }
  throw new Error('Pi SDK not available');
};
