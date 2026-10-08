const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '../public/images/news');
const VEHICLES_DIR = path.join(__dirname, '../public/images/vehicles');
const BANNERS_DIR = path.join(__dirname, '../public/images/banners');

async function createCard({
  outputFile,
  titleTop,
  titleMain,
  subtitle,
  badgeText = 'VINFAST PHƯƠNG ĐÔNG',
  highlightBadge = 'CHÍNH HÃNG 3S',
  accentColor = '#1863dc',
  bgGradient = ['#0f172a', '#1e293b'],
  carImagePath,
  carResize = { width: 560, height: 360 },
  carPosition = { left: 440, top: 120 },
  isPhotoCard = false,
}) {
  const width = 1024;
  const height = 576;

  // 1. Background SVG
  const bgSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}" />
        <stop offset="60%" stop-color="${bgGradient[1]}" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <radialGradient id="lightGlow" cx="72%" cy="48%" r="48%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.45" />
        <stop offset="70%" stop-color="${bgGradient[1]}" stop-opacity="0.1" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#lightGlow)" />

    <!-- Grid / Tech Lines -->
    <g opacity="0.08" stroke="#ffffff" stroke-width="1">
      <line x1="0" y1="144" x2="${width}" y2="144" />
      <line x1="0" y1="288" x2="${width}" y2="288" />
      <line x1="0" y1="432" x2="${width}" y2="432" />
      <line x1="256" y1="0" x2="256" y2="${height}" />
      <line x1="512" y1="0" x2="512" y2="${height}" />
      <line x1="768" y1="0" x2="768" y2="${height}" />
    </g>

    <!-- Floor Shadow Horizon for car -->
    <ellipse cx="720" cy="460" rx="270" ry="24" fill="#000000" opacity="0.6" />
  </svg>
  `;

  // 2. Foreground / Text SVG (Transparent background)
  const fgSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="${accentColor}" />
        <stop offset="100%" stop-color="#38bdf8" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.8"/>
      </filter>
    </defs>

    <!-- Brand Header Badge -->
    <g transform="translate(60, 48)">
      <path d="M0,4 L12,18 L24,4 L19,4 L12,12 L5,4 Z" fill="#ffffff" />
      <path d="M12,12 L12,24 L10,24 L10,14 Z" fill="#38bdf8" />
      <text x="32" y="16" fill="#ffffff" font-family="'Be Vietnam Pro', sans-serif" font-size="16" font-weight="900" letter-spacing="2">
        ${badgeText}
      </text>
      <rect x="0" y="28" width="220" height="2" fill="url(#accentGrad)" />
    </g>

    <!-- Category Pill Tag -->
    <g transform="translate(60, 115)">
      <rect x="0" y="0" width="170" height="28" rx="14" fill="${accentColor}" opacity="0.35" stroke="${accentColor}" stroke-width="1.5" />
      <text x="85" y="18" fill="#ffffff" font-family="'Be Vietnam Pro', sans-serif" font-size="11" font-weight="800" text-anchor="middle" letter-spacing="1">
        ${highlightBadge}
      </text>
    </g>

    <!-- Main Headings -->
    <text x="60" y="195" fill="#94a3b8" font-family="'Be Vietnam Pro', sans-serif" font-size="17" font-weight="700" letter-spacing="1">
      ${titleTop}
    </text>

    <text x="60" y="248" fill="#ffffff" font-family="'Be Vietnam Pro', sans-serif" font-size="31" font-weight="900" filter="url(#shadow)">
      ${titleMain}
    </text>

    <text x="60" y="295" fill="#e2e8f0" font-family="'Be Vietnam Pro', sans-serif" font-size="15" font-weight="500" opacity="0.9" filter="url(#shadow)">
      ${subtitle}
    </text>

    <!-- Bottom Feature Points / CTA -->
    <g transform="translate(60, 470)">
      <rect x="0" y="0" width="210" height="44" rx="8" fill="url(#accentGrad)" filter="url(#shadow)" />
      <text x="105" y="27" fill="#ffffff" font-family="'Be Vietnam Pro', sans-serif" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="0.5">
        KHÁM PHÁ NGAY →
      </text>
    </g>

    <!-- Hotline in corner -->
    <g transform="translate(60, 538)">
      <text x="0" y="0" fill="#94a3b8" font-family="'Be Vietnam Pro', sans-serif" font-size="12" font-weight="600">
        Hotline VinFast Phương Đông: <tspan fill="#38bdf8" font-weight="800">090 242 25 22</tspan>
      </text>
    </g>
  </svg>
  `;

  // Composite order: Background -> Car -> Foreground Text
  const composites = [];

  if (carImagePath && fs.existsSync(carImagePath)) {
    let carProcessor = sharp(carImagePath).resize({
      width: carResize.width,
      height: carResize.height,
      fit: isPhotoCard ? 'cover' : 'inside',
    });

    if (isPhotoCard) {
      // Rounded card frame with border
      const roundedCornerMask = Buffer.from(
        `<svg width="${carResize.width}" height="${carResize.height}"><rect x="0" y="0" width="${carResize.width}" height="${carResize.height}" rx="16" ry="16" fill="#fff"/></svg>`
      );
      const carBuf = await carProcessor
        .composite([{ input: roundedCornerMask, blend: 'dest-in' }])
        .png()
        .toBuffer();

      composites.push({
        input: carBuf,
        top: carPosition.top,
        left: carPosition.left,
      });
    } else {
      const carBuf = await carProcessor.toBuffer();
      composites.push({
        input: carBuf,
        top: carPosition.top,
        left: carPosition.left,
      });
    }
  }

  composites.push({
    input: Buffer.from(fgSvg),
    top: 0,
    left: 0,
  });

  const baseBg = await sharp(Buffer.from(bgSvg)).png().toBuffer();
  await sharp(baseBg).composite(composites).png().toFile(outputFile);
  console.log(`Generated: ${outputFile}`);
}

