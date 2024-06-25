// app/api/completePayment/route.ts

import { NextResponse } from 'next/server';
import pi from '../../../utils/piNetwork';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { paymentId, txid } = await req.json();

  try {
    const completedPayment = await pi.completePayment(paymentId, txid);

    // Update transaction status
    await prisma.transaction.updateMany({
      where: { paymentId: paymentId },  // assuming paymentId is the transaction ID
      data: { status: 'CONFIRMED' },
    });

    return NextResponse.json({ completedPayment });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to complete payment' }, { status: 500 });
  }
}
