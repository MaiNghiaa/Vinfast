// scripts/setup-schema.mjs
import { directusJson } from './directus-client.mjs';

let existingCollections = new Set();
let fieldsCache = {};
let existingRelations = new Set();

async function initCaches() {
  const colRes = await directusJson('/collections?limit=-1');
  existingCollections = new Set(colRes.data.map((c) => c.collection));

  const relRes = await directusJson('/relations?limit=-1');
  existingRelations = new Set(relRes.data.map((r) => `${r.collection}.${r.field}`));
}

async function collectionExists(name) {
  return existingCollections.has(name);
}

async function createCollection(collection, { singleton = false, note = '' } = {}) {
  if (existingCollections.has(collection)) {
    console.log(`- Collection '${collection}' already exists. Skipping.`);
    return;
  }
  console.log(`+ Creating collection '${collection}'...`);
  await directusJson('/collections', {
    method: 'POST',
    body: JSON.stringify({
      collection,
      meta: {
        collection,
        singleton,
        note,
      },
      schema: {
        name: collection,
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
  existingCollections.add(collection);
  fieldsCache[collection] = new Set(['id']);
}

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

async function createField(collection, fieldConfig) {
  if (await fieldExists(collection, fieldConfig.field)) {
    return;
  }
  await directusJson(`/fields/${collection}`, {
    method: 'POST',
    body: JSON.stringify(fieldConfig),
  });
  fieldsCache[collection].add(fieldConfig.field);
}

async function createStringField(collection, field, { unique = false, required = false, note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'string',
    meta: { interface: 'input', required, note },
    schema: { is_unique: unique, is_nullable: !required },
  });
}

async function createTextField(collection, field, { note = '', required = false } = {}) {
  await createField(collection, {
    field,
    type: 'text',
    meta: { interface: 'input-multiline', required, note },
    schema: { is_nullable: !required },
  });
}

async function createIntegerField(collection, field, { note = '', defaultValue = null } = {}) {
  await createField(collection, {
    field,
    type: 'integer',
    meta: { interface: 'input', note },
    schema: { default_value: defaultValue },
  });
}

async function createBigIntField(collection, field, { note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'bigInteger',
    meta: { interface: 'input', note },
    schema: {},
  });
}

async function createFloatField(collection, field, { note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'float',
    meta: { interface: 'input', note },
    schema: {},
  });
}

async function createBooleanField(collection, field, { defaultValue = false, note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'boolean',
    meta: { interface: 'boolean', note },
    schema: { default_value: defaultValue },
  });
}

async function createDateField(collection, field, { note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'date',
    meta: { interface: 'datetime', special: ['date'], note },
    schema: {},
  });
}

async function createDateTimeField(collection, field, { note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'dateTime',
    meta: { interface: 'datetime', note },
    schema: {},
  });
}

async function createJsonField(collection, field, { note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'json',
    meta: { interface: 'input-code', special: ['json'], note },
    schema: {},
  });
}

async function createDropdownField(collection, field, choices, { defaultValue = null, note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'string',
    meta: {
      interface: 'select-dropdown',
      options: {
        choices: choices.map((c) => (typeof c === 'string' ? { text: c, value: c } : c)),
      },
      note,
    },
    schema: { default_value: defaultValue },
  });
}

async function createRelationIfNotExists(relationConfig) {
  const key = `${relationConfig.collection}.${relationConfig.field}`;
  if (existingRelations.has(key)) {
    return;
  }
  try {
    await directusJson('/relations', {
      method: 'POST',
      body: JSON.stringify(relationConfig),
    });
    existingRelations.add(key);
  } catch (e) {
    console.warn(`Warning creating relation ${key}:`, e.message);
  }
}

async function createFileField(collection, field, { note = '' } = {}) {
  await createField(collection, {
    field,
    type: 'uuid',
    meta: { interface: 'file-image', special: ['file'], note },
    schema: {},
  });
  await createRelationIfNotExists({
    collection,
    field,
    related_collection: 'directus_files',
    schema: {
      table: collection,
      column: field,
      foreign_key_table: 'directus_files',
      foreign_key_column: 'id',
      on_delete: 'SET NULL',
    },
  });
}

