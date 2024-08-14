/* eslint-disable jsx-a11y/anchor-is-valid */
// components/FirstTimeVisitor.js
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Mockup from '#/public/static/images/mockup.png';

import { Button } from './ui/button';

const FirstTimeVisitor = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-50 md:flex-row">
      <div className="p-4 md:w-1/2">
        <Image
          src={Mockup}
          alt="App mockup"
          placeholder="blur"
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-col items-center justify-center p-8 text-center md:w-1/2">
        <h1 className="mb-4 text-3xl font-bold text-blue-800">
          Welcome to MiddleMan
        </h1>
        <p className="mb-6 text-xl text-gray-600">
          Your trusted escrow for Pi to Naira exchanges
        </p>

        <div className="w-full max-w-md space-y-4">
          <h2 className="mb-2 text-2xl font-semibold">
            Get Started in 3 Steps:
          </h2>
          <ol className="mb-6 list-inside list-decimal space-y-2 text-left">
            <li className="text-gray-700">Create an account</li>
            <li className="text-gray-700">Verify your identity</li>
            <li className="text-gray-700">Start trading safely</li>
          </ol>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="outline"
              className="w-full border-blue-800 bg-white text-blue-800 hover:bg-blue-100"
            >
              <Link href="/auth/sign-in">Log In</Link>
            </Button>
            <Button className="w-full bg-blue-800 text-white hover:bg-blue-700">
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Need help?{' '}
          <Link href="/help" className="text-blue-600 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FirstTimeVisitor;
