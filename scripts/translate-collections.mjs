// scripts/translate-collections.mjs
import { directusJson } from './directus-client.mjs';

const COLLECTION_CONFIGS = [
  // 1. Quản lý Khách hàng & Lead (Ưu tiên hàng đầu cho Admin)
  {
    collection: 'leads',
    icon: 'contact_phone',
    color: '#dc2626',
    sort: 1,
    vi: 'Yêu Cầu Liên Hệ (Leads)',
    vi_singular: 'Lead / Yêu cầu',
    en: 'Leads & Inquiries',
    en_singular: 'Lead',
    note: 'Mọi lượt đăng ký lái thử, báo giá, bảo dưỡng, dự toán lăn bánh',
  },
  {
    collection: 'customers',
    icon: 'people',
    color: '#6366f1',
    sort: 2,
    vi: 'Khách Hàng (CRM)',
    vi_singular: 'Khách hàng',
    en: 'Customers (CRM)',
    en_singular: 'Customer',
    note: 'Danh sách hồ sơ khách hàng gom theo số điện thoại',
  },

  // 2. Quản lý Xe & Giá
  {
    collection: 'vehicles',
    icon: 'directions_car',
    color: '#1863dc',
    sort: 3,
    vi: 'Dòng Xe Mới',
    vi_singular: 'Dòng xe',
    en: 'Vehicles',
    en_singular: 'Vehicle',
    note: 'Dòng xe mới VinFast (VF 3, VF 5, VF 6, VF 7, VF 8, VF 9...)',
  },
  {
    collection: 'vehicle_trims',
    icon: 'tune',
    color: '#0284c7',
    sort: 4,
    vi: 'Phiên Bản Xe (Trims)',
    vi_singular: 'Phiên bản',
    en: 'Vehicle Trims',
    en_singular: 'Trim',
    note: 'Các phiên bản Eco, Plus, Base của từng dòng xe',
  },
  {
    collection: 'price_lists',
    icon: 'payments',
    color: '#10b981',
    sort: 5,
    vi: 'Biểu Giá Xe Niêm Yết',
    vi_singular: 'Biểu giá',
    en: 'Price Lists',
    en_singular: 'Price',
    note: 'Lịch sử giá và biểu giá bán xe (Chỉ Admin)',
  },
  {
    collection: 'vehicle_colors',
    icon: 'palette',
    color: '#f59e0b',
    sort: 6,
    vi: 'Màu Sắc Xe',
    vi_singular: 'Màu xe',
    en: 'Vehicle Colors',
    en_singular: 'Color',
    note: 'Bảng màu ngoại thất, mã màu Hex và ảnh xe',
  },
  {
    collection: 'vehicle_sections',
    icon: 'view_quilt',
    color: '#64748b',
    sort: 7,
    vi: 'Khối Chi Tiết Xe (Nội/Ngoại Thất)',
    vi_singular: 'Khối chi tiết',
    en: 'Vehicle Sections',
    en_singular: 'Section',
    note: 'Các khối giới thiệu ngoại thất, nội thất, công nghệ an toàn',
  },
  {
    collection: 'used_cars',
    icon: 'car_rental',
    color: '#d97706',
    sort: 8,
    vi: 'Xe Cũ Đã Qua Sử Dụng',
    vi_singular: 'Xe cũ',
    en: 'Used Cars',
    en_singular: 'Used Car',
    note: 'Kho xe đã qua sử dụng, ODO, kiểm định pin, giá bán',
  },

  // 3. Khuyến mãi & Showroom
  {
    collection: 'promotions',
    icon: 'local_offer',
    color: '#ef4444',
    sort: 9,
    vi: 'Chương Trình Ưu Đãi',
    vi_singular: 'Ưu đãi',
    en: 'Promotions',
    en_singular: 'Promotion',
    note: 'Chính sách ưu đãi, quà tặng, cam kết giá',
  },
  {
    collection: 'showrooms',
    icon: 'storefront',
    color: '#0ea5e9',
    sort: 10,
    vi: 'Hệ Thống Showroom & Đại Lý',
    vi_singular: 'Showroom',
    en: 'Showrooms',
    en_singular: 'Showroom',
    note: 'Hệ thống showroom 3S, xưởng dịch vụ và xưởng sửa chữa',
  },

  // 4. Trạm Sạc & Dịch Vụ
  {
    collection: 'chargers',
    icon: 'ev_station',
    color: '#22c55e',
    sort: 11,
    vi: 'Hệ Thống Trạm Sạc V-Green',
    vi_singular: 'Trạm sạc',
    en: 'Charging Stations',
    en_singular: 'Charger',
    note: 'Trạm sạc nhanh DC và trạm sạc AC tại nhà',
  },
  {
    collection: 'posts',
    icon: 'article',
    color: '#3b82f6',
    sort: 12,
    vi: 'Tin Tức & Sự Kiện',
    vi_singular: 'Bài viết',
    en: 'News & Articles',
    en_singular: 'Post',
    note: 'Tin tức đại lý, sự kiện lái thử, cẩm nang xe điện',
  },
  {
    collection: 'services',
    icon: 'build',
    color: '#f97316',
    sort: 13,
    vi: 'Dịch Vụ & Xưởng',
    vi_singular: 'Dịch vụ',
    en: 'Services & Workshop',
    en_singular: 'Service',
    note: 'Bảo dưỡng định kỳ, đồng sơn, sửa chữa nhanh, cứu hộ',
  },
  {
    collection: 'accessories',
    icon: 'construction',
    color: '#8b5cf6',
    sort: 14,
    vi: 'Phụ Kiện Chính Hãng',
    vi_singular: 'Phụ kiện',
    en: 'Accessories',
    en_singular: 'Accessory',
    note: 'Phụ kiện ô tô điện chính hãng VinFast',
  },

  // 5. Đối Tác & Tuyển Dụng
  {
    collection: 'sales_partners',
    icon: 'badge',
    color: '#14b8a6',
    sort: 15,
    vi: 'Đối Tác & Sales Đại Lý',
    vi_singular: 'Đối tác Sales',
    en: 'Sales Partners',
    en_singular: 'Sales Partner',
    note: 'Danh sách Sales, website WordPress liên kết, Partner Key',
  },
  {
    collection: 'jobs',
    icon: 'work',
    color: '#06b6d4',
    sort: 16,
    vi: 'Tin Tuyển Dụng',
    vi_singular: 'Vị trí tuyển dụng',
    en: 'Careers & Jobs',
    en_singular: 'Job',
    note: 'Các vị trí tuyển dụng nhân sự tại VinFast Phương Đông',
  },
  {
    collection: 'job_applications',
    icon: 'assignment_ind',
    color: '#ec4899',
    sort: 17,
    vi: 'Hồ Sơ Ứng Tuyển (CV)',
    vi_singular: 'Hồ sơ CV',
    en: 'Job Applications (CV)',
    en_singular: 'Application',
    note: 'Danh sách hồ sơ nộp CV ứng tuyển',
  },

  // 6. Cấu Hình
  {
    collection: 'site_settings',
    icon: 'settings',
    color: '#475569',
    sort: 18,
    vi: 'Cấu Hình Chung Đại Lý',
    vi_singular: 'Cấu hình',
    en: 'Site Settings',
    en_singular: 'Setting',
    note: 'Thông tin công ty, trụ sở, hotline, social, điều khoản',
  },

  // 7. Bảng trung gian Junction (Ẩn khỏi sidebar)
  {
    collection: 'vehicles_files',
    hidden: true,
    vi: 'Thư Viện Ảnh Xe (Junction)',
    en: 'Vehicle Gallery (Junction)',
  },
  {
    collection: 'used_cars_files',
    hidden: true,
    vi: 'Thư Viện Ảnh Xe Cũ (Junction)',
    en: 'Used Cars Gallery (Junction)',
  },
  {
    collection: 'posts_vehicles',
    hidden: true,
    vi: 'Xe Liên Quan Bài Viết (Junction)',
    en: 'Posts Vehicles (Junction)',
  },
  {
    collection: 'promotions_vehicles',
    hidden: true,
    vi: 'Xe Áp Dụng Ưu Đãi (Junction)',
    en: 'Promotions Vehicles (Junction)',
  },
];

