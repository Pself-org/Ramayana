import { Client } from 'pg';

async function createDatabase() {
  // Connect to a default database that definitely exists (like 'template1' or 'postgres')
  const client = new Client({
    connectionString: 'postgres://127.0.0.1:5432/template1'
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL server.');
    
    // Check if the database already exists
    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = 'ramayana_odyssey'`);
    if (res.rowCount === 0) {
      console.log('Creating database "ramayana_odyssey"...');
      await client.query(`CREATE DATABASE "ramayana_odyssey"`);
      console.log('✅ Database created successfully!');
    } else {
      console.log('✅ Database "ramayana_odyssey" already exists.');
    }
  } catch (err) {
    console.error('❌ Error creating database:', err.message);
  } finally {
    await client.end();
  }
}

createDatabase();
