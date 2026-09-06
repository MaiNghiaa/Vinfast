"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, Facebook, Youtube, Instagram, ChevronRight } from "lucide-react";

// Carousel 1: Xưởng dịch vụ & Kỹ thuật viên (11 ảnh)
const SERVICE_IMAGES = [
  "/images/about/xuong-dich-vu-vinfast-thinhcuong-11xuong-dich-vu-vinfast-thinhcuong-114444.jpg",
  "/images/about/dich-vu-vinfast-thinhcuong-1.jpg",
  "/images/about/cvdv-vinfast-thinhcuong.jpg",
  "/images/about/dich-vu-sua-chua-thinh-cuong-1.jpg",
  "/images/about/dich-vu-sua-chua-thinh-cuong-6.jpg",
  "/images/about/xuong-dich-vu-vinfast-thinhcuong-1166.jpg",
  "/images/about/van-hoa-vinfast-thinhcuong-89.jpg",
  "/images/about/123-vinfast-thinhcuong.jpg",
  "/images/about/xuong-dich-vu-vinfast-thinhcuong-11888.jpg",
  "/images/about/xuong-dich-vu-vinfast-thinhcuong-112.jpg",
  "/images/about/xuong-dich-vu-vinfast-thinhcuong-11.jpg",
];

// Carousel 2: Văn hóa & Bàn giao khách hàng (8 ảnh)
const CULTURE_IMAGES = [
  "/images/about/van-hoa-vinfast-thinhcuong-2.jpg",
  "/images/about/vinfast-thinhcuong-6.jpg",
  "/images/about/vinfast-thinhcuong-100.jpg",
  "/images/about/vinfast-thinhcuong-105.jpg",
  "/images/about/khach-hang-vinfast-thinhcuong.jpg",
  "/images/about/vinfast-thinhcuong-203.jpg",
  "/images/about/vinfast-thinhcuong-101.jpg",
  "/images/about/vinfast-thinhcuong-23.jpg",
];

// Gallery 5 ảnh Hướng tới tương lai xanh
const GREEN_GALLERY = [
  { src: "/images/about/vinfast14.jpg", alt: "VinFast Thịnh Cường tương lai xanh 1" },
  { src: "/images/about/vinfast1.jpg", alt: "VinFast Thịnh Cường tương lai xanh 2" },
  { src: "/images/about/vinfast3.jpg", alt: "VinFast Thịnh Cường tương lai xanh 3" },
  { src: "/images/about/vinfast2.jpg", alt: "VinFast Thịnh Cường tương lai xanh 4" },
  { src: "/images/about/dich-vu-sua-chua-thinh-cuong-7_n.jpg", alt: "VinFast Thịnh Cường tương lai xanh 5" },
];

