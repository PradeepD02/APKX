const sqlite3 = require('sqlite3').verbose();
const path = require('path');

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

module.exports = db;
