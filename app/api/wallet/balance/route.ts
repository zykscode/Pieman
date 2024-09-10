import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import { prisma } from '#/lib/db';
import { getWalletInfo } from '#/lib/piNetwork';

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { piNetworkAccessToken: true },
    });

    if (!user?.piNetworkAccessToken) {
      return NextResponse.json(
        { error: 'Pi Network access token not found' },
        { status: 404 },
      );
    }

    const walletInfo = await getWalletInfo(user.piNetworkAccessToken);

    return NextResponse.json({ balance: walletInfo.balance });
  } catch (error) {
    console.error('Error fetching Pi wallet balance:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
