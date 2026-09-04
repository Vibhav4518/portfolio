import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export function getMongoPromise(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI || process.env.DATABASE_URL || '';
  if (!uri) return null;

  if (clientPromise) return clientPromise;

  const options = {
    connectTimeoutMS: 8000,
    serverSelectionTimeoutMS: 8000,
  };

  if (process.env.NODE_ENV === 'development') {
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

export default getMongoPromise();
