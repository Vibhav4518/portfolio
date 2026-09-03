import { NextResponse } from 'next/server';
import { getAdminSession, verifyAdminToken, COOKIE_NAME } from '../../../../lib/auth';
import { getDatabase, saveDatabase } from '../../../../lib/db';
import { convertGoogleDriveUrl } from '../../../../lib/gdrive';
import { cookies } from 'next/headers';

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

export async function GET(req: Request, { params }: { params: { section: string } }) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDatabase();
  const section = params.section as keyof typeof db;

  if (!(section in db)) {
    return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
  }

  return NextResponse.json({ [section]: db[section] });
}

export async function POST(req: Request, { params }: { params: { section: string } }) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDatabase();
  const section = params.section;
  const body = await req.json();

  if (section === 'projects') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    const newItem = { id: `proj-${Date.now()}`, ...body };
    db.projects = [newItem, ...(db.projects || [])];
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  }

  if (section === 'certificates') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    const newItem = { id: `cert-${Date.now()}`, ...body };
    db.certificates = [newItem, ...(db.certificates || [])];
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  }

  if (section === 'experiences') {
    const newItem = { id: `exp-${Date.now()}`, ...body };
    db.experiences = [newItem, ...(db.experiences || [])];
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  }

  if (section === 'education') {
    const newItem = { id: `edu-${Date.now()}`, ...body };
    db.education = [newItem, ...(db.education || [])];
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  }

  if (section === 'skills') {
    db.skills = body.skills || db.skills;
    saveDatabase(db);
    return NextResponse.json({ success: true, skills: db.skills });
  }

  return NextResponse.json({ error: 'Unsupported section for POST' }, { status: 400 });
}

export async function PUT(req: Request, { params }: { params: { section: string } }) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getDatabase();
  const section = params.section;
  const body = await req.json();

  if (section === 'profile') {
    db.profile = { ...db.profile, ...body };
    saveDatabase(db);
    return NextResponse.json({ success: true, profile: db.profile });
  }

  if (section === 'projects') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    db.projects = (db.projects || []).map((p) => (p.id === body.id ? { ...p, ...body } : p));
    saveDatabase(db);
    return NextResponse.json({ success: true, projects: db.projects });
  }

  if (section === 'certificates') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    db.certificates = (db.certificates || []).map((c) => (c.id === body.id ? { ...c, ...body } : c));
    saveDatabase(db);
    return NextResponse.json({ success: true, certificates: db.certificates });
  }

  if (section === 'experiences') {
    db.experiences = (db.experiences || []).map((e) => (e.id === body.id ? { ...e, ...body } : e));
    saveDatabase(db);
    return NextResponse.json({ success: true, experiences: db.experiences });
  }

  if (section === 'education') {
    db.education = (db.education || []).map((ed) => (ed.id === body.id ? { ...ed, ...body } : ed));
    saveDatabase(db);
    return NextResponse.json({ success: true, education: db.education });
  }

  return NextResponse.json({ error: 'Unsupported section for PUT' }, { status: 400 });
}

export async function DELETE(req: Request, { params }: { params: { section: string } }) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Item ID required' }, { status: 400 });
  }

  const db = getDatabase();
  const section = params.section;

  if (section === 'projects') {
    db.projects = (db.projects || []).filter((p) => p.id !== id);
  } else if (section === 'certificates') {
    db.certificates = (db.certificates || []).filter((c) => c.id !== id);
  } else if (section === 'experiences') {
    db.experiences = (db.experiences || []).filter((e) => e.id !== id);
  } else if (section === 'education') {
    db.education = (db.education || []).filter((ed) => ed.id !== id);
  } else if (section === 'messages') {
    db.messages = (db.messages || []).filter((m) => m.id !== id);
  } else {
    return NextResponse.json({ error: 'Unsupported section for DELETE' }, { status: 400 });
  }

  saveDatabase(db);
  return NextResponse.json({ success: true, id });
}
