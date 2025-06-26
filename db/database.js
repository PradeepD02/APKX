const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to SQLite DB file
const db = new sqlite3.Database(path.resolve(__dirname, 'data.db'), (err) => {
    if (err) return console.error('❌ Could not connect to DB', err);
    console.log('✅ Connected to SQLite database.');
});

// Create 'items' table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

// Create 'appointments' table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL
  )
`);

module.exports = db;
