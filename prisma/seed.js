#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserRole } from '@prisma/client';

const prisma = new PrismaClient();

// Add this function at the top of the file
function generateRandomData(length = 5) {
  const users = [];
  const wallets = [];
  const transactions = [];

  for (let i = 0; i < length; i++) {
    users.push({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: bcrypt.hashSync(`password${i + 1}`, 10),
      role: UserRole.USER,
      username: `user${i + 1}`,
    });

    wallets.push({
      address: `wallet_address_${i + 1}`,
      balance: Math.random() * 1000,
    });

    transactions.push({
      paymentId: `payment_id_${i + 1}`,
      piAmount: Math.random() * 100,
      nairaAmount: Math.random() * 50000,
      rate: 500.0,
      description: `Random transaction ${i + 1}`,
      status:
        Object.values(TransactionStatus)[
          Math.floor(Math.random() * Object.values(TransactionStatus).length)
        ],
    });
  }

  return { users, wallets, transactions };
}

async function cleanup() {
  try {
    const tablenames =
      await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    for (const { tablename } of tablenames) {
      if (tablename !== '_prisma_migrations') {
        try {
          await prisma.$executeRawUnsafe(
            `TRUNCATE TABLE "public"."${tablename}" CASCADE;`,
          );
        } catch (error) {
          console.log({ error });
        }
      }
    }

    await prisma.$queryRaw`TRUNCATE TABLE "User" CASCADE`;
    // Add similar lines for other tables you want to truncate
  } catch (error) {
    console.error('Error during cleanup:', error);
    // Optionally, you can choose to throw the error again if you want to stop the seeding process
    // throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Use the cleanup function before seeding
async function main() {
  console.log('Cleaning up existing data...');
  await cleanup();

  console.log('Starting to seed data...');
  const { users, wallets, transactions } = generateRandomData(5);

  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  for (const wallet of wallets) {
    await prisma.wallet.create({ data: wallet });
  }

  for (const transaction of transactions) {
    await prisma.transaction.create({ data: transaction });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
