// app/api/completePayment/route.ts

import { NextResponse } from 'next/server';
import pi from '../../../utils/piNetwork';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { paymentId, txid } = await req.json();

  try {
    const completedPayment = await pi.completePayment(paymentId, txid);

    // First, find the transaction by paymentId
    const transaction = await prisma.transaction.findUnique({
      where: { paymentId: paymentId },
    });

    if (!transaction) {
      return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    // Then update the transaction using its id
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: 'CONFIRMED' },
    });

    return NextResponse.json({ completedPayment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to complete payment' }, { status: 500 });
  }
}