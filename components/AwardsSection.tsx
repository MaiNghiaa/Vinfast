"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface AwardItem {
  id: string;
  name: string;
  subtitle: string;
  image: string;
}

const AWARDS: AwardItem[] = [
  {
    id: "long-bien",
    name: "LONG BIÊN",
    subtitle: "ĐẠI LÝ CÓ DOANH SỐ XUẤT SẮC NHẤT QUÝ II/2025",
    image: "/images/awards/vinh-danh-long-bien.png",
  },
  {
    id: "ha-long",
    name: "HẠ LONG",
    subtitle: "ĐẠI LÝ CÓ DOANH SỐ XUẤT SẮC NHẤT QUÝ II/2025",
    image: "/images/awards/vinh-danh-ha-long.png",
  },
  {
    id: "son-tay-1",
    name: "SƠN TÂY",
    subtitle: "ĐẠI LÝ CÓ DOANH SỐ XUẤT SẮC NHẤT QUÝ II/2025",
    image: "/images/awards/vinh-danh-son-tay.png",
  },
  {
    id: "son-tay-xuong",
    name: "SƠN TÂY",
    subtitle: "XƯỞNG DỊCH VỤ CÓ DOANH SỐ XUẤT SẮC QUÝ I/2025",
    image: "/images/awards/vinh-danh-xuong-son-tay.jpg",
  },
  {
    id: "son-tay-sr",
    name: "SƠN TÂY",
    subtitle: "SHOWROOM CÓ DOANH SỐ XUÂT SẮC QUÝ I/2025",
    image: "/images/awards/vinh-danh-sr-son-tay.jpg",
  },
];

export default function AwardsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = AWARDS.length;

  const nextAward = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevAward = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay matching live site
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextAward();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextAward]);

  // Helper to get item relative position (-1: left, 0: center, 1: right, others hidden)
  const getItemStyle = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;

    if (diff === 0) {
      // Center Active Card
      return "opacity-100 z-20 scale-100 translate-x-0 rotate-y-0 shadow-[0_0_15px_#c3c3c3] bg-white pointer-events-auto";
    } else if (diff === -1) {
      // Left Card (3D perspective angled)
      return "opacity-60 z-10 scale-90 -translate-x-[65%] sm:-translate-x-[75%] -rotate-y-[25deg] bg-white/90 pointer-events-auto cursor-pointer";
    } else if (diff === 1) {
      // Right Card (3D perspective angled)
      return "opacity-60 z-10 scale-90 translate-x-[65%] sm:translate-x-[75%] rotate-y-[25deg] bg-white/90 pointer-events-auto cursor-pointer";
    } else {
      // Hidden behind
      return "opacity-0 z-0 scale-75 pointer-events-none";
    }
  };

  return (
    <section className="bg-white py-8 md:py-12 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* Main Card Wrapper matching .clutch-awards-widget */}
        <div
          className="bg-white rounded-[13px] shadow-[0_0_15px_#dfdfdf] p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Column: Title, Subtitle, Arrows */}
          <div className="w-full md:w-[38%] shrink-0 text-left flex flex-col justify-center">
            <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0c0c0c] uppercase tracking-tight leading-tight font-['Mulish',sans-serif]">
              VINFAST PHƯƠNG ĐÔNG <br />
              AWARDS NĂM 2025
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 mt-3.5 mb-6 max-w-[315px] leading-relaxed">
              Thành công từ Doanh số ấn tượng, ghi dấu bằng Dịch vụ Khách hàng
              xuất sắc.
            </p>

            {/* Custom Interactive Navigation Arrows matching Phương Đông */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={prevAward}
                className="group flex items-center gap-1.5 text-black hover:text-[#3ab3ff] transition-all p-1 cursor-pointer"
                aria-label="Giải thưởng trước"
              >
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </button>
              <button
                type="button"
                onClick={nextAward}
                className="group flex items-center gap-1.5 text-black hover:text-[#3ab3ff] transition-all p-1 cursor-pointer"
                aria-label="Giải thưởng kế tiếp"
              >
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 3D Coverflow Showcase matching Swiper coverflow */}
          <div className="w-full md:w-[62%] relative h-[360px] sm:h-[400px] flex items-center justify-center [perspective:1000px] select-none overflow-hidden sm:overflow-visible">
            {AWARDS.map((award, idx) => {
              const styleClasses = getItemStyle(idx);
              return (
                <div
                  key={award.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute w-[240px] sm:w-[280px] rounded-[10px] p-6 text-center border border-gray-100 transition-all duration-500 ease-out [transform-style:preserve-3d] ${styleClasses}`}
                >
                  <div className="relative w-[130px] sm:w-[150px] h-[130px] sm:h-[150px] mx-auto mb-4">
                    <Image
                      src={award.image}
                      alt={award.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 130px, 150px"
                    />
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0c0c0c] uppercase mb-1.5">
                    {award.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium uppercase leading-snug">
                    {award.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
