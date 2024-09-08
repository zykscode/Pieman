/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/transactions/page.tsx

import Link from 'next/link';
import type {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from 'react';

import { Button } from '#/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table';

async function getTransactions(userId: string) {
  return prisma.transaction.findMany({
    where: {
      OR: [{ buyerId: userId }, { sellerId: userId }],
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50, // Limit to the last 50 transactions
  });
}

export default async function TransactionsPage() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const userId = 'clzsx310t000311pr09k06jnb';

  if (!userId) {
    return <div>Please log in to view your transactions.</div>;
  }

  const transactions = await getTransactions(userId);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Your Transactions</h1>
      <Link href="/dashboard">
        <Button variant="outline" className="mb-4">
          Back to Dashboard
        </Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(
            (transaction: {
              id: Key | null | undefined;
              createdAt: {
                toLocaleString: () =>
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<AwaitedReactNode>
                  | null
                  | undefined;
              };
              buyerId: string;
              nairaAmount: number;
              status:
                | string
                | number
                | bigint
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | ReactPortal
                | Promise<AwaitedReactNode>
                | null
                | undefined;
            }) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.createdAt.toLocaleString()}</TableCell>
                <TableCell>
                  {transaction.buyerId === userId ? 'Buy' : 'Sell'}
                </TableCell>
                <TableCell>${transaction.nairaAmount.toFixed(2)}</TableCell>
                <TableCell>{transaction.status}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
