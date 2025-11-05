import { NextResponse } from 'next/server';

const mockUploads = [
  {
    id: '1',
    name: 'demo-video.mp4',
    url: '/uploads/demo-video.mp4',
    size: 45678900,
    type: 'video/mp4',
    uploadedAt: '2025-11-01T12:00:00Z',
    thumbnail: 'https://via.placeholder.com/640x360',
  },
  {
    id: '2',
    name: 'tutorial.webm',
    url: '/uploads/tutorial.webm',
    size: 78901234,
    type: 'video/webm',
    uploadedAt: '2025-10-30T15:30:00Z',
    thumbnail: 'https://via.placeholder.com/640x360',
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(mockUploads);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  // Simulate upload processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return NextResponse.json({
    id: Date.now().toString(),
    name: file.name,
    url: `/uploads/${file.name}`,
    size: file.size,
    type: file.type,
    uploadedAt: new Date().toISOString(),
  });
}