import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 'REQ001', title: 'Product Launch Video', creator: 'Yuki Tanaka', type: 'Video', status: 'pending', submittedDate: '2024-11-05', description: 'High-quality promotional video' },
    { id: 'REQ002', title: 'Brand Story Campaign', creator: 'Sofia Rodriguez', type: 'Campaign', status: 'pending', submittedDate: '2024-11-04', description: 'Multi-platform brand narrative' },
    { id: 'REQ003', title: 'Social Media Content Pack', creator: 'Kwame Mensah', type: 'Content', status: 'pending', submittedDate: '2024-11-03', description: 'Collection of 20 social media posts' },
    { id: 'REQ004', title: 'Tutorial Series', creator: 'Priya Sharma', type: 'Video', status: 'approved', submittedDate: '2024-11-02', description: 'Educational video series' },
    { id: 'REQ005', title: 'Event Coverage', creator: 'Marcus Washington', type: 'Video', status: 'rejected', submittedDate: '2024-11-01', description: 'Professional event coverage' },
  ]);
}
