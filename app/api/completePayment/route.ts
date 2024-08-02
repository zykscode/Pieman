import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import pi from '../../../utils/piNetwork';

const prisma = new PrismaClient();

export async function POST(req: Request): Promise<Response> {
  try {
    const { paymentId, txid } = await req.json();

    if (!paymentId || !txid) {
      return NextResponse.json(
        { error: 'paymentId and txid are required' },
        { status: 400 },
      );
    }

    // Additional validation (if needed)
    if (typeof paymentId !== 'string' || typeof txid !== 'string') {
      return NextResponse.json(
        { error: 'paymentId and txid must be strings' },
        { status: 400 },
      );
    }

    const completedPayment = await pi.completePayment(paymentId, txid);

    // Find the transaction by paymentId
    const transaction = await prisma.transaction.findFirst({
      where: { paymentId },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 },
      );
    }

    // Update the transaction
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: 'CONFIRMED' },
    });

    return NextResponse.json({ completedPayment });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { error: 'Failed to complete payment' },
      { status: 500 },
    );
  }
}
