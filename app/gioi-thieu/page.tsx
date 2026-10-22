"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Youtube,
  Instagram,
  X,
  ShieldCheck,
  Wrench,
  GraduationCap,
  Truck,
  Wallet,
  PackageCheck,
  MapPin,
  Phone,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react";
import GsapReveal from "@/components/animation/GsapReveal";
import AnimatedNumber from "@/components/animation/AnimatedNumber";
import { VEHICLES } from "@/data/vehicles";
import { SHOWROOMS, HEADQUARTERS } from "@/data/showrooms";

const VINFAST_BRAND_VIDEO_URL =
  "https://static-cms-prod.vinfastauto.com/The%20company%20behind%20VinFast%20electric%20cars.mp4";

const HOTLINE_TEL = "tel:" + HEADQUARTERS.hotline.replace(/\s/g, "");

/* Ảnh mặt tiền thật của từng showroom (file .jpg) */
const SHOWROOM_PHOTOS: Record<string, string> = {
  "thuong-tin": "/images/showrooms/thuong-tin.jpg",
  "hoang-quoc-viet": "/images/showrooms/hoang-quoc-viet.jpg",
  "hoa-lac": "/images/showrooms/hoa-lac.jpg",
  "bat-trang": "/images/showrooms/bat-trang.jpg",
};

const SHOWROOM_LOGOS: Record<string, string> = {
  "thuong-tin": "/4_logo_cuacaccuahang/logo_phuong_dong_thuong_tin.png",
  "hoang-quoc-viet": "/4_logo_cuacaccuahang/logo_phuong_dong_hoang_quoc_viet.png",
  "hoa-lac": "/4_logo_cuacaccuahang/logo_phuong_dong_hoa_lac.png",
  "bat-trang": "/4_logo_cuacaccuahang/logo_phuong_dong_bat_trang.png",
};

const workshopCount = SHOWROOMS.filter((s) => s.type === "3S").length;

const STATS = [
  { value: SHOWROOMS.length, suffix: "", label: "Showroom tại Hà Nội" },
  { value: workshopCount, suffix: "", label: "Xưởng dịch vụ chuẩn 3S" },
  { value: VEHICLES.length, suffix: "+", label: "Dòng xe đang phân phối" },
  { value: 7, suffix: " năm", label: "Bảo hành xe lên đến" },
];

const WHY_US = [
  {
    icon: ShieldCheck,
    title: "Đại lý ủy quyền chính hãng",
    desc: "Nhà phân phối được VinFast ủy quyền, giá bán và chính sách ưu đãi minh bạch theo hãng.",
  },
  {
    icon: Wrench,
    title: "Xưởng dịch vụ chuẩn 3S",
    desc: "Bảo hành, bảo dưỡng, sửa chữa, đồng sơn với trang thiết bị theo tiêu chuẩn VinFast.",
  },
  {
    icon: GraduationCap,
    title: "Kỹ thuật viên được VinFast đào tạo",
    desc: "Đội ngũ tư vấn và kỹ thuật được đào tạo bài bản, am hiểu từng dòng xe điện.",
  },
  {
    icon: Truck,
    title: "Lái thử & giao xe tận nơi",
    desc: "Đặt lịch lái thử nhanh chóng, hỗ trợ giao xe tận nhà và thủ tục đăng ký – đăng kiểm.",
  },
  {
    icon: Wallet,
    title: "Hỗ trợ tài chính linh hoạt",
    desc: "Liên kết ngân hàng, tư vấn trả góp và các gói thuê pin / mua pin phù hợp nhu cầu.",
  },
  {
    icon: PackageCheck,
    title: "Phụ tùng & phụ kiện chính hiệu",
    desc: "Cung cấp phụ tùng, phụ kiện chính hãng VinFast – đảm bảo an toàn và giữ trọn bảo hành.",
  },
];

