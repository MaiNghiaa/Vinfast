"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUp, Calendar, MessageCircle } from "lucide-react";

interface FloatingActionsProps {
  onOpenBookingModal: (defaultType?: string) => void;
}

export default function FloatingActions({ onOpenBookingModal }: FloatingActionsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating CTA Buttons (pointer-events-auto) */}
      <div className="flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Nút Gọi Hotline Đỏ Nhấp Nháy (Pulse Ring) */}
        <a
          href="tel:0902422522"
          className="relative w-12 h-12 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform pulse-call"
          title="Gọi ngay Hotline 090 242 25 22"
        >
          <Phone className="w-5 h-5 fill-current animate-bounce" />
        </a>

        {/* Nút Cuộn Lên Đầu Trang (Sky blue matching live site) */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-[#5bc0de] hover:bg-[#31b0d5] text-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110"
            title="Lên đầu trang"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
