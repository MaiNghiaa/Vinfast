"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BatteryCharging, Gauge, Compass, Calendar, ArrowRight } from "lucide-react";
import { Vehicle } from "@/data/types";

interface CarCardProps {
  vehicle: Vehicle;
  onBookTestDrive?: (vehicleSlug: string) => void;
}

export default function CarCard({ vehicle, onBookTestDrive }: CarCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 ease-out flex flex-col overflow-hidden relative">
      {/* Top Floating Badge */}
      {vehicle.badge && (
        <span className="absolute top-3 left-3 z-10 bg-[#dc2626] text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-xs">
          {vehicle.badge}
        </span>
      )}

      {/* Segment Tag */}
      <span className="absolute top-3 right-3 z-10 bg-gray-100/90 backdrop-blur-xs text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
        {vehicle.segment}
      </span>

      {/* Vehicle Image Container */}
      <Link href={`/san-pham/${vehicle.slug}`} className="relative w-full h-48 sm:h-52 bg-[#f8f9fa] flex items-center justify-center p-4 overflow-hidden">
        <Image
          src={vehicle.thumbnail}
          alt={vehicle.name}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/san-pham/${vehicle.slug}`}>
            <h3 className="text-base font-black text-gray-900 group-hover:text-[#1863dc] transition-colors line-clamp-1">
              {vehicle.name}
            </h3>
          </Link>
          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
            {vehicle.tagline}
          </p>

          {/* Specs Micro-Grid */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-gray-100 bg-gray-50/70 rounded-lg px-2 text-center">
            <div className="flex flex-col items-center">
              <Compass className="w-3.5 h-3.5 text-[#1863dc] mb-1" />
              <span className="text-[9px] text-gray-500 uppercase font-semibold">Quãng đường</span>
              <strong className="text-[11px] text-gray-900 font-bold">{vehicle.specs.range.split(" ")[0]} km</strong>
            </div>

            <div className="flex flex-col items-center border-x border-gray-200">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600 mb-1" />
              <span className="text-[9px] text-gray-500 uppercase font-semibold">Sạc nhanh</span>
              <strong className="text-[11px] text-gray-900 font-bold">{vehicle.specs.fastCharge.split(" ")[0]} p</strong>
            </div>

            <div className="flex flex-col items-center">
              <Gauge className="w-3.5 h-3.5 text-amber-600 mb-1" />
              <span className="text-[9px] text-gray-500 uppercase font-semibold">Công suất</span>
              <strong className="text-[11px] text-gray-900 font-bold">{vehicle.specs.power.split(" ")[0]} HP</strong>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div className="mb-3">
            <span className="text-[10px] text-gray-500 uppercase block font-semibold">Giá niêm yết từ</span>
            <span className="text-base font-black text-[#dc2626]">
              {vehicle.priceText}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/san-pham/${vehicle.slug}`}
              className="w-full text-center border border-gray-300 hover:border-[#1863dc] hover:text-[#1863dc] text-gray-700 py-2 rounded text-xs font-bold transition-all flex items-center justify-center gap-1"
            >
              <span>Chi tiết</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={() => onBookTestDrive?.(vehicle.slug)}
              className="w-full bg-[#1863dc] hover:bg-[#004dd6] text-white py-2 rounded text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs"
            >
              <Calendar className="w-3 h-3" />
              <span>Lái thử</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
