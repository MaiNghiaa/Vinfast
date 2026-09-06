"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  Compass,
  BatteryCharging,
  Gauge,
  Calendar,
  ShieldCheck,
  Check,
  ArrowRight,
  Phone,
  Car,
  FileText,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import CarCard from "@/components/CarCard";
import { useModal } from "@/components/ClientLayout";

export default function VehicleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const vehicle = VEHICLES.find((v) => v.slug === slug);
  const { openBooking } = useModal();

  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState<"specs" | "features" | "warranty">("specs");

  if (!vehicle) {
    return notFound();
  }

  const selectedTrim = vehicle.trims[selectedTrimIndex] || vehicle.trims[0];
  const selectedColor = vehicle.colors[selectedColorIndex] || vehicle.colors[0];
  const relatedVehicles = VEHICLES.filter((v) => v.slug !== vehicle.slug && v.category === vehicle.category).slice(0, 3);

  const formatVND = (amount: number) => {
    return new Intl.NumberFormat("vi-VN").format(amount) + " VNĐ";
  };

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/xe-moi" className="hover:text-[#1863dc]">Xe mới</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">{vehicle.name}</span>
        </div>
      </div>

      {/* Vehicle Hero / Color Visualizer Section */}
      <section className="py-10 lg:py-16 bg-[#f8f9fa] border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive Vehicle Render Preview */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full h-72 sm:h-96 md:h-[450px] bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-center shadow-md">
                <Image
                  src={selectedColor.imageUrl || vehicle.thumbnail}
                  alt={`${vehicle.name} - ${selectedColor.name}`}
                  fill
                  className="object-contain p-4 transition-all duration-500"
                  priority
                />

                {vehicle.badge && (
                  <span className="absolute top-4 left-4 bg-[#dc2626] text-white text-xs font-black uppercase px-3 py-1 rounded shadow">
                    {vehicle.badge}
                  </span>
                )}
              </div>

              {/* Color Swatch Selector */}
              <div className="mt-6 bg-white px-6 py-4 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center gap-2">
                <span className="text-xs font-bold text-gray-700">
                  Màu sắc ngoại thất: <strong className="text-[#1863dc]">{selectedColor.name}</strong>
                </span>
                <div className="flex items-center gap-3">
                  {vehicle.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      style={{ backgroundColor: color.hex }}
                      className={`w-8 h-8 rounded-full border-2 transition-all shadow-xs ${
                        selectedColorIndex === idx
                          ? "border-[#1863dc] scale-125 ring-2 ring-blue-300"
                          : "border-gray-300 hover:scale-110"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Vehicle Pricing & Trim Selection */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[#1863dc] text-xs font-extrabold uppercase tracking-widest block mb-1">
                  {vehicle.segment}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black text-[#111827] uppercase tracking-tight">
                  {vehicle.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {vehicle.tagline}
                </p>
              </div>

              {/* Trim Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-gray-800 mb-2">
                  CHỌN PHIÊN BẢN XE:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {vehicle.trims.map((trim, idx) => (
                    <button
                      key={trim.name}
                      onClick={() => setSelectedTrimIndex(idx)}
                      className={`p-3.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                        selectedTrimIndex === idx
                          ? "border-[#1863dc] bg-blue-50/70 shadow-xs ring-1 ring-[#1863dc]"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div>
                        <strong className="text-xs font-black text-gray-900 block">
                          {trim.name}
                        </strong>
                        <span className="text-[11px] text-gray-500">
                          {trim.driveType} • {trim.power}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-[#dc2626] block">
                          {formatVND(trim.priceNoBattery)}
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold">
                          (Thuê pin)
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Details Box */}
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs text-gray-600 font-semibold">Giá xe không kèm pin (Thuê pin):</span>
                  <strong className="text-sm font-black text-gray-900">
                    {formatVND(selectedTrim.priceNoBattery)}
                  </strong>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-xs text-gray-600 font-semibold">Giá xe mua đứt pin:</span>
                  <strong className="text-sm font-black text-[#dc2626]">
                    {formatVND(selectedTrim.priceWithBattery)}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 p-2 rounded">
                  <span>Ưu đãi lệ phí trước bạ:</span>
                  <strong>MIỄN PHÍ 100%</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => openBooking(vehicle.slug, "lai-thu")}
                  className="bg-[#1863dc] hover:bg-[#004dd6] text-white py-3 rounded-lg text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>ĐĂNG KÝ LÁI THỬ</span>
                </button>
                <Link
                  href="/du-toan-lan-banh"
                  className="border-2 border-[#1863dc] text-[#1863dc] hover:bg-[#1863dc] hover:text-white py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all text-center flex items-center justify-center gap-2"
                >
                  <span>DỰ TOÁN LĂN BÁNH</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="text-center pt-1">
                <a
                  href="tel:0902422522"
                  className="text-xs text-gray-600 hover:text-[#dc2626] font-bold inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>Tư vấn trực tiếp đại lý 24/7: <strong>090 242 25 22</strong></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Tabs */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-center gap-3 border-b border-gray-200 pb-4 mb-8">
            <button
              onClick={() => setActiveSpecTab("specs")}
              className={`px-6 py-2 rounded-lg text-xs font-extrabold uppercase transition-all ${
                activeSpecTab === "specs"
                  ? "bg-[#1863dc] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Thông Số Kỹ Thuật
            </button>
            <button
              onClick={() => setActiveSpecTab("features")}
              className={`px-6 py-2 rounded-lg text-xs font-extrabold uppercase transition-all ${
                activeSpecTab === "features"
                  ? "bg-[#1863dc] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Trang Bị Nổi Bật
            </button>
            <button
              onClick={() => setActiveSpecTab("warranty")}
              className={`px-6 py-2 rounded-lg text-xs font-extrabold uppercase transition-all ${
                activeSpecTab === "warranty"
                  ? "bg-[#1863dc] text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Bảo Hành & Hậu Mãi
            </button>
          </div>

          {/* Tab 1: Specs Table */}
          {activeSpecTab === "specs" && (
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-base font-extrabold text-[#111827] uppercase mb-4 text-center">
                BẢNG THÔNG SỐ CHI TIẾT {vehicle.name.toUpperCase()} ({selectedTrim.name.toUpperCase()})
              </h3>
              <div className="divide-y divide-gray-200 text-xs text-gray-800">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Số chỗ ngồi</span>
                  <strong className="text-gray-900">{vehicle.specs.seats} chỗ</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Kích thước tổng thể (Dài x Rộng x Cao)</span>
                  <strong className="text-gray-900">{vehicle.specs.dimensions}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Chiều dài cơ sở</span>
                  <strong className="text-gray-900">{vehicle.specs.wheelbase}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Khoảng sáng gầm xe</span>
                  <strong className="text-gray-900">{vehicle.specs.groundClearance}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Dung lượng pin danh định</span>
                  <strong className="text-gray-900">{vehicle.specs.batteryCapacity}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Quãng đường di chuyển 1 lần sạc</span>
                  <strong className="text-[#1863dc]">{selectedTrim.range}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Thời gian nạp pin nhanh (10-70%)</span>
                  <strong className="text-gray-900">{vehicle.specs.fastCharge}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Công suất tối đa</span>
                  <strong className="text-gray-900">{selectedTrim.power}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Mô-men xoắn cực đại</span>
                  <strong className="text-gray-900">{selectedTrim.torque}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Hệ dẫn động</span>
                  <strong className="text-gray-900">{selectedTrim.driveType}</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Số túi khí an toàn</span>
                  <strong className="text-gray-900">{selectedTrim.airbags} túi khí</strong>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Gói trợ lái ADAS Cấp độ 2</span>
                  <strong className={selectedTrim.adas ? "text-green-600" : "text-gray-400"}>
                    {selectedTrim.adas ? "Có trang bị sẵn" : "Không hỗ trợ"}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Features */}
          {activeSpecTab === "features" && (
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.features.map((feat, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-800 font-semibold leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Warranty */}
          {activeSpecTab === "warranty" && (
            <div className="max-w-3xl mx-auto space-y-4 text-xs text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h4 className="text-sm font-extrabold text-[#111827] uppercase">
                CHÍNH SÁCH BẢO HÀNH CHÍNH HÃNG VINFAST
              </h4>
              <p>
                ✓ Bảo hành xe mới lên tới <strong>7 - 10 năm hoặc 160.000 - 200.000 km</strong> (tùy dòng xe).
              </p>
              <p>
                ✓ Bảo hành pin không giới hạn số km (với pin mua đứt) hoặc miễn phí thay thế pin khi dung lượng chai dưới 70% (với chính sách thuê pin).
              </p>
              <p>
                ✓ Cứu hộ miễn phí 24/7 trong suốt thời gian bảo hành tại mọi cung đường trên toàn quốc.
              </p>
              <p>
                ✓ Dịch vụ sửa chữa lưu động Mobile Service và sạc pin lưu động Mobile Charging tận nơi.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="py-14 bg-[#f8f9fa] border-t border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
            <h3 className="text-xl font-black text-[#111827] uppercase mb-6 text-center">
              CÁC DÒNG XE CÙNG PHÂN KHÚC
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVehicles.map((car) => (
                <CarCard
                  key={car.id}
                  vehicle={car}
                  onBookTestDrive={(slug) => openBooking(slug, "lai-thu")}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
