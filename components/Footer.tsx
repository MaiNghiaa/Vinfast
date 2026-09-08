import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="goal-footer" className="w-full text-[#000000]">
      {/* ========================================================================= */}
      {/* SECTION 1: CÔNG TY & HỆ THỐNG SHOWROOM                                    */}
      {/* Chiều cao thoáng hơn: padding 80px trên, 90px dưới, container: 1380px      */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#ededed] pt-[75px] pb-[85px]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Cột 1: Thông tin công ty Phương Đông (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <Link href="/" className="inline-block">
                    <Image
                      src="/images/logo-phuong-dong.png"
                      alt="VinFast Phương Đông Logo"
                      width={210}
                      height={64}
                      className="w-[200px] h-auto object-contain"
                      priority
                    />
                  </Link>
                </div>
                <h2 className="text-[17px] lg:text-[18px] font-bold text-black uppercase mb-3.5 leading-snug">
                  CÔNG TY CỔ PHẦN PHƯƠNG ĐÔNG
                </h2>
                <div className="space-y-3 text-[14px] font-medium text-black leading-[1.7]">
                  <p>
                    <strong className="font-bold">Nhà phân phối chính hãng VinFast Việt Nam</strong>
                  </p>
                  <p>
                    Hotline tổng đài 24/7:{" "}
                    <strong className="font-bold">
                      <a
                        href="tel:0902422522"
                        className="text-black hover:text-[#f20000] transition-colors"
                      >
                        090 242 25 22
                      </a>
                    </strong>
                  </p>
                  <p>
                    Mail CSKH:{" "}
                    <strong className="font-bold">
                      <a
                        href="mailto:cskh@vinfastphuongdong.com.vn"
                        className="text-black hover:text-[#f20000] transition-colors"
                      >
                        cskh@vinfastphuongdong.com.vn
                      </a>
                    </strong>
                  </p>
                  <p>
                    Trụ sở chính:{" "}
                    <strong className="font-bold">
                      G2, Green Bay, Mễ Trì, Nam Từ Liêm, Hà Nội
                    </strong>
                  </p>
                </div>
              </div>

              <div className="pt-3 text-[14px] font-medium text-black">
                <p>
                  Thời gian làm việc:{" "}
                  <strong className="font-bold">
                    08:00 – 18:00 (Thứ 2 – Chủ nhật)
                  </strong>
                </p>
              </div>
            </div>

            {/* Cột 2: Hệ thống 4 Showroom tại Hà Nội (lg:col-span-8) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5 border-b border-gray-300 pb-2.5">
                <h2 className="text-[17px] lg:text-[18px] font-bold text-black uppercase leading-snug">
                  HỆ THỐNG SHOWROOM HÀ NỘI
                </h2>
                <span className="text-[12px] font-semibold text-gray-700 bg-gray-200/90 px-2.5 py-0.5 rounded">
                  4 Cơ sở đại lý chính thức
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-4.5 text-[14px] text-black flex-1">
                {/* Cơ sở 1: Hoàng Quốc Việt */}
                <div className="bg-[#f7f7f7] p-4 rounded-lg border border-gray-300/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-red-500/60 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#e53935] text-white text-[11px] font-extrabold px-2 py-0.5 rounded tracking-wide">
                        N00802
                      </span>
                      <p className="font-extrabold text-black text-[14.5px] leading-snug">
                        VINFAST HOÀNG QUỐC VIỆT
                      </p>
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#1a1a1a] leading-relaxed">
                      Địa chỉ: Số 14 Hoàng Quốc Việt, Cầu Giấy, HN
                    </p>
                  </div>
                  <p className="text-[13px] text-gray-600 mt-2">
                    Hotline tư vấn:{" "}
                    <a href="tel:0902422522" className="text-black font-bold hover:text-red-600 transition-colors">
                      090 242 25 22
                    </a>
                  </p>
                </div>

                {/* Cơ sở 2: Bát Tràng */}
                <div className="bg-[#f7f7f7] p-4 rounded-lg border border-gray-300/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-red-500/60 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#e53935] text-white text-[11px] font-extrabold px-2 py-0.5 rounded tracking-wide">
                        N00804
                      </span>
                      <p className="font-extrabold text-black text-[14.5px] leading-snug">
                        VINFAST BÁT TRÀNG
                      </p>
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#1a1a1a] leading-relaxed">
                      Địa chỉ: 268 Đường Giáp Hải, Xã Bát Tràng, HN
                    </p>
                  </div>
                  <p className="text-[13px] text-gray-600 mt-2">
                    Hotline tư vấn:{" "}
                    <a href="tel:0902422522" className="text-black font-bold hover:text-red-600 transition-colors">
                      090 242 25 22
                    </a>
                  </p>
                </div>

                {/* Cơ sở 3: Thường Tín */}
                <div className="bg-[#f7f7f7] p-4 rounded-lg border border-gray-300/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-red-500/60 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#e53935] text-white text-[11px] font-extrabold px-2 py-0.5 rounded tracking-wide">
                        N00801
                      </span>
                      <p className="font-extrabold text-black text-[14.5px] leading-snug">
                        VINFAST THƯỜNG TÍN
                      </p>
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#1a1a1a] leading-relaxed">
                      Địa chỉ: 207 Quán Gánh, Thường Tín, HN
                    </p>
                  </div>
                  <p className="text-[13px] text-gray-600 mt-2">
                    Hotline tư vấn:{" "}
                    <a href="tel:0902422522" className="text-black font-bold hover:text-red-600 transition-colors">
                      090 242 25 22
                    </a>
                  </p>
                </div>

                {/* Cơ sở 4: Hòa Lạc */}
                <div className="bg-[#f7f7f7] p-4 rounded-lg border border-gray-300/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-red-500/60 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#e53935] text-white text-[11px] font-extrabold px-2 py-0.5 rounded tracking-wide">
                        N00803
                      </span>
                      <p className="font-extrabold text-black text-[14.5px] leading-snug">
                        VINFAST HÒA LẠC
                      </p>
                    </div>
                    <p className="text-[13.5px] font-semibold text-[#1a1a1a] leading-relaxed">
                      Địa chỉ: Tầng 1, Tòa nhà Hòa Lạc Mall, Thôn 2, Hoà Lạc, HN
                    </p>
                  </div>
                  <p className="text-[13px] text-gray-600 mt-2">
                    Hotline tư vấn:{" "}
                    <a href="tel:0902422522" className="text-black font-bold hover:text-red-600 transition-colors">
                      090 242 25 22
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: DÒNG XE HOT, VỀ VINFAST PHƯƠNG ĐÔNG, SOCIAL, BỘ CÔNG THƯƠNG    */}
      {/* Background: #dadada, padding: 55px 0px, container: 1380px                 */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#dadada] py-[55px]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            {/* Cột 1: Dòng xe HOT (col-span-4) */}
            <div className="lg:col-span-4">
              <h2 className="text-[18px] lg:text-[19px] font-bold text-black uppercase mb-4 leading-snug">
                DÒNG XE HOT
              </h2>
              <div className="grid grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-2.5 text-[13.5px] text-black">
                <div className="space-y-2.5">
                  <Link
                    href="/san-pham/vinfast-vf3"
                    className="block hover:text-[#f20000] transition-colors"
                  >
                    VF3
                  </Link>
                  <Link
                    href="/san-pham/vinfast-vf7"
                    className="block hover:text-[#f20000] transition-colors"
                  >
                    VF7
                  </Link>
                  <Link
                    href="/san-pham/vinfast-nerio-green"
                    className="block hover:text-[#f20000] transition-colors whitespace-nowrap"
                  >
                    NERIO GREEN
                  </Link>
                </div>
                <div className="space-y-2.5">
                  <Link
                    href="/san-pham/vinfast-vf5"
                    className="block hover:text-[#f20000] transition-colors"
                  >
                    VF5
                  </Link>
                  <Link
                    href="/san-pham/vinfast-vf8"
                    className="block hover:text-[#f20000] transition-colors"
                  >
                    VF8
                  </Link>
                  <Link
                    href="/san-pham/vinfast-minio-green"
                    className="block hover:text-[#f20000] transition-colors whitespace-nowrap"
                  >
                    MINIOGREEN
                  </Link>
                </div>
                <div className="space-y-2.5">
                  <Link
                    href="/san-pham/vinfast-vf6"
                    className="block hover:text-[#f20000] transition-colors"
                  >
                    VF6
                  </Link>
                  <Link
                    href="/san-pham/vinfast-vf9"
                    className="block hover:text-[#f20000] transition-colors"
                  >
                    VF9
                  </Link>
                  <Link
                    href="/san-pham/vinfast-limo-green"
                    className="block hover:text-[#f20000] transition-colors whitespace-nowrap"
                  >
                    LIMOGREEN
                  </Link>
                </div>
              </div>
            </div>

            {/* Cột 2: Về VinFast Phương Đông (col-span-3) */}
            <div className="lg:col-span-3">
              <h2 className="text-[18px] lg:text-[19px] font-bold text-black uppercase mb-4 leading-snug">
                VỀ VINFAST PHƯƠNG ĐÔNG
              </h2>
              <ul className="space-y-2.5 text-[14px] text-black">
                <li>
                  <Link
                    href="/gioi-thieu"
                    className="hover:text-[#f20000] transition-colors"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tuyen-dung"
                    className="hover:text-[#f20000] transition-colors"
                  >
                    Tin tuyển dụng
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 3: Kết nối Social VinFast (col-span-2) */}
            <div className="lg:col-span-2">
              <h4 className="text-[18px] lg:text-[19px] font-bold text-black uppercase mb-4 leading-snug whitespace-nowrap">
                KẾT NỐI SOCIAL VINFAST
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/vinfastthinhcuong.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[38px] h-[38px] rounded-full bg-black text-white flex items-center justify-center hover:bg-[#3ab3ff] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 512 512" fill="#ffffff">
                    <path fill="#ffffff" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@Vinfastthinhcuongofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[38px] h-[38px] rounded-full bg-black text-white flex items-center justify-center hover:bg-[#3ab3ff] transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" viewBox="0 0 576 512" fill="#ffffff">
                    <path fill="#ffffff" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Cột 4: Logo Bộ Công Thương & Bản quyền (col-span-3) */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center">
              <div className="w-[190px] mb-2">
                <Image
                  src="/images/footer/logo-da-thong-bao-bo-cong-thuong.webp"
                  alt="Logo đã thông báo bộ công thương"
                  width={600}
                  height={227}
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-[12px] text-[#333333] font-normal leading-normal">
                VinFast Phương Đông | Bảo lưu mọi quyền
              </p>
              <p className="text-[12px] text-[#333333] font-normal leading-normal mt-0.5">
                All rights reserved © 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: HỆ SINH THÁI TẬP ĐOÀN PHƯƠNG ĐÔNG                              */}
      {/* Background: #eeeeee, padding: 55px 0px, card trắng cao ráo, logo to rõ nét  */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#eeeeee] py-[55px] border-t border-white/20">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl py-8 px-6 sm:px-14 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-6 sm:gap-8 min-h-[115px]">
            {/* Logo 1: Phương Đông có slogan (Lớn, cao ~75px) */}
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/images/footer/Logo-Thinh-Cuong-doc-co-slogan-01.png"
                alt="Logo công ty cổ phần Phương Đông"
                width={180}
                height={110}
                className="h-[70px] sm:h-[76px] w-auto object-contain"
              />
            </div>

            {/* Tiêu đề 2 dòng: HỆ SINH THÁI / TẬP ĐOÀN PHƯƠNG ĐÔNG (Chữ to, đậm, rõ nét) */}
            <div className="text-center shrink-0 px-2">
              <h4 className="text-[16px] sm:text-[17.5px] font-black text-black uppercase leading-[1.25] tracking-tight">
                <span>HỆ SINH THÁI</span>
                <br />
                <span>TẬP ĐOÀN PHƯƠNG ĐÔNG</span>
              </h4>
            </div>

            {/* Logo 2: Xanh SM (Lớn, cao ~56px) */}
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/images/footer/Xanh-SM-03-scaled.png"
                alt="Xanh SM Phương Đông"
                width={220}
                height={69}
                className="h-[54px] sm:h-[58px] w-auto object-contain"
              />
            </div>

            {/* Logo 3: VinFast Phương Đông */}
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo-phuong-dong.png"
                alt="VinFast Phương Đông logo"
                width={210}
                height={64}
                className="h-[46px] sm:h-[50px] w-auto object-contain"
              />
            </div>

            {/* Logo 4: An Taxi (Lớn, cao ~52px) */}
            <div className="shrink-0 flex items-center justify-center">
              <a
                href="https://antaxi.com.vn/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-85 transition-opacity"
              >
                <Image
                  src="/images/footer/An-Taxi-03-scaled.png"
                  alt="An Taxi"
                  width={190}
                  height={60}
                  className="h-[48px] sm:h-[52px] w-auto object-contain"
                />
              </a>
            </div>

            {/* Logo 5: Anan's Garden (Lớn, cao ~64px) */}
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/images/footer/AN-GARDEN-LOGO.png"
                alt="AN GARDEN LOGO"
                width={170}
                height={113}
                className="h-[60px] sm:h-[66px] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
