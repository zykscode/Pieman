/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { APIUserScopes } from '@pinetwork-js/api-typing';
import { useEffect, useState } from 'react';

// Add this type definition at the top of your file
type UserDetails = {
  username: string;
  // Add other properties as needed
};

const WalletPage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializePi = () => {
      if (typeof window !== 'undefined' && window.Pi) {
        window.Pi.init({ version: '2.0' })
          .then(() => {
            if (isMounted) authenticate();
          })
          .catch((error) => {
            console.error('Failed to initialize Pi:', error);
            if (isMounted) setError('Failed to initialize Pi SDK');
          });
      } else {
        if (isMounted) setError('Pi SDK not available');
      }
    };

    const authenticate = () => {
      const scopes: APIUserScopes[] = ['username'];
      window.Pi.authenticate(scopes, onIncompletePaymentFound)
        .then(handleAuthSuccess)
        .catch(handleAuthError);
    };

    const handleAuthSuccess = (authResult: any) => {
      if (!isMounted) return;
      // Fetch user details...
      // Update state...
    };

    const handleAuthError = (error: any) => {
      if (!isMounted) return;
      console.error('Failed to authenticate user:', error);
      setError('An error occurred while authenticating. Please try again.');
      setIsLoading(false);
    };

    initializePi();

    return () => {
      isMounted = false;
    };
  }, []);

  function onIncompletePaymentFound(payment: any) {
    // Handle incomplete payment
    console.log('Incomplete payment found:', payment);
  }

  if (isLoading) {
    return <div>Authenticating...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      {userDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaUser className="mr-2" /> User Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Username:</strong> {userDetails.username}
              </p>
              {/* Add other user details here */}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default WalletPage;
