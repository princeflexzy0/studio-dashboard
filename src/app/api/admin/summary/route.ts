import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    total_creators: 124,
    total_uploads: 856,
    active_campaigns: 14,
    revenue_usd: 4800,
    graph: [
      { date: '2025-11-01', views: 220, revenue: 450 },
      { date: '2025-11-02', views: 310, revenue: 580 },
      { date: '2025-11-03', views: 280, revenue: 520 },
      { date: '2025-11-04', views: 340, revenue: 690 },
      { date: '2025-11-05', views: 380, revenue: 720 },
    ]
  });
}
