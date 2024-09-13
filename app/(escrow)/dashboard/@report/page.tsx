/* eslint-disable no-underscore-dangle */
// app/report/page.tsx

// import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

import { Button } from '#/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';

async function generateReport(userId: string) {
  const currentDate = new Date();
  const oneMonthAgo = new Date(
    currentDate.setMonth(currentDate.getMonth() - 1),
  );

  const [totalTransactions, successfulTransactions, totalVolume] =
    await Promise.all([
      prisma?.transaction.count({
        where: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
          createdAt: { gte: oneMonthAgo },
        },
      }),
      prisma?.transaction.count({
        where: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
          status: 'CONFIRMED',
          createdAt: { gte: oneMonthAgo },
        },
      }),
      prisma?.transaction.aggregate({
        where: {
          OR: [{ buyerId: userId }, { sellerId: userId }],
          status: 'CONFIRMED',
          createdAt: { gte: oneMonthAgo },
        },
        _sum: {
          nairaAmount: true,
        },
      }),
    ]);

  return {
    totalTransactions,
    successfulTransactions,
    successRate:
      (totalTransactions ?? 0) > 0
        ? ((successfulTransactions ?? 0) / (totalTransactions ?? 0)) * 100
        : 0,
    totalVolume: totalVolume?._sum?.nairaAmount ?? 0,
  };
}

export default async function ReportPage() {
  // const user = await currentUser();
  const userId = 'clzsx310t000311pr09k06jnb';
  if (!userId) {
    return <div>Please log in to generate a report.</div>;
  }

  const report = await generateReport(userId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Monthly Report</h1>
      <Link href="/dashboard">
        <Button variant="outline" className="mb-4">
          Back to Dashboard
        </Button>
      </Link>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
            <CardDescription>In the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{report.totalTransactions}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Successful Transactions</CardTitle>
            <CardDescription>In the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {report.successfulTransactions}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>In the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {report.successRate.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Volume</CardTitle>
            <CardDescription>In the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ${report.totalVolume.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
