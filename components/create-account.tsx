/* eslint-disable react/no-unescaped-entities */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

import Mockup from '#/public/static/images/mockup.png';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useToast } from './ui/use-toast';

export function CreateAccountForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulated API call to create account
      // await createAccount(email, password);

      // Sign in after account creation
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push('/home');
      } else {
        throw new Error('Account creation or login failed');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side with image and quote */}
      <div className="relative hidden h-full md:flex lg:w-1/2">
        <Image src={Mockup} alt="Geometric structure" placeholder="blur" />
        <div className="absolute inset-x-10 bottom-10 bg-black bg-opacity-70 p-6">
          <p className="mb-2 text-lg">
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.
            Highly recommended!"
          </p>
          <p className="font-semibold">Sofia Davis</p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex size-full items-center justify-center p-2 md:w-1/2">
        <Card className="w-full max-w-md bg-gray-200 text-white">
          <CardHeader>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-2xl font-bold">Acme Inc</span>
              <Link
                href="/login"
                className="text-sm text-gray-400 hover:text-white"
              >
                Login
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateAccount}>
              <Input
                type="email"
                placeholder="name@example.com"
                className="mb-4 border-gray-700 bg-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                className="mb-4 border-gray-700 bg-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="mb-4 w-full">
                Create Account
              </Button>
              <div className="relative mb-4">
                <Separator className="my-4" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-gray-900 px-2 text-sm text-gray-500">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn('github')}
              >
                <svg
                  className="mr-2 size-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Github
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-gray-500">
              By clicking continue, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-white">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-white">
                Privacy Policy
              </Link>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
