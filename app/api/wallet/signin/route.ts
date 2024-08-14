import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import platformAPIClient from '#/lib/platformAPIClient';

export async function POST(req: NextRequest) {
  const { authResult: auth } = await req.json();

  // Check if the auth contains a wallet address and accessToken
  if (!auth || !auth.accessToken || !auth.walletAddress) {
    return NextResponse.json(
      { error: 'Missing access token or wallet address' },
      { status: 400 },
    );
  }

  try {
    // Verify the user's access token with the /me endpoint:
    const me = await platformAPIClient.get(`/v2/me`, {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });

    console.log(me.data,'sjhsgghas sghsghasghghasgaskj ssgsgjasj');

    // Fetch wallet from the database based on the wallet address
    let wallet = await prisma.wallet.findUnique({
      where: { address: auth.walletAddress },
      include: { user: true },
    });

    // If the wallet exists, update its access token
    if (wallet) {
      await prisma.account.update({
        where: { userId: wallet.userId },
        data: { access_token: auth.accessToken },
      });
    } else {
      // Otherwise, create a new user and wallet entry
      wallet = await prisma.wallet.create({
        data: {
          address: auth.walletAddress,
          user: {
            create: {
              username: auth.user.username || null,
              email: auth.user.email,
              role: 'USER',
            },
          },
        },
        include: { user: true },
      });
    }

    // Store session or user info in cookies (or tokens as needed)
    const response = NextResponse.json({
      message: 'Wallet signed in successfully',
    });

    // Set the wallet or user data in cookies for session management
    // Example: response.cookies.set('walletId', wallet.id, { httpOnly: true });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Invalid access token or wallet address' },
      { status: 401 },
    );
  }
}