async function createM2ORelation(collection, field, relatedCollection, { note = '', oneField = null } = {}) {
  await createField(collection, {
    field,
    type: 'integer',
    meta: { interface: 'select-dropdown-m2o', note },
    schema: {},
  });
  await createRelationIfNotExists({
    collection,
    field,
    related_collection: relatedCollection,
    schema: {
      table: collection,
      column: field,
      foreign_key_table: relatedCollection,
      foreign_key_column: 'id',
      on_delete: 'SET NULL',
    },
    meta: oneField ? {
      one_collection: relatedCollection,
      one_field: oneField,
      many_collection: collection,
      many_field: field,
    } : null,
  });
}

export async function setupAllCollections() {
  console.log('--- BẮT ĐẦU TẠO 22 COLLECTIONS DIRECTUS ---');
  await initCaches();

  // 1. site_settings (Singleton)
  await createCollection('site_settings', { singleton: true, note: 'Cấu hình chung website & đại lý' });
  await createStringField('site_settings', 'company_name', { required: true });
  await createTextField('site_settings', 'hq_address');
  await createStringField('site_settings', 'hotline', { required: true });
  await createStringField('site_settings', 'email');
  await createStringField('site_settings', 'sales_hours');
  await createStringField('site_settings', 'service_hours');
  await createTextField('site_settings', 'insurance_note');
  await createJsonField('site_settings', 'social_links');
  await createStringField('site_settings', 'default_seo_title');
  await createTextField('site_settings', 'default_seo_description');
  await createFileField('site_settings', 'default_og_image');
  await createTextField('site_settings', 'consent_text');

  // 2. showrooms
  await createCollection('showrooms', { note: 'Hệ thống showroom và xưởng dịch vụ' });
  await createStringField('showrooms', 'code', { unique: true });
  await createStringField('showrooms', 'slug', { unique: true, required: true });
  await createStringField('showrooms', 'name', { required: true });
  await createDropdownField('showrooms', 'type', ['3S', 'showroom', 'workshop'], { defaultValue: '3S' });
  await createStringField('showrooms', 'province', { required: true });
  await createTextField('showrooms', 'address', { required: true });
  await createStringField('showrooms', 'hotline_sales');
  await createStringField('showrooms', 'hotline_service');
  await createStringField('showrooms', 'hours_sales');
  await createStringField('showrooms', 'hours_service');
  await createStringField('showrooms', 'map_url');
  await createFloatField('showrooms', 'lat');
  await createFloatField('showrooms', 'lng');
  await createFileField('showrooms', 'image');
  await createDropdownField('showrooms', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('showrooms', 'sort', { defaultValue: 0 });

  // 3. vehicles
  await createCollection('vehicles', { note: 'Dòng xe mới VinFast' });
  await createStringField('vehicles', 'slug', { unique: true, required: true });
  await createStringField('vehicles', 'name', { required: true });
  await createDropdownField('vehicles', 'category', ['electric-car', 'green-mobility', 'commercial'], { defaultValue: 'electric-car' });
  await createStringField('vehicles', 'segment');
  await createStringField('vehicles', 'badge');
  await createStringField('vehicles', 'tagline');
  await createStringField('vehicles', 'watermark_text');
  await createFileField('vehicles', 'thumbnail');
  await createFileField('vehicles', 'banner_image');
  await createBooleanField('vehicles', 'is_featured', { defaultValue: false });
  // Specs
  await createIntegerField('vehicles', 'range_km');
  await createDropdownField('vehicles', 'range_standard', ['NEDC', 'WLTP'], { defaultValue: 'NEDC' });
  await createIntegerField('vehicles', 'fast_charge_minutes');
  await createStringField('vehicles', 'fast_charge_text');
  await createIntegerField('vehicles', 'power_hp');
  await createIntegerField('vehicles', 'seats');
  await createIntegerField('vehicles', 'length_mm');
  await createIntegerField('vehicles', 'width_mm');
  await createIntegerField('vehicles', 'height_mm');
  await createIntegerField('vehicles', 'wheelbase_mm');
  await createIntegerField('vehicles', 'ground_clearance_mm');
  await createFloatField('vehicles', 'battery_kwh');
  await createStringField('vehicles', 'battery_type');
  await createStringField('vehicles', 'gearbox');
  await createStringField('vehicles', 'engine_type');
  // Rich details
  await createStringField('vehicles', 'exterior_subtitle');
  await createJsonField('vehicles', 'exterior_intro');
  await createStringField('vehicles', 'interior_subtitle');
  await createJsonField('vehicles', 'interior_intro');
  await createStringField('vehicles', 'safety_title');
  await createStringField('vehicles', 'review_video_title');
  await createStringField('vehicles', 'review_video_url');
  await createFileField('vehicles', 'review_video_bg');
  await createJsonField('vehicles', 'features');
  await createJsonField('vehicles', 'comparison_table');
  await createJsonField('vehicles', 'additional_attributes');
  await createBooleanField('vehicles', 'share_to_sales', { defaultValue: true });
  await createDropdownField('vehicles', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('vehicles', 'sort', { defaultValue: 0 });
  await createStringField('vehicles', 'seo_title');
  await createTextField('vehicles', 'seo_description');
  await createFileField('vehicles', 'og_image');

  // 4. vehicle_trims
  await createCollection('vehicle_trims', { note: 'Phiên bản xe' });
  await createM2ORelation('vehicle_trims', 'vehicle', 'vehicles', { note: 'Thuộc dòng xe', oneField: 'trims' });
  await createStringField('vehicle_trims', 'name', { required: true });
  await createIntegerField('vehicle_trims', 'model_year', { defaultValue: 2026 });
  await createIntegerField('vehicle_trims', 'range_km');
  await createIntegerField('vehicle_trims', 'power_hp');
  await createIntegerField('vehicle_trims', 'torque_nm');
  await createStringField('vehicle_trims', 'acceleration_text');
  await createDropdownField('vehicle_trims', 'drive_type', ['FWD', 'RWD', 'AWD'], { defaultValue: 'FWD' });
  await createIntegerField('vehicle_trims', 'airbags', { defaultValue: 1 });
  await createBooleanField('vehicle_trims', 'has_adas', { defaultValue: false });
  await createJsonField('vehicle_trims', 'equipment_highlights');
  await createDropdownField('vehicle_trims', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('vehicle_trims', 'sort', { defaultValue: 0 });

  // 5. vehicle_colors
  await createCollection('vehicle_colors', { note: 'Màu sắc xe' });
  await createM2ORelation('vehicle_colors', 'vehicle', 'vehicles', { note: 'Thuộc dòng xe', oneField: 'colors' });
  await createStringField('vehicle_colors', 'name', { required: true });
  await createStringField('vehicle_colors', 'hex', { required: true });
  await createDropdownField('vehicle_colors', 'kind', ['exterior', 'interior'], { defaultValue: 'exterior' });
  await createFileField('vehicle_colors', 'image');
  await createBooleanField('vehicle_colors', 'is_premium', { defaultValue: false });
  await createIntegerField('vehicle_colors', 'sort', { defaultValue: 0 });

  // 6. vehicle_sections
  await createCollection('vehicle_sections', { note: 'Khối ngoại thất / nội thất / an toàn' });
  await createM2ORelation('vehicle_sections', 'vehicle', 'vehicles', { note: 'Thuộc dòng xe', oneField: 'sections' });
  await createDropdownField('vehicle_sections', 'section', ['exterior', 'interior', 'safety'], { defaultValue: 'exterior' });
  await createStringField('vehicle_sections', 'title', { required: true });
  await createStringField('vehicle_sections', 'subtitle');
  await createTextField('vehicle_sections', 'description');
  await createFileField('vehicle_sections', 'image');
  await createIntegerField('vehicle_sections', 'sort', { defaultValue: 0 });

  // 7. vehicles_files (Gallery junction)
  await createCollection('vehicles_files', { note: 'Junction thư viện ảnh xe' });
  await createM2ORelation('vehicles_files', 'vehicles_id', 'vehicles');
  await createFileField('vehicles_files', 'directus_files_id');
  await createDropdownField('vehicles_files', 'group', ['thumbnail', 'slider', 'lifestyle'], { defaultValue: 'thumbnail' });
  await createIntegerField('vehicles_files', 'sort', { defaultValue: 0 });

  // 8. price_lists (Admin only)
  await createCollection('price_lists', { note: 'Lịch sử và biểu giá xe niêm yết' });
  await createM2ORelation('price_lists', 'trim', 'vehicle_trims', { note: 'Thuộc phiên bản', oneField: 'prices' });
  await createBigIntField('price_lists', 'list_price', { note: 'Giá niêm yết (VND)' });
  await createBigIntField('price_lists', 'promo_price', { note: 'Giá sau ưu đãi (VND)' });
  await createBigIntField('price_lists', 'price_with_battery', { note: 'Giá kèm pin' });
  await createBigIntField('price_lists', 'price_without_battery', { note: 'Giá không pin' });
  await createBigIntField('price_lists', 'premium_color_surcharge', { note: 'Phụ thu màu nâng cao' });
  await createDateField('price_lists', 'effective_from');
  await createDateField('price_lists', 'effective_to');
  await createStringField('price_lists', 'reference_doc');
  await createFileField('price_lists', 'attachment');
  await createTextField('price_lists', 'note');
  await createDropdownField('price_lists', 'status', ['draft', 'active', 'archived'], { defaultValue: 'active' });
  await createDateTimeField('price_lists', 'date_created');

  // 9. promotions
  await createCollection('promotions', { note: 'Chương trình ưu đãi khuyến mại' });
  await createStringField('promotions', 'title', { required: true });
  await createStringField('promotions', 'slug', { unique: true });
  await createTextField('promotions', 'summary');
  await createJsonField('promotions', 'benefits');
  await createBigIntField('promotions', 'discount_amount');
  await createFloatField('promotions', 'discount_percent');
  await createTextField('promotions', 'content');
  await createFileField('promotions', 'image');
  await createDateField('promotions', 'valid_from');
  await createDateField('promotions', 'valid_to');
  await createBooleanField('promotions', 'share_to_sales', { defaultValue: true });
  await createDropdownField('promotions', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('promotions', 'sort', { defaultValue: 0 });

  // 10. promotions_vehicles (Junction)
  await createCollection('promotions_vehicles', { note: 'Junction ưu đãi - dòng xe' });
  await createM2ORelation('promotions_vehicles', 'promotions_id', 'promotions');
  await createM2ORelation('promotions_vehicles', 'vehicles_id', 'vehicles');

  // 11. used_cars
  await createCollection('used_cars', { note: 'Xe cũ / đã qua sử dụng' });
  await createStringField('used_cars', 'slug', { unique: true, required: true });
  await createStringField('used_cars', 'title', { required: true });
  await createM2ORelation('used_cars', 'vehicle', 'vehicles');
  await createM2ORelation('used_cars', 'trim', 'vehicle_trims');
  await createDropdownField('used_cars', 'vehicle_type', ['electric', 'gasoline', 'commercial'], { defaultValue: 'electric' });
  await createIntegerField('used_cars', 'year', { defaultValue: 2023 });
  await createIntegerField('used_cars', 'odo_km', { defaultValue: 0 });
  await createBigIntField('used_cars', 'price');
  await createStringField('used_cars', 'exterior_color');
  await createStringField('used_cars', 'interior_color');
  await createIntegerField('used_cars', 'seats', { defaultValue: 5 });
  await createStringField('used_cars', 'trunk_capacity');
  await createStringField('used_cars', 'range_text');
  await createDropdownField('used_cars', 'battery_ownership', ['rent', 'owned'], { defaultValue: 'owned' });
  await createIntegerField('used_cars', 'battery_soh');
  await createStringField('used_cars', 'condition');
  await createStringField('used_cars', 'document_status');
  await createDropdownField('used_cars', 'sale_status', ['available', 'deposited', 'sold'], { defaultValue: 'available' });
  await createM2ORelation('used_cars', 'showroom', 'showrooms');
  await createStringField('used_cars', 'province');
  await createFileField('used_cars', 'thumbnail');
  await createJsonField('used_cars', 'notes');
  // Internal fields (🔒)
  await createStringField('used_cars', 'plate_number');
  await createStringField('used_cars', 'vin');
  await createBigIntField('used_cars', 'purchase_price');
  await createTextField('used_cars', 'internal_note');
  await createBooleanField('used_cars', 'share_to_sales', { defaultValue: true });
  await createDropdownField('used_cars', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('used_cars', 'sort', { defaultValue: 0 });
  await createStringField('used_cars', 'seo_title');
  await createTextField('used_cars', 'seo_description');

  // 12. used_cars_files (Junction)
  await createCollection('used_cars_files', { note: 'Junction ảnh xe cũ' });
  await createM2ORelation('used_cars_files', 'used_cars_id', 'used_cars');
  await createFileField('used_cars_files', 'directus_files_id');
  await createIntegerField('used_cars_files', 'sort', { defaultValue: 0 });

  // 13. posts
  await createCollection('posts', { note: 'Tin tức và bài viết' });
  await createStringField('posts', 'slug', { unique: true, required: true });
  await createStringField('posts', 'title', { required: true });
  await createDropdownField('posts', 'category', ['uu-dai', 'tin-noi-bo', 'su-kien', 'danh-gia-xe', 'tram-sac'], { defaultValue: 'tin-noi-bo' });
  await createTextField('posts', 'excerpt');
  await createTextField('posts', 'content');
  await createFileField('posts', 'thumbnail');
  await createDateTimeField('posts', 'published_at');
  await createStringField('posts', 'author_name', { defaultValue: 'VinFast Phương Đông' });
  await createBooleanField('posts', 'is_featured', { defaultValue: false });
  await createIntegerField('posts', 'reading_minutes', { defaultValue: 3 });
  await createDropdownField('posts', 'share_to_sales', ['none', 'excerpt', 'full'], { defaultValue: 'excerpt' });
  await createDropdownField('posts', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createStringField('posts', 'seo_title');
  await createTextField('posts', 'seo_description');

  // 14. posts_vehicles (Junction)
  await createCollection('posts_vehicles', { note: 'Junction tin tức - dòng xe liên quan' });
  await createM2ORelation('posts_vehicles', 'posts_id', 'posts');
  await createM2ORelation('posts_vehicles', 'vehicles_id', 'vehicles');

  // 15. sales_partners
  await createCollection('sales_partners', { note: 'Đối tác và Sales đại lý' });
  await createStringField('sales_partners', 'code', { unique: true, required: true });
  await createStringField('sales_partners', 'full_name', { required: true });
  await createStringField('sales_partners', 'phone', { required: true });
  await createStringField('sales_partners', 'zalo');
  await createStringField('sales_partners', 'email');
  await createFileField('sales_partners', 'avatar');
  await createM2ORelation('sales_partners', 'showroom', 'showrooms');
  await createStringField('sales_partners', 'website_domain');
  await createJsonField('sales_partners', 'allowed_origins');
  await createStringField('sales_partners', 'feed_key_hash');
  await createStringField('sales_partners', 'telegram_chat_id');
  await createDropdownField('sales_partners', 'notify_channel', ['telegram', 'email', 'none'], { defaultValue: 'telegram' });
  await createDropdownField('sales_partners', 'status', ['active', 'suspended'], { defaultValue: 'active' });
  await createTextField('sales_partners', 'note');

  // 16. customers
  await createCollection('customers', { note: 'Khách hàng tập trung theo SĐT' });
  await createStringField('customers', 'phone', { unique: true, required: true });
  await createStringField('customers', 'full_name', { required: true });
  await createStringField('customers', 'email');
  await createStringField('customers', 'province');
  await createM2ORelation('customers', 'owner_partner', 'sales_partners');
  await createStringField('customers', 'first_source_type');
  await createM2ORelation('customers', 'first_source_partner', 'sales_partners');
  await createJsonField('customers', 'tags');
  await createTextField('customers', 'note');
  await createDateTimeField('customers', 'consent_at');
  await createDateTimeField('customers', 'date_created');

  // 17. leads
  await createCollection('leads', { note: 'Các lượt submit form liên hệ' });
  await createStringField('leads', 'code', { unique: true, required: true });
  await createM2ORelation('leads', 'customer', 'customers', { required: true });
  await createStringField('leads', 'contact_name');
  await createStringField('leads', 'contact_phone');
  await createDropdownField('leads', 'type', [
    'test_drive', 'quote', 'rolling_cost', 'installment',
    'service', 'used_car', 'contact', 'charging_station'
  ], { defaultValue: 'contact' });
  await createM2ORelation('leads', 'vehicle', 'vehicles');
  await createM2ORelation('leads', 'trim', 'vehicle_trims');
  await createM2ORelation('leads', 'used_car', 'used_cars');
  await createStringField('leads', 'service_type');
  await createM2ORelation('leads', 'showroom', 'showrooms');
  await createDateField('leads', 'preferred_date');
  await createTextField('leads', 'message');
  await createJsonField('leads', 'quoted_price_snapshot');
  await createDropdownField('leads', 'source_type', ['dealer_web', 'partner_site', 'hotline', 'walk_in', 'other'], { defaultValue: 'dealer_web' });
  await createM2ORelation('leads', 'source_partner', 'sales_partners');
  await createStringField('leads', 'source_url');
  await createStringField('leads', 'utm_source');
  await createStringField('leads', 'utm_medium');
  await createStringField('leads', 'utm_campaign');
  await createStringField('leads', 'ip_hash');
  await createStringField('leads', 'user_agent');
  await createM2ORelation('leads', 'assigned_to', 'sales_partners');
  await createDateTimeField('leads', 'assigned_at');
  await createDropdownField('leads', 'status', ['new', 'contacted', 'appointment', 'quoted', 'won', 'lost', 'spam'], { defaultValue: 'new' });
  await createBooleanField('leads', 'is_duplicate', { defaultValue: false });
  await createM2ORelation('leads', 'duplicate_of_partner', 'sales_partners');
  await createJsonField('leads', 'care_log');
  await createM2ORelation('leads', 'result_vehicle', 'vehicles');
  await createStringField('leads', 'lost_reason');
  await createBooleanField('leads', 'consent', { defaultValue: true });
  await createDateTimeField('leads', 'consent_at');
  await createStringField('leads', 'consent_text_version');
  await createDateTimeField('leads', 'date_created');

  // 18. chargers
  await createCollection('chargers', { note: 'Hệ thống trạm sạc VinFast & V-Green' });
  await createStringField('chargers', 'slug', { unique: true, required: true });
  await createStringField('chargers', 'name', { required: true });
  await createStringField('chargers', 'category_name');
  await createDropdownField('chargers', 'type', ['AC', 'DC'], { defaultValue: 'DC' });
  await createFloatField('chargers', 'power_kw');
  await createStringField('chargers', 'power_text');
  await createStringField('chargers', 'charging_time');
  await createStringField('chargers', 'voltage');
  await createStringField('chargers', 'connector');
  await createBigIntField('chargers', 'price');
  await createStringField('chargers', 'price_text');
  await createFileField('chargers', 'image');
  await createTextField('chargers', 'description');
  await createJsonField('chargers', 'features');
  await createJsonField('chargers', 'quick_specs');
  await createJsonField('chargers', 'pillars');
  await createJsonField('chargers', 'projects');
  await createDropdownField('chargers', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('chargers', 'sort', { defaultValue: 0 });
  await createStringField('chargers', 'seo_title');
  await createTextField('chargers', 'seo_description');

  // 19. jobs
  await createCollection('jobs', { note: 'Vị trí tuyển dụng' });
  await createStringField('jobs', 'slug', { unique: true, required: true });
  await createStringField('jobs', 'title', { required: true });
  await createStringField('jobs', 'department', { required: true });
  await createStringField('jobs', 'location', { required: true });
  await createM2ORelation('jobs', 'showroom', 'showrooms');
  await createIntegerField('jobs', 'salary_min');
  await createIntegerField('jobs', 'salary_max');
  await createStringField('jobs', 'salary_text');
  await createIntegerField('jobs', 'quantity', { defaultValue: 1 });
  await createStringField('jobs', 'employment_type', { defaultValue: 'Toàn thời gian' });
  await createFileField('jobs', 'image');
  await createTextField('jobs', 'description');
  await createJsonField('jobs', 'responsibilities');
  await createJsonField('jobs', 'requirements');
  await createJsonField('jobs', 'benefits');
  await createDateTimeField('jobs', 'published_at');
  await createDateField('jobs', 'deadline');
  await createDropdownField('jobs', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });

  // 20. job_applications (🔒 Private)
  await createCollection('job_applications', { note: 'Hồ sơ ứng tuyển & nộp CV' });
  await createM2ORelation('job_applications', 'job', 'jobs', { required: true });
  await createStringField('job_applications', 'full_name', { required: true });
  await createStringField('job_applications', 'phone', { required: true });
  await createStringField('job_applications', 'email');
  await createFileField('job_applications', 'cv_file');
  await createStringField('job_applications', 'cv_link');
  await createTextField('job_applications', 'note');
  await createDropdownField('job_applications', 'status', ['new', 'reviewing', 'interview', 'offered', 'rejected', 'hired'], { defaultValue: 'new' });
  await createTextField('job_applications', 'hr_note');
  await createBooleanField('job_applications', 'consent', { defaultValue: true });
  await createDateTimeField('job_applications', 'consent_at');
  await createDateTimeField('job_applications', 'date_created');

  // 21. services
  await createCollection('services', { note: 'Dịch vụ bảo dưỡng & xưởng dịch vụ' });
  await createStringField('services', 'slug', { unique: true, required: true });
  await createStringField('services', 'title', { required: true });
  await createDropdownField('services', 'group', ['maintenance', 'repair', 'body_paint', 'detailing', 'rescue'], { defaultValue: 'maintenance' });
  await createFileField('services', 'icon');
  await createFileField('services', 'image');
  await createTextField('services', 'summary');
  await createTextField('services', 'content');
  await createJsonField('services', 'maintenance_levels');
  await createJsonField('services', 'insurance_partners');
  await createStringField('services', 'cta_type');
  await createStringField('services', 'cta_value');
  await createDropdownField('services', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('services', 'sort', { defaultValue: 0 });

  // 22. accessories
  await createCollection('accessories', { note: 'Phụ kiện chính hãng VinFast' });
  await createStringField('accessories', 'slug', { unique: true, required: true });
  await createStringField('accessories', 'name', { required: true });
  await createStringField('accessories', 'category');
  await createJsonField('accessories', 'compatible_models');
  await createBigIntField('accessories', 'price');
  await createStringField('accessories', 'price_text');
  await createFileField('accessories', 'image');
  await createTextField('accessories', 'description');
  await createStringField('accessories', 'warranty_text');
  await createBooleanField('accessories', 'share_to_sales', { defaultValue: true });
  await createDropdownField('accessories', 'status', ['published', 'draft', 'archived'], { defaultValue: 'published' });
  await createIntegerField('accessories', 'sort', { defaultValue: 0 });

  console.log('--- HOÀN TẤT TẠO TOÀN BỘ 22 COLLECTIONS & FIELDS THÀNH CÔNG! ---');
}

if (process.argv[1].endsWith('setup-schema.mjs')) {
  setupAllCollections().catch((err) => {
    console.error('Lỗi khi thiết lập schema:', err);
    process.exit(1);
  });
}
