"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  Phone,
  ShieldCheck,
  Wrench,
  Clock,
  Users,
  Gift,
  CircleDollarSign,
  Zap,
  TrendingUp,
  Search,
  Fuel,
  Leaf,
  Award,
} from "lucide-react";
import { useModal } from "@/components/ClientLayout";

export default function DichVuBaoDuongPage() {
  const { openBooking } = useModal();
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const stats = [
    { value: "10+", label: "Năm kinh nghiệm", icon: Clock },
    { value: "200+", label: "Chuyên viên bảo dưỡng", icon: Users },
    { value: "20K", label: "Lượt bảo dưỡng/năm", icon: Wrench },
    { value: "10k", label: "Khách hàng thân thiết", icon: ShieldCheck },
  ];

  const maintenanceCategories = [
    {
      title: "KIỂM TRA HỆ THỐNG ĐỘNG CƠ",
      desc: "Các bộ phận lọc nhiên liệu, lọc dầu động cơ, lọc gió, dây đai dẫn động, dây đai cam và nước làm mát.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/15.jpg",
    },
    {
      title: "KIỂM TRA HỆ THỐNG LÁI",
      desc: "Áp suất lốp.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/14.jpg",
    },
    {
      title: "KIỂM TRA HỆ THỐNG PHANH",
      desc: "Đĩa/má phanh, trống phanh, dầu phanh và guốc phanh.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/13.jpg",
    },
    {
      title: "KIỂM TRA HỆ THỐNG ĐIỆN",
      desc: "Bugi, ắc quy.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/11.jpg",
    },
    {
      title: "KIỂM TRA HỆ THỐNG TRUYỀN LỰC",
      desc: "Dầu hộp số thường, dầu hộp số vi sai, dầu hộp số tự động.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/12.jpg",
    },
    {
      title: "KIỂM TRA HỆ THỐNG CHIẾU SÁNG VÀ ĐÈN",
      desc: "",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/10.jpg",
    },
  ];

  const processTabs = [
    {
      id: "B1",
      name: "B1. Đặt lịch bảo dưỡng",
      desc: "Khách hàng đặt lịch hẹn trước qua điện thoại, website hoặc ứng dụng của Vinfast Phương Đông. Điều này giúp đảm bảo rằng khi Quý khách hàng đến, các kỹ thuật viên và dụng cụ được chọn lọc phù hợp, sẵn sàng quy trình bảo dưỡng.",
      benefit: "Tiết kiệm thời gian, đảm bảo quy trình bảo dưỡng diễn ra thuận lợi và nhanh chóng.",
    },
    {
      id: "B2",
      name: "B2. Kiểm tra và đánh giá",
      desc: "Khi khách hàng đến, cố vấn dịch vụ và kỹ thuật viên sẽ tiến hành kiểm tra tổng quát xe để xác định tình trạng hiện tại và các hạng mục cần bảo dưỡng.",
      benefit: "Phát hiện sớm các vấn đề tiềm ẩn, đảm bảo tất cả các hạng mục cần thiết đều được kiểm tra và xử lý.",
    },
    {
      id: "B3",
      name: "B3. Tư vấn và xác nhận dịch vụ",
      desc: "Sau khi kiểm tra và xác định tình trạng của xe, cố vấn dịch vụ sẽ tư vấn cho khách hàng về tình trạng xe và các dịch vụ cần thiết. Khách hàng sẽ xác nhận dịch vụ cần thực hiện.",
      benefit: "Khách hàng nắm rõ tình trạng xe và dịch vụ sẽ được thực hiện, không có chi phí phát sinh không rõ ràng.",
    },
    {
      id: "B4",
      name: "B4. Tiến hành bảo dưỡng",
      desc: "Các kỹ thuật viên sẽ tiến hành các công việc bảo dưỡng theo kế hoạch đã xác nhận tuân thủ nghiêm ngặt tiêu chuẩn của hãng.",
      benefit: "Đảm bảo xe được bảo dưỡng toàn diện và đúng quy trình kỹ thuật, tăng hiệu suất và tuổi thọ xe.",
    },
    {
      id: "B5",
      name: "B5. Kiểm tra sau bảo dưỡng",
      desc: "Sau khi hoàn thành bảo dưỡng, cố vấn dịch vụ sẽ dẫn Quý khách hàng ra xe, kiểm tra lại toàn bộ xe để đảm bảo tất cả các hạng mục đã được thực hiện đúng, nhằm đem lại chất lượng tốt nhất.",
      benefit: "Đảm bảo chất lượng dịch vụ, xe hoạt động tốt và an toàn trước khi giao lại cho khách hàng.",
    },
    {
      id: "B6",
      name: "B6. Thanh toán và giao xe",
      desc: "Cố vấn dịch vụ hướng dẫn Quý khách hàng hoàn thiện các thủ tục thanh toán, chia sẻ kiến thức, kinh nghiệm vận hành xe và mốc bảo dưỡng đợt tới.",
      benefit: "Khách hàng nhận lại xe với đầy đủ thông tin về tình trạng và những gì đã được thực hiện, yên tâm về chất lượng dịch vụ.",
    },
  ];

  const commitments = [
    {
      title: "Đội ngũ kỹ thuật viên chuyên nghiệp",
      icon: Users,
      desc: "Đội ngũ kỹ thuật viên lành nghề, có nhiều năm kinh nghiệm và được đào tạo bài bản theo chương trình đào tạo: VINFAST TEAM do VINFAST tổ chức, đáp ứng các tiêu chuẩn khắt khe trong việc sửa chữa, bảo dưỡng do hãng đặt ra.",
    },
    {
      title: "Trang thiết bị hiện đại, phụ tùng chính hiệu",
      icon: Wrench,
      desc: "Liên tục cập nhật và sử dụng trang thiết bị tiên tiến, công nghệ mới nhất, đảm bảo quá trình bảo dưỡng diễn ra nhanh chóng và chính xác, đảm bảo sự an toàn trong quá trình vận hành xe. Phụ tùng thay thế cho xe đều được Vinfast sử dụng chính hiệu từ nhà máy trong khu vực.",
    },
    {
      title: "Thời gian bảo dưỡng nhanh chóng",
      icon: Clock,
      desc: "Vinfast Phương Đông đã thiết lập quy trình làm việc bảo dưỡng nhanh Express Maintenance 60 phút (EM) theo tiêu chuẩn Vinfast Việt Nam (giảm thiểu tối đa các động tác thừa của nhân viên kỹ thuật trong thao tác làm việc), đồng thời liên tục thực hiện kaizen tăng năng suất lao động, giảm thời gian chờ đợi của Quý khách hàng.",
    },
    {
      title: "Chất lượng đảm bảo",
      icon: ShieldCheck,
      desc: "Chúng tôi cam kết chất lượng dịch vụ cao nhất, đảm bảo xe của Quý khách hàng luôn hoạt động ổn định và an toàn sau mỗi lần bảo dưỡng.",
    },
    {
      title: "Khuyến mại hấp dẫn",
      icon: Gift,
      desc: "Thường xuyên mang đến các chương trình bảo hành, hậu mãi và nhiều ưu đãi, quà tặng hấp dẫn cho khách hàng khi đến sử dụng Dịch vụ tại Đại lý.",
    },
    {
      title: "Chi phí hợp lý",
      icon: CircleDollarSign,
      desc: "Dịch vụ bảo dưỡng nhanh với mức giá cạnh tranh, giúp Quý khách tiết kiệm chi phí mà vẫn nhận được dịch vụ chất lượng cao.",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. TOP BANNER (MATCHING PHƯƠNG ĐÔNG ẢNH 3: RỘNG RÃI, TEXT VỪA VẶN TINH TẾ) */}
      <section className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/BAODUONG.jpg"
          alt="Dịch vụ bảo dưỡng VinFast Phương Đông"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle left gradient overlay so text is crisp while car and shop are vivid */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 w-full text-left">
          <div className="max-w-xl">
            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold uppercase text-white leading-[1.35] tracking-wide mb-3 sm:mb-4 drop-shadow-md">
              DỊCH VỤ BẢO DƯỠNG
              <br />
              VINFAST PHƯƠNG ĐÔNG
            </h1>
            <h2 className="text-xs sm:text-[13px] md:text-sm font-bold uppercase tracking-wider text-white mb-2 sm:mb-2.5">
              UY TÍN – TẬN TÂM – CHUYÊN NGHIỆP
            </h2>
            <p className="text-xs sm:text-[13px] md:text-sm text-gray-200 italic mb-5 sm:mb-6">
              “Bảo dưỡng đúng chuẩn – Chăm sóc toàn diện – An tâm vận hành”
            </p>
            <div>
              <a
                href="tel:0902422522"
                className="inline-flex items-center gap-2 bg-[#f80000] hover:bg-[#d50000] text-white px-5 py-2.5 rounded-sm font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-colors"
              >
                HOTLINE DỊCH VỤ: 090 242 25 22
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TẦM QUAN TRỌNG CỦA BẢO DƯỠNG XE ĐỊNH KỲ (MATCHING PHƯƠNG ĐÔNG ẢNH 3) */}
      <section
        className="py-14 sm:py-20 bg-white relative"
        style={{
          backgroundImage:
            "url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/24572776_sl_031520_28970_10-1-scaled.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundSize: "contain",
        }}
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left list with title and underline */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-sm sm:text-base font-bold uppercase text-[#f80000] tracking-wider block">
                  TẦM QUAN TRỌNG
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mt-1">
                  BẢO DƯỠNG XE ĐỊNH KỲ
                </h2>
                {/* Horizontal black underline as in Phương Đông ẢNH 3 */}
                <div className="w-16 h-0.5 bg-black mt-2 mb-6" />
              </div>

              <div className="space-y-3.5">
                {[
                  { bold: "Đảm bảo an toàn", rest: "khi vận hành chiếc xe của bạn", icon: ShieldCheck },
                  { bold: "Tối ưu hóa hiệu suất", rest: "hoạt động và độ bền của động cơ", icon: Zap },
                  { bold: "Kéo dài tuổi thọ", rest: "của xe", icon: TrendingUp },
                  { bold: "Tiết kiệm chi phí", rest: "sửa chữa về lâu dài", icon: CircleDollarSign },
                  { bold: "Phát hiện sớm và ngăn ngừa", rest: "các hỏng hóc lớn", icon: Search },
                  { bold: "Tiết kiệm nhiên liệu", rest: "đáng kể cho chủ xe", icon: Fuel },
                  { bold: "Giữ giá trị của xe,", rest: "khi bán lại vẫn được giá cao", icon: Award },
                  { bold: "Góp phần", rest: "Bảo vệ môi trường", icon: Leaf, isGopPhan: true },
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-sm sm:text-[15px] text-gray-800">
                      <div className="w-5 h-5 rounded-md bg-[#f80000] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <ItemIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        {item.isGopPhan ? (
                          <span>
                            {item.bold} <strong>{item.rest}</strong>
                          </span>
                        ) : (
                          <span>
                            <strong>{item.bold}</strong> {item.rest}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Images (Clean straight rectangular matching Phương Đông ẢNH 3) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/bAODUONG2.jpg"
                  alt="Bảo dưỡng định kỳ VinFast"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/BAODUONG1.jpg"
                  alt="Kỹ thuật viên xưởng VinFast"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3. STATS COUNTERS (WITH ICONS + CLEAR BORDERED GRID AS USER REQUESTED) */}
          <div className="mt-16 border-2 border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 flex flex-col items-center text-center bg-white hover:bg-gray-50/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-red-50 text-[#f80000] border border-red-100 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-[#f80000] tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-gray-700 mt-1.5 uppercase">
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HẠNG MỤC BẢO DƯỠNG NHANH (MATCHING PHƯƠNG ĐÔNG ẢNH 5) */}
      <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          {/* Header with M2.png matrix watermark on top left */}
          <div className="relative mb-10 text-left">
            <div className="relative w-16 h-12 mb-1">
              <Image
                src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/M2.png"
                alt="VinFast pattern"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-sm sm:text-base font-bold uppercase text-[#f80000] tracking-wider block">
              HẠNG MỤC
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
              BẢO DƯỠNG NHANH
            </h2>
          </div>

          {/* 6 Cards with geometric texture bottom background */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {maintenanceCategories.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col bg-white"
              >
                {/* Top Image */}
                <div className="relative w-full aspect-[3/2]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom text with 2607293_4981.jpg polygon texture */}
                <div
                  className="p-6 flex-1 flex flex-col justify-center text-center relative"
                  style={{
                    backgroundImage:
                      "url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/2607293_4981.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 uppercase mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed min-h-[36px] flex items-center justify-center">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUY TRÌNH BẢO DƯỠNG NHANH (THANH SCROLL NGANG MỀM MẠI, KHÔNG GIẬT GIAO DIỆN) */}
      <section
        className="py-14 sm:py-20 border-t border-gray-200 relative bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/24572776_sl_031520_28970_10-1-scaled.jpg')",
        }}
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div className="text-left">
              <h2 className="text-2xl sm:text-3xl font-black text-[#f80000] uppercase tracking-tight">
                QUY TRÌNH BẢO DƯỠNG NHANH
              </h2>
              <p className="text-base sm:text-lg font-black text-gray-900 uppercase mt-1">
                TẠI VINFAST PHƯƠNG ĐÔNG
              </p>
              <div className="w-16 h-0.5 bg-black mt-2" />
            </div>

            {/* Navigation buttons for horizontal scrolling */}
            <div className="flex items-center gap-2 self-start sm:self-end">
              <button
                onClick={() => scrollTabs("left")}
                aria-label="Cuộn sang trái"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs hover:border-[#f80000] hover:text-[#f80000] flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTabs("right")}
                aria-label="Cuộn sang phải"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-xs hover:border-[#f80000] hover:text-[#f80000] flex items-center justify-center transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Smooth Horizontal Scroll Track (Không đóng khung cứng nhắc, chiều cao cố định không giật) */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {processTabs.map((tab, idx) => (
              <div
                key={idx}
                className="w-[290px] sm:w-[340px] shrink-0 snap-start bg-white rounded-2xl p-6 border border-gray-200/90 shadow-xs hover:shadow-md hover:border-[#f80000] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="px-3 py-1 rounded-full bg-red-50 text-[#f80000] text-xs font-black tracking-wider uppercase">
                      BƯỚC 0{idx + 1}
                    </span>
                    <span className="text-gray-300 font-mono font-bold text-xs">
                      0{idx + 1} / 06
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 uppercase mb-3 leading-snug">
                    {tab.name.replace(/^B\d+\.\s*/, "")}
                  </h3>
                  <div className="space-y-3 text-xs text-gray-600 leading-relaxed text-justify">
                    <p>
                      <strong className="font-bold text-gray-900 block mb-1">Mô tả:</strong>
                      {tab.desc}
                    </p>
                    <p>
                      <strong className="font-bold text-gray-900 block mb-1">Lợi ích:</strong>
                      {tab.benefit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VIDEO QUY TRÌNH BẢO DƯỠNG XE (MATCHING PHƯƠNG ĐÔNG ẢNH 1) */}
      <section className="relative w-full py-20 sm:py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/BAODUONG1.jpg"
          alt="Video quy trình bảo dưỡng xe VinFast tại VinFast Phương Đông"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-[1300px] mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-snug">
            VIDEO QUY TRÌNH BẢO DƯỠNG XE VINFAST
            <br />
            TẠI VINFAST PHƯƠNG ĐÔNG
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => openBooking(undefined, "dich-vu")}
              className="px-6 py-2.5 rounded-md bg-[#f80000] hover:bg-red-700 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span>Xem ngay</span>
              <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 7. CAM KẾT VẬN HÀNH & BẢO DƯỠNG (MATCHING PHƯƠNG ĐÔNG ẢNH 2) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left: Image (Vertical, stretching to match the exact height of the right content) */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="relative w-full flex-1 min-h-[460px] lg:min-h-full rounded-sm overflow-hidden shadow-xs border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/16.jpg"
                  alt="Bảo dưỡng nhanh tại VinFast Phương Đông"
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right: Header + 6 combo items (3 columns x 2 rows) */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              {/* Header */}
              <div className="mb-6 sm:mb-8 text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#f80000] uppercase tracking-tight">
                  BẢO DƯỠNG NHANH TẠI VINFAST PHƯƠNG ĐÔNG
                </h2>
                <p className="text-sm sm:text-base font-bold text-gray-900 uppercase mt-1">
                  ĐÚNG CHUẨN - TOÀN DIỆN - AN TÂM VẬN HÀNH
                </p>
                <p className="text-xs sm:text-[13px] text-gray-600 mt-3 leading-relaxed text-justify">
                  VinFast Phương Đông luôn thấu hiểu, mỗi chiếc xe đều là một người bạn tri kỷ, người đồng hành cùng Quý khách trên mọi nẻo đường. Do vậy, đối với chúng tôi, việc chăm sóc một chiếc xe có ý nghĩa giống như chăm sóc người thân quay trở về nhà sau mỗi hành trình dài. Tất cả dịch vụ đều được thực hiện trong quy trình khép kín, chăm sóc tỉ mỉ, cẩn thận để duy trì cho chiếc xe chất lượng tốt nhất khi vận hành!
                </p>
              </div>

              {/* 6 Combo boxes in 3 columns x 2 rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7">
                {commitments.map((c, idx) => {
                  const Icon = c.icon || Check;
                  return (
                    <div key={idx} className="flex flex-col">
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-5 h-5 rounded-md bg-[#f80000] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                          <Icon className="w-3 h-3 stroke-[2.5]" />
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug">
                          {c.title}
                        </h3>
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed text-justify space-y-1.5 pl-7">
                        {idx === 0 ? (
                          <p>
                            Đội ngũ kỹ thuật viên lành nghề, có nhiều năm kinh nghiệm và được đào tạo bài bản theo chương trình đào tạo:{" "}
                            <strong className="font-bold text-gray-900">VINFAST TEAM</strong> do VINFAST tổ chức, đáp ứng các tiêu chuẩn khắt khe trong việc sửa chữa, bảo dưỡng do hãng đặt ra.
                          </p>
                        ) : idx === 1 ? (
                          <>
                            <p>
                              Liên tục cập nhật và sử dụng trang thiết bị tiên tiến, công nghệ mới nhất, đảm bảo quá trình bảo dưỡng diễn ra nhanh chóng và chính xác, đảm bảo sự an toàn trong quá trình vận hành xe.
                            </p>
                            <p>
                              Phụ tùng thay thế cho xe đều được Vinfast sử dụng chính hiệu từ nhà máy trong khu vực.
                            </p>
                          </>
                        ) : idx === 2 ? (
                          <p>
                            Vinfast Phương Đông đã thiết lập quy trình làm việc bảo dưỡng nhanh{" "}
                            <strong className="font-bold text-gray-900">Express Maintenance 60 phút (EM)</strong> theo tiêu chuẩn Vinfast Việt Nam (giảm thiểu tối đa các động tác thừa của nhân viên kỹ thuật trong thao tác làm việc), đồng thời liên tục thực hiện kaizen tăng năng suất lao động, giảm thời gian chờ đợi của Quý khách hàng.
                          </p>
                        ) : (
                          <p>{c.desc}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
