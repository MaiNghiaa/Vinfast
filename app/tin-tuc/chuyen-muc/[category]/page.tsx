"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";
import { POSTS } from "@/data/news";

const CATEGORY_NAMES: Record<string, string> = {
  "uu-dai": "Tin Khuyến Mại",
  "tin-noi-bo": "Tin Nội Bộ",
  "su-kien": "Tin Sự Kiện",
  "danh-gia-xe": "Đánh Giá Xe & ADAS",
};

export default function CategoryNewsPage() {
  const params = useParams();
  const category = params?.category as string;
  const categoryName = CATEGORY_NAMES[category] || "Chuyên mục tin tức";

  const posts = POSTS.filter((p) => p.category === category);

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/tin-tuc" className="hover:text-[#1863dc]">Tin tức</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold">{categoryName}</span>
        </div>
      </div>

      <div className="bg-[#111827] text-white py-12 px-4 sm:px-8 text-center border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto space-y-2">
          <span className="text-xs font-black text-[#00d2ff] uppercase tracking-widest block">
            CHUYÊN MỤC BÀI VIẾT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black uppercase">
            {categoryName}
          </h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <Link href={`/tin-tuc/${post.slug}`} className="relative block w-full h-52 bg-gray-100 overflow-hidden">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="p-5">
                  <span className="text-[11px] text-gray-500 block mb-1">
                    {post.publishedDate}
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

        {posts.length === 0 && (
          <div className="bg-white p-12 rounded-xl text-center text-gray-500 border border-gray-200">
            <p className="text-sm">Hiện chưa có bài viết mới trong chuyên mục này.</p>
            <Link href="/tin-tuc" className="inline-block mt-3 text-xs text-[#1863dc] font-bold hover:underline">
              Quay lại trang Tin tức
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
