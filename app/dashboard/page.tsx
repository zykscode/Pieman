'use client';

import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { Button } from '#/components/ui/button';

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col  bg-red-600">
      <h1>Welcome, {session?.user?.name || 'User'}</h1>
      {/* Dashboard content */}
      <Button
        className=" bg-yellow-200"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        Sign out{' '}
      </Button>
    </div>
  );
}
