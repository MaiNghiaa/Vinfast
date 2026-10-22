// scripts/setup-permissions.mjs
import { directusJson } from './directus-client.mjs';

export async function setupPublicPermissions() {
  console.log('--- CẤU HÌNH PHÂN QUYỀN PUBLIC ROLE ---');

  // Find the Public policy
  const policiesRes = await directusJson('/policies?filter[name][_eq]=$t:public_label');
  let publicPolicyId = policiesRes.data?.[0]?.id;

  if (!publicPolicyId) {
    const allPolicies = await directusJson('/policies');
    const pub = allPolicies.data.find((p) => p.name?.includes('public') || p.name?.includes('Public'));
    publicPolicyId = pub?.id;
  }

  if (!publicPolicyId) {
    throw new Error('Could not locate Directus Public policy!');
  }

  console.log(`Using Public Policy ID: ${publicPolicyId}`);

  // Fetch existing permissions for this policy
  const existingPermsRes = await directusJson(`/permissions?filter[policy][_eq]=${publicPolicyId}&limit=-1`);
  const existingPermKeys = new Set(existingPermsRes.data.map((p) => `${p.collection}:${p.action}`));

  async function addPermission(collection, action, fields = ['*'], permissionsRule = {}) {
    const key = `${collection}:${action}`;
    if (existingPermKeys.has(key)) {
      console.log(`- Permission for ${key} already exists. Skipping.`);
      return;
    }

    console.log(`+ Adding ${action} permission on '${collection}' for Public...`);
    await directusJson('/permissions', {
      method: 'POST',
      body: JSON.stringify({
        policy: publicPolicyId,
        collection,
        action,
        fields,
        permissions: permissionsRule,
      }),
    });
    existingPermKeys.add(key);
  }

  // 1. Directus Files (cho phép đọc ảnh public)
  await addPermission('directus_files', 'read', ['*']);

  // 2. Site settings
  await addPermission('site_settings', 'read', ['*']);

  // 3. Showrooms
  await addPermission('showrooms', 'read', ['*'], { status: { _eq: 'published' } });

  // 4. Vehicles & Sub-collections
  await addPermission('vehicles', 'read', ['*'], { status: { _eq: 'published' } });
  await addPermission('vehicle_trims', 'read', ['*'], { status: { _eq: 'published' } });
  await addPermission('vehicle_colors', 'read', ['*']);
  await addPermission('vehicle_sections', 'read', ['*']);
  await addPermission('vehicles_files', 'read', ['*']);

  // 5. Price lists (Chỉ đọc giá active, ẩn note, attachment, reference_doc)
  await addPermission(
    'price_lists',
    'read',
    [
      'id', 'trim', 'list_price', 'promo_price', 'price_with_battery',
      'price_without_battery', 'premium_color_surcharge', 'effective_from',
      'effective_to', 'status',
    ],
    { status: { _eq: 'active' } }
  );

  // 6. Promotions
  await addPermission('promotions', 'read', ['*'], { status: { _eq: 'published' } });
  await addPermission('promotions_vehicles', 'read', ['*']);

  // 7. Used cars (Ẩn 4 field nội bộ: plate_number, vin, purchase_price, internal_note)
  await addPermission(
    'used_cars',
    'read',
    [
      'id', 'slug', 'title', 'vehicle', 'trim', 'vehicle_type', 'year', 'odo_km',
      'price', 'exterior_color', 'interior_color', 'seats', 'trunk_capacity',
      'range_text', 'battery_ownership', 'battery_soh', 'condition', 'document_status',
      'sale_status', 'showroom', 'province', 'thumbnail', 'notes', 'share_to_sales',
      'status', 'sort', 'seo_title', 'seo_description',
    ],
    { status: { _eq: 'published' } }
  );
  await addPermission('used_cars_files', 'read', ['*']);

  // 8. Posts
  await addPermission('posts', 'read', ['*'], { status: { _eq: 'published' } });
  await addPermission('posts_vehicles', 'read', ['*']);

  // 9. Chargers
  await addPermission('chargers', 'read', ['*'], { status: { _eq: 'published' } });

  // 10. Jobs
  await addPermission('jobs', 'read', ['*'], { status: { _eq: 'published' } });

  // 11. Services
  await addPermission('services', 'read', ['*'], { status: { _eq: 'published' } });

  // 12. Accessories
  await addPermission('accessories', 'read', ['*'], { status: { _eq: 'published' } });

  // Lưu ý: customers, leads, sales_partners, job_applications TUYỆT ĐỐI KHÔNG CẤP QUYỀN PUBLIC!

  console.log('--- HOÀN TẤT THIẾT LẬP PHÂN QUYỀN PUBLIC THÀNH CÔNG! ---');
}

if (process.argv[1].endsWith('setup-permissions.mjs')) {
  setupPublicPermissions().catch((err) => {
    console.error('Lỗi khi cấu hình phân quyền:', err);
    process.exit(1);
  });
}
