import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let db: ReturnType<typeof drizzle>;

export async function getDb() {
  if (db) return db;
  
  const connection = await mysql.createConnection(
    process.env.DATABASE_URL || 'mysql://user:pass@localhost:3306/ramayana'
  );
  
  db = drizzle(connection, { schema, mode: 'default' });
  return db;
}
