/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const faker = require('@faker-js/faker');

const prisma = new PrismaClient();
async function main() {
  // Create users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        emailVerified: faker.date.past(),
        password: faker.internet.password(),
        image: faker.image.avatar(),
        role: faker.helpers.arrayElement(['USER', 'ADMIN'] as const),
        username: faker.internet.userName(),
      },
    });
    users.push(user);
  }

  // Create wallets for users
  for (const user of users) {
    await prisma.wallet.create({
      data: {
        userId: user.id,
        address: faker.finance.ethereumAddress(),
        balance: parseFloat(faker.finance.amount(0, 1000, 2)),
      },
    });
  }

  // Create transactions
  for (let i = 0; i < 20; i++) {
    const buyer = faker.helpers.arrayElement(users);
    const seller = faker.helpers.arrayElement(
      users.filter((u) => u.id !== buyer.id),
    );
    const piAmount = parseFloat(faker.finance.amount(10, 1000, 2));
    const rate = parseFloat(faker.finance.amount(50, 200, 2));

    const transaction = await prisma.transaction.create({
      data: {
        paymentId: faker.string.uuid(),
        buyerId: buyer.id,
        sellerId: seller.id,
        piAmount,
        nairaAmount: piAmount * rate,
        rate,
        description: faker.lorem.sentence(),
        status: faker.helpers.arrayElement([
          'PENDING',
          'CONFIRMED',
          'REFUNDED',
        ] as const),
        expirationDate: faker.date.future(),
      },
    });

    // Create escrow for some transactions
    if (faker.datatype.boolean()) {
      await prisma.escrow.create({
        data: {
          transactionId: transaction.id,
          amount: piAmount,
          status: faker.helpers.arrayElement([
            'PENDING',
            'FUNDED',
            'RELEASED',
            'REFUNDED',
          ] as const),
        },
      });
    }
  }

  // Create escrow wallets
  const escrowWallets = [];
  for (let i = 0; i < 3; i++) {
    const wallet = await prisma.escrowWallet.create({
      data: {
        address: faker.finance.ethereumAddress(),
        balance: parseFloat(faker.finance.amount(1000, 10000, 2)),
      },
    });
    escrowWallets.push(wallet);
  }

  // Create escrow transactions
  for (let i = 0; i < 15; i++) {
    const escrowWallet = faker.helpers.arrayElement(escrowWallets);
    const transaction = await prisma.transaction.findFirst({
      where: { status: 'PENDING' },
    });

    await prisma.escrowTransaction.create({
      data: {
        escrowWalletId: escrowWallet.id,
        amount: parseFloat(faker.finance.amount(10, 1000, 2)),
        type: faker.helpers.arrayElement(['DEPOSIT', 'WITHDRAWAL'] as const),
        status: faker.helpers.arrayElement([
          'PENDING',
          'COMPLETED',
          'FAILED',
        ] as const),
        relatedTransactionId: transaction ? transaction.id : null,
      },
    });
  }

  // Create ratings
  for (const user of users) {
    const ratingsCount = faker.number.int({ min: 0, max: 5 });
    for (let i = 0; i < ratingsCount; i++) {
      await prisma.rating.create({
        data: {
          userId: user.id,
          rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
          comment: faker.lorem.sentence(),
        },
      });
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
