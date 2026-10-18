# -*- coding: utf-8 -*-
"""Cập nhật thông số xe theo brochure (public/Brochure) và thêm VF2, VF Wild."""
import re, io
P = "data/vehicles.ts"
s = io.open(P, encoding="utf8").read()

SPECS = {
 "vf3": dict(range="215 km (NEDC)", fastCharge="36 phút (10-70%)", power="40 mã lực (30 kW)", seats=4,
             dimensions="3.190 x 1.679 x 1.652 mm", wheelbase="2.075 mm", groundClearance="175 mm", batteryCapacity="Pin LFP 18,64 kWh"),
 "vf5": dict(range="326 km (NEDC)", power="134 mã lực (100 kW)", seats=5,
             dimensions="3.967 x 1.723 x 1.579 mm", wheelbase="2.514 mm", groundClearance="160 mm", batteryCapacity="37,23 kWh"),
 "vf6": dict(range="485 km (Eco) / 460 km (Plus) – NEDC", fastCharge="25 phút (10-70%)", power="174 – 201 mã lực (130 – 150 kW)",
             dimensions="4.241 x 1.834 x 1.580 mm", wheelbase="2.730 mm", groundClearance="170 mm", batteryCapacity="59,6 kWh"),
 "vf7": dict(range="440 km (Eco – NEDC)", power="174 – 349 mã lực (130 – 260 kW)",
             dimensions="4.545 x 1.890 x 1.635 mm", wheelbase="2.840 mm", groundClearance="190 mm", batteryCapacity="59,6 kWh (Eco) / 70 kWh (Plus)"),
 "vf8": dict(range="562 km (Eco – NEDC) / 457 km (Plus – WLTP)", fastCharge="31 phút (10-70%)", power="201 – 402 mã lực (150 – 300 kW)",
             dimensions="4.750 x 1.934 x 1.667 mm", wheelbase="2.950 mm", groundClearance="162 mm (Eco) / 157 mm (Plus)", batteryCapacity="87,7 kWh"),
 "vf9": dict(range="626 km (Eco) / 602 km (Plus) – WLTP", fastCharge="35 phút (10-70%)", power="402 mã lực (300 kW)",
             dimensions="5.119 x 2.254 x 1.697 mm", wheelbase="3.149 mm", groundClearance="174 mm (Eco) / 184 mm (Plus)", batteryCapacity="123 kWh"),
 "minio-green": dict(range="210 km (NEDC)", fastCharge="34 phút (10-70%)", power="40 mã lực (30 kW)", seats=4,
             dimensions="3.090 x 1.496 x 1.663 mm", wheelbase="2.065 mm", groundClearance="166 mm", batteryCapacity="18,3 kWh"),
 "limo-green": dict(range="450 km (NEDC)", fastCharge="30 phút (10-70%)", power="201 mã lực (150 kW)", seats=7,
             dimensions="4.740 x 1.872 x 1.729 mm", wheelbase="2.840 mm", groundClearance="180 mm", batteryCapacity="60,13 kWh"),
 "ec-van": dict(range="175 km (NEDC)", fastCharge="42 phút (10-70%)", power="40 mã lực (30 kW)", seats=2,
             dimensions="3.767 x 1.680 x 1.790 mm", wheelbase="2.520 mm", groundClearance="165 mm", batteryCapacity="18,3 kWh"),
}

def lit(v): return str(v) if isinstance(v, int) else '"%s"' % v

for vid, kv in SPECS.items():
    m = re.search(r'^    id: "%s",' % re.escape(vid), s, re.M)
    assert m, vid
    j = s.index("specs: {", m.start()); k = s.index("\n    },", j)
    block = s[j:k]
    for key, val in kv.items():
        block, n = re.subn(r'(\n\s+%s: )[^\n]*?,(\n|$)' % key, lambda mm: mm.group(1) + lit(val) + "," + mm.group(2), block, count=1)
        assert n == 1, (vid, key)
    s = s[:j] + block + s[k:]

