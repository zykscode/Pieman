// app/api/fetch-data/route.ts
import { NextResponse } from 'next/server';

import platformAPIClient from '#/lib/platformAPIClient';

export async function GET() {
  try {
    // Make the request to the external API server-side
    const response = await platformAPIClient.get('/v2/me');
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
