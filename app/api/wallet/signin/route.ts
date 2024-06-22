import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { authResult } = await request.json();
  // Handle user sign-in logic, e.g., verify token, save session, etc.
  return NextResponse.json({ message: 'User signed in successfully' });
}
