import { NextResponse } from 'next/server';
import { getDatabase } from '../../../lib/db';

export async function GET() {
  try {
    const db = getDatabase();
    // Exclude private message content from public API endpoint
    const { messages, ...publicData } = db;
    return NextResponse.json(publicData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}
