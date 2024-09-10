'use client';

import { SignIn, useAuth, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  FaEnvelope,
  FaHistory,
  FaIdCard,
  FaPhone,
  FaUser,
} from 'react-icons/fa';

import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { useToast } from '#/components/ui/use-toast';
import { fetchUserProfile, setAuthToken } from '#/lib/api';

interface Profile {
  phone?: string;
  verificationStatus?: string;
}

interface Transaction {
  description: string;
  amount: string;
}

const ProfilePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const setToken = async () => {
      const token = await getToken();
      if (token) {
        setAuthToken(token);
      }
    };
    setToken();
  }, [getToken]);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const fetchData = async () => {
        try {
          const [profileData] = await Promise.all([
            fetchUserProfile(),
            //fetchTransactions(5),
          ]);
          setProfile(profileData);
          // setTransactions(transactionsData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          toast({
            title: 'Error',
            description: 'Failed to load user data. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, toast]);

  // ... rest of the component code (handleVerification, render logic) ...

  if (!isLoaded || isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Please sign in to view your profile
        </h1>
        <SignIn routing="path" path="/profile" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaUser className="mr-2" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <FaUser className="mr-2 text-muted-foreground" />
              <span>{user.fullName}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-muted-foreground" />
              <span>{user.primaryEmailAddress?.emailAddress}</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2 text-muted-foreground" />
              <span>{profile?.phone || 'Not provided'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaIdCard className="mr-2" /> Verification Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            {profile?.verificationStatus || 'Unverified'}
          </p>
          {/* {profile?.verificationStatus !== 'Verified' && (
            <Button className="mt-2" onClick={handleVerification}>
              Complete Verification
            </Button>
          )}*/}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FaHistory className="mr-2" /> Last 5 Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length > 0 ? (
            <ul className="space-y-2">
              {transactions.map((transaction, index) => (
                <li key={index} className="flex justify-between">
                  <span>{transaction.description}</span>
                  <span>{transaction.amount}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent transactions</p>
          )}
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button className="w-full" onClick={() => user.update({})}>
          Edit Profile
        </Button>
        <Button className="w-full" onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
