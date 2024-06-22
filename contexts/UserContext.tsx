'use client';

import { AuthResult, PaymentDTO, User } from '#/types';
import axiosClient from '#/utils/axiosClient';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserContextProps {
  user: User | null;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const signIn = async () => {
    const scopes = ['username', 'payments'];
    const authResult: AuthResult = await window.Pi?.authenticate(scopes, onIncompletePaymentFound);
    signInUser(authResult);
    setUser(authResult.user);
  };

  const signOut = () => {
    setUser(null);
    signOutUser();
  };

  const signInUser = (authResult: AuthResult) => {
    axiosClient.post('/user/signin', { authResult });
  };

  const signOutUser = () => {
    return axiosClient.get('/user/signout');
  };

  const onIncompletePaymentFound = (payment: PaymentDTO) => {
    return axiosClient.post('/payments/incomplete', { payment });
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
