"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mulish } from "next/font/google";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import NewsSection from "@/components/NewsSection";

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  image: string;
}

const DC_PRODUCTS: ProductItem[] = [
  {
    id: "dc-60kw",
    slug: "tram-sac-nhanh-dc-60kw",
    name: "Trạm sạc VinFast nhanh DC 60kW",
    category: "Trạm sạc nhanh DC",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/tram-sac-vinfast-60kw.png",
  },
  {
    id: "dc-120kw",
    slug: "tram-sac-nhanh-dc-120kw",
    name: "Trạm sạc nhanh DC 120kW",
    category: "Trạm sạc nhanh DC",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/60kw-1.png",
  },
  {
    id: "dc-30kw",
    slug: "tram-sac-nhanh-dc-30kw",
    name: "Trạm sạc nhanh DC 30kW",
    category: "Trạm sạc nhanh DC",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/sachjj.jpg",
  },
];

const AC_PRODUCTS: ProductItem[] = [
  {
    id: "ac-7kw",
    slug: "tram-sac-nhanh-ac-7-4-kw",
    name: "Trạm sạc VinFast treo tường AC 7.4kW",
    category: "Trạm sạc gia đình AC",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/pin-tramsac-11_1660273822-300x235.png",
  },
  {
    id: "ac-11kw",
    slug: "tram-sac-nhanh-ac-11kw",
    name: "Trạm sạc VinFast AC 11kW",
    category: "Trạm sạc doanh nghiệp AC",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/pin-tramsac-8_1660273763-300x122.png",
  },
  {
    id: "ac-22kw",
    slug: "tram-sac-nhanh-ac-22-kw",
    name: "Trạm sạc VinFast trụ đứng AC 22kW",
    category: "Trạm sạc công cộng AC",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/tram-sac-vinfast-60kw.png",
  },
];

interface ProjectItem {
  id: string;
  name: string;
  image: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "dai-phuc-sinh",
    name: "TRẠM SẠC VINFAST ĐẠI PHÚC SINH",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/02/tram-sac-vinfast-dai-phuc-sinh-1-1-1024x1024.jpg",
  },
  {
    id: "dich-qua",
    name: "TRẠM SẠC VINFAST ĐỊCH QUẢ",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/01/DU-AN-TRAM-SAC-1024x1024.jpg",
  },
  {
    id: "hung-chau",
    name: "TRẠM SẠC VINFAST HƯNG CHÂU",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/D-1024x1024.jpg",
  },
  {
    id: "vnpt-vinh-phuc",
    name: "TRẠM SẠC VINFAST VNPT VĨNH PHÚC",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/tram-sac-vinfast-hd-phat-thinhcuong-2-1024x1024.jpg",
  },
  {
    id: "hoang-duy-gia-lai",
    name: "TRẠM SẠC HOÀNG DUY GIA LAI",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/DDF-1024x1024.jpg",
  },
  {
    id: "green-car-bac-ninh",
    name: "TRẠM SẠC GREEN CAR BẮC NINH",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/SDFSS-1024x1024.jpg",
  },
];

const GALLERY_IMAGES = [
  {
    src: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/pin-tramsac-11_1660273822-300x235.png",
    alt: "Trụ sạc VinFast thông minh",
  },
  {
    src: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/pin-tramsac-8_1660273763-300x122.png",
    alt: "Trạm pin VinFast tiêu chuẩn",
  },
  {
    src: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/11/vf3-300x300.png",
    alt: "VinFast VF 3 sạc pin",
  },
  {
    src: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/vf8-300x300.png",
    alt: "VinFast VF 8 cao cấp",
  },
];

