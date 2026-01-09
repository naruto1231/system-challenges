const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'app.db'));

app.use(express.json());

/* ===== DB 初期化（ここだけ） ===== */
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS addresses (
      zip_code TEXT,
      pref TEXT,
      city TEXT,
      section TEXT
    )
  `);

  db.run(`
    INSERT INTO addresses (zip_code, pref, city, section)
    SELECT '1000001','東京都','千代田区','千代田'
    WHERE NOT EXISTS (
      SELECT 1 FROM addresses WHERE zip_code='1000001'
    )
  `);

  db.all(
    "SELECT name FROM sqlite_master WHERE type='table'",
    (err, rows) => console.log('tables:', rows)
  );
});
/* ===== ここまで ===== */

/**
 * 郵便番号 → 住所
 */
app.get('/search/address', (req, res) => {
  const { zip_code } = req.query;
  if (!zip_code) {
    return res.status(400).json({ error: 'zip_code is required' });
  }

  db.get(
    `SELECT zip_code, pref, city, section FROM addresses WHERE zip_code = ?`,
    [zip_code],
    (err, row) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (!row) return res.status(404).json({ error: 'Not found' });
      res.json(row);
    }
  );
});

/**
 * 住所 → 郵便番号
 */
app.get('/search/zip', (req, res) => {
  const { pref, city } = req.query;
  if (!pref || !city) {
    return res.status(400).json({ error: 'pref and city are required' });
  }

  db.all(
    `SELECT zip_code, pref, city, section FROM addresses
     WHERE pref = ? AND city = ? ORDER BY zip_code`,
    [pref, city],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
