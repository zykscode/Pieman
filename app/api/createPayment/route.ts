// app/api/createPayment/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import pi from '#/utils/piNetwork';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { buyerId, sellerId, piAmount, nairaAmount, rate, description } = await req.json();

  try {
    const paymentData = {
      amount: piAmount,
      memo: description || "Payment for transaction",
      metadata: { nairaAmount, rate, sellerId },
      uid: buyerId,
    };

    const paymentId = await pi.createPayment(paymentData);

    // Store payment details in your database
    const transaction = await prisma.transaction.create({
      data: {
        buyerId,
        sellerId,
        piAmount,
        nairaAmount,
        rate,
        description,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ paymentId, transaction });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