const TIMELINE = [
  { year: "2017", title: "Khởi công tổ hợp nhà máy", desc: "02/09/2017 – Vingroup khởi công nhà máy ô tô VinFast tại Đình Vũ – Cát Hải, Hải Phòng, quy mô 335 ha." },
  { year: "2019", title: "Khánh thành nhà máy", desc: "Nhà máy đi vào hoạt động, ra mắt những mẫu ô tô thương hiệu Việt đầu tiên." },
  { year: "2021", title: "Ô tô điện đầu tiên", desc: "Bàn giao VF e34 – mẫu ô tô điện đầu tiên của VinFast tới khách hàng Việt Nam." },
  { year: "2022", title: "Chuyển đổi 100% xe điện", desc: "VinFast tập trung hoàn toàn vào xe điện thông minh, mở rộng dải VF 5 – VF 9." },
  { year: "2023", title: "Vươn ra toàn cầu", desc: "Niêm yết trên sàn Nasdaq (Mỹ), xe VinFast có mặt tại Bắc Mỹ, châu Âu và châu Á." },
  { year: "2024–2025", title: "Bùng nổ dải sản phẩm", desc: "VF 3 tạo cơn sốt; dòng Green dành cho dịch vụ (Minio, Herio, Nerio, Limo Green) và EC Van ra mắt." },
  { year: "2026", title: "Thế hệ mới", desc: "VF 2 – ô tô đầu đời trong tầm với và bán tải điện VF Wild công nghệ REEV." },
];

const DELIVERY_PHOTOS = [
  "/images/about/pd-delivery-2.jpg",
  "/images/about/pd-delivery-1.jpg",
  "/images/about/pd-delivery-3.jpg",
  "/images/about/pd-delivery-4.jpg",
  "/images/about/pd-delivery-5.jpg",
];

const RECOGNITIONS = [
  { img: "/images/about/pd-showroom-1.jpg", title: "Tư vấn bán hàng xuất sắc năm 2025", place: "VinFast Phương Đông Hoàng Quốc Việt" },
  { img: "/images/about/pd-showroom-2.jpg", title: "Tư vấn bán hàng xuất sắc nhất tháng 12/2025", place: "VinFast Phương Đông Hoàng Quốc Việt" },
  { img: "/images/about/pd-showroom-3.jpg", title: "Tư vấn bán hàng xuất sắc tháng 05/2026", place: "VinFast Phương Đông Hoàng Quốc Việt" },
];

function SectionHeading({
  eyebrow,
  title,
  desc,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-[760px] mb-10 sm:mb-12`}>
      <p className={`text-xs sm:text-sm font-bold tracking-[0.22em] uppercase mb-3 ${light ? "text-[#3AB3FF]" : "text-[#1863dc]"}`}>
        {eyebrow}
      </p>
      <h2 className={`text-2xl sm:text-3xl md:text-[36px] font-extrabold uppercase tracking-tight leading-tight ${light ? "text-white" : "text-[#0c0c0c]"}`}>
        {title}
      </h2>
      {desc && (
        <p className={`mt-4 text-sm sm:text-base leading-relaxed ${light ? "text-white/75" : "text-[#555]"}`}>{desc}</p>
      )}
    </div>
  );
}

export default function AboutPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const lightboxPrev = () =>
    setLightbox((i) => (i === null ? i : (i - 1 + DELIVERY_PHOTOS.length) % DELIVERY_PHOTOS.length));
  const lightboxNext = () =>
    setLightbox((i) => (i === null ? i : (i + 1) % DELIVERY_PHOTOS.length));

  return (
    <div className="w-full bg-white selection:bg-[#1863dc] selection:text-white">
      {/* HERO — video autoplay */}
      <section className="relative w-full min-h-[420px] sm:min-h-[500px] md:min-h-[560px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={VINFAST_BRAND_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Video giới thiệu VinFast"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70" />
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-6 text-center py-16 sm:py-20">
          <p className="text-white/80 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Nhà phân phối chính hãng
          </p>
          <h1 className="text-white text-3xl sm:text-4xl md:text-[44px] font-extrabold uppercase tracking-wide leading-tight drop-shadow-md">
            Giới thiệu
            <span className="block mt-1 text-[#3AB3FF]">VinFast Phương Đông</span>
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <a href="https://www.facebook.com/profile.php?id=61573789293153" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-[#3AB3FF] transition-colors p-1" aria-label="Facebook">
              <Facebook className="w-[18px] h-[18px] fill-current" />
            </a>
            <a href="https://www.youtube.com/channel/UC6WfPdHG-wTjp5S-ZcaiZyA" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-[#3AB3FF] transition-colors p-1" aria-label="YouTube">
              <Youtube className="w-[18px] h-[18px] fill-current" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61573789293153" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-[#3AB3FF] transition-colors p-1" aria-label="Instagram">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
          </div>
        </div>
      </section>

      {/* 1. STATS — dải số liệu nổi trên hero */}
      <section className="relative z-20 -mt-12 sm:-mt-16 px-4 sm:px-6">
        <div className="max-w-[1180px] mx-auto bg-gradient-to-r from-[#0b3a8c] via-[#1863dc] to-[#1d8cf0] shadow-[0_20px_50px_-15px_rgba(24,99,220,0.55)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/15">
            {STATS.map((s) => (
              <div key={s.label} className="px-4 py-7 sm:py-9 text-center">
                <div className="text-white text-3xl sm:text-4xl md:text-[46px] font-extrabold leading-none tracking-tight">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2.5 text-white/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. VỀ CHÚNG TÔI — collage ảnh showroom + nội dung */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <GsapReveal animation="slide-right" duration={0.8}>
            <div className="relative pb-10 sm:pb-14 pr-10 sm:pr-16">
              <div className="relative aspect-[4/3] overflow-hidden shadow-xl">
                <Image src="/images/showrooms/thuong-tin.jpg" alt="Showroom VinFast Phương Đông Thường Tín" fill className="object-cover" sizes="(max-width: 1024px) 90vw, 520px" priority />
              </div>
              <div className="absolute right-0 bottom-0 w-[48%] aspect-square overflow-hidden border-[6px] border-white shadow-2xl">
                <Image src="/images/showrooms/hoang-quoc-viet.jpg" alt="Showroom VinFast Phương Đông Hoàng Quốc Việt" fill className="object-cover" sizes="260px" />
              </div>
              <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 bg-white/95 backdrop-blur px-4 py-3 shadow-lg flex items-center gap-3">
                <Award className="w-8 h-8 text-[#1863dc] shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#666] font-semibold">Pháp nhân</div>
                  <div className="text-sm font-extrabold text-[#0c0c0c]">Công ty TNHH Phương Đông</div>
                </div>
              </div>
            </div>
          </GsapReveal>

          <GsapReveal animation="fade-up" duration={0.8}>
            <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase mb-3 text-[#1863dc]">Về chúng tôi</p>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold uppercase tracking-tight leading-tight text-[#0c0c0c]">
              Nhà phân phối chính hãng <span className="text-[#1863dc]">VinFast</span>
            </h2>
            <div className="mt-5 space-y-4 text-sm sm:text-[15px] md:text-base text-[#333] leading-[1.8]">
              <p>
                <strong>VinFast Phương Đông</strong> là nhà phân phối được VinFast ủy quyền chính hãng, sở hữu hệ thống showroom <strong>3S</strong> và <strong>1S</strong> được đầu tư bài bản theo tiêu chuẩn nhận diện mới nhất của VinFast, cùng xưởng dịch vụ trang thiết bị hiện đại.
              </p>
              <p>
                Chúng tôi cung cấp toàn bộ dải sản phẩm ô tô điện VinFast; dịch vụ bảo hành, bảo dưỡng, sửa chữa, đồng sơn; và phụ tùng chính hiệu theo tiêu chuẩn của hãng. Pháp nhân là <strong>Công ty TNHH Phương Đông</strong> – công ty đồng chủ sở hữu với <strong>Đông Hải Auto</strong>.
              </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["Ủy quyền chính hãng", "Showroom 3S & 1S", "Xưởng dịch vụ hiện đại", "Phụ tùng chính hiệu"].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 bg-[#eef4ff] text-[#1863dc] text-xs font-bold px-3 py-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/lien-he" className="inline-flex items-center gap-2 bg-[#1863dc] hover:bg-[#004dd6] text-white text-sm font-bold uppercase tracking-wide px-6 py-3 transition-colors">
                Liên hệ tư vấn <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={HOTLINE_TEL} className="inline-flex items-center gap-2 border-2 border-[#0c0c0c] text-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white text-sm font-bold uppercase tracking-wide px-6 py-[10px] transition-colors">
                <Phone className="w-4 h-4" /> {HEADQUARTERS.hotline}
              </a>
            </div>
          </GsapReveal>
        </div>
      </section>

      {/* 3. HỆ THỐNG SHOWROOM */}
      <section className="py-16 sm:py-20 bg-[#f4f6fa]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <GsapReveal animation="fade-up">
            <SectionHeading
              eyebrow="Hệ thống showroom"
              title={<>{SHOWROOMS.length} điểm chạm – <span className="text-[#1863dc]">phủ khắp Hà Nội</span></>}
              desc="Mỗi showroom đều sẵn xe trưng bày, xe lái thử và đội ngũ tư vấn tận tâm. Chọn điểm gần bạn nhất để trải nghiệm."
            />
          </GsapReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-7">
            {SHOWROOMS.map((s, i) => (
              <GsapReveal key={s.id} animation="fade-up" delay={i * 0.08}>
                <article className="group bg-white h-full flex flex-col border border-[#e6ebf2] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={SHOWROOM_PHOTOS[s.id] || s.image || "/images/showrooms/thuong-tin.jpg"}
                      alt={s.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 340px"
                    />
                    <span className={`absolute top-3 left-3 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 ${s.type === "3S" ? "bg-[#1863dc] text-white" : "bg-white text-[#0c0c0c]"}`}>
                      {s.type === "3S" ? "Showroom 3S" : "Showroom 1S"}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-4 min-h-[52px]">
                      {SHOWROOM_LOGOS[s.id] && (
                        <Image src={SHOWROOM_LOGOS[s.id]} alt="" width={40} height={40} className="rounded-full shrink-0" />
                      )}
                      <h3 className="text-[15px] sm:text-base font-extrabold text-[#0c0c0c] leading-snug">
                        {s.name.replace("Showroom VinFast Phương Đông ", "Phương Đông ")}
                      </h3>
                    </div>
                    <p className="flex items-start gap-2 text-[13px] text-[#444] leading-relaxed min-h-[44px]">
                      <MapPin className="w-4 h-4 mt-0.5 text-[#1863dc] shrink-0" /> {s.address}
                    </p>
                    <p className="mt-3 text-[12px] text-[#777] leading-relaxed">
                      {s.type === "3S" ? "Bán hàng · Dịch vụ · Phụ tùng" : "Trưng bày & bán hàng"}
                      <span className="block mt-0.5">{s.workingHoursSales}</span>
                    </p>
                    <div className="mt-auto pt-5 grid grid-cols-2 gap-2.5">
                      <a
                        href={s.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + ", " + s.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 border border-[#d5dbe5] hover:border-[#1863dc] hover:text-[#1863dc] text-[12px] font-bold uppercase py-2.5 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" /> Chỉ đường
                      </a>
                      <a
                        href={"tel:" + s.hotlineSales.replace(/\s/g, "")}
                        className="inline-flex items-center justify-center gap-1.5 bg-[#0c0c0c] hover:bg-[#1863dc] text-white text-[12px] font-bold uppercase py-2.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" /> Gọi ngay
                      </a>
                    </div>
                  </div>
                </article>
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VÌ SAO CHỌN PHƯƠNG ĐÔNG — nền tối */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-[#07111f]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(24,99,220,0.35),transparent_58%)]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[#1863dc]/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-10 h-[280px] w-[280px] rounded-full bg-[#3AB3FF]/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 72%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07111f]/30 via-transparent to-[#07111f]" />
        <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6">
          <GsapReveal animation="fade-up">
            <SectionHeading
              light
              eyebrow="Giá trị khác biệt"
              title={<>Vì sao chọn <span className="text-[#3AB3FF]">VinFast Phương Đông</span></>}
              desc="Đồng hành cùng khách hàng từ lúc chọn xe, lái thử, nhận xe cho tới suốt vòng đời sử dụng."
            />
          </GsapReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {WHY_US.map((w, i) => {
              const Icon = w.icon;
              return (
                <GsapReveal key={w.title} animation="fade-up" delay={i * 0.06} className="h-full">
                  <div className="group h-full bg-[#0c1a33]/95 hover:bg-[#1863dc] border border-white/10 hover:border-[#3AB3FF] p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(24,99,220,0.35)]">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#1863dc]/15 text-[#3AB3FF] group-hover:bg-white group-hover:text-[#1863dc] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-white/10 group-hover:text-white/40 text-4xl font-extrabold leading-none transition-colors">0{i + 1}</span>
                    </div>
                    <h3 className="mt-5 text-white text-lg font-extrabold uppercase tracking-tight">{w.title}</h3>
                    <p className="mt-2.5 text-white/65 group-hover:text-white/90 text-sm leading-relaxed transition-colors">{w.desc}</p>
                  </div>
                </GsapReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HÀNH TRÌNH VINFAST — timeline */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <GsapReveal animation="fade-up">
            <SectionHeading
              eyebrow="Thương hiệu VinFast"
              title={<>Hành trình <span className="text-[#1863dc]">thương hiệu xe Việt</span></>}
              desc="VinFast – Việt Nam · Phong cách · An toàn · Sáng tạo · Tiên phong. Thành viên Tập đoàn Vingroup, nhà sản xuất xe điện thông minh hàng đầu Việt Nam."
            />
          </GsapReveal>
        </div>

        <div className="relative max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-10">
            {/* đường kẻ dọc (mobile) / ngang (desktop) */}
            <div className="absolute left-[31px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#1863dc] to-[#3AB3FF]/20 lg:hidden" />
            <div className="hidden lg:block absolute left-10 right-10 top-[15px] h-[2px] bg-gradient-to-r from-[#1863dc] via-[#3AB3FF] to-[#1863dc]/20" />

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-8 xl:gap-10">
              {TIMELINE.map((t, i) => (
                <GsapReveal key={t.year} animation="fade-up" delay={i * 0.07}>
                  <div className="relative pl-12 lg:pl-0 lg:pt-12">
                    <span className="absolute left-0 top-0 lg:left-0 w-8 h-8 rounded-full bg-white border-[3px] border-[#1863dc] flex items-center justify-center shadow">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1863dc]" />
                    </span>
                    <div className="text-[#1863dc] text-xl font-extrabold tracking-tight">{t.year}</div>
                    <h3 className="mt-1 text-[15px] font-extrabold uppercase text-[#0c0c0c] leading-snug">{t.title}</h3>
                    <p className="mt-1.5 text-[13px] text-[#555] leading-relaxed">{t.desc}</p>
                  </div>
                </GsapReveal>
              ))}
            </div>
        </div>
      </section>

      {/* 6. DẢI SẢN PHẨM — cuộn ngang */}
      <section className="py-16 sm:py-20 bg-[#f4f6fa]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <GsapReveal animation="fade-up">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <SectionHeading
                center={false}
                eyebrow="Sản phẩm phân phối"
                title={<>Trọn bộ dải xe <span className="text-[#1863dc]">VinFast</span></>}
              />
              <Link href="/xe-moi" className="sm:mb-12 inline-flex items-center gap-2 text-sm font-bold uppercase text-[#1863dc] hover:gap-3 transition-all shrink-0">
                Xem tất cả xe <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GsapReveal>
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]">
            {VEHICLES.map((v) => (
              <Link
                key={v.id}
                href={`/san-pham/${v.slug}`}
                className="group snap-start shrink-0 w-[230px] sm:w-[260px] bg-white hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[16/10] bg-gradient-to-b from-white to-[#eef1f6] overflow-hidden">
                  <Image src={v.thumbnail} alt={v.name} fill className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" sizes="260px" />
                </div>
                <div className="p-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#1863dc]">{v.segment}</div>
                  <div className="mt-1 text-base font-extrabold text-[#0c0c0c]">{v.name}</div>
                  <div className="mt-1 text-sm text-[#555]">{v.priceText}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. KHOẢNH KHẮC BÀN GIAO — gallery */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <GsapReveal animation="fade-up">
            <SectionHeading
              eyebrow="Khách hàng của chúng tôi"
              title={<>Khoảnh khắc <span className="text-[#1863dc]">nhận xe</span></>}
              desc="Mỗi chiếc xe được bàn giao là một niềm vui được sẻ chia. Cảm ơn quý khách đã tin chọn VinFast Phương Đông."
            />
          </GsapReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 sm:gap-4">
            {DELIVERY_PHOTOS.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightbox(i)}
                className={`group relative overflow-hidden bg-[#eef1f6] ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`}
                aria-label={`Xem ảnh bàn giao xe ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`Bàn giao xe tại VinFast Phương Đông ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 580px" : "(max-width: 768px) 50vw, 290px"}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GHI NHẬN & VINH DANH */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#f7f3ea] to-white">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">
          <GsapReveal animation="slide-right">
            <div className="relative aspect-square max-w-[420px] mx-auto w-full">
              <div className="absolute inset-[12%] rounded-full bg-[#d4a640]/25 blur-3xl" />
              <Image src="/images/awards/award-pd-doanhso.jpg" alt="Cúp vinh danh VinFast Phương Đông" fill className="object-contain mix-blend-multiply" sizes="420px" />
            </div>
          </GsapReveal>
          <div>
            <GsapReveal animation="fade-up">
              <p className="text-xs sm:text-sm font-bold tracking-[0.22em] uppercase mb-3 text-[#b8862b]">Ghi nhận & vinh danh</p>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-extrabold uppercase tracking-tight leading-tight text-[#0c0c0c]">
                Con người làm nên <span className="text-[#b8862b]">chất lượng dịch vụ</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#555] leading-relaxed">
                Những thành tích của đội ngũ tư vấn là minh chứng cho cam kết phục vụ tận tâm mà VinFast Phương Đông theo đuổi mỗi ngày.
              </p>
            </GsapReveal>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {RECOGNITIONS.map((r, i) => (
                <GsapReveal key={r.img} animation="fade-up" delay={i * 0.08}>
                  <figure className="bg-white p-3 shadow-sm hover:shadow-lg transition-shadow h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={r.img} alt={r.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 230px" />
                    </div>
                    <figcaption className="pt-3">
                      <div className="text-[13px] font-extrabold text-[#0c0c0c] leading-snug">{r.title}</div>
                      <div className="mt-1 text-[11px] text-[#777]">{r.place}</div>
                    </figcaption>
                  </figure>
                </GsapReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA — video thương hiệu + liên hệ */}
      <section className="relative w-full min-h-[320px] sm:min-h-[380px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/about/vinfast14.jpg" alt="VinFast – tương lai xanh" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2a66]/90 via-black/60 to-black/70" />
        </div>
        <div className="relative z-10 text-center px-4 py-16 sm:py-20">
          <h2 className="text-white text-2xl sm:text-3xl md:text-[34px] font-extrabold uppercase tracking-wide mb-3">
            Sẵn sàng trải nghiệm xe điện VinFast?
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-7">
            Đến showroom gần nhất hoặc gọi hotline để được tư vấn, báo giá lăn bánh và đặt lịch lái thử miễn phí.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/lien-he" className="inline-flex items-center gap-2 bg-[#1863dc] hover:bg-[#004dd6] text-white text-sm font-bold uppercase tracking-wide px-7 py-3 transition-colors">
              Đăng ký lái thử <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={HOTLINE_TEL} className="inline-flex items-center gap-2 bg-white text-[#0c0c0c] hover:bg-[#3AB3FF] hover:text-white text-sm font-bold uppercase tracking-wide px-7 py-3 transition-colors">
              <Phone className="w-4 h-4" /> Hotline {HEADQUARTERS.hotline}
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox ảnh bàn giao */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setLightbox(null)}>
          <button type="button" onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Đóng">
            <X className="w-6 h-6" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); lightboxPrev(); }} className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Ảnh trước">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-3xl aspect-[4/3]" onClick={(e) => e.stopPropagation()}>
            <Image src={DELIVERY_PHOTOS[lightbox]} alt="Bàn giao xe VinFast Phương Đông" fill className="object-contain" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
          <button type="button" onClick={(e) => { e.stopPropagation(); lightboxNext(); }} className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Ảnh sau">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
