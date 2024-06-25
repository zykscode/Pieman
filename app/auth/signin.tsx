'use client';

import React, { useEffect, useState } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const SignInPage = () => {
  const [providers, setProviders] = useState<any>(null);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    const setUpProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setUpProviders();
  }, []);

  if (!providers) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col h-full justify-center items-center bg-yellow-200'>
      <h1 className='text-2xl mb-6'>Sign In</h1>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className='mb-4'>
          <button
            onClick={() => signIn(provider.id, { callbackUrl })}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SignInPage;
