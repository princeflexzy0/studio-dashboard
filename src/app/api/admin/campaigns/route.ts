import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 'CMP001', title: 'Ad Campaign 1', budget: 150, spent: 120, status: 'active', impressions: 45000 },
    { id: 'CMP002', title: 'Ad Campaign 2', budget: 200, spent: 85, status: 'paused', impressions: 28000 },
    { id: 'CMP003', title: 'Ad Campaign 3', budget: 300, spent: 280, status: 'active', impressions: 89000 },
  ]);
}
