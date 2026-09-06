"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Car, Zap } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";

interface HeaderProps {
  onOpenBookingModal?: (defaultVehicle?: string) => void;
}

export default function Header({ onOpenBookingModal }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  const electricCars = VEHICLES.filter((v) => v.category === "electric-car");
  const greenCars = VEHICLES.filter((v) => v.category === "green-mobility" || v.category === "commercial");

  const toggleSubmenu = (menu: string) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100/80 sticky top-0 z-50 shadow-[0_2px_15px_rgba(0,0,0,0.06)]">
      {/* Main Navigation Bar - Exactly 90px line-height & 1300px container matching live Elementor layout */}
      <div className="max-w-[1300px] mx-auto px-4 h-[90px] flex items-stretch">
        {/* Column 1: Logo VinFast Thịnh Cường (15% - 170px width on desktop) */}
        <div className="w-[15%] min-w-[170px] flex items-center">
          <Link href="/" className="inline-block">
            <div className="relative w-[170px] h-[52px]">
              <Image
                src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2021/02/logo1-2048x626-1.png"
                alt="Vinfast Thịnh Cường"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Column 2: Centered Desktop Primary Navigation (80% column with justify-center) */}
        <div className="hidden lg:flex w-[80%] justify-center items-stretch h-full">
          <nav className="flex items-stretch h-full text-[14px] font-bold uppercase tracking-normal">
            {/* 1. TRANG CHỦ */}
            <Link
              href="/"
              className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                isActive("/") ? "text-[#3AB3FF]" : "text-black hover:text-[#3AB3FF]"
              }`}
            >
              TRANG CHỦ
            </Link>

            {/* 2. GIỚI THIỆU */}
            <div className="group relative h-full flex items-center cursor-pointer">
              <Link
                href="/gioi-thieu"
                className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                  isActive("/gioi-thieu") || isActive("/van-hoa-phuc-vu")
                    ? "text-[#3AB3FF]"
                    : "text-black hover:text-[#3AB3FF]"
                }`}
              >
                <span>GIỚI THIỆU</span>
                <i className="down ti-angle-down text-[10px] ml-1.5 align-middle"></i>
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white shadow-xl rounded-b-md py-2 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-150 z-50 normal-case font-medium before:content-[''] before:absolute before:-top-5 before:left-0 before:w-full before:h-5">
                <Link
                  href="/gioi-thieu"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Giới thiệu về chúng tôi
                </Link>
                <Link
                  href="/van-hoa-phuc-vu-khach-hang-vinfast-thinh-cuong"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Triết lý phục vụ Khách hàng
                </Link>
              </div>
            </div>

            {/* 3. MEGAMENU: XE MỚI */}
            <div className="group h-full flex items-center cursor-pointer">
              <Link
                href="/xe-moi"
                className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                  isActive("/xe-moi") || isActive("/san-pham")
                    ? "text-[#3AB3FF]"
                    : "text-black hover:text-[#3AB3FF]"
                }`}
              >
                <span>XE MỚI</span>
                <i className="down ti-angle-down text-[10px] ml-1.5 align-middle"></i>
              </Link>

              {/* Megamenu dropdown box with top hover buffer */}
              <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 hidden group-hover:block transition-all z-50 normal-case before:content-[''] before:absolute before:-top-6 before:left-0 before:w-full before:h-6">
                <div className="max-w-[1300px] mx-auto p-8">
                  {/* Tab Xe Du Lịch Điện */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between border-b pb-2 mb-4">
                      <h3 className="text-sm font-extrabold text-[#1863dc] flex items-center gap-2">
                        <Car className="w-4 h-4" /> DÒNG XE ĐIỆN DU LỊCH VINFAST
                      </h3>
                      <Link href="/xe-moi" className="text-xs text-gray-500 hover:text-[#3AB3FF] font-semibold">
                        Xem tất cả ({VEHICLES.length} mẫu xe) &rarr;
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {electricCars.map((car) => (
                        <Link
                          key={car.id}
                          href={`/san-pham/${car.slug}`}
                          className="group/car bg-gray-50 hover:bg-blue-50/60 p-3 rounded-lg border border-transparent hover:border-blue-200 transition-all text-center flex flex-col items-center"
                        >
                          <div className="relative w-full h-20 mb-2">
                            <Image
                              src={car.thumbnail}
                              alt={car.name}
                              fill
                              className="object-contain group-hover/car:scale-105 transition-transform"
                            />
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 group-hover/car:text-[#3AB3FF]">
                            {car.name}
                          </h4>
                          <span className="text-[11px] font-extrabold text-[#f2295b] mt-1">
                            {car.priceText}
                          </span>
                          <span className="text-[10px] text-gray-500 mt-0.5">
                            {car.specs.range}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Tab Xe Dịch Vụ & Xanh */}
                  <div>
                    <div className="border-b pb-2 mb-4">
                      <h3 className="text-sm font-extrabold text-[#111827] flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#00d2ff]" /> DÒNG XE XANH & XE THƯƠNG MẠI (GREEN SERIES)
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {greenCars.map((car) => (
                        <Link
                          key={car.id}
                          href={`/san-pham/${car.slug}`}
                          className="group/car bg-gray-50 hover:bg-blue-50/60 p-3 rounded-lg border border-transparent hover:border-blue-200 transition-all text-center flex flex-col items-center"
                        >
                          <div className="relative w-full h-20 mb-2">
                            <Image
                              src={car.thumbnail}
                              alt={car.name}
                              fill
                              className="object-contain group-hover/car:scale-105 transition-transform"
                            />
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 group-hover/car:text-[#3AB3FF]">
                            {car.name}
                          </h4>
                          <span className="text-[11px] font-extrabold text-[#f2295b] mt-1">
                            {car.priceText}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. XE GF CŨ */}
            <Link
              href="/xe-cu"
              className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                isActive("/xe-cu") ? "text-[#3AB3FF]" : "text-black hover:text-[#3AB3FF]"
              }`}
            >
              XE GF CŨ
            </Link>

            {/* 5. DỊCH VỤ */}
            <div className="group relative h-full flex items-center cursor-pointer">
              <Link
                href="/dich-vu"
                className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                  isActive("/dich-vu") || isActive("/lam-dep-xe") || isActive("/phu-kien-chinh-hang")
                    ? "text-[#3AB3FF]"
                    : "text-black hover:text-[#3AB3FF]"
                }`}
              >
                <span>DỊCH VỤ</span>
                <i className="down ti-angle-down text-[10px] ml-1.5 align-middle"></i>
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white shadow-xl rounded-b-md py-2 border border-gray-100 z-50 normal-case font-medium before:content-[''] before:absolute before:-top-5 before:left-0 before:w-full before:h-5">
                <Link
                  href="/dich-vu/bao-duong"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Sửa chữa bảo dưỡng
                </Link>
                <Link
                  href="/dich-vu/dong-son"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Đồng sơn – Bảo hiểm
                </Link>
                <Link
                  href="/dich-vu"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Đặt hẹn dịch vụ
                </Link>
                <Link
                  href="/lam-dep-xe"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Làm đẹp xe
                </Link>
                <Link
                  href="/phu-kien-chinh-hang"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Phụ kiện Chính hãng
                </Link>
              </div>
            </div>

            {/* 6. TRẠM SẠC */}
            <Link
              href="/tram-sac"
              className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                isActive("/tram-sac") ? "text-[#3AB3FF]" : "text-black hover:text-[#3AB3FF]"
              }`}
            >
              TRẠM SẠC
            </Link>

            {/* 7. TIN TỨC */}
            <div className="group relative h-full flex items-center cursor-pointer">
              <Link
                href="/tin-tuc"
                className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                  isActive("/tin-tuc") ? "text-[#3AB3FF]" : "text-black hover:text-[#3AB3FF]"
                }`}
              >
                <span>TIN TỨC</span>
                <i className="down ti-angle-down text-[10px] ml-1.5 align-middle"></i>
              </Link>
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white shadow-xl rounded-b-md py-2 border border-gray-100 z-50 normal-case font-medium before:content-[''] before:absolute before:-top-5 before:left-0 before:w-full before:h-5">
                <Link
                  href="/tin-tuc/chuyen-muc/uu-dai"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Tin khuyến mại
                </Link>
                <Link
                  href="/tin-tuc/chuyen-muc/tin-noi-bo"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Tin nội bộ
                </Link>
                <Link
                  href="/tin-tuc/chuyen-muc/su-kien"
                  className="block px-4 py-2.5 text-xs text-gray-800 hover:bg-blue-50 hover:text-[#3AB3FF]"
                >
                  Tin sự kiện
                </Link>
              </div>
            </div>

            {/* 8. TUYỂN DỤNG */}
            <Link
              href="/tuyen-dung"
              className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                isActive("/tuyen-dung") ? "text-[#3AB3FF]" : "text-black hover:text-[#3AB3FF]"
              }`}
            >
              TUYỂN DỤNG
            </Link>

            {/* 9. LIÊN HỆ */}
            <Link
              href="/contact"
              className={`h-full px-3 xl:px-4 flex items-center whitespace-nowrap transition-colors ${
                isActive("/contact") ? "text-[#3AB3FF]" : "text-black hover:text-[#3AB3FF]"
              }`}
            >
              LIÊN HỆ
            </Link>
          </nav>
        </div>

        {/* Column 3: Spacer to match Elementor's 5% hidden search column */}
        <div className="hidden lg:block w-[5%] flex-shrink-0"></div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-800 hover:text-[#3AB3FF] ml-auto"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[85vh] overflow-y-auto px-4 py-4 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-100"
          >
            TRANG CHỦ
          </Link>

          {/* Mobile Giới Thiệu */}
          <div className="border-b border-gray-100 pb-2">
            <button
              onClick={() => toggleSubmenu("gioi-thieu")}
              className="w-full flex items-center justify-between text-sm font-bold text-gray-800 py-2"
            >
              <span>GIỚI THIỆU</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === "gioi-thieu" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "gioi-thieu" && (
              <div className="pl-4 space-y-2 pt-1 pb-2 text-xs font-semibold text-gray-600">
                <Link
                  href="/gioi-thieu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#1863dc]"
                >
                  Giới thiệu về chúng tôi
                </Link>
                <Link
                  href="/van-hoa-phuc-vu-khach-hang-vinfast-thinh-cuong"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#1863dc]"
                >
                  Triết lý phục vụ Khách hàng
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Xe Mới */}
          <div className="border-b border-gray-100 pb-2">
            <button
              onClick={() => toggleSubmenu("xe-moi")}
              className="w-full flex items-center justify-between text-sm font-bold text-gray-800 py-2"
            >
              <span>XE MỚI</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === "xe-moi" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "xe-moi" && (
              <div className="pl-4 space-y-2 pt-1 pb-2 text-xs font-semibold text-gray-600">
                <Link
                  href="/xe-moi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-[#1863dc] font-bold"
                >
                  Tất cả các dòng xe &rarr;
                </Link>
                {VEHICLES.map((car) => (
                  <Link
                    key={car.id}
                    href={`/san-pham/${car.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 hover:text-[#1863dc]"
                  >
                    {car.name} - <span className="text-[#f2295b]">{car.priceText}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/xe-cu"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-100"
          >
            XE GF CŨ
          </Link>

          {/* Mobile Dịch Vụ */}
          <div className="border-b border-gray-100 pb-2">
            <button
              onClick={() => toggleSubmenu("dich-vu")}
              className="w-full flex items-center justify-between text-sm font-bold text-gray-800 py-2"
            >
              <span>DỊCH VỤ</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubmenu === "dich-vu" ? "rotate-180" : ""}`} />
            </button>
            {mobileSubmenu === "dich-vu" && (
              <div className="pl-4 space-y-2 pt-1 pb-2 text-xs font-semibold text-gray-600">
                <Link
                  href="/dich-vu/bao-duong"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#1863dc]"
                >
                  Sửa chữa bảo dưỡng định kỳ
                </Link>
                <Link
                  href="/dich-vu/dong-son"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#1863dc]"
                >
                  Đồng sơn & Bảo hiểm
                </Link>
                <Link
                  href="/dich-vu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#1863dc]"
                >
                  Đặt hẹn dịch vụ
                </Link>
                <Link
                  href="/lam-dep-xe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#1863dc]"
                >
                  Làm đẹp xe & Spa
                </Link>
                <Link
                  href="/phu-kien-chinh-hang"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 hover:text-[#1863dc]"
                >
                  Phụ kiện Chính hãng
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/tram-sac"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-100"
          >
            TRẠM SẠC
          </Link>

          <Link
            href="/du-toan-lan-banh"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-100"
          >
            DỰ TOÁN LĂN BÁNH
          </Link>

          <Link
            href="/so-sanh-xe"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-100"
          >
            SO SÁNH XE
          </Link>

          <Link
            href="/tin-tuc"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-100"
          >
            TIN TỨC & SỰ KIỆN
          </Link>

          <Link
            href="/tuyen-dung"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-gray-800 py-2 border-b border-gray-100"
          >
            TUYỂN DỤNG
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#1863dc] py-2 border-b border-gray-100"
          >
            LIÊN HỆ & SHOWROOMS
          </Link>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="tel:0902422522"
              className="w-full text-center bg-[#f2295b] text-white py-2.5 rounded font-bold text-xs"
            >
              GỌI HOTLINE: 090 242 25 22
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal?.();
              }}
              className="w-full text-center bg-[#1863dc] text-white py-2.5 rounded font-bold text-xs"
            >
              ĐĂNG KÝ LÁI THỬ
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
