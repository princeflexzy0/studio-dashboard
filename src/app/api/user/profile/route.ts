import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    id: '1',
    name: 'Princeflexzy',
    email: 'princeflexzy@studio.com',
    role: 'admin',
    bio: 'AI & Full-Stack Automation Engineer',
    avatar: null,
  });
}