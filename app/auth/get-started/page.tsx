'use client'

import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const GetStarted = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Thank you for joining our app. Here's how to get started:</p>
      <ul>
        <li>Complete your profile</li>
        <li>Explore the features</li>
        <li>Join our community</li>
      </ul>
      <button onClick={() => router.push('/dashboard')}>Go to Dashboard</button>
    </div>
  );
};

export default GetStarted;
