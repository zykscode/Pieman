import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '#/lib/db';
import pi from '#/utils/piNetwork';

const paymentSchema = z.object({
  sellerId: z.string(),
  piAmount: z.number().positive(),
  nairaAmount: z.number().positive(),
  rate: z.number().positive(),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { sellerId, piAmount, nairaAmount, rate, description } =
      paymentSchema.parse(body);

    const paymentData = {
      amount: piAmount,
      memo: description || 'Payment for transaction',
      metadata: { nairaAmount, rate, sellerId },
      uid: userId,
    };

    const paymentId = await pi.createPayment(paymentData);

    const transaction = await prisma.transaction.create({
      data: {
        buyerId: userId,
        sellerId,
        piAmount,
        nairaAmount,
        rate,
        description,
        status: 'PENDING',
        paymentId,
      },
    });

    return NextResponse.json({ paymentId, transaction });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 },
    );
  }
}
