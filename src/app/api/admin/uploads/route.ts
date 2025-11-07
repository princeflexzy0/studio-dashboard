import { NextResponse } from 'next/server';

export async function GET() {
  // Dummy uploads data
  const uploads = [
    {
      id: 1,
      title: 'Summer Campaign Video',
      creator: 'Sarah Johnson',
      status: 'approved',
      date: '2024-11-05',
      size: '45.2 MB',
      type: 'video/mp4'
    },
    {
      id: 2,
      title: 'Product Review Content',
      creator: 'Mike Chen',
      status: 'pending',
      date: '2024-11-06',
      size: '32.8 MB',
      type: 'video/mp4'
    },
    {
      id: 3,
      title: 'Brand Story Animation',
      creator: 'Emma Wilson',
      status: 'approved',
      date: '2024-11-04',
      size: '67.5 MB',
      type: 'video/mp4'
    },
    {
      id: 4,
      title: 'Tutorial Series Ep 1',
      creator: 'David Park',
      status: 'rejected',
      date: '2024-11-03',
      size: '28.3 MB',
      type: 'video/mp4'
    },
    {
      id: 5,
      title: 'Behind The Scenes Footage',
      creator: 'Lisa Anderson',
      status: 'pending',
      date: '2024-11-06',
      size: '54.1 MB',
      type: 'video/mp4'
    }
  ];

  return NextResponse.json(uploads);
}
