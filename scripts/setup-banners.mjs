// scripts/setup-banners.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { directusJson, directusFetch, ensureFolder, DIRECTUS_URL, getAuthToken } from './directus-client.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bannersDir = path.join(__dirname, '../public/images/banners');

async function uploadLocalFile(filePath, folderName = 'banners', title = '') {
  if (!fs.existsSync(filePath)) return null;

  const filename = path.basename(filePath);
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filename).toLowerCase();
  const contentType = ext === '.png' ? 'image/png' : (ext === '.webp' ? 'image/webp' : 'image/jpeg');

  // Check if file already uploaded by filename search
  const existing = await directusJson(`/files?filter[filename_download][_eq]=${encodeURIComponent(filename)}`);
  if (existing.data && existing.data.length > 0) {
    console.log(`- File '${filename}' already exists in Directus (ID: ${existing.data[0].id})`);
    return existing.data[0].id;
  }

  const folderId = folderName ? await ensureFolder(folderName) : null;
  const formData = new FormData();
  const blob = new Blob([buffer], { type: contentType });
  formData.append('file', blob, filename);
  if (folderId) formData.append('folder', folderId);
  if (title) formData.append('title', title);

  const token = await getAuthToken();
  const res = await fetch(`${DIRECTUS_URL}/files`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    console.warn(`Failed to upload ${filename}: ${err}`);
    return null;
  }

  const data = await res.json();
  console.log(`+ Uploaded '${filename}' -> ID: ${data.data.id}`);
  return data.data.id;
}

async function createBannersCollection() {
  console.log('\n--- 1. TẠO HOẶC KIỂM TRA COLLECTION BANNERS ---');
  try {
    const existing = await directusJson('/collections/banners');
    if (existing.data) {
      console.log("- Collection 'banners' đã tồn tại.");
      return;
    }
  } catch (e) {
    // Doesn't exist, create it
  }

  console.log("+ Tạo collection 'banners' với database table schema...");
  await directusJson('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection: 'banners',
      meta: {dir
        note: 'Banner trang chủ và banner khuyến mại/dịch vụ',
        icon: 'view_carousel',
      },
      schema: {
        name: 'banners',
      },
      fields: [
        {
          field: 'id',
          type: 'integer',
          meta: { hidden: true },
          schema: { is_primary_key: true, has_auto_increment: true },
        },
      ],
    }),
  });

  // Tạo các fields
  const fields = [
    {
      field: 'title',
      type: 'string',
      meta: { interface: 'input', width: 'full', required: true },
      schema: { is_nullable: false },
    },
    {
      field: 'subtitle',
      type: 'string',
      meta: { interface: 'input', width: 'full' },
      schema: { is_nullable: true },
    },
    {
      field: 'type',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Hero Slider Trang Chủ', value: 'hero' },
            { text: 'Promo Card Khuyến Mại', value: 'promo' },
            { text: 'Service Banner', value: 'service' },
          ],
        },
        width: 'half',
      },
      schema: { default_value: 'hero' },
    },
    {
      field: 'image',
      type: 'uuid',
      meta: { interface: 'file-image', width: 'half', required: true },
      schema: { is_nullable: true },
    },
    {
      field: 'link',
      type: 'string',
      meta: { interface: 'input', width: 'half' },
      schema: { is_nullable: true },
    },
    {
      field: 'badge',
      type: 'string',
      meta: { interface: 'input', width: 'half' },
      schema: { is_nullable: true },
    },
    {
      field: 'status',
      type: 'string',
      meta: {
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'Published', value: 'published' },
            { text: 'Draft', value: 'draft' },
          ],
        },
        width: 'half',
      },
      schema: { default_value: 'published' },
    },
    {
      field: 'sort',
      type: 'integer',
      meta: { interface: 'input', width: 'half' },
      schema: { default_value: 0 },
    },
  ];

  for (const f of fields) {
    try {
      await directusJson('/fields/banners', {
        method: 'POST',
        body: JSON.stringify(f),
      });
      console.log(`+ Added field '${f.field}' to 'banners'`);
    } catch (err) {
      console.warn(`Field '${f.field}' existed or warning: ${err.message}`);
    }
  }

  // Tạo relationship cho image -> directus_files
  try {
    await directusJson('/relations', {
      method: 'POST',
      body: JSON.stringify({
        collection: 'banners',
        field: 'image',
        related_collection: 'directus_files',
        schema: {
          table: 'banners',
          column: 'image',
          foreign_key_table: 'directus_files',
          foreign_key_column: 'id',
          on_delete: 'SET NULL',
        },
      }),
    });
    console.log("+ Created relation: banners.image -> directus_files.id");
  } catch (err) {
    console.warn("Relation banners.image notice:", err.message);
  }

  console.log("✔ Đã tạo collection 'banners' và các fields thành công.");
}

