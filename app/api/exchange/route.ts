import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, amount, currency } = await request.json();

    if (!type || !amount || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    if (type !== 'buy' && type !== 'sell') {
      return NextResponse.json(
        { error: 'Invalid exchange type' },
        { status: 400 },
      );
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    if (currency !== 'PI' && currency !== 'NGN') {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });
    }

    // TODO: Process the exchange in your database and update balances

    return NextResponse.json({ message: 'Exchange processed successfully' });
  } catch (error) {
    console.error('Error processing exchange:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
