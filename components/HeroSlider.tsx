"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner, getDirectusAssetUrl } from "@/lib/directus";

const DEFAULT_HERO_SLIDES = [
  {
    id: 1,
    image: getDirectusAssetUrl("a98e3eba-2bd8-46a5-a84d-106016894ea1"),
    alt: "Lịch lái thử VinFast Phương Đông tháng 9/2026",
  },
  {
    id: 2,
    image: getDirectusAssetUrl("4bca56e3-14dc-4fb4-8715-4f42e3dd2ab0"),
    alt: "VinFast Phương Đông Đại Lý Số 1 Miền Bắc",
  },
  {
    id: 3,
    image: getDirectusAssetUrl("6a6510a8-00b2-4ce4-8316-866132332324"),
    alt: "VinFast Ưu Đãi Tiên Phong Chuyển Đổi Xanh",
  },
  {
    id: 4,
    image: getDirectusAssetUrl("56752840-bc26-4848-97b2-71cac5bad22d"),
    alt: "Vinh danh VinFast Phương Đông Club 1000",
  },
  {
    id: 5,
    image: getDirectusAssetUrl("a94f1dfd-7bf8-43c2-9e7f-3ba95214f233"),
    alt: "Showroom VinFast Phương Đông Chuẩn 3S",
  },
  {
    id: 6,
    image: getDirectusAssetUrl("4f59fbe3-b8e5-4d62-aaea-3b5cd65ee9be"),
    alt: "VinFast Phương Đông Banner",
  },
];

interface HeroSliderProps {
  banners?: Banner[];
}

export default function HeroSlider({ banners }: HeroSliderProps) {
  const slides = (banners && banners.length > 0)
    ? banners.map((b) => ({ id: b.id, image: b.image, alt: b.title }))
    : DEFAULT_HERO_SLIDES;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

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
        {slides.map((slide, index) => (
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
