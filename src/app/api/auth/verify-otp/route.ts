import { NextResponse } from 'next/server';
import { signAdminToken, COOKIE_NAME } from '../../../../lib/auth';
import { getDatabaseAsync, saveDatabaseAsync } from '../../../../lib/db';

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and 6-digit OTP code are required' }, { status: 400 });
    }

    const db = await getDatabaseAsync();
    const registeredEmail = (db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com').trim().toLowerCase();

    if (email.trim().toLowerCase() !== registeredEmail) {
      return NextResponse.json({ error: 'Email address not recognized' }, { status: 401 });
    }

    const storedOtp = db.authSettings?.otpCode;
    const expiresAt = db.authSettings?.otpExpiresAt || 0;

    if (!storedOtp || storedOtp !== otp.trim()) {
      return NextResponse.json({ error: 'Invalid OTP verification code' }, { status: 401 });
    }

    if (Date.now() > expiresAt) {
      return NextResponse.json({ error: 'OTP code has expired. Please request a new code.' }, { status: 401 });
    }

    // Clear OTP after successful verification
    db.authSettings = {
      ...db.authSettings,
      adminEmail: registeredEmail,
      otpCode: undefined,
      otpExpiresAt: undefined,
    };
    await saveDatabaseAsync(db);

    const token = await signAdminToken(registeredEmail);
    const response = NextResponse.json({ success: true, email: registeredEmail, role: 'ADMIN', token });

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
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'OTP verification failed' }, { status: 500 });
  }
}
