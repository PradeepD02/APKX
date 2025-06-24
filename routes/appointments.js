const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM appointments', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) return res.status(400).json({ error: 'All fields required' });

  db.run('INSERT INTO appointments(name, date, time) VALUES (?, ?, ?)', [name, date, time], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name, date, time });
  });
});

router.put('/:id', (req, res) => {
  const { name, date, time } = req.body;
  db.run('UPDATE appointments SET name = ?, date = ?, time = ? WHERE id = ?', [name, date, time, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment updated' });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM appointments WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Appointment deleted' });
  });
});

module.exports = router;
