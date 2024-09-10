import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1];

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify the user's identity using the Platform API
    const response = await axios.get('https://api.minepi.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userDetails = {
      username: response.data.username,
      // Add any other relevant user details from the Pi API response
    };

    return NextResponse.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
