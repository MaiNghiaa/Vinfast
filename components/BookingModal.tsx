"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Car, Calendar, Phone, User, MapPin } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { SHOWROOMS } from "@/data/showrooms";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultVehicleSlug?: string;
  defaultType?: "lai-thu" | "bao-gia" | "dich-vu";
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultVehicleSlug,
  defaultType = "lai-thu",
}: BookingModalProps) {
  const [type, setType] = useState<"lai-thu" | "bao-gia" | "dich-vu">(defaultType);
  const [selectedVehicle, setSelectedVehicle] = useState(defaultVehicleSlug || "vinfast-vf3");
  const [selectedShowroom, setSelectedShowroom] = useState("hoang-quoc-viet");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultVehicleSlug) {
      setSelectedVehicle(defaultVehicleSlug);
    }
  }, [defaultVehicleSlug]);

  useEffect(() => {
    if (defaultType) {
      setType(defaultType);
    }
  }, [defaultType]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert("Vui lòng nhập họ tên và số điện thoại của bạn.");
      return;
    }
    // Simulate submission (ready for Directus API)
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">
              Đăng Ký Thành Công!
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Cảm ơn Quý khách <strong>{fullName}</strong> đã gửi yêu cầu. Chuyên viên tư vấn của <strong>VinFast Phương Đông</strong> sẽ liên hệ qua số <strong>{phone}</strong> trong vòng 15 phút để xác nhận lịch hẹn.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-xs text-gray-500 text-left space-y-1 border border-gray-200">
              <p>📍 Cơ sở tiếp nhận: <strong>{SHOWROOMS.find((s) => s.id === selectedShowroom)?.name}</strong></p>
              <p>🚗 Dòng xe: <strong>{VEHICLES.find((v) => v.slug === selectedVehicle)?.name}</strong></p>
              <p>📞 Hotline hỗ trợ ngay: <strong className="text-[#dc2626]">090 242 25 22</strong></p>
            </div>
            <button
              onClick={handleReset}
              className="w-full bg-[#1863dc] hover:bg-[#004dd6] text-white py-2.5 rounded-lg text-xs font-bold uppercase transition-colors"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <div>
            {/* Header Tabs */}
            <div className="bg-[#111827] text-white p-6 pb-4">
              <span className="text-[11px] font-bold text-[#00d2ff] tracking-widest uppercase block mb-1">
                HỆ THỐNG 09 SHOWROOM CHUẨN VINFAST
              </span>
              <h3 className="text-lg font-black uppercase text-white">
                {type === "lai-thu" && "Đăng Ký Lái Thử Miễn Phí"}
                {type === "bao-gia" && "Nhận Báo Giá & Ưu Đãi Đại Lý"}
                {type === "dich-vu" && "Đặt Lịch Hẹn Xưởng Dịch Vụ"}
              </h3>

              {/* Type Switcher */}
              <div className="flex gap-2 mt-3 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setType("lai-thu")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    type === "lai-thu"
                      ? "bg-[#1863dc] text-white"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  Lái Thử
                </button>
                <button
                  type="button"
                  onClick={() => setType("bao-gia")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    type === "bao-gia"
                      ? "bg-[#1863dc] text-white"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  Báo Giá Lăn Bánh
                </button>
                <button
                  type="button"
                  onClick={() => setType("dich-vu")}
                  className={`px-3 py-1.5 rounded transition-all ${
                    type === "dich-vu"
                      ? "bg-[#1863dc] text-white"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  Bảo Dưỡng / Sửa Chữa
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Họ và tên *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:border-[#1863dc] focus:ring-1 focus:ring-[#1863dc] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:border-[#1863dc] focus:ring-1 focus:ring-[#1863dc] outline-none"
                    />
                  </div>
                </div>
              </div>

              {type !== "dich-vu" ? (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Dòng xe quan tâm
                  </label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:border-[#1863dc] outline-none bg-white"
                    >
                      {VEHICLES.map((car) => (
                        <option key={car.id} value={car.slug}>
                          {car.name} ({car.priceText})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Dịch vụ cần làm
                  </label>
                  <select
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#1863dc] outline-none bg-white"
                  >
                    <option>Bảo dưỡng định kỳ</option>
                    <option>Sửa chữa kiểm tra Pin & Động cơ</option>
                    <option>Đồng sơn & Giám định bảo hiểm</option>
                    <option>Làm đẹp xe / Dán phim cách nhiệt</option>
                    <option>Lắp đặt phụ kiện chính hãng</option>
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Cơ sở Showroom gần bạn
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <select
                      value={selectedShowroom}
                      onChange={(e) => setSelectedShowroom(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:border-[#1863dc] outline-none bg-white"
                    >
                      {SHOWROOMS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.province})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Ngày dự kiến
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded focus:border-[#1863dc] outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yêu cầu thêm (tùy chọn)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Muốn lái thử tại nhà hoặc cần tư vấn gói vay 80%..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:border-[#1863dc] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1863dc] hover:bg-[#004dd6] text-white py-3 rounded-lg text-xs font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                GỬI YÊU CẦU NGAY
              </button>

              <p className="text-[11px] text-gray-500 text-center">
                * Cam kết bảo mật thông tin 100%. Hotline trực tiếp:{" "}
                <a href="tel:0902422522" className="text-[#dc2626] font-bold">
                  090 242 25 22
                </a>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
