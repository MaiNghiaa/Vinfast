import { Vehicle, Showroom, UsedCar, Charger, Post } from '@/data/types';
export type { Vehicle, Showroom, UsedCar, Charger, Post };
import { VEHICLES } from '@/data/vehicles';
import { SHOWROOMS, HEADQUARTERS } from '@/data/showrooms';
import { USED_CARS } from '@/data/usedCars';
import { CHARGERS } from '@/data/chargers';
import { POSTS } from '@/data/news';
export * from './directus-url';
import { DIRECTUS_PUBLIC_URL, DIRECTUS_SERVER_URL, DIRECTUS_STATIC_TOKEN, getDirectusAssetUrl } from './directus-url';

/**
 * Universal safe fetcher with Directus fallback to static data
 */
async function directusFetch(path: string, options: RequestInit = {}): Promise<any> {
  const baseUrl = (typeof window === 'undefined' ? DIRECTUS_SERVER_URL : DIRECTUS_PUBLIC_URL).replace(/\/+$/, '');
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
      },
      next: { revalidate: 60 }, // Revalidate every 60s
    });

    if (!res.ok) {
      console.warn(`[Directus] Warning: Request ${path} returned status ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.warn(`[Directus] Could not connect to Directus at ${url}: ${(error as Error).message}`);
    return null;
  }
}

/**
 * 1. FETCH SHOWROOMS
 */
export async function getShowrooms(): Promise<Showroom[]> {
  const res = await directusFetch('/items/showrooms?sort=sort');
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map((sr: any) => ({
      id: sr.slug,
      code: sr.code,
      name: sr.name,
      type: sr.type === '3S' ? '3S' : (sr.type === 'showroom' ? 'Showroom' : 'Workshop'),
      province: sr.province,
      address: sr.address,
      hotlineSales: sr.hotline_sales || '090 242 25 22',
      hotlineService: sr.hotline_service || '090 242 25 22',
      workingHoursSales: sr.hours_sales || '08:00 - 18:00',
      workingHoursService: sr.hours_service || '08:00 - 17:30',
      mapUrl: sr.map_url || '',
      image: getDirectusAssetUrl(sr.image),
    }));
  }
  return SHOWROOMS;
}

/**
 * Map raw Directus vehicle to frontend Vehicle interface
 */
function mapDirectusVehicle(v: any): Vehicle {
  // Trims
  const trims = (v.trims || []).map((t: any) => ({
    name: t.name,
    priceNoBattery: 0,
    priceWithBattery: 0,
    range: t.range_km ? `${t.range_km} km (${v.range_standard || 'NEDC'})` : '',
    power: t.power_hp ? `${t.power_hp} mã lực` : '',
    torque: t.torque_nm ? `${t.torque_nm} Nm` : '',
    acceleration: t.acceleration_text || '',
    driveType: t.drive_type || 'FWD',
    airbags: t.airbags || 1,
    adas: !!t.has_adas,
  }));

  // Colors
  const colors = (v.colors || []).map((c: any) => ({
    name: c.name,
    hex: c.hex,
    imageUrl: getDirectusAssetUrl(c.image),
  }));

  // Sections
  const exteriorItems = (v.sections || [])
    .filter((s: any) => s.section === 'exterior')
    .map((s: any) => ({
      title: s.title,
      subtitle: s.subtitle || '',
      img: getDirectusAssetUrl(s.image),
      desc: s.description || '',
    }));

  const interiorItems = (v.sections || [])
    .filter((s: any) => s.section === 'interior')
    .map((s: any) => ({
      title: s.title,
      subtitle: s.subtitle || '',
      img: getDirectusAssetUrl(s.image),
      desc: s.description || '',
    }));

  const safetyItems = (v.sections || [])
    .filter((s: any) => s.section === 'safety')
    .map((s: any) => ({
      title: s.title,
      img: getDirectusAssetUrl(s.image),
    }));

  return {
    id: v.slug,
    slug: v.slug,
    name: v.name,
    badge: v.badge,
    segment: v.segment || 'SUV',
    tagline: v.tagline || '',
    basePrice: 0,
    priceText: 'Liên hệ',
    watermarkText: v.watermark_text,
    thumbnail: getDirectusAssetUrl(v.thumbnail),
    bannerImage: getDirectusAssetUrl(v.banner_image),
    category: v.category || 'electric-car',
    isFeatured: !!v.is_featured,
    specs: {
      range: v.range_km ? `${v.range_km} km (${v.range_standard || 'NEDC'})` : '',
      fastCharge: v.fast_charge_text || (v.fast_charge_minutes ? `${v.fast_charge_minutes} phút` : ''),
      power: v.power_hp ? `${v.power_hp} mã lực` : '',
      seats: v.seats || 5,
      dimensions: v.length_mm ? `${v.length_mm} x ${v.width_mm} x ${v.height_mm} mm` : '',
      wheelbase: v.wheelbase_mm ? `${v.wheelbase_mm} mm` : '',
      groundClearance: v.ground_clearance_mm ? `${v.ground_clearance_mm} mm` : '',
      batteryCapacity: v.battery_kwh ? `${v.battery_kwh} kWh` : '',
      gearbox: v.gearbox || 'Số tự động (AT)',
      engineType: v.engine_type || 'Điện',
    },
    colors,
    trims,
    features: v.features || [],
    comparisonTable: v.comparison_table || [],
    additionalAttributes: v.additional_attributes || [],
    exteriorData: {
      subtitle: v.exterior_subtitle,
      intro: v.exterior_intro || [],
      bannerImg: getDirectusAssetUrl(v.banner_image),
      items: exteriorItems,
    },
    interiorData: {
      subtitle: v.interior_subtitle,
      intro: v.interior_intro || [],
      bannerImg: getDirectusAssetUrl(v.banner_image),
      items: interiorItems,
    },
    safetyTech: {
      title: v.safety_title || 'Công Nghệ An Toàn Vượt Trội',
      items: safetyItems,
    },
    reviewVideo: v.review_video_url ? {
      title: v.review_video_title || 'Video Đánh Giá',
      bgImg: getDirectusAssetUrl(v.review_video_bg),
      videoUrl: v.review_video_url,
    } : undefined,
  };
}

/**
 * 2. FETCH VEHICLES
 */
export async function getVehicles(): Promise<Vehicle[]> {
  const res = await directusFetch('/items/vehicles?sort=sort&fields=*,trims.*,colors.*,sections.*');
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map(mapDirectusVehicle);
  }
  return VEHICLES;
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  const filter = encodeURIComponent(JSON.stringify({ slug: { _eq: slug } }));
  const res = await directusFetch(`/items/vehicles?filter=${filter}&fields=*,trims.*,colors.*,sections.*`);
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    return mapDirectusVehicle(res.data[0]);
  }
  return VEHICLES.find((v) => v.slug === slug);
}

/**
 * 3. FETCH USED CARS
 */
export async function getUsedCars(): Promise<UsedCar[]> {
  const res = await directusFetch('/items/used_cars?sort=sort');
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map((c: any) => ({
      id: c.slug,
      slug: c.slug,
      name: c.title,
      priceText: c.price ? `${c.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ',
      priceNumber: c.price || 0,
      model: c.title,
      version: 'Standard',
      year: c.year || 2023,
      odo: `${c.odo_km?.toLocaleString('vi-VN') || 0} km`,
      odoKm: c.odo_km || 0,
      exteriorColor: c.exterior_color || '',
      interiorColor: c.interior_color || '',
      seats: c.seats || 5,
      trunkCapacity: c.trunk_capacity || '',
      rangeNedc: c.range_text || '',
      battery: c.battery_ownership === 'rent' ? 'Thuê pin' : 'Mua pin',
      carCondition: c.condition || 'Xuất sắc',
      allocatedTo: c.province || 'Hà Nội',
      documentStatus: c.document_status || 'Đầy đủ',
      carStatus: c.sale_status || 'available',
      image: getDirectusAssetUrl(c.thumbnail),
      galleryImages: [],
      vehicleType: c.vehicle_type || 'electric',
      province: c.province,
      notes: c.notes || [],
    }));
  }
  return USED_CARS;
}

