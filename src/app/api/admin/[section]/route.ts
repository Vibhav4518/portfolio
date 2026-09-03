import { NextResponse } from 'next/server';
import { getAdminSession, verifyAdminToken } from '../../../../lib/auth';
import { getDatabaseAsync, saveDatabaseAsync } from '../../../../lib/db';
import { convertGoogleDriveUrl } from '../../../../lib/gdrive';
import { SkillCategory } from '../../../../lib/data';

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

  const db = await getDatabaseAsync();
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

  const db = await getDatabaseAsync();
  const section = params.section;
  const body = await req.json();

  if (section === 'projects') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    const newItem = { id: `proj-${Date.now()}`, ...body };
    db.projects = [newItem, ...(db.projects || [])];
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, item: newItem, projects: db.projects });
  }

  if (section === 'projectCategories') {
    const categoryName = body.category?.trim();
    if (!categoryName) {
      return NextResponse.json({ error: 'Category name required' }, { status: 400 });
    }
    if (!db.projectCategories) db.projectCategories = [];
    if (!db.projectCategories.includes(categoryName)) {
      db.projectCategories.push(categoryName);
      await saveDatabaseAsync(db);
    }
    return NextResponse.json({ success: true, projectCategories: db.projectCategories });
  }

  if (section === 'certificates') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    const newItem = { id: `cert-${Date.now()}`, ...body };
    db.certificates = [newItem, ...(db.certificates || [])];
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, item: newItem, certificates: db.certificates });
  }

  if (section === 'certificateCategories') {
    const categoryName = body.category?.trim();
    if (!categoryName) {
      return NextResponse.json({ error: 'Category name required' }, { status: 400 });
    }
    if (!db.certificateCategories) db.certificateCategories = [];
    if (!db.certificateCategories.includes(categoryName)) {
      db.certificateCategories.push(categoryName);
      await saveDatabaseAsync(db);
    }
    return NextResponse.json({ success: true, certificateCategories: db.certificateCategories });
  }

  if (section === 'experiences') {
    const newItem = { id: `exp-${Date.now()}`, ...body };
    db.experiences = [newItem, ...(db.experiences || [])];
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, item: newItem, experiences: db.experiences });
  }

  if (section === 'education') {
    const newItem = { id: `edu-${Date.now()}`, ...body };
    db.education = [newItem, ...(db.education || [])];
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, item: newItem, education: db.education });
  }

  if (section === 'skills') {
    const category = body.category?.trim();
    const skills = Array.isArray(body.skills) ? body.skills : [];
    if (!category) {
      return NextResponse.json({ error: 'Category name required' }, { status: 400 });
    }
    const newSkillCat: SkillCategory = {
      id: `skill-cat-${Date.now()}`,
      category,
      skills,
    };
    db.skills = [newSkillCat, ...(db.skills || [])];
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, skills: db.skills });
  }

  return NextResponse.json({ error: 'Unsupported section for POST' }, { status: 400 });
}

export async function PUT(req: Request, { params }: { params: { section: string } }) {
  const user = await checkAuth(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = await getDatabaseAsync();
  const section = params.section;
  const body = await req.json();

  if (section === 'profile') {
    db.profile = { ...db.profile, ...body };
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, profile: db.profile });
  }

  if (section === 'projects') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    db.projects = (db.projects || []).map((p) => (p.id === body.id ? { ...p, ...body } : p));
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, projects: db.projects });
  }

  if (section === 'projectCategories') {
    const { oldCategory, newCategory } = body;
    if (db.projectCategories) {
      db.projectCategories = db.projectCategories.map((c) => (c === oldCategory ? newCategory : c));
      db.projects = (db.projects || []).map((p) => (p.category === oldCategory ? { ...p, category: newCategory } : p));
      await saveDatabaseAsync(db);
    }
    return NextResponse.json({ success: true, projectCategories: db.projectCategories });
  }

  if (section === 'certificates') {
    if (body.imageUrl) {
      body.imageUrl = convertGoogleDriveUrl(body.imageUrl);
    }
    db.certificates = (db.certificates || []).map((c) => (c.id === body.id ? { ...c, ...body } : c));
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, certificates: db.certificates });
  }

  if (section === 'certificateCategories') {
    const { oldCategory, newCategory } = body;
    if (db.certificateCategories) {
      db.certificateCategories = db.certificateCategories.map((c) => (c === oldCategory ? newCategory : c));
      db.certificates = (db.certificates || []).map((c) => (c.category === oldCategory ? { ...c, category: newCategory } : c));
      await saveDatabaseAsync(db);
    }
    return NextResponse.json({ success: true, certificateCategories: db.certificateCategories });
  }

  if (section === 'experiences') {
    db.experiences = (db.experiences || []).map((e) => (e.id === body.id ? { ...e, ...body } : e));
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, experiences: db.experiences });
  }

  if (section === 'education') {
    db.education = (db.education || []).map((ed) => (ed.id === body.id ? { ...ed, ...body } : ed));
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, education: db.education });
  }

  if (section === 'skills') {
    const { id, category, skills } = body;
    db.skills = (db.skills || []).map((s) => (s.id === id ? { ...s, category, skills } : s));
    await saveDatabaseAsync(db);
    return NextResponse.json({ success: true, skills: db.skills });
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
  const category = searchParams.get('category');

  const db = await getDatabaseAsync();
  const section = params.section;

  if (section === 'projects' && id) {
    db.projects = (db.projects || []).filter((p) => p.id !== id);
  } else if (section === 'projectCategories' && category) {
    db.projectCategories = (db.projectCategories || []).filter((c) => c !== category);
  } else if (section === 'certificates' && id) {
    db.certificates = (db.certificates || []).filter((c) => c.id !== id);
  } else if (section === 'certificateCategories' && category) {
    db.certificateCategories = (db.certificateCategories || []).filter((c) => c !== category);
  } else if (section === 'skills' && id) {
    db.skills = (db.skills || []).filter((s) => s.id !== id);
  } else if (section === 'experiences' && id) {
    db.experiences = (db.experiences || []).filter((e) => e.id !== id);
  } else if (section === 'education' && id) {
    db.education = (db.education || []).filter((ed) => ed.id !== id);
  } else if (section === 'messages' && id) {
    db.messages = (db.messages || []).filter((m) => m.id !== id);
  } else {
    return NextResponse.json({ error: 'Invalid section or missing ID/category for DELETE' }, { status: 400 });
  }

  await saveDatabaseAsync(db);
  return NextResponse.json({ success: true });
}
