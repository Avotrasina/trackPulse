import pool from "../config/db.js";

export async function initDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS offers (
      id SERIAL PRIMARY KEY,
      type VARCHAR(10) NOT NULL,
      title TEXT NOT NULL,
      source TEXT NOT NULL,
      link TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

export default initDatabase;