/* eslint-disable jsx-a11y/label-has-associated-control */
// app/auth/signup/page.tsx

'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      await signIn('credentials', { email, password, callbackUrl: '/home' });
    } else {
      console.error('Sign-up failed');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
