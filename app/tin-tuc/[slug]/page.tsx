"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { POSTS } from "@/data/news";

export default function SingleArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const currentIndex = POSTS.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex > 0 ? POSTS[currentIndex - 1] : POSTS[POSTS.length - 1];
  const nextPost =
    currentIndex < POSTS.length - 1 ? POSTS[currentIndex + 1] : POSTS[0];

  // Parse date for Thịnh Cường date badge (e.g. 31/08/2026 -> TH8 / 31)
  const dateParts = post.publishedDate?.split("/") || ["31", "08", "2026"];
  const day = dateParts[0] || "31";
  const month = dateParts[1] ? `TH${parseInt(dateParts[1], 10)}` : "TH8";

  return (
    <div className="w-full bg-[#fdfdfd] min-h-screen">
      {/* 1. HERO BANNER CHUẨN THỊNH CƯỜNG (anh-dep2.png) */}
      <section className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/anh-dep2.png"
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-4 max-w-[1100px] mx-auto text-white space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight drop-shadow-md leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* 2. MAIN ARTICLE CONTAINER (Exact 850px width matching Thịnh Cường 1:1) */}
      <div className="max-w-[850px] mx-auto px-4 sm:px-6 py-8">
        <article className="space-y-4">
          {/* Top Featured Image with Date Badge */}
          <div className="relative w-full overflow-hidden bg-gray-100 rounded-xs shadow-xs">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-auto block"
            />
            {/* Date Badge pinned at top-left corner */}
            <div className="absolute top-0 left-0 bg-white/95 shadow-md px-3 py-1.5 text-center min-w-[50px] border-t-2 border-[#1863dc]">
              <span className="block text-[10px] font-bold text-gray-600 uppercase leading-none">
                {month}
              </span>
              <span className="block text-xl font-black text-gray-900 leading-tight">
                {day}
              </span>
            </div>
          </div>

          {/* Top Info: Comments & Category links */}
          <div className="flex items-center gap-3 text-xs text-gray-500 py-2 border-b border-gray-100">
            <span className="flex items-center gap-1.5 text-gray-600">
              <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
              <span>0 Comments</span>
            </span>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-1.5 text-[#0073aa] text-xs">
              <Link href="/tin-tuc" className="hover:underline">
                Tin nội bộ
              </Link>
              <span>,</span>
              <Link href="/tin-tuc" className="hover:underline">
                Tin sự kiện
              </Link>
              <span>,</span>
              <Link href="/tin-tuc" className="hover:underline">
                Tin tức vinfast
              </Link>
            </div>
          </div>

          {/* Article HTML Content */}
          <div className="news-content text-[15px] sm:text-[16px] text-[#222] leading-relaxed pt-2">
            <div
              className="space-y-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* 3. SOCIAL SHARE BAR */}
          <div className="pt-6 mt-8 border-t border-gray-200 flex items-center gap-2.5 text-xs text-gray-600">
            <span className="font-bold text-gray-800">Share Link:</span>
            <div className="flex items-center gap-1.5">
              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer.php?u=https://vinfastthinhcuong.com.vn/tin-tuc/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className="w-7 h-7 rounded border border-gray-300 hover:border-[#1863dc] hover:text-[#1863dc] text-gray-600 flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.556 0 9 1.556 9 4.889V8z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://vinfastthinhcuong.com.vn/tin-tuc/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Twitter"
                className="w-7 h-7 rounded border border-gray-300 hover:border-[#1863dc] hover:text-[#1863dc] text-gray-600 flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=https://vinfastthinhcuong.com.vn/tin-tuc/${post.slug}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="w-7 h-7 rounded border border-gray-300 hover:border-[#1863dc] hover:text-[#1863dc] text-gray-600 flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href={`https://pinterest.com/pin/create/button/?url=https://vinfastthinhcuong.com.vn/tin-tuc/${post.slug}&media=${post.thumbnail}&description=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Pinterest"
                className="w-7 h-7 rounded border border-gray-300 hover:border-[#1863dc] hover:text-[#1863dc] text-gray-600 flex items-center justify-center transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.371-.053.224-.176.271-.406.163-1.516-.705-2.463-2.92-2.463-4.701 0-3.829 2.783-7.348 8.026-7.348 4.214 0 7.49 3.003 7.49 7.017 0 4.188-2.64 7.558-6.305 7.558-1.231 0-2.388-.64-2.784-1.396l-.758 2.896c-.274 1.055-1.018 2.378-1.517 3.189 1.157.357 2.383.551 3.655.551 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 4. POST NAVIGATION (Previous / Next matching Thịnh Cường 1:1) */}
          <nav className="my-8 border-t border-b border-gray-200 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Prev post */}
              {prevPost && (
                <Link
                  href={`/tin-tuc/${prevPost.slug}`}
                  className="group flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="relative w-16 h-16 shrink-0 bg-gray-100 border border-gray-200 overflow-hidden">
                    <img
                      src={prevPost.thumbnail}
                      alt={prevPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      &laquo; Previous
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#1863dc] line-clamp-2 leading-snug transition-colors">
                      {prevPost.title}
                    </h4>
                  </div>
                </Link>
              )}

              {/* Next post */}
              {nextPost && (
                <Link
                  href={`/tin-tuc/${nextPost.slug}`}
                  className="group flex items-center justify-end text-right gap-3 p-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      Next &raquo;
                    </span>
                    <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#1863dc] line-clamp-2 leading-snug transition-colors">
                      {nextPost.title}
                    </h4>
                  </div>
                  <div className="relative w-16 h-16 shrink-0 bg-gray-100 border border-gray-200 overflow-hidden">
                    <img
                      src={nextPost.thumbnail}
                      alt={nextPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
              )}
            </div>
          </nav>
        </article>
      </div>

      <style jsx global>{`
        .news-content h2 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #000;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .news-content h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: #111;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .news-content p {
          font-size: 0.9375rem;
          color: #1a1a1a;
          line-height: 1.75;
          margin-bottom: 0.85rem;
        }
        .news-content strong {
          font-weight: 700;
          color: #000;
        }
        .news-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          margin-top: 0.5rem;
        }
        .news-content li {
          font-size: 0.9375rem;
          color: #1a1a1a;
          line-height: 1.7;
          margin-bottom: 0.25rem;
        }
        .news-content blockquote {
          border-left: 3px solid #eab308;
          padding: 6px 14px;
          margin: 1.25rem 0;
          font-style: italic;
          color: #333;
          background: transparent;
        }
        .news-content blockquote p {
          margin-bottom: 0;
          color: #333;
        }
        .news-content .table-responsive {
          width: 100%;
          overflow-x: auto;
          margin: 1.25rem 0;
          border: 1px solid #e5e7eb;
        }
        .news-content table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          line-height: 1.5;
        }
        .news-content th {
          background-color: #fafafa;
          font-weight: 700;
          color: #000;
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          text-align: left;
        }
        .news-content td {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          color: #222;
          vertical-align: middle;
        }
        .news-content img {
          max-width: 660px;
          width: 100%;
          height: auto;
          display: block;
          margin: 1.5rem auto;
        }
      `}</style>
    </div>
  );
}
