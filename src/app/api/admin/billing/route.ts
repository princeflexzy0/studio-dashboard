import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    currentPlan: {
      name: 'Professional',
      price: 79,
      credits: 500,
      creditsUsed: 247,
      renewalDate: '2024-12-05'
    },
    transactions: [
      { id: 'TXN001', date: '2024-11-05', description: 'Monthly subscription', amount: 79, status: 'completed' },
      { id: 'TXN002', date: '2024-10-05', description: 'Monthly subscription', amount: 79, status: 'completed' },
      { id: 'TXN003', date: '2024-09-05', description: 'Monthly subscription', amount: 79, status: 'completed' },
    ]
  });
}
