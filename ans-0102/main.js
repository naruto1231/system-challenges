const fs = require('fs');
const { URL } = require('url');

// ファイルパス取得
const filePath = process.argv[2];

if (!filePath) {
  console.error('ファイルパスを指定してください');
  process.exit(1);
}

// ファイル読み込み
const text = fs.readFileSync(filePath, 'utf-8');

// URL抽出用 正規表現
const regex = /['"](https?:\/\/[^'"]+)['"]/g;

// origin ごとのURL格納用
const originMap = new Map();

let match;
while ((match = regex.exec(text)) !== null) {
  const urlStr = match[1];

  const parsed = new URL(urlStr);
  const origin = `${parsed.protocol}//${parsed.host}`;

  if (!originMap.has(origin)) {
    originMap.set(origin, new Set());
  }

  originMap.get(origin).add(urlStr);
}

// origin をアルファベット順で処理
Array.from(originMap.keys())
  .sort()
  .forEach(origin => {
    const urls = Array.from(originMap.get(origin)).sort();

    console.log(`origin=${origin} total=${urls.length}`);
    urls.forEach(u => console.log(u));
    console.log(); // 空行
  });
