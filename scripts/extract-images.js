const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\legot\\.gemini\\antigravity-ide\\brain\\b5e61827-4c28-41c7-95c9-31ceb155a6d1\\.system_generated\\steps\\225\\content.md', 'utf8');
const matches = [...new Set(content.match(/https:\/\/vinfastthuongtin\.net\/wp-content\/uploads\/[^\s\"\'\<\>\)]+/g) || [])];

console.log('--- ALL UNIQUE IMAGES ---');
matches.forEach(m => console.log(m));
