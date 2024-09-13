/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AuthContext.tsx
'use client'; // This ensures it only runs on the client side

import React, { createContext, useContext } from 'react';

import { usePiWallet } from '#/hooks/usePiWallet';

// Define the shape of the context data
interface AuthContextType {
  user: any; // You can type this more strictly if you know the user object structure
  authenticateUser: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

// The AuthProvider component that wraps your app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, accessToken, error, authenticate } = usePiWallet();

  // Function to authenticate the user using Pi SDK
  const authenticateUser = async () => {
    await authenticate();
  };

  return (
    <AuthContext.Provider value={{ user, authenticateUser, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
