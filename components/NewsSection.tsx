"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { POSTS } from "@/data/news";

interface TabItem {
  id: string;
  name: string;
}

const NEWS_TABS: TabItem[] = [
  { id: "all", name: "Tin tức vinfast" },
  { id: "khuyen-mai", name: "Tin khuyến mại" },
  { id: "su-kien", name: "Tin sự kiện" },
  { id: "noi-bo", name: "Tin nội bộ" },
];

interface NewsSectionProps {
  className?: string;
}

export default function NewsSection({ className = "" }: NewsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredPosts = POSTS.filter((post) => {
    if (activeTab === "all") return true;
    if (activeTab === "khuyen-mai") return post.category === "uu-dai";
    if (activeTab === "su-kien") return post.category === "su-kien";
    if (activeTab === "noi-bo") return post.category === "tin-noi-bo";
    return true;
  }).slice(0, 6);

  return (
    <section className={`bg-white ${className || "py-12 md:py-16"} overflow-hidden`}>
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
        {/* Title Centered matching Phương Đông */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-black uppercase text-[#0c0c0c] tracking-tight font-mulish">
            TIN TỨC MỚI NHẤT
          </h2>
          {/* Elementor exact Divider under title: width 15%, thickness 4.5px, color #3AB3FF */}
          <div className="w-[15%] min-w-[100px] max-w-[180px] h-[4.5px] bg-[#3AB3FF] mx-auto mt-3 rounded-full" />
        </div>

        {/* Filter Tabs Centered matching ha-post-tab-filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {NEWS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-[4px] text-xs sm:text-[13px] font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#3AB3FF] text-white shadow-sm"
                    : "bg-transparent text-[#222222] hover:text-[#3AB3FF]"
                }`}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* 6 Cards Grid matching ha-post-tab-grid-3 (3 cols x 2 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/tin-tuc/${post.slug}`}
              className="group bg-white rounded-[6px] sm:rounded-[8px] overflow-hidden border border-gray-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail 16:9 without any overlay badge */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-50">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Title Section (clean, bold, uppercase, no date, no excerpt) */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-start">
                <h3 className="text-[13px] sm:text-[14px] font-bold uppercase leading-snug text-[#0c0c0c] group-hover:text-[#1863dc] transition-colors line-clamp-3">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
