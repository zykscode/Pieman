import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { DashboardContent } from './_components/dashboard-content';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    notFound();
    return null;
  }

  // const users = await prisma.user.findMany();
  // const transactions = await prisma.transaction.findMany();
  // const escrows = await prisma.escrow.findMany();

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome, {user?.fullName}</h1>
      </header>
      <main className="grow overflow-auto p-4">
        <DashboardContent />
      </main>
    </div>
  );
}
