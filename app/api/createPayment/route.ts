/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from '@clerk/nextjs/server';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '#/lib/db';
import { createPayment } from '#/lib/piNetwork';

const createPaymentSchema = z.object({
  amount: z.number().positive(),
  memo: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { amount, memo } = createPaymentSchema.parse(body);

    const paymentData = {
      amount,
      memo: memo || '',
      metadata: { userId },
      uid: crypto.randomUUID(),
    };

    const paymentId = await createPayment(paymentData, {
      onReadyForServerApproval: async (paymentId: any) => {
        await prisma.transaction.create({
          data: {
            buyerId: userId,
            sellerId: 'PLACEHOLDER', // Replace with actual sellerId
            piAmount: amount,
            nairaAmount: 0, // Replace with actual nairaAmount
            rate: 0, // Replace with actual rate
            paymentId,
            status: 'PENDING',
          },
        });
      },
      onReadyForServerCompletion: () => {},
      onCancel: () => {},
      onError: () => {},
    });

    return NextResponse.json({ paymentId });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 },
    );
  }
}
