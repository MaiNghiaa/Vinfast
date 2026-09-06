"use client";

import React from "react";
import Image from "next/image";
import { useModal } from "@/components/ClientLayout";

export interface UtilityItem {
  id: string;
  title: string;
  image: string;
  modalType: "lai-thu" | "dich-vu" | "bao-gia";
}

const UTILITY_ITEMS: UtilityItem[] = [
  {
    id: "bao-duong",
    title: "SỬA CHỮA BẢO DƯỠNG",
    image: "/images/services/bao-duong.png",
    modalType: "dich-vu",
  },
  {
    id: "lai-thu",
    title: "LÁI THỬ MIỄN PHÍ",
    image: "/images/services/lai-thu.png",
    modalType: "lai-thu",
  },
  {
    id: "khuyen-mai",
    title: "KHUYẾN MẠI",
    image: "/images/services/khuyen-mai.png",
    modalType: "bao-gia",
  },
  {
    id: "tram-sac",
    title: "TRẠM SẠC",
    image: "/images/services/tram-sac.png",
    modalType: "dich-vu",
  },
];

export default function UtilitiesSection() {
  const { openBooking } = useModal();

  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* Title & Blue Divider */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-[28px] md:text-[32px] font-black uppercase text-[#0c0c0c] tracking-tight font-['Mulish',sans-serif] leading-tight">
            <span className="block text-[15px] sm:text-[16px] text-[#3AB3FF] font-extrabold tracking-wider mb-1">
              TIỆN ÍCH
            </span>
            CHỌN DỊCH VỤ VINFAST THỊNH CƯỜNG
          </h2>
          <div className="w-14 h-[3px] bg-[#3AB3FF] mx-auto mt-3"></div>
        </div>

        {/* 4 Glossy Badge Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {UTILITY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center group select-none"
            >
              {/* Circular 3D Metallic Blue Icon */}
              <div
                className="w-28 h-28 sm:w-36 sm:h-36 relative cursor-pointer"
                onClick={() => openBooking("", item.modalType)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-md"
                  sizes="(max-width: 768px) 120px, 150px"
                />
              </div>

              {/* Title */}
              <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-bold text-[#0c0c0c] uppercase tracking-tight mt-4 mb-3 min-h-[40px] flex items-center justify-center group-hover:text-[#3AB3FF] transition-colors">
                {item.title}
              </h3>

              {/* Action Button "Đặt ngay" */}
              <button
                type="button"
                onClick={() => openBooking("", item.modalType)}
                className="border border-black hover:border-[#3AB3FF] bg-white text-black hover:bg-[#3AB3FF] hover:text-white px-6 sm:px-8 py-1.5 rounded-xs text-xs sm:text-[13px] font-bold uppercase tracking-normal transition-all duration-300 shadow-2xs hover:shadow-md cursor-pointer"
              >
                Đặt ngay
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
