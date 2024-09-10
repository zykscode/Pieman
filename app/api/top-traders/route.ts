/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 5;

  try {
    interface Trader {
      id: number;
      username: string;
      avg_rate: number;
      type: string;
    }

    const topTraders = await prisma.$queryRaw<Trader[]>`
      SELECT
        u.id,
        u.username,
        COUNT(*) as transaction_count,
        AVG(t.rate) as avg_rate,
        CASE WHEN SUM(CASE WHEN t.type = 'buy' THEN 1 ELSE 0 END) > SUM(CASE WHEN t.type = 'sell' THEN 1 ELSE 0 END)
          THEN 'buyer'
          ELSE 'seller'
        END as type
      FROM
        users u
      JOIN
        transactions t ON u.id = t.user_id
      GROUP BY
        u.id, u.username
      ORDER BY
        transaction_count DESC, avg_rate DESC
      LIMIT ${limit}
    `;

    const formattedTopTraders = topTraders.map((trader) => ({
      id: trader.id,
      username: trader.username,
      rate: parseFloat(trader.avg_rate.toFixed(2)),
      type: trader.type,
    }));

    return NextResponse.json(formattedTopTraders);
  } catch (error) {
    console.error('Error fetching top traders:', error);
    return NextResponse.json(
      { message: 'Error fetching top traders' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
