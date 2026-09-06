"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Filter, Car } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import CarCard from "@/components/CarCard";
import { useModal } from "@/components/ClientLayout";

export default function VehicleCatalogPage() {
  const { openBooking } = useModal();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const filteredVehicles = VEHICLES.filter((v) => {
    if (selectedCategory !== "all" && v.category !== selectedCategory) {
      return false;
    }
    if (priceFilter === "under-500" && v.basePrice >= 500000000) {
      return false;
    }
    if (priceFilter === "500-800" && (v.basePrice < 500000000 || v.basePrice > 800000000)) {
      return false;
    }
    if (priceFilter === "over-800" && v.basePrice <= 800000000) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Bảng Giá & Dòng Xe VinFast Mới Nhất</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#111827] text-white py-12 px-4 sm:px-8 border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto text-center space-y-2">
          <span className="text-xs font-black text-[#00d2ff] uppercase tracking-widest block">
            HỆ THỐNG PHÂN PHỐI CHÍNH HÃNG THỊNH CƯỜNG
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            TOÀN BỘ CÁC DÒNG XE Ô TÔ ĐIỆN VINFAST
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Khám phá dải sản phẩm xe điện thông minh đa dạng từ phân khúc Mini SUV đến Full-size SUV hạng sang và xe dịch vụ thương mại xanh.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-extrabold text-gray-700 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Phân loại:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-[#1863dc] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả ({VEHICLES.length})
            </button>
            <button
              onClick={() => setSelectedCategory("electric-car")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                selectedCategory === "electric-car"
                  ? "bg-[#1863dc] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Xe Điện Du Lịch (VF 3 - VF 9)
            </button>
            <button
              onClick={() => setSelectedCategory("green-mobility")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                selectedCategory === "green-mobility"
                  ? "bg-[#1863dc] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Dòng Xanh / Dịch Vụ
            </button>
            <button
              onClick={() => setSelectedCategory("commercial")}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                selectedCategory === "commercial"
                  ? "bg-[#1863dc] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Xe Tải Van Điện
            </button>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-700">Tầm giá:</span>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-gray-300 rounded bg-white outline-none focus:border-[#1863dc]"
            >
              <option value="all">Mọi mức giá</option>
              <option value="under-500">Dưới 500 triệu</option>
              <option value="500-800">500 triệu - 800 triệu</option>
              <option value="over-800">Trên 800 triệu</option>
            </select>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredVehicles.map((vehicle) => (
            <CarCard
              key={vehicle.id}
              vehicle={vehicle}
              onBookTestDrive={(slug) => openBooking(slug, "lai-thu")}
            />
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center text-gray-500 mt-8 border border-gray-200">
            <p className="text-sm">Không tìm thấy mẫu xe nào phù hợp với bộ lọc bạn chọn.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceFilter("all");
              }}
              className="mt-3 text-xs text-[#1863dc] font-bold hover:underline"
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
