// components/FirstTimeVisitor.js
import Image from 'next/image';
import React from 'react';
import Mockup from '#/public/static/images/mockup.png'
import { Button } from './ui/button';
import Link from 'next/link';

const FirstTimeVisitor = () => {
  return (
    <div className='flex flex-col justify-center md:flex-row items-center h-full bg-gray-50'>
      <div className="md:w-1/2 p-4">
        <Image
          src={Mockup}
          alt='App mockup'
          placeholder='blur'
          className="rounded-lg shadow-lg"
        />
      </div>
 
      <div className="md:w-1/2 p-8 flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">Welcome to MiddleMan</h1>
        <p className="text-xl mb-6 text-gray-600">Your trusted escrow app for Pi to Naira exchanges</p>
        
        <div className="space-y-4 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Get Started in 3 Steps:</h2>
          <ol className="list-decimal list-inside text-left space-y-2 mb-6">
            <li className="text-gray-700">Create an account</li>
            <li className="text-gray-700">Verify your identity</li>
            <li className="text-gray-700">Start trading safely</li>
          </ol>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="w-full bg-white text-blue-800 border-blue-800 hover:bg-blue-100">
              <Link href='/auth/signin'>Log In</Link>
            </Button>
            <Button className="w-full bg-blue-800 text-white hover:bg-blue-700">
              <Link href='/auth/signup'>Sign Up</Link>
            </Button>
          </div>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">Need help? <a href="#" className="text-blue-600 hover:underline">Contact support</a></p>
      </div>
    </div>
  );
};

export default FirstTimeVisitor;