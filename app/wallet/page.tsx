/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

import { useAuth } from '#/components/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card';

const WalletPage = () => {
  const { user, authenticateUser } = useAuth();

  useEffect(() => {
    const loginAutomatically = async () => {
      await authenticateUser();
    };

    loginAutomatically();
  }, [authenticateUser]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      {user ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaUser className="mr-2" /> User Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>User data:</strong> {JSON.stringify(user)}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>Authenticating...</div>
      )}
    </motion.div>
  );
};

export default WalletPage;