export async function getUsedCarBySlug(slug: string): Promise<UsedCar | undefined> {
  const filter = encodeURIComponent(JSON.stringify({ slug: { _eq: slug } }));
  const res = await directusFetch(`/items/used_cars?filter=${filter}`);
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    const c = res.data[0];
    return {
      id: c.slug,
      slug: c.slug,
      name: c.title,
      priceText: c.price ? `${c.price.toLocaleString('vi-VN')} VNĐ` : 'Liên hệ',
      priceNumber: c.price || 0,
      model: c.title,
      version: 'Standard',
      year: c.year || 2023,
      odo: `${c.odo_km?.toLocaleString('vi-VN') || 0} km`,
      odoKm: c.odo_km || 0,
      exteriorColor: c.exterior_color || '',
      interiorColor: c.interior_color || '',
      seats: c.seats || 5,
      trunkCapacity: c.trunk_capacity || '',
      rangeNedc: c.range_text || '',
      battery: c.battery_ownership === 'rent' ? 'Thuê pin' : 'Mua pin',
      carCondition: c.condition || 'Xuất sắc',
      allocatedTo: c.province || 'Hà Nội',
      documentStatus: c.document_status || 'Đầy đủ',
      carStatus: c.sale_status || 'available',
      image: getDirectusAssetUrl(c.thumbnail),
      galleryImages: [],
      vehicleType: c.vehicle_type || 'electric',
      province: c.province,
      notes: c.notes || [],
    };
  }
  return USED_CARS.find((c) => c.slug === slug);
}

