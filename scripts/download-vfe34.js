const fs = require('fs');
const https = require('https');
const path = require('path');

const content = fs.readFileSync('C:\\Users\\legot\\.gemini\\antigravity-ide\\brain\\b5e61827-4c28-41c7-95c9-31ceb155a6d1\\.system_generated\\steps\\277\\content.md', 'utf8');
const matches = [...new Set(content.match(/https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/[^\s\"\'\<\>\)]+\.(?:jpg|png)/gi) || [])];
console.log('Matches:', matches.slice(0, 10));

const vfe34Thumb = matches.find(m => /VF_e34/i.test(m) && /thumb/i.test(m)) || matches[0];
console.log('Selected VF e34:', vfe34Thumb);

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const fullDest = path.resolve(__dirname, '..', destPath);
    const dir = path.dirname(fullDest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(fullDest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded ${url} -> ${destPath}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(fullDest, () => {});
      reject(err);
    });
  });
}

if (vfe34Thumb) {
  downloadFile(vfe34Thumb, 'public/images/vehicles/vfe34-1.jpg').then(() => {
    fs.copyFileSync(
      path.resolve(__dirname, '../public/images/vehicles/vfe34-1.jpg'),
      path.resolve(__dirname, '../public/images/vehicles/vfe34-2.png')
    );
    console.log('VF e34 images created!');
  });
}