export default function AboutPage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Auto-scroll logic for Carousel 1
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const [isPaused1, setIsPaused1] = useState(false);

  useEffect(() => {
    const el = scrollRef1.current;
    if (!el) return;
    let animationFrameId: number;

    const step = () => {
      if (!isPaused1 && el) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused1]);

  // Auto-scroll logic for Carousel 2
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [isPaused2, setIsPaused2] = useState(false);

  useEffect(() => {
    const el = scrollRef2.current;
    if (!el) return;
    let animationFrameId: number;

    const step = () => {
      if (!isPaused2 && el) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused2]);

  return (
    <div className="w-full bg-white selection:bg-[#1863dc] selection:text-white">
      {/* 1. HERO BANNER CHUẨN KÍCH THƯỚC VÀ VỊ TRÍ GỐC THỊNH CƯỜNG (ẢNH 2) */}
      <section className="relative w-full min-h-[460px] sm:min-h-[500px] md:min-h-[540px] lg:min-h-[560px] flex items-center justify-center overflow-hidden">
        {/* Background image thinh-cuong-1.jpg with dark overlay 0.62 */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/about/thinh-cuong-1.jpg"
            alt="Giới thiệu VinFast Thịnh Cường"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content Centered placed over the canopy facade matching Ảnh 2 */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center pt-[220px] sm:pt-[250px] md:pt-[275px] lg:pt-[295px] pb-[35px] md:pb-[45px]">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-extrabold uppercase tracking-[1px] font-['Mulish',sans-serif] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] mb-3 sm:mb-4">
            GIỚI THIỆU VINFAST THỊNH CƯỜNG
          </h1>

          {/* Social Icons matching elementor social-icons (nhỏ gọn, chuẩn ảnh 2) */}
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/vinfastthinhcuong.com.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3AB3FF] transition-all duration-300 hover:scale-115 cursor-pointer p-1"
              aria-label="Facebook VinFast Thịnh Cường"
            >
              <Facebook className="w-[18px] h-[18px] fill-current" />
            </a>
            <a
              href="https://www.youtube.com/@Vinfastthinhcuongofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3AB3FF] transition-all duration-300 hover:scale-115 cursor-pointer p-1"
              aria-label="YouTube VinFast Thịnh Cường"
            >
              <Youtube className="w-[18px] h-[18px] fill-current" />
            </a>
            <a
              href="https://www.facebook.com/vinfastthinhcuong.com.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#3AB3FF] transition-all duration-300 hover:scale-115 cursor-pointer p-1"
              aria-label="Instagram VinFast Thịnh Cường"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. SECTION: 25 NĂM KIẾN TẠO GIÁ TRỊ BỀN VỮNG */}
      <section className="py-12 sm:py-16 bg-white text-center">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-[27px] font-extrabold uppercase text-[#000000] tracking-[0.2px] font-['Mulish',sans-serif] leading-snug mb-5">
            25 NĂM KIẾN TẠO GIÁ TRỊ BỀN VỮNG
          </h2>
          <p className="text-sm sm:text-base text-[#111111] leading-relaxed max-w-5xl mx-auto font-normal">
            <strong className="font-bold">Công ty Cổ phần Thịnh Cường (Tập đoàn Thịnh Cường)</strong> được thành lập từ năm 2001. Trải qua <strong className="font-bold">25 năm phát triển không ngừng</strong>, Thịnh Cường đã từng bước xây dựng hệ sinh thái đa ngành vững mạnh, bao gồm: <strong className="font-bold">Khai thác khoáng sản – Xây dựng hạ tầng – Vận tải Logistics – Dịch vụ AnTaxi – Công nghệ Global – Nhà hàng Khách sạn An Bình</strong>, và đặc biệt là lĩnh vực đầy tiềm năng: <strong className="font-bold text-[#1863dc]">Xe ô tô điện VinFast</strong>.
          </p>

        </div>
      </section>

      {/* 3. SECTION: VINFAST THỊNH CƯỜNG – NHÀ PHÂN PHỐI Ô TÔ ĐIỆN SỐ 1 VIỆT NAM */}
      <section className="pb-10 bg-white text-center">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <h3 className="text-lg sm:text-xl md:text-[23px] font-extrabold uppercase text-[#000000] tracking-[1.2px] font-['Mulish',sans-serif] leading-snug mb-5">
            VINFAST THỊNH CƯỜNG – NHÀ PHÂN PHỐI Ô TÔ ĐIỆN SỐ 1 VIỆT NAM
          </h3>
          <p className="text-sm sm:text-base text-[#111111] leading-relaxed max-w-5xl mx-auto mb-6">
            <strong className="font-bold">VinFast Thịnh Cường</strong> là nhà phân phối chính thức và đối tác chiến lược của VinFast Việt Nam, hiện đang sở hữu hệ thống <strong className="font-bold text-[#1863dc]">09 Showroom và 12 xưởng dịch vụ</strong>. Tất cả đều được vận hành theo mô hình <strong className="font-bold">Đại lý 3S hiện đại</strong> (Xe mới – Dịch vụ – Phụ tùng phụ kiện), đặt tại 3 khu vực trọng điểm:
          </p>

          {/* 3 Trọng điểm phân phối */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold text-[#000000]">
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full shadow-2xs">
              <span className="text-[#1863dc]">🔷</span>
              <span><strong className="font-extrabold">Hà Nội:</strong> 5 Showroom – 6 Xưởng dịch vụ</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full shadow-2xs">
              <span className="text-[#1863dc]">🔷</span>
              <span><strong className="font-extrabold">Quảng Ninh:</strong> 3 Showroom – 3 Xưởng dịch vụ</span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full shadow-2xs">
              <span className="text-[#1863dc]">🔷</span>
              <span><strong className="font-extrabold">Tây Bắc (Vĩnh Phúc, Việt Trì, Tuyên Quang):</strong> 1 Showroom – 3 Xưởng dịch vụ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAROUSEL 1: HỆ THỐNG XƯỞNG DỊCH VỤ & KỸ THUẬT VIÊN */}
      <section className="py-6 bg-white overflow-hidden">
        <div
          ref={scrollRef1}
          onMouseEnter={() => setIsPaused1(true)}
          onMouseLeave={() => setIsPaused1(false)}
          className="flex gap-4 overflow-x-hidden select-none whitespace-nowrap"
          style={{ scrollBehavior: "auto" }}
        >
          {[...SERVICE_IMAGES, ...SERVICE_IMAGES].map((src, idx) => (
            <div
              key={`srv-${idx}`}
              className="relative shrink-0 w-[260px] sm:w-[320px] md:w-[360px] h-[180px] sm:h-[220px] rounded-lg overflow-hidden shadow-xs border border-gray-200 group"
            >
              <Image
                src={src}
                alt="Xưởng dịch vụ VinFast Thịnh Cường"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 260px, 360px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECTION: DỊCH VỤ BẰNG TRÁI TIM – KẾT NỐI BẰNG GIÁ TRỊ */}
      <section className="py-12 sm:py-16 bg-white text-center">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <h3 className="text-lg sm:text-xl md:text-[24px] font-extrabold uppercase text-[#000000] tracking-wide font-['Mulish',sans-serif] leading-snug mb-6">
            DỊCH VỤ BẰNG TRÁI TIM – KẾT NỐI BẰNG GIÁ TRỊ
          </h3>
          <p className="text-sm sm:text-base text-[#222222] leading-relaxed max-w-5xl mx-auto text-justify sm:text-center font-normal">
            Tại VinFast Thịnh Cường, mỗi dịch vụ không chỉ là một quy trình, mà là một hành trình gắn kết cảm xúc giữa thương hiệu và khách hàng. Vinfast Thịnh Cường luôn tâm niệm rằng: Chất lượng phục vụ khách hàng chuyên nghiệp sẽ được chúng tôi phục vụ chu đáo ngay từ khoảnh khắc đầu tiên Quý khách hàng quan tâm, tìm hiểu thương hiệu Đại lý cho đến khi quyết định trở thành Khách hàng. Tại mỗi thời điểm, chúng tôi chú trọng tới từng chi tiết, tỉ mỉ trong từng hành động, thể hiện lòng biết ơn, sự thấu hiểu sâu sắc tới từng nhu cầu dù là nhỏ nhất của Khách hàng, nhằm mang đến trải nghiệm hài lòng nhất tới Khách hàng. Sự hài lòng của khách hàng chính là nền tảng cho thành công bền vững, là nguồn cảm hứng thúc đẩy chúng tôi không ngừng sáng tạo, cải tiến và phát triển mạnh mẽ hơn mỗi ngày.
          </p>
        </div>
      </section>

      {/* 6. CAROUSEL 2: VĂN HÓA & BÀN GIAO XE KHÁCH HÀNG */}
      <section className="py-6 bg-white overflow-hidden">
        <div
          ref={scrollRef2}
          onMouseEnter={() => setIsPaused2(true)}
          onMouseLeave={() => setIsPaused2(false)}
          className="flex gap-4 overflow-x-hidden select-none whitespace-nowrap"
          style={{ scrollBehavior: "auto" }}
        >
          {[...CULTURE_IMAGES, ...CULTURE_IMAGES].map((src, idx) => (
            <div
              key={`cul-${idx}`}
              className="relative shrink-0 w-[260px] sm:w-[320px] md:w-[360px] h-[180px] sm:h-[220px] rounded-lg overflow-hidden shadow-xs border border-gray-200 group"
            >
              <Image
                src={src}
                alt="Văn hóa và khách hàng VinFast Thịnh Cường"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                sizes="(max-width: 768px) 260px, 360px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 7. SECTION: GIẢI THƯỞNG VINFAST THỊNH CƯỜNG (CHỈ CÓ ẢNH TRỰC TIẾP, KHÔNG CÓ BOX) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h3 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold uppercase text-[#000000] tracking-tight font-['Mulish',sans-serif]">
              GIẢI THƯỞNG VINFAST THỊNH CƯỜNG
            </h3>
          </div>

          {/* 3 ảnh giải thưởng đứng độc lập, không có viền/nền box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full">
            <div className="relative w-full aspect-square overflow-hidden group cursor-pointer">
              <Image
                src="/images/about/TTT.jpg"
                alt="Giải thưởng VinFast Thịnh Cường 1"
                fill
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>

            <div className="relative w-full aspect-square overflow-hidden group cursor-pointer">
              <Image
                src="/images/about/FDGHFDHDF.jpg"
                alt="Giải thưởng VinFast Thịnh Cường 2"
                fill
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>

            <div className="relative w-full aspect-square overflow-hidden group cursor-pointer">
              <Image
                src="/images/about/FDFDFD22.jpg"
                alt="Giải thưởng VinFast Thịnh Cường 3"
                fill
                className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 450px"
              />
            </div>
          </div>
        </div>
      </section>


      {/* 8. SECTION: 3 CỘT (VỊ THẾ DẪN ĐẦU - SỨ MỆNH PHỤC VỤ - GIÁ TRỊ CỐT LÕI) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {/* Cột 1: Vị thế dẫn đầu */}
            <div className="bg-[#fbfbfb] rounded-xl p-6 sm:p-8 border border-gray-100 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-extrabold uppercase text-center text-[#000000] tracking-[0.8px] mb-5 pb-3 border-b-2 border-[#1863dc] font-['Mulish',sans-serif]">
                VỊ THẾ DẪN ĐẦU
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-[#111111] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    <strong className="font-bold">Nhà phân phối xe ô tô điện Vinfast số 01 Việt Nam</strong> được khách hàng tin tưởng và lựa chọn.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    Tại Vinfast Thịnh Cường, quý khách không chỉ tìm thấy một <strong className="font-bold">dịch vụ đáng tin cậy</strong>, <strong className="font-bold">đội ngũ cán bộ – nhân viên tận tâm</strong>, mà còn cảm nhận được <strong className="font-bold">tinh thần phục vụ bằng trái tim</strong>, xuyên suốt từ khâu tư vấn, bàn giao xe đến hậu mãi sau bán hàng.
                  </p>
                </div>
              </div>
            </div>

            {/* Cột 2: Sứ mệnh phục vụ */}
            <div className="bg-[#fbfbfb] rounded-xl p-6 sm:p-8 border border-gray-100 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-extrabold uppercase text-center text-[#000000] tracking-[0.8px] mb-5 pb-3 border-b-2 border-[#1863dc] font-['Mulish',sans-serif]">
                SỨ MỆNH PHỤC VỤ
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-[#111111] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    VinFast Thịnh Cường cam kết mang đến các sản phẩm và dịch vụ ô tô điện chất lượng cao, đáp ứng toàn diện nhu cầu của khách hàng hiện đại.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    Chúng tôi đồng hành cùng khách hàng trên <strong className="font-bold">hành trình hướng tới tương lai xanh</strong>, nơi công nghệ hiện đại kết hợp cùng giá trị nhân văn – để mỗi chuyến đi đều là một trải nghiệm an toàn, bền vững và đầy cảm hứng.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    <strong className="font-bold">Phát triển bền vững:</strong> Kết hợp hài hòa giữa hiệu quả kinh doanh và trách nhiệm với xã hội, môi trường.
                  </p>
                </div>
              </div>
            </div>

            {/* Cột 3: Giá trị cốt lõi */}
            <div className="bg-[#fbfbfb] rounded-xl p-6 sm:p-8 border border-gray-100 shadow-2xs hover:shadow-md transition-shadow">
              <h3 className="text-base sm:text-lg font-extrabold uppercase text-center text-[#000000] tracking-[0.8px] mb-5 pb-3 border-b-2 border-[#1863dc] font-['Mulish',sans-serif]">
                GIÁ TRỊ CỐT LÕI
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-[#111111] leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    <strong className="font-bold">Chính trực:</strong> Luôn minh bạch, trung thực và giữ vững đạo đức nghề nghiệp trong mọi hành động.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    <strong className="font-bold">Tận tâm phục vụ:</strong> Mọi hoạt động đều hướng đến mục tiêu nâng cao trải nghiệm và sự hài lòng của khách hàng. Phục vụ bằng cả trái tim – tỉ mỉ trong từng chi tiết, chu đáo trong từng quy trình.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#1863dc] shrink-0 mt-0.5">🔹</span>
                  <p>
                    <strong className="font-bold">Sáng tạo – Cải tiến không ngừng:</strong> Luôn đổi mới, cải tiến sản phẩm, dịch vụ và quy trình để dẫn đầu xu thế.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECTION: HƯỚNG TỚI TƯƠNG LAI XANH – CÙNG VINFAST VIỆT NAM & GALLERY (ẢNH TO HƠN THEO ẢNH 2) */}
      <section className="py-12 sm:py-18 bg-white text-center">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl md:text-[26px] font-extrabold uppercase text-[#000000] tracking-wide font-['Mulish',sans-serif] leading-snug mb-6">
            HƯỚNG TỚI TƯƠNG LAI XANH – CÙNG VINFAST VIỆT NAM
          </h3>

          <p className="text-sm sm:text-base text-[#222222] leading-relaxed max-w-5xl mx-auto mb-4 font-normal">
            Hơn cả vai trò một nhà phân phối ô tô điện, VinFast Thịnh Cường mang trong mình sứ mệnh kết nối cộng đồng trên hành trình chuyển đổi xanh vì tương lai bền vững. Chúng tôi hướng tới việc kiến tạo một phong cách sống hiện đại, thân thiện với môi trường, bằng tinh thần tiên phong và đổi mới không ngừng trong từng sản phẩm, dịch vụ.
          </p>
          <p className="text-sm sm:text-base text-[#222222] leading-relaxed max-w-5xl mx-auto mb-10 font-normal">
            Mỗi hành trình đều bắt đầu từ khát vọng nâng tầm thương hiệu Việt và từ trái tim tận tâm, chuyên nghiệp mà chúng tôi đặt trọn trong từng chiếc xe, từng trải nghiệm khách hàng.
          </p>

          {/* 5-Column Gallery to rõ nét chuẩn ảnh 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {GREEN_GALLERY.map((item, idx) => (
              <div
                key={`gallery-${idx}`}
                className="relative h-[220px] sm:h-[280px] md:h-[320px] lg:h-[350px] rounded-2xl overflow-hidden border border-gray-200 group shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SECTION: GIỚI THIỆU TẬP ĐOÀN THỊNH CƯỜNG (VIDEO BANNER - BỎ PADDING DƯỚI THEO ẢNH 1) */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[520px] flex items-center justify-center overflow-hidden mt-12 md:mt-16 mb-0 pb-0 select-none">
        {/* Background Image sdssd.jpg with 0.27 overlay */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/about/sdssd.jpg"
            alt="Giới thiệu Tập đoàn Thịnh Cường"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/35"></div>
        </div>

        {/* Content Centered */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-wide leading-tight font-['Mulish',sans-serif] drop-shadow-md">
            GIỚI THIỆU TẬP ĐOÀN THỊNH CƯỜNG
          </h2>

          {/* Large Play Button - VinFast Electric Blue with Glowing Pulse */}
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="mt-6 sm:mt-8 group relative flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#1863dc] hover:bg-[#3AB3FF] text-white shadow-[0_0_35px_rgba(24,99,220,0.7)] transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-white/60"
            aria-label="Xem video Giới thiệu Tập đoàn Thịnh Cường"
          >
            <span className="absolute inset-0 rounded-full bg-[#1863dc]/50 animate-ping duration-1000 pointer-events-none"></span>
            <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white ml-1 relative z-10 text-white transition-transform group-hover:scale-110" />
          </button>
        </div>
      </section>


      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors"
              aria-label="Đóng video"
            >
              <X className="w-6 h-6" />
            </button>

            <iframe
              src="https://www.youtube.com/embed/bCNs58XOsiY?autoplay=1"
              title="Giới thiệu Tập đoàn Thịnh Cường"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
