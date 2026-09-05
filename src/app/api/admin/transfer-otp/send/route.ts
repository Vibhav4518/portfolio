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
    const { newEmail } = await req.json();
    if (!newEmail || !newEmail.trim() || !newEmail.includes('@')) {
      return NextResponse.json({ error: 'Valid Google email address required' }, { status: 400 });
    }

    const db = await getDatabaseAsync();
    const targetEmail = newEmail.trim().toLowerCase();

    // Generate 6-digit verification code
    const transferOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const transferOtpExpiresAt = Date.now() + 10 * 60 * 1000;

    db.authSettings = {
      ...db.authSettings,
      adminEmail: db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com',
      transferPendingEmail: targetEmail,
      transferOtpCode,
      transferOtpExpiresAt,
    };

    const saveResult = await saveDatabaseAsync(db);
    if (!saveResult.success) {
      return NextResponse.json({ error: 'Failed to generate transfer verification code' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Verification code generated for ${targetEmail}. Expires in 10 minutes.`,
      otpPreview: transferOtpCode,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to request transfer verification code' }, { status: 500 });
  }
}
