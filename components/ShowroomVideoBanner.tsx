import React from "react";
import Image from "next/image";

export default function ShowroomVideoBanner() {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[560px] flex items-center justify-center overflow-hidden my-6 md:my-10 select-none">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/home/video-showroom-bg.jpg"
          alt="VinFast Phương Đông Showroom"
          fill
          className="object-cover object-center"
          loading="lazy"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-wide leading-tight drop-shadow-md">
          VINFAST PHƯƠNG ĐÔNG
          <span className="block text-sm sm:text-base md:text-xl font-bold tracking-normal mt-2.5 text-gray-100">
            NHÀ PHÂN PHỐI XE Ô TÔ ĐIỆN VINFAST SỐ 1 VIỆT NAM
          </span>
        </h2>
      </div>
    </section>
  );
}
