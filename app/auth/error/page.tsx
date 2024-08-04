'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function Error() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const router = useRouter();

  return (
    <div>
      <h1>Error</h1>
      <p>{error}</p>
      <button onClick={() => router.push('/auth/signin')}>
        Go to Sign In
      </button>
    </div>
  );
}
