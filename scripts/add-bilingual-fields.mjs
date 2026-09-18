// scripts/add-bilingual-fields.mjs
import { directusJson } from './directus-client.mjs';

const fieldsCache = {};

async function fieldExists(collection, field) {
  if (!fieldsCache[collection]) {
    try {
      const res = await directusJson(`/fields/${collection}`);
      fieldsCache[collection] = new Set(res.data.map((f) => f.field));
    } catch {
      fieldsCache[collection] = new Set();
    }
  }
  return fieldsCache[collection].has(field);
}

async function addStringField(collection, field, { note = '' } = {}) {
  if (await fieldExists(collection, field)) return;
  console.log(`+ Adding field ${collection}.${field}`);
  await directusJson(`/fields/${collection}`, {
    method: 'POST',
    body: JSON.stringify({
      field,
      type: 'string',
      meta: { interface: 'input', note },
      schema: { is_nullable: true },
    }),
  });
}

async function addTextField(collection, field, { note = '' } = {}) {
  if (await fieldExists(collection, field)) return;
  console.log(`+ Adding field ${collection}.${field}`);
  await directusJson(`/fields/${collection}`, {
    method: 'POST',
    body: JSON.stringify({
      field,
      type: 'text',
      meta: { interface: 'input-multiline', note },
      schema: { is_nullable: true },
    }),
  });
}

async function addJsonField(collection, field, { note = '' } = {}) {
  if (await fieldExists(collection, field)) return;
  console.log(`+ Adding field ${collection}.${field}`);
  await directusJson(`/fields/${collection}`, {
    method: 'POST',
    body: JSON.stringify({
      field,
      type: 'json',
      meta: { interface: 'input-code', special: ['json'], note },
      schema: { is_nullable: true },
    }),
  });
}

export async function setupBilingualFields() {
  console.log('--- BỔ SUNG TRƯỜNG SONG NGỮ (VI / EN) VÀO SCHEMA ---');

  // 1. site_settings
  await addStringField('site_settings', 'company_name_en', { note: 'Tên công ty tiếng Anh' });
  await addTextField('site_settings', 'hq_address_en', { note: 'Địa chỉ trụ sở tiếng Anh' });
  await addTextField('site_settings', 'consent_text_en', { note: 'Nội dung điều khoản đồng ý tiếng Anh' });

  // 2. showrooms
  await addStringField('showrooms', 'name_en', { note: 'Tên showroom tiếng Anh' });
  await addTextField('showrooms', 'address_en', { note: 'Địa chỉ tiếng Anh' });

  // 3. vehicles
  await addStringField('vehicles', 'tagline_en', { note: 'Tagline tiếng Anh' });
  await addStringField('vehicles', 'badge_en', { note: 'Badge tiếng Anh' });
  await addStringField('vehicles', 'exterior_subtitle_en', { note: 'Phụ đề ngoại thất tiếng Anh' });
  await addJsonField('vehicles', 'exterior_intro_en', { note: 'Mô tả ngoại thất tiếng Anh' });
  await addStringField('vehicles', 'interior_subtitle_en', { note: 'Phụ đề nội thất tiếng Anh' });
  await addJsonField('vehicles', 'interior_intro_en', { note: 'Mô tả nội thất tiếng Anh' });
  await addStringField('vehicles', 'safety_title_en', { note: 'Tiêu đề an toàn tiếng Anh' });
  await addJsonField('vehicles', 'features_en', { note: 'Tính năng nổi bật tiếng Anh' });
  await addStringField('vehicles', 'seo_title_en', { note: 'SEO Title tiếng Anh' });
  await addTextField('vehicles', 'seo_description_en', { note: 'SEO Description tiếng Anh' });

  // 4. vehicle_sections
  await addStringField('vehicle_sections', 'title_en', { note: 'Tiêu đề khối tiếng Anh' });
  await addStringField('vehicle_sections', 'subtitle_en', { note: 'Phụ đề tiếng Anh' });
  await addTextField('vehicle_sections', 'description_en', { note: 'Mô tả tiếng Anh' });

  // 5. vehicle_colors
  await addStringField('vehicle_colors', 'name_en', { note: 'Tên màu tiếng Anh (Yellow, Crimson Red...)' });

  // 6. vehicle_trims
  await addJsonField('vehicle_trims', 'equipment_highlights_en', { note: 'Trang bị nổi bật tiếng Anh' });

  // 7. promotions
  await addStringField('promotions', 'title_en', { note: 'Tiêu đề ưu đãi tiếng Anh' });
  await addTextField('promotions', 'summary_en', { note: 'Tóm tắt ưu đãi tiếng Anh' });
  await addJsonField('promotions', 'benefits_en', { note: 'Cam kết / quyền lợi tiếng Anh' });
  await addTextField('promotions', 'content_en', { note: 'Nội dung tiếng Anh' });

  // 8. used_cars
  await addStringField('used_cars', 'title_en', { note: 'Tiêu đề xe cũ tiếng Anh' });
  await addStringField('used_cars', 'condition_en', { note: 'Tình trạng xe tiếng Anh' });
  await addStringField('used_cars', 'document_status_en', { note: 'Pháp lý tiếng Anh' });
  await addJsonField('used_cars', 'notes_en', { note: 'Ghi chú xe cũ tiếng Anh' });

  // 9. posts
  await addStringField('posts', 'title_en', { note: 'Tiêu đề bài viết tiếng Anh' });
  await addTextField('posts', 'excerpt_en', { note: 'Tóm tắt tiếng Anh' });
  await addTextField('posts', 'content_en', { note: 'Nội dung tiếng Anh' });

  // 10. chargers
  await addStringField('chargers', 'name_en', { note: 'Tên trạm sạc tiếng Anh' });
  await addTextField('chargers', 'description_en', { note: 'Mô tả trạm sạc tiếng Anh' });
  await addJsonField('chargers', 'features_en', { note: 'Tính năng tiếng Anh' });
  await addJsonField('chargers', 'quick_specs_en', { note: 'Thông số kỹ thuật nhanh tiếng Anh' });
  await addJsonField('chargers', 'pillars_en', { note: 'Trụ cột phân tích tiếng Anh' });

  // 11. jobs
  await addStringField('jobs', 'title_en', { note: 'Chức danh tuyển dụng tiếng Anh' });
  await addTextField('jobs', 'description_en', { note: 'Mô tả công việc tiếng Anh' });
  await addJsonField('jobs', 'responsibilities_en', { note: 'Trách nhiệm tiếng Anh' });
  await addJsonField('jobs', 'requirements_en', { note: 'Yêu cầu tiếng Anh' });
  await addJsonField('jobs', 'benefits_en', { note: 'Quyền lợi tiếng Anh' });

  // 12. services
  await addStringField('services', 'title_en', { note: 'Tên dịch vụ tiếng Anh' });
  await addTextField('services', 'summary_en', { note: 'Tóm tắt dịch vụ tiếng Anh' });
  await addTextField('services', 'content_en', { note: 'Nội dung dịch vụ tiếng Anh' });

  // 13. accessories
  await addStringField('accessories', 'name_en', { note: 'Tên phụ kiện tiếng Anh' });
  await addTextField('accessories', 'description_en', { note: 'Mô tả phụ kiện tiếng Anh' });

  console.log('--- HOÀN TẤT BỔ SUNG CÁC TRƯỜNG SONG NGỮ THÀNH CÔNG! ---');
}

if (process.argv[1].endsWith('add-bilingual-fields.mjs')) {
  setupBilingualFields().catch((err) => {
    console.error('Lỗi khi bổ sung trường song ngữ:', err);
    process.exit(1);
  });
}
