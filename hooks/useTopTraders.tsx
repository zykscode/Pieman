import { useEffect, useState } from 'react';

export interface Trader {
  id: number;
  username: string;
  rate: number;
  type: 'buyer' | 'seller';
}

export const useTopTraders = (limit: number = 5) => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTraders = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/top-traders?limit=${limit}`);
        if (!response.ok) {
          throw new Error('Failed to fetch top traders');
        }
        const data = await response.json();
        setTraders(data);
      } catch (err) {
        setError('Failed to load top traders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTraders();
  }, [limit]);

  return { traders, isLoading, error };
};
