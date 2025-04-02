import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';

// Initialize PostgreSQL connection using neon
const sql = neon(process.env.DATABASE_URL!);

// Initialize drizzle with our schema
export const db = drizzle(sql, { schema });

// Migrate function for applying database migrations
export async function runMigrations() {
  try {
    console.log('Running migrations...');
    
    // Create users table
    try {
      await sql(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`);
    } catch (e) {
      console.log('Error creating users table, may already exist:', e);
    }
    
    // Create orders table
    try {
      await sql(`CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        order_type TEXT NOT NULL,
        address TEXT,
        pickup_time TEXT NOT NULL,
        dietary_restrictions TEXT[],
        special_instructions TEXT,
        items JSONB NOT NULL,
        total INTEGER NOT NULL,
        order_number TEXT NOT NULL UNIQUE,
        order_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        estimated_time TEXT
      )`);
    } catch (e) {
      console.log('Error creating orders table, may already exist:', e);
    }
    
    console.log('Database setup complete');
  } catch (error) {
    console.error('Migration error:', error);
    // Don't throw the error so the app can still start
    console.log('Continuing with app startup despite migration error');
  }
}