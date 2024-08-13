import { prisma } from '#/lib/db';

async function getActiveEscrows() {
  return prisma.escrow.count({
    where: {
      status: 'PENDING',
    },
  });
}

async function getTotalValueLocked() {
  const result = await prisma.escrow.aggregate({
    where: {
      status: 'FUNDED',
    },
    _sum: {
      amount: true,
    },
  });
  return result._sum.amount || 0;
}

async function getRecentTransactions(userId: string) {
  return prisma.transaction.count({
    where: {
      OR: [{ buyerId: userId }, { sellerId: userId }],
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      },
    },
  });
}

async function getSuccessRate() {
  const totalTransactions = await prisma.transaction.count();
  const successfulTransactions = await prisma.transaction.count({
    where: {
      status: 'CONFIRMED',
    },
  });

  return totalTransactions > 0
    ? Math.round((successfulTransactions / totalTransactions) * 100)
    : 100;
}

export async function getDashboardData(userId: string) {
  try {
    const activeEscrows = await getActiveEscrows();
    const totalValueLocked = await getTotalValueLocked();
    const recentTransactions = await getRecentTransactions(userId);
    const successRate = await getSuccessRate();

    return {
      activeEscrows,
      totalValueLocked,
      recentTransactions,
      successRate,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}
