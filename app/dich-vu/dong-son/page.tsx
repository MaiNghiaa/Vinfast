"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  ShieldCheck,
  Paintbrush,
  Clock,
  Users,
  Play,
  Wrench,
  Leaf,
  Zap,
  Award,
  Sparkles,
} from "lucide-react";
import { useModal } from "@/components/ClientLayout";

export default function DichVuDongSonPage() {
  const { openBooking } = useModal();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollProcess = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const stats = [
    { value: "10+", label: "Năm kinh nghiệm", icon: Clock },
    { value: "150+", label: "Chuyên viên kỹ thuật", icon: Users },
    { value: "15K", label: "Lượt Sơn/năm", icon: Paintbrush },
    { value: "10k", label: "Khách hàng thân thiết", icon: ShieldCheck },
  ];

  const paintServices = [
    {
      title: "SƠN LẠI TOÀN BỘ XE",
      desc: "",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/dich-vu-dong-son-toyota-thai-hoa-tu-liem-full.jpg",
    },
    {
      title: "SƠN SỬA CHỮA NHỮNG PHẦN HƯ HỎNG",
      desc: "",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/19-1.jpg",
    },
    {
      title: "SƠN ĐỔI MÀU XE",
      desc: "",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/son-doi-mau-xe-toyota-thai-hoa-tu-liem.jpg",
    },
    {
      title: "NÂNG CẤP ĐỘ BODYKIT XE VINFAST",
      desc: "",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/5-3.jpg",
    },
    {
      title: "SƠN MÂM XE – ĐỔI MÀU MÂM XE",
      desc: "",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/17-1.jpg",
    },
    {
      title: "ĐỒNG SƠN PHỤC HỒI XE TAI NẠN",
      desc: "Đảm bảo chất lượng theo thông số kỹ thuật của nhà sản xuất",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/8-1.jpg",
    },
    {
      title: "CHĂM SÓC NỘI THẤT XE",
      desc: "",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/cham-soc-noi-that-xe-toyota-thaihoatuliem.jpg",
    },
    {
      title: "ĐÁNH BÓNG VỎ XE",
      desc: "Xử lý các tác nhân làm ảnh hưởng tới độ bóng của xe",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/dich-vu-son-dac-biet-toyota-thai-hoa-tu-liem-3.jpg",
    },
  ];

  const processSteps = [
    {
      id: "B1",
      name: "B1. Đặt lịch sơn nhanh",
      desc: "Khách hàng có thể đặt lịch hẹn trước qua điện thoại, website hoặc liên hệ trực tiếp hotline cố vấn dịch vụ. Đội ngũ kỹ thuật viên chuẩn bị khoang sấy và vật tư màu tương ứng.",
      benefit: "Tiết kiệm thời gian tiếp nhận, ưu tiên xử lý xe ngay khi vào xưởng.",
    },
    {
      id: "B2",
      name: "B2. Kiểm tra và đánh giá",
      desc: "Cố vấn dịch vụ và chuyên viên sơn kiểm tra mức độ trầy xước, móp méo vỏ kim loại hoặc nhựa và đo mã màu sơn gốc bằng máy quang phổ.",
      benefit: "Chẩn đoán chính xác mức độ tổn hại, cam kết phục hồi đúng tiêu chuẩn ban đầu.",
    },
    {
      id: "B3",
      name: "B3. Tư vấn và xác nhận dịch vụ",
      desc: "Cung cấp bảng báo giá chi tiết, thời gian hoàn thiện và hỗ trợ thủ tục giám định bảo hiểm (nếu có làm bảo hiểm). Khách hàng ký duyệt xác nhận trước khi làm.",
      benefit: "Minh bạch chi phí, không phát sinh chi phí ngoài dự kiến.",
    },
    {
      id: "B4",
      name: "B4. Tiến hành Đồng sơn",
      desc: "Gò nắn phom xe, bả matit cao cấp, sơn lót chống rỉ, pha màu vi tính 100% chuẩn hãng và sấy khô trong buồng nhiệt khép kín.",
      benefit: "Nước sơn căng bóng, không hạt bụi, độ bám dính và bền màu hoàn hảo.",
    },
    {
      id: "B5",
      name: "B5. Kiểm tra chất lượng",
      desc: "Đánh bóng hoàn thiện bề mặt, kiểm tra độ dày lớp sơn và so sánh độ lệch màu dưới ánh sáng tự nhiên và đèn chuyên dụng.",
      benefit: "Xe đạt tiêu chuẩn xuất xưởng khắt khe của VinFast.",
    },
    {
      id: "B6",
      name: "B6. Thanh toán và giao xe",
      desc: "Rửa xe sạch sẽ, bàn giao xe cho khách hàng kèm phiếu bảo hành lớp sơn 12 tháng và hướng dẫn chăm sóc giữ màu xe.",
      benefit: "Khách hàng hài lòng, an tâm tuyệt đối về chất lượng và chế độ hậu mãi.",
    },
  ];

  const workshopFeatures = [
    {
      title: "Hệ thống phòng sơn sấy khép kín",
      desc: "Trang bị buồng sơn sấy đối lưu công nghệ cao nhập khẩu, duy trì nhiệt độ sấy ổn định 60-70 độ C.",
      icon: Paintbrush,
    },
    {
      title: "Dây chuyền sửa chữa nhanh Express BP",
      desc: "Áp dụng phương pháp làm việc tinh gọn TPS giúp rút ngắn thời gian sửa chữa lên đến 50%.",
      icon: Clock,
    },
    {
      title: "Công nghệ pha sơn vi tính chính xác",
      desc: "Phần mềm dữ liệu màu chính hãng VinFast, máy pha màu điện tử đảm bảo đồng nhất màu xe 100%.",
      icon: Zap,
    },
    {
      title: "Thợ sơn tay nghề bậc cao",
      desc: "Đội ngũ kỹ thuật viên lành nghề với chứng chỉ chuyên môn cao từ VinFast Việt Nam.",
      icon: Users,
    },
    {
      title: "Vật tư sơn chính hãng",
      desc: "Chỉ sử dụng sơn gốc nước cao cấp thân thiện môi trường, an toàn sức khỏe người sử dụng.",
      icon: Leaf,
    },
    {
      title: "Liên kết giám định bảo hiểm",
      desc: "Hợp tác toàn diện với các công ty bảo hiểm uy tín: Bảo Việt, PVI, PTI, MIC, Bảo Minh...",
      icon: ShieldCheck,
    },
  ];

  const reasonItems = [
    { text: "Hệ thống phòng Sơn đạt chuẩn theo yêu cầu VinFast Việt Nam.", icon: Wrench },
    { text: "Sử dụng vật liệu sơn thân thiện môi trường, chính hãng cao cấp, an toàn sức khỏe.", icon: Leaf },
    { text: "Xe được gò nắn, phục hồi phom theo tiêu chuẩn ban đầu trước khi sơn.", icon: ShieldCheck },
    { text: "Đảm bảo độ bám dính và độ bền màu tối ưu theo thời gian.", icon: Paintbrush },
    { text: "Thợ kỹ thuật đồng sơn có tay nghề xuất sắc trên 10 năm kinh nghiệm.", icon: Users },
    { text: "Hỗ trợ giám định và hoàn tất thủ tục bảo hiểm nhanh chóng, thuận tiện.", icon: Award },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. TOP BANNER */}
      <section className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/sua-1.1.jpg"
          alt="Dịch vụ đồng sơn công nghệ cao VinFast Phương Đông"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-[1300px] mx-auto text-white space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight drop-shadow-md leading-[1.35]">
            DỊCH VỤ ĐỒNG SƠN CÔNG NGHỆ CAO
            <span className="text-[#f80000] block mt-1">VINFAST PHƯƠNG ĐÔNG</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Với quy trình Đồng Sơn tỉ mỉ, chuyên nghiệp từ khâu xử lý bề mặt, pha màu, quy trình sơn sấy và hoàn thiện sau khi sơn, xế yêu của Quý khách sẽ được trả lại vẻ đẹp như thuở ban đầu.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openBooking(undefined, "dich-vu")}
              className="bg-[#f80000] hover:bg-[#d50000] text-white px-8 py-3.5 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase transition-transform hover:scale-105 shadow-xl"
            >
              ĐĂNG KÝ DỊCH VỤ
            </button>
          </div>
        </div>
      </section>

      {/* 2. CHỌN VINFAST PHƯƠNG ĐÔNG - CHỌN ĐỒNG SƠN CHẤT LƯỢNG */}
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
            {/* Left points */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-sm sm:text-base font-bold uppercase text-[#f80000] tracking-wider block">
                  CHỌN VINFAST PHƯƠNG ĐÔNG
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mt-1">
                  CHỌN DỊCH VỤ ĐỒNG SƠN CHẤT LƯỢNG
                </h2>
                {/* Horizontal black underline */}
                <div className="w-16 h-0.5 bg-black mt-2 mb-6" />
              </div>

              <div className="space-y-3.5">
                {reasonItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 text-sm sm:text-[15px] text-gray-800">
                      <div className="w-5 h-5 rounded-md bg-[#f80000] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <a
                  href="tel:0902422522"
                  className="inline-flex items-center gap-2 bg-[#f80000] hover:bg-[#d50000] text-white px-8 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  Tư vấn giám định: 090 242 25 22
                </a>
              </div>
            </div>

            {/* Right Images (Straight rectangular cards matching style) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/1-2.jpg"
                  alt="Dịch vụ đồng sơn VinFast Phương Đông"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/13-1.jpg"
                  alt="Phòng sơn sấy VinFast Phương Đông"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS COUNTERS (UNIFIED BORDERED CONTAINER) */}
      <section className="py-10 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="p-6 sm:p-8 flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-[#f80000] flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-[#f80000] tracking-tight">
                      {s.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-gray-700 mt-1 uppercase tracking-wide">
                      {s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 8 HẠNG MỤC DỊCH VỤ ĐỒNG SƠN TẠI ĐẠI LÝ (MATCHING GỐC PHƯƠNG ĐÔNG) */}
      <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          {/* Header matching original: M2.png watermark on top left, HẠNG MỤC (red), DỊCH VỤ ĐỒNG SƠN TẠI ĐẠI LÝ (black) */}
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
              DỊCH VỤ ĐỒNG SƠN TẠI ĐẠI LÝ
            </h2>
          </div>

          {/* 8 Cards with geometric texture 2607293_4981.jpg filling the bottom container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paintServices.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col bg-white"
              >
                {/* Top Image: Clean rectangular 3:2, no badge */}
                <div className="relative w-full aspect-[3/2] bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom text with 2607293_4981.jpg polygon texture covering the entire area */}
                <div
                  className="p-4 flex-1 min-h-[96px] sm:min-h-[110px] flex flex-col justify-center items-center text-center relative"
                  style={{
                    backgroundImage:
                      "url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/2607293_4981.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h3 className="text-xs sm:text-[14px] font-bold text-gray-900 uppercase leading-snug">
                    {item.title}
                  </h3>
                  {item.desc && (
                    <p className="text-[11px] sm:text-xs text-gray-700 mt-1.5 leading-relaxed max-w-[95%]">
                      {item.desc}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUY TRÌNH ĐỒNG SƠN CHẤT LƯỢNG (SMOOTH HORIZONTAL SCROLL TRACK) */}
      <section
        className="py-14 sm:py-20 bg-[#f8f9fa] border-t border-gray-200 relative"
        style={{
          backgroundImage:
            "url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/24572776_sl_031520_28970_10-1-scaled.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          backgroundSize: "contain",
        }}
      >
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-sm font-bold uppercase text-[#f80000] tracking-wider block mb-1">
                QUY TRÌNH CHUẨN HÃNG
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
                QUY TRÌNH ĐỒNG SƠN CHẤT LƯỢNG
              </h2>
              <p className="text-sm sm:text-base font-bold text-[#f80000] uppercase mt-1">
                TẠI VINFAST PHƯƠNG ĐÔNG
              </p>
            </div>
            {/* Scroll buttons */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => scrollProcess("left")}
                className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#f80000] hover:text-white hover:border-[#f80000] flex items-center justify-center transition-all shadow-xs"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollProcess("right")}
                className="w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-[#f80000] hover:text-white hover:border-[#f80000] flex items-center justify-center transition-all shadow-xs"
                aria-label="Next step"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal scroll track with equal-height cards */}
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
          >
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all shrink-0 snap-start flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-lg bg-[#f80000] text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {step.id}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Bước 0{idx + 1} / 0{processSteps.length}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-gray-900 uppercase mb-2.5 leading-snug">
                    {step.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-5 p-3.5 bg-red-50/60 border-l-4 border-[#f80000] rounded-r-xl">
                  <span className="text-xs font-bold text-[#f80000] uppercase block mb-1">
                    Lợi ích:
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {step.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VIDEO DỊCH VỤ ĐỒNG SƠN PHỤC HỒI XE */}
      <section className="relative w-full py-20 sm:py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/sua-1.1.jpg"
          alt="Video dịch vụ đồng sơn VinFast Phương Đông"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-[1300px] mx-auto px-4 text-center text-white space-y-6">
          <span className="text-xs sm:text-sm font-bold uppercase text-[#f80000] tracking-wider block">
            TRẢI NGHIỆM THỰC TẾ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            VIDEO DỊCH VỤ ĐỒNG SƠN - PHỤC HỒI XE TAI NẠN
            <br />
            <span className="text-[#f80000]">TẠI VINFAST PHƯƠNG ĐÔNG</span>
          </h2>
          <div className="flex justify-center pt-2">
            <div className="relative">
              <div className="absolute -inset-2 bg-red-600/30 rounded-full animate-ping" />
              <button
                onClick={() => openBooking(undefined, "dich-vu")}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#f80000] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl group"
                aria-label="Xem ngay video"
              >
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. GIỚI THIỆU XƯỞNG BP - SỬA CHỮA THÂN XE */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Image: Full height matching right column */}
            <div className="lg:col-span-5 flex">
              <div className="relative w-full h-full min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/sua-13.1.jpg"
                  alt="Xưởng BP VinFast Phương Đông"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-sm sm:text-base font-bold uppercase text-[#f80000] tracking-wider block">
                  GIỚI THIỆU XƯỞNG BP
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mt-1">
                  SỬA CHỮA THÂN XE & SƠN CHÍNH HÃNG
                </h2>
                <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase mt-1">
                  VINFAST PHƯƠNG ĐÔNG
                </p>
                <div className="w-16 h-0.5 bg-black mt-2 mb-4" />
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  VinFast thiết lập dây chuyền sửa chữa nhanh thân xe và sơn (Express Body & Paint - EBP) dựa theo nguyên lý TPS, có sự tập trung chuyên môn hóa cao. Mọi công đoạn kiểm tra chất lượng sản phẩm được thực hiện nghiêm ngặt, loại bỏ triệt để sai sót và trả lại vẻ đẹp nguyên bản cho chiếc xe của bạn.
                </p>
              </div>

              {/* 6 Features in 3 cols x 2 rows with red button badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {workshopFeatures.map((f, idx) => {
                  const FeatureIcon = f.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 shadow-2xs flex flex-col justify-between hover:border-red-200 transition-colors"
                    >
                      <div>
                        <div className="flex items-start gap-2.5 mb-1.5">
                          <div className="w-5 h-5 rounded-md bg-[#f80000] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                            <FeatureIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                          </div>
                          <h3 className="text-xs sm:text-[13px] font-bold text-gray-900 leading-snug">
                            {f.title}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-600 leading-relaxed pl-7.5">
                          {f.desc}
                        </p>
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
