const sqlite3 = require('sqlite3').verbose();
const path = require('path');

<<<<<<< HEAD
// Create or connect to SQLite DB file
const db = new sqlite3.Database(path.resolve(__dirname, 'data.db'), (err) => {
    if (err) return console.error('❌ Could not connect to DB', err);
    console.log('✅ Connected to SQLite database.');
});

// Create a table if not exists
db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)`);
=======
const db = new sqlite3.Database(path.resolve(__dirname, 'data.db'), (err) => {
  if (err) return console.error('❌ Failed to connect DB:', err.message);
  console.log('✅ Connected to SQLite DB');
});

db.run(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL
  )
`);
>>>>>>> 9fceaca3816539639630f97fc02dc6a7e9e60239

module.exports = db;
