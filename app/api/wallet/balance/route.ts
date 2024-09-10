import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { prisma } from '#/lib/db'; // Adjust this import based on your project structure
import { getServerSideWalletBalance } from '#/lib/piNetwork';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = await getPiNetworkAccessToken(userId);
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Pi Network access token not found' },
        { status: 404 },
      );
    }

    const balance = await getServerSideWalletBalance(accessToken);

    return NextResponse.json({ balance });
  } catch (error) {
    console.error('Error fetching Pi wallet balance:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

async function getPiNetworkAccessToken(userId: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { piNetworkAccessToken: true },
  });

  return user?.piNetworkAccessToken || null;
}
