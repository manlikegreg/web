const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: 'postgres', // Connect to default postgres database first
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('Setting up Science 1B database...');
    
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'science_1b_db';
    await client.query(`CREATE DATABASE ${dbName};`);
    console.log(`✅ Database '${dbName}' created successfully`);
    
  } catch (error) {
    if (error.code === '42P04') {
      console.log(`✅ Database '${process.env.DB_NAME || 'science_1b_db'}' already exists`);
    } else {
      console.error('❌ Error creating database:', error.message);
      throw error;
    }
  } finally {
    client.release();
  }
  
  await pool.end();
  console.log('Database setup completed!');
}

setupDatabase().catch(console.error);
