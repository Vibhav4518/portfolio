import { NextResponse } from 'next/server';
import { getDatabaseAsync } from '../../../lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const db = await getDatabaseAsync();
    const { messages, ...publicData } = db;
    return NextResponse.json(publicData, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio data' }, { status: 500 });
  }
}
