"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Calendar, Check, X, Car } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { useModal } from "@/components/ClientLayout";

export default function CarComparisonPage() {
  const { openBooking } = useModal();
  const [car1Slug, setCar1Slug] = useState<string>("vinfast-vf6");
  const [car2Slug, setCar2Slug] = useState<string>("vinfast-vf7");
  const [car3Slug, setCar3Slug] = useState<string>("vinfast-vf8");

  const car1 = VEHICLES.find((v) => v.slug === car1Slug) || VEHICLES[2];
  const car2 = VEHICLES.find((v) => v.slug === car2Slug) || VEHICLES[3];
  const car3 = VEHICLES.find((v) => v.slug === car3Slug) || VEHICLES[4];

  const comparedCars = [car1, car2, car3];

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">So sánh xe VinFast</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#111827] text-white py-12 px-4 sm:px-8 border-b border-gray-800 text-center">
        <div className="max-w-[1440px] mx-auto space-y-2">
          <span className="text-xs font-black text-[#00d2ff] uppercase tracking-widest block">
            CÔNG CỤ ĐỐI CHIẾU THÔNG SỐ
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            SO SÁNH CÁC DÒNG XE VINFAST
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Đặt các dòng xe cạnh nhau để so sánh trực quan về kích thước, quãng đường di chuyển, công suất động cơ và giá bán niêm yết.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        {/* Car Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <label className="block text-xs font-bold text-gray-700 mb-1">Mẫu xe 1</label>
            <select
              value={car1Slug}
              onChange={(e) => setCar1Slug(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white outline-none focus:border-[#1863dc] font-bold"
            >
              {VEHICLES.map((v) => (
                <option key={v.id} value={v.slug}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <label className="block text-xs font-bold text-gray-700 mb-1">Mẫu xe 2</label>
            <select
              value={car2Slug}
              onChange={(e) => setCar2Slug(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white outline-none focus:border-[#1863dc] font-bold"
            >
              {VEHICLES.map((v) => (
                <option key={v.id} value={v.slug}>{v.name}</option>
              ))}
            </select>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
            <label className="block text-xs font-bold text-gray-700 mb-1">Mẫu xe 3</label>
            <select
              value={car3Slug}
              onChange={(e) => setCar3Slug(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white outline-none focus:border-[#1863dc] font-bold"
            >
              {VEHICLES.map((v) => (
                <option key={v.id} value={v.slug}>{v.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[700px]">
            {/* Table Header: Car Previews */}
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70">
                <th className="p-4 w-1/4 font-extrabold text-gray-900 uppercase">Tiêu chí</th>
                {comparedCars.map((car, idx) => (
                  <th key={idx} className="p-4 w-1/4 text-center border-l border-gray-200">
                    <div className="relative w-full h-32 mb-2">
                      <Image
                        src={car.thumbnail}
                        alt={car.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <Link href={`/san-pham/${car.slug}`}>
                      <h3 className="text-sm font-black text-gray-900 hover:text-[#1863dc] transition-colors">
                        {car.name}
                      </h3>
                    </Link>
                    <span className="text-xs font-extrabold text-[#dc2626] block mt-1">
                      {car.priceText}
                    </span>
                    <button
                      onClick={() => openBooking(car.slug, "lai-thu")}
                      className="mt-3 bg-[#1863dc] hover:bg-[#004dd6] text-white px-3 py-1.5 rounded text-[11px] font-bold transition-all shadow-xs"
                    >
                      Lái thử xe
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: Specifications Rows */}
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {/* Phân khúc */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Phân khúc</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200 font-semibold">
                    {car.segment}
                  </td>
                ))}
              </tr>

              {/* Số chỗ ngồi */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Số chỗ ngồi</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200">
                    <strong>{car.specs.seats} chỗ</strong>
                  </td>
                ))}
              </tr>

              {/* Quãng đường di chuyển */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Quãng đường 1 lần sạc</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200 text-[#1863dc] font-black">
                    {car.specs.range}
                  </td>
                ))}
              </tr>

              {/* Thời gian sạc nhanh */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Thời gian sạc nhanh (10-70%)</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200 font-semibold">
                    {car.specs.fastCharge}
                  </td>
                ))}
              </tr>

              {/* Công suất cực đại */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Công suất động cơ</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200 font-bold">
                    {car.specs.power}
                  </td>
                ))}
              </tr>

              {/* Kích thước D x R x C */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Kích thước (D x R x C)</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200">
                    {car.specs.dimensions}
                  </td>
                ))}
              </tr>

              {/* Chiều dài cơ sở */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Chiều dài cơ sở</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200">
                    {car.specs.wheelbase}
                  </td>
                ))}
              </tr>

              {/* Khoảng sáng gầm */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Khoảng sáng gầm</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200">
                    {car.specs.groundClearance}
                  </td>
                ))}
              </tr>

              {/* Dung lượng pin */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Dung lượng pin</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200 font-semibold">
                    {car.specs.batteryCapacity}
                  </td>
                ))}
              </tr>

              {/* Gói hỗ trợ lái ADAS */}
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 bg-gray-50/50">Trợ lái ADAS Cấp độ 2</td>
                {comparedCars.map((car, i) => (
                  <td key={i} className="p-3.5 text-center border-l border-gray-200">
                    {car.trims.some((t) => t.adas) ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                        <Check className="w-4 h-4" /> Có trang bị
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <X className="w-4 h-4" /> Không có
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
