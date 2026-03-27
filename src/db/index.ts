import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

// Use a global variable to preserve the connection across hot reloads in dev
const globalForDb = global as unknown as { db: ReturnType<typeof drizzle> | undefined; pool: any | undefined };

export async function getDb() {
  if (globalForDb.db) return globalForDb.db;
  
  try {
    const connectionUrl = process.env.DATABASE_URL || 'mysql://root:password@127.0.0.1:3306/ramayana';
    
    if (!globalForDb.pool) {
      globalForDb.pool = mysql.createPool(connectionUrl);
    }
    
    globalForDb.db = drizzle(globalForDb.pool, { schema, mode: 'default' });
    return globalForDb.db;
  } catch (error) {
    console.error('❌ Failed to initialize database connection:', error);
    throw error;
  }
}
