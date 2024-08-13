import { currentUser } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';

import { ScrollArea } from '#/components/ui/scroll-area';

import { DashboardContent } from './_components/dashboard-content';
import { getDashboardData } from './dashboard-data';

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    notFound();
    return null;
  }

  const dashboardData = await getDashboardData('clzsx310t000311pr09k06jnb');
  console.log(dashboardData, 'ghehres the data here');

  return (
    <div className="sticky flex h-screen w-full flex-col bg-gray-50">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome, {user?.fullName}</h1>
      </header>
      <ScrollArea className="h-[calc(100vh-64px)] p-4">
        <DashboardContent data={dashboardData} />
      </ScrollArea>
    </div>
  );
}
