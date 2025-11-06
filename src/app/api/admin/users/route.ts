import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', uploads: 45, joined: '2025-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', uploads: 32, joined: '2025-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'pending', uploads: 12, joined: '2025-10-01' },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', status: 'active', uploads: 67, joined: '2024-12-10' },
    { id: 5, name: 'David Brown', email: 'david@example.com', status: 'inactive', uploads: 8, joined: '2025-09-05' },
  ]);
}
