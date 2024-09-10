import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (userId) {
    return NextResponse.json({ isAuthenticated: true });
  } else {
    return NextResponse.json({ isAuthenticated: false });
  }
}