/**
 * 4. FETCH CHARGERS
 */
export async function getChargers(): Promise<Charger[]> {
  const res = await directusFetch('/items/chargers?sort=sort');
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map((ch: any) => ({
      id: ch.slug,
      slug: ch.slug,
      name: ch.name,
      categoryName: ch.category_name || (ch.type === 'DC' ? 'Trạm sạc nhanh DC' : 'Trạm sạc AC'),
      type: ch.type || 'DC',
      power: ch.power_text || `${ch.power_kw}kW`,
      chargingTime: ch.charging_time || '',
      voltage: ch.voltage || '',
      connector: ch.connector || '',
      priceText: ch.price_text || 'Liên hệ',
      image: getDirectusAssetUrl(ch.image),
      description: ch.description || '',
      features: ch.features || [],
      quickSpecs: ch.quick_specs || [],
      pillars: ch.pillars || [],
    }));
  }
  return CHARGERS;
}

/**
 * 5. FETCH POSTS
 */
export async function getPosts(): Promise<Post[]> {
  const res = await directusFetch('/items/posts?sort=-published_at');
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map((p: any) => ({
      id: p.slug,
      slug: p.slug,
      title: p.title,
      category: p.category || 'tin-noi-bo',
      categoryName: p.category === 'su-kien' ? 'Tin Sự Kiện' : (p.category === 'uu-dai' ? 'Tin Ưu Đãi' : 'Tin Tức'),
      excerpt: p.excerpt || '',
      content: p.content || '',
      thumbnail: getDirectusAssetUrl(p.thumbnail),
      publishedDate: p.published_at ? new Date(p.published_at).toLocaleDateString('vi-VN') : '',
      author: p.author_name || 'VinFast Phương Đông',
      isFeatured: !!p.is_featured,
    }));
  }
  return POSTS;
}

/**
 * 6. FETCH BANNERS (Hero Slider & Promo Cards)
 */
export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  type: 'hero' | 'promo' | 'service';
  image: string;
  link?: string;
  badge?: string;
  sort: number;
}

