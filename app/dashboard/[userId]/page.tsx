// app/dashboard/[userId]/page.tsx

import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '#/lib/auth';

export default async function UserDashboard({
  params,
}: {
  params: { userId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== params.userId) {
    redirect('/login');
  }

  return (
    <div>
      <h1>Welcome to your dashboard, {session.user.name || 'User'}</h1>
      <p>Your email: {session.user.email}</p>
      {/* Add more dashboard content here */}
    </div>
  );
}
