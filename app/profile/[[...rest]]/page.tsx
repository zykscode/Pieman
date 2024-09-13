'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import {
  FaEnvelope,
  FaHistory,
  FaIdCard,
  FaPhone,
  FaUser,
} from 'react-icons/fa';

import { useAuth } from '#/components/AuthContext';
import { Button } from '#/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';
import { useToast } from '#/components/ui/use-toast';
import { fetchUserProfile } from '#/lib/api';

interface Profile {
  fullName?: string;
  email?: string;
  phone?: string;
  verificationStatus?: string;
}

interface Transaction {
  description: string;
  amount: string;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user, authenticateUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          await authenticateUser();
        }
        const profileData = await fetchUserProfile();
        setProfile(profileData);
        // Fetch transactions here if needed
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
  }, [user, authenticateUser, toast]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Remove the isSignedIn check, assume the user is always signed in for this page

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
              <span>{profile?.fullName || 'Not provided'}</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-muted-foreground" />
              <span>{profile?.email || 'Not provided'}</span>
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
        <Button
          className="w-full"
          onClick={() => {
            /* Implement edit profile logic */
          }}
        >
          Edit Profile
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            /* Implement sign out logic */
          }}
        >
          Sign Out
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
