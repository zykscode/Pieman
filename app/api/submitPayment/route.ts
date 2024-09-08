import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import PiNetwork from 'pi-backend';
import { z } from 'zod';

import { prisma } from '#/lib/db';

const submitPaymentSchema = z.object({
  paymentId: z.string(),
});

// Initialize PiNetwork SDK
const pi = new PiNetwork(
  process.env.PI_API_KEY || '',
  process.env.PI_WALLET_PRIVATE_SEED || '',
);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { paymentId } = submitPaymentSchema.parse(body);

    // Submit the payment to the Pi Blockchain
    const txid = await pi.submitPayment(paymentId);

    // Update the transaction in the database
    await prisma.transaction.update({
      where: { paymentId },
      data: { status: 'CONFIRMED', txid },
    });

    // Complete the payment
    const completedPayment = await pi.completePayment(paymentId, txid);

    // Check if the payment was completed successfully
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
