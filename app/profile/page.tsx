/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

import WalletCard from '#/components/WalletCard';

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    const { user } = session;
    const getFirstName = (fullName: string): string => {
      const firstName = fullName.trim().split(' ')[0];
      return (
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
      );
    };
    const firstName = getFirstName(user.name!);
    return (
      <div className="mx-auto mt-24 flex size-full flex-col bg-yellow-400">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Welcome {firstName}</h1>
            <button className="p-2" />
          </div>
          <p className="text-sm text-gray-600">
            How's the weather in your region?
          </p>
        </div>
        <WalletCard />
        <div className=" bg-yellow-300">
          Signed in as {user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>{' '}
      </div>
    );
  }
  return (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