async function updateAllTranslations() {
  console.log('--- CẬP NHẬT TÊN TIẾNG VIỆT, ICON VÀ THỨ TỰ CHO TẤT CẢ CÁC BẢNG ---');

  for (const cfg of COLLECTION_CONFIGS) {
    const metaUpdate = {
      hidden: !!cfg.hidden,
      translations: [
        {
          language: 'vi-VN',
          translation: cfg.vi,
          singular: cfg.vi_singular || cfg.vi,
          plural: cfg.vi,
        },
        {
          language: 'en-US',
          translation: cfg.en,
          singular: cfg.en_singular || cfg.en,
          plural: cfg.en,
        },
      ],
    };

    if (cfg.icon) metaUpdate.icon = cfg.icon;
    if (cfg.color) metaUpdate.color = cfg.color;
    if (cfg.sort) metaUpdate.sort = cfg.sort;
    if (cfg.note) metaUpdate.note = cfg.note;

    try {
      await directusJson(`/collections/${cfg.collection}`, {
        method: 'PATCH',
        body: JSON.stringify({ meta: metaUpdate }),
      });
      console.log(`✔ [${cfg.collection}] -> "${cfg.vi}" (Icon: ${cfg.icon || 'hidden'})`);
    } catch (err) {
      console.warn(`! Không thể cập nhật ${cfg.collection}:`, err.message);
    }
  }

  console.log('--- HOÀN TẤT CẬP NHẬT GIAO DIỆN TIẾNG VIỆT CHO DIRECTUS! ---');
}

updateAllTranslations().catch(console.error);
