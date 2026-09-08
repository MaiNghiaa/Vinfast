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
  priceRangeText?: string; // e.g. "278.000.000 ₫ – 296.000.000 ₫"
  watermarkText?: string; // e.g. "VF 3"
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
    gearbox?: string;
    engineType?: string;
  };
  colors: VehicleColor[];
  trims: VehicleTrim[];
  features: string[];
  isFeatured?: boolean;
  category: "electric-car" | "green-mobility" | "commercial";

  // Rich detail fields matching VinFast Thịnh Cường 1:1
  galleryThumbnails?: string[];
  commitmentsTitle?: string;
  commitments?: string[];
  pricingTable?: {
    version: string;
    originalPrice: string;
    promoPrice: string;
  }[];
  comparisonTable?: {
    model: string;
    features: string[];
    std1: string;
    std2: string;
  }[];
  monthlyOffer?: string;
  sliderPhotos?: string[];
  exteriorData?: {
    intro: string[];
    bannerImg: string;
    items: {
      title: string;
      img: string;
      desc: string;
    }[];
  };
  interiorData?: {
    intro: string[];
    bannerImg: string;
    items: {
      title: string;
      img: string;
      desc: string;
    }[];
  };
  safetyTech?: {
    title: string;
    items: {
      title: string;
      img: string;
    }[];
  };
  reviewVideo?: {
    title: string;
    bgImg: string;
    videoUrl: string;
  };
  lifestyleGallery?: string[];
  relatedNews?: {
    id: string;
    title: string;
    dateDay: string;
    dateMonth: string;
    comments: number;
    categories: string;
    excerpt: string;
    img: string;
    slug: string;
  }[];
  additionalAttributes?: {
    label: string;
    value: string;
  }[];
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

export interface ChargerSpecItem {
  label: string;
  value: string;
}

export interface ChargerPillar {
  number: number;
  title: string;
  subtitle?: string;
  desc?: string;
  bullets?: string[];
  concludingText?: string;
}

export interface ChargerNewsItem {
  id: string;
  title: string;
  image: string;
  slug: string;
  category: string;
}

export interface Charger {
  id: string;
  slug: string;
  name: string;
  categoryName: string; // e.g. "Trạm sạc nhanh DC" | "Trạm sạc gia đình AC"
  type: "AC" | "DC";
  power: string;
  chargingTime: string;
  voltage: string;
  connector: string;
  priceText: string;
  image: string;
  description: string;
  features: string[];

  // Rich detail fields matching VinFast Thịnh Cường 1:1
  quickSpecs: ChargerSpecItem[];
  introParagraph?: string;
  pillars?: ChargerPillar[];
  relatedNews?: ChargerNewsItem[];
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

export interface UsedCar {
  id: string;
  slug: string;
  name: string;
  priceText: string;
  priceNumber?: number;
  model: string;
  version: string;
  year: number;
  odo: string;
  odoKm: number;
  exteriorColor: string;
  interiorColor: string;
  seats: number;
  trunkCapacity: string;
  rangeNedc: string;
  battery: string;
  carCondition: string;
  allocatedTo: string;
  documentStatus: string;
  carStatus: string;
  image: string;
  galleryImages: string[];
  vehicleType: "electric" | "gasoline" | "commercial";
  province?: string;
  notes?: string[];
}
