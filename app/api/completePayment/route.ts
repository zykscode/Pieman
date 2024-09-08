/* eslint-disable unused-imports/no-unused-vars */
import { auth } from '@clerk/nextjs/server';
import { TransactionStatus } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '#/lib/db';
import { completePayment } from '#/lib/piNetwork';

const completePaymentSchema = z.object({
  paymentId: z.string(),
  txid: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { paymentId, txid } = completePaymentSchema.parse(body);

    const completedPayment = await completePayment(paymentId, txid);

    await prisma.transaction.update({
      where: { paymentId },
      data: { status: TransactionStatus.CONFIRMED },
    });

    return NextResponse.json({ completedPayment });
  } catch (error) {
    console.error('Payment completion error:', error);
    return NextResponse.json(
      { error: 'Failed to complete payment' },
      { status: 500 },
    );
  }
}
