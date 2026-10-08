import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Calendar,
  ChevronRight,
  Phone,
  Mail,
  Building,
  ShieldCheck,
  Award,
  Users,
} from "lucide-react";
import { getAllJobs, getJobBySlug, getRelatedJobs } from "@/data/jobs";
import JobApplyForm from "./JobApplyForm";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const jobs = getAllJobs();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const job = getJobBySlug(params.slug);
  if (!job) {
    return {
      title: "Không tìm thấy tin tuyển dụng | VinFast Phương Đông",
    };
  }

  return {
    title: `${job.title} | Tuyển Dụng VinFast Phương Đông`,
    description: `${job.description.slice(0, 160)}... Mức thu nhập hấp dẫn: ${job.salary}. Địa điểm: ${job.location}.`,
    openGraph: {
      title: job.title,
      description: `Ứng tuyển ngay vị trí ${job.title} tại VinFast Phương Đông. Thu nhập: ${job.salary}.`,
      images: [job.image],
    },
  };
}

export default function JobDetailPage({ params }: PageProps) {
  const job = getJobBySlug(params.slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = getRelatedJobs(job.id, 4);

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen text-[#1f2937] font-sans antialiased">
      {/* 1. Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 py-3 text-xs text-gray-600">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#1863dc] transition-colors">
                Trang chủ
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/tuyen-dung" className="hover:text-[#1863dc] transition-colors">
                Tuyển dụng
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-semibold line-clamp-1 max-w-[280px] sm:max-w-md">
              {job.title}
            </li>
          </ol>
        </div>
      </div>

      {/* 2. Hero Header */}
      <div className="bg-[#111827] text-white py-8 sm:py-12 border-b border-gray-800">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#1863dc] text-white text-[11px] sm:text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                {job.department}
              </span>
              <span className="bg-white/10 text-gray-300 text-xs px-2.5 py-1 rounded flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#3AB3FF]" /> {job.date}
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded flex items-center gap-1 font-semibold">
                <DollarSign className="w-3.5 h-3.5" /> Thu nhập: {job.salary}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#3AB3FF] shrink-0" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#3AB3FF] shrink-0" />
                Hệ thống đại lý chính hãng VinFast Phương Đông
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Grid (8 cols left, 4 cols right sticky) */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Detailed Descriptions */}
          <main className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] max-h-[420px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-xs">
              <Image
                src={job.image}
                alt={job.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>

            {/* Introduction Card */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-3">
              <h2 className="text-base sm:text-lg font-black uppercase text-gray-900 border-l-4 border-[#1863dc] pl-3">
                Giới Thiệu Chung
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {job.description}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                VinFast Phương Đông tự hào là một trong những đại lý ủy quyền hàng đầu của VinFast Việt Nam với chuỗi 9 showroom và xưởng dịch vụ hiện đại. Chúng tôi liên tục tìm kiếm và chiêu mộ nhân tài để cùng kiến tạo tương lai giao thông xanh thông minh.
              </p>
            </section>

            {/* Responsibilities */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-black uppercase text-gray-900 border-l-4 border-[#1863dc] pl-3">
                1. Mô Tả Công Việc & Trách Nhiệm
              </h2>
              <ul className="space-y-3 text-sm text-gray-700">
                {job.details.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#1863dc] mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-black uppercase text-gray-900 border-l-4 border-[#1863dc] pl-3">
                2. Yêu Cầu Ứng Viên
              </h2>
              <ul className="space-y-3 text-sm text-gray-700">
                {job.details.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#3AB3FF] mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="bg-white rounded-xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-4">
              <h2 className="text-base sm:text-lg font-black uppercase text-gray-900 border-l-4 border-emerald-500 pl-3">
                3. Quyền Lợi & Phúc Lợi Được Hưởng
              </h2>
              <ul className="space-y-3 text-sm text-gray-700">
                {job.details.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span className="font-medium text-gray-900">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Company Culture & Trust Highlights */}
            <section className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-6 sm:p-8 border border-blue-100 space-y-4">
              <h3 className="text-base font-black uppercase text-[#1863dc]">
                Tại Sao Nên Gia Nhập Đội Ngũ VinFast Phương Đông?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-2xs space-y-1.5">
                  <Award className="w-6 h-6 text-[#1863dc]" />
                  <h4 className="text-xs font-bold uppercase text-gray-900">
                    Đào Tạo Chuẩn 5 Sao
                  </h4>
                  <p className="text-xs text-gray-600">
                    Được cấp chứng chỉ chuyên môn chuẩn hãng từ VinFast Việt Nam.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-2xs space-y-1.5">
                  <Users className="w-6 h-6 text-[#1863dc]" />
                  <h4 className="text-xs font-bold uppercase text-gray-900">
                    Lộ Trình Thăng Tiến
                  </h4>
                  <p className="text-xs text-gray-600">
                    Đánh giá minh bạch định kỳ 6 tháng, cơ hội quản lý rộng mở.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-2xs space-y-1.5">
                  <ShieldCheck className="w-6 h-6 text-[#1863dc]" />
                  <h4 className="text-xs font-bold uppercase text-gray-900">
                    Chế Độ Toàn Diện
                  </h4>
                  <p className="text-xs text-gray-600">
                    BHXH đầy đủ, thưởng lễ tết, du lịch thường niên cùng công ty.
                  </p>
                </div>
              </div>
            </section>
          </main>

          {/* RIGHT COLUMN: Application Form (Sticky on Desktop) */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Quick Apply Card */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-gray-200 shadow-lg">
              <div className="border-b border-gray-100 pb-4 mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1863dc] block mb-1">
                  ỨNG TUYỂN TRỰC TUYẾN
                </span>
                <h3 className="text-lg font-black uppercase text-gray-900">
                  Nộp Hồ Sơ Ứng Tuyển
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Điền thông tin bên dưới, Bộ phận Nhân sự sẽ liên hệ phỏng vấn trong vòng 24 giờ.
                </p>
              </div>

              {/* Client Component Application Form */}
              <JobApplyForm jobTitle={job.title} jobSlug={job.slug} />
            </div>

            {/* HR Support Card */}
            <div className="bg-gray-900 text-white rounded-xl p-6 space-y-4 shadow-md">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#3AB3FF] uppercase tracking-wider">
                  PHÒNG TUYỂN DỤNG & NHÂN SỰ
                </span>
                <h4 className="text-base font-black uppercase text-white">
                  Hỗ Trợ Ứng Viên 24/7
                </h4>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#3AB3FF]" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Hotline / Zalo Tuyển dụng:</span>
                    <a href="tel:0902422522" className="text-sm font-bold text-white hover:text-[#3AB3FF] transition-colors">
                      090 242 25 22
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#3AB3FF]" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Hộp thư tiếp nhận CV:</span>
                    <span className="font-semibold text-white">
                      tuyendung@vinfastphuongdong.vn
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#3AB3FF]" />
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Địa chỉ văn phòng:</span>
                    <span className="text-gray-200">
                      Trụ sở VinFast Phương Đông, Hà Nội
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* 4. Related Jobs Section */}
        {relatedJobs.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-[#1863dc] uppercase tracking-wider block">
                  CƠ HỘI NGHỀ NGHIỆP
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-gray-900">
                  Vị Trí Tuyển Dụng Khác
                </h3>
              </div>
              <Link
                href="/tuyen-dung"
                className="text-xs sm:text-sm font-bold text-[#1863dc] hover:underline flex items-center gap-1"
              >
                Xem tất cả vị trí <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedJobs.map((rJob) => (
                <Link
                  key={rJob.id}
                  href={`/tuyen-dung/${rJob.slug}`}
                  className="bg-white rounded-xl p-5 border border-gray-200 hover:border-[#1863dc] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <span className="inline-block bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {rJob.department}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold uppercase text-gray-900 group-hover:text-[#1863dc] transition-colors line-clamp-2">
                      {rJob.title}
                    </h4>
                    <div className="space-y-1 text-xs text-gray-500">
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-400" /> {rJob.location}
                      </p>
                      <p className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <DollarSign className="w-3 h-3" /> {rJob.salary}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#1863dc]">
                    <span>Ứng tuyển ngay</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
