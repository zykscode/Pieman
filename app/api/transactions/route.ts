export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

// Mock database of users and transactions
const users = new Set(['user1', 'user2', 'user3']);
const mockTransactions = [
  {
    id: 1,
    type: 'buy',
    amount: 10,
    currency: 'PI',
    createdAt: '2023-04-01T10:00:00Z',
  },
  {
    id: 2,
    type: 'sell',
    amount: 5000,
    currency: 'NGN',
    createdAt: '2023-04-02T11:00:00Z',
  },
  {
    id: 3,
    type: 'buy',
    amount: 20,
    currency: 'PI',
    createdAt: '2023-04-03T12:00:00Z',
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const piUserUid = searchParams.get('piUserUid');
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (!piUserUid) {
      return NextResponse.json({ error: 'Missing piUserUid' }, { status: 400 });
    }

    // Simple authentication check
    if (!users.has(piUserUid)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Simulate fetching transactions from a database
    const transactions = mockTransactions.slice(0, limit);

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
