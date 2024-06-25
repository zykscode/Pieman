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
    },
  });
  
  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: generateUniqueEmail('Jane Smith'),
      password,
      role: 'USER',
      emailVerified: new Date(),
    },
  });
  
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: generateUniqueEmail('Admin User'),
      password: adminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  // Seed transactions
  const transaction1 = await prisma.transaction.create({
    data: {
      buyer: { connect: { id: user1.id } },
      seller: { connect: { id: user2.id } },
      piAmount: 10.5,
      nairaAmount: 5000,
      paymentId: generateUniquePaymentId(), // Add this line
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
      paymentId: generateUniquePaymentId(), // Add this line
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