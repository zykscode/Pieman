/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Mockup from '#/public/static/images/mockup.png';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { useToast } from './ui/use-toast';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.ok) {
        router.push('/home');
      } else {
        toast({
          title: 'Error',
          description: 'Invalid credentials. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        title: 'Error',
        description: 'Failed to log in. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/home' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google. Please try again.',
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
                href="/signup"
                className="text-sm text-gray-400 hover:text-white"
              >
                Sign Up
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold">
              Log in to your account
            </CardTitle>
            <CardDescription>
              Enter your email and password to log in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          className="border-gray-700 bg-gray-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="border-gray-700 bg-gray-800"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Log In'}
                </Button>
              </form>
            </Form>
            <div className="relative my-4">
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
              onClick={handleGoogleSignIn}
            >
              <svg
                className="mr-2 size-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Google icon SVG path */}
              </svg>
              Google
            </Button>
            <p className="mt-4 text-center text-xs text-gray-500">
              By logging in, you agree to our{' '}
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
