"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  ShoppingCart,
  Timer,
  Headphones,
  Play,
} from "lucide-react";
import { useModal } from "@/components/ClientLayout";

export default function PhuKienChinhHangPage() {
  const { openBooking } = useModal();

  // Slideshow for Hero matching live site elementor slideshow
  const heroSlides = [
    "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/3-5.jpg",
    "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/Sua-2.1.jpg",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // 4 Giá trị cốt lõi / Trụ cột
  const valueProps = [
    {
      title: "Chất lượng",
      desc: "Sản phẩm có bảo hành",
      icon: ShieldCheck,
    },
    {
      title: "Đa dạng lựa chọn",
      desc: "Đầy đủ phụ kiện các dòng xe",
      icon: ShoppingCart,
    },
    {
      title: "An toàn",
      desc: "Vật liệu có độ bền cao",
      icon: Timer,
    },
    {
      title: "Tư vấn chuyên sâu",
      desc: "Đáp ứng nhu cầu Khách hàng",
      icon: Headphones,
    },
  ];

  // 4 Tiêu chuẩn SQDR
  const sqdrList = [
    {
      title: "Safety - An toàn",
      desc: "Mỗi Phụ kiện Chính hãng Vinfast đều được thiết kế và thử nghiệm để tương thích 100% với từng mẫu xe. Điều này đảm bảo các hệ thống an toàn quan trọng như túi khí, TSS, v.v. sẽ tiếp tục hoạt động hoàn hảo.",
    },
    {
      title: "Quality - Chất lượng",
      desc: "Phụ kiện Chính hãng Vinfast được sản xuất theo quy trình nghiêm ngặt đáp ứng các tiêu chuẩn chất lượng của Vinfast.",
    },
    {
      title: "Durability - Sự bền bỉ",
      desc: "Tất cả các Phụ kiện Chính hãng đều trải qua các bài Kiểm tra cường độ cao và được bảo hành lên tới 3 năm/100.000 km cho các sản phẩm mua mới cùng với xe.",
    },
    {
      title: "Reliable - Tin cậy",
      desc: "Phụ kiện Chính hãng Vinfast luôn được thiết kế hướng tới nhu cầu khách hàng, đồng thời hài hòa với thiết kế của xe, đảm bảo không có bất kỳ lỗi nào dù là nhỏ nhất trước khi đưa vào sản xuất hàng loạt.",
    },
  ];

  return (
    <div className="w-full bg-white font-sans">
      {/* 1. HERO BANNER - SLIDESHOW RED VF 8 */}
      <section className="relative w-full min-h-[380px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-1" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide}
              alt="Phụ kiện cho xế yêu VinFast Thịnh Cường"
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center transform scale-105 transition-transform duration-7000 ease-out"
            />
          </div>
        ))}
        {/* Subtle dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-2" />

        {/* Hero Content - Left aligned as on live site */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <div className="max-w-3xl text-left">
            <h3 className="text-[#f80000] text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide mb-1 md:mb-2 drop-shadow-sm">
              Vinfast Accessories
            </h3>
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black uppercase tracking-tight leading-tight drop-shadow-md">
              PHỤ KIỆN CHO XẾ YÊU
            </h1>
          </div>
        </div>
      </section>

      {/* 2. 4 TRỤ CỘT GIÁ TRỊ (OUTLINE ICONS, TEXT RED, PURE WHITE BG) */}
      <section className="py-10 md:py-14 bg-white border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">
            {valueProps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center group transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center text-[#2b2b2b] mb-3 group-hover:text-[#E90000] transition-colors">
                    <IconComponent className="w-9 h-9 stroke-[1.4]" />
                  </div>
                  <h4 className="text-[#E90000] font-bold text-base md:text-[17px] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-[13px] text-[#666666]">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TIÊU ĐỀ & TAB SẢN PHẨM */}
      <section className="pt-12 md:pt-16 pb-6 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-[720px] mx-auto">
            <h2 className="text-[#E60000] text-xl sm:text-2xl md:text-[28px] font-extrabold uppercase leading-snug">
              Lựa chọn phụ kiện yêu thích
            </h2>
            <h3 className="text-[#111111] text-2xl sm:text-3xl md:text-[32px] font-bold uppercase mt-1">
              CHO CHIẾC XE CỦA BẠN
            </h3>
          </div>

          {/* Single "Tất cả" Tab matching live site */}
          <div className="mt-8 text-center">
            <div className="inline-block relative">
              <span className="text-black font-extrabold text-sm md:text-base tracking-wide cursor-pointer">
                Tất cả
              </span>
              <div className="w-12 h-[2px] bg-[#FF0000] mx-auto mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. SHOWCASE BANNER PHỤ KIỆN ĐẲNG CẤP - CHÍNH HÃNG */}
      <section className="pb-10 md:pb-14 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[1624/624] overflow-hidden rounded-sm shadow-xs">
            <Image
              src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/Sua-3.3.jpg"
              alt="Phụ kiện VinFast đẳng cấp - chính hãng"
              fill
              priority
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="object-contain object-center"
            />
          </div>
        </div>
      </section>

      {/* 5. TẠI SAO NÊN LỰA CHỌN MUA PHỤ KIỆN VINFAST CHÍNH HÃNG (SQDR) */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Nhân viên áo xanh cầm phụ kiện (40% width on live) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] h-[480px] sm:h-[560px] md:h-[600px] overflow-hidden rounded-sm shadow-sm">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/Sua-4.3.jpg"
                  alt="Tại sao nên chọn phụ kiện VinFast Thịnh Cường"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right: Nội dung SQDR (60% width on live) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div>
                <h3 className="text-[#E90000] text-lg sm:text-xl md:text-[22px] font-extrabold uppercase mb-1">
                  Tại sao nên lựa chọn mua
                </h3>
                <h2 className="text-[#111111] text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight mb-5">
                  PHỤ KIỆN VINFAST CHÍNH HÃNG
                </h2>
              </div>

              {/* Đoạn giới thiệu nền tảng SQDR */}
              <div className="text-[#222222] text-sm md:text-[14.5px] leading-relaxed text-justify mb-6">
                <p>
                  <strong className="text-black">Phụ kiện Chính hãng Vinfast</strong>{" "}
                  được thiết kế chuyên biệt để sử dụng trên từng mẫu xe Vinfast.
                  Mỗi Phụ kiện Chính hãng đều được sản xuất tuân theo các tiêu
                  chuẩn kỹ thuật và thử nghiệm nghiêm ngặt của Vinfast để đảm
                  bảo chất lượng tối đa. Cam kết về sự an toàn là điều làm nên
                  sự khác biệt của Phụ kiện Chính hãng so với các phụ kiện khác
                  ngoài thị trường. Phụ kiện Chính hãng Vinfast được thiết kế dựa
                  trên nền tảng{" "}
                  <strong className="text-[#E90000]">
                    SQDR – Safety, Quality, Durability, Reliability
                  </strong>
                  , đặt chất lượng và an toàn lên hàng đầu.
                </p>
              </div>

              {/* 4 Mục SQDR xếp dọc dạng icon-box thuần văn bản */}
              <div className="space-y-4">
                {sqdrList.map((item, idx) => (
                  <div key={idx} className="text-left">
                    <h4 className="text-black font-bold text-base md:text-[17px] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[#666666] text-xs md:text-sm leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (MÁY MÓC CƠ KHÍ & NÚT KHÁM PHÁ) */}
      <section className="relative w-full py-20 md:py-28 lg:py-32 flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/2-5.jpg"
          alt="Phụ kiện Vinfast Chính hãng Thịnh Cường"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay 71% */}
        <div className="absolute inset-0 bg-black/70 z-1" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-[800px] mx-auto text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Phụ kiện Vinfast Chính hãng
          </h2>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Vinfast Thịnh Cường cung cấp đầy đủ các loại phụ kiện{" "}
            <br className="hidden sm:inline" />
            nội ngoại thất, hệ thống an toàn, và chăm sóc xe, đáp ứng mọi nhu cầu
            của khách hàng.
          </p>
          <button
            onClick={() => openBooking(undefined, "dich-vu")}
            className="inline-flex items-center gap-2 bg-[#d9363e] hover:bg-[#c22830] text-white px-8 py-3.5 rounded-md font-bold text-sm tracking-wider transition-transform hover:scale-105 shadow-lg active:scale-95 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Khám phá
          </button>
        </div>
      </section>
    </div>
  );
}
