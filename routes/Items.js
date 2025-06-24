const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all items
router.get('/', (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST create new item
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    db.run('INSERT INTO items(name) VALUES(?)', [name], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, name });
    });
});

// PUT update item
router.put('/:id', (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    db.run('UPDATE items SET name = ? WHERE id = ?', [name, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, name });
    });
});

// DELETE item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Item deleted' });
    });
});

module.exports = router;