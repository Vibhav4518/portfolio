import { NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '../../../../lib/auth';
import { getDatabaseAsync } from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();
    const loginIdentifier = (email || username || '').trim().toLowerCase();

    if (!loginIdentifier || !password) {
      return NextResponse.json({ error: 'Email/Username and Password are required' }, { status: 400 });
    }

    const db = await getDatabaseAsync();
    const expectedEmail = (db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com').trim().toLowerCase();
    const expectedPassword = db.authSettings?.adminPassword || process.env.ADMIN_PASSWORD || 'adminpassword123';
    const legacyUsername = (process.env.ADMIN_USERNAME || 'admin').trim().toLowerCase();

    const matchesIdentifier = loginIdentifier === expectedEmail || loginIdentifier === legacyUsername;
    const matchesPassword = password === expectedPassword;

    if (!matchesIdentifier || !matchesPassword) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = await signAdminToken(expectedEmail);
    const response = NextResponse.json({ success: true, email: expectedEmail, role: 'ADMIN', token });

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