const STATIC_HERO_SLIDES: Banner[] = [
  {
    id: 1,
    title: 'Lịch lái thử VinFast Phương Đông tháng 9/2026',
    subtitle: 'Thứ 7 hạnh phúc - Trải nghiệm các dòng xe điện thông minh',
    type: 'hero',
    image: getDirectusAssetUrl('a98e3eba-2bd8-46a5-a84d-106016894ea1'),
    link: '/contact',
    badge: 'Lái Thử',
    sort: 1,
  },
  {
    id: 2,
    title: 'VinFast Phương Đông - Đại Lý Số 1 Miền Bắc',
    subtitle: 'Hệ thống phân phối xe ô tô điện VinFast chính hãng',
    type: 'hero',
    image: getDirectusAssetUrl('4bca56e3-14dc-4fb4-8715-4f42e3dd2ab0'),
    link: '/xe-moi',
    badge: 'Chính Hãng',
    sort: 2,
  },
  {
    id: 3,
    title: 'VinFast Ưu Đãi Tiên Phong Chuyển Đổi Xanh',
    subtitle: 'Hỗ trợ đổi xe xăng sang xe điện lên đến 80 triệu đồng',
    type: 'hero',
    image: getDirectusAssetUrl('6a6510a8-00b2-4ce4-8316-866132332324'),
    link: '/tin-tuc',
    badge: 'Ưu Đãi Lớn',
    sort: 3,
  },
  {
    id: 4,
    title: 'Vinh danh VinFast Phương Đông Club 1000',
    subtitle: 'Top đại lý xuất sắc toàn quốc',
    type: 'hero',
    image: getDirectusAssetUrl('56752840-bc26-4848-97b2-71cac5bad22d'),
    link: '/gioi-thieu',
    badge: 'Vinh Danh',
    sort: 4,
  },
  {
    id: 5,
    title: 'Showroom VinFast Phương Đông Chuẩn 3S',
    subtitle: 'Trải nghiệm dịch vụ 5 sao và không gian hiện đại',
    type: 'hero',
    image: getDirectusAssetUrl('a94f1dfd-7bf8-43c2-9e7f-3ba95214f233'),
    link: '/contact',
    badge: 'Showroom',
    sort: 5,
  },
  {
    id: 6,
    title: 'Bứt Phá Mọi Giới Hạn Cùng VinFast',
    subtitle: 'Công nghệ thông minh - Tương lai xanh bền vững',
    type: 'hero',
    image: getDirectusAssetUrl('4f59fbe3-b8e5-4d62-aaea-3b5cd65ee9be'),
    link: '/xe-moi',
    badge: 'VinFast',
    sort: 6,
  },
  {
    id: 7,
    title: 'Chương Trình Khuyến Mại Tháng Này',
    subtitle: 'Ưu đãi quà tặng và bảo hiểm thân vỏ chính hãng',
    type: 'promo',
    image: getDirectusAssetUrl('4328f5f0-c9f9-4d0d-bab5-94b14b2cfc47'),
    link: '/tin-tuc',
    badge: 'Khuyến Mại',
    sort: 7,
  },
  {
    id: 8,
    title: 'Xưởng Dịch Vụ & Bảo Dưỡng 3S Chính Hãng',
    subtitle: 'Đội ngũ kỹ thuật viên tay nghề cao và phụ tùng chính hãng',
    type: 'service',
    image: getDirectusAssetUrl('fceeb4bd-e264-45ea-952a-9e9ccab19798'),
    link: '/dich-vu',
    badge: 'Dịch Vụ',
    sort: 8,
  },
];

export async function getBanners(type?: 'hero' | 'promo' | 'service'): Promise<Banner[]> {
  const query = type 
    ? `/items/banners?filter[type][_eq]=${type}&filter[status][_eq]=published&sort=sort`
    : '/items/banners?filter[status][_eq]=published&sort=sort';

  const res = await directusFetch(query);
  if (res && Array.isArray(res.data) && res.data.length > 0) {
    return res.data.map((b: any) => ({
      id: b.id,
      title: b.title,
      subtitle: b.subtitle || '',
      type: b.type || 'hero',
      image: getDirectusAssetUrl(b.image),
      link: b.link || '',
      badge: b.badge || '',
      sort: b.sort || 0,
    }));
  }

  return type ? STATIC_HERO_SLIDES.filter((b) => b.type === type) : STATIC_HERO_SLIDES;
}
