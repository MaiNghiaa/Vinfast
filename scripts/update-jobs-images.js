const fs = require('fs');
const path = require('path');

const jobsFilePath = path.join(__dirname, '../data/jobs.ts');
let content = fs.readFileSync(jobsFilePath, 'utf8');

const phuongDongImages = [
  '/images/about/pd-showroom-1.jpg',
  '/images/about/pd-showroom-2.jpg',
  '/images/about/pd-showroom-3.jpg',
  '/images/about/pd-delivery-1.jpg',
  '/images/about/pd-delivery-2.jpg',
  '/images/about/pd-delivery-3.jpg',
  '/images/about/pd-delivery-4.jpg',
  '/images/about/pd-delivery-5.jpg',
  '/images/banners/banner-he-thong-phuong-dong.jpg',
  '/images/banners/banner-lai-thu-phuong-dong.jpg',
];

let index = 0;
content = content.replace(/image:\s*["']https:\/\/vinfastthinhcuong\.com\.vn[^"']+["']/g, (match) => {
  const chosen = phuongDongImages[index % phuongDongImages.length];
  index++;
  return `image: "${chosen}"`;
});

// Also replace any text mentions of "VinFast Thịnh Cường" or "Thịnh Cường" in job descriptions
content = content.replace(/VinFast Thịnh Cường/g, 'VinFast Phương Đông');
content = content.replace(/Tập đoàn Thịnh Cường/g, 'VinFast Phương Đông');
content = content.replace(/Thịnh Cường/g, 'Phương Đông');
content = content.replace(/chuỗi 9 showroom và 14 xưởng/g, 'hệ thống 4 showroom và 3 xưởng');
content = content.replace(/chuỗi 9 showroom/g, 'hệ thống 4 showroom');

fs.writeFileSync(jobsFilePath, content, 'utf8');
console.log(`Replaced ${index} job images with authentic VinFast Phương Đông assets!`);
