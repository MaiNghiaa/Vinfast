"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface VehicleShowcaseItem {
  id: string;
  name: string;
  category: string;
  slug: string;
  image: string;
  imageHover: string;
}

export interface ShowcaseTab {
  id: string;
  title: string;
  categoryLabel: string;
  vehicles: VehicleShowcaseItem[];
}

export const SHOWCASE_TABS: ShowcaseTab[] = [
  {
    id: "electric",
    title: "XE ĐIỆN",
    categoryLabel: "Xe mới",
    vehicles: [
      {
        id: "vf3-plus",
        name: "Vinfast VF3 Plus",
        category: "Xe mới",
        slug: "vinfast-vf-3",
        image: "/images/vehicles/vf3-plus-1.jpg",
        imageHover: "/images/vehicles/vf3-plus-2.png",
      },
      {
        id: "vf3",
        name: "Vinfast VF3",
        category: "Xe mới",
        slug: "vinfast-vf-3",
        image: "/images/vehicles/vf3-plus-1.jpg",
        imageHover: "/images/vehicles/vf3-plus-2.png",
      },
      {
        id: "vf5",
        name: "Vinfast VF5",
        category: "Xe mới",
        slug: "vinfast-vf-5-plus",
        image: "/images/vehicles/vf5-1.jpg",
        imageHover: "/images/vehicles/vf5-2.png",
      },
      {
        id: "vf6",
        name: "Vinfast VF6",
        category: "Xe mới",
        slug: "vinfast-vf-6",
        image: "/images/vehicles/vf6-1.jpg",
        imageHover: "/images/vehicles/vf6-2.png",
      },
      {
        id: "vf7",
        name: "Vinfast VF7",
        category: "Xe mới",
        slug: "vinfast-vf-7",
        image: "/images/vehicles/vf7-1.jpg",
        imageHover: "/images/vehicles/vf7-2.png",
      },
      {
        id: "vf8",
        name: "Vinfast VF8",
        category: "Xe mới",
        slug: "vinfast-vf-8",
        image: "/images/vehicles/vf8-1.jpg",
        imageHover: "/images/vehicles/vf8-2.png",
      },
      {
        id: "vf9",
        name: "Vinfast VF9",
        category: "Xe mới",
        slug: "vinfast-vf-9",
        image: "/images/vehicles/vf9-1.jpg",
        imageHover: "/images/vehicles/vf9-2.png",
      },
    ],
  },
  {
    id: "service",
    title: "XE DỊCH VỤ",
    categoryLabel: "Xe dịch vụ",
    vehicles: [
      {
        id: "herio-green",
        name: "VinFast Herio Green",
        category: "Xe dịch vụ",
        slug: "herio-green",
        image: "/images/vehicles/herio-1.jpg",
        imageHover: "/images/vehicles/herio-2.jpg",
      },
      {
        id: "limo-green",
        name: "VinFast Limo Green",
        category: "Xe dịch vụ",
        slug: "limo-green",
        image: "/images/vehicles/limo-1.jpg",
        imageHover: "/images/vehicles/limo-2.png",
      },
      {
        id: "minio-green",
        name: "VinFast Minio Green",
        category: "Xe dịch vụ",
        slug: "minio-green",
        image: "/images/vehicles/minio-1.jpg",
        imageHover: "/images/vehicles/minio-2.png",
      },
      {
        id: "nerio-green",
        name: "VinFast Nerio Green",
        category: "Xe dịch vụ",
        slug: "nerio-green",
        image: "/images/vehicles/nerio-1.jpg",
        imageHover: "/images/vehicles/nerio-2.png",
      },
    ],
  },
  {
    id: "gf",
    title: "VINFAST GF",
    categoryLabel: "VinFast GF",
    vehicles: [
      {
        id: "gf-vf8-1",
        name: "VINFAST VF8 ECO 2023 – ĐEN – ĐEN",
        category: "VinFast GF",
        slug: "vinfast-vf-8",
        image: "/images/vehicles/gf-vf8-1.jpg",
        imageHover: "/images/vehicles/gf-vf8-2.jpg",
      },
      {
        id: "gf-vf8-2",
        name: "VINFAST VF8 ECO 2023 – XANH DƯƠNG",
        category: "VinFast GF",
        slug: "vinfast-vf-8",
        image: "/images/vehicles/gf-vf8-blue.jpg",
        imageHover: "/images/vehicles/gf-vf8-blue.jpg",
      },
      {
        id: "gf-vf8-3",
        name: "VINFAST VF8 PLUS 2023 – ĐỎ – ĐEN",
        category: "VinFast GF",
        slug: "vinfast-vf-8",
        image: "/images/vehicles/gf-vf8-red-1.jpg",
        imageHover: "/images/vehicles/gf-vf8-red-2.jpg",
      },
      {
        id: "gf-vf8-4",
        name: "VINFAST VF8 PLUS 2023 – ĐỎ – NÂU",
        category: "VinFast GF",
        slug: "vinfast-vf-8",
        image: "/images/vehicles/gf-vf8-red-1.jpg",
        imageHover: "/images/vehicles/gf-vf8-red-2.jpg",
      },
    ],
  },
];

export default function VehicleTabsShowcase() {
  const [activeTabId, setActiveTabId] = useState<string>("electric");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const touchStartX = useRef<number | null>(null);

  // Responsive items per view: desktop 4, tablet 3, mobile-landscape 2, mobile 1
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerView(4);
      } else if (width >= 768) {
        setItemsPerView(3);
      } else if (width >= 520) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeTab = SHOWCASE_TABS.find((t) => t.id === activeTabId) || SHOWCASE_TABS[0];
  const totalVehicles = activeTab.vehicles.length;
  const maxIndex = Math.max(0, totalVehicles - itemsPerView);

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    setCurrentIndex(0);
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

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

  const itemWidthPercent = 100 / itemsPerView;

  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* 1. Header Title & Accent Divider matching Phương Đông */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-black uppercase text-[#0c0c0c] tracking-tight font-['Mulish',sans-serif]">
            KHÁM PHÁ CÁC DÒNG XE
          </h2>
          {/* Blue accent underline */}
          <div className="w-12 h-[3px] bg-[#3AB3FF] mx-auto mt-3 mb-6"></div>
        </div>

        {/* 2. Clean Text Tabs matching Phương Đông */}
        <div className="flex justify-center items-center gap-6 sm:gap-10 mb-8 border-b border-transparent">
          {SHOWCASE_TABS.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`text-[14px] sm:text-[16px] font-extrabold uppercase pb-2.5 transition-all duration-300 relative tracking-normal ${
                  isActive
                    ? "text-[#3AB3FF]"
                    : "text-[#000000] hover:text-[#3AB3FF]"
                }`}
              >
                <span>{tab.title}</span>
                {/* Active Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#3AB3FF] transition-all duration-300"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* 3. Product Carousel Container */}
        <div className="relative group/carousel">
          {/* Navigation Arrows (show when there are more items than itemsPerView) */}
          {totalVehicles > itemsPerView && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute -left-3 sm:-left-5 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-[#3AB3FF] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110"
                aria-label="Xe trước"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute -right-3 sm:-right-5 top-[40%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-gray-700 hover:text-[#3AB3FF] flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-gray-100 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110"
                aria-label="Xe kế tiếp"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </>
          )}

          {/* Viewport */}
          <div
            className="overflow-hidden py-2"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * itemWidthPercent}%)`,
              }}
            >
              {activeTab.vehicles.map((v) => (
                <div
                  key={v.id}
                  className="shrink-0 px-2 sm:px-3"
                  style={{ width: `${itemWidthPercent}%` }}
                >
                  {/* Product Card matching .product-block .grid-v3 */}
                  <div className="group/card bg-white border border-[#ededed] hover:border-gray-300 transition-all duration-400 flex flex-col h-full overflow-hidden">
                    <Link href={`/san-pham/${v.slug}`} className="block">
                      {/* Image Frame with Primary & Hover Swap */}
                      <div className="relative w-full aspect-[1000/625] bg-white flex items-center justify-center p-3 overflow-hidden">
                        {/* 1. Primary Default Image */}
                        <Image
                          src={v.image}
                          alt={v.name}
                          fill
                          className="object-contain p-2 transition-opacity duration-500 ease-out group-hover/card:opacity-0"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        {/* 2. Secondary Hover Image (Swaps on hover!) */}
                        <Image
                          src={v.imageHover}
                          alt={`${v.name} - góc khác`}
                          fill
                          className="object-contain p-2 absolute inset-0 transition-opacity duration-500 ease-out opacity-0 group-hover/card:opacity-100"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        />
                      </div>

                      {/* Content Info */}
                      <div className="p-4 sm:p-5 pt-2 pb-5 text-left border-t border-transparent">
                        <div className="product-cat text-[12px] text-[#777777] font-normal mb-1">
                          {v.category}
                        </div>
                        <h3 className="name text-[14px] sm:text-[15px] font-bold text-[#0c0c0c] group-hover/card:text-[#3AB3FF] transition-colors duration-300 line-clamp-1">
                          {v.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
