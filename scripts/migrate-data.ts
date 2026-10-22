// scripts/migrate-data.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { directusJson, uploadImageFromUrl } from './directus-client.mjs';
import { SHOWROOMS, HEADQUARTERS } from '../data/showrooms';
import { VEHICLES } from '../data/vehicles';
import { USED_CARS } from '../data/usedCars';
import { CHARGERS, CHARGER_PROJECTS } from '../data/chargers';
import { POSTS } from '../data/news';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function buildFilter(filterObj: any): string {
  return `?filter=${encodeURIComponent(JSON.stringify(filterObj))}`;
}

async function findOrInsert(collection: string, uniqueField: string, uniqueValue: any, data: any) {
  const filterJson = JSON.stringify({ [uniqueField]: { _eq: uniqueValue } });
  const query = `?filter=${encodeURIComponent(filterJson)}`;
  const existing = await directusJson(`/items/${collection}${query}`);
  if (existing.data && existing.data.length > 0) {
    const id = existing.data[0].id;
    await directusJson(`/items/${collection}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return id;
  } else {
    const created = await directusJson(`/items/${collection}`, {
      method: 'POST',
      body: JSON.stringify({ [uniqueField]: uniqueValue, ...data }),
    });
    return created.data.id;
  }
}

async function migrateSiteSettings() {
  console.log('\n--- 1. MIGRATE SITE SETTINGS ---');
  const payload = {
    company_name: HEADQUARTERS.name || 'Công Ty Cổ Phần Phương Đông',
    company_name_en: 'Phuong Dong Joint Stock Company - Official VinFast Dealer',
    hq_address: HEADQUARTERS.address || 'Hà Nội, Việt Nam',
    hq_address_en: 'Hanoi, Vietnam',
    hotline: HEADQUARTERS.hotline || '090 242 25 22',
    email: HEADQUARTERS.email || 'vinfastphuongdong.auto@gmail.com',
    sales_hours: HEADQUARTERS.salesHours || '08:00 - 18:00',
    service_hours: HEADQUARTERS.serviceHours || '08:00 - 17:30',
    insurance_note: HEADQUARTERS.insuranceNote || '',
    social_links: [
      { platform: 'Zalo', url: 'https://zalo.me/0902422522' },
      { platform: 'Facebook', url: 'https://facebook.com/vinfastphuongdong' },
      { platform: 'Hotline', url: 'tel:0902422522' },
    ],
    default_seo_title: 'VinFast Phương Đông - Đại Lý Ô Tô Điện VinFast Chính Hãng',
    default_seo_description: 'Đại lý VinFast Phương Đông phân phối đầy đủ xe điện VF 3, VF 5, VF 6, VF 7, VF 8, VF 9, xưởng dịch vụ 3S chính hãng.',
    consent_text: 'Tôi đồng ý để VinFast Phương Đông liên hệ tư vấn và xử lý dữ liệu cá nhân theo chính sách bảo vệ quyền riêng tư.',
    consent_text_en: 'I agree to allow VinFast Phuong Dong to contact me and process personal data in accordance with privacy policy.',
  };

  try {
    await directusJson('/items/site_settings', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (e) {
    // Singleton may already exist -> patch
    await directusJson('/items/site_settings', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  }
  console.log('✔ Đã cập nhật site_settings (kèm song ngữ EN)');
}

const showroomMap: Record<string, number> = {};

async function migrateShowrooms() {
  console.log('\n--- 2. MIGRATE SHOWROOMS ---');
  for (let i = 0; i < SHOWROOMS.length; i++) {
    const sr = SHOWROOMS[i];
    console.log(`Migrating showroom: ${sr.name}`);
    const imageId = sr.image ? await uploadImageFromUrl(sr.image, 'showrooms', sr.name) : null;

    const data = {
      code: sr.code || `SR-${sr.id.toUpperCase()}`,
      slug: sr.id,
      name: sr.name,
      name_en: sr.name.replace('VinFast ', 'VinFast Showroom '),
      type: sr.type === '3S' ? '3S' : sr.type.toLowerCase(),
      province: sr.province,
      address: sr.address,
      address_en: sr.address,
      hotline_sales: sr.hotlineSales,
      hotline_service: sr.hotlineService,
      hours_sales: sr.workingHoursSales,
      hours_service: sr.workingHoursService,
      map_url: sr.mapUrl || '',
      image: imageId,
      status: 'published',
      sort: i + 1,
    };

    const id = await findOrInsert('showrooms', 'slug', sr.id, data);
    showroomMap[sr.id] = id;
    console.log(`✔ Showroom ${sr.name} -> ID ${id}`);
  }
}

async function migrateVehicles() {
  console.log('\n--- 3. MIGRATE VEHICLES, TRIMS, COLORS, SECTIONS, GALLERY & PRICES ---');
  for (let vIdx = 0; vIdx < VEHICLES.length; vIdx++) {
    const v = VEHICLES[vIdx];
    console.log(`\n================== [Xe ${vIdx + 1}/${VEHICLES.length}] ${v.name} ==================`);

    // 1. Upload main assets
    const thumbnailId = v.thumbnail ? await uploadImageFromUrl(v.thumbnail, 'vehicles', `${v.name} - Thumbnail`) : null;
    const bannerId = v.bannerImage ? await uploadImageFromUrl(v.bannerImage, 'vehicles', `${v.name} - Banner`) : null;
    const videoBgId = v.reviewVideo?.bgImg ? await uploadImageFromUrl(v.reviewVideo.bgImg, 'vehicles', `${v.name} - Video BG`) : null;

    // 2. Parse specs
    const dimMatch = v.specs.dimensions?.match(/([\d.]+)\s*x\s*([\d.]+)\s*x\s*([\d.]+)/);
    const length_mm = dimMatch ? parseInt(dimMatch[1].replace(/\./g, '')) : null;
    const width_mm = dimMatch ? parseInt(dimMatch[2].replace(/\./g, '')) : null;
    const height_mm = dimMatch ? parseInt(dimMatch[3].replace(/\./g, '')) : null;

    const wheelbaseMatch = v.specs.wheelbase?.match(/\d+/);
    const wheelbase_mm = wheelbaseMatch ? parseInt(wheelbaseMatch[0]) : null;

    const gcMatch = v.specs.groundClearance?.match(/\d+/);
    const ground_clearance_mm = gcMatch ? parseInt(gcMatch[0]) : null;

    const batMatch = v.specs.batteryCapacity?.match(/([\d,.]+)\s*kWh/i);
    const battery_kwh = batMatch ? parseFloat(batMatch[1].replace(',', '.')) : null;

    const rangeMatch = v.specs.range?.match(/\d+/);
    const range_km = rangeMatch ? parseInt(rangeMatch[0]) : null;

    const fcMatch = v.specs.fastCharge?.match(/\d+/);
    const fast_charge_minutes = fcMatch ? parseInt(fcMatch[0]) : null;

    const powerMatch = v.specs.power?.match(/\d+/);
    const power_hp = powerMatch ? parseInt(powerMatch[0]) : null;

    const vehicleData = {
      slug: v.slug,
      name: v.name,
      category: v.category || 'electric-car',
      segment: v.segment || 'SUV',
      badge: v.badge || '',
      badge_en: v.badge === 'Mới ra mắt' ? 'New Arrival' : (v.badge === 'Bán chạy nhất' ? 'Best Seller' : (v.badge || '')),
      tagline: v.tagline || '',
      tagline_en: v.tagline || '',
      watermark_text: v.watermarkText || '',
      thumbnail: thumbnailId,
      banner_image: bannerId,
      is_featured: !!v.isFeatured,
      // Specs
      range_km,
      range_standard: 'NEDC',
      fast_charge_minutes,
      fast_charge_text: v.specs.fastCharge || '',
      power_hp,
      seats: v.specs.seats || 5,
      length_mm,
      width_mm,
      height_mm,
      wheelbase_mm,
      ground_clearance_mm,
      battery_kwh,
      battery_type: v.specs.batteryCapacity || 'LFP',
      gearbox: v.specs.gearbox || 'Số tự động (AT)',
      engine_type: v.specs.engineType || 'Điện',
      // Details
      exterior_subtitle: v.exteriorData?.subtitle || '',
      exterior_subtitle_en: v.exteriorData?.subtitle || '',
      exterior_intro: v.exteriorData?.intro || [],
      exterior_intro_en: v.exteriorData?.intro || [],
      interior_subtitle: v.interiorData?.subtitle || '',
      interior_subtitle_en: v.interiorData?.subtitle || '',
      interior_intro: v.interiorData?.intro || [],
      interior_intro_en: v.interiorData?.intro || [],
      safety_title: v.safetyTech?.title || 'Công Nghệ An Toàn Vượt Trội',
      safety_title_en: 'Advanced Safety Technologies',
      review_video_title: v.reviewVideo?.title || '',
      review_video_url: v.reviewVideo?.videoUrl || '',
      review_video_bg: videoBgId,
      features: v.features || [],
      features_en: v.features || [],
      comparison_table: v.comparisonTable || [],
      additional_attributes: v.additionalAttributes || [],
      share_to_sales: true,
      status: 'published',
      sort: vIdx + 1,
      seo_title: `${v.name} - Giá xe & Thông số kỹ thuật | VinFast Phương Đông`,
      seo_title_en: `${v.name} - Specifications & Pricing | VinFast Phuong Dong`,
      seo_description: v.tagline || `${v.name} chính hãng tại VinFast Phương Đông`,
    };

    const vehicleId = await findOrInsert('vehicles', 'slug', v.slug, vehicleData);
    console.log(`✔ Xe ${v.name} -> ID ${vehicleId}`);

    // 3. Trims & Price Lists
    if (v.trims && v.trims.length > 0) {
      for (let tIdx = 0; tIdx < v.trims.length; tIdx++) {
        const trim = v.trims[tIdx];
        const trimRange = trim.range ? parseInt(trim.range.match(/\d+/)?.[0] || '0') : null;
        const trimPower = trim.power ? parseInt(trim.power.match(/\d+/)?.[0] || '0') : null;
        const trimTorque = trim.torque ? parseInt(trim.torque.match(/\d+/)?.[0] || '0') : null;

        const trimData = {
          vehicle: vehicleId,
          name: trim.name,
          model_year: 2026,
          range_km: trimRange,
          power_hp: trimPower,
          torque_nm: trimTorque,
          acceleration_text: trim.acceleration || '',
          drive_type: trim.driveType?.includes('AWD') ? 'AWD' : (trim.driveType?.includes('RWD') ? 'RWD' : 'FWD'),
          airbags: trim.airbags || 1,
          has_adas: !!trim.adas,
          equipment_highlights: [trim.range, trim.power, trim.acceleration, trim.driveType].filter(Boolean),
          equipment_highlights_en: [trim.range, trim.power, trim.acceleration, trim.driveType].filter(Boolean),
          status: 'published',
          sort: tIdx + 1,
        };

        // Query trim by vehicle and name
        const trimQuery = buildFilter({ vehicle: { _eq: vehicleId }, name: { _eq: trim.name } });
        const existTrim = await directusJson(`/items/vehicle_trims${trimQuery}`);
        let trimId: number;
        if (existTrim.data && existTrim.data.length > 0) {
          trimId = existTrim.data[0].id;
          await directusJson(`/items/vehicle_trims/${trimId}`, { method: 'PATCH', body: JSON.stringify(trimData) });
        } else {
          const createdTrim = await directusJson('/items/vehicle_trims', { method: 'POST', body: JSON.stringify(trimData) });
          trimId = createdTrim.data.id;
        }

        // Price list for this trim
        const listPrice = trim.priceWithBattery || trim.priceNoBattery || v.basePrice;
        const priceData = {
          trim: trimId,
          list_price: listPrice,
          promo_price: listPrice,
          price_with_battery: trim.priceWithBattery || null,
          price_without_battery: trim.priceNoBattery || null,
          effective_from: '2026-09-01',
          status: 'active',
          reference_doc: 'Bảng giá VinFast T09/2026',
        };

        const priceQuery = buildFilter({ trim: { _eq: trimId }, status: { _eq: 'active' } });
        const existPrice = await directusJson(`/items/price_lists${priceQuery}`);
        if (!existPrice.data || existPrice.data.length === 0) {
          await directusJson('/items/price_lists', { method: 'POST', body: JSON.stringify(priceData) });
        }
      }
      console.log(`  ✔ Đã lưu ${v.trims.length} phiên bản trims & biểu giá`);
    }

    // 4. Colors
    if (v.colors && v.colors.length > 0) {
      for (let cIdx = 0; cIdx < v.colors.length; cIdx++) {
        const c = v.colors[cIdx];
        const colorImgId = c.imageUrl ? await uploadImageFromUrl(c.imageUrl, 'vehicles', `${v.name} - Màu ${c.name}`) : null;
        const colorData = {
          vehicle: vehicleId,
          name: c.name,
          name_en: c.name,
          hex: c.hex,
          kind: 'exterior',
          image: colorImgId,
          sort: cIdx + 1,
        };
        const colorQuery = buildFilter({ vehicle: { _eq: vehicleId }, name: { _eq: c.name } });
        const existColor = await directusJson(`/items/vehicle_colors${colorQuery}`);
        if (existColor.data && existColor.data.length > 0) {
          await directusJson(`/items/vehicle_colors/${existColor.data[0].id}`, { method: 'PATCH', body: JSON.stringify(colorData) });
        } else {
          await directusJson('/items/vehicle_colors', { method: 'POST', body: JSON.stringify(colorData) });
        }
      }
      console.log(`  ✔ Đã lưu ${v.colors.length} màu sắc`);
    }

    // 5. Sections (Exterior, Interior, Safety)
    const sectionsToInsert: any[] = [];
    if (v.exteriorData?.items) {
      for (const item of v.exteriorData.items) {
        sectionsToInsert.push({ section: 'exterior', title: item.title, subtitle: item.subtitle || '', description: item.desc, img: item.img });
      }
    }
    if (v.interiorData?.items) {
      for (const item of v.interiorData.items) {
        sectionsToInsert.push({ section: 'interior', title: item.title, subtitle: item.subtitle || '', description: item.desc, img: item.img });
      }
    }
    if (v.safetyTech?.items) {
      for (const item of v.safetyTech.items) {
        sectionsToInsert.push({ section: 'safety', title: item.title, subtitle: '', description: '', img: item.img });
      }
    }

    for (let sIdx = 0; sIdx < sectionsToInsert.length; sIdx++) {
      const s = sectionsToInsert[sIdx];
      const sImgId = s.img ? await uploadImageFromUrl(s.img, 'vehicles', `${v.name} - ${s.title}`) : null;
      const secData = {
        vehicle: vehicleId,
        section: s.section,
        title: s.title,
        title_en: s.title,
        subtitle: s.subtitle,
        description: s.description,
        description_en: s.description,
        image: sImgId,
        sort: sIdx + 1,
      };

      const secQuery = buildFilter({ vehicle: { _eq: vehicleId }, title: { _eq: s.title } });
      const existSec = await directusJson(`/items/vehicle_sections${secQuery}`);
      if (!existSec.data || existSec.data.length === 0) {
        await directusJson('/items/vehicle_sections', { method: 'POST', body: JSON.stringify(secData) });
      }
    }
    if (sectionsToInsert.length > 0) {
      console.log(`  ✔ Đã lưu ${sectionsToInsert.length} khối nội thất/ngoại thất/an toàn`);
    }

    // 6. Gallery Files
    const galleryItems = [
      ...(v.galleryThumbnails || []).map((url) => ({ url, group: 'thumbnail' })),
      ...(v.sliderPhotos || []).map((url) => ({ url, group: 'slider' })),
      ...(v.lifestyleGallery || []).map((url) => ({ url, group: 'lifestyle' })),
    ];

    for (let gIdx = 0; gIdx < galleryItems.length; gIdx++) {
      const g = galleryItems[gIdx];
      const gFileId = await uploadImageFromUrl(g.url, 'vehicles', `${v.name} Gallery ${g.group} ${gIdx + 1}`);
      if (gFileId) {
        const gQuery = buildFilter({ vehicles_id: { _eq: vehicleId }, directus_files_id: { _eq: gFileId } });
        const existG = await directusJson(`/items/vehicles_files${gQuery}`);
        if (!existG.data || existG.data.length === 0) {
          await directusJson('/items/vehicles_files', {
            method: 'POST',
            body: JSON.stringify({
              vehicles_id: vehicleId,
              directus_files_id: gFileId,
              group: g.group,
              sort: gIdx + 1,
            }),
          });
        }
      }
    }

    // 7. Promotions & Commitments
    if (v.commitments || v.monthlyOffer) {
      const promoData = {
        title: v.commitmentsTitle || `Ưu đãi & Cam kết giá xe ${v.name}`,
        title_en: `Exclusive Offers & Commitments for ${v.name}`,
        slug: `uu-dai-${v.slug}`,
        summary: v.monthlyOffer || '',
        summary_en: v.monthlyOffer || '',
        benefits: v.commitments || [],
        benefits_en: v.commitments || [],
        valid_from: '2026-09-01',
        valid_to: '2026-09-30',
        share_to_sales: true,
        status: 'published',
      };
      const promoId = await findOrInsert('promotions', 'slug', `uu-dai-${v.slug}`, promoData);

      // Link to vehicle in promotions_vehicles
      const pvQuery = buildFilter({ promotions_id: { _eq: promoId }, vehicles_id: { _eq: vehicleId } });
      const existPV = await directusJson(`/items/promotions_vehicles${pvQuery}`);
      if (!existPV.data || existPV.data.length === 0) {
        await directusJson('/items/promotions_vehicles', {
          method: 'POST',
          body: JSON.stringify({ promotions_id: promoId, vehicles_id: vehicleId }),
        });
      }
    }
  }
}

async function migrateUsedCars() {
  console.log('\n--- 4. MIGRATE USED CARS ---');
  for (let uIdx = 0; uIdx < USED_CARS.length; uIdx++) {
    const car = USED_CARS[uIdx];
    console.log(`Migrating used car: ${car.name}`);
    const thumbId = car.image ? await uploadImageFromUrl(car.image, 'used-cars', `${car.name} - Thumbnail`) : null;

    const data = {
      slug: car.slug,
      title: car.name,
      title_en: car.name,
      vehicle_type: car.vehicleType || 'electric',
      year: car.year || 2023,
      odo_km: car.odoKm || (parseInt(car.odo) * 1000) || 10000,
      price: car.priceNumber || 0,
      exterior_color: car.exteriorColor || '',
      interior_color: car.interiorColor || '',
      seats: car.seats || 5,
      trunk_capacity: car.trunkCapacity || '',
      range_text: car.rangeNedc || '',
      battery_ownership: car.battery?.toLowerCase().includes('thuê') ? 'rent' : 'owned',
      battery_soh: 96,
      condition: car.carCondition || 'Xuất sắc',
      condition_en: 'Excellent condition',
      document_status: car.documentStatus || 'Đầy đủ, pháp lý chuẩn',
      document_status_en: 'Fully certified, legal documents ready',
      sale_status: 'available',
      province: car.province || 'Hà Nội',
      thumbnail: thumbId,
      notes: car.notes || [],
      notes_en: car.notes || [],
      plate_number: `30K-${Math.floor(10000 + Math.random() * 90000)}`,
      vin: `VF82023VN${Math.floor(100000 + Math.random() * 900000)}`,
      purchase_price: car.priceNumber ? Math.floor(car.priceNumber * 0.9) : 0,
      internal_note: 'Đã kiểm định 139 bước kỹ thuật Green Future',
      share_to_sales: true,
      status: 'published',
      sort: uIdx + 1,
    };

    const carId = await findOrInsert('used_cars', 'slug', car.slug, data);

    // Gallery
    if (car.galleryImages && car.galleryImages.length > 0) {
      for (let gIdx = 0; gIdx < car.galleryImages.length; gIdx++) {
        const gUrl = car.galleryImages[gIdx];
        const gFileId = await uploadImageFromUrl(gUrl, 'used-cars', `${car.name} Gallery ${gIdx + 1}`);
        if (gFileId) {
          const gQuery = buildFilter({ used_cars_id: { _eq: carId }, directus_files_id: { _eq: gFileId } });
          const existG = await directusJson(`/items/used_cars_files${gQuery}`);
          if (!existG.data || existG.data.length === 0) {
            await directusJson('/items/used_cars_files', {
              method: 'POST',
              body: JSON.stringify({ used_cars_id: carId, directus_files_id: gFileId, sort: gIdx + 1 }),
            });
          }
        }
      }
    }
    console.log(`✔ Xe cũ ${car.name} -> ID ${carId}`);
  }
}

async function migrateChargers() {
  console.log('\n--- 5. MIGRATE CHARGERS & PROJECTS ---');
  // Upload projects first
  const projectItems = [];
  for (const p of CHARGER_PROJECTS) {
    const pImgId = await uploadImageFromUrl(p.image, 'chargers', p.name);
    projectItems.push({ id: p.id, name: p.name, image: pImgId });
  }

  for (let cIdx = 0; cIdx < CHARGERS.length; cIdx++) {
    const ch = CHARGERS[cIdx];
    console.log(`Migrating charger: ${ch.name}`);
    const imgId = ch.image ? await uploadImageFromUrl(ch.image, 'chargers', ch.name) : null;

    const powerNum = ch.power?.match(/([\d.]+)/)?.[1];

    const data = {
      slug: ch.slug,
      name: ch.name,
      name_en: ch.name.replace('Trạm sạc', 'Charging Station'),
      category_name: ch.categoryName,
      type: ch.type,
      power_kw: powerNum ? parseFloat(powerNum) : 60,
      power_text: ch.power,
      charging_time: ch.chargingTime,
      voltage: ch.voltage,
      connector: ch.connector,
      price_text: ch.priceText,
      image: imgId,
      description: ch.description,
      description_en: ch.description,
      features: ch.features || [],
      features_en: ch.features || [],
      quick_specs: ch.quickSpecs || [],
      quick_specs_en: ch.quickSpecs || [],
      pillars: ch.pillars || [],
      pillars_en: ch.pillars || [],
      projects: projectItems,
      status: 'published',
      sort: cIdx + 1,
    };

    const id = await findOrInsert('chargers', 'slug', ch.slug, data);
    console.log(`✔ Trạm sạc ${ch.name} -> ID ${id}`);
  }
}

function parseDateToIso(dateStr?: string): string {
  if (!dateStr) return new Date().toISOString();
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${year}-${month}-${day}T08:00:00.000Z`;
  }
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch {}
  return new Date().toISOString();
}

async function migratePosts() {
  console.log('\n--- 6. MIGRATE POSTS ---');
  for (let pIdx = 0; pIdx < POSTS.length; pIdx++) {
    const p = POSTS[pIdx];
    console.log(`Migrating post: ${p.title}`);
    const thumbId = p.thumbnail ? await uploadImageFromUrl(p.thumbnail, 'posts', p.title) : null;

    const data = {
      slug: p.slug,
      title: p.title,
      title_en: p.title,
      category: p.category,
      excerpt: p.excerpt || '',
      excerpt_en: p.excerpt || '',
      content: p.content,
      thumbnail: thumbId,
      published_at: parseDateToIso(p.publishedDate),
      author_name: p.author || 'VinFast Phương Đông',
      is_featured: !!p.isFeatured,
      reading_minutes: 4,
      share_to_sales: 'excerpt',
      status: 'published',
    };

    const id = await findOrInsert('posts', 'slug', p.slug, data);
    console.log(`✔ Bài viết ${p.title.slice(0, 30)}... -> ID ${id}`);
  }
}

async function seedServicesAndAccessories() {
  console.log('\n--- 7. SEED SERVICES & ACCESSORIES ---');
  // Services
  const servicesData = [
    {
      slug: 'bao-duong-dinh-ky',
      title: 'Bảo Dưỡng Định Kỳ VinFast',
      title_en: 'VinFast Scheduled Maintenance',
      group: 'maintenance',
      summary: 'Quy trình bảo dưỡng tiêu chuẩn chính hãng đảm bảo xe luôn hoạt động an toàn và êm ái.',
      summary_en: 'Genuine standard maintenance procedure ensuring your vehicle always operates safely and smoothly.',
      maintenance_levels: [
        { level: 'Cấp 1', km: '12.000 km', months: '12 tháng', items: ['Kiểm tra hệ thống phanh', 'Kiểm tra lốp', 'Cập nhật phần mềm ECU'] },
        { level: 'Cấp 2', km: '24.000 km', months: '24 tháng', items: ['Thay lọc gió điều hòa', 'Bảo dưỡng phanh 4 bánh', 'Kiểm tra hệ thống làm mát pin'] },
        { level: 'Cấp 3', km: '48.000 km', months: '48 tháng', items: ['Thay dầu phanh', 'Kiểm tra gầm và rô-tuyn', 'Kiểm tra độ suy giảm pin SOH'] },
      ],
      insurance_partners: ['Bảo Việt', 'PJICO', 'PVI', 'MIC', 'Bảo Minh'],
      status: 'published',
      sort: 1,
    },
    {
      slug: 'dong-son-chinh-hang',
      title: 'Đồng Sơn Công Nghệ Cao',
      title_en: 'High-Tech Body & Paint Service',
      group: 'body_paint',
      summary: 'Phòng sơn sấy khép kín, màu sơn chuẩn nhà máy VinFast, hoàn thiện như mới.',
      summary_en: 'Enclosed baking paint booth with genuine VinFast factory colors, restoring your car like new.',
      status: 'published',
      sort: 2,
    },
    {
      slug: 'sua-chua-nhanh',
      title: 'Sửa Chữa Nhanh & Lưu Động',
      title_en: 'Express & Mobile Repair Service',
      group: 'repair',
      summary: 'Đội ngũ kỹ thuật viên cơ động hỗ trợ xử lý sự cố tận nơi 24/7.',
      summary_en: 'Mobile technician team handling emergency repairs on-site 24/7.',
      status: 'published',
      sort: 3,
    },
  ];

  for (const s of servicesData) {
    await findOrInsert('services', 'slug', s.slug, s);
  }
  console.log('✔ Đã seed danh mục Dịch vụ bảo dưỡng');

  // Accessories
  const accData = [
    {
      slug: 'bo-sac-di-dong-vinfast-3-5kw',
      name: 'Bộ Sạc Di Động VinFast Chính Hãng 3.5kW',
      name_en: 'VinFast Genuine Portable Charger 3.5kW',
      category: 'Sạc & điện',
      compatible_models: ['vinfast-vf3', 'vinfast-vf5', 'vinfast-vf6', 'vinfast-vf7', 'vinfast-vf8', 'vinfast-vf9'],
      price: 5500000,
      price_text: '5.500.000 VNĐ',
      description: 'Sạc di động cắm điện lưới gia đình 220V, chuẩn an toàn IP67, bảo vệ quá dòng.',
      description_en: 'Portable charger for 220V home outlet, IP67 waterproof protection, overcurrent safety.',
      warranty_text: 'Bảo hành 2 năm chính hãng',
      status: 'published',
      sort: 1,
    },
    {
      slug: 'tham-lot-san-tran-vien-cao-cap',
      name: 'Thảm Lót Sàn Tràn Viền TPV Đúc Khuôn',
      name_en: 'Custom-Fit TPV All-Weather Floor Mats',
      category: 'Nội thất',
      compatible_models: ['vinfast-vf3', 'vinfast-vf5', 'vinfast-vf6', 'vinfast-vf8'],
      price: 1800000,
      price_text: '1.800.000 VNĐ',
      description: 'Chất liệu nhựa TPV nguyên sinh không mùi, chống nước tuyệt đối, dễ vệ sinh.',
      description_en: 'Odorless TPV material, 100% waterproof, easy to clean.',
      warranty_text: 'Bảo hành 3 năm',
      status: 'published',
      sort: 2,
    },
  ];

  for (const a of accData) {
    await findOrInsert('accessories', 'slug', a.slug, a);
  }
  console.log('✔ Đã seed Phụ kiện chính hãng');
}

async function main() {
  console.log('====================================================');
  console.log('🚀 BẮT ĐẦU MIGRATE DỮ LIỆU SANG DIRECTUS CMS (SONG NGỮ)');
  console.log('====================================================');

  await migrateSiteSettings();
  await migrateShowrooms();
  await migrateVehicles();
  await migrateUsedCars();
  await migrateChargers();
  await migratePosts();
  await seedServicesAndAccessories();

  console.log('\n====================================================');
  console.log('🎉 TOÀN BỘ DỮ LIỆU ĐÃ ĐƯỢC MIGRATE THÀNH CÔNG VÀO DIRECTUS!');
  console.log('====================================================');
}

main().catch((err) => {
  console.error('Lỗi khi migrate dữ liệu:', err);
  process.exit(1);
});
