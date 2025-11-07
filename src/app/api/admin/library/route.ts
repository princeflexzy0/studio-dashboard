import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 'FILE001', title: 'Product Launch Video.mp4', uploader: 'Yuki Tanaka', date: '2024-11-05', status: 'active', type: 'video', size: '45.2 MB', description: 'High-quality promotional video' },
    { id: 'FILE002', title: 'Brand Assets Collection.zip', uploader: 'Sofia Rodriguez', date: '2024-11-04', status: 'active', type: 'document', size: '128.5 MB', description: 'Complete brand assets' },
    { id: 'FILE003', title: 'Campaign Banner.png', uploader: 'Kwame Mensah', date: '2024-11-03', status: 'active', type: 'image', size: '2.8 MB', description: 'Main banner image' },
    { id: 'FILE004', title: 'Tutorial Series Part 1.mp4', uploader: 'Priya Sharma', date: '2024-11-02', status: 'processing', type: 'video', size: '89.3 MB', description: 'First episode' },
  ]);
}
