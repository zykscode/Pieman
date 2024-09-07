'use client';

import type { User } from '@prisma/client';
import type { ReactNode } from 'react';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { AuthResult, PaymentDTO } from '#/types';
import axiosClient from '#/utils/axiosClient';

interface WalletContextType {
  balance: number;
  address: string | null;
  updateBalance: (newBalance: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Fetch wallet information from your API
      fetchWalletInfo(user.id);
    }
  }, [user]);

  const fetchWalletInfo = async (userId: string) => {
    // Implement API call to fetch wallet info
    // Update balance and address state
  };

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
  };

  return (
    <WalletContext.Provider value={{ balance, address, updateBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface UserContextProps {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const signInUser = async (authResult: AuthResult) => {
    try {
      const response = await axiosClient.post<{ user: User }>('/user/signin', {
        authResult,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Sign-in error:', error);
      // Handle error appropriately
    }
  };

  const signOutUser = async () => {
    try {
      await axiosClient.get('/user/signout');
      setUser(null);
    } catch (error) {
      console.error('Sign-out error:', error);
      // Handle error appropriately
    }
  };

  const signOut = () => {
    signOutUser();
  };

  const onIncompletePaymentFound = async (payment: PaymentDTO) => {
    try {
      await axiosClient.post('/payments/incomplete', { payment });
    } catch (error) {
      console.error('Incomplete payment error:', error);
      // Handle error appropriately
    }
  };

  const signIn = async () => {
    try {
      const scopes = ['username', 'payments'];
      const authResult: AuthResult = await window.Pi!.authenticate(
        scopes,
        onIncompletePaymentFound,
      );
      await signInUser(authResult);
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error appropriately
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ user, signIn, signOut }), [user]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
