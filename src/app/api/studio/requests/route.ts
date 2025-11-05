import { NextResponse } from 'next/server';

const mockRequests = [
  {
    id: '1',
    name: 'Product Demo Video',
    date: '2025-11-04T10:30:00Z',
    type: 'video',
    status: 'pending',
    submittedBy: 'John Doe',
  },
  {
    id: '2',
    name: 'Tutorial Series',
    date: '2025-11-03T14:20:00Z',
    type: 'series',
    status: 'approved',
    submittedBy: 'Jane Smith',
  },
  {
    id: '3',
    name: 'Brand Campaign',
    date: '2025-11-02T09:15:00Z',
    type: 'campaign',
    status: 'pending',
    submittedBy: 'Mike Johnson',
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(mockRequests);
}