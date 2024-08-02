/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, { useState } from 'react';

import pi from '#/utils/piNetwork';

import PaymentComponent from './_components/PaymentComponent';
import PiAuth from './_components/PiAuth';

const Page: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any | null>(null);

  return (
    <div>
      {!userInfo ? (
        <PiAuth setAuthInfo={setUserInfo} authInfo={userInfo} />
      ) : (
        <PaymentComponent userInfo={userInfo} piInstance={pi!} />
      )}
    </div>
  );
};

export default Page;
