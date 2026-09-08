"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mulish } from "next/font/google";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
  Phone,
  Calendar,
} from "lucide-react";
import { UsedCar } from "@/data/types";
import { USED_CARS } from "@/data/usedCars";
import { useModal } from "@/components/ClientLayout";

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

interface UsedCarDetailPageProps {
  car: UsedCar;
}

export default function UsedCarDetailPage({ car }: UsedCarDetailPageProps) {
  const { openBooking } = useModal();

  // Navigation between used cars
  const currentIndex = USED_CARS.findIndex((c) => c.slug === car.slug);
  const prevCar = USED_CARS[(currentIndex - 1 + USED_CARS.length) % USED_CARS.length];
  const nextCar = USED_CARS[(currentIndex + 1) % USED_CARS.length];

  // Gallery images & active image selection
  const gallery = car.galleryImages && car.galleryImages.length > 0 ? car.galleryImages : [car.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert("Vui lòng điền đầy đủ họ tên và số điện thoại.");
      return;
    }
    setSubmitted(true);
  };

  const relatedCars = USED_CARS.filter((c) => c.slug !== car.slug).slice(0, 3);

  return (
    <div className={`w-full bg-white text-[#333333] ${mulish.className}`}>
      {/* ============================================================
          1. TOP ASPHALT ROAD BANNER
         ============================================================ */}
      <section className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] overflow-hidden bg-neutral-900">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/07/toyota-thai-hoa-tu-liem-car-detail-breadcum-all.webp"
          alt="VinFast Thịnh Cường - Xe cũ Green Future"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* ============================================================
          2. PRODUCT SHOWCASE: THUMBNAILS, BIG IMAGE, TITLE & ACTIONS
         ============================================================ */}
      <section className="py-8 sm:py-12 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Breadcrumb & Navigation Arrows */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-[13px] text-[#777777] mb-6 pb-2 border-b border-gray-100">
            <nav className="flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-[#3AB3FF] transition-colors">
                Trang chủ
              </Link>
              <span>/</span>
              <Link href="/xe-cu" className="hover:text-[#3AB3FF] transition-colors">
                Xe cũ Green Future
              </Link>
              <span>/</span>
              <span className="text-black font-semibold">{car.name}</span>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={`/xe-cu/${prevCar.slug}`}
                aria-label={`Xem xe trước: ${prevCar.name}`}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                href={`/xe-cu/${nextCar.slug}`}
                aria-label={`Xem xe tiếp theo: ${nextCar.name}`}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Gallery (Thumbnails + Main View) */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row gap-4">
              {/* Vertical Thumbnails List on left */}
              <div className="flex sm:flex-col gap-2.5 order-2 sm:order-1 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                {gallery.map((imgUrl, gIdx) => (
                  <button
                    key={gIdx}
                    type="button"
                    onClick={() => setActiveImageIndex(gIdx)}
                    className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded border-2 overflow-hidden transition-all cursor-pointer ${
                      activeImageIndex === gIdx
                        ? "border-[#1863dc] ring-2 ring-[#1863dc]/30"
                        : "border-gray-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${car.name} ảnh ${gIdx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Large Main Photo */}
              <div className="relative flex-1 aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden border border-gray-200 order-1 sm:order-2 shadow-sm">
                <Image
                  src={gallery[activeImageIndex] || car.image}
                  alt={car.name}
                  fill
                  priority
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>

            {/* Right: Title, Price, Specs Highlights & Actions */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <span className="inline-block bg-[#eef7ff] text-[#1863dc] text-xs font-black uppercase px-2.5 py-1 rounded tracking-wider mb-2">
                  Xe lướt Green Future chính hãng
                </span>
                <h1 className="text-[22px] sm:text-[26px] md:text-[30px] font-black font-mulish text-[#0C0C0C] tracking-tight leading-snug">
                  {car.name}
                </h1>
              </div>

              {/* Price Banner */}
              <div className="bg-[#f8f9fa] border border-gray-200 p-4 rounded-xl flex items-baseline justify-between">
                <span className="text-xs sm:text-sm text-gray-500 font-medium">Giá chào bán:</span>
                <span className="text-2xl sm:text-3xl font-black text-[#00c853] font-mulish">
                  {car.priceText}
                </span>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <span className="text-gray-500 block text-[11px]">Số ODO:</span>
                  <strong className="text-gray-900 font-bold">{car.odo}</strong>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <span className="text-gray-500 block text-[11px]">Năm sản xuất:</span>
                  <strong className="text-gray-900 font-bold">{car.year}</strong>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <span className="text-gray-500 block text-[11px]">Ngoại / Nội thất:</span>
                  <strong className="text-gray-900 font-bold">
                    {car.exteriorColor} / {car.interiorColor}
                  </strong>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-100">
                  <span className="text-gray-500 block text-[11px]">Số chỗ ngồi:</span>
                  <strong className="text-gray-900 font-bold">{car.seats} chỗ</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="button"
                  onClick={() => openBooking(undefined, "lai-thu")}
                  className="w-full bg-[#1863dc] hover:bg-[#004dd6] text-white font-black py-3.5 px-6 rounded-lg text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  ĐẶT LỊCH XEM XE &amp; LÁI THỬ
                </button>
                <a
                  href="tel:0902422522"
                  className="w-full border-2 border-[#1863dc] text-[#1863dc] hover:bg-[#1863dc] hover:text-white font-black py-3 px-6 rounded-lg text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  HOTLINE TƯ VẤN: 090 242 25 22
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. BẢNG THÔNG TIN XE CHI TIẾT (Matching Thịnh Cường 1:1)
         ============================================================ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-black font-mulish text-[#0C0C0C] uppercase tracking-tight mb-3">
              THÔNG TIN XE {car.name}
            </h2>
            <p className="text-sm sm:text-[15px] text-[#444444] leading-relaxed">
              VinFast Thịnh Cường xin gửi tới Quý khách hàng thông tin chi tiết về chiếc{" "}
              <strong className="text-black font-bold">{car.name}</strong> thuộc nguồn xe GF chính hãng, đã được phân bổ về{" "}
              <strong className="text-black font-bold">{car.allocatedTo}</strong> trong tháng 3/2026.
            </p>
          </div>

          <div className="space-y-8 text-sm sm:text-[15px] text-[#333333]">
            {/* Section 1: Thông tin chung */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-black">1. Thông tin chung</h3>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Dòng xe:</strong> {car.model}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Phiên bản:</strong> {car.version}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Năm sản xuất:</strong> {car.year}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Ngoại thất:</strong> {car.exteriorColor}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Nội thất:</strong> {car.interiorColor}
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200" />

            {/* Section 2: Thông số vận hành */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-black">2. Thông số vận hành</h3>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Odo thực tế:</strong> {car.odo}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Pin:</strong> {car.battery}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Tình trạng xe:</strong> {car.carCondition}
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-gray-200" />

            {/* Section 3: Tình trạng hồ sơ – nguồn gốc xe */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-black">
                3. Tình trạng hồ sơ – nguồn gốc xe
              </h3>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>GF phân bổ:</strong> {car.allocatedTo}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Tình trạng hồ sơ:</strong> {car.documentStatus}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-2" />
                  <span>
                    <strong>Tình trạng xe:</strong> {car.carStatus}
                  </span>
                </li>
              </ul>
            </div>

            {/* Ghi chú */}
            <div className="space-y-2 pt-2">
              <h3 className="text-base sm:text-lg font-black text-black">Ghi chú:</h3>
              <ul className="space-y-1.5 pl-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-2" />
                  <span>Thông tin xe được cập nhật theo hồ sơ nhập của GF.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0 mt-2" />
                  <span>
                    Mọi chi tiết, hình ảnh thực tế và đánh giá tình trạng xe sẽ được bổ sung sau quá trình kiểm định kỹ thuật tại {car.allocatedTo}.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. FORM ĐỊNH GIÁ / TƯ VẤN NHANH
         ============================================================ */}
      <section className="py-12 sm:py-16 bg-[#fafafa] border-t border-gray-200">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-center text-xl sm:text-2xl font-black font-mulish uppercase text-[#0C0C0C] mb-2">
              ĐĂNG KÝ TƯ VẤN &amp; XEM XE TRỰC TIẾP
            </h3>
            <p className="text-center text-xs sm:text-sm text-gray-500 mb-6">
              Để lại thông tin, chuyên viên tư vấn xe cũ Green Future Thịnh Cường sẽ liên hệ ngay trong 15 phút.
            </p>

            {submitted ? (
              <div className="bg-green-50 p-6 rounded-xl text-center space-y-3 text-green-800">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
                <h4 className="font-bold text-base">Gửi yêu cầu thành công!</h4>
                <p className="text-xs">
                  Cảm ơn Quý khách <strong className="text-green-950">{fullName}</strong> ({phone}). Chuyên viên Thịnh Cường sẽ sớm liên hệ tư vấn chiếc {car.name}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Họ tên *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded focus:border-[#1863dc] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded focus:border-[#1863dc] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Ghi chú hoặc câu hỏi:</label>
                  <textarea
                    rows={3}
                    placeholder="Thời gian hẹn xem xe, yêu cầu định giá xe cũ đổi mới..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded focus:border-[#1863dc] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1863dc] hover:bg-[#004dd6] text-white font-black py-3.5 rounded text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow cursor-pointer"
                >
                  GỬI YÊU CẦU TƯ VẤN
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. XE CÙNG HỆ THỐNG GREEN FUTURE
         ============================================================ */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-[20px] sm:text-[24px] md:text-[28px] font-black font-mulish text-[#0C0C0C] uppercase tracking-tight">
              XE CŨ GREEN FUTURE ĐANG CÓ SẴN
            </h2>
            <div className="w-16 h-1 bg-[#3AB3FF] mx-auto mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCars.map((rc) => (
              <Link
                key={rc.id}
                href={`/xe-cu/${rc.slug}`}
                className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden">
                    <Image
                      src={rc.image}
                      alt={rc.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-white font-black text-xs px-2.5 py-1 rounded">
                      {rc.priceText}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-extrabold font-mulish text-sm text-black group-hover:text-[#1863dc] transition-colors line-clamp-2 leading-snug">
                      {rc.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                      <span>ODO: <strong className="text-gray-900">{rc.odo}</strong></span>
                      <span>Năm: <strong className="text-gray-900">{rc.year}</strong></span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