VF2 = r'''  {
    id: "vf2",
    slug: "vinfast-vf2",
    name: "VinFast VF 2",
    badge: "Mới ra mắt",
    segment: "Mini e-Car Đô Thị",
    tagline: "Ô tô đầu đời – Ước mơ trong tầm với",
    basePrice: 188000000,
    priceText: "Từ 188.000.000 VNĐ",
    priceRangeText: "188.000.000 ₫ (đã bao gồm pin)",
    watermarkText: "VF 2",
    thumbnail: "/images/vehicles/vf2-1.jpg",
    bannerImage: "/images/vehicles/vf2-1.jpg",
    category: "electric-car",
    specs: {
      range: "210 km (NEDC)",
      fastCharge: "34 phút (10-70%)",
      power: "40 mã lực (30 kW)",
      seats: 4,
      dimensions: "3.090 x 1.496 x 1.663 mm",
      wheelbase: "2.065 mm",
      groundClearance: "166 mm",
      batteryCapacity: "18,3 kWh",
      gearbox: "Số tự động (AT)",
      engineType: "Điện",
    },
    colors: [
      { name: "Desat Silver", hex: "#c9ccd1", imageUrl: "/images/vehicles/vf2-1.jpg" },
      { name: "Infinity Blanc", hex: "#f5f5f2", imageUrl: "/images/vehicles/vf2-1.jpg" },
      { name: "Solar Ruby", hex: "#b4232f", imageUrl: "/images/vehicles/vf2-1.jpg" },
      { name: "Pebble Beige", hex: "#d9c3a0", imageUrl: "/images/vehicles/vf2-1.jpg" },
      { name: "Urban Mint", hex: "#9fd6c2", imageUrl: "/images/vehicles/vf2-1.jpg" },
      { name: "Summer Yellow", hex: "#f2c94c", imageUrl: "/images/vehicles/vf2-1.jpg" },
      { name: "Rose Pink", hex: "#f2a7bd", imageUrl: "/images/vehicles/vf2-1.jpg" },
      { name: "Sky Blue", hex: "#8ec5ea", imageUrl: "/images/vehicles/vf2-1.jpg" },
    ],
    galleryThumbnails: [
      "/images/vehicles/vf2-1.jpg",
      "/images/vehicles/vf2-brochure-1.jpg",
      "/images/vehicles/vf2-brochure-2.jpg",
    ],
    sliderPhotos: ["/images/vehicles/vf2-1.jpg", "/images/vehicles/vf2-brochure-1.jpg"],
    lifestyleGallery: ["/images/vehicles/vf2-1.jpg", "/images/vehicles/vf2-brochure-1.jpg"],
    trims: [
      {
        name: "VF 2",
        priceNoBattery: 188000000,
        priceWithBattery: 188000000,
        range: "210 km (NEDC)",
        power: "40 mã lực (30 kW)",
        torque: "65 Nm",
        acceleration: "Tốc độ tối đa 80 km/h",
        driveType: "Cầu sau (RWD)",
        airbags: 1,
        adas: false,
      },
    ],
    commitmentsTitle: "ƯU ĐÃI VINFAST VF 2 TẠI VINFAST PHƯƠNG ĐÔNG",
    commitments: [
      "Giá 188.000.000 VNĐ đã bao gồm pin",
      "Miễn phí sạc 10 lần/tháng tại trạm sạc công cộng V-Green đến 10/02/2029",
      "Hỗ trợ trả góp, thủ tục đăng ký – đăng kiểm trọn gói",
      "Tư vấn & lái thử miễn phí tại hệ thống showroom VinFast Phương Đông",
    ],
    additionalAttributes: [
      { label: "color", value: "Desat Silver, Infinity Blanc, Solar Ruby, Pebble Beige, Urban Mint, Summer Yellow, Rose Pink, Sky Blue" },
      { label: "Phiên bản xe", value: "VF 2" },
      { label: "Brochure", value: "<a href=\"/Brochure/VF2/brochure_vf_2.pdf\" target=\"_blank\">Tải brochure VF 2 (PDF)</a>" },
    ],
    features: [
      "Xe điện đô thị 2 cửa – 4 chỗ, giá chỉ 188 triệu đồng (đã gồm pin)",
      "Quãng đường 210 km/lần sạc (NEDC), sạc nhanh 10-70% trong 34 phút",
      "Đèn pha LED, màn hình thông tin lái 7 inch, móc ghế trẻ em ISOFIX",
      "Túi khí người lái, ABS, EBD, kiểm soát lực kéo TCS",
    ],
  },
'''

