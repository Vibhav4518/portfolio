import fs from 'fs';
import path from 'path';
import { initialPortfolioData, PortfolioDatabase } from './data';
import clientPromise from './mongodb';

const DB_FILE = path.join(process.cwd(), 'portfolio_db.json');
const TMP_DB_FILE = path.join('/tmp', 'portfolio_db.json');

let inMemoryData: PortfolioDatabase | null = null;

export function getDatabase(): PortfolioDatabase {
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(fileData);
      inMemoryData = { ...initialPortfolioData, ...parsed };
      return inMemoryData!;
    }
  } catch (e) {
    console.error('Error reading primary db file:', e);
  }

  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const fileData = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      const parsed = JSON.parse(fileData);
      inMemoryData = { ...initialPortfolioData, ...parsed };
      return inMemoryData!;
    }
  } catch (e) {
    console.error('Error reading tmp db file:', e);
  }

  if (!inMemoryData) {
    inMemoryData = initialPortfolioData;
    saveDatabase(initialPortfolioData);
  }

  return inMemoryData;
}

export function saveDatabase(data: PortfolioDatabase): void {
  inMemoryData = data;

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write to local DB_FILE:', e);
  }

  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write to TMP_DB_FILE:', e);
  }
}

export async function getDatabaseAsync(): Promise<PortfolioDatabase> {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (uri && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db('portfolio_db');
      const collection = db.collection('portfolio');
      const record = await collection.findOne({ _id: 'main' as any });

      if (record) {
        const { _id, ...cleanData } = record;
        inMemoryData = { ...initialPortfolioData, ...(cleanData as unknown as PortfolioDatabase) };
        return inMemoryData;
      } else {
        await collection.updateOne(
          { _id: 'main' as any },
          { $set: { _id: 'main' as any, ...initialPortfolioData } },
          { upsert: true }
        );
        inMemoryData = initialPortfolioData;
        return initialPortfolioData;
      }
    } catch (e) {
      console.error('MongoDB query failed, falling back to disk/memory database:', e);
    }
  }
  return getDatabase();
}

export async function saveDatabaseAsync(data: PortfolioDatabase): Promise<void> {
  saveDatabase(data);

  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (uri && clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db('portfolio_db');
      const collection = db.collection('portfolio');
      await collection.updateOne(
        { _id: 'main' as any },
        { $set: { _id: 'main' as any, ...data } },
        { upsert: true }
      );
    } catch (e) {
      console.error('MongoDB save failed:', e);
    }
  }
}
