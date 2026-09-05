import { NextResponse } from 'next/server';
import { getAdminSession, verifyAdminToken } from '../../../../lib/auth';
import { getDatabaseAsync, saveDatabaseAsync } from '../../../../lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

export async function GET(req: Request) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDatabaseAsync();
  const adminEmail = db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com';

  return NextResponse.json({ adminEmail });
}

export async function PUT(req: Request) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDatabaseAsync();
  const { currentPassword, newEmail, newPassword } = await req.json();

  const expectedPassword = db.authSettings?.adminPassword || process.env.ADMIN_PASSWORD || 'adminpassword123';

  if (!currentPassword || currentPassword !== expectedPassword) {
    return NextResponse.json({ error: 'Incorrect current password' }, { status: 400 });
  }

  let updatedEmail = db.authSettings?.adminEmail || process.env.ADMIN_EMAIL || 'vibhavsrivastav355@gmail.com';
  let updatedPassword = expectedPassword;

  if (newEmail && newEmail.trim()) {
    updatedEmail = newEmail.trim().toLowerCase();
  }

  if (newPassword && newPassword.trim()) {
    if (newPassword.trim().length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters long' }, { status: 400 });
    }
    updatedPassword = newPassword.trim();
  }

  db.authSettings = {
    ...db.authSettings,
    adminEmail: updatedEmail,
    adminPassword: updatedPassword,
  };

  const saveResult = await saveDatabaseAsync(db);
  if (!saveResult.success) {
    return NextResponse.json({ error: saveResult.error || 'Failed to update login settings' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    adminEmail: updatedEmail,
    message: 'Admin email and security credentials updated successfully!',
  });
}
