import { NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '../../../../lib/auth';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    const token = await signAdminToken(username);
    const response = NextResponse.json({ success: true, username, role: 'ADMIN', token });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Login authentication failed' }, { status: 500 });
  }
}
