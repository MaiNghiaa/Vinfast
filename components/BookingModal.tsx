"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Car, Calendar, Phone, User, MapPin, Loader2, Send } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const [leadCode, setLeadCode] = useState("");

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert("Vui lòng nhập họ tên và số điện thoại của bạn.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
          type,
          vehicleSlug: selectedVehicle,
          showroomSlug: selectedShowroom,
          preferredDate,
          note,
          sourceUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json();
      if (data.code) {
        setLeadCode(data.code);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Lỗi gửi form sang Directus:", err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setPhone("");
    setPreferredDate("");
    setNote("");
    setLeadCode("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      {/* Backdrop click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] flex flex-col overflow-hidden border border-gray-100 my-auto">
        {/* Close Button with generous touch target */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Đóng cửa sổ"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white transition-all z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">
              Đăng Ký Thành Công!
            </h3>
            {leadCode && (
              <div className="inline-block px-3.5 py-1.5 bg-blue-50 text-[#1863dc] rounded-full text-xs font-mono font-bold border border-blue-200">
                Mã tiếp nhận: {leadCode}
              </div>
            )}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Cảm ơn Quý khách <strong>{fullName}</strong> đã gửi yêu cầu. Thông tin đã được tiếp nhận trên hệ thống <strong>VinFast Phương Đông</strong>. Chuyên viên tư vấn sẽ liên hệ qua số <strong>{phone}</strong> trong vòng 15 phút.
            </p>
            <div className="bg-gray-50 p-4 rounded-xl text-xs text-gray-600 text-left space-y-1.5 border border-gray-200">
              <p>📍 Showroom tiếp nhận: <strong>{SHOWROOMS.find((s) => s.id === selectedShowroom)?.name}</strong></p>
              <p>🚗 Dòng xe quan tâm: <strong>{VEHICLES.find((v) => v.slug === selectedVehicle)?.name}</strong></p>
              <p>📞 Hotline hỗ trợ trực tiếp: <strong className="text-[#dc2626]">090 242 25 22</strong></p>
            </div>
            <button
              onClick={handleReset}
              className="w-full bg-[#1863dc] hover:bg-[#004dd6] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Header with Type Selector */}
            <div className="bg-[#111827] text-white p-5 sm:p-6 pb-4 sm:pb-5 shrink-0">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#00d2ff] tracking-widest uppercase block mb-1">
                HỆ THỐNG 09 SHOWROOM CHUẨN VINFAST
              </span>
              <h3 className="text-base sm:text-lg font-black uppercase text-white pr-8">
                {type === "lai-thu" && "Đăng Ký Lái Thử Miễn Phí"}
                {type === "bao-gia" && "Nhận Báo Giá & Ưu Đãi Đại Lý"}
                {type === "dich-vu" && "Đặt Lịch Hẹn Xưởng Dịch Vụ"}
              </h3>

              {/* Type Switcher - Responsive Grid */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-3.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setType("lai-thu")}
                  className={`py-2 px-1 rounded-lg text-center transition-all truncate cursor-pointer ${
                    type === "lai-thu"
                      ? "bg-[#1863dc] text-white shadow-xs"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  Lái Thử
                </button>
                <button
                  type="button"
                  onClick={() => setType("bao-gia")}
                  className={`py-2 px-1 rounded-lg text-center transition-all truncate cursor-pointer ${
                    type === "bao-gia"
                      ? "bg-[#1863dc] text-white shadow-xs"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  Báo Giá Xe
                </button>
                <button
                  type="button"
                  onClick={() => setType("dich-vu")}
                  className={`py-2 px-1 rounded-lg text-center transition-all truncate cursor-pointer ${
                    type === "dich-vu"
                      ? "bg-[#1863dc] text-white shadow-xs"
                      : "bg-gray-800 text-gray-300 hover:text-white"
                  }`}
                >
                  Bảo Dưỡng
                </button>
              </div>
            </div>

            {/* Form Fields - Scrollable Container */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5 sm:space-y-4">
              {/* Họ tên & Số điện thoại (Responsive 1-col on small, 2-col on sm) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 outline-none bg-white transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="09xx xxx xxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 outline-none bg-white transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Dòng xe quan tâm hoặc Dịch vụ */}
              {type !== "dich-vu" ? (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Dòng xe VinFast quan tâm
                  </label>
                  <div className="relative">
                    <Car className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 outline-none bg-white cursor-pointer transition-all"
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
                    Dịch vụ kỹ thuật cần đặt lịch
                  </label>
                  <select
                    className="w-full px-3.5 py-2.5 sm:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 outline-none bg-white cursor-pointer transition-all"
                  >
                    <option>Bảo dưỡng định kỳ</option>
                    <option>Sửa chữa kiểm tra Pin & Động cơ</option>
                    <option>Đồng sơn & Giám định bảo hiểm</option>
                    <option>Làm đẹp xe / Dán phim cách nhiệt</option>
                    <option>Lắp đặt phụ kiện chính hãng</option>
                  </select>
                </div>
              )}

              {/* Cơ sở Showroom & Ngày dự kiến */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Cơ sở Showroom gần bạn
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedShowroom}
                      onChange={(e) => setSelectedShowroom(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 outline-none bg-white cursor-pointer transition-all"
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
                    Ngày dự kiến (tùy chọn)
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 sm:py-3 text-base md:text-sm border border-gray-300 rounded-lg focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 outline-none bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Yêu cầu thêm */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yêu cầu thêm (tùy chọn)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Muốn lái thử tại nhà hoặc cần tư vấn gói vay trả góp 80%..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-base md:text-sm border border-gray-300 rounded-lg focus:border-[#1863dc] focus:ring-2 focus:ring-[#1863dc]/20 outline-none transition-all resize-none placeholder:text-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1863dc] hover:bg-[#004dd6] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 sm:py-3.5 rounded-lg text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ĐANG GỬI THÔNG TIN...</span>
                  </>
                ) : (
                  <>
                    <span>GỬI YÊU CẦU NGAY</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-gray-500 text-center leading-tight">
                * Cam kết bảo mật thông tin 100%. Hotline hỗ trợ:{" "}
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
