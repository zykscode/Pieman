/* eslint-disable react/button-has-type */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const ErrorPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessage = (errorType: string | null) => {
    switch (errorType) {
      case 'CredentialsSignin':
        return 'Sign in failed. Please check the details and try again.';
      case 'OAuthSignin':
      case 'OAuthCallback':
      case 'OAuthCreateAccount':
        return 'OAuth Sign in failed. Please try again.';
      case 'EmailCreateAccount':
        return 'Email creation failed. Please try again.';
      case 'EmailSignin':
        return 'Email Sign in failed. Please try again.';
      case 'Default':
        return 'An unknown error occurred. Please try again.';
      default:
        return 'An unknown error occurred. Please try again.';
    }
  };

  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage(error)}</p>
      <button onClick={() => router.push('/auth/signin')}>Sign In</button>
    </div>
  );
};

export default ErrorPage;
