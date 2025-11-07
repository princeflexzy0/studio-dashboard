import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: '1', name: 'Emma Thompson', email: 'emma@studio.com', role: 'Admin', status: 'active', joinedDate: '2024-01-15' },
    { id: '2', name: 'James Chen', email: 'james@studio.com', role: 'Editor', status: 'active', joinedDate: '2024-02-20' },
    { id: '3', name: 'Sarah Johnson', email: 'sarah@studio.com', role: 'Viewer', status: 'active', joinedDate: '2024-03-10' },
    { id: '4', name: 'Michael Brown', email: 'michael@studio.com', role: 'Editor', status: 'inactive', joinedDate: '2024-01-05' },
  ]);
}
