'use client';

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name || 'User'}</h1>
      {/* Dashboard content */}

      <button className='ye bg-yellow-200' onClick={()=> signOut({callbackUrl:'/'})}>

      </button>
    </div>
  );
}