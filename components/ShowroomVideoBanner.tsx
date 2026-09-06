"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export default function ShowroomVideoBanner() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="relative w-full min-h-[500px] md:min-h-[560px] flex items-center justify-center overflow-hidden my-6 md:my-10 select-none">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/home/video-showroom-bg.jpg"
            alt="VinFast Thịnh Cường Showroom"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Overlay matching elementor-background-overlay (opacity 0.65) */}
          <div className="absolute inset-0 bg-black/65"></div>
        </div>

        {/* Content Centered */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide leading-tight drop-shadow-md">
            VINFAST THỊNH CƯỜNG
            <span className="block text-sm sm:text-base md:text-xl font-bold tracking-normal mt-2.5 text-gray-100">
              NHÀ PHÂN PHỐI XE Ô TÔ ĐIỆN VINFAST SỐ 1 VIỆT NAM
            </span>
          </h2>

          {/* Play Button */}
          <button
            type="button"
            onClick={() => setIsVideoOpen(true)}
            className="mt-8 sm:mt-10 group relative flex items-center justify-center w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-110 cursor-pointer"
            aria-label="Xem video VinFast Thịnh Cường"
          >
            {/* Ripple pulse ring */}
            <span className="absolute inset-0 rounded-full bg-white/40 animate-ping duration-1000"></span>
            <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 relative z-10 text-gray-900" />
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
              title="VinFast Thịnh Cường - Nhà phân phối xe ô tô điện số 1 Việt Nam"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
