import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const generateUniqueEmail = (name: string) => {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${name.replace(' ', '_').toLowerCase()}_${randomString}@example.com`;
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
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: generateUniqueEmail('Jane Smith'),
      password,
      role: 'USER',
    },
  });

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: generateUniqueEmail('Admin User'),
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Seed transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      buyer: { connect: { id: user1.id } },
      seller: { connect: { id: user2.id } },
      piAmount: 10.5,
      nairaAmount: 5000,
      rate: 476.19, // Example exchange rate
      status: 'PENDING',
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      buyer: { connect: { id: user2.id } },
      seller: { connect: { id: user1.id } },
      piAmount: 20.0,
      nairaAmount: 8000,
      rate: 400.0, // Example exchange rate
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

  console.log({ user1, user2, admin, transaction1, transaction2, rating1, rating2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });