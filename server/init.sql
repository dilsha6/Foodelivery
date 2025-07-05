-- Create table for address
CREATE TABLE IF NOT EXISTS address (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  line3 TEXT,
  phone TEXT NOT NULL,
  pincode TEXT NOT NULL
);

-- Create table for orders
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
