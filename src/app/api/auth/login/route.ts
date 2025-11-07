import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('🔐 Login API called');
  
  try {
    const body = await request.json();
    console.log('📧 Login attempt:', { email: body.email });

    const { email, password } = body;

    // Test credentials
    if (email === 'admin@test.com' && password === 'Test@123') {
      const token = 'auth-token-' + Date.now();
      
      console.log('✅ Login successful, token:', token);

      const response = NextResponse.json({
        success: true,
        token,
        message: 'Login successful',
        user: {
          email,
          name: 'Admin User',
          role: 'admin'
        }
      });

      // Set the auth cookie
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 86400,
        path: '/',
      });

      return response;
    }

    console.log('❌ Invalid credentials');
    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('❌ Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error: ' + error },
      { status: 500 }
    );
  }
}
