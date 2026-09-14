"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    image: "/images/banners/lich-lai-thu-vinfast-thinh-cuong-thang-9-2026.jpg",
    alt: "Lịch lái thử VinFast Phương Đông tháng 9/2026",
  },
  {
    id: 2,
    image: "/images/banners/banner-wweb.jpg",
    alt: "VinFast Phương Đông Đại Lý Số 1 Miền Bắc",
  },
  {
    id: 3,
    image: "/images/banners/vinfast-uu-dai-tien-phong-xang.jpg",
    alt: "VinFast Ưu Đãi Tiên Phong Chuyển Đổi Xanh",
  },
  {
    id: 4,
    image: "/images/banners/vinh-danh-vinfast-thinh-cuong.jpg",
    alt: "Vinh danh VinFast Phương Đông Club 1000",
  },
  {
    id: 5,
    image: "/images/banners/vinfast-thinhcuong-3.jpg",
    alt: "Showroom VinFast Phương Đông Chuẩn 3S",
  },
  {
    id: 6,
    image: "/images/banners/vinfast-thinh-cuong-banner-1-scaled.jpg",
    alt: "VinFast Phương Đông Banner",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section
      className="relative w-full aspect-[2560/1200] overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex w-full h-full transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_SLIDES.map((slide, index) => (
          <div key={slide.id} className="relative w-full h-full shrink-0">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover pointer-events-none"
              sizes="100vw"
              quality={index === 0 ? 80 : 70}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-transform hover:scale-105"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/70 hover:bg-white text-gray-800 flex items-center justify-center shadow-md transition-transform hover:scale-105"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
      </button>
    </section>
  );
}
