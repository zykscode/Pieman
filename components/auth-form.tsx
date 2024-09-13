'use client';

import React from 'react';

import { useAuth } from '#/components/AuthContext';
import { Button } from '#/components/ui/button';

export function AuthForm() {
  const { authenticateUser } = useAuth();

  const handleAuth = async () => {
    try {
      await authenticateUser();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleAuth}>Authenticate with Pi</Button>
    </div>
  );
}
