import { NextResponse } from 'next/server';
import { getDatabaseAsync, saveDatabaseAsync } from '../../../../lib/db';
import { sendOtpEmail } from '../../../../lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const db = await getDatabaseAsync();
    const registeredEmail = (db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com').trim().toLowerCase();

    if (email.trim().toLowerCase() !== registeredEmail) {
      return NextResponse.json({ error: 'Email address not recognized as registered admin email' }, { status: 404 });
    }

    // Generate 6-digit OTP code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    db.authSettings = {
      ...db.authSettings,
      adminEmail: registeredEmail,
      otpCode,
      otpExpiresAt,
    };

    const saveResult = await saveDatabaseAsync(db);
    if (!saveResult.success) {
      return NextResponse.json({ error: 'Failed to generate OTP. Please try again.' }, { status: 500 });
    }

    // Send OTP email
    await sendOtpEmail({
      to: registeredEmail,
      subject: 'Portfolio Admin Login OTP Code',
      otpCode,
      purpose: 'login',
    });

    return NextResponse.json({
      success: true,
      message: `OTP Code sent to ${registeredEmail}. Please check your Gmail inbox or spam folder.`,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to send OTP code' }, { status: 500 });
  }
}
