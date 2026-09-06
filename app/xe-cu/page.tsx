"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ShieldCheck, CheckCircle2, Car, Phone, ArrowRight } from "lucide-react";
import { useModal } from "@/components/ClientLayout";

const USED_CARS = [
  {
    id: "used-1",
    name: "VinFast VF e34 2022 (Xanh lá)",
    odo: "35.000 km",
    year: "2022",
    batteryHealth: "SOH 97% (Chuẩn hãng)",
    price: "385.000.000 VNĐ",
    warranty: "Bảo hành hãng còn 6 năm",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/vf51.png",
  },
  {
    id: "used-2",
    name: "VinFast VF 8 Plus 2023 (Đỏ mận)",
    odo: "18.000 km",
    year: "2023",
    batteryHealth: "SOH 99% (Xe siêu lướt)",
    price: "790.000.000 VNĐ",
    warranty: "Bảo hành hãng còn 7 năm",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/vf81.png",
  },
  {
    id: "used-3",
    name: "VinFast VF 9 Plus 2023 (Đen)",
    odo: "22.000 km",
    year: "2023",
    batteryHealth: "SOH 98% (Captain Seats)",
    price: "1.180.000.000 VNĐ",
    warranty: "Bảo hành hãng còn 7 năm",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/vf91.png",
  },
];

export default function UsedCarsPage() {
  const { openBooking } = useModal();
  const [oldCarModel, setOldCarModel] = useState("");
  const [targetCarModel, setTargetCarModel] = useState("VF 6");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleTradeInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert("Vui lòng nhập số điện thoại.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Xe điện cũ chính hãng & Thu cũ đổi mới</span>
        </div>
      </div>

      <div className="bg-[#111827] text-white py-14 px-4 sm:px-8 text-center border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto space-y-2">
          <span className="text-xs font-black text-[#00d2ff] uppercase tracking-widest block">
            CHÍNH SÁCH KIỂM ĐỊNH 176 HẠNG MỤC
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase">
            XE ĐIỆN GF CŨ & THU CŨ ĐỔI MỚI THỊNH CƯỜNG
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Cam kết xe lướt chuẩn hãng không đâm đụng, không ngập nước, dung lượng pin đạt chuẩn trên 95% và hỗ trợ đổi xe xăng lấy xe điện với giá cao nhất.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 space-y-12">
        {/* Commitment box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
            <div>
              <strong className="text-xs font-bold text-gray-900 block">Kiểm tra 176 hạng mục</strong>
              <span className="text-[11px] text-gray-500">Kỹ thuật viên xưởng trực tiếp thẩm định</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#1863dc] shrink-0" />
            <div>
              <strong className="text-xs font-bold text-gray-900 block">Bảo hành pin chính hãng</strong>
              <span className="text-[11px] text-gray-500">Kế thừa toàn bộ quyền lợi bảo hành VinFast</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#dc2626] shrink-0" />
            <div>
              <strong className="text-xs font-bold text-gray-900 block">Thu cũ giá cao nhất</strong>
              <span className="text-[11px] text-gray-500">Trợ giá thêm tới 30 triệu khi đổi xe điện</span>
            </div>
          </div>
        </div>

        {/* Used Car Catalog */}
        <div>
          <h2 className="text-xl font-black text-gray-900 uppercase mb-6 text-center">
            DANH SÁCH XE ĐIỆN LƯỚT ĐANG CÓ SẴN
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USED_CARS.map((car) => (
              <div key={car.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between">
                <div>
                  <div className="relative w-full h-44 bg-gray-50 rounded-lg mb-3 flex items-center justify-center">
                    <Image
                      src={car.image}
                      alt={car.name}
                      fill
                      className="object-contain p-3"
                    />
                  </div>
                  <h3 className="text-sm font-black text-gray-900 mb-1">{car.name}</h3>
                  <div className="bg-gray-50 p-2.5 rounded text-xs space-y-1 my-3 border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Số ODO:</span>
                      <strong className="text-gray-900">{car.odo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sức khỏe pin:</span>
                      <strong className="text-emerald-600">{car.batteryHealth}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bảo hành:</span>
                      <strong className="text-gray-900">{car.warranty}</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <span className="text-sm font-black text-[#dc2626]">{car.price}</span>
                  <button
                    onClick={() => openBooking(undefined, "bao-gia")}
                    className="bg-[#1863dc] hover:bg-[#004dd6] text-white px-3 py-1.5 rounded text-xs font-bold"
                  >
                    Xem xe ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trade-In Form (Thu cũ đổi mới) */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-6">
            <span className="text-xs font-black text-[#1863dc] uppercase tracking-widest block">
              ĐỊNH GIÁ XE NHANH CHÓNG
            </span>
            <h2 className="text-xl font-black text-gray-900 uppercase">
              ĐĂNG KÝ THU CŨ ĐỔI MỚI - LÊN ĐỜI XE ĐIỆN
            </h2>
            <p className="text-xs text-gray-600">
              Nhận định giá xe cũ tận nơi và hưởng thêm gói trợ giá trực tiếp khi đổi sang bất kỳ dòng xe VinFast mới nào.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 bg-green-50 rounded-xl text-center space-y-2 text-xs text-green-800">
              <p className="font-bold text-sm">Đã gửi yêu cầu thẩm định xe thành công!</p>
              <p>Chuyên viên thẩm định xe cũ Thịnh Cường sẽ liên hệ định giá xe trong 15 phút.</p>
            </div>
          ) : (
            <form onSubmit={handleTradeInSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mẫu xe cũ bạn đang đi: *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Toyota Vios 2019..."
                    value={oldCarModel}
                    onChange={(e) => setOldCarModel(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded outline-none focus:border-[#1863dc]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mẫu xe điện muốn đổi sang: *</label>
                  <select
                    value={targetCarModel}
                    onChange={(e) => setTargetCarModel(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded outline-none focus:border-[#1863dc] bg-white"
                  >
                    <option>VinFast VF 3</option>
                    <option>VinFast VF 5 Plus</option>
                    <option>VinFast VF 6</option>
                    <option>VinFast VF 7</option>
                    <option>VinFast VF 8</option>
                    <option>VinFast VF 9</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Số điện thoại liên hệ: *</label>
                <input
                  type="tel"
                  required
                  placeholder="09xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded outline-none focus:border-[#1863dc]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 rounded font-black uppercase tracking-wider"
              >
                GỬI THÔNG TIN ĐỊNH GIÁ NGAY
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
