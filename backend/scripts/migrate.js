const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'science_1b_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

async function runMigrations() {
  const client = await pool.connect();
  
  try {
    console.log('Running database migrations...');
    
    // Create articles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        author VARCHAR(100) NOT NULL,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        category VARCHAR(50) NOT NULL,
        tags JSONB DEFAULT '[]',
        image_url VARCHAR(500),
        slug VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Articles table created');
    
    // Create gallery_items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500) NOT NULL,
        type VARCHAR(10) NOT NULL CHECK (type IN ('photo', 'video')),
        video_url VARCHAR(500),
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Gallery items table created');
    
    // Create achievements table
    await client.query(`
      CREATE TABLE IF NOT EXISTS achievements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        year INTEGER NOT NULL,
        category VARCHAR(20) NOT NULL CHECK (category IN ('academic', 'sports', 'cultural', 'leadership')),
        image_url VARCHAR(500),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Achievements table created');
    
    // Create contact_messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log('✅ Contact messages table created');
    
    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
      CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
      CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
      CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category);
      CREATE INDEX IF NOT EXISTS idx_gallery_items_type ON gallery_items(type);
      CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);
      CREATE INDEX IF NOT EXISTS idx_achievements_year ON achievements(year);
      CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
    `);
    console.log('✅ Indexes created');
    
    console.log('🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    client.release();
  }
  
  await pool.end();
}

runMigrations().catch(console.error);
