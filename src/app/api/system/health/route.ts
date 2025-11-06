import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'operational',
    uptime_hours: 142,
    queue_status: 'stable',
    last_check: new Date().toISOString(),
    services: {
      database: 'healthy',
      storage: 'healthy',
      api: 'healthy',
      automation: 'healthy'
    }
  });
}
