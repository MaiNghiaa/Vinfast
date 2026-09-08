"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Check,
  Phone,
  MessageCircle,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { CHARGERS } from "@/data/chargers";
import ChargerDetailPage from "@/components/ChargerDetailPage";
import { USED_CARS } from "@/data/usedCars";
import UsedCarDetailPage from "@/components/UsedCarDetailPage";
import { useModal } from "@/components/ClientLayout";

export default function VehicleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openBooking } = useModal();

  const vehicleIndex = VEHICLES.findIndex((v) => v.slug === slug);
  const vehicle = VEHICLES[vehicleIndex];

  // If vehicle not found, check if it's a charging station or used car
  if (!vehicle) {
    const charger = CHARGERS.find((c) => c.slug === slug);
    if (charger) {
      return <ChargerDetailPage charger={charger} />;
    }
    const usedCar = USED_CARS.find((c) => c.slug === slug);
    if (usedCar) {
      return <UsedCarDetailPage car={usedCar} />;
    }
    return notFound();
  }

  // Previous & Next vehicle for top navigation arrows (< >)
  const prevVehicle = VEHICLES[(vehicleIndex - 1 + VEHICLES.length) % VEHICLES.length];
  const nextVehicle = VEHICLES[(vehicleIndex + 1) % VEHICLES.length];

  // Gallery thumbnails
  const thumbnails =
    vehicle.galleryThumbnails && vehicle.galleryThumbnails.length > 0
      ? vehicle.galleryThumbnails
      : [
        vehicle.thumbnail,
        ...vehicle.colors.map((c) => c.imageUrl).filter(Boolean),
      ];

  // State
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedTrimIndex, setSelectedTrimIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"desc" | "additional">("desc");
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Pre-exterior photo slider index
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderPhotos = vehicle.sliderPhotos || [
    vehicle.thumbnail,
    vehicle.bannerImage,
  ];

  // Lifestyle gallery slider index
  const [galleryIndex, setGalleryIndex] = useState(0);
  const lifestylePhotos = vehicle.lifestyleGallery || [
    vehicle.thumbnail,
    vehicle.bannerImage,
  ];

  // ADAS / Safety slider index
  const [safetyIndex, setSafetyIndex] = useState(0);
  const safetyItems = vehicle.safetyTech?.items || [];

  // Form state
  const leadFormRef = useRef<HTMLDivElement>(null);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formAgreed, setFormAgreed] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên và Số điện thoại!");
      return;
    }
    setFormSubmitted(true);
  };


  // Color selection
  const handleColorSelect = (idx: number) => {
    setSelectedColorIndex(idx);
    // Find matching thumbnail if present
    const colorImg = vehicle.colors[idx]?.imageUrl;
    if (colorImg) {
      const matchIdx = thumbnails.indexOf(colorImg);
      if (matchIdx !== -1) {
        setActiveThumbIndex(matchIdx);
      }
    }
  };

  // Displayed car image
  const currentImage =
    thumbnails[activeThumbIndex] ||
    vehicle.colors[selectedColorIndex]?.imageUrl ||
    vehicle.thumbnail;

  // Pricing calculation
  const displayedPrice =
    selectedTrimIndex !== null
      ? new Intl.NumberFormat("vi-VN").format(
        vehicle.trims[selectedTrimIndex]?.priceWithBattery ||
        vehicle.trims[selectedTrimIndex]?.priceNoBattery ||
        vehicle.basePrice
      ) + " ₫"
      : vehicle.priceRangeText || vehicle.priceText;

  return (
    <div className="w-full bg-white text-[#333333] font-sans antialiased">
      {/* 1. Top Asphalt Highway Banner */}
      <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-zinc-900">
        <Image
          src={vehicle.bannerImage || "https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/07/toyota-thai-hoa-tu-liem-car-detail-breadcum-all.webp"}
          alt={`${vehicle.name} Banner`}
          fill
          priority
          className="object-cover object-bottom"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Top Bar: Breadcrumb + Prev/Next model arrows */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
          <nav className="flex items-center gap-1.5 text-[13px] text-gray-500">
            <Link href="/" className="hover:text-[#1863dc] transition-colors">
              Trang chủ
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/xe-moi" className="hover:text-[#1863dc] transition-colors">
              Xe mới
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">{vehicle.name}</span>
          </nav>

          {/* Quick Prev / Next Vehicle arrows */}
          <div className="flex items-center gap-2">
            <Link
              href={`/san-pham/${prevVehicle.slug}`}
              title={`Xe trước: ${prevVehicle.name}`}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1863dc] hover:border-[#1863dc] transition-all bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link
              href={`/san-pham/${nextVehicle.slug}`}
              title={`Xe tiếp theo: ${nextVehicle.name}`}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1863dc] hover:border-[#1863dc] transition-all bg-white"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2. Hero Product Details (Gallery Left, Summary Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Thumbnails + Main View with Watermark */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 items-start">
            {/* Vertical Thumbnails */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto w-full sm:w-20 shrink-0 pb-2 sm:pb-0 scrollbar-thin">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveThumbIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-md border-2 overflow-hidden shrink-0 bg-white transition-all ${activeThumbIndex === idx
                      ? "border-[#1863dc] shadow-sm ring-1 ring-[#1863dc]"
                      : "border-gray-200 hover:border-gray-300 opacity-75 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>

            {/* Main Big Render View with Watermark */}
            <div className="relative flex-1 w-full h-[320px] sm:h-[420px] md:h-[480px] bg-[#fbfbfb] rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden">
              {/* Subtle background watermark (e.g. VF 3) */}
              <div className="absolute select-none pointer-events-none text-[80px] sm:text-[120px] md:text-[150px] font-black italic tracking-tighter text-gray-200/50 uppercase leading-none z-0 transform -translate-y-4">
                {vehicle.watermarkText || vehicle.name.replace("VinFast ", "")}
              </div>

              {/* Main Car Image */}
              <div className="relative w-full h-full p-4 z-10 flex items-center justify-center">
                <Image
                  src={currentImage}
                  alt={vehicle.name}
                  fill
                  priority
                  className="object-contain transition-all duration-300 drop-shadow-md"
                />
              </div>

              {/* Nav arrows on main photo */}
              <button
                onClick={() =>
                  setActiveThumbIndex(
                    (activeThumbIndex - 1 + thumbnails.length) % thumbnails.length
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow flex items-center justify-center transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActiveThumbIndex(
                    (activeThumbIndex + 1) % thumbnails.length
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow flex items-center justify-center transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Title, Price, Commitments, Animated CTA, Actions, Colors */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-gray-900 tracking-tight leading-tight">
              {vehicle.name}
            </h1>

            {/* Price Range in Cyan Blue */}
            <div className="text-xl sm:text-2xl font-bold text-[#0284c7] tracking-tight">
              {displayedPrice}
            </div>

            {/* Commitment Box */}
            <div className="bg-white pt-1">
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-wide mb-2.5">
                {vehicle.commitmentsTitle || `CAM KẾT GIÁ XE ${vehicle.name.toUpperCase()} 2026 TỐT NHẤT`}
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-[13px] text-gray-800 leading-relaxed marker:font-bold marker:text-gray-900">
                {(
                  vehicle.commitments || [
                    "Công an, quân đội giảm 5%",
                    "Cán bộ nhân viên hoặc lãnh đạo VNPOST giảm 3-5%",
                    "Chương trình tri ân khách hàng xe xăng Vinfast lên đến 80 triệu đồng",
                    "Miễn thuế trước bạ 100%",
                    "Miễn phí sạc điện đến 10/02/2029",
                    "Lãi suất cố định từ 5%/năm trong 3 năm",
                    "Hỗ trợ miễn phí thủ tục đăng ký đăng kiểm, miễn phí gửi xe tại các Khu đô thị, TTTM VinGroup.",
                    "Bảo hành xe 7 năm hoặc 160.000 km, bảo hành pin 8 năm hoặc 160.000 km.",
                    "Tặng kèm gói phụ kiện chính hãng",
                    "Hỗ trợ giao xe tại nhà miễn phí",
                  ]
                ).map((com, i) => (
                  <li key={i} className="pl-1">
                    <span dangerouslySetInnerHTML={{ __html: com }} />
                  </li>
                ))}
              </ol>
            </div>


            {/* 3 Outline Action Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <Link
                href="/du-toan-lan-banh"
                className="border border-gray-400 hover:border-[#1863dc] hover:text-[#1863dc] py-2 px-1 text-center rounded text-[12px] sm:text-[13px] font-medium text-gray-800 transition-colors flex items-center justify-center"
              >
                Dự toán lăn bánh
              </Link>
              <Link
                href="/so-sanh-xe"
                className="border border-gray-400 hover:border-[#1863dc] hover:text-[#1863dc] py-2 px-1 text-center rounded text-[12px] sm:text-[13px] font-medium text-gray-800 transition-colors flex items-center justify-center"
              >
                So sánh xe
              </Link>
              <button
                onClick={() => openBooking(vehicle.slug, "lai-thu")}
                className="border border-gray-400 hover:border-[#1863dc] hover:text-[#1863dc] py-2 px-1 text-center rounded text-[12px] sm:text-[13px] font-medium text-gray-800 transition-colors flex items-center justify-center"
              >
                Đăng kí lái thử
              </button>
            </div>

            {/* Color Swatch Circles */}
            <div className="pt-3">
              <div className="text-[12px] font-bold text-gray-700 mb-2">
                Màu sắc:{" "}
                <span className="text-[#1863dc] font-semibold">
                  {vehicle.colors[selectedColorIndex]?.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {vehicle.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleColorSelect(idx)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-7 h-7 rounded-full border transition-all shadow-xs ${selectedColorIndex === idx
                        ? "ring-2 ring-offset-2 ring-[#1863dc] scale-110"
                        : "border-gray-300 hover:scale-105"
                      }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Version Selector Pills */}
            <div className="pt-2 flex items-center gap-2.5 flex-wrap">
              {vehicle.trims.map((trim, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    setSelectedTrimIndex(selectedTrimIndex === idx ? null : idx)
                  }
                  className={`px-4 py-1.5 rounded-md border text-[12px] font-bold transition-all ${selectedTrimIndex === idx
                      ? "border-[#1863dc] bg-blue-50 text-[#1863dc] shadow-xs"
                      : "border-gray-300 text-gray-700 hover:border-gray-400 bg-white"
                    }`}
                >
                  {trim.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Horizontal Lead Form Bar */}
        <div ref={leadFormRef} className="mt-12 bg-[#f3f4f6] rounded-xl p-5 sm:p-6 border border-gray-200 shadow-xs">
          {formSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-center flex items-center justify-center gap-2 text-sm font-semibold">
              <Check className="w-5 h-5 text-emerald-600" />
              Cảm ơn bạn! Thông tin tư vấn xe {vehicle.name} đã được gửi thành công. Chuyên viên VinFast Thịnh Cường sẽ liên hệ sớm nhất!
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Họ tên"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7]"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  required
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7]"
                />
                <select
                  value={formTime}
                  onChange={(e) => setFormTime(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded px-3.5 py-2.5 text-sm text-gray-700 focus:outline-hidden focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7]"
                >
                  <option value="">Thời gian dự kiến lấy xe</option>
                  <option value="Tháng này">Tháng này</option>
                  <option value="Tháng sau">Tháng sau</option>
                  <option value="Đang tham khảo">Đang tham khảo</option>
                </select>
                <button
                  type="submit"
                  className="w-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2.5 px-4 rounded text-sm transition-colors shadow-sm uppercase tracking-wide"
                >
                  Gửi thông tin
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1 text-xs text-gray-600">
                <input
                  type="checkbox"
                  id="agree-term"
                  checked={formAgreed}
                  onChange={(e) => setFormAgreed(e.target.checked)}
                  className="rounded border-gray-300 text-[#0284c7] focus:ring-[#0284c7]"
                />
                <label htmlFor="agree-term" className="cursor-pointer">
                  Tôi đã đọc và đồng ý với các{" "}
                  <Link href="/chinh-sach-bao-mat" className="text-[#0284c7] hover:underline">
                    quy định và chính sách
                  </Link>{" "}
                  của VinFast Thịnh Cường!
                </label>
              </div>
            </form>
          )}
        </div>

        {/* 4. WooCommerce Tabs */}
        <div className="mt-14 border-t border-gray-200 pt-8">
          <div className="flex items-center gap-6 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab("desc")}
              className={`pb-3 text-base sm:text-lg font-bold transition-all relative ${activeTab === "desc"
                  ? "text-gray-900 border-b-2 border-[#dc2626]"
                  : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Mô tả
            </button>
            <button
              onClick={() => setActiveTab("additional")}
              className={`pb-3 text-base sm:text-lg font-bold transition-all relative ${activeTab === "additional"
                  ? "text-gray-900 border-b-2 border-[#dc2626]"
                  : "text-gray-500 hover:text-gray-800"
                }`}
            >
              Thông tin bổ sung
            </button>
          </div>

          {/* TAB 1: MÔ TẢ */}
          {activeTab === "desc" && (
            <div className="space-y-16">
              {/* SECTION A: 2-Column Specs & Northern Market Best Price */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Specs Table */}
                <div className="lg:col-span-5">
                  <div className="relative pb-2 mb-4">
                    <h3 className="text-xl font-bold text-gray-900 uppercase">
                      THÔNG SỐ KỸ THUẬT {vehicle.name.toUpperCase()}
                    </h3>
                    <div className="w-16 h-1 bg-[#dc2626] mt-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs text-gray-800 border-t border-gray-100 pt-4">
                    <div>
                      <span className="text-gray-500 block mb-0.5 font-semibold">Kích thước tổng thể</span>
                      <strong className="text-gray-900 text-[13px]">{vehicle.specs.dimensions}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-0.5 font-semibold">Chiều dài cơ sở</span>
                      <strong className="text-gray-900 text-[13px]">{vehicle.specs.wheelbase}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-0.5 font-semibold">Hộp số</span>
                      <strong className="text-gray-900 text-[13px]">{vehicle.specs.gearbox || "Số tự động (AT)"}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-0.5 font-semibold">Loại động cơ</span>
                      <strong className="text-gray-900 text-[13px]">{vehicle.specs.engineType || "Điện"}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-0.5 font-semibold">Khoảng sáng gầm</span>
                      <strong className="text-gray-900 text-[13px]">{vehicle.specs.groundClearance}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-0.5 font-semibold">Loại Pin</span>
                      <strong className="text-gray-900 text-[13px]">{vehicle.specs.batteryCapacity}</strong>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block mb-0.5 font-semibold">Quãng đường tối đa</span>
                      <strong className="text-gray-900 text-[13px]">{vehicle.specs.range}</strong>
                    </div>
                  </div>
                </div>

                {/* Right: Northern Market Best Price */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="relative pb-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 uppercase">
                      {vehicle.name.toUpperCase()}: GIÁ TỐT MIỀN BẮC
                    </h3>
                    <div className="w-16 h-1 bg-[#dc2626] mt-2" />
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-semibold">
                    VinFast Thịnh Cường bán {vehicle.name} – 2026 giá cạnh tranh, tốt nhất thị trường. Các phiên bản với mức giá và ưu đãi như sau:
                  </p>

                  {/* Table 1: Price List */}
                  {vehicle.pricingTable && vehicle.pricingTable.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border border-gray-300">
                        <tbody>
                          {vehicle.pricingTable.map((row, i) => (
                            <tr key={i} className="border-b border-gray-200">
                              <td className="p-2.5 font-bold text-gray-900 bg-gray-50/70 border-r border-gray-200">
                                {row.version}
                              </td>
                              <td className="p-2.5 text-gray-700 border-r border-gray-200 whitespace-nowrap">
                                {row.originalPrice}
                              </td>
                              <td className="p-2.5 font-bold text-gray-900 whitespace-nowrap">
                                {row.promoPrice}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Table 2: Feature Comparison */}
                  {vehicle.comparisonTable && vehicle.comparisonTable.length > 0 && (
                    <div className="overflow-x-auto pt-1">
                      <table className="w-full text-xs border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100/80 border-b border-gray-300 font-bold text-gray-800">
                            <th className="p-2 text-left border-r border-gray-300">Dòng xe</th>
                            <th className="p-2 text-left border-r border-gray-300">Tính năng</th>
                            <th className="p-2 text-center border-r border-gray-300">Tiêu chuẩn 1</th>
                            <th className="p-2 text-center">Tiêu chuẩn 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicle.comparisonTable.map((row, i) => (
                            <tr key={i} className="border-b border-gray-200">
                              <td className="p-2.5 font-bold text-gray-900 border-r border-gray-200 align-top">
                                {row.model}
                              </td>
                              <td className="p-2.5 text-gray-700 border-r border-gray-200">
                                <ul className="list-disc list-inside space-y-0.5">
                                  {row.features.map((f, fi) => (
                                    <li key={fi}>{f}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="p-2.5 text-center text-gray-600 border-r border-gray-200 align-top">
                                {row.std1}
                              </td>
                              <td className="p-2.5 text-center font-bold text-gray-900 align-top">
                                {row.std2}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Exclusive Monthly Offer */}
                  {vehicle.monthlyOffer && (
                    <p className="text-xs text-gray-800 leading-relaxed pt-1">
                      <strong className="text-gray-900">Ưu đãi riêng độc quyền Khách hàng mua xe trong tháng:</strong>{" "}
                      {vehicle.monthlyOffer}
                    </p>
                  )}

                  {/* Contact Line & Red Pill Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-xs text-gray-800">
                      Liên hệ <strong className="text-[#15803d] text-base font-bold">090 242 25 22</strong> (zalo) để nhận giá cực nét, đủ màu sẵn xe, giao ngay.
                    </p>
                    <a
                      href="tel:0902422522"
                      className="inline-flex items-center justify-center gap-1.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                    >
                      <span>LIÊN HỆ</span>
                      <span>&gt;&gt;</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* SECTION B: Pre-Exterior Dynamic Photo Slider (4 Slides) */}
              {sliderPhotos.length > 0 && (
                <div className="relative pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden rounded-xl">
                    {sliderPhotos.slice(sliderIndex, sliderIndex + 3).map((photo, i) => (
                      <div key={i} className="relative h-56 sm:h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        <Image
                          src={photo}
                          alt={`${vehicle.name} dynamic photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Slider Controls */}
                  {sliderPhotos.length > 3 && (
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <button
                        onClick={() => setSliderIndex((prev) => Math.max(0, prev - 1))}
                        disabled={sliderIndex === 0}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-gray-500"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-700" />
                      </button>
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: sliderPhotos.length - 2 }).map((_, dot) => (
                          <button
                            key={dot}
                            onClick={() => setSliderIndex(dot)}
                            className={`w-2 h-2 rounded-full transition-all ${sliderIndex === dot ? "bg-[#dc2626] w-4" : "bg-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          setSliderIndex((prev) =>
                            Math.min(sliderPhotos.length - 3, prev + 1)
                          )
                        }
                        disabled={sliderIndex >= sliderPhotos.length - 3}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-gray-500"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION C: NGOẠI THẤT */}
              {vehicle.exteriorData && (
                <div className="space-y-8 pt-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">
                      NGOẠI THẤT {vehicle.name.toUpperCase()}
                    </h2>
                    <div className="w-20 h-1 bg-[#dc2626] mt-2" />
                  </div>

                  {/* Intro 2-Column: Left Text, Right Large Image */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-6 space-y-3.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {vehicle.exteriorData.intro.map((p, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>
                    <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                      <Image
                        src={vehicle.exteriorData.bannerImg}
                        alt={`Ngoại thất ${vehicle.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* 3 Detail Cards (Đầu xe, Thân xe, Đuôi xe) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {vehicle.exteriorData.items.map((item, i) => (
                      <div key={i} className="flex flex-col space-y-3">
                        <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight">
                          {item.title}
                        </h3>
                        <p
                          className="text-xs text-gray-600 leading-relaxed whitespace-pre-line"
                          dangerouslySetInnerHTML={{ __html: item.desc }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION D: NỘI THẤT */}
              {vehicle.interiorData && (
                <div className="space-y-8 pt-8 border-t border-gray-100">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 uppercase">
                      NỘI THẤT {vehicle.name.toUpperCase()}
                    </h2>
                    <div className="w-20 h-1 bg-[#dc2626] mt-2" />
                  </div>

                  {/* Intro 2-Column: Left Text, Right Large Image */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-6 space-y-3.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {vehicle.interiorData.intro.map((p, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                      ))}
                    </div>
                    <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50">
                      <Image
                        src={vehicle.interiorData.bannerImg}
                        alt={`Nội thất ${vehicle.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* 3 Detail Cards (Khoang lái, Ghế, Khoang hành lý) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    {vehicle.interiorData.items.map((item, i) => (
                      <div key={i} className="flex flex-col space-y-3">
                        <div className="relative h-48 rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 uppercase tracking-tight">
                          {item.title}
                        </h3>
                        <p
                          className="text-xs text-gray-600 leading-relaxed whitespace-pre-line"
                          dangerouslySetInnerHTML={{ __html: item.desc }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION E: CÔNG NGHỆ VÀ VẬN HÀNH (ADAS & Safety Carousel) */}
              {safetyItems.length > 0 && (
                <div className="space-y-6 pt-8 border-t border-gray-100">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 uppercase inline-block">
                      {vehicle.safetyTech?.title || `CÔNG NGHỆ VÀ VẬN HÀNH ${vehicle.name.toUpperCase()}`}
                    </h2>
                    <div className="w-24 h-1 bg-[#dc2626] mx-auto mt-2" />
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {safetyItems
                        .slice(safetyIndex, safetyIndex + 4)
                        .map((item, i) => (
                          <div
                            key={i}
                            className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                          >
                            <div className="relative h-32 sm:h-40 bg-zinc-900 overflow-hidden">
                              <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-3 text-center">
                              <span className="text-xs font-semibold text-gray-800 line-clamp-2">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>

                    {safetyItems.length > 4 && (
                      <div className="flex items-center justify-center gap-3 mt-4">
                        <button
                          onClick={() => setSafetyIndex((prev) => Math.max(0, prev - 2))}
                          disabled={safetyIndex === 0}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-1.5">
                          {Array.from({
                            length: Math.ceil((safetyItems.length - 3) / 2),
                          }).map((_, dot) => (
                            <button
                              key={dot}
                              onClick={() => setSafetyIndex(dot * 2)}
                              className={`w-2 h-2 rounded-full transition-all ${Math.floor(safetyIndex / 2) === dot
                                  ? "bg-[#dc2626] w-4"
                                  : "bg-gray-300"
                                }`}
                            />
                          ))}
                        </div>
                        <button
                          onClick={() =>
                            setSafetyIndex((prev) =>
                              Math.min(safetyItems.length - 4, prev + 2)
                            )
                          }
                          disabled={safetyIndex >= safetyItems.length - 4}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SECTION F: REVIEW BANNER */}
              {vehicle.reviewVideo && (
                <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 md:h-[440px] flex items-center justify-center text-center shadow-lg my-8">
                  <Image
                    src={vehicle.reviewVideo.bgImg}
                    alt={vehicle.reviewVideo.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-brightness-75" />
                  <div className="relative z-10 flex flex-col items-center space-y-4 px-4">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight drop-shadow-md">
                      {vehicle.reviewVideo.title}
                    </h2>
                    <button
                      onClick={() => setVideoModalOpen(true)}
                      className="inline-flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wider"
                    >
                      <span>Xem ngay!</span>
                      <Play className="w-4 h-4 fill-white" />
                    </button>
                  </div>
                </div>
              )}

              {/* SECTION G: Lifestyle Photo Gallery Swiper (10 Photos) */}
              {lifestylePhotos.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {lifestylePhotos
                      .slice(galleryIndex, galleryIndex + 4)
                      .map((photo, i) => (
                        <div
                          key={i}
                          className="relative h-36 sm:h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
                        >
                          <Image
                            src={photo}
                            alt={`Lifestyle ${i + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                  </div>

                  {lifestylePhotos.length > 4 && (
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() =>
                          setGalleryIndex((prev) => Math.max(0, prev - 2))
                        }
                        disabled={galleryIndex === 0}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-gray-500"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1.5">
                        {Array.from({
                          length: Math.ceil((lifestylePhotos.length - 3) / 2),
                        }).map((_, dot) => (
                          <button
                            key={dot}
                            onClick={() => setGalleryIndex(dot * 2)}
                            className={`w-2 h-2 rounded-full transition-all ${Math.floor(galleryIndex / 2) === dot
                                ? "bg-[#dc2626] w-4"
                                : "bg-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          setGalleryIndex((prev) =>
                            Math.min(lifestylePhotos.length - 4, prev + 2)
                          )
                        }
                        disabled={galleryIndex >= lifestylePhotos.length - 4}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 hover:border-gray-500"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION H: TIN TỨC MỚI NHẤT */}
              {vehicle.relatedNews && vehicle.relatedNews.length > 0 && (
                <div className="pt-10 border-t border-gray-100 space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-gray-900 uppercase inline-block">
                      TIN TỨC MỚI NHẤT
                    </h2>
                    <div className="w-20 h-1 bg-[#dc2626] mx-auto mt-2" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                    {vehicle.relatedNews.map((news) => (
                      <div
                        key={news.id}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
                      >
                        <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
                          <Image
                            src={news.img}
                            alt={news.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                          {/* Date Badge (e.g. TH12 / 20) */}
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded shadow px-2.5 py-1.5 text-center min-w-[52px]">
                            <span className="block text-[10px] font-bold text-gray-500 uppercase leading-none">
                              {news.dateMonth}
                            </span>
                            <span className="block text-lg font-black text-gray-900 leading-tight">
                              {news.dateDay}
                            </span>
                          </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-[11px] text-gray-500">
                              <span>💬 {news.comments} Comments</span>
                              <span>•</span>
                              <span className="truncate">{news.categories}</span>
                            </div>
                            <h3 className="text-base font-bold text-gray-900 uppercase hover:text-[#1863dc] transition-colors leading-snug">
                              <Link href={`/tin-tuc/${news.slug}`}>{news.title}</Link>
                            </h3>
                            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                              {news.excerpt}
                            </p>
                          </div>

                          <div className="pt-2">
                            <Link
                              href={`/tin-tuc/${news.slug}`}
                              className="inline-flex items-center gap-1 bg-black hover:bg-[#1863dc] text-white text-[11px] font-bold px-4 py-1.5 rounded uppercase tracking-wider transition-colors"
                            >
                              <span>Chi Tiết</span>
                              <span>&gt;&gt;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: THÔNG TIN BỔ SUNG */}
          {activeTab === "additional" && (
            <div className="max-w-2xl bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
              <table className="w-full text-xs">
                <tbody>
                  {(
                    vehicle.additionalAttributes || [
                      {
                        label: "color",
                        value: vehicle.colors.map((c) => c.name).join(", "),
                      },
                      {
                        label: "Phiên bản xe",
                        value: vehicle.trims.map((t) => t.name).join(", "),
                      },
                    ]
                  ).map((attr, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <th className="p-3 text-left font-bold text-gray-900 border-r border-gray-200 w-1/3">
                        {attr.label}
                      </th>
                      <td className="p-3 text-gray-700">{attr.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Video YouTube Modal */}
      {videoModalOpen && vehicle.reviewVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative pt-[56.25%] w-full">
              <iframe
                src={vehicle.reviewVideo.videoUrl}
                title={vehicle.reviewVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
