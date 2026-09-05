import { NextResponse } from 'next/server';
import { getAdminSession, verifyAdminToken } from '../../../../../lib/auth';
import { getDatabaseAsync, saveDatabaseAsync } from '../../../../../lib/db';

async function checkAuth(req: Request) {
  const session = await getAdminSession();
  if (session) return session;

  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    return await verifyAdminToken(token);
  }
  return null;
}

export async function POST(req: Request) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { newEmail, otp } = await req.json();

    if (!newEmail || !otp) {
      return NextResponse.json({ error: 'Email and 6-digit verification code are required' }, { status: 400 });
    }

    const db = await getDatabaseAsync();
    const targetEmail = newEmail.trim().toLowerCase();
    const pendingEmail = db.authSettings?.transferPendingEmail;
    const storedOtp = db.authSettings?.transferOtpCode;
    const expiresAt = db.authSettings?.transferOtpExpiresAt || 0;

    if (pendingEmail && pendingEmail !== targetEmail) {
      return NextResponse.json({ error: 'Email mismatch with requested transfer address' }, { status: 400 });
    }

    if (!storedOtp || storedOtp !== otp.trim()) {
      return NextResponse.json({ error: 'Invalid 6-digit verification code' }, { status: 401 });
    }

    if (Date.now() > expiresAt) {
      return NextResponse.json({ error: 'Verification code expired. Please request a new code.' }, { status: 401 });
    }

    // Update authorized email and clear transfer state
    db.authSettings = {
      ...db.authSettings,
      adminEmail: targetEmail,
      transferPendingEmail: undefined,
      transferOtpCode: undefined,
      transferOtpExpiresAt: undefined,
    };

    const saveResult = await saveDatabaseAsync(db);
    if (!saveResult.success) {
      return NextResponse.json({ error: saveResult.error || 'Failed to update authorized email' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      adminEmail: targetEmail,
      message: `Authorized Google Admin Email transferred to ${targetEmail}!`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
