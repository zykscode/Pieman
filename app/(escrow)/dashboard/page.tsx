'use client';

import { useEffect, useState } from 'react';

import { useAuth } from '#/components/AuthContext';
import { ScrollArea } from '#/components/ui/scroll-area';

import { DashboardContent } from './_components/dashboard-content';
import { getDashboardData } from './dashboard-data';

export default function DashboardPage() {
  const { user, authenticateUser } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        await authenticateUser();
      }
      const data = await getDashboardData(user.uid);
      setDashboardData(data);
    };

    fetchData();
  }, [user, authenticateUser]);

  if (!user || !dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sticky flex h-screen w-full flex-col bg-gray-50">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
      </header>
      <ScrollArea className="h-[calc(100vh-64px)] p-4">
        <DashboardContent data={dashboardData} />
      </ScrollArea>
    </div>
  );
}
