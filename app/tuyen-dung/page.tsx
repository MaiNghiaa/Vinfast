"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronRight,
  Bookmark,
  X,
  RotateCcw,
} from "lucide-react";
import GsapReveal from "@/components/animation/GsapReveal";
import StaggerContainer from "@/components/animation/StaggerContainer";
import {
  JOBS_DATA,
  DEPARTMENTS,
  LOCATIONS,
  SALARY_RANGES,
} from "@/data/jobs";

const ITEMS_PER_PAGE = 9;

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("Tất cả");
  const [selectedLocation, setSelectedLocation] = useState("Tất cả địa điểm");
  const [selectedSalary, setSelectedSalary] = useState("Tất cả mức lương");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // Keyword
      const searchMatch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase());

      // Department
      const deptMatch =
        selectedDept === "Tất cả" || job.department === selectedDept;

      // Location
      const locMatch =
        selectedLocation === "Tất cả địa điểm" ||
        job.location === selectedLocation;

      // Salary filter
      let salMatch = true;
      if (selectedSalary === "Trên 25 triệu") {
        salMatch =
          job.salary.includes("25") ||
          job.salary.includes("30") ||
          job.salary.includes("60");
      } else if (selectedSalary === "15 – 25 triệu") {
        salMatch =
          job.salary.includes("15") ||
          job.salary.includes("18") ||
          job.salary.includes("20") ||
          job.salary.includes("25");
      } else if (selectedSalary === "Dưới 15 triệu") {
        salMatch =
          job.salary.includes("9") ||
          job.salary.includes("12") ||
          job.salary.includes("14") ||
          job.salary.includes("Trợ cấp");
      }

      return searchMatch && deptMatch && locMatch && salMatch;
    });
  }, [searchTerm, selectedDept, selectedLocation, selectedSalary]);

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;
  const currentJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handleResetFilter = () => {
    setSearchTerm("");
    setSelectedDept("Tất cả");
    setSelectedLocation("Tất cả địa điểm");
    setSelectedSalary("Tất cả mức lương");
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-[#fdfdfd] min-h-screen">
      {/* 1. HERO BANNER CHUẨN PHƯƠNG ĐÔNG */}
      <section className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/banners/banner-he-thong-phuong-dong.jpg"
          alt="Tin tuyển dụng VinFast Phương Đông"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-4 max-w-[1300px] mx-auto text-white space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
            Tin Tuyển Dụng
          </h1>
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-white font-medium">Tin tuyển dụng</span>
          </div>
        </div>
      </section>

      {/* 2. THANH LỌC NGANG (HORIZONTAL FILTER BAR) */}
      <section className="sticky top-[72px] z-20 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          {/* Hàng 1: Ô tìm kiếm & Các Dropdown tiêu chí */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Ô tìm kiếm */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Tìm kiếm vị trí tuyển dụng, kỹ năng, chức danh..."
                className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-base md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1863dc] focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Địa điểm */}
            <div className="w-full md:w-52">
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-base md:text-sm text-gray-700 focus:outline-none focus:border-[#1863dc] focus:bg-white cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown Mức lương */}
            <div className="w-full md:w-52">
              <select
                value={selectedSalary}
                onChange={(e) => {
                  setSelectedSalary(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-base md:text-sm text-gray-700 focus:outline-none focus:border-[#1863dc] focus:bg-white cursor-pointer"
              >
                {SALARY_RANGES.map((sal) => (
                  <option key={sal} value={sal}>
                    {sal}
                  </option>
                ))}
              </select>
            </div>

            {/* Nút đặt lại bộ lọc */}
            {(searchTerm ||
              selectedDept !== "Tất cả" ||
              selectedLocation !== "Tất cả địa điểm" ||
              selectedSalary !== "Tất cả mức lương") && (
              <button
                onClick={handleResetFilter}
                className="px-3.5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Đặt lại
              </button>
            )}
          </div>

          {/* Hàng 2: Bộ lọc Phòng ban / Ngành nghề dạng Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-gray-400 font-bold shrink-0 mr-1 hidden sm:inline">
              Khối ngành:
            </span>
            {DEPARTMENTS.map((dept) => {
              const isActive = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => {
                    setSelectedDept(dept);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#1863dc] text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. DANH SÁCH TIN TUYỂN DỤNG (3 CỘT RESPONSIVE) */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header tổng số lượng */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-black uppercase text-gray-900 tracking-tight">
              CƠ HỘI VIỆC LÀM TẠI VINFAST PHƯƠNG ĐÔNG
            </h2>
            <span className="text-xs font-bold text-gray-500">
              Tìm thấy <strong className="text-[#1863dc]">{filteredJobs.length}</strong> vị trí
            </span>
          </div>

          {/* Grid 3 cột */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-gray-800">
                Không tìm thấy vị trí phù hợp
              </h3>
              <p className="text-xs text-gray-500">
                Vui lòng thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại bộ lọc phòng ban và mức lương.
              </p>
              <button
                onClick={handleResetFilter}
                className="bg-[#1863dc] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : (
            <StaggerContainer
              stagger={0.06}
              yOffset={25}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
            >
              {currentJobs.map((job) => (
                <article
                  key={job.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Image & Date Badge Container */}
                  <div>
                    <Link
                      href={`/tuyen-dung/${job.slug}`}
                      className="block relative w-full aspect-[16/9] overflow-hidden bg-gray-100"
                    >
                      <Image
                        src={job.image}
                        alt={job.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Date Badge chuẩn phong cách Phương Đông */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-md px-2.5 py-1 text-center shadow-xs border border-gray-100 leading-tight">
                        <span className="block text-[10px] font-bold text-gray-500 uppercase">
                          {job.month}
                        </span>
                        <span className="block text-base font-black text-gray-900">
                          {job.day}
                        </span>
                      </div>

                      {/* Salary Badge */}
                      <div className="absolute bottom-3 right-3 bg-[#1863dc]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                        {job.salary}
                      </div>
                    </Link>

                    {/* Post Info Container */}
                    <div className="p-5 space-y-3">
                      {/* Meta links */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1 text-[#1863dc] font-semibold">
                          <Bookmark className="w-3.5 h-3.5" />
                          {job.department}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className="font-bold text-gray-900 text-[16px] md:text-[17px] leading-snug line-clamp-2 group-hover:text-[#1863dc] transition-colors"
                        title={job.title}
                      >
                        <Link href={`/tuyen-dung/${job.slug}`}>
                          {job.title}
                        </Link>
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{job.location}</span>
                      </div>

                      {/* Description excerpt */}
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  {/* Readmore Button Bar */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-gray-400">
                        Cập nhật {job.date}
                      </span>
                      <Link
                        href={`/tuyen-dung/${job.slug}`}
                        className="inline-flex items-center gap-1.5 bg-[#1863dc] hover:bg-[#004dd6] text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:gap-2 shadow-xs"
                      >
                        Chi Tiết »
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </StaggerContainer>
          )}

          {/* 4. PHÂN TRANG (PAGINATION) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className={`w-9 h-9 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-[#1863dc] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPages && (
                <button
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className="px-3 h-9 rounded-md text-xs font-bold bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all flex items-center justify-center cursor-pointer"
                >
                  »
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
