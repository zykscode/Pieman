import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    // TODO: Fetch transactions from your database
    const transactions = [
      {
        id: 1,
        type: 'buy',
        amount: 10,
        currency: 'PI',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        type: 'sell',
        amount: 5000,
        currency: 'NGN',
        createdAt: new Date().toISOString(),
      },
    ].slice(0, limit);

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
