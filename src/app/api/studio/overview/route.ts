import { NextResponse } from 'next/server';

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    uploads: 127,
    requests: 8,
    users: 24,
  });
}