"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ShowroomCategory {
  id: string;
  name: string;
  subName: string;
  image: string;
  link: string;
}

export const SHOWROOM_CATEGORIES: ShowroomCategory[] = [
  {
    id: "hoang-quoc-viet",
    name: "SHOWROOM VINFAST",
    subName: "PHƯƠNG ĐÔNG HOÀNG QUỐC VIỆT",
    image: "/images/showrooms/ocean-park.png",
    link: "/contact",
  },
  {
    id: "bat-trang",
    name: "SHOWROOM VINFAST",
    subName: "PHƯƠNG ĐÔNG BÁT TRÀNG",
    image: "/images/showrooms/long-bien.png",
    link: "/contact",
  },
  {
    id: "thuong-tin",
    name: "SHOWROOM VINFAST",
    subName: "PHƯƠNG ĐÔNG THƯỜNG TÍN",
    image: "/images/showrooms/son-tay.png",
    link: "/contact",
  },
  {
    id: "hoa-lac",
    name: "SHOWROOM VINFAST",
    subName: "PHƯƠNG ĐÔNG HÒA LẠC",
    image: "/images/showrooms/vinh-phuc.png",
    link: "/contact",
  },
];

export default function ShowroomCategorySlider() {
  const totalItems = SHOWROOM_CATEGORIES.length;
  const [currentIndex, setCurrentIndex] = useState(totalItems);
  const [withTransition, setWithTransition] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Responsive items per view: desktop 5, tablet 4, mobile-landscape 3, mobile 2
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1100) {
        setItemsPerView(5);
      } else if (width >= 768) {
        setItemsPerView(4);
      } else if (width >= 540) {
        setItemsPerView(3);
      } else {
        setItemsPerView(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setWithTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Seamless infinite wrap-around on transition end
  const handleTransitionEnd = () => {
    if (currentIndex >= totalItems * 2) {
      setWithTransition(false);
      setCurrentIndex((prev) => prev - totalItems);
    } else if (currentIndex < totalItems) {
      setWithTransition(false);
      setCurrentIndex((prev) => prev + totalItems);
    }
  };

  // Autoplay matching slick-carousel data-autoplay="true"
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Extended 3x array for seamless infinite looping
  const extendedItems = [
    ...SHOWROOM_CATEGORIES,
    ...SHOWROOM_CATEGORIES,
    ...SHOWROOM_CATEGORIES,
  ];

  const itemWidthPercent = 100 / itemsPerView;

  return (
    <section className="bg-white py-8 md:py-14 border-b border-gray-100 overflow-hidden relative group/section">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative">
        {/* Navigation Arrow - Left */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute -left-2 sm:left-1 top-[35%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-[#3ab3ff] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-gray-100 opacity-0 group-hover/section:opacity-100 transition-all duration-500 ease-out hover:scale-110"
          aria-label="Showroom trước"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Navigation Arrow - Right */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute -right-2 sm:right-1 top-[35%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-[#3ab3ff] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-gray-100 opacity-0 group-hover/section:opacity-100 transition-all duration-500 ease-out hover:scale-110"
          aria-label="Showroom kế tiếp"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Carousel Viewport */}
        <div
          className="overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${
              withTransition ? "transition-transform duration-500 ease-in-out" : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * itemWidthPercent}%)`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="shrink-0 px-2 sm:px-3 text-center group"
                style={{ width: `${itemWidthPercent}%` }}
              >
                <Link href={item.link} className="block select-none">
                  {/* Circular Image Container (.chang1 .cate-image.img & .categories-item .cate-image) */}
                  <div className="w-[135px] h-[135px] sm:w-[150px] sm:h-[150px] md:w-[160px] md:h-[160px] mx-auto rounded-full p-2.5 sm:p-3 bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] border-[4px] sm:border-[5px] border-transparent group-hover:border-[#3ab3ff] transition-all duration-500 ease-out flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain rounded-full transition-transform duration-500 ease-out group-hover:scale-95"
                        sizes="(max-width: 768px) 135px, 160px"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Title (.list-showroom .categories-item .cat-title) */}
                  <h3 className="cat-title mt-4 text-[12px] sm:text-[13px] font-bold text-[#0c0c0c] uppercase tracking-normal leading-[1.3] max-w-[170px] mx-auto group-hover:text-[#3ab3ff] transition-colors duration-400 ease-out">
                    <span className="block">{item.name}</span>
                    <span className="block">{item.subName}</span>
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
