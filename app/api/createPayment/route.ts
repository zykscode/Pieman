import { auth } from '@clerk/nextjs/server';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import PiNetwork from 'pi-backend';
import { z } from 'zod';

import { prisma } from '#/lib/db';
import { PI_API_KEY, PI_WALLET_PRIVATE_SEED } from '#/lib/piNetwork';

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

    // Initialize PiNetwork SDK
    const pi = new PiNetwork(PI_API_KEY, PI_WALLET_PRIVATE_SEED);

    const payment = await pi.createPayment({
      amount,
      memo: memo || '',
      metadata: { userId },
      uid: crypto.randomUUID(), // Add this line
    });

    await prisma.transaction.create({
      data: {
        buyerId: userId,
        sellerId: 'PLACEHOLDER', // Replace with actual sellerId
        piAmount: amount,
        nairaAmount: 0, // Replace with actual nairaAmount
        rate: 0, // Replace with actual rate
        paymentId: payment,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ payment });
  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 },
    );
  }
}
