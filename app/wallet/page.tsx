'use client';


import React, { useState } from 'react';


import PaymentComponent from './_components/PaymentComponent';
import PiAuth from './_components/PiAuth';
import pi from '#/utils/piNetwork';

const Page: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any | null>(null);

  return (
    <div>
      {!userInfo ? (
        <PiAuth setAuthInfo={setUserInfo} authInfo={userInfo}  />
      ) : (
        <PaymentComponent userInfo={userInfo} piInstance={pi!} />
      )}
    </div>
  );
};

export default Page;

