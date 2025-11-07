import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get auth token from cookie
  const authToken = request.cookies.get('auth-token')?.value;

  console.log('🔍 Middleware check:', { pathname, hasToken: !!authToken });

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/'];

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname === path);

  // If trying to access protected route without auth, redirect to login
  if (!isPublicPath && !authToken) {
    console.log('❌ No auth token, redirecting to login');
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access login, redirect to dashboard
  if (authToken && pathname === '/login') {
    console.log('✅ Already authenticated, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  console.log('✅ Access granted');
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
