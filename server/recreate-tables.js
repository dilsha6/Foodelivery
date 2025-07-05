// recreate-tables.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

async function recreateTables() {
  try {
    console.log('🔄 Connecting to database...');
    
    // Drop existing tables
    console.log('🗑️ Dropping existing tables...');
    await pool.query('DROP TABLE IF EXISTS orders');
    await pool.query('DROP TABLE IF EXISTS address');
    
    // Create address table
    console.log('📝 Creating address table...');
    await pool.query(`
      CREATE TABLE address (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        line1 TEXT NOT NULL,
        line2 TEXT,
        line3 TEXT,
        phone TEXT NOT NULL,
        pincode TEXT NOT NULL
      )
    `);
    
    // Create orders table
    console.log('📝 Creating orders table...');
    await pool.query(`
      CREATE TABLE orders (
        id VARCHAR(50) PRIMARY KEY,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    console.log('✅ Tables recreated successfully!');
    
    // Verify tables
    console.log('🔍 Verifying tables...');
    const addressResult = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'address'");
    const ordersResult = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'orders'");
    
    console.log('📊 Address table columns:', addressResult.rows);
    console.log('📊 Orders table columns:', ordersResult.rows);
    
  } catch (err) {
    console.error('❌ Error recreating tables:', err);
  } finally {
    await pool.end();
  }
}

recreateTables();
