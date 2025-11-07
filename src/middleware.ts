import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookies (try both names for compatibility)
  const token = request.cookies.get('auth_token')?.value || 
                request.cookies.get('auth-token')?.value;
  
  console.log('🔍 Middleware check:', { 
    pathname, 
    hasToken: !!token,
    token: token ? token.substring(0, 20) + '...' : 'none'
  });

  // Public paths
  const publicPaths = ['/', '/login'];
  const isPublicPath = publicPaths.includes(pathname);

  // Redirect to dashboard if logged in and accessing login
  if (token && pathname === '/login') {
    console.log('✅ Has token, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect to login if not authenticated and accessing protected route
  if (!token && !isPublicPath && pathname.startsWith('/dashboard')) {
    console.log('❌ No auth token, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  console.log('✅ Access granted');
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
