import { NextResponse } from 'next/server';
import { getDatabaseAsync, saveDatabaseAsync } from '../../../lib/db';
import { ContactMessage } from '../../../lib/data';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const db = await getDatabaseAsync();
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      subject: subject || 'Portfolio Contact Inquiry',
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    db.messages = [newMessage, ...(db.messages || [])];
    await saveDatabaseAsync(db);

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
