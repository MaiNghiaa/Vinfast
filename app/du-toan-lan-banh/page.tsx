"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Calculator, Calendar, Phone, CheckCircle2 } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { useModal } from "@/components/ClientLayout";

const PROVINCES = [
  { id: "hanoi", name: "Hà Nội", plateFee: 20000000 },
  { id: "hcm", name: "TP. Hồ Chí Minh", plateFee: 20000000 },
  { id: "quangninh", name: "Quảng Ninh", plateFee: 1000000 },
  { id: "vinhphuc", name: "Vĩnh Phúc", plateFee: 1000000 },
  { id: "other", name: "Các tỉnh thành khác", plateFee: 1000000 },
];

export default function RollingCostPage() {
  const { openBooking } = useModal();

  const [selectedVehicleSlug, setSelectedVehicleSlug] = useState(VEHICLES[0].slug);
  const currentVehicle = VEHICLES.find((v) => v.slug === selectedVehicleSlug) || VEHICLES[0];

  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);
  const currentTrim = currentVehicle.trims[selectedTrimIndex] || currentVehicle.trims[0];

  const [batteryOption, setBatteryOption] = useState<"no-battery" | "with-battery">("no-battery");
  const [selectedProvinceId, setSelectedProvinceId] = useState("hanoi");
  const currentProvince = PROVINCES.find((p) => p.id === selectedProvinceId) || PROVINCES[0];

  // Financing State
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanYears, setLoanYears] = useState<number>(5);
  const interestRateYearly = 0.08; // 8% / year

  // Calculations
  const carPrice = batteryOption === "no-battery" ? currentTrim.priceNoBattery : currentTrim.priceWithBattery;
  const registrationTax = 0; // 0% for electric vehicles
  const plateFee = currentProvince.plateFee;
  const inspectionFee = 90000;
  const roadMaintenanceFee = 1560000;
  const civilInsuranceFee = currentVehicle.specs.seats > 5 ? 873400 : 480700;
  const registrationServiceFee = 2000000;

  const totalFees = registrationTax + plateFee + inspectionFee + roadMaintenanceFee + civilInsuranceFee + registrationServiceFee;
  const totalRollingCost = carPrice + totalFees;

  // Loan calculation
  const downPaymentAmount = (carPrice * downPaymentPercent) / 100;
  const loanAmount = carPrice - downPaymentAmount;
  const totalMonths = loanYears * 12;
  const monthlyPrincipal = loanAmount / totalMonths;
  const monthlyFirstInterest = (loanAmount * interestRateYearly) / 12;
  const monthlyFirstPayment = monthlyPrincipal + monthlyFirstInterest;

  const formatVND = (n: number) => new Intl.NumberFormat("vi-VN").format(Math.round(n)) + " VNĐ";

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Dự toán chi phí lăn bánh & Trả góp</span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-[#111827] text-white py-12 px-4 sm:px-8 border-b border-gray-800 text-center">
        <div className="max-w-[1440px] mx-auto space-y-2">
          <span className="text-xs font-black text-[#00d2ff] uppercase tracking-widest block">
            CÔNG CỤ TIỆN ÍCH CHUYÊN NGHIỆP
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
            DỰ TOÁN CHI PHÍ LĂN BÁNH XE ĐIỆN VINFAST
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Tính toán đầy đủ thuế phí, biểu phí trước bạ xe điện 0% và bảng sao kê trả góp ngân hàng hàng tháng linh hoạt.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Input Selection */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
              <h2 className="text-sm font-black uppercase text-[#111827] border-b pb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#1863dc]" /> BƯỚC 1: CHỌN MẪU XE & ĐỊA ĐIỂM ĐĂNG KÝ
              </h2>

              {/* Select Car */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Chọn Dòng Xe VinFast
                </label>
                <select
                  value={selectedVehicleSlug}
                  onChange={(e) => {
                    setSelectedVehicleSlug(e.target.value);
                    setSelectedTrimIndex(0);
                  }}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white outline-none focus:border-[#1863dc]"
                >
                  {VEHICLES.map((car) => (
                    <option key={car.id} value={car.slug}>
                      {car.name} - ({car.segment})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Trim */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Phiên bản
                </label>
                <select
                  value={selectedTrimIndex}
                  onChange={(e) => setSelectedTrimIndex(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white outline-none focus:border-[#1863dc]"
                >
                  {currentVehicle.trims.map((trim, idx) => (
                    <option key={trim.name} value={idx}>
                      {trim.name} - {trim.power}
                    </option>
                  ))}
                </select>
              </div>

              {/* Battery Plan */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Phương án pin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setBatteryOption("no-battery")}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      batteryOption === "no-battery"
                        ? "border-[#1863dc] bg-blue-50/70 text-[#1863dc] ring-1 ring-[#1863dc]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <strong className="block text-xs font-bold">Thuê pin</strong>
                    <span className="text-[11px] text-gray-500">Giá: {formatVND(currentTrim.priceNoBattery)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBatteryOption("with-battery")}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      batteryOption === "with-battery"
                        ? "border-[#1863dc] bg-blue-50/70 text-[#1863dc] ring-1 ring-[#1863dc]"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <strong className="block text-xs font-bold">Mua đứt pin</strong>
                    <span className="text-[11px] text-gray-500">Giá: {formatVND(currentTrim.priceWithBattery)}</span>
                  </button>
                </div>
              </div>

              {/* Select Province */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Khu vực đăng ký biển số
                </label>
                <select
                  value={selectedProvinceId}
                  onChange={(e) => setSelectedProvinceId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white outline-none focus:border-[#1863dc]"
                >
                  {PROVINCES.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name} (Phí biển: {formatVND(prov.plateFee)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bank Loan Calculator Box */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-5">
              <h2 className="text-sm font-black uppercase text-[#111827] border-b pb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" /> BƯỚC 2: TÍNH KẾ HOẠCH TRẢ GÓP NGÂN HÀNG
              </h2>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Tỷ lệ trả trước (%):</span>
                  <span className="text-[#1863dc] font-black">{downPaymentPercent}% ({formatVND(downPaymentAmount)})</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={80}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#1863dc]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>Tối thiểu 15%</span>
                  <span>Tối đa 80%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Thời hạn vay:</span>
                  <span className="text-[#1863dc] font-black">{loanYears} năm ({totalMonths} tháng)</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-[#1863dc]"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>1 năm (12 tháng)</span>
                  <span>8 năm (96 tháng)</span>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số tiền ngân hàng giải ngân:</span>
                  <strong className="text-gray-900">{formatVND(loanAmount)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lãi suất tạm tính:</span>
                  <strong className="text-emerald-700">8.0%/năm</strong>
                </div>
                <div className="flex justify-between border-t border-emerald-200 pt-2 text-sm">
                  <span className="font-extrabold text-gray-900">Trả tháng đầu tiên (Gốc + Lãi):</span>
                  <strong className="font-black text-[#dc2626]">{formatVND(monthlyFirstPayment)}</strong>
                </div>
                <p className="text-[10px] text-gray-500 italic">
                  * Số tiền trả hàng tháng sẽ giảm dần theo dư nợ thực tế.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Detailed Cost Summary Sheet */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-md space-y-4 sticky top-24">
              <div className="border-b pb-3">
                <span className="text-[11px] font-bold text-[#1863dc] uppercase tracking-wider block">
                  BẢNG KÊ CHI TIẾT
                </span>
                <h3 className="text-lg font-black text-[#111827] uppercase">
                  {currentVehicle.name} - {currentTrim.name}
                </h3>
                <span className="text-xs text-gray-500">
                  Địa bàn đăng ký: {currentProvince.name}
                </span>
              </div>

              <div className="divide-y divide-gray-100 text-xs text-gray-700 space-y-2">
                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">1. Giá xe niêm yết:</span>
                  <strong className="text-sm font-black text-gray-900">{formatVND(carPrice)}</strong>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-gray-900">2. Lệ phí trước bạ (0%):</span>
                    <span className="block text-[10px] text-emerald-600 font-bold">Ưu đãi Nhà nước dành cho xe điện</span>
                  </div>
                  <strong className="text-emerald-600 font-black">0 VNĐ</strong>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">3. Phí cấp biển số:</span>
                  <strong>{formatVND(plateFee)}</strong>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">4. Phí đăng kiểm:</span>
                  <strong>{formatVND(inspectionFee)}</strong>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">5. Phí bảo trì đường bộ (1 năm):</span>
                  <strong>{formatVND(roadMaintenanceFee)}</strong>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">6. Bảo hiểm TNDS bắt buộc (1 năm):</span>
                  <strong>{formatVND(civilInsuranceFee)}</strong>
                </div>

                <div className="pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">7. Phí dịch vụ đăng ký (tạm tính):</span>
                  <strong>{formatVND(registrationServiceFee)}</strong>
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-[#111827] text-white p-5 rounded-xl space-y-2">
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Tổng các khoản thuế phí:</span>
                  <span>{formatVND(totalFees)}</span>
                </div>
                <div className="flex justify-between items-end border-t border-gray-700 pt-2">
                  <div>
                    <span className="text-xs text-gray-300 block font-bold uppercase">
                      TỔNG CHI PHÍ LĂN BÁNH:
                    </span>
                    <span className="text-[10px] text-emerald-400">Đã bao gồm toàn bộ thủ tục ra biển</span>
                  </div>
                  <strong className="text-xl sm:text-2xl font-black text-[#00d2ff]">
                    {formatVND(totalRollingCost)}
                  </strong>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => openBooking(currentVehicle.slug, "bao-gia")}
                  className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 rounded-lg text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>NHẬN BÁO GIÁ ĐẠI LÝ GIẢM THÊM</span>
                </button>

                <button
                  onClick={() => openBooking(currentVehicle.slug, "lai-thu")}
                  className="w-full bg-[#1863dc] hover:bg-[#004dd6] text-white py-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>ĐĂNG KÝ LÁI THỬ MẪU XE NÀY</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-gray-500">
                  * Bảng tính mang tính chất tham khảo. Quý khách liên hệ Hotline:{" "}
                  <a href="tel:0902422522" className="text-[#dc2626] font-bold">
                    090 242 25 22
                  </a>{" "}
                  để nhận ưu đãi tiền mặt trực tiếp từ đại lý.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
