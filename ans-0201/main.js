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
      throw new Error();
    }

    const sql = 'INSERT INTO users (name, age, password) VALUES (?, ?, ?)';
    db.run(sql, [name, age, password], err => {
      if (err) {
        console.error('ユーザーの追加に失敗しました。');
        return;
      }
      console.log('ユーザーの追加に成功しました。');
    });

  } else if (command === 'delete-user') {
    const id = parseInt(process.argv[3], 10);

    if (isNaN(id)) {
      throw new Error();
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
    throw new Error();
  }

} catch (e) {
  console.error('処理に失敗しました。');
} finally {
  db.close();
}
