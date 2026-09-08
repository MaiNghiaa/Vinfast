"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mulish } from "next/font/google";
import {
  Car,
  Zap,
  Fuel,
  Truck,
  Search,
  Scale,
  ChevronDown,
  CheckCircle,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import { USED_CARS, GREEN_FUTURE_COMMITMENTS, USED_CARS_NEWS } from "@/data/usedCars";

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export default function UsedCarsPage() {
  // Vehicle type tab
  const [vehicleTypeTab, setVehicleTypeTab] = useState<
    "all" | "electric" | "gasoline" | "commercial"
  >("all");

  // Search & Filter states
  const [keyword, setKeyword] = useState("");
  const [selectedModel, setSelectedModel] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSeats, setSelectedSeats] = useState("all");
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2300); // in millions VND (0 to 2300 tr)
  const [maxOdo, setMaxOdo] = useState(200000); // in km (0 to 200,000 km)
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "odo-asc">("newest");
  const [filterPromoOnly, setFilterPromoOnly] = useState(false);
  const [filterCertifiedOnly, setFilterCertifiedOnly] = useState(false);

  // Valuation Form states
  const [valName, setValName] = useState("");
  const [valPhone, setValPhone] = useState("");
  const [valCarTarget, setValCarTarget] = useState("");
  const [valYear, setValYear] = useState("");
  const [valPlate, setValPlate] = useState("");
  const [valAgreePromo, setValAgreePromo] = useState(false);
  const [valAgreeTerms, setValAgreeTerms] = useState(false);
  const [valSubmitted, setValSubmitted] = useState(false);

  // Filtered cars logic
  const filteredCars = useMemo(() => {
    return USED_CARS.filter((car) => {
      // Type Tab filter
      if (vehicleTypeTab !== "all" && car.vehicleType !== vehicleTypeTab) {
        return false;
      }
      // Keyword filter
      if (
        keyword.trim() &&
        !car.name.toLowerCase().includes(keyword.toLowerCase()) &&
        !car.model.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return false;
      }
      // Model filter
      if (selectedModel !== "all" && !car.name.includes(selectedModel)) {
        return false;
      }
      // Year filter
      if (selectedYear !== "all" && car.year.toString() !== selectedYear) {
        return false;
      }
      // Seats filter
      if (selectedSeats !== "all" && car.seats.toString() !== selectedSeats) {
        return false;
      }
      // Province filter
      if (selectedProvince !== "all" && car.province !== selectedProvince) {
        return false;
      }
      // Max price filter (if priceNumber exists and is > 0)
      if (car.priceNumber && car.priceNumber > 0) {
        const priceInMillion = car.priceNumber / 1000000;
        if (priceInMillion > maxPrice) return false;
      }
      // Max ODO filter
      if (car.odoKm > maxOdo) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") {
        return (a.priceNumber || 0) - (b.priceNumber || 0);
      }
      if (sortBy === "price-desc") {
        return (b.priceNumber || 0) - (a.priceNumber || 0);
      }
      if (sortBy === "odo-asc") {
        return a.odoKm - b.odoKm;
      }
      return 0; // Default newest
    });
  }, [
    vehicleTypeTab,
    keyword,
    selectedModel,
    selectedYear,
    selectedSeats,
    selectedProvince,
    maxPrice,
    maxOdo,
    sortBy,
  ]);

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valName.trim() || !valPhone.trim() || !valCarTarget.trim()) {
      alert("Vui lòng điền các trường bắt buộc (*).");
      return;
    }
    setValSubmitted(true);
  };

  return (
    <div className={`w-full bg-white text-[#333333] ${mulish.className}`}>
      {/* ============================================================
          1. SHOWROOM HERO BACKGROUND (matching Thịnh Cường 1:1)
         ============================================================ */}
      <section className="relative w-full h-[460px] sm:h-[540px] md:h-[620px] lg:h-[680px] xl:h-[720px] overflow-hidden bg-[#eef2f6]">
        <Image
          src="/images/thinhcuong-vinfast.jpg"
          alt="VinFast Thịnh Cường - Xe cũ Green Future"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </section>

      {/* ============================================================
          2. BỘ LỌC TÌM KIẾM XE ĐA NĂNG (OVERLAPPING SEARCH BOX)
         ============================================================ */}
      <section className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 -mt-24 sm:-mt-32 md:-mt-40">
        <div className="bg-white rounded-2xl md:rounded-[22px] shadow-[0_15px_45px_rgba(0,0,0,0.12)] p-6 sm:p-8 md:p-10 border border-gray-100">
          <h2 className="text-center text-[20px] sm:text-[24px] md:text-[28px] font-black font-mulish uppercase text-[#0C0C0C] tracking-tight mb-6 sm:mb-8">
            BẠN ĐANG MUỐN TÌM MỘT CHIẾC XE NHƯ THẾ NÀO?
          </h2>

          {/* 4 Type Tabs with Car Sketch Images matching Thịnh Cường 1:1 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 border-b border-gray-200 mb-6 sm:mb-8">
            <button
              type="button"
              onClick={() => setVehicleTypeTab("all")}
              className={`flex flex-col items-center justify-center pb-3 transition-all cursor-pointer border-b-[3px] ${
                vehicleTypeTab === "all"
                  ? "border-[#3AB3FF] text-[#3AB3FF]"
                  : "border-transparent text-gray-700 hover:text-black"
              }`}
            >
              <div className="relative w-[110px] sm:w-[130px] md:w-[145px] h-[45px] sm:h-[52px] mb-2 flex items-center justify-center">
                <Image
                  src="/images/used-cars/car1.jpg"
                  alt="Tất cả các loại"
                  fill
                  className="object-contain"
                  sizes="145px"
                />
              </div>
              <span className="text-xs sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider">
                TẤT CẢ CÁC LOẠI
              </span>
            </button>

            <button
              type="button"
              onClick={() => setVehicleTypeTab("electric")}
              className={`flex flex-col items-center justify-center pb-3 transition-all cursor-pointer border-b-[3px] ${
                vehicleTypeTab === "electric"
                  ? "border-[#3AB3FF] text-[#3AB3FF]"
                  : "border-transparent text-gray-700 hover:text-black"
              }`}
            >
              <div className="relative w-[110px] sm:w-[130px] md:w-[145px] h-[45px] sm:h-[52px] mb-2 flex items-center justify-center">
                <Image
                  src="/images/used-cars/car2.jpg"
                  alt="Xe động cơ điện"
                  fill
                  className="object-contain"
                  sizes="145px"
                />
              </div>
              <span className="text-xs sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider">
                XE ĐỘNG CƠ ĐIỆN
              </span>
            </button>

            <button
              type="button"
              onClick={() => setVehicleTypeTab("gasoline")}
              className={`flex flex-col items-center justify-center pb-3 transition-all cursor-pointer border-b-[3px] ${
                vehicleTypeTab === "gasoline"
                  ? "border-[#3AB3FF] text-[#3AB3FF]"
                  : "border-transparent text-gray-700 hover:text-black"
              }`}
            >
              <div className="relative w-[110px] sm:w-[130px] md:w-[145px] h-[45px] sm:h-[52px] mb-2 flex items-center justify-center">
                <Image
                  src="/images/used-cars/car3.jpg"
                  alt="Xe động cơ xăng"
                  fill
                  className="object-contain"
                  sizes="145px"
                />
              </div>
              <span className="text-xs sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider">
                XE ĐỘNG CƠ XĂNG
              </span>
            </button>

            <button
              type="button"
              onClick={() => setVehicleTypeTab("commercial")}
              className={`flex flex-col items-center justify-center pb-3 transition-all cursor-pointer border-b-[3px] ${
                vehicleTypeTab === "commercial"
                  ? "border-[#3AB3FF] text-[#3AB3FF]"
                  : "border-transparent text-gray-700 hover:text-black"
              }`}
            >
              <div className="relative w-[110px] sm:w-[130px] md:w-[145px] h-[45px] sm:h-[52px] mb-2 flex items-center justify-center">
                <Image
                  src="/images/used-cars/car4.jpg"
                  alt="Xe dịch vụ"
                  fill
                  className="object-contain"
                  sizes="145px"
                />
              </div>
              <span className="text-xs sm:text-[13px] md:text-[14px] font-bold uppercase tracking-wider">
                XE DỊCH VỤ
              </span>
            </button>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 text-xs sm:text-[13px]">
            {/* Keyword */}
            <div>
              <input
                type="text"
                placeholder="Nhập từ khóa"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-[44px] px-3.5 bg-[#fbfbfb] border border-gray-300 rounded-[4px] focus:bg-white focus:border-[#3AB3FF] outline-none text-gray-800 placeholder:text-gray-400 shadow-sm transition-colors"
              />
            </div>

            {/* Model */}
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full h-[44px] px-3.5 pr-8 bg-[#fbfbfb] border border-gray-300 rounded-[4px] focus:bg-white focus:border-[#3AB3FF] outline-none text-gray-800 cursor-pointer appearance-none shadow-sm transition-colors"
              >
                <option value="all">Tên dòng xe</option>
                <option value="VF 8">VinFast VF 8</option>
                <option value="VF 9">VinFast VF 9</option>
                <option value="VF 7">VinFast VF 7</option>
                <option value="VF 6">VinFast VF 6</option>
                <option value="VF 5">VinFast VF 5</option>
                <option value="VF 3">VinFast VF 3</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Year */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full h-[44px] px-3.5 pr-8 bg-[#fbfbfb] border border-gray-300 rounded-[4px] focus:bg-white focus:border-[#3AB3FF] outline-none text-gray-800 cursor-pointer appearance-none shadow-sm transition-colors"
              >
                <option value="all">Năm sản xuất</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Seats */}
            <div className="relative">
              <select
                value={selectedSeats}
                onChange={(e) => setSelectedSeats(e.target.value)}
                className="w-full h-[44px] px-3.5 pr-8 bg-[#fbfbfb] border border-gray-300 rounded-[4px] focus:bg-white focus:border-[#3AB3FF] outline-none text-gray-800 cursor-pointer appearance-none shadow-sm transition-colors"
              >
                <option value="all">Số chỗ ngồi</option>
                <option value="4">4 chỗ</option>
                <option value="5">5 chỗ</option>
                <option value="7">7 chỗ</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Province */}
            <div className="relative">
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="w-full h-[44px] px-3.5 pr-8 bg-[#fbfbfb] border border-gray-300 rounded-[4px] focus:bg-white focus:border-[#3AB3FF] outline-none text-gray-800 cursor-pointer appearance-none shadow-sm transition-colors"
              >
                <option value="all">Tỉnh thành</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Quảng Ninh">Quảng Ninh</option>
                <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                <option value="Hải Phòng">Hải Phòng</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Sliders row + Search Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
            {/* Price Slider */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="flex justify-between text-xs sm:text-[13px] text-gray-800 font-bold">
                <span>Khoảng giá</span>
                <span className="text-[#3AB3FF] font-semibold text-xs">
                  {maxPrice >= 2300 ? "Tối đa 2.3 tỷ" : `Đến ${maxPrice} triệu`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2300"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#555555] bg-[#fcdede]"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                <span>0 triệu</span>
                <span>2.3 tỷ</span>
              </div>
            </div>

            {/* ODO Slider */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="flex justify-between text-xs sm:text-[13px] text-gray-800 font-bold">
                <span>Số km đã đi</span>
                <span className="text-[#3AB3FF] font-semibold text-xs">
                  {maxOdo >= 200000 ? "Tối đa 200.000km" : `Dưới ${maxOdo.toLocaleString()} km`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={maxOdo}
                onChange={(e) => setMaxOdo(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#555555] bg-[#fcdede]"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                <span>0km</span>
                <span>200000km</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-3 flex justify-end">
              <button
                type="button"
                onClick={() => {}}
                className="w-full sm:w-auto h-[44px] bg-[#28a8f0] hover:bg-[#1a95dc] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-8 rounded-[4px] shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>TÌM KIẾM XE</span>
                <span className="text-base font-bold leading-none">&gt;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. RESULT TOOLBAR & QUICK FILTERS
         ============================================================ */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-6 pb-6">
        {/* Top bar: Compare & Sorting */}
        <div className="bg-[#f0f0f0] p-3.5 sm:px-6 rounded-[6px] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-[13px] text-gray-700 mb-6">
          <div className="flex items-center gap-2 font-bold cursor-pointer hover:text-black">
            <Scale className="w-4 h-4 text-gray-600" />
            <span>So sánh xe</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Hiển thị:</span>
              <select className="bg-white border border-gray-300 rounded px-2 py-1 text-xs outline-none">
                <option>9 xe</option>
                <option>18 xe</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>Xếp theo:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-gray-300 rounded px-2.5 py-1 text-xs outline-none cursor-pointer"
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá tăng dần</option>
                <option value="price-desc">Giá giảm dần</option>
                <option value="odo-asc">Số km thấp nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Second bar: Results Count & Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm pb-4 border-b border-gray-200">
          <div className="font-bold text-gray-900">
            Kết quả đang có:{" "}
            <span className="text-[#3AB3FF] font-black">{filteredCars.length} xe</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap text-xs">
            <button
              type="button"
              onClick={() => setSortBy(sortBy === "price-asc" ? "price-desc" : "price-asc")}
              className="text-gray-700 hover:text-[#3AB3FF] font-medium transition-colors cursor-pointer"
            >
              SẮP XẾP THEO GIÁ ↕
            </button>
            <button
              type="button"
              onClick={() => setSortBy("odo-asc")}
              className="text-gray-700 hover:text-[#3AB3FF] font-medium transition-colors cursor-pointer"
            >
              SỐ KM THẤP NHẤT
            </button>

            <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
              <input
                type="checkbox"
                checked={filterPromoOnly}
                onChange={(e) => setFilterPromoOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#dc2626] focus:ring-red-500 cursor-pointer"
              />
              <span>Xe ưu đãi đặc biệt</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-gray-700">
              <input
                type="checkbox"
                checked={filterCertifiedOnly}
                onChange={(e) => setFilterCertifiedOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-[#3AB3FF] focus:ring-[#3AB3FF] cursor-pointer"
              />
              <span>Xe được chứng nhận</span>
            </label>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. DANH SÁCH 6 THẺ XE CŨ GREEN FUTURE (GRID)
         ============================================================ */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 pb-16">
        {filteredCars.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-base font-bold text-gray-700">
              Không tìm thấy xe nào phù hợp với bộ lọc hiện tại.
            </p>
            <button
              type="button"
              onClick={() => {
                setVehicleTypeTab("all");
                setKeyword("");
                setSelectedModel("all");
                setSelectedYear("all");
                setSelectedSeats("all");
                setSelectedProvince("all");
                setMaxPrice(2300);
                setMaxOdo(200000);
              }}
              className="mt-4 text-xs font-bold text-[#3AB3FF] underline cursor-pointer"
            >
              Đặt lại toàn bộ bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCars.map((car) => (
              <Link
                key={car.id}
                href={`/xe-cu/${car.slug}`}
                className="group bg-white border border-[#e6e6e6] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] flex flex-col justify-between block"
              >
                {/* Photo & Floating Price Badge */}
                <div className="relative aspect-[16/10] w-full bg-gray-50 overflow-hidden">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Floating Price Badge */}
                  <div className="absolute bottom-2.5 left-2.5 sm:left-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded shadow-sm border border-gray-200">
                    <span className="text-[11px] text-gray-500 mr-1.5 font-medium">Giá bán</span>
                    <span
                      className={`text-sm sm:text-[15px] font-black font-mulish ${
                        car.priceText === "Liên hệ" ? "text-[#00c853]" : "text-[#00c853]"
                      }`}
                    >
                      {car.priceText}
                    </span>
                  </div>
                </div>

                {/* Car Title & Specs */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <h3 className="text-[15px] sm:text-[16px] font-extrabold font-mulish text-[#000000] group-hover:text-[#3AB3FF] transition-colors leading-snug mb-4">
                    {car.name}
                  </h3>

                  {/* 4 Specs items with clean icons */}
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs text-[#555555] pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="font-semibold text-gray-800">{car.version}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>{car.rangeNedc}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-500">
                        {car.seats}
                      </span>
                      <span>{car.seats} chỗ</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="truncate">{car.trunkCapacity}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================
          5. FORM: ĐỊNH GIÁ XE CỦA QUÝ KHÁCH (matching Thịnh Cường 1:1)
         ============================================================ */}
      <section className="relative w-full py-16 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
          style={{
            backgroundImage: `url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/thinhcuong-vinfast.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/75 z-0" />

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto text-white">
            <h2 className="text-center text-[22px] sm:text-[28px] md:text-[32px] font-black font-mulish uppercase tracking-tight text-white mb-2">
              ĐỊNH GIÁ XE CỦA QUÝ KHÁCH
            </h2>
            <p className="text-center text-xs sm:text-sm text-gray-300 mb-8">
              Hãy nhập thông tin theo form bên dưới, VinFast Thịnh Cường sẽ giúp Quý khách định giá chiếc xe.
            </p>

            {valSubmitted ? (
              <div className="bg-black/80 backdrop-blur-md p-8 sm:p-10 rounded-xl text-center space-y-4 border border-white/20">
                <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-[900] text-white">Đăng ký thành công!</h3>
                <p className="text-sm text-gray-200 max-w-md mx-auto">
                  Cảm ơn Quý khách <strong className="text-white">{valName}</strong> ({valPhone}). Chuyên viên thẩm định xe cũ VinFast Thịnh Cường sẽ liên hệ định giá xe trong thời gian sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setValSubmitted(false);
                    setValName("");
                    setValPhone("");
                    setValCarTarget("");
                    setValYear("");
                    setValPlate("");
                  }}
                  className="mt-4 bg-[#3AB3FF] hover:bg-[#1863dc] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleValuationSubmit} className="space-y-4 text-xs sm:text-sm">
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
                      value={valName}
                      onChange={(e) => setValName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
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
                      value={valPhone}
                      onChange={(e) => setValPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                    />
                  </div>
                </div>

                {/* Row 2: Cần định giá xe */}
                <div>
                  <label className="block text-xs font-bold text-gray-200 mb-1.5">
                    Cần định giá xe *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vinfast VF9"
                    value={valCarTarget}
                    onChange={(e) => setValCarTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                  />
                </div>

                {/* Row 3: Năm sản xuất & Biển số xe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-200 mb-1.5">
                      Năm sản xuất
                    </label>
                    <input
                      type="text"
                      placeholder="2020"
                      value={valYear}
                      onChange={(e) => setValYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-200 mb-1.5">
                      Biển số xe của Quý khách
                    </label>
                    <input
                      type="text"
                      placeholder="29A - 88888"
                      value={valPlate}
                      onChange={(e) => setValPlate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-gray-900 placeholder:text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-[#3AB3FF]"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-200 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={valAgreePromo}
                      onChange={(e) => setValAgreePromo(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[#1863dc] focus:ring-[#3AB3FF] cursor-pointer"
                    />
                    <span>
                      Tôi xác nhận rằng Vinfast Thịnh Cường có thể gửi cho tôi thêm thông tin về các sản phẩm hoặc dịch vụ của Vinfast.
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-200 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={valAgreeTerms}
                      onChange={(e) => setValAgreeTerms(e.target.checked)}
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
          6. CAM KẾT CỦA GREEN FUTURE (4 PILLARS)
         ============================================================ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-[#0C0C0C] text-[24px] sm:text-[30px] md:text-[34px] font-black font-mulish uppercase tracking-tight leading-tight">
              Cam kết của Green Future
            </h2>
            <div className="w-16 h-1 bg-[#3AB3FF] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {GREEN_FUTURE_COMMITMENTS.map((comm, cIdx) => (
              <div
                key={cIdx}
                className="bg-[#fcfcfc] border border-gray-200/80 rounded-xl p-6 text-center space-y-4 hover:shadow-md transition-all hover:border-[#3AB3FF]"
              >
                <div className="w-16 h-16 mx-auto relative flex items-center justify-center">
                  <Image
                    src={comm.icon}
                    alt={comm.title}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <h3 className="font-black font-mulish text-[15px] sm:text-[16px] text-[#0C0C0C] uppercase tracking-tight">
                  {comm.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#555555] leading-relaxed text-justify sm:text-center">
                  {comm.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          7. TIN TỨC MỚI NHẤT TỪ VINFAST THỊNH CƯỜNG
         ============================================================ */}
      <section className="py-14 sm:py-20 bg-[#fafafa] border-t border-gray-100">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-[#0C0C0C] text-[24px] sm:text-[30px] md:text-[34px] font-black font-mulish uppercase tracking-tight leading-tight">
              TIN TỨC MỚI NHẤT TỪ Vinfast THỊNH CƯỜNG
            </h2>
            <div className="w-20 h-1 bg-[#3AB3FF] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {USED_CARS_NEWS.map((news) => (
              <div
                key={news.id}
                className="group bg-white border border-gray-200 overflow-hidden rounded-lg shadow-xs hover:shadow-md transition-all flex flex-col"
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
