import fs from 'fs';
import path from 'path';
import { initialPortfolioData, PortfolioDatabase } from './data';

const DB_FILE = path.join(process.cwd(), 'portfolio_db.json');
const TMP_DB_FILE = path.join('/tmp', 'portfolio_db.json');

let inMemoryData: PortfolioDatabase | null = null;

export function getDatabase(): PortfolioDatabase {
  if (inMemoryData) {
    return inMemoryData;
  }

  try {
    if (fs.existsSync(DB_FILE)) {
      const fileData = fs.readFileSync(DB_FILE, 'utf-8');
      inMemoryData = JSON.parse(fileData);
      return inMemoryData!;
    }
  } catch (e) {
    console.error('Error reading primary db file, trying fallback:', e);
  }

  try {
    if (fs.existsSync(TMP_DB_FILE)) {
      const fileData = fs.readFileSync(TMP_DB_FILE, 'utf-8');
      inMemoryData = JSON.parse(fileData);
      return inMemoryData!;
    }
  } catch (e) {
    console.error('Error reading tmp db file:', e);
  }

  inMemoryData = initialPortfolioData;
  return inMemoryData;
}

export function saveDatabase(data: PortfolioDatabase): void {
  inMemoryData = data;
  
  // Try saving to project root file
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write to local DB_FILE (might be read-only Vercel environment):', e);
  }

  // Try saving to /tmp directory for serverless persistence per instance
  try {
    fs.writeFileSync(TMP_DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Could not write to TMP_DB_FILE:', e);
  }
}
