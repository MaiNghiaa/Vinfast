import fs from "fs";
import path from "path";
import sharp from "sharp";

const srcDir = "C:/Users/legot/.cursor/projects/c-Users-legot-OneDrive-Desktop-Vinfast/assets";
const destDir = path.resolve("public/images/news");

const cards = [
  ["uu-dai-chinh-hang-vinfast-phuong-dong.jpg", "ƯU ĐÃI CHÍNH HÃNG"],
  ["ho-tro-tai-chinh-va-phuong-an-pin.jpg", "HỖ TRỢ TÀI CHÍNH"],
  ["giao-xe-tan-noi-dang-ky-dang-kiem.jpg", "GIAO XE TẬN NƠI"],
  ["phu-tung-phu-kien-chinh-hang.jpg", "PHỤ TÙNG CHÍNH HÃNG"],
  ["bao-hanh-chinh-hang-7-nam.jpg", "BẢO HÀNH ĐẾN 7 NĂM"],
  ["giam-dinh-bao-hiem-tai-xuong.jpg", "GIÁM ĐỊNH BẢO HIỂM"],
  ["vinh-danh-tu-van-hoang-quoc-viet.jpg", "VINH DANH TƯ VẤN"],
  ["ky-thuat-vien-xuong-dich-vu-3s.jpg", "KỸ THUẬT VIÊN 3S"],
  ["tru-so-cong-ty-co-phan-phuong-dong.jpg", "TRỤ SỞ PHƯƠNG ĐÔNG"],
  ["tu-van-chon-xe-den-nhan-xe.jpg", "TƯ VẤN CHỌN XE"],
  ["doi-ngu-tu-van-bon-showroom.jpg", "ĐỘI NGŨ TƯ VẤN"],
  ["gio-phuc-vu-showroom-va-xuong.jpg", "GIỜ PHỤC VỤ"],
  ["xem-xe-cuoi-tuan-tai-showroom.jpg", "XEM XE CUỐI TUẦN"],
  ["tham-quan-xuong-dich-vu-3s.jpg", "THAM QUAN XƯỞNG 3S"],
  ["lich-lai-thu-vinfast-phuong-dong.jpg", "LỊCH LÁI THỬ"],
  ["trai-nghiem-xe-tai-bon-showroom-ha-noi.jpg", "TRẢI NGHIỆM XE"],
  ["lai-thu-cac-dong-xe-dien.jpg", "LÁI THỬ CÁC DÒNG XE"],
  ["le-ban-giao-xe-tai-showroom.jpg", "LỄ BÀN GIAO XE"],
];

function overlay(title) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1600" height="900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#07111f" stop-opacity="0"/>
      <stop offset="1" stop-color="#07111f" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect x="0" y="560" width="1600" height="340" fill="url(#g)"/>
  <text x="64" y="760" font-family="Segoe UI, Arial, sans-serif" font-size="54" font-weight="700" fill="#ffffff">${title}</text>
  <text x="64" y="830" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="700" fill="#7ec8ff">VINFAST PHƯƠNG ĐÔNG</text>
</svg>`;
  return Buffer.from(svg);
}

fs.mkdirSync(destDir, { recursive: true });

for (const [file, title] of cards) {
  const src = path.join(srcDir, file);
  if (!fs.existsSync(src)) throw new Error(`Missing ${src}`);
  const dest = path.join(destDir, file);
  await sharp(src)
    .resize(1600, 900, { fit: "cover" })
    .composite([{ input: overlay(title) }])
    .jpeg({ quality: 86 })
    .toFile(dest + ".tmp.jpg");
  if (fs.existsSync(dest)) fs.unlinkSync(dest);
  fs.renameSync(dest + ".tmp.jpg", dest);
  console.log(file);
}
