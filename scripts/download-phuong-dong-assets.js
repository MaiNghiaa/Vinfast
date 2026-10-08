const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2026/01/ec-van.jpg',
    dest: 'public/images/vehicles/ec-van-1.jpg'
  },
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2026/01/ec-van-768x432.jpg',
    dest: 'public/images/vehicles/ec-van-2.png'
  },
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2026/01/vinfast-vf-mpv7-260130-c06.jpg',
    dest: 'public/images/vehicles/epv7-1.jpg'
  },
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2026/01/limo.jpg',
    dest: 'public/images/vehicles/epv7-2.png'
  },
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2022/09/vinfast-h-240725-01b.jpg',
    dest: 'public/images/showrooms/thuong-tin-main.jpg'
  },
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2025/08/z6905258181423_67f1166d477bceb68039c7c2ae014e45.jpg',
    dest: 'public/images/banners/vinfast-thuong-tin-delivery.jpg'
  },
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2026/09/vinfast-wild-banner-pc260919.jpg',
    dest: 'public/images/banners/vinfast-phuong-dong-banner-1.jpg'
  },
  {
    url: 'https://vinfastthuongtin.net/wp-content/uploads/2026/07/banner-pc260708-01.jpg',
    dest: 'public/images/banners/vinfast-phuong-dong-banner-2.jpg'
  }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const fullDest = path.resolve(__dirname, '..', destPath);
    const dir = path.dirname(fullDest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(fullDest);
    https.get(url, (response) => {
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

async function run() {
  for (const item of downloads) {
    try {
      await downloadFile(item.url, item.dest);
    } catch (e) {
      console.error(`Error downloading ${item.url}:`, e.message);
    }
  }
}

run();
