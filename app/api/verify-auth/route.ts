import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('Authorization')?.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json(
      { error: 'Access token is required' },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get('https://api.minepi.com/v2/me', {
      headers: { Authorization: `Bearer ${process.env.PI_API_KEY}` },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 },
    );
  }
}
