"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  Award,
  Sparkles,
  Trophy,
  CheckCircle2,
  Calendar,
  Building2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
} from "lucide-react";
import GsapReveal from "@/components/animation/GsapReveal";
import { AWARDS, AWARD_TABS, AwardItem, AwardTabKey } from "@/data/awards";

export default function AwardsShowcase() {
  const [activeTab, setActiveTab] = useState<AwardTabKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered awards based on selected tab
  const filteredAwards = useMemo(() => {
    if (activeTab === "all") return AWARDS;
    const currentTab = AWARD_TABS.find((t) => t.key === activeTab);
    if (!currentTab || !currentTab.category) return AWARDS;
    return AWARDS.filter((a) => a.category === currentTab.category);
  }, [activeTab]);

  // Tab counts
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: AWARDS.length };
    AWARD_TABS.forEach((tab) => {
      if (tab.category) {
        counts[tab.key] = AWARDS.filter((a) => a.category === tab.category).length;
      }
    });
    return counts;
  }, []);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredAwards.length
    );
  }, [filteredAwards.length]);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + filteredAwards.length) % filteredAwards.length
    );
  }, [filteredAwards.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextLightbox, prevLightbox]);

  const activeAward: AwardItem | null =
    lightboxIndex !== null ? filteredAwards[lightboxIndex] : null;

  return (
    <section id="giai-thuong" className="relative py-20 sm:py-24 bg-gradient-to-b from-[#f8fafd] via-white to-[#f4f7fb] overflow-hidden">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(24,99,220,0.08),transparent_70%)]" />
      <div className="pointer-events-none absolute -left-40 top-40 w-96 h-96 rounded-full bg-[#d4a640]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-40 w-96 h-96 rounded-full bg-[#1863dc]/10 blur-3xl" />

      <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-[780px] mx-auto mb-12 sm:mb-16">
          <GsapReveal animation="fade-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border border-amber-500/30 text-[#b8862b] text-xs font-extrabold uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              Ghi nhận & Vinh danh
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-extrabold uppercase tracking-tight leading-tight text-[#0c0c0c]">
              Khẳng định vị thế & <span className="bg-gradient-to-r from-[#1863dc] to-[#0091ff] bg-clip-text text-transparent">uy tín dịch vụ</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[#555] leading-relaxed">
              Minh chứng cho năng lực phân phối xe điện vượt trội và cam kết phục vụ tận tâm của{" "}
              <strong className="text-[#0c0c0c] font-bold">Công ty TNHH Phương Đông Hà Nội</strong> tại toàn bộ hệ thống 4 showroom 3S.
            </p>
          </GsapReveal>
        </div>

        {/* Highlight Feature Spotlight Banner */}
        <GsapReveal animation="fade-up" duration={0.7} className="mb-12">
          <div className="relative rounded-2xl bg-gradient-to-br from-[#071329] via-[#0b244d] to-[#0e326b] text-white p-6 sm:p-8 md:p-10 shadow-2xl border border-white/10 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,166,64,0.25),transparent_60%)]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#1863dc]/30 blur-2xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Cup & Visual */}
              <div className="lg:col-span-4 flex items-center justify-center">
                <div className="relative w-56 sm:w-64 h-56 sm:h-64 flex items-center justify-center group cursor-pointer" onClick={() => {
                  const idx = filteredAwards.findIndex(a => a.id === "cup-doanh-so-phuong-dong");
                  if (idx !== -1) openLightbox(idx);
                }}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d4a640]/30 to-white/10 blur-xl group-hover:scale-110 transition-transform duration-500" />
                  <div className="relative w-full h-full p-2">
                    <Image
                      src="/images/awards/award-pd-doanhso.png"
                      alt="Cúp vinh danh VinFast Phương Đông"
                      fill
                      className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 240px, 280px"
                      priority
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white/90 font-bold flex items-center gap-1 border border-white/20">
                    <Maximize2 className="w-3 h-3 text-[#d4a640]" /> Phóng to
                  </div>
                </div>
              </div>

              {/* Spotlight Info */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5" /> Thành tích tiêu biểu
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/90 border border-white/15">
                    Năm 2025 – 2026
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1863dc]/40 text-[#3AB3FF] border border-[#3AB3FF]/30">
                    VinFast Việt Nam vinh danh
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-snug">
                  Đại lý xuất sắc toàn quốc & Cúp doanh số dẫn đầu
                </h3>

                <p className="mt-3 text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                  VinFast Phương Đông tự hào nằm trong <strong className="text-white">Top 10 đại lý bán lẻ xuất sắc nhất toàn quốc</strong> và được trao tặng biểu trưng Cúp doanh số bứt phá. Thành tích là minh chứng cho sự tin yêu của quý khách hàng và nỗ lực bền bỉ của hơn 200 cán bộ nhân viên tại 4 showroom Hà Nội.
                </p>

                <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border-l-2 border-[#d4a640] pl-3">
                    <div className="text-xs uppercase text-white/60 font-medium">Bán lẻ toàn quốc</div>
                    <div className="text-base sm:text-lg font-extrabold text-white">Top 10</div>
                  </div>
                  <div className="border-l-2 border-[#1863dc] pl-3">
                    <div className="text-xs uppercase text-white/60 font-medium">Quy chuẩn xưởng</div>
                    <div className="text-base sm:text-lg font-extrabold text-white">3S Chính Hãng</div>
                  </div>
                  <div className="border-l-2 border-[#3AB3FF] pl-3">
                    <div className="text-xs uppercase text-white/60 font-medium">Cơ sở Hà Nội</div>
                    <div className="text-base sm:text-lg font-extrabold text-white">04 Showroom</div>
                  </div>
                  <div className="border-l-2 border-emerald-400 pl-3">
                    <div className="text-xs uppercase text-white/60 font-medium">Chỉ số hài lòng</div>
                    <div className="text-base sm:text-lg font-extrabold text-white">CSI &gt; 98%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GsapReveal>

        {/* Filter Tabs */}
        <GsapReveal animation="fade-up" className="mb-10">
          <div className="flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-[#eef2f8] rounded-2xl border border-[#dde3ee] shadow-inner max-w-full">
              {AWARD_TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                const count = tabCounts[tab.key] ?? 0;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-[13px] font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-[#1863dc] text-white shadow-md shadow-[#1863dc]/25 scale-[1.02]"
                        : "text-[#555] hover:text-[#0c0c0c] hover:bg-white/70"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-white text-[#666] border border-[#d5dbe5]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </GsapReveal>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredAwards.map((award, index) => {
            const isFeatured = award.featured;
            const isTrophy = award.id === "cup-doanh-so-phuong-dong";

            return (
              <GsapReveal key={award.id} animation="fade-up" delay={index * 0.05}>
                <article
                  onClick={() => openLightbox(index)}
                  className={`group relative bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full cursor-pointer overflow-hidden ${
                    isFeatured
                      ? "border-[#d8e3f5] shadow-[0_8px_25px_rgba(24,99,220,0.08)] hover:shadow-[0_16px_35px_rgba(24,99,220,0.18)] hover:border-[#1863dc]/50"
                      : "border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300"
                  }`}
                >
                  {/* Card Visual Container */}
                  <div className={`relative aspect-[16/10] overflow-hidden ${isTrophy ? 'bg-gradient-to-br from-[#0c1a33] to-[#071329]' : 'bg-gray-100'}`}>
                    <Image
                      src={award.image}
                      alt={award.title}
                      fill
                      className={`transition-transform duration-700 group-hover:scale-105 ${
                        isTrophy ? "object-contain p-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" : "object-cover"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    />

                    {/* Overlay hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        <Maximize2 className="w-3.5 h-3.5 text-[#3AB3FF]" /> Nhấp để xem chi tiết
                      </span>
                    </div>

                    {/* Year & Category Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/95 text-[#1863dc] shadow-sm backdrop-blur-md flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#1863dc]" /> {award.year}
                      </span>
                      {isFeatured && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Nổi bật
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Issuer & Recipient Meta */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#888] uppercase tracking-wider mb-2">
                        <Building2 className="w-3.5 h-3.5 text-[#1863dc] shrink-0" />
                        <span className="truncate">{award.issuedBy}</span>
                      </div>

                      {/* Award Title */}
                      <h3 className="text-base sm:text-[17px] font-extrabold text-[#0c0c0c] leading-snug group-hover:text-[#1863dc] transition-colors">
                        {award.title}
                      </h3>

                      {/* Recipient Tag */}
                      <p className="mt-2 text-xs font-bold text-[#1863dc] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1863dc] shrink-0" />
                        <span className="truncate">{award.recipient}</span>
                      </p>

                      {/* Description */}
                      <p className="mt-2.5 text-xs sm:text-[13px] text-[#555] leading-relaxed line-clamp-3">
                        {award.description}
                      </p>
                    </div>

                    {/* Card Footer Bar */}
                    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-[#888] font-medium flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-[#1863dc]" /> {award.category}
                      </span>
                      <span className="font-bold text-[#1863dc] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Xem chi tiết &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              </GsapReveal>
            );
          })}
        </div>
      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && activeAward && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
            aria-label="Đóng xem chi tiết"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
            aria-label="Xem giải thưởng trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all z-20 cursor-pointer shadow-lg"
            aria-label="Xem giải thưởng tiếp theo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1322] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Stage Area */}
            <div className="relative w-full md:w-[60%] min-h-[300px] sm:min-h-[380px] md:min-h-[480px] bg-black/60 flex items-center justify-center p-4">
              <Image
                src={activeAward.image}
                alt={activeAward.title}
                fill
                className={`${
                  activeAward.image.includes('award-pd')
                    ? 'object-contain p-6'
                    : 'object-contain sm:object-cover'
                }`}
                sizes="(max-width: 768px) 100vw, 600px"
                priority
              />
            </div>

            {/* Content Details Area */}
            <div className="w-full md:w-[40%] p-6 sm:p-7 flex flex-col justify-between overflow-y-auto max-h-[480px] bg-[#0c1322] text-white">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1863dc] text-white">
                    {activeAward.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/90 border border-white/15">
                    {activeAward.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-extrabold uppercase leading-snug tracking-tight text-white">
                  {activeAward.title}
                </h3>

                {/* Subtitle */}
                {activeAward.subtitle && (
                  <p className="mt-1.5 text-xs text-[#3AB3FF] font-semibold leading-relaxed">
                    {activeAward.subtitle}
                  </p>
                )}

                {/* Recipient & Issuer Details Box */}
                <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="text-xs">
                    <span className="text-white/50 block text-[10px] uppercase font-bold tracking-wider">Đơn vị vinh danh / Cấp trao:</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      {activeAward.issuedBy}
                    </span>
                  </div>
                  <div className="text-xs pt-2 border-t border-white/10">
                    <span className="text-white/50 block text-[10px] uppercase font-bold tracking-wider">Tập thể / Cá nhân đón nhận:</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3AB3FF]" />
                      {activeAward.recipient}
                    </span>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="mt-4">
                  <span className="text-white/50 block text-[10px] uppercase font-bold tracking-wider mb-1">Ý nghĩa & Nội dung vinh danh:</span>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {activeAward.description}
                  </p>
                </div>
              </div>

              {/* Counter and Footer info */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span>Giải thưởng {lightboxIndex + 1} / {filteredAwards.length}</span>
                <span className="text-white/70 font-semibold">Công ty TNHH Phương Đông Hà Nội</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
