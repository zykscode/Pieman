// app/api/submitPayment/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

import pi from '#/utils/piNetwork';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { paymentId } = await req.json();

  try {
    const txid = await pi.submitPayment(paymentId);

    // Update transaction with txid
    await prisma.transaction.updateMany({
      where: { paymentId },
      data: { id: txid },
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
