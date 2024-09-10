/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AuthContext.tsx
'use client'; // This ensures it only runs on the client side

import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context data
interface AuthContextType {
  user: any; // You can type this more strictly if you know the user object structure
  authenticateUser: () => Promise<void>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

// The AuthProvider component that wraps your app
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Function to authenticate the user using Pi SDK
  const authenticateUser = async () => {
    try {
      // Check if the Pi SDK is available
      if (!window.Pi) {
        console.error('Pi SDK is not loaded');
        return;
      }

      // Call Pi.authenticate() to get the user data and access token
      const authRes = await window.Pi.authenticate(
        ['username', 'payments'], // List of scopes (permissions)
        (incompletePayment) => {
          console.log('Incomplete payment found:', incompletePayment);
        },
      );

      if (authRes) {
        const { accessToken } = authRes;
        setAccessToken(accessToken);

        // Make a GET request to the /me endpoint to verify the access token and get user data
        const meRes = await axios.get('https://api.minepi.com/v2/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (meRes.data) {
          setUser(meRes.data); // Set the user data in the state
        }
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
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
