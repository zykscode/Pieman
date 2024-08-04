/* eslint-disable no-console */
/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const generateUniqueEmail = (name: string) => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${name.replace(' ', '_').toLowerCase()}_${randomString}@example.com`;
};

const generateUniquePaymentId = () => {
  return `payment_${Math.random().toString(36).substring(2, 15)}`;
};

async function main() {
  // Seed users
  const saltRounds = 10;
  const password = await bcrypt.hash('password', saltRounds);
  const adminPassword = await bcrypt.hash('adminpassword', saltRounds);

  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: generateUniqueEmail('John Doe'),
      password,
      role: 'USER',
      emailVerified: new Date(),
      username: 'john_doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: generateUniqueEmail('Jane Smith'),
      password,
      role: 'USER',
      emailVerified: new Date(),
      username: 'jane_smith',
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: generateUniqueEmail('Admin User'),
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
      username: 'admin_user',
    },
  });

  // Seed wallets
  const wallet1 = await prisma.wallet.create({
    data: {
      userId: user1.id,
      address: '0xAliceWalletAddress',
      balance: 100.0,
    },
  });

  const wallet2 = await prisma.wallet.create({
    data: {
      userId: user2.id,
      address: '0xBobWalletAddress',
      balance: 200.0,
    },
  });

  // Seed transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      buyer: { connect: { id: user1.id } },
      seller: { connect: { id: user2.id } },
      piAmount: 10.5,
      nairaAmount: 5000,
      paymentId: generateUniquePaymentId(),
      rate: 476.19,
      status: 'PENDING',
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      buyer: { connect: { id: user2.id } },
      seller: { connect: { id: user1.id } },
      piAmount: 20.0,
      nairaAmount: 8000,
      paymentId: generateUniquePaymentId(),
      rate: 400.0,
      status: 'CONFIRMED',
    },
  });

  // Seed ratings
  const rating1 = await prisma.rating.create({
    data: {
      user: { connect: { id: user1.id } },
      rating: 4.5,
      comment: 'Great service!',
    },
  });

  const rating2 = await prisma.rating.create({
    data: {
      user: { connect: { id: user2.id } },
      rating: 3.8,
      comment: 'Could be better.',
    },
  });

  // Seed escrow wallets
  const escrowWallet1 = await prisma.escrowWallet.create({
    data: {
      address: '0xEscrowWalletAddress1',
      balance: 50.0,
    },
  });

  const escrowWallet2 = await prisma.escrowWallet.create({
    data: {
      address: '0xEscrowWalletAddress2',
      balance: 100.0,
    },
  });

  // Seed escrow transactions
  const escrowTransaction1 = await prisma.escrowTransaction.create({
    data: {
      escrowWalletId: escrowWallet1.id,
      amount: 25.0,
      type: 'DEPOSIT',
      status: 'PENDING',
    },
  });

  const escrowTransaction2 = await prisma.escrowTransaction.create({
    data: {
      escrowWalletId: escrowWallet2.id,
      amount: 50.0,
      type: 'WITHDRAWAL',
      status: 'COMPLETED',
    },
  });

  // Seed escrows
  const escrow1 = await prisma.escrow.create({
    data: {
      transaction: { connect: { id: transaction1.id } },
      amount: 15.0,
      status: 'PENDING',
    },
  });

  const escrow2 = await prisma.escrow.create({
    data: {
      transaction: { connect: { id: transaction2.id } },
      amount: 30.0,
      status: 'FUNDED',
    },
  });

  console.log({
    user1,
    user2,
    admin,
    wallet1,
    wallet2,
    transaction1,
    transaction2,
    rating1,
    rating2,
    escrowWallet1,
    escrowWallet2,
    escrowTransaction1,
    escrowTransaction2,
    escrow1,
    escrow2,
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
