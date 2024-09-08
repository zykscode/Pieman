import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '#/lib/db';
import { submitPayment } from '#/lib/piNetwork';

const submitPaymentSchema = z.object({
  paymentId: z.string(),
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { paymentId } = submitPaymentSchema.parse(body);

    const txid = await submitPayment(paymentId);

    await prisma.transaction.update({
      where: { paymentId },
      data: { status: 'CONFIRMED', txid },
    });

    return NextResponse.json({ txid });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to submit payment' },
      { status: 500 },
    );
  }
}
