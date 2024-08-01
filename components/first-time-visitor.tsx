// components/FirstTimeVisitor.js
import Image from 'next/image';
import React from 'react';
import Mockup from '#/public/static/images/mockup.png'
import { Button } from './ui/button';
import Link from 'next/link';
const FirstTimeVisitor = () => {
  return (
    <div className='flex flex-col justify-center md:flex-row flex-grow  h-full' >
      <div className="h-full ">
        <Image
        src={Mockup}
        alt='mock up image'
        placeholder='blur' 
        />
      </div>
 
        <div className="flex flex-col flex-grow  justify-center">
            <div className="flex flex-col">
                <h2>middle mam</h2>
                <p>your trusted escrow app</p>
            </div>

            <div className="flex px-4 gap-2">
           <Button variant="link" className="w-full bg-gray-300 capitalize " >
               <Link href={'/auth/signin'}>
              Log in
              </Link></Button>
         <Button variant="link" className="w-full hover:bg-blue-400 bg-blue-800 capitalize" >
                   <Link href={'/auth/signup'}>
               Sign up
              </Link></Button>
            </div>
        </div>

      </div>
  );
};

export default FirstTimeVisitor;
