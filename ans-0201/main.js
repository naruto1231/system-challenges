const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// DBパス
const dbPath = path.join(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath);

// コマンド取得
const command = process.argv[2];

try {
  if (command === 'list-users') {
    // ユーザー一覧表示
    db.all('SELECT * FROM users ORDER BY id ASC', (err, rows) => {
      if (err) {
        console.error('ユーザーの一覧表示に失敗しました。');
        return;
      }

      rows.forEach(row => {
        const masked = '*'.repeat(row.password.length);
        console.log(`${row.id} ${row.name} ${row.age} ${masked}`);
      });

      console.log('ユーザーの一覧表示に成功しました。');
    });

  } else if (command === 'add-user') {
    const name = process.argv[3];
    const age = parseInt(process.argv[4], 10);
    const password = process.argv[5];

    if (!name || isNaN(age) || !password) {
      console.error('ユーザーの追加に失敗しました。');
      process.exit(1);
    }

    // MAX(id) + 1 を取得して明示的に ID をセット
    db.get('SELECT MAX(id) as maxId FROM users', (err, row) => {
      if (err) {
        console.error('ユーザーの追加に失敗しました。');
        return;
      }

      const nextId = (row.maxId || 0) + 1;
      const sql = 'INSERT INTO users (id, name, age, password) VALUES (?, ?, ?, ?)';
      db.run(sql, [nextId, name, age, password], err => {
        if (err) {
          console.error('ユーザーの追加に失敗しました。');
          return;
        }
        console.log('ユーザーの追加に成功しました。');
      });
    });

  } else if (command === 'delete-user') {
    const id = parseInt(process.argv[3], 10);

    if (isNaN(id)) {
      console.error('ユーザーの削除に失敗しました。');
      process.exit(1);
    }

    const sql = 'DELETE FROM users WHERE id = ?';
    db.run(sql, [id], function (err) {
      if (err || this.changes === 0) {
        console.error('ユーザーの削除に失敗しました。');
        return;
      }
      console.log('ユーザーの削除に成功しました。');
    });

  } else {
    console.error('処理に失敗しました。');
  }

} catch (e) {
  console.error('処理に失敗しました。');
} finally {
  db.close();
}
