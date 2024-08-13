const {
  PrismaClient,
  UserRole,
  TransactionStatus,
  EscrowStatus,
} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      username: 'alice123',
      password: 'securepassword1',
      role: UserRole.USER,
      ratings: {
        create: {
          rating: 4.5,
          comment: 'Great experience!',
        },
      },
      wallet: {
        create: {
          address: '0xAliceWallet',
          balance: 100.0,
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      username: 'bob123',
      password: 'securepassword2',
      role: UserRole.USER,
      ratings: {
        create: {
          rating: 4.0,
          comment: 'Good service.',
        },
      },
      wallet: {
        create: {
          address: '0xBobWallet',
          balance: 50.0,
        },
      },
    },
  });

  // Create some transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      paymentId: 'txn_1',
      buyerId: user1.id,
      sellerId: user2.id,
      piAmount: 2.0,
      nairaAmount: 2000.0,
      rate: 1000.0,
      status: TransactionStatus.PENDING,
      escrow: {
        create: {
          amount: 2000.0,
          status: EscrowStatus.PENDING,
        },
      },
    },
  });

  console.log({ user1, user2, transaction1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
