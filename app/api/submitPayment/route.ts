import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '#/lib/db';
import { completePayment } from '#/lib/piNetwork';

const submitPaymentSchema = z.object({
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
    const { paymentId, txid } = submitPaymentSchema.parse(body);

    const completedPayment = await completePayment(paymentId, txid);

    await prisma.transaction.update({
      where: { paymentId },
      data: { status: 'CONFIRMED', txid },
    });

    if (completedPayment.status.developer_completed) {
      return NextResponse.json({ txid, status: 'completed' });
    } else {
      throw new Error('Payment completion failed');
    }
  } catch (error) {
    console.error('Payment submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit payment' },
      { status: 500 },
    );
  }
}