async function grantPermissions() {
  console.log('\n--- 2. CẤP QUYỀN PUBLIC CHO BANNERS ---');
  const allPolicies = await directusJson('/policies');
  const pub = allPolicies.data?.find((p) => p.name?.includes('public') || p.name?.includes('Public'));
  if (!pub) {
    console.warn('Không tìm thấy Public policy.');
    return;
  }

  const existingPerms = await directusJson(`/permissions?filter[policy][_eq]=${pub.id}&filter[collection][_eq]=banners`);
  if (existingPerms.data && existingPerms.data.length > 0) {
    console.log("- Đã có quyền Public read cho 'banners'.");
    return;
  }

  await directusJson('/permissions', {
    method: 'POST',
    body: JSON.stringify({
      policy: pub.id,
      collection: 'banners',
      action: 'read',
      fields: ['*'],
      permissions: { status: { _eq: 'published' } },
    }),
  });
  console.log("✔ Đã cấp quyền Public read cho 'banners'.");
}

async function seedBanners() {
  console.log('\n--- 3. UPLOAD VÀ SEED DỮ LIỆU BANNERS ---');

  const bannerDefinitions = [
    {
      file: 'lich-lai-thu-vinfast-thinh-cuong-thang-9-2026.jpg',
      title: 'Lịch lái thử VinFast Phương Đông tháng 9/2026',
      subtitle: 'Thứ 7 hạnh phúc - Trải nghiệm các dòng xe điện thông minh',
      type: 'hero',
      link: '/contact',
      badge: 'Lái Thử',
      sort: 1,
    },
    {
      file: 'banner-wweb.jpg',
      title: 'VinFast Phương Đông - Đại Lý Số 1 Miền Bắc',
      subtitle: 'Hệ thống phân phối xe ô tô điện VinFast chính hãng',
      type: 'hero',
      link: '/xe-moi',
      badge: 'Chính Hãng',
      sort: 2,
    },
    {
      file: 'vinfast-uu-dai-tien-phong-xang.jpg',
      title: 'VinFast Ưu Đãi Tiên Phong Chuyển Đổi Xanh',
      subtitle: 'Hỗ trợ đổi xe xăng sang xe điện lên đến 80 triệu đồng',
      type: 'hero',
      link: '/tin-tuc',
      badge: 'Ưu Đãi Lớn',
      sort: 3,
    },
    {
      file: 'vinh-danh-vinfast-thinh-cuong.jpg',
      title: 'Vinh danh VinFast Phương Đông Club 1000',
      subtitle: 'Top đại lý xuất sắc toàn quốc',
      type: 'hero',
      link: '/gioi-thieu',
      badge: 'Vinh Danh',
      sort: 4,
    },
    {
      file: 'vinfast-thinhcuong-3.jpg',
      title: 'Showroom VinFast Phương Đông Chuẩn 3S',
      subtitle: 'Trải nghiệm dịch vụ 5 sao và không gian hiện đại',
      type: 'hero',
      link: '/contact',
      badge: 'Showroom',
      sort: 5,
    },
    {
      file: 'vinfast-thinh-cuong-banner-1-scaled.jpg',
      title: 'Bứt Phá Mọi Giới Hạn Cùng VinFast',
      subtitle: 'Công nghệ thông minh - Tương lai xanh bền vững',
      type: 'hero',
      link: '/xe-moi',
      badge: 'VinFast',
      sort: 6,
    },
    {
      file: 'banner-khuyen-mai.jpg',
      title: 'Chương Trình Khuyến Mại Tháng Này',
      subtitle: 'Ưu đãi quà tặng và bảo hiểm thân vỏ chính hãng',
      type: 'promo',
      link: '/tin-tuc',
      badge: 'Khuyến Mại',
      sort: 7,
    },
    {
      file: 'banner-dich-vu.jpg',
      title: 'Xưởng Dịch Vụ & Bảo Dưỡng 3S Chính Hãng',
      subtitle: 'Đội ngũ kỹ thuật viên tay nghề cao và phụ tùng chính hãng',
      type: 'service',
      link: '/dich-vu',
      badge: 'Dịch Vụ',
      sort: 8,
    },
  ];

  for (const b of bannerDefinitions) {
    const filePath = path.join(bannersDir, b.file);
    let imageId = null;
    if (fs.existsSync(filePath)) {
      imageId = await uploadLocalFile(filePath, 'banners', b.title);
    }

    if (!imageId) {
      console.warn(`Không tìm thấy file ảnh cho ${b.title}, bỏ qua.`);
      continue;
    }

    // Check if banner already exists
    const existing = await directusJson(`/items/banners?filter[title][_eq]=${encodeURIComponent(b.title)}`);
    if (existing.data && existing.data.length > 0) {
      console.log(`- Banner '${b.title}' đã tồn tại, cập nhật ảnh.`);
      await directusJson(`/items/banners/${existing.data[0].id}`, {
        method: 'PATCH',
        body: JSON.stringify({ image: imageId, sort: b.sort, type: b.type, link: b.link }),
      });
    } else {
      console.log(`+ Tạo banner record: '${b.title}'`);
      await directusJson('/items/banners', {
        method: 'POST',
        body: JSON.stringify({
          title: b.title,
          subtitle: b.subtitle,
          type: b.type,
          image: imageId,
          link: b.link,
          badge: b.badge,
          sort: b.sort,
          status: 'published',
        }),
      });
    }
  }
}

async function run() {
  await createBannersCollection();
  await grantPermissions();
  await seedBanners();
  console.log('\n Hoàn tất cài đặt Banners trong Directus!');
}

run().catch((e) => {
  console.error('Lỗi thiết lập banners:', e);
  process.exit(1);
});
