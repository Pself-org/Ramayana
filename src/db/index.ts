import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Use a global variable to preserve the connection across hot reloads in dev
const globalForDb = global as unknown as { db: ReturnType<typeof drizzle> | undefined };

export async function getDb() {
  if (globalForDb.db) return globalForDb.db;
  
  try {
    const connection = await mysql.createConnection(
      process.env.DATABASE_URL || 'mysql://root:password@127.0.0.1:3306/ramayana'
    );
    
    globalForDb.db = drizzle(connection, { schema, mode: 'default' });
    return globalForDb.db;
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    // Return a proxy or throw a more descriptive error
    // For build time, we might want to return a dummy if we can't connect
    throw error;
  }
}