async function main() {
  console.log('Generating News Mockup Cards for VinFast Phương Đông...');

  // 1. ADAS TRÊN VF 8 ALL NEW
  await createCard({
    outputFile: path.join(OUTPUT_DIR, 'adas-vf8-all-new.png'),
    badgeText: 'VINFAST PHƯƠNG ĐÔNG',
    highlightBadge: 'CÔNG NGHỆ THÔNG MINH',
    titleTop: 'HỆ THỐNG TRỢ LÁI CẤP ĐỘ 2',
    titleMain: 'ADAS TRÊN VF 8 ALL NEW',
    subtitle: 'Trợ lái trên cao tốc • Phanh khẩn cấp • Cảnh báo điểm mù',
    accentColor: '#1863dc',
    bgGradient: ['#091326', '#142544'],
    carImagePath: path.join(VEHICLES_DIR, 'vf8-2.png'),
    carResize: { width: 560, height: 350 },
    carPosition: { left: 440, top: 130 },
  });

  // 2. CÓ 1 TỶ: MUA SUV XĂNG HAY VF8 ALL NEW?
  await createCard({
    outputFile: path.join(OUTPUT_DIR, 'co-1-ty-mua-vf8.png'),
    badgeText: 'VINFAST PHƯƠNG ĐÔNG',
    highlightBadge: 'BÀI TOÁN KINH TẾ',
    titleTop: 'TÀI CHÍNH 1 TỶ ĐỒNG',
    titleMain: 'CHỌN SUV XĂNG HAY VF 8?',
    subtitle: 'Miễn 100% trước bạ • Tiết kiệm 150 triệu nhiên liệu',
    accentColor: '#0284c7',
    bgGradient: ['#0c1a2d', '#132e4d'],
    carImagePath: path.join(VEHICLES_DIR, 'vf8-2.png'),
    carResize: { width: 540, height: 340 },
    carPosition: { left: 450, top: 135 },
  });

  // 3. VINFAST LIMO GREEN THÁNG 8
  await createCard({
    outputFile: path.join(OUTPUT_DIR, 'limo-green-thang-8.png'),
    badgeText: 'VINFAST PHƯƠNG ĐÔNG',
    highlightBadge: 'XE DỊCH VỤ 7 CHỖ',
    titleTop: 'ƯU ĐÃI ĐỘC QUYỀN THÁNG 8',
    titleMain: 'VINFAST LIMO GREEN',
    subtitle: 'Không gian rộng rãi • Siêu tiết kiệm chi phí vận hành',
    accentColor: '#059669',
    bgGradient: ['#062419', '#0d3b2b'],
    carImagePath: path.join(BANNERS_DIR, 'banner-phuong-dong-giai-phap-xanh.jpg'),
    carResize: { width: 500, height: 310 },
    carPosition: { left: 470, top: 140 },
    isPhotoCard: true,
  });

  // 4. VF MPV 7 THÁNG 8 GIÁ BAO NHIÊU?
  await createCard({
    outputFile: path.join(OUTPUT_DIR, 'vf-mpv7-thang-8.png'),
    badgeText: 'VINFAST PHƯƠNG ĐÔNG',
    highlightBadge: 'MPV GIA ĐÌNH THUẦN ĐIỆN',
    titleTop: 'BẢNG GIÁ &amp; CHÍNH SÁCH MỚI NHẤT',
    titleMain: 'VINFAST VF MPV 7',
    subtitle: '7 chỗ đẳng cấp • Trả góp lãi suất thấp • Giao xe sớm',
    accentColor: '#2563eb',
    bgGradient: ['#0a1836', '#142a5a'],
    carImagePath: path.join(BANNERS_DIR, 'banner-phuong-dong-vf-mpv7.jpg'),
    carResize: { width: 500, height: 310 },
    carPosition: { left: 470, top: 140 },
    isPhotoCard: true,
  });

  // 5. TÀI CHÍNH 500-600 TRIỆU: LIMO GREEN HAY VF MPV 7
  await createCard({
    outputFile: path.join(OUTPUT_DIR, 'tai-chinh-500-600-trieu.png'),
    badgeText: 'VINFAST PHƯƠNG ĐÔNG',
    highlightBadge: 'TƯ VẤN CHỌN XE',
    titleTop: 'NGÂN SÁCH 500 – 600 TRIỆU',
    titleMain: 'LIMO GREEN HAY VF MPV 7?',
    subtitle: 'So sánh chi tiết thông số, hiệu quả khai thác &amp; tiện nghi',
    accentColor: '#7c3aed',
    bgGradient: ['#160e33', '#2a1a59'],
    carImagePath: path.join(BANNERS_DIR, 'banner-phuong-dong-len-doi-xe.jpg'),
    carResize: { width: 500, height: 310 },
    carPosition: { left: 470, top: 140 },
    isPhotoCard: true,
  });

  console.log('All 5 cards regenerated successfully with crisp VinFast Phương Đông branding!');
}

main().catch(console.error);