export default function ChargingStationPage() {
  const [productTab, setProductTab] = useState<"dc" | "ac">("dc");

  // Carousel states: 5 items visible on desktop (matching Thịnh Cường exactly)
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(5);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [chargerType, setChargerType] = useState("");
  const [note, setNote] = useState("");
  const [agreePromo, setAgreePromo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, PROJECTS.length - itemsPerView);

  const handleNextProject = useCallback(() => {
    setCarouselIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrevProject = useCallback(() => {
    setCarouselIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play carousel
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNextProject();
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, handleNextProject]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !chargerType.trim()) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*).");
      return;
    }
    setSubmitted(true);
  };

  const currentProducts = productTab === "dc" ? DC_PRODUCTS : AC_PRODUCTS;

  return (
    <div className={`w-full bg-white text-[#333333] ${mulish.className}`}>
      {/* ============================================================
          1. HEADER BANNER SECTION (matching Elementor e83e538)
         ============================================================ */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/suachuaimg_1656869862_1658394682.webp"
          alt="Trạm sạc VinFast Thịnh Cường"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-12">
          <h1 className="text-white text-[32px] sm:text-[38px] md:text-[44px] font-black font-mulish uppercase tracking-tight drop-shadow-md leading-tight">
            Trạm sạc
          </h1>
        </div>
      </section>

      {/* ============================================================
          2. SẢN PHẨM TRẠM SẠC V-GREEN THỊNH CƯỜNG (matching 77969d9 & Image 2)
          - Heading: Mulish 900 đậm (#0C0C0C), text-[28px]-text-[38px], tracking-tight
          - Divider: #3AB3FF, width 16%, thickness 4.5px, centered
          - Tabs: TRẠM SẠC VINFAST DC & TRẠM SẠC VINFAST AC (Mulish 800, text-[16px])
          - Product Card:
            + Image TO KHÔNG BỊ CO LẠI (aspect-square w-full, ~350px x 350px)
            + Category: text-[13px] text-[#777777] font-medium
            + Title: font-extrabold text-black text-[16px]-text-[17px]
         ============================================================ */}
      <section className="mt-[50px] lg:mt-[80px] mb-0 py-6">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-[#0C0C0C] text-[28px] sm:text-[34px] md:text-[38px] font-black font-mulish uppercase tracking-tight leading-tight">
              SẢN PHẨM TRẠM SẠC V-GREEN THỊNH CƯỜNG
            </h2>

            {/* Elementor exact Divider: width 16%, thickness 4.5px, color #3AB3FF */}
            <div className="w-[16%] min-w-[120px] max-w-[190px] h-[4.5px] bg-[#3AB3FF] mx-auto mt-3 mb-6 rounded-full" />

            {/* Tabs matching Elementor nav-tabs (Image 2) */}
            <div className="flex items-center justify-center gap-8 sm:gap-12 border-b border-gray-200 pb-0">
              <button
                type="button"
                onClick={() => setProductTab("dc")}
                className={`relative pb-3 text-sm sm:text-[16px] font-extrabold font-mulish uppercase tracking-normal transition-all cursor-pointer ${
                  productTab === "dc"
                    ? "text-[#3AB3FF] border-b-[3px] border-[#3AB3FF] mb-[-1.5px]"
                    : "text-[#000000] hover:text-[#3AB3FF]"
                }`}
              >
                TRẠM SẠC VINFAST DC
              </button>

              <button
                type="button"
                onClick={() => setProductTab("ac")}
                className={`relative pb-3 text-sm sm:text-[16px] font-extrabold font-mulish uppercase tracking-normal transition-all cursor-pointer ${
                  productTab === "ac"
                    ? "text-[#3AB3FF] border-b-[3px] border-[#3AB3FF] mb-[-1.5px]"
                    : "text-[#000000] hover:text-[#3AB3FF]"
                }`}
              >
                TRẠM SẠC VINFAST AC
              </button>
            </div>
          </div>

          {/* Product Grid - Large Chargers filling the cards (matching Image 2 & Elementor grid-v3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-[30px] pt-4">
            {currentProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/tram-sac/${prod.slug}`}
                className="group bg-white border border-[#e6e6e6] p-4 sm:p-[20px] md:p-[25px] transition-all duration-300 hover:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.35)] flex flex-col justify-between block"
              >
                {/* Product Image: Full aspect-square so chargers are BIG and prominent */}
                <div className="relative w-full aspect-square bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    priority
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Meta text: Category + Bold Name */}
                <div className="pt-3 pb-1 text-left">
                  <span className="block text-[13px] text-[#777777] font-medium font-mulish mb-1">
                    {prod.category}
                  </span>
                  <h3 className="text-[16px] sm:text-[17px] font-extrabold font-mulish text-[#000000] group-hover:text-[#3AB3FF] transition-colors leading-snug">
                    {prod.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. DỰ ÁN TRẠM SẠC VGREEN THỊNH CƯỜNG (matching 641b7c6 & Image 3)
          - Heading: Mulish 900 to đậm (#0C0C0C), text-[28px]-text-[38px]
          - Full-width Section with minimal padding (w-full px-1 sm:px-2 md:px-3) matching Image 3
          - 5 Slides visible edge-to-edge across Desktop (no massive padding squeezing slides)
          - Inside navigation arrows (elementor-arrows-position-inside)
          - Sharp straight edges (rounded-none), square photos
          - Caption underneath on white background (font-extrabold text-[13px]-text-[14px])
          - 6 pagination dots below, followed by #3AB3FF divider
         ============================================================ */}
      <section className="mt-[50px] lg:mt-[80px] mb-[50px] lg:mb-[80px] py-6 w-full">
        <div className="w-full px-1 sm:px-2 md:px-3 lg:px-4">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-[#0C0C0C] text-[28px] sm:text-[34px] md:text-[38px] font-black font-mulish uppercase tracking-tight leading-tight">
              DỰ ÁN TRẠM SẠC VGREEN THỊNH CƯỜNG
            </h2>
            {/* Elementor exact Divider under title: width 16%, thickness 4.5px, color #3AB3FF */}
            <div className="w-[16%] min-w-[120px] max-w-[190px] h-[4.5px] bg-[#3AB3FF] mx-auto mt-3 rounded-full" />
          </div>

          {/* Carousel Container */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Nav Arrows - Positioned INSIDE the carousel like Elementor Image 3 */}
            <button
              type="button"
              onClick={handlePrevProject}
              aria-label="Dự án trước"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 hover:text-black border border-gray-300 flex items-center justify-center transition-all shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNextProject}
              aria-label="Dự án tiếp theo"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-800 hover:text-black border border-gray-300 flex items-center justify-center transition-all shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carousel Track: Wide slides edge-to-edge with minimal padding (px-1) so images are LARGE */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(carouselIndex * 100) / itemsPerView}%)`,
                }}
              >
                {PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="shrink-0 px-1 sm:px-1.5"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <div className="group cursor-pointer">
                      {/* Image: Sharp corners, clean square, filling 100% of slide width */}
                      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden rounded-none">
                        <Image
                          src={proj.image}
                          alt={proj.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>

                      {/* Caption underneath the image on white background */}
                      <div className="pt-2.5 pb-1 text-left">
                        <h3 className="font-extrabold font-mulish text-[13px] sm:text-[14px] text-black uppercase tracking-tight leading-snug line-clamp-1 group-hover:text-[#3AB3FF] transition-colors">
                          {proj.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots (6 dots matching 6 projects) */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {Array.from({ length: PROJECTS.length }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCarouselIndex(Math.min(dotIdx, maxIndex))}
                  aria-label={`Đi tới ảnh ${dotIdx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    carouselIndex === dotIdx || (carouselIndex === maxIndex && dotIdx >= maxIndex)
                      ? "bg-black scale-125"
                      : "bg-[#cccccc] hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. FORM SECTION: ĐĂNG KÍ THÔNG TIN NHẬN ƯU ĐÃI (matching 6903a07)
         ============================================================ */}
      <section className="relative w-full py-16 sm:py-24 overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
          style={{
            backgroundImage: `url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/thinhcuong-vinfast.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />

        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto text-white">
            <h2 className="text-center text-[26px] sm:text-[32px] md:text-[36px] font-black font-mulish uppercase tracking-tight text-white mb-8">
              Đăng kí thông tin nhận ưu đãi trạm sạc
            </h2>

            {submitted ? (
              <div className="bg-black/75 backdrop-blur-md p-8 sm:p-10 rounded-xl text-center space-y-4 border border-white/20">
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-[900] text-white">Đăng ký thành công!</h3>
                <p className="text-sm text-gray-200 max-w-md mx-auto">
                  Cảm ơn Quý khách <strong className="text-white">{fullName}</strong> ({phone}). Chuyên viên VinFast Thịnh Cường sẽ liên hệ tư vấn sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName("");
                    setPhone("");
                    setAddress("");
                    setChargerType("");
                    setNote("");
                  }}
                  className="mt-4 bg-[#1863dc] hover:bg-[#3AB3FF] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                className="space-y-4 text-sm"
              >
                {/* Row 1: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-200 mb-1.5">
                      Họ tên: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Đỗ Việt Nam"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-200 mb-1.5">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0966666666"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                    />
                  </div>
                </div>

                {/* Row 2: Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    Địa chỉ *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Hà Nội"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                  />
                </div>

                {/* Row 3: Charger Type */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    Loại trạm sạc *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Trạm sạc nhanh DC 120kW"
                    value={chargerType}
                    onChange={(e) => setChargerType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                  />
                </div>

                {/* Row 4: Note */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    Ghi chú:
                  </label>
                  <textarea
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF] resize-none"
                  />
                </div>

                {/* Row 5: 2 Terms Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-200 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={agreePromo}
                      onChange={(e) => setAgreePromo(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#1863dc] focus:ring-[#3AB3FF] cursor-pointer"
                    />
                    <span>
                      Tôi xác nhận rằng Vinfast Thịnh Cường có thể gửi cho tôi thêm thông tin về các sản phẩm hoặc dịch vụ của Vinfast.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-200 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 rounded text-[#1863dc] focus:ring-[#3AB3FF] cursor-pointer"
                    />
                    <span>
                      Tôi đã đọc và đồng ý{" "}
                      <Link href="/chinh-sach-bao-mat-thong-tin/" className="text-[#3AB3FF] underline">
                        Quy định và chính sách
                      </Link>{" "}
                      của Vinfast Thịnh Cường!
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="bg-[#1863dc] hover:bg-[#3AB3FF] text-white font-[900] py-3 px-14 rounded text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. VGREEN THỊNH CƯỜNG - LỰA CHỌN HÀNG ĐẦU TẠI VIỆT NAM (matching f7281db & Image 1)
         ============================================================ */}
      <section className="mt-[50px] lg:mt-[80px] mb-0 py-6 sm:py-10">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: 2x2 Gallery - Seamless, No borders, No gray background (Image 1) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-3">
              {GALLERY_IMAGES.map((img, gIdx) => (
                <div
                  key={gIdx}
                  className="group relative aspect-[3/2] overflow-hidden bg-transparent cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Right: Text & Benefits - Clean black checkmarks & larger font (Image 1) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[34px] font-black font-mulish uppercase text-[#0C0C0C] tracking-tight leading-[1.25]">
                VGREEN THỊNH CƯỜNG - LỰA CHỌN HÀNG ĐẦU TẠI VIỆT NAM
              </h2>

              <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#000000] leading-relaxed">
                Bắt nhịp mạnh mẽ với xu hướng{" "}
                <strong className="text-black font-bold">
                  chuyển đổi sang năng lượng sạch và giao thông xanh,
                </strong>{" "}
                cung cấp giải pháp tổng thể cho doanh nghiệp và cộng đồng khi đầu tư, triển khai, vận hành và phát triển{" "}
                <strong className="text-black font-bold">trạm sạc VinFast.</strong>
              </p>

              <ul className="space-y-3 pt-1 text-[13px] sm:text-[14px] text-[#222222]">
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold shrink-0 text-base leading-none mt-0.5">✓</span>
                  <span>Giải pháp toàn diện cho doanh nghiệp và đối tác trong lĩnh vực trạm sạc điện.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold shrink-0 text-base leading-none mt-0.5">✓</span>
                  <span>Khảo sát, thi công, lắp đặt trạm sạc trên Toàn quốc</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold shrink-0 text-base leading-none mt-0.5">✓</span>
                  <span>Chính sách hỗ trợ và ưu đãi cực kỳ hấp dẫn</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold shrink-0 text-base leading-none mt-0.5">✓</span>
                  <span>Tích hợp tốt với xe và hệ sinh thái VinGroup</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. NEWS SECTION (matching c22f80d)
         ============================================================ */}
      <section className="mt-[50px] lg:mt-[80px] mb-0">
        <NewsSection />
      </section>
    </div>
  );
}
