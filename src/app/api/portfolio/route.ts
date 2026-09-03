import { NextResponse } from 'next/server';
import { getDatabaseAsync } from '../../../lib/db';

export async function GET() {
  try {
    const db = await getDatabaseAsync();
    const { messages, ...publicData } = db;
    return NextResponse.json(publicData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}
