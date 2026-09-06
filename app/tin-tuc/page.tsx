"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight, Calendar, User, Tag } from "lucide-react";
import { POSTS } from "@/data/news";

export default function NewsListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPosts = POSTS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">Tin tức & Sự kiện VinFast Thịnh Cường</span>
        </div>
      </div>

      <div className="bg-[#111827] text-white py-14 px-4 sm:px-8 text-center border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto space-y-2">
          <span className="text-xs font-black text-[#00d2ff] uppercase tracking-widest block">
            CẬP NHẬT HOẠT ĐỘNG MỚI NHẤT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase">
            TIN TỨC, ƯU ĐÃI & BÁO CHÍ
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
            Tin tức khuyến mại độc quyền, lịch lái thử Thứ 7 Hạnh Phúc và kinh nghiệm sử dụng xe điện thông minh.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase transition-all ${
              selectedCategory === "all"
                ? "bg-[#1863dc] text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Tất cả ({POSTS.length})
          </button>
          <button
            onClick={() => setSelectedCategory("uu-dai")}
            className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase transition-all ${
              selectedCategory === "uu-dai"
                ? "bg-[#1863dc] text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Tin khuyến mại
          </button>
          <button
            onClick={() => setSelectedCategory("su-kien")}
            className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase transition-all ${
              selectedCategory === "su-kien"
                ? "bg-[#1863dc] text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Tin sự kiện
          </button>
          <button
            onClick={() => setSelectedCategory("danh-gia-xe")}
            className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase transition-all ${
              selectedCategory === "danh-gia-xe"
                ? "bg-[#1863dc] text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Đánh giá xe & ADAS
          </button>
          <button
            onClick={() => setSelectedCategory("tin-noi-bo")}
            className={`px-5 py-2 rounded-full text-xs font-extrabold uppercase transition-all ${
              selectedCategory === "tin-noi-bo"
                ? "bg-[#1863dc] text-white shadow"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Tin nội bộ
          </button>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <Link href={`/tin-tuc/${post.slug}`} className="relative block w-full h-52 bg-gray-100 overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#1863dc] text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                    {post.categoryName}
                  </span>
                </Link>

                <div className="p-5">
                  <span className="text-[11px] text-gray-500 block mb-1">
                    {post.publishedDate} • {post.author}
                  </span>
                  <Link href={`/tin-tuc/${post.slug}`}>
                    <h2 className="text-sm font-extrabold text-gray-900 group-hover:text-[#1863dc] transition-colors line-clamp-2 leading-snug mb-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-0">
                <Link
                  href={`/tin-tuc/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1863dc] hover:text-[#004dd6]"
                >
                  <span>Xem chi tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
