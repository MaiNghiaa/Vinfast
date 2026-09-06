"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ChevronRight, Calendar, User, ArrowLeft, Phone } from "lucide-react";
import { POSTS } from "@/data/news";

export default function SingleArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const relatedPosts = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="w-full bg-white pb-16">
      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1863dc]">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <Link href="/tin-tuc" className="hover:text-[#1863dc]">Tin tức</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-gray-900 font-bold line-clamp-1">{post.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <div className="space-y-4">
          <span className="inline-block bg-blue-100 text-[#1863dc] text-xs font-black uppercase px-3 py-1 rounded">
            {post.categoryName}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-gray-500 border-y border-gray-200 py-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              {post.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gray-400" />
              {post.author}
            </span>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden my-6 border border-gray-200">
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article HTML Content */}
          <div
            className="prose prose-sm max-w-none text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Hotline CTA Box */}
          <div className="my-8 p-6 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-4 flex-wrap">
            <div>
              <strong className="text-sm font-black text-[#1863dc] block uppercase">
                TƯ VẤN TRỰC TIẾP TỪ VINFAST THỊNH CƯỜNG
              </strong>
              <p className="text-xs text-gray-600 mt-0.5">
                Liên hệ hotline để nhận bảng giá giảm sâu và đặt lịch lái thử tận nhà.
              </p>
            </div>
            <a
              href="tel:0902422522"
              className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-2.5 rounded font-black text-xs uppercase shadow flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>090 242 25 22</span>
            </a>
          </div>

          {/* Related Articles */}
          <div className="pt-10 border-t border-gray-200">
            <h3 className="text-lg font-black uppercase text-gray-900 mb-6">
              BÀI VIẾT LIÊN QUAN
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((r) => (
                <Link
                  key={r.id}
                  href={`/tin-tuc/${r.slug}`}
                  className="group block space-y-2"
                >
                  <div className="relative w-full h-36 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={r.thumbnail}
                      alt={r.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 block">{r.publishedDate}</span>
                  <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#1863dc] line-clamp-2 leading-snug">
                    {r.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
