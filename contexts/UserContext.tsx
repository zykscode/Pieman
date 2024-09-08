'use client';

import type { User } from '@prisma/client';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { AuthResult, PaymentDTO } from '#/types';
import axiosClient from '#/utils/axiosClient';

// Wallet Context
interface WalletContextType {
  balance: number;
  address: string | null;
  updateBalance: (newBalance: number) => void;
  fetchWalletInfo: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// User Context
interface UserContextProps {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Combined Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState<string | null>(null);

  const fetchWalletInfo = useCallback(async () => {
    if (!user) return;
    try {
      const response = await axiosClient.get(`/wallet/${user.id}`);
      setBalance(response.data.balance);
      setAddress(response.data.address);
    } catch (error) {
      console.error('Fetch wallet info error:', error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchWalletInfo();
    }
  }, [user, fetchWalletInfo]);

  const onIncompletePaymentFound = async (payment: PaymentDTO) => {
    try {
      await axiosClient.post('/payments/incomplete', { payment });
    } catch (error) {
      console.error('Incomplete payment error:', error);
    }
  };

  const signIn = useCallback(async () => {
    try {
      const scopes = ['username', 'payments'];
      const authResult: AuthResult = await window.Pi!.authenticate(
        scopes,
        onIncompletePaymentFound,
      );
      // Move signInUser function inside useCallback
      const signInUser = async (authResult: AuthResult) => {
        const response = await axiosClient.post<{ user: User }>(
          '/user/signin',
          {
            authResult,
          },
        );
        setUser(response.data.user);
      };
      await signInUser(authResult);
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }, [onIncompletePaymentFound, setUser]);

  const signOutUser = async () => {
    try {
      await axiosClient.get('/user/signout');
      setUser(null);
      setBalance(0);
      setAddress(null);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  };

  const updateBalance = (newBalance: number) => setBalance(newBalance);

  const userContextValue = useMemo(
    () => ({ user, signIn, signOut: signOutUser }),
    [user, signIn],
  );
  const walletContextValue = useMemo(
    () => ({ balance, address, updateBalance, fetchWalletInfo }),
    [balance, address, fetchWalletInfo],
  );

  return (
    <UserContext.Provider value={userContextValue}>
      <WalletContext.Provider value={walletContextValue}>
        {children}
      </WalletContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within an AppProvider');
  }
  return context;
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within an AppProvider');
  }
  return context;
};
