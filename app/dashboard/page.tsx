'use client';

import { Button } from '#/components/ui/button';
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
    <div className='flex flex-col  bg-red-600'>
      <h1>Welcome, {session?.user?.name || 'User'}</h1>
      {/* Dashboard content */}
      <Button className=' bg-yellow-200' onClick={()=> signOut({callbackUrl:'/'})}
      >
        Sign out   </Button>

    
    </div>
  );
}