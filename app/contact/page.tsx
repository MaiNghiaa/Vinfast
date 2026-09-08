"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

interface HotlineItem {
  name: string;
  phone: string;
}

interface HotlineBox {
  title: string;
  items: HotlineItem[];
}

const HOTLINE_BOXES: HotlineBox[] = [
  {
    title: "HOTLINE BÁN HÀNG & LÁI THỬ",
    items: [
      { name: "VINFAST PHƯƠNG ĐÔNG HOÀNG QUỐC VIỆT (N00802)", phone: "090 242 25 22" },
      { name: "VINFAST PHƯƠNG ĐÔNG BÁT TRÀNG (N00804)", phone: "090 242 25 22" },
      { name: "VINFAST PHƯƠNG ĐÔNG THƯỜNG TÍN (N00801)", phone: "090 242 25 22" },
      { name: "VINFAST PHƯƠNG ĐÔNG HÒA LẠC (N00803)", phone: "090 242 25 22" },
    ],
  },
  {
    title: "HOTLINE DỊCH VỤ & BẢO DƯỠNG",
    items: [
      { name: "XƯỞNG DỊCH VỤ HOÀNG QUỐC VIỆT", phone: "090 242 25 22" },
      { name: "XƯỞNG DỊCH VỤ BÁT TRÀNG", phone: "090 242 25 22" },
      { name: "XƯỞNG DỊCH VỤ THƯỜNG TÍN", phone: "090 242 25 22" },
      { name: "XƯỞNG DỊCH VỤ HÒA LẠC", phone: "090 242 25 22" },
    ],
  },
  {
    title: "CỨU HỘ & KỸ THUẬT 24/7",
    items: [
      { name: "CỨU HỘ PIN TOÀN QUỐC (24/7)", phone: "1900 23 23 89" },
      { name: "CỨU HỘ XE & KÉO XE KHẨN CẤP", phone: "090 242 25 22" },
      { name: "SỬA CHỮA LƯU ĐỘNG (MOBILE SERVICE)", phone: "090 242 25 22" },
      { name: "KỸ THUẬT VIÊN TRỰC KHẨN CẤP", phone: "090 242 25 22" },
    ],
  },
  {
    title: "CSKH & PHỤ TÙNG CHÍNH HÃNG",
    items: [
      { name: "TỔNG ĐÀI CSKH PHƯƠNG ĐÔNG", phone: "090 242 25 22" },
      { name: "KINH DOANH PHỤ TÙNG CHÍNH HÃNG", phone: "090 242 25 22" },
      { name: "TƯ VẤN TRẢ GÓP & BẢO HIỂM", phone: "090 242 25 22" },
      { name: "ĐĂNG KÝ LÁI THỬ XE TẬN NHÀ", phone: "090 242 25 22" },
    ],
  },
];

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Mua xe mới");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert("Vui lòng nhập họ tên và số điện thoại.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-white">
      {/* 1. Top Banner (matching Phương Đông 1620e3b) */}
      <div className="w-full relative overflow-hidden bg-gray-100 aspect-[2560/850] max-h-[460px]">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/thinh-cuong.jpg"
          alt="VinFast Phương Đông"
          fill
          priority
          className="object-cover w-full h-full"
          sizes="100vw"
        />
      </div>

      {/* 2. Map & Headquarters (matching Phương Đông 469388c - contact-section-map) */}
      <section className="py-10 sm:py-14">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Google Maps Embed */}
            <div className="w-full h-[380px] sm:h-[450px] rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d119193.47586174008!2d105.70160333371476!3d21.00080817495498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3135adb234bbd451%3A0x3ab18433f2c2757f!2zMlEyTSs4SiwgTeG7hSBUcsOsLCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lp!3m2!1d21.000828!2d105.784005!5e0!3m2!1svi!2s!4v1752631441555!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ VinFast Phương Đông"
              />
            </div>

            {/* Headquarters Info */}
            <div className="space-y-6 font-['Mulish',sans-serif]">
              <div>
                <h1 className="text-[24px] sm:text-[30px] font-extrabold uppercase text-[#000000] tracking-tight mb-4">
                  LIÊN HỆ VINFAST PHƯƠNG ĐÔNG
                </h1>
              </div>

              {/* Trụ sở chính */}
              <div>
                <h2 className="text-[18px] sm:text-[21px] font-extrabold uppercase text-[#000000] mb-3">
                  TRỤ SỞ CHÍNH
                </h2>
                <div className="space-y-2 text-sm text-[#333333] leading-relaxed">
                  <p>– G2 Vinhomes Green Bay, Mễ Trì, Nam Từ Liêm, Hanoi, Vietnam</p>
                  <p>
                    – Tổng đài 24/7:{" "}
                    <a
                      href="tel:0902422522"
                      className="font-bold text-[#1863dc] hover:text-[#3AB3FF] transition-colors"
                    >
                      090 242 25 22
                    </a>
                  </p>
                  <p>
                    – Email:{" "}
                    <a
                      href="mailto:cskh@vinfastphuongdong.com.vn"
                      className="text-[#333333] hover:text-[#1863dc] transition-colors"
                    >
                      cskh@vinfastphuongdong.com.vn
                    </a>
                  </p>
                </div>
              </div>

              {/* Giờ làm việc */}
              <div className="border-t border-gray-100 pt-5">
                <h2 className="text-[18px] sm:text-[21px] font-extrabold uppercase text-[#000000] mb-3">
                  GIỜ LÀM VIỆC
                </h2>
                <div className="space-y-2 text-sm text-[#333333] leading-relaxed">
                  <p>– Bán hàng: Thứ 2 – Chủ Nhật: 08:00 – 20:00</p>
                  <p>– Xưởng dịch vụ: Thứ 2 – Thứ 7: 08:00 – 17:00</p>
                  <p className="text-gray-600 italic">Chủ nhật: Nhận xe sơn và sửa chữa nhỏ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Form Section (matching Phương Đông 17f8e28 - contact-section-form) */}
      <section className="py-12 bg-gray-50/60 border-t border-b border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-8 font-['Mulish',sans-serif]">
            <h2 className="text-[22px] sm:text-[28px] md:text-[30px] font-extrabold uppercase text-[#000000] tracking-tight mb-3">
              ĐĂNG KÝ FORM - NHẬN ƯU ĐÃI
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Mọi yêu cầu tư vấn về sản phẩm và dịch vụ, Quý khách hàng vui lòng đăng ký thông tin theo mẫu,
              VinFast Phương Đông sẽ liên hệ tới Quý Khách hàng ngay sau khi nhận được thông tin. Xin cảm ơn!
            </p>
          </div>

          <div className="max-w-[860px] mx-auto bg-white p-6 sm:p-10 rounded-xl border border-gray-200/80 shadow-sm">
            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-gray-900">
                  Thông tin đăng ký đã được gửi thành công!
                </h3>
                <p className="text-sm text-gray-600">
                  VinFast Phương Đông sẽ liên hệ với Quý khách trong thời gian sớm nhất.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFullName("");
                    setPhone("");
                    setMessage("");
                  }}
                  className="mt-4 inline-block bg-[#1863dc] hover:bg-[#3AB3FF] text-white px-6 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Họ tên: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Đỗ Việt Nam"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded focus:border-[#1863dc] focus:ring-1 focus:ring-[#1863dc] outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Số điện thoại: *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0966666666"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded focus:border-[#1863dc] focus:ring-1 focus:ring-[#1863dc] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Dịch vụ cần tư vấn: *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded focus:border-[#1863dc] focus:ring-1 focus:ring-[#1863dc] outline-none bg-white transition-all"
                    >
                      <option value="Mua xe mới">Mua xe mới</option>
                      <option value="Tư vấn và báo giá xe mới">Tư vấn và báo giá xe mới</option>
                      <option value="Tư vấn và báo giá xe đã qua sử dụng">Tư vấn và báo giá xe đã qua sử dụng</option>
                      <option value="Đặt lịch Bảo dưỡng & Sửa chữa">Đặt lịch Bảo dưỡng & Sửa chữa</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Lời nhắn thêm: *
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Nội dung cần hỗ trợ..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:border-[#1863dc] focus:ring-1 focus:ring-[#1863dc] outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="text-center pt-3">
                  <button
                    type="submit"
                    className="bg-[#1863dc] hover:bg-[#3AB3FF] text-white font-bold py-2.5 px-10 rounded text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow"
                  >
                    Gửi
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Showrooms Hotline Directory (matching Phương Đông 5025803 - 4 Columns Box-Col) */}
      <section className="py-12 sm:py-16">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 font-['Mulish',sans-serif]">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-[20px] sm:text-[24px] md:text-[26px] font-black uppercase text-[#111111] tracking-tight">
              THÔNG TIN LIÊN HỆ - HỆ THỐNG SHOWROOM VINFAST PHƯƠNG ĐÔNG
            </h2>
          </div>

          {/* 4 Boxes Grid with Equal Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
            {HOTLINE_BOXES.map((box, bIdx) => (
              <div
                key={bIdx}
                className="border border-[#707070] bg-white flex flex-col h-full"
              >
                {/* Header with blue triangle ▶ */}
                <div className="px-3.5 py-3 border-b border-[#707070] flex items-center gap-2">
                  <svg
                    className="w-2.5 h-2.5 text-[#3AB3FF] fill-current shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  <h3 className="font-extrabold text-xs sm:text-[13px] text-black uppercase tracking-wide">
                    {box.title}
                  </h3>
                </div>

                {/* Rows list */}
                <div className="divide-y divide-gray-200/90">
                  {box.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="px-3.5 py-3 flex items-center justify-between gap-2 hover:bg-gray-50/80 transition-colors"
                    >
                      <span className="text-[11px] leading-snug font-bold text-black uppercase flex-1 pr-2">
                        {item.name}
                      </span>
                      <a
                        href={`tel:${item.phone.replace(/\s/g, "")}`}
                        className="text-[11px] sm:text-[12px] font-bold text-black whitespace-nowrap hover:text-[#1863dc] transition-colors"
                      >
                        {item.phone}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Bottom filler to ensure all boxes have identical height */}
                <div className="flex-1 bg-white min-h-[10px]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
