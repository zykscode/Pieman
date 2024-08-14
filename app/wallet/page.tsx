/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

// import React, { useState } from 'react';

// import pi from '#/utils/piNetwork';

// import PaymentComponent from './_components/PaymentComponent';
// import PiAuth from './_components/PiAuth';

// const Page: React.FC = () => {
//   const [userInfo, setUserInfo] = useState<any | null>(null);

//   return (
//     <div>
//       {!userInfo ? (
//         <PiAuth setAuthInfo={setUserInfo} authInfo={userInfo} />
//       ) : (
//         <PaymentComponent userInfo={userInfo} piInstance={pi!} />
//       )}
//     </div>
//   );
// };

// export default Page;

import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/fetch-data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