WILD = r'''  {
    id: "vf-wild",
    slug: "vinfast-vf-wild",
    name: "VinFast VF Wild",
    badge: "Đặt cọc tiên phong",
    segment: "Bán tải điện REEV",
    tagline: "Chất của người dẫn đầu – Bán tải điện thế hệ mới",
    basePrice: 799000000,
    priceText: "Từ 799.000.000 VNĐ",
    priceRangeText: "Niêm yết 860.000.000 ₫ – 799.000.000 ₫ sau ưu đãi cọc tiên phong",
    watermarkText: "WILD",
    thumbnail: "/images/vehicles/vf-wild-1.jpg",
    bannerImage: "/images/vehicles/vf-wild-1.jpg",
    category: "electric-car",
    specs: {
      range: "Trên 250 km thuần điện (NEDC) – hỗn hợp trên 1.000 km",
      fastCharge: "Dưới 32 phút (10-70%)",
      power: "215 mã lực (160 kW)",
      seats: 5,
      dimensions: "5.376 x 2.069 x 1.873 mm",
      wheelbase: "3.258 mm",
      groundClearance: "222 mm",
      batteryCapacity: "Pin LFP 46,4 kWh",
      gearbox: "Số tự động (AT)",
      engineType: "Điện mở rộng phạm vi (REEV) – máy phát xăng 1.5L",
    },
    colors: [
      { name: "Xám", hex: "#6b7280", imageUrl: "/images/vehicles/vf-wild-1.jpg" },
    ],
    galleryThumbnails: [
      "/images/vehicles/vf-wild-1.jpg",
      "/images/vehicles/vf-wild-brochure-1.jpg",
      "/images/vehicles/vf-wild-brochure-2.jpg",
    ],
    sliderPhotos: ["/images/vehicles/vf-wild-1.jpg", "/images/vehicles/vf-wild-brochure-1.jpg", "/images/vehicles/vf-wild-brochure-2.jpg"],
    lifestyleGallery: ["/images/vehicles/vf-wild-1.jpg", "/images/vehicles/vf-wild-brochure-2.jpg"],
    trims: [
      {
        name: "VF Wild Comfort",
        priceNoBattery: 799000000,
        priceWithBattery: 860000000,
        range: "Trên 250 km thuần điện (NEDC)",
        power: "215 mã lực (160 kW)",
        torque: "280 Nm",
        acceleration: "Đang cập nhật",
        driveType: "Cầu trước (FWD)",
        airbags: 2,
        adas: false,
      },
    ],
    pricingTable: [
      { version: "VF Wild Comfort", originalPrice: "860,000,000 VNĐ", promoPrice: "799,000,000 VNĐ" },
    ],
    commitmentsTitle: "CHÍNH SÁCH VINFAST VF WILD",
    commitments: [
      "Giá ưu đãi cọc tiên phong 799 triệu đồng (niêm yết 860 triệu đồng, gồm VAT) – áp dụng đến hết 06/2027",
      "Miễn phí sạc 20 lần/tháng đến ngày 10/02/2029",
      "Bảo hành xe 6 năm hoặc 150.000 km, bảo hành pin 8 năm hoặc 160.000 km",
      "Tư vấn & lái thử miễn phí tại hệ thống showroom VinFast Phương Đông",
    ],
    additionalAttributes: [
      { label: "Phiên bản xe", value: "VF Wild Comfort" },
      { label: "Thùng hàng / tải trọng", value: "1.574 x 1.512 x 509 mm – 750 kg" },
      { label: "Brochure", value: "<a href=\"/Brochure/WILD/VF%20WILD_Brochure_Trifold_V1%20Report.pdf\" target=\"_blank\">Tải brochure VF Wild (PDF)</a>" },
    ],
    features: [
      "Hệ truyền động REEV: thuần điện trên 250 km, quãng đường hỗn hợp trên 1.000 km",
      "Thùng hàng 1.574 x 1.512 x 509 mm, tải trọng 750 kg, cửa thùng trợ lực khí nén",
      "V2L – cấp điện ngược cho thiết bị bên ngoài khi làm việc & cắm trại",
      "Màn hình 10 inch, Android Auto & Apple CarPlay không dây, camera sau",
    ],
  },
'''

# VF2 đứng đầu danh sách, VF Wild sau VF9
s = s.replace("export const VEHICLES: Vehicle[] = [\n", "export const VEHICLES: Vehicle[] = [\n" + VF2, 1)
i = s.index("{\n    id: \"minio-green\""); start = i
s = s[:start] + WILD + s[start:]
io.open(P, "w", encoding="utf8", newline="\n").write(s)
print("OK")
