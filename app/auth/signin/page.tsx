'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      router.push('/home');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
