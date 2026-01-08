const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./app.db');

app.use(express.json());

/**
 * 郵便番号 → 住所検索
 * GET /search/address?zip_code=XXXXXXX
 */
app.get('/search/address', (req, res) => {
  const { zip_code } = req.query;

  if (!zip_code) {
    return res.status(400).json({ error: 'zip_code is required' });
  }

  db.get(
    `SELECT zip_code, pref, city, section
     FROM addresses
     WHERE zip_code = ?`,
    [zip_code],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'DB error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.json(row);
    }
  );
});

/**
 * 住所 → 郵便番号検索
 * GET /search/zip?pref=東京都&city=千代田区
 */
app.get('/search/zip', (req, res) => {
  const { pref, city } = req.query;

  if (!pref || !city) {
    return res.status(400).json({ error: 'pref and city are required' });
  }

  db.all(
    `SELECT zip_code, pref, city, section
     FROM addresses
     WHERE pref = ? AND city = ?
     ORDER BY zip_code`,
    [pref, city],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'DB error' });
      }
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
