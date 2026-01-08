const fs = require('fs');

const filePath = process.argv[2];

if (!filePath) {
  console.error('ファイルパスを指定してください');
  process.exit(1);
}

const text = fs.readFileSync(filePath, 'utf-8');

const regex = /['"](https?:\/\/[^'"]+)['"]/g;

const urls = new Set();
let match;

while ((match = regex.exec(text)) !== null) {
  urls.add(match[1]);
}

Array.from(urls)
  .sort()
  .forEach(url => console.log(url));
