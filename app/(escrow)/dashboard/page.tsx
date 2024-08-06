import { currentUser } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    notFound();
    return null;
  }

  const users = await prisma.user.findMany();
  const transactions = await prisma.transaction.findMany();
  const escrows = await prisma.escrow.findMany();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto max-w-6xl rounded bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
        <p className="mb-4">Hello {user.emailAddresses[0].emailAddress}</p>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Users</h2>
          <ul className="divide-y divide-gray-200">
            {users.map((_user) => (
              <li key={_user.id} className="py-2">
                {_user.email}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Transactions</h2>
          <ul className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="py-2">
                {transaction.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">Escrows</h2>
          <ul className="divide-y divide-gray-200">
            {escrows.map((escrow) => (
              <li key={escrow.id} className="py-2">
                {escrow.amount}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
