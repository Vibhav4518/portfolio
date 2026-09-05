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
  const { newEmail } = await req.json();

  if (!newEmail || !newEmail.trim() || !newEmail.includes('@')) {
    return NextResponse.json({ error: 'A valid Google email address is required' }, { status: 400 });
  }

  const updatedEmail = newEmail.trim().toLowerCase();

  db.authSettings = {
    ...db.authSettings,
    adminEmail: updatedEmail,
  };

  const saveResult = await saveDatabaseAsync(db);
  if (!saveResult.success) {
    return NextResponse.json({ error: saveResult.error || 'Failed to update authorized Google email' }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    adminEmail: updatedEmail,
    message: `Authorized Google Admin email updated to ${updatedEmail}!`,
  });
}
