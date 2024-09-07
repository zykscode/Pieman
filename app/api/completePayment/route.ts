import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createPayment } from '#/lib/piNetwork';
import { prisma } from '#/lib/prisma';

const paymentSchema = z.object({
  buyerId: z.string(),
  sellerId: z.string(),
  piAmount: z.number().positive(),
  nairaAmount: z.number().positive(),
  rate: z.number().positive(),
  description: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { buyerId, sellerId, piAmount, nairaAmount, rate, description } =
      paymentSchema.parse(body);

    const paymentData = {
      amount: piAmount,
      memo: description || 'Payment for transaction',
      metadata: { nairaAmount, rate, sellerId },
      uid: buyerId,
    };

    const paymentId = await createPayment(paymentData);

    const transaction = await prisma.transaction.create({
      data: {
        buyerId,
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
