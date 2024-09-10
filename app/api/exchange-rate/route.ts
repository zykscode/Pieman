import { NextResponse } from 'next/server';

export async function GET() {
  // In a real-world scenario, you would fetch the current exchange rate from a reliable source
  // For this example, we'll use a fixed rate
  const exchangeRate = 500; // 1 Pi = 500 NGN

  return NextResponse.json({ rate: exchangeRate });
}
