"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mulish } from "next/font/google";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import { Charger } from "@/data/types";
import {
  CHARGERS,
  CHARGER_PROJECTS,
  WORKSHOP_GALLERY_IMAGES,
  CHARGER_RELATED_NEWS,
} from "@/data/chargers";

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

interface ChargerDetailPageProps {
  charger: Charger;
}

export default function ChargerDetailPage({ charger }: ChargerDetailPageProps) {
  // Current index in CHARGERS list for Prev / Next arrows
  const currentIndex = CHARGERS.findIndex((c) => c.slug === charger.slug);
  const prevCharger =
    CHARGERS[(currentIndex - 1 + CHARGERS.length) % CHARGERS.length];
  const nextCharger = CHARGERS[(currentIndex + 1) % CHARGERS.length];

  // Workshop photo slider (4 items per view on desktop, 1 on mobile)
  const [workshopIndex, setWorkshopIndex] = useState(0);
  const [workshopPerView, setWorkshopPerView] = useState(4);

  // Projects carousel (5 items per view on desktop, 1 on mobile)
  const [projectIndex, setProjectIndex] = useState(0);
  const [projectPerView, setProjectPerView] = useState(5);
  const [isProjectHovered, setIsProjectHovered] = useState(false);

  // Tabs for Related Chargers at the bottom: DC vs AC
  const [productTab, setProductTab] = useState<"dc" | "ac">(
    charger.type === "DC" ? "dc" : "ac"
  );

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [chargerType, setChargerType] = useState(charger.name);
  const [note, setNote] = useState("");
  const [agreePromo, setAgreePromo] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setWorkshopPerView(1);
        setProjectPerView(1);
      } else if (width < 1024) {
        setWorkshopPerView(2);
        setProjectPerView(3);
      } else {
        setWorkshopPerView(4);
        setProjectPerView(5);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update prefilled charger type when charger prop changes
  useEffect(() => {
    setChargerType(charger.name);
  }, [charger.name]);

  // Workshop slider controls
  const maxWorkshopIndex = Math.max(
    0,
    WORKSHOP_GALLERY_IMAGES.length - workshopPerView
  );

  // Project slider controls
  const maxProjectIndex = Math.max(0, CHARGER_PROJECTS.length - projectPerView);

  const handleNextProject = useCallback(() => {
    setProjectIndex((prev) => (prev >= maxProjectIndex ? 0 : prev + 1));
  }, [maxProjectIndex]);

  const handlePrevProject = useCallback(() => {
    setProjectIndex((prev) => (prev <= 0 ? maxProjectIndex : prev - 1));
  }, [maxProjectIndex]);

  // Auto-play for project carousel
  useEffect(() => {
    if (isProjectHovered) return;
    const timer = setInterval(() => {
      handleNextProject();
    }, 4500);
    return () => clearInterval(timer);
  }, [isProjectHovered, handleNextProject]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !chargerType.trim()) {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc (*).");
      return;
    }
    setSubmitted(true);
  };

  const dcChargers = CHARGERS.filter((c) => c.type === "DC");
  const acChargers = CHARGERS.filter((c) => c.type === "AC");
  const relatedProducts = productTab === "dc" ? dcChargers : acChargers;

  return (
    <div className={`w-full bg-white text-[#333333] ${mulish.className}`}>
      {/* ============================================================
          1. TOP ASPHALT ROAD BANNER (matching Thịnh Cường car-detail-breadcum-all)
         ============================================================ */}
      <section className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden bg-neutral-900">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/07/toyota-thai-hoa-tu-liem-car-detail-breadcum-all.webp"
          alt="VinFast Thịnh Cường - Chi tiết trạm sạc"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* ============================================================
          2. HERO SHOWCASE: BREADCRUMB, QUICK SPECS & CHARGER IMAGE
         ============================================================ */}
      <section className="py-8 sm:py-12 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb & Prev/Next Arrows */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-[13px] text-[#777777] mb-6 pb-2 border-b border-gray-100">
            <nav className="flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-[#3AB3FF] transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link
                href="/tram-sac"
                className="hover:text-[#3AB3FF] transition-colors"
              >
                {charger.categoryName || (charger.type === "DC" ? "Trạm sạc nhanh DC" : "Trạm sạc gia đình AC")}
              </Link>
              <span>/</span>
              <span className="text-black font-semibold">{charger.name}</span>
            </nav>

            {/* Prev / Next Charger Navigation Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href={`/tram-sac/${prevCharger.slug}`}
                aria-label={`Xem trạm sạc trước: ${prevCharger.name}`}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                href={`/tram-sac/${nextCharger.slug}`}
                aria-label={`Xem trạm sạc tiếp theo: ${nextCharger.name}`}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product Showcase Grid: Image on left, Name & Specs on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Charger Image: Tall, crisp, centered */}
            <div className="lg:col-span-6 flex items-center justify-center bg-white p-4">
              <div className="relative w-full max-w-[440px] aspect-[3/4] flex items-center justify-center">
                <Image
                  src={charger.image}
                  alt={charger.name}
                  fill
                  priority
                  className="object-contain drop-shadow-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Product Summary: Title & Bullet Specifications */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h1 className="text-[28px] sm:text-[34px] md:text-[38px] font-black font-mulish text-[#0C0C0C] tracking-tight leading-tight mb-2">
                  {charger.name}
                </h1>
                <div className="w-12 h-1 bg-[#3AB3FF] rounded-full mb-6" />
              </div>

              {/* Quick Specs Bullet List (Matching Thịnh Cường exactly) */}
              <div className="space-y-2.5">
                <ul className="space-y-2 text-[14px] sm:text-[15px] text-[#333333]">
                  {charger.quickSpecs && charger.quickSpecs.length > 0 ? (
                    charger.quickSpecs.map((spec, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#555555] shrink-0 mt-2" />
                        <span>
                          <strong className="font-bold text-[#111111]">{spec.label}:</strong>{" "}
                          {spec.value}
                        </span>
                      </li>
                    ))
                  ) : (
                    charger.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#555555] shrink-0 mt-2" />
                        <span>{feat}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#dang-ky-uu-dai"
                  className="inline-flex items-center justify-center bg-[#1863dc] hover:bg-[#3AB3FF] text-white text-sm font-bold uppercase tracking-wider px-8 py-3.5 rounded shadow transition-all duration-200"
                >
                  Nhận tư vấn & Báo giá
                </a>
                <a
                  href="tel:0902422522"
                  className="inline-flex items-center justify-center border border-gray-300 hover:border-black text-gray-800 hover:text-black text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded transition-colors"
                >
                  Hotline: 090 242 25 22
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. GIỚI THIỆU TẬP ĐOÀN THỊNH CƯỜNG & V-GREEN THỊNH CƯỜNG
         ============================================================ */}
      <section className="py-12 sm:py-16 bg-[#fafafa]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Section Heading */}
          <div className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto">
            <h2 className="text-[#0C0C0C] text-[24px] sm:text-[28px] md:text-[32px] font-black font-mulish uppercase tracking-tight leading-tight">
              GIỚI THIỆU TẬP ĐOÀN THỊNH CƯỜNG &amp; V-GREEN THỊNH CƯỜNG
            </h2>
            <div className="w-20 h-1 bg-[#3AB3FF] mx-auto mt-3 rounded-full" />
          </div>

          {/* Intro Text */}
          <div className="max-w-4xl mx-auto text-[14px] sm:text-[15px] text-[#333333] leading-relaxed space-y-4 text-justify sm:text-left mb-10">
            <p>
              Công ty CP Thịnh Cường (Tập đoàn Thịnh Cường) thành lập năm 2001, sau 25 năm phát triển đã vươn lên trở thành tập đoàn đa ngành{" "}
              <strong className="text-black font-bold">top 500 doanh nghiệp có quy mô lớn</strong> tại Việt Nam với{" "}
              <strong className="text-black font-bold">tổng nhân sự khoảng 3.000 người</strong>.
            </p>
            <p>
              Hệ sinh thái của Thịnh Cường bao gồm khai thác khoáng sản, xây dựng hạ tầng, vận tải logistics, kinh doanh dịch vụ taxi, Công nghệ Global và chuỗi khách sạn An Bình.
            </p>
            <p>
              Năm 2024, doanh nghiệp chính thức tham gia phân phối xe ô tô điện của{" "}
              <strong className="text-black font-bold">VinFast</strong>, không ngừng mở rộng hệ thống với 09 showroom và 14 xưởng dịch vụ trên toàn quốc, đón đầu xu hướng giao thông xanh.
            </p>
            <p>
              Đặc biệt, mảng kinh doanh và triển khai{" "}
              <strong className="text-black font-bold">trạm sạc VinFast</strong> với thương hiệu{" "}
              <strong className="text-black font-bold">V-Green Thịnh Cường</strong> được đầu tư bài bản, quy tụ hơn 100 đội ngũ nhân sự chuyên nghiệp.
            </p>
            <p>
              <strong className="text-black font-bold">V-Green Thịnh Cường</strong> tập trung xây dựng mạng lưới{" "}
              <strong className="text-black font-bold">trạm sạc</strong> hiện đại, đồng bộ, tích hợp giải pháp quản lý thông minh, hướng tới phát triển hạ tầng sạc bền vững cho tương lai giao thông điện tại Việt Nam.
            </p>
          </div>

          {/* Workshop & Service Gallery Slider */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(workshopIndex * 100) / workshopPerView}%)`,
                }}
              >
                {WORKSHOP_GALLERY_IMAGES.map((imgUrl, wIdx) => (
                  <div
                    key={wIdx}
                    className="shrink-0 px-2"
                    style={{ width: `${100 / workshopPerView}%` }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 shadow-sm">
                      <Image
                        src={imgUrl}
                        alt={`Xưởng dịch vụ và trạm sạc Thịnh Cường ${wIdx + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 10 Pagination Dots Matching Thịnh Cường Webarchive */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {WORKSHOP_GALLERY_IMAGES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setWorkshopIndex(Math.min(dotIdx, maxWorkshopIndex))}
                  aria-label={`Xem ảnh xưởng ${dotIdx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    workshopIndex === dotIdx || (workshopIndex === maxWorkshopIndex && dotIdx >= maxWorkshopIndex)
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
          4. DỰ ÁN TRẠM SẠC VGREEN THỊNH CƯỜNG
         ============================================================ */}
      <section className="py-12 sm:py-16 w-full">
        <div className="w-full px-2 sm:px-4 lg:px-6">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2 className="text-[#0C0C0C] text-[24px] sm:text-[28px] md:text-[34px] font-black font-mulish uppercase tracking-tight leading-tight">
              DỰ ÁN TRẠM SẠC VGREEN THỊNH CƯỜNG
            </h2>
            <div className="w-[16%] min-w-[120px] max-w-[190px] h-[4.5px] bg-[#3AB3FF] mx-auto mt-3 rounded-full" />
          </div>

          {/* Carousel Track */}
          <div
            className="relative"
            onMouseEnter={() => setIsProjectHovered(true)}
            onMouseLeave={() => setIsProjectHovered(false)}
          >
            {/* Inside Nav Arrows */}
            <button
              type="button"
              onClick={handlePrevProject}
              aria-label="Dự án trước"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-gray-800 border border-gray-300 flex items-center justify-center shadow-md cursor-pointer transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleNextProject}
              aria-label="Dự án tiếp theo"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-gray-800 border border-gray-300 flex items-center justify-center shadow-md cursor-pointer transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Track */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${(projectIndex * 100) / projectPerView}%)`,
                }}
              >
                {CHARGER_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="shrink-0 px-1 sm:px-1.5"
                    style={{ width: `${100 / projectPerView}%` }}
                  >
                    <div className="group cursor-pointer">
                      <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                        <Image
                          src={proj.image}
                          alt={proj.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>
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

            {/* 6 Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {CHARGER_PROJECTS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setProjectIndex(Math.min(dotIdx, maxProjectIndex))}
                  aria-label={`Xem dự án ${dotIdx + 1}`}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    projectIndex === dotIdx || (projectIndex === maxProjectIndex && dotIdx >= maxProjectIndex)
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
          5. NỘI DUNG CHI TIẾT KỸ THUẬT: 5 TRỤ CỘT HIỆU SUẤT (5 PILLARS)
         ============================================================ */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          {/* Section Intro Paragraph */}
          {charger.introParagraph && (
            <div className="mb-10 text-[15px] sm:text-[16px] text-[#333333] leading-relaxed text-justify sm:text-left">
              <p>{charger.introParagraph}</p>
            </div>
          )}

          {/* Pillars List with Blue Badges and Red/Dark Bullets */}
          {charger.pillars && charger.pillars.length > 0 && (
            <div className="space-y-10 sm:space-y-12">
              {charger.pillars.map((pillar) => (
                <div key={pillar.number} className="space-y-3.5">
                  {/* Pillar Heading with Blue Square Badge */}
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded bg-[#3AB3FF] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm">
                      {pillar.number}
                    </span>
                    <h2 className="text-[17px] sm:text-[19px] md:text-[20px] font-extrabold font-mulish text-[#0C0C0C] leading-snug">
                      {pillar.title}
                    </h2>
                  </div>

                  {/* Subtitle if any */}
                  {pillar.subtitle && (
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111111] pt-1">
                      {pillar.subtitle}
                    </h3>
                  )}

                  {/* Description Paragraph */}
                  {pillar.desc && (
                    <p className="text-[14px] sm:text-[15px] text-[#333333] leading-relaxed whitespace-pre-line">
                      {pillar.desc}
                    </p>
                  )}

                  {/* Bullet Points with Red Dot Indicator matching Thịnh Cường 1:1 */}
                  {pillar.bullets && pillar.bullets.length > 0 && (
                    <ul className="space-y-2 pt-1 pl-1 text-[14px] sm:text-[15px] text-[#333333]">
                      {pillar.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#e53935] shrink-0 mt-2" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Concluding text */}
                  {pillar.concludingText && (
                    <p className="text-[14px] sm:text-[15px] text-[#333333] leading-relaxed pt-2">
                      {pillar.concludingText}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Section Divider Line matching Thịnh Cường 1:1 */}
          <div className="w-[16%] min-w-[120px] max-w-[180px] h-[4px] bg-[#3AB3FF] mx-auto mt-14 rounded-full" />
        </div>
      </section>

      {/* ============================================================
          6. FORM ĐĂNG KÝ THÔNG TIN NHẬN ƯU ĐÃI TRẠM SẠC
         ============================================================ */}
      <section
        id="dang-ky-uu-dai"
        className="relative w-full py-16 sm:py-24 overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
          style={{
            backgroundImage: `url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/thinhcuong-vinfast.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/65 z-0" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="max-w-[720px] mx-auto text-white">
            <h2 className="text-center text-[24px] sm:text-[30px] md:text-[34px] font-black font-mulish uppercase tracking-tight text-white mb-8">
              Đăng kí thông tin nhận ưu đãi trạm sạc
            </h2>

            {submitted ? (
              <div className="bg-black/80 backdrop-blur-md p-8 sm:p-10 rounded-xl text-center space-y-4 border border-white/20">
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-[900] text-white">Đăng ký thành công!</h3>
                <p className="text-sm text-gray-200 max-w-md mx-auto">
                  Cảm ơn Quý khách <strong className="text-white">{fullName}</strong> ({phone}). Chuyên viên V-Green Thịnh Cường sẽ liên hệ tư vấn trạm sạc sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName("");
                    setPhone("");
                    setAddress("");
                    setNote("");
                  }}
                  className="mt-4 bg-[#1863dc] hover:bg-[#3AB3FF] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/95 text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/95 text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
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
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/95 text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
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
                    value={chargerType}
                    onChange={(e) => setChargerType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/95 text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
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
                    placeholder="Nhập nhu cầu công suất, địa điểm lắp đặt..."
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white/95 text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF] resize-none"
                  />
                </div>

                {/* Row 5: Checkboxes */}
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
                    className="bg-[#3AB3FF] hover:bg-[#1863dc] text-white font-[900] py-3 px-14 rounded text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer"
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
          7. SẢN PHẨM TRẠM SẠC V-GREEN THỊNH CƯỜNG (Tabs DC / AC)
         ============================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Section Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-[#0C0C0C] text-[26px] sm:text-[32px] md:text-[36px] font-black font-mulish uppercase tracking-tight leading-tight">
              SẢN PHẨM TRẠM SẠC V-GREEN THỊNH CƯỜNG
            </h2>
            <div className="w-[16%] min-w-[120px] max-w-[190px] h-[4.5px] bg-[#3AB3FF] mx-auto mt-3 mb-6 rounded-full" />

            {/* Tabs */}
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

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {relatedProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/tram-sac/${prod.slug}`}
                className="group bg-white border border-[#e6e6e6] p-4 sm:p-6 transition-all duration-300 hover:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.25)] flex flex-col justify-between block"
              >
                <div className="relative w-full aspect-square bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="pt-4 pb-1 text-left">
                  <span className="block text-[13px] text-[#777777] font-medium font-mulish mb-1">
                    {prod.categoryName}
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
          8. TIN TỨC MỚI NHẤT VỀ TRẠM SẠC
         ============================================================ */}
      <section className="py-14 sm:py-20 bg-[#fafafa] border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-[#0C0C0C] text-[26px] sm:text-[32px] md:text-[36px] font-black font-mulish uppercase tracking-tight leading-tight">
              TIN TỨC MỚI NHẤT
            </h2>
            <div className="w-[16%] min-w-[120px] max-w-[190px] h-[4.5px] bg-[#3AB3FF] mx-auto mt-3 mb-6 rounded-full" />

            <div className="flex justify-center">
              <span className="bg-[#3AB3FF] text-white text-xs sm:text-sm font-extrabold px-6 py-2 rounded uppercase tracking-wider">
                Trạm Sạc
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {CHARGER_RELATED_NEWS.map((news) => (
              <div
                key={news.id}
                className="group bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <h3 className="font-extrabold font-mulish text-[15px] sm:text-[16px] text-black group-hover:text-[#3AB3FF] transition-colors leading-snug line-clamp-3">
                    {news.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
