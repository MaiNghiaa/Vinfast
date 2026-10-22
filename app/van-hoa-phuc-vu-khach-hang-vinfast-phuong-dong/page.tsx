"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarCheck,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Ear,
  FileSignature,
  HeartHandshake,
  KeyRound,
  MapPin,
  Navigation,
  Phone,
  Play,
  Quote,
  Search,
  ShieldCheck,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import GsapReveal from "@/components/animation/GsapReveal";
import AnimatedNumber from "@/components/animation/AnimatedNumber";
import { useModal } from "@/components/ClientLayout";
import { HEADQUARTERS, SHOWROOMS } from "@/data/showrooms";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const HOTLINE_TEL = "tel:" + HEADQUARTERS.hotline.replace(/\s/g, "");
const VIDEO_ID = "CHs3CMu4EVY";

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

const VALUES = [
  {
    icon: Ear,
    title: "Lắng nghe",
    lead: "Bắt đầu từ câu hỏi của khách, không từ bài giới thiệu có sẵn.",
    points: [
      "Hỏi rõ nhu cầu đi lại và ngân sách trước khi gợi ý xe",
      "Ghi nhận mọi yêu cầu ngay khi khách bước ra khỏi xe",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Thấu hiểu",
    lead: "Đặt mình vào vị trí khách để chọn phương án phù hợp nhất.",
    points: [
      "Giải thích tính năng, pin, chi phí bằng ngôn ngữ dễ hiểu",
      "Tư vấn tài chính, trả góp theo đúng khả năng của khách",
    ],
  },
  {
    icon: Zap,
    title: "Hành động",
    lead: "Mỗi điểm chạm đều có một người chịu trách nhiệm đến cùng.",
    points: [
      "Báo giá minh bạch, có chữ ký xác nhận của khách",
      "Phản hồi khiếu nại muộn nhất trong ngày T+1",
    ],
  },
];

const JOURNEY = [
  {
    icon: Search,
    step: "01",
    title: "Tìm hiểu & tư vấn",
    image: "/images/home/video-showroom-bg.jpg",
    desc: "Khoảnh khắc khách quan tâm đến đại lý là lúc sự chuyên nghiệp bắt đầu. Tư vấn viên được đào tạo để giới thiệu dòng xe, phiên bản và chính sách bằng lời dễ hiểu.",
    points: ["Tư vấn qua hotline, tại showroom hoặc tận nơi", "So sánh phiên bản, dự toán chi phí lăn bánh", "Giải đáp chính sách pin, sạc và bảo hành"],
  },
  {
    icon: CarFront,
    step: "02",
    title: "Trải nghiệm & lái thử",
    image: "/images/showrooms/thuong-tin.jpg",
    desc: "Xe trưng bày và xe lái thử luôn sẵn sàng tại hệ thống showroom. Khách cảm nhận thực tế trước khi quyết định, không bị thúc ép.",
    points: ["Đặt lịch lái thử miễn phí theo giờ khách chọn", "Hướng dẫn trải nghiệm tính năng thông minh", "Không gian showroom chuẩn nhận diện VinFast"],
  },
  {
    icon: FileSignature,
    step: "03",
    title: "Hợp đồng & tài chính",
    image: "/images/about/pd-delivery-3.jpg",
    desc: "Giá bán và ưu đãi minh bạch theo chính sách hãng. Đội ngũ hỗ trợ trọn thủ tục để khách yên tâm từ hồ sơ đến giấy tờ xe.",
    points: ["Liên kết ngân hàng, tư vấn trả góp linh hoạt", "Hỗ trợ đăng ký, đăng kiểm, bảo hiểm", "Mọi chi phí được giải thích rõ trước khi ký"],
  },
  {
    icon: KeyRound,
    step: "04",
    title: "Bàn giao xe",
    image: "/images/about/pd-delivery-5.jpg",
    desc: "Mỗi chiếc xe được bàn giao là một niềm vui được sẻ chia. Xe được kiểm tra kỹ, hướng dẫn thao tác đầy đủ và giao tận nơi nếu khách cần.",
    points: ["Kiểm tra hồ sơ và tình trạng xe cùng khách", "Hướng dẫn sử dụng, sạc pin, ứng dụng VinFast", "Lễ bàn giao chu đáo tại showroom hoặc tận nhà"],
  },
  {
    icon: Wrench,
    step: "05",
    title: "Đồng hành hậu mãi",
    image: "/images/about/xuong-dich-vu-vinfast-thinhcuong-11.jpg",
    desc: "Sau bàn giao là cả một hành trình. Xưởng dịch vụ 3S chăm xe bằng kỹ thuật viên được VinFast đào tạo và phụ tùng chính hãng.",
    points: ["Nhắc lịch bảo dưỡng trước 10 ngày", "Gọi lại ghi nhận ý kiến trong vòng 2 ngày", "Cứu hộ và sửa chữa lưu động khi cần"],
  },
];

const SERVICE_STEPS = [
  { title: "Nhắc bảo dưỡng & đặt hẹn", desc: "Nhắc trước 10 ngày so với kỳ bảo dưỡng. Lịch hẹn trước ít nhất 4 tiếng được tiếp nhận và xác nhận." },
  { title: "Tiếp nhận & tư vấn", desc: "Khách được hướng dẫn đỗ xe, chào đón và ghi nhận yêu cầu. Báo giá đầy đủ, có chữ ký xác nhận của khách." },
  { title: "Sửa chữa nhanh chóng", desc: "Cập nhật tiến độ liên tục. Mọi hạng mục phát sinh đều được thông báo và xin ý kiến khách." },
  { title: "Bàn giao đúng hạn", desc: "Xe được rửa sạch trước khi giao (nếu khách cần), giao đúng hẹn, quyết toán rõ ràng." },
  { title: "Chăm sóc sau sửa chữa", desc: "Gọi điện ghi nhận phản hồi trong 2 ngày. Khiếu nại có giải pháp muộn nhất ngày T+1." },
];

const PROMISES = [
  { value: 10, suffix: " ngày", label: "Nhắc lịch bảo dưỡng trước kỳ hẹn" },
  { value: 4, suffix: " giờ", label: "Đặt hẹn trước là được xác nhận" },
  { value: 2, suffix: " ngày", label: "Gọi lại ghi nhận ý kiến sau dịch vụ" },
  { value: null, text: "T+1", label: "Phản hồi giải pháp cho mọi khiếu nại" },
];

const MOMENTS = [
  { src: "/images/about/pd-delivery-2.jpg", caption: "Gia đình nhận xe tại VinFast Phương Đông Hoàng Quốc Việt" },
  { src: "/images/about/pd-delivery-1.jpg", caption: "Khoảnh khắc nhận VF 3 đầu tiên" },
  { src: "/images/about/pd-delivery-4.jpg", caption: "Lễ bàn giao tại VinFast Phương Đông Thường Tín" },
  { src: "/images/about/pd-delivery-3.jpg", caption: "Đồng hành cùng khách đến ngày nhận xe" },
  { src: "/images/about/pd-delivery-5.jpg", caption: "Niềm vui được sẻ chia tại Thường Tín" },
];

const RECOGNITIONS = [
  { img: "/images/about/pd-showroom-1.jpg", title: "Tư vấn bán hàng xuất sắc năm 2025" },
  { img: "/images/about/pd-showroom-2.jpg", title: "Tư vấn xuất sắc nhất tháng 12/2025" },
  { img: "/images/about/pd-showroom-3.jpg", title: "Tư vấn xuất sắc tháng 05/2026" },
];

/* ------------------------------------------------------------------ */
/*  SMALL PARTS                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] ${
        light ? "text-[#3AB3FF]" : "text-[#1863dc]"
      }`}
    >
      <span className={`h-px w-6 ${light ? "bg-[#3AB3FF]" : "bg-[#1863dc]"}`} />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function CustomerCulturePage() {
  const { openBooking } = useModal();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeShowroom, setActiveShowroom] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const overlayOpen = isVideoOpen || lightbox !== null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoOpen(false);
        setLightbox(null);
      }
      if (lightbox !== null && e.key === "ArrowRight") setLightbox((i) => (i === null ? i : (i + 1) % MOMENTS.length));
      if (lightbox !== null && e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? i : (i - 1 + MOMENTS.length) % MOMENTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  const step = JOURNEY[activeStep];
  const showroom = SHOWROOMS[activeShowroom];

  return (
    <div className="w-full bg-white text-[#0c0c0c] selection:bg-[#1863dc] selection:text-white">
      {/* ============================================================ */}
      {/* 1. HERO                                                       */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(24,99,220,0.38),transparent_55%)]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[520px] w-[520px] rounded-full bg-[#3AB3FF]/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at 30% 40%, black 15%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, black 15%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16 sm:pb-20 lg:pb-24">
          <nav className="text-[12px] text-white/50 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/gioi-thieu" className="hover:text-white transition-colors">Giới thiệu</Link>
            <span>/</span>
            <span className="text-white/80">Văn hóa phục vụ</span>
          </nav>

          <div className="mt-10 lg:mt-14 grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* copy */}
            <div className="lg:col-span-7">
              <GsapReveal animation="fade-up">
                <Eyebrow light>Văn hóa phục vụ khách hàng</Eyebrow>
                <h1 className="mt-5 text-[36px] leading-[1.1] sm:text-5xl lg:text-[48px] xl:text-[56px] font-extrabold tracking-[-0.03em]">
                  <span className="whitespace-nowrap">Phục vụ bằng</span>{" "}
                  <span className="whitespace-nowrap text-[#3AB3FF]">trái tim,</span>
                  <br />
                  <span className="sm:whitespace-nowrap">kết nối bằng giá trị</span>
                </h1>
                <p className="mt-6 max-w-[540px] text-base sm:text-lg text-white/75 leading-relaxed">
                  Sự chuyên nghiệp bắt đầu từ khoảnh khắc đầu tiên khách quan tâm đến đại lý, và kéo dài đến khi khách trở thành
                  người đồng hành cùng thương hiệu.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => openBooking(undefined, "lai-thu")}
                    className="inline-flex items-center gap-2 bg-[#1863dc] hover:bg-[#3AB3FF] text-white text-sm font-bold uppercase tracking-wide px-6 py-3.5 transition-colors"
                  >
                    Đặt lịch tư vấn <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsVideoOpen(true)}
                    className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide pl-2 pr-5 py-2 border border-white/20 hover:border-white/60 transition-colors"
                  >
                    <span className="w-9 h-9 rounded-full bg-white text-[#07111f] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </span>
                    Xem video
                  </button>
                </div>
              </GsapReveal>

              <GsapReveal animation="fade-up" delay={0.15}>
                <dl className="mt-12 grid grid-cols-3 max-w-[520px] border-t border-white/10">
                  {[
                    { v: SHOWROOMS.length, s: "", l: "Showroom tại Hà Nội" },
                    { v: workshopCount, s: "", l: "Xưởng dịch vụ 3S" },
                    { v: 7, s: "/7", l: "Ngày phục vụ mỗi tuần" },
                  ].map((it) => (
                    <div key={it.l} className="pt-5 pr-4">
                      <dt className="sr-only">{it.l}</dt>
                      <dd className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        <AnimatedNumber value={it.v} suffix={it.s} />
                      </dd>
                      <p className="mt-1.5 text-[11px] sm:text-xs uppercase tracking-wider text-white/55 font-semibold">{it.l}</p>
                    </div>
                  ))}
                </dl>
              </GsapReveal>
            </div>

            {/* mosaic */}
            <GsapReveal animation="slide-left" className="lg:col-span-5">
              <div className="relative grid grid-cols-5 grid-rows-6 gap-3 h-[420px] sm:h-[520px] lg:h-[580px]">
                <div className="relative col-span-3 row-span-6 overflow-hidden">
                  <Image
                    src="/images/about/pd-delivery-2.jpg"
                    alt="Gia đình nhận xe tại VinFast Phương Đông"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, 360px"
                  />
                </div>
                <div className="relative col-span-2 row-span-3 overflow-hidden">
                  <Image
                    src="/images/showrooms/hoang-quoc-viet.jpg"
                    alt="Showroom VinFast Phương Đông Hoàng Quốc Việt"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 240px"
                  />
                </div>
                <div className="relative col-span-2 row-span-3 overflow-hidden">
                  <Image
                    src="/images/about/pd-delivery-4.jpg"
                    alt="Bàn giao xe tại VinFast Phương Đông Thường Tín"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 240px"
                  />
                </div>

                {/* floating promise card */}
                <div className="absolute -bottom-6 left-4 sm:left-6 right-[44%] sm:right-auto sm:w-[290px] bg-white text-[#0c0c0c] p-4 sm:p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 shrink-0 bg-[#eef4ff] text-[#1863dc] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-[#777] font-bold">Cam kết</p>
                      <p className="text-sm font-extrabold leading-snug">Phản hồi khiếu nại trong ngày T+1</p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex absolute -top-5 right-5 items-center gap-2 bg-[#1863dc] px-4 py-2.5 shadow-lg">
                  <Award className="w-4 h-4 text-white" />
                  <span className="text-[12px] font-extrabold uppercase tracking-wider">Top Sales Dealer Award</span>
                </div>
              </div>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MANIFESTO                                                  */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <GsapReveal animation="fade-up">
              <Eyebrow>Triết lý phục vụ</Eyebrow>
              <Quote className="mt-8 w-14 h-14 text-[#1863dc]/15 fill-current hidden lg:block" />
            </GsapReveal>
          </div>
          <div className="lg:col-span-9">
            <GsapReveal animation="fade-up">
              <p className="isolate text-[26px] sm:text-4xl lg:text-[44px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#0c0c0c]">
                Dịch vụ không chỉ là quy trình. Đó là cách chúng tôi{" "}
                <span className="text-[#1863dc]">đứng cạnh khách hàng</span> ở mọi điểm chạm, từ câu hỏi đầu tiên đến{" "}
                <span className="relative whitespace-nowrap">
                  từng lần chăm xe
                  <span className="absolute left-0 right-0 bottom-1 h-3 bg-[#3AB3FF]/25 -z-10" />
                </span>
                .
              </p>
            </GsapReveal>
            <GsapReveal animation="fade-up" delay={0.1}>
              <div className="mt-10 grid sm:grid-cols-2 gap-6 sm:gap-10 text-[15px] sm:text-base text-[#444] leading-[1.8]">
                <p>
                  Tại VinFast Phương Đông, mỗi thành viên chú ý những chi tiết nhỏ, làm việc tỉ mỉ và giữ sự chu đáo trong suốt
                  hành trình của khách. Những gì xuất phát từ sự tôn trọng sẽ chạm được đến khách hàng.
                </p>
                <p>
                  Sự hài lòng của khách là thước đo để Phương Đông hoàn thiện mỗi ngày. Bán xe và chăm xe được làm theo cùng một
                  chuẩn: chính hãng, minh bạch, và có người chịu trách nhiệm đến cùng.
                </p>
              </div>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. CORE VALUES                                                */}
      {/* ============================================================ */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 border-t border-l border-[#e3e8f0]">
            {VALUES.map((v, i) => (
              <GsapReveal key={v.title} animation="fade-up" delay={i * 0.08} className="h-full">
                <article className="group relative h-full border-r border-b border-[#e3e8f0] p-7 sm:p-9 lg:p-10 overflow-hidden transition-colors duration-300 hover:bg-[#07111f]">
                  <div className="flex items-start justify-between">
                    <span className="w-12 h-12 bg-[#eef4ff] text-[#1863dc] flex items-center justify-center transition-colors group-hover:bg-[#1863dc] group-hover:text-white">
                      <v.icon className="w-6 h-6" />
                    </span>
                    <span className="text-5xl font-extrabold text-[#eef1f6] group-hover:text-white/10 transition-colors leading-none">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 text-2xl sm:text-[28px] font-extrabold tracking-tight group-hover:text-white transition-colors">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-[#555] group-hover:text-white/75 leading-relaxed transition-colors">{v.lead}</p>
                  <ul className="mt-7 space-y-3">
                    {v.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-[#333] group-hover:text-white/85 transition-colors">
                        <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#1863dc] group-hover:text-[#3AB3FF]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-[#3AB3FF] group-hover:w-full transition-all duration-500" />
                </article>
              </GsapReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. CUSTOMER JOURNEY (interactive)                             */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[#07111f] text-white py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(24,99,220,0.3),transparent_55%)]" />
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <GsapReveal animation="fade-up">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-[640px]">
                <Eyebrow light>Hành trình khách hàng</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.02em] leading-tight">
                  5 điểm chạm, một chuẩn mực phục vụ
                </h2>
              </div>
              <p className="max-w-[420px] text-white/65 leading-relaxed">
                Từ lúc tìm hiểu đến suốt vòng đời sử dụng xe, mỗi giai đoạn đều có quy trình rõ ràng và người phụ trách cụ thể.
              </p>
            </div>
          </GsapReveal>

          {/* step tabs */}
          <div className="mt-12 grid grid-cols-5 gap-1.5 sm:gap-3" role="tablist" aria-label="Hành trình khách hàng">
            {JOURNEY.map((j, i) => {
              const active = i === activeStep;
              return (
                <button
                  key={j.step}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveStep(i)}
                  className="group text-left"
                >
                  <span className="block h-[3px] bg-white/10 overflow-hidden">
                    <span
                      className={`block h-full bg-[#3AB3FF] transition-all duration-500 ${active ? "w-full" : i < activeStep ? "w-full opacity-40" : "w-0"}`}
                    />
                  </span>
                  <span className="mt-4 flex items-center gap-2.5">
                    <span
                      className={`hidden sm:flex w-9 h-9 shrink-0 items-center justify-center transition-colors ${
                        active ? "bg-[#1863dc] text-white" : "bg-white/5 text-white/50 group-hover:text-white"
                      }`}
                    >
                      <j.icon className="w-4 h-4" />
                    </span>
                    <span>
                      <span className={`block text-[11px] font-extrabold tracking-wider ${active ? "text-[#3AB3FF]" : "text-white/40"}`}>
                        {j.step}
                      </span>
                      <span
                        className={`hidden md:block text-sm font-bold leading-snug transition-colors ${
                          active ? "text-white" : "text-white/50 group-hover:text-white/80"
                        }`}
                      >
                        {j.title}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* step panel */}
          <div key={step.step} className="mt-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch animate-[page-enter_.45s_ease]">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
              <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/70 via-transparent to-transparent" />
              <span className="absolute left-5 bottom-4 text-[80px] sm:text-[110px] font-extrabold leading-none text-white/15 tracking-tighter">
                {step.step}
              </span>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <p className="text-[#3AB3FF] text-sm font-extrabold tracking-wider">BƯỚC {step.step}</p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">{step.title}</h3>
              <p className="mt-4 text-white/70 leading-relaxed">{step.desc}</p>
              <ul className="mt-7 space-y-3.5 border-t border-white/10 pt-7">
                {step.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-white/90">
                    <span className="mt-1 w-4 h-4 shrink-0 bg-[#1863dc] flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep((s) => (s - 1 + JOURNEY.length) % JOURNEY.length)}
                  className="w-11 h-11 border border-white/20 hover:border-white hover:bg-white hover:text-[#07111f] flex items-center justify-center transition-colors"
                  aria-label="Bước trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep((s) => (s + 1) % JOURNEY.length)}
                  className="w-11 h-11 border border-white/20 hover:border-white hover:bg-white hover:text-[#07111f] flex items-center justify-center transition-colors"
                  aria-label="Bước tiếp theo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="ml-2 text-sm text-white/50 font-semibold">
                  {activeStep + 1} / {JOURNEY.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. WORKSHOP — chăm xe như chăm người nhà                      */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <GsapReveal animation="slide-right" className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="relative pr-10 pb-16 sm:pr-16 sm:pb-20">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/images/about/xuong-dich-vu-vinfast-thinhcuong-11.jpg"
                    alt="Kỹ thuật viên xưởng dịch vụ VinFast Phương Đông"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 440px"
                  />
                </div>
                <div className="absolute right-0 bottom-0 w-[55%] aspect-square overflow-hidden border-[6px] border-white shadow-2xl">
                  <Image
                    src="/images/about/dich-vu-sua-chua-thinh-cuong-1.jpg"
                    alt="Kiểm tra hệ thống phanh tại xưởng 3S"
                    fill
                    className="object-cover"
                    sizes="260px"
                  />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex gap-3 bg-[#f4f6fa] p-4">
                  <Clock className="w-5 h-5 text-[#1863dc] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-[#777]">Giờ xưởng</p>
                    <p className="text-sm font-bold leading-snug">{HEADQUARTERS.serviceHours}</p>
                  </div>
                </div>
                <div className="flex gap-3 bg-[#f4f6fa] p-4">
                  <ShieldCheck className="w-5 h-5 text-[#1863dc] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-bold text-[#777]">Bảo hiểm</p>
                    <p className="text-sm font-bold leading-snug">Giám định viên trực tại xưởng</p>
                  </div>
                </div>
              </div>
            </div>
          </GsapReveal>

          <div className="lg:col-span-7">
            <GsapReveal animation="fade-up">
              <Eyebrow>Xưởng dịch vụ chuẩn 3S</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.02em] leading-tight">
                Chăm xe như chăm <span className="text-[#1863dc]">người nhà</span>
              </h2>
              <p className="mt-5 text-[15px] sm:text-base text-[#444] leading-[1.8] max-w-[600px]">
                Mỗi chiếc xe là người đồng hành trên đường. Bảo dưỡng, sửa chữa, đồng sơn hay xử lý vết xước đều do kỹ thuật viên
                được VinFast đào tạo thực hiện, với 100% phụ tùng chính hãng.
              </p>
            </GsapReveal>

            <ol className="mt-10 relative">
              <span className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-[#1863dc] to-[#1863dc]/10" />
              {SERVICE_STEPS.map((s, i) => (
                <GsapReveal key={s.title} animation="fade-up" delay={i * 0.06}>
                  <li className="relative flex gap-5 pb-8 last:pb-0">
                    <span className="relative z-10 w-10 h-10 shrink-0 bg-white border-2 border-[#1863dc] text-[#1863dc] text-sm font-extrabold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="text-lg font-extrabold tracking-tight">{s.title}</h3>
                      <p className="mt-1.5 text-[15px] text-[#555] leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                </GsapReveal>
              ))}
            </ol>

            <GsapReveal animation="fade-up">
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openBooking(undefined, "dich-vu")}
                  className="inline-flex items-center gap-2 bg-[#1863dc] hover:bg-[#004dd6] text-white text-sm font-bold uppercase tracking-wide px-6 py-3.5 transition-colors"
                >
                  <CalendarCheck className="w-4 h-4" /> Đặt lịch dịch vụ
                </button>
                <Link
                  href="/dich-vu"
                  className="inline-flex items-center gap-2 border-2 border-[#0c0c0c] hover:bg-[#0c0c0c] hover:text-white text-sm font-bold uppercase tracking-wide px-6 py-3 transition-colors"
                >
                  Xem dịch vụ <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </GsapReveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PROMISES BAND                                              */}
      {/* ============================================================ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1240px] mx-auto bg-gradient-to-r from-[#0b3a8c] via-[#1863dc] to-[#1d8cf0] text-white shadow-[0_24px_60px_-20px_rgba(24,99,220,0.55)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/15">
            {PROMISES.map((p) => (
              <div key={p.label} className="px-5 sm:px-8 py-8 sm:py-10">
                <div className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-none">
                  {p.value === null ? p.text : <AnimatedNumber value={p.value} suffix={p.suffix} />}
                </div>
                <p className="mt-3 text-[12px] sm:text-[13px] text-white/80 font-semibold leading-snug">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. MOMENTS GALLERY                                            */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <GsapReveal animation="fade-up">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
              <div className="max-w-[620px]">
                <Eyebrow>Khoảnh khắc nhận xe</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.02em] leading-tight">
                  Niềm vui được sẻ chia
                </h2>
              </div>
              <p className="max-w-[400px] text-[#555] leading-relaxed">
                Cảm ơn quý khách đã tin chọn VinFast Phương Đông. Mỗi chiếc xe bàn giao là một câu chuyện chúng tôi trân trọng.
              </p>
            </div>
          </GsapReveal>

          <div className="grid grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-3 sm:gap-4 md:h-[560px]">
            {MOMENTS.map((m, i) => {
              const layout = [
                "col-span-2 md:col-span-3 md:row-span-2 aspect-[4/3] md:aspect-auto",
                "md:col-span-3 aspect-square md:aspect-auto",
                "md:col-span-1 aspect-square md:aspect-auto",
                "md:col-span-1 aspect-square md:aspect-auto",
                "md:col-span-1 aspect-square md:aspect-auto",
              ][i];
              return (
                <button
                  key={m.src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={`group relative overflow-hidden bg-[#eef1f6] ${layout}`}
                  aria-label={`Xem ảnh: ${m.caption}`}
                >
                  <Image
                    src={m.src}
                    alt={m.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 620px" : "(max-width: 768px) 50vw, 320px"}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute left-4 right-4 bottom-3 text-left text-white text-[13px] font-semibold leading-snug translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                    {m.caption}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. RECOGNITION                                                */}
      {/* ============================================================ */}
      <section className="bg-gradient-to-b from-[#f7f3ea] to-white py-20 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <GsapReveal animation="slide-right" className="lg:col-span-4">
            <div className="relative aspect-square max-w-[380px] mx-auto w-full">
              <div className="absolute inset-[14%] rounded-full bg-[#d4a640]/25 blur-3xl" />
              <Image
                src="/images/awards/award-pd-doanhso.jpg"
                alt="Cúp Top Sales Dealer Award của VinFast Phương Đông"
                fill
                className="object-contain mix-blend-multiply"
                sizes="380px"
              />
            </div>
          </GsapReveal>
          <div className="lg:col-span-8">
            <GsapReveal animation="fade-up">
              <p className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-[0.2em] text-[#b8862b]">
                <span className="h-px w-6 bg-[#b8862b]" /> Ghi nhận & vinh danh
              </p>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.02em] leading-tight">
                Con người làm nên <span className="text-[#b8862b]">chất lượng dịch vụ</span>
              </h2>
              <p className="mt-4 max-w-[600px] text-[#555] leading-relaxed">
                Giải thưởng Top Sales Dealer và những danh hiệu tư vấn xuất sắc là minh chứng cho cam kết phục vụ tận tâm mà đội
                ngũ Phương Đông theo đuổi mỗi ngày.
              </p>
            </GsapReveal>
            <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {RECOGNITIONS.map((r, i) => (
                <GsapReveal key={r.img} animation="fade-up" delay={i * 0.08} className="h-full">
                  <figure className="h-full bg-white p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={r.img} alt={r.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 260px" />
                    </div>
                    <figcaption className="pt-3 px-1 pb-1">
                      <p className="text-[13px] font-extrabold leading-snug">{r.title}</p>
                      <p className="mt-1 text-[11px] text-[#777]">VinFast Phương Đông Hoàng Quốc Việt</p>
                    </figcaption>
                  </figure>
                </GsapReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. SHOWROOM NETWORK (interactive)                             */}
      {/* ============================================================ */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <GsapReveal animation="fade-up">
            <div className="max-w-[640px] mb-10">
              <Eyebrow>Đón tiếp tại showroom</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.02em] leading-tight">
                {SHOWROOMS.length} showroom, cùng một cách phục vụ
              </h2>
            </div>
          </GsapReveal>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
            <div className="min-w-0 lg:col-span-5 border-t border-[#e3e8f0]">
              {SHOWROOMS.map((s, i) => {
                const active = i === activeShowroom;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onMouseEnter={() => setActiveShowroom(i)}
                    onFocus={() => setActiveShowroom(i)}
                    onClick={() => setActiveShowroom(i)}
                    className={`w-full text-left flex items-center gap-4 py-5 px-3 sm:px-4 border-b border-[#e3e8f0] transition-colors ${
                      active ? "bg-[#f4f6fa]" : "hover:bg-[#fafbfd]"
                    }`}
                  >
                    {SHOWROOM_LOGOS[s.id] && (
                      <Image src={SHOWROOM_LOGOS[s.id]} alt="" width={44} height={44} className="rounded-full shrink-0" />
                    )}
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center gap-2">
                        <span className={`text-base sm:text-lg font-extrabold ${active ? "text-[#1863dc]" : ""}`}>
                          {s.name.replace("Showroom VinFast Phương Đông ", "")}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 ${
                            s.type === "3S" ? "bg-[#1863dc] text-white" : "bg-[#e9edf3] text-[#444]"
                          }`}
                        >
                          {s.type === "3S" ? "3S" : "1S"}
                        </span>
                      </span>
                      <span className="mt-1 block text-[13px] text-[#666] truncate">{s.address}</span>
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 shrink-0 transition-all ${active ? "text-[#1863dc] translate-x-0" : "text-[#bbb] -translate-x-1"}`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="min-w-0 lg:col-span-7">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#eef1f6]">
                {SHOWROOMS.map((s, i) => (
                  <Image
                    key={s.id}
                    src={SHOWROOM_PHOTOS[s.id] || s.image || "/images/showrooms/hoang-quoc-viet.jpg"}
                    alt={s.name}
                    fill
                    className={`object-cover transition-opacity duration-500 ${i === activeShowroom ? "opacity-100" : "opacity-0"}`}
                    sizes="(max-width: 1024px) 100vw, 700px"
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/50 to-transparent pt-24 pb-5 px-5 sm:px-7 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#3AB3FF]">
                    {showroom.type === "3S" ? "Bán hàng · Dịch vụ · Phụ tùng" : "Trưng bày & bán hàng"}
                  </p>
                  <p className="mt-1 text-xl sm:text-2xl font-extrabold">{showroom.name}</p>
                  <p className="mt-2 flex items-start gap-1.5 text-[13px] text-white/75">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" /> {showroom.address}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    <a
                      href={
                        showroom.mapUrl ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(showroom.name + ", " + showroom.address)}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-white text-[#0c0c0c] hover:bg-[#3AB3FF] hover:text-white text-[12px] font-bold uppercase px-4 py-2.5 transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Chỉ đường
                    </a>
                    <a
                      href={"tel:" + showroom.hotlineSales.replace(/\s/g, "")}
                      className="inline-flex items-center gap-1.5 border border-white/40 hover:bg-white hover:text-[#0c0c0c] text-[12px] font-bold uppercase px-4 py-2.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> {showroom.hotlineSales}
                    </a>
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-white/70 px-1 py-2.5">
                      <Clock className="w-3.5 h-3.5" /> {showroom.workingHoursSales}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. CTA                                                       */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden text-white">
        <Image src="/images/showrooms/bat-trang.jpg" alt="" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/90 to-[#0b3a8c]/70" />
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <Quote className="w-10 h-10 text-[#3AB3FF] fill-current opacity-80" />
            <p className="mt-5 text-2xl sm:text-3xl lg:text-[38px] font-extrabold leading-[1.3] tracking-[-0.01em]">
              Phục vụ bằng trái tim và sự chuyên nghiệp là niềm tự hào của VinFast Phương Đông.
            </p>
            <p className="mt-5 text-white/70 max-w-[520px] leading-relaxed">
              Gọi hotline hoặc để lại thông tin. Đội ngũ sẽ chọn showroom gần bạn nhất và sắp lịch tư vấn, lái thử.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch">
            <a
              href={HOTLINE_TEL}
              className="inline-flex items-center justify-between gap-4 bg-white text-[#0c0c0c] hover:bg-[#3AB3FF] hover:text-white px-6 py-4 transition-colors"
            >
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-wider opacity-60">Hotline 24/7</span>
                <span className="block text-xl font-extrabold">{HEADQUARTERS.hotline}</span>
              </span>
              <Phone className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => openBooking(undefined, "lai-thu")}
              className="inline-flex items-center justify-between gap-4 bg-[#1863dc] hover:bg-[#004dd6] px-6 py-4 font-bold uppercase tracking-wide text-sm transition-colors"
            >
              Đăng ký lái thử <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* OVERLAYS                                                      */}
      {/* ============================================================ */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video VinFast Phương Đông"
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
              aria-label="Đóng video"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="VinFast Phương Đông"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i - 1 + MOMENTS.length) % MOMENTS.length));
            }}
            className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-[4/3]">
              <Image src={MOMENTS[lightbox].src} alt={MOMENTS[lightbox].caption} fill className="object-contain" sizes="(max-width: 896px) 100vw, 896px" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/75">
              {MOMENTS[lightbox].caption} · {lightbox + 1}/{MOMENTS.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i === null ? i : (i + 1) % MOMENTS.length));
            }}
            className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"
            aria-label="Ảnh sau"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
