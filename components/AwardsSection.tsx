"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, ExternalLink, Sparkles } from "lucide-react";
import { AWARDS } from "@/data/awards";

export default function AwardsSection() {
  // Use featured awards representing VinFast Phuong Dong Hanoi
  const awardsList = AWARDS.filter((a) => a.featured);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = awardsList.length;

  const nextAward = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevAward = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextAward();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextAward, total]);

  // Helper to get item relative position
  const getItemStyle = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;

    if (diff === 0) {
      return "opacity-100 z-20 scale-100 translate-x-0 rotate-y-0 shadow-[0_12px_35px_-8px_rgba(24,99,220,0.22)] border-[#1863dc]/40 bg-white pointer-events-auto ring-2 ring-[#1863dc]/20";
    } else if (diff === -1) {
      return "opacity-60 z-10 scale-90 -translate-x-[65%] sm:-translate-x-[75%] -rotate-y-[25deg] bg-white/95 pointer-events-auto cursor-pointer";
    } else if (diff === 1) {
      return "opacity-60 z-10 scale-90 translate-x-[65%] sm:translate-x-[75%] rotate-y-[25deg] bg-white/95 pointer-events-auto cursor-pointer";
    } else {
      return "opacity-0 z-0 scale-75 pointer-events-none";
    }
  };

  const activeAward = awardsList[activeIndex];

  return (
    <section className="bg-gradient-to-b from-white via-[#f7f9fd] to-white py-12 md:py-16 overflow-hidden border-y border-[#e5eaf2]">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* Main Card Wrapper */}
        <div
          className="relative bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#e8ecf4] p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle decorative glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#1863dc]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#d4a640]/10 blur-3xl" />

          {/* Left Column: Title, Subtitle, Arrows */}
          <div className="w-full md:w-[42%] shrink-0 text-left flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#b8862b] text-[11px] font-bold uppercase tracking-wider w-fit mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Vinh danh & Thành tích
            </div>

            <h2 className="text-2xl sm:text-[30px] font-extrabold text-[#0c0c0c] uppercase tracking-tight leading-tight">
              VINFAST PHƯƠNG ĐÔNG <br />
              <span className="text-[#1863dc]">AWARDS 2025 – 2026</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 mt-3.5 mb-6 max-w-[360px] leading-relaxed">
              Thành tích dẫn đầu doanh số bán lẻ toàn quốc và chuẩn mực dịch vụ 3S xuất sắc tại 4 showroom Hà Nội.
            </p>

            {/* Active Award Quick Badge */}
            {activeAward && (
              <div className="mb-6 p-3.5 rounded-xl bg-[#f5f8ff] border border-[#dce6fb] max-w-[380px]">
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#1863dc] uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#1863dc]" />
                  <span>{activeAward.year} · {activeAward.issuedBy}</span>
                </div>
                <div className="text-sm font-extrabold text-[#0c0c0c] mt-1 line-clamp-1">
                  {activeAward.title}
                </div>
                <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                  {activeAward.recipient}
                </div>
              </div>
            )}

            {/* Custom Interactive Navigation Arrows + View All Link */}
            <div className="flex items-center justify-between gap-4 pt-1 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevAward}
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#1863dc] bg-white hover:bg-[#1863dc] hover:text-white text-gray-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  aria-label="Giải thưởng trước"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextAward}
                  className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#1863dc] bg-white hover:bg-[#1863dc] hover:text-white text-gray-700 flex items-center justify-center transition-all cursor-pointer shadow-sm"
                  aria-label="Giải thưởng kế tiếp"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-400 font-semibold ml-2">
                  {activeIndex + 1} / {total}
                </span>
              </div>

              <Link
                href="/gioi-thieu#giai-thuong"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1863dc] hover:text-[#0b3a8c] transition-colors"
              >
                Chi tiết tất cả <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Coverflow Showcase */}
          <div className="w-full md:w-[58%] relative h-[380px] sm:h-[420px] flex items-center justify-center [perspective:1000px] select-none overflow-hidden sm:overflow-visible">
            {awardsList.map((award, idx) => {
              const styleClasses = getItemStyle(idx);
              const isActive = idx === activeIndex;
              return (
                <div
                  key={award.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`absolute w-[240px] sm:w-[280px] rounded-xl p-5 sm:p-6 text-center border transition-all duration-500 ease-out [transform-style:preserve-3d] ${styleClasses}`}
                >
                  <div className="relative w-[130px] sm:w-[150px] h-[130px] sm:h-[150px] mx-auto mb-3.5 overflow-hidden rounded-lg">
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className={`${award.image.includes('award-pd') ? 'object-contain' : 'object-cover'} transition-transform duration-500 ${isActive ? 'scale-105' : ''}`}
                      sizes="(max-width: 768px) 130px, 150px"
                    />
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#1863dc]/10 text-[#1863dc] uppercase tracking-wider mb-2">
                    {award.year} · {award.issuedBy}
                  </span>

                  <h3 className="font-extrabold text-[13px] sm:text-[14px] text-[#0c0c0c] uppercase mb-1 line-clamp-2 leading-snug">
                    {award.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-medium line-clamp-1">
                    {award.recipient}
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
