export interface VehicleColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface VehicleTrim {
  name: string;
  priceNoBattery: number; // in VND
  priceWithBattery: number; // in VND
  range: string; // e.g. "450 km (NEDC)"
  power: string; // e.g. "402 HP"
  torque: string; // e.g. "620 Nm"
  acceleration: string; // e.g. "5.5s (0-100 km/h)"
  driveType: string; // e.g. "AWD (2 cầu toàn thời gian)"
  airbags: number;
  adas: boolean;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  badge?: string; // e.g. "Mới ra mắt", "Bán chạy nhất"
  segment: string; // e.g. "A-SUV", "D-SUV", "E-SUV", "MPV 7 chỗ", "Xe tải van"
  tagline: string;
  basePrice: number; // in VND
  priceText: string; // e.g. "Từ 458.000.000 VNĐ"
  thumbnail: string;
  bannerImage: string;
  specs: {
    range: string;
    fastCharge: string;
    power: string;
    seats: number;
    dimensions: string; // D x R x C (mm)
    wheelbase: string; // mm
    groundClearance: string; // mm
    batteryCapacity: string; // kWh
  };
  colors: VehicleColor[];
  trims: VehicleTrim[];
  features: string[];
  isFeatured?: boolean;
  category: "electric-car" | "green-mobility" | "commercial";
}

export interface Showroom {
  id: string;
  name: string;
  type: "3S" | "Showroom" | "Workshop";
  province: "Hà Nội" | "Quảng Ninh" | "Vĩnh Phúc" | "TP. Hồ Chí Minh" | "Tuyên Quang";
  address: string;
  hotlineSales: string;
  hotlineService: string;
  workingHoursSales: string;
  workingHoursService: string;
  mapUrl?: string;
  image?: string;
}

export interface Charger {
  id: string;
  slug: string;
  name: string;
  type: "AC" | "DC";
  power: string;
  chargingTime: string;
  voltage: string;
  connector: string;
  priceText: string;
  image: string;
  description: string;
  features: string[];
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  category: "uu-dai" | "tin-noi-bo" | "su-kien" | "danh-gia-xe";
  categoryName: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  publishedDate: string;
  author: string;
  isFeatured?: boolean;
}
