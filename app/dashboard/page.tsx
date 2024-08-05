'use client';

import { RedirectToSignIn, SignedOut, useUser } from '@clerk/nextjs';
import { signOut } from 'next-auth/react';

import { Button } from '#/components/ui/button';

export default function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn) {
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>;
    return null; // Return null to prevent further rendering
  }

  return (
    <div className="flex flex-col bg-red-600">
      <h1>Welcome, {user?.firstName || 'User'}</h1>
      {/* Dashboard content */}
     
    </div>
  );
}
