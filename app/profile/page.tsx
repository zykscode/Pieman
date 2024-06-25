'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    const { user, expires } = session
    console.log(user, expires)
    const getFirstName = (fullName: string): string => {
      const firstName = fullName.trim().split(" ")[0];
      return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    };
    const firstName = getFirstName(user.name!)
    return (
      <>
       <div className="bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Welcome {firstName}</h1>
        <button className="p-2">
      
              </button>
      </div>
      <p className="text-sm text-gray-600">How's the weather in your region?</p>
    </div>
        Signed in as {user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}