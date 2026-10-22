"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Banner, getDirectusAssetUrl } from "@/lib/directus";

interface PromoBannerCardsProps {
  promoBanner?: Banner;
  serviceBanner?: Banner;
}

export default function PromoBannerCards({ promoBanner, serviceBanner }: PromoBannerCardsProps) {
  const promoImg = "/images/ede0dd93-3065-4c1f-bacd-686030acb6e8.jpg";
  const promoLabel = promoBanner?.title || "KHUYẾN MÃI XE VINFAST";
  const serviceImg = serviceBanner?.image || getDirectusAssetUrl("fceeb4bd-e264-45ea-952a-9e9ccab19798");

  return (
    <section className="bg-white py-6 md:py-10 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {/* Card 1: Khuyến Mãi Xe VinFast */}
          <div className="relative rounded-[12px] overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.06)] aspect-[16/9] select-none">
            <Link
              href={promoBanner?.link || "/tin-tuc"}
              className="block w-full h-full relative"
              aria-label={promoLabel}
            >
              {/* Banner Image */}
              <Image
                src={promoImg}
                alt={promoLabel}
                fill
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-400"></div>

              {/* Centered Pill Button (.btn-banner-detail) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="inline-block bg-[#292929]/40 backdrop-blur-xs border-2 border-white rounded-[50px] px-6 py-2.5 sm:px-8 sm:py-3 text-[13px] sm:text-[14px] font-bold text-white uppercase tracking-normal whitespace-nowrap shadow-md group-hover:bg-[#3AB3FF] group-hover:border-[#3AB3FF] transition-all duration-300">
                  {promoLabel}
                </span>
              </div>
            </Link>
          </div>

          {/* Card 2: Khám Phá Dịch Vụ VinFast */}
          <div className="relative rounded-[12px] overflow-hidden group shadow-[0_4px_20px_rgba(0,0,0,0.06)] aspect-[16/9] select-none">
            <Link
              href={serviceBanner?.link || "/dich-vu"}
              className="block w-full h-full relative"
              aria-label="Khám phá dịch vụ VinFast"
            >
              {/* Banner Image */}
              <Image
                src={serviceImg}
                alt={serviceBanner?.title || "Khám phá dịch vụ VinFast Phương Đông"}
                fill
                className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-400"></div>

              {/* Centered Pill Button (.btn-banner-detail) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <span className="inline-block bg-[#292929]/40 backdrop-blur-xs border-2 border-white rounded-[50px] px-6 py-2.5 sm:px-8 sm:py-3 text-[13px] sm:text-[14px] font-bold text-white uppercase tracking-normal whitespace-nowrap shadow-md group-hover:bg-[#3AB3FF] group-hover:border-[#3AB3FF] transition-all duration-300">
                  KHÁM PHÁ DỊCH VỤ VINFAST
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
