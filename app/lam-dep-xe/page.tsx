"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  ShieldCheck,
  Wrench,
  Clock,
  Users,
  Gift,
  CircleDollarSign,
  Sparkles,
  Award,
  Zap,
  Check,
} from "lucide-react";
import { useModal } from "@/components/ClientLayout";

export default function LamDepXePage() {
  const { openBooking } = useModal();
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

  const packages = [
    {
      title: "GÓI VỆ SINH NGOẠI THẤT",
      desc: "Rửa xe không chạm, tẩy ố gỉ sét mạ crom, vệ sinh khoang động cơ và phục hồi dưỡng chi tiết cao su.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/18-1.jpg",
      items: [
        "Rửa xe không chạm – Rửa xe chuyên sâu",
        "Tẩy gỉ sắt, ố canxi – Tẩy ố chi tiết mạ crom",
        "Tẩy bụi công nghiệp – Tẩy ố kính",
        "Vệ sinh khoang động cơ",
        "Phục hồi màu & dưỡng chi tiết cao su",
      ],
    },
    {
      title: "GÓI VỆ SINH NỘI THẤT",
      desc: "Vệ sinh tổng thể nội thất, ghế, cửa, trần xe, dàn lạnh điều hòa, khử mùi ozone và dưỡng da nappa cao cấp.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/15-1.jpg",
      items: [
        "Vệ sinh tổng thể và chi tiết nội thất",
        "Vệ sinh ghế, cửa, taplo, trần xe, giàn lạnh",
        "Vệ sinh và dưỡng nội thất da, nỉ",
        "Phục hồi màu & dưỡng chi tiết nhựa",
        "Khử mùi và khử khuẩn nội thất",
      ],
    },
    {
      title: "GÓI LÀM ĐẸP XE",
      desc: "Đánh bóng hiệu chỉnh bề mặt sơn, phủ Ceramic bóng gương, phủ Graphene và sơn phủ gầm chống rỉ cách âm.",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/21-1.jpg",
      items: [
        "Đánh bóng và wax bóng bề mặt sơn",
        "Hiệu chỉnh bề mặt sơn 3 bước",
        "Phủ Ceramic bảo vệ sơn bóng gương",
        "Phủ Graphene công nghệ mới",
        "Sơn phủ gầm chống rỉ và cách âm",
      ],
    },
  ];

  const processTabs = [
    {
      id: "B1",
      name: "B1. Đặt lịch dịch vụ",
      desc: "Khách hàng đặt lịch hẹn trước qua điện thoại, website hoặc ứng dụng của Vinfast Phương Đông. Điều này giúp đảm bảo rằng khi Quý khách hàng đến, các kỹ thuật viên và dụng cụ được chọn lọc phù hợp, sẵn sàng quy trình làm đẹp xe.",
      benefit: "Tiết kiệm thời gian, đảm bảo quy trình làm đẹp diễn ra thuận lợi và nhanh chóng.",
    },
    {
      id: "B2",
      name: "B2. Kiểm tra và đánh giá",
      desc: "Khi khách hàng đến, cố vấn dịch vụ và kỹ thuật viên spa sẽ tiến hành kiểm tra tổng quát bề mặt sơn, kính xe, khoang nội thất để xác định tình trạng hiện tại và các hạng mục cần thực hiện.",
      benefit: "Phát hiện sớm các vấn đề tiềm ẩn, đảm bảo tất cả các hạng mục cần thiết đều được xử lý chuẩn chỉ.",
    },
    {
      id: "B3",
      name: "B3. Tư vấn và xác nhận dịch vụ",
      desc: "Sau khi kiểm tra và xác định tình trạng của xe, cố vấn dịch vụ sẽ tư vấn cho khách hàng về tình trạng xe và các gói làm đẹp tối ưu nhất. Khách hàng sẽ xác nhận dịch vụ cần thực hiện.",
      benefit: "Khách hàng nắm rõ tình trạng xe và dịch vụ sẽ được thực hiện, không có chi phí phát sinh không rõ ràng.",
    },
    {
      id: "B4",
      name: "B4. Tiến hành dịch vụ",
      desc: "Các kỹ thuật viên lành nghề sẽ tiến hành các công việc vệ sinh, hiệu chỉnh bề mặt, phủ bóng và chăm sóc nội thất theo kế hoạch đã xác nhận tuân thủ nghiêm ngặt tiêu chuẩn của hãng.",
      benefit: "Đảm bảo xe được làm đẹp toàn diện và đúng quy trình kỹ thuật, tăng vẻ đẹp sang trọng và tuổi thọ xe.",
    },
    {
      id: "B5",
      name: "B5. Kiểm tra sau dịch vụ",
      desc: "Sau khi hoàn thành dịch vụ, cố vấn sẽ dẫn Quý khách hàng ra xe, kiểm tra lại toàn bộ xe dưới hệ thống ánh sáng chuyên dụng để đảm bảo tất cả các hạng mục đã được thực hiện đúng chuẩn.",
      benefit: "Đảm bảo chất lượng dịch vụ xuất sắc, xe sạch bóng như mới trước khi giao lại cho khách hàng.",
    },
    {
      id: "B6",
      name: "B6. Thanh toán và giao xe",
      desc: "Cố vấn dịch vụ hướng dẫn Quý khách hàng hoàn thiện các thủ tục thanh toán, trao phiếu bảo hành lớp phủ ceramic/nano và chia sẻ kinh nghiệm giữ gìn xe luôn mới.",
      benefit: "Khách hàng nhận lại xe với sự hài lòng trọn vẹn, an tâm tuyệt đối về chất lượng dịch vụ.",
    },
  ];

  const commitments = [
    {
      title: "Đội ngũ kỹ thuật viên chuyên nghiệp",
      icon: Users,
      desc: "Đội ngũ kỹ thuật viên lành nghề, có nhiều năm kinh nghiệm và được đào tạo bài bản theo chương trình đào tạo: VINFAST TEAM do VINFAST tổ chức, đáp ứng các tiêu chuẩn khắt khe trong việc sửa chữa, bảo dưỡng và spa ô tô do hãng đặt ra.",
    },
    {
      title: "Trang thiết bị hiện đại, hóa chất chính hiệu",
      icon: Wrench,
      desc: "Liên tục cập nhật và sử dụng trang thiết bị tiên tiến, công nghệ mới nhất như máy đánh bóng lệch tâm Dual-Action, máy khử khuẩn Ozone. Hóa chất chăm sóc xe đều được Vinfast sử dụng chính hiệu, an toàn tuyệt đối cho sức khỏe và nước sơn.",
    },
    {
      title: "Thời gian phục vụ nhanh chóng",
      icon: Clock,
      desc: "Vinfast Phương Đông đã thiết lập quy trình làm việc chuẩn mực (giảm thiểu tối đa các động tác thừa của nhân viên kỹ thuật trong thao tác làm việc), đồng thời liên tục thực hiện kaizen tăng năng suất lao động, giảm thời gian chờ đợi của Quý khách hàng.",
    },
    {
      title: "Chất lượng đảm bảo",
      icon: ShieldCheck,
      desc: "Chúng tôi cam kết chất lượng dịch vụ cao nhất, đảm bảo xe của Quý khách hàng luôn sáng bóng, bền màu và vận hành an toàn sau mỗi lần chăm sóc.",
    },
    {
      title: "Khuyến mại hấp dẫn",
      icon: Gift,
      desc: "Thường xuyên mang đến các chương trình bảo hành, hậu mãi và nhiều ưu đãi, quà tặng hấp dẫn cho khách hàng khi đến sử dụng Dịch vụ tại Đại lý.",
    },
    {
      title: "Chi phí hợp lý",
      icon: CircleDollarSign,
      desc: "Dịch vụ làm đẹp xe chuyên nghiệp với mức giá cạnh tranh, giúp Quý khách tiết kiệm chi phí mà vẫn nhận được dịch vụ đẳng cấp cao nhất.",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. TOP BANNER (ĐỒNG BỘ HOÀN TOÀN VỚI TRANG BẢO DƯỠNG) */}
      <section className="relative w-full h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] flex items-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/Sua-1.2.jpg"
          alt="Dịch vụ làm đẹp xe VinFast Touch Phương Đông"
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
              DỊCH VỤ LÀM ĐẸP XE
              <br />
              VINFAST PHƯƠNG ĐÔNG
            </h1>
            <h2 className="text-xs sm:text-[13px] md:text-sm font-bold uppercase tracking-wider text-white mb-2 sm:mb-2.5">
              VINFAST TOUCH – CHĂM SÓC XE TOÀN DIỆN
            </h2>
            <p className="text-xs sm:text-[13px] md:text-sm text-gray-200 italic mb-5 sm:mb-6">
              “Chăm sóc đúng chuẩn – Làm đẹp toàn diện – An tâm vận hành”
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

      {/* 2. CHĂM SÓC XE TOÀN DIỆN & STATS COUNTERS (ĐỒNG BỘ CẤU TRÚC VỚI BẢO DƯỠNG) */}
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
                  VINFAST TOUCH
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight mt-1">
                  CHĂM SÓC XE TOÀN DIỆN
                </h2>
                {/* Horizontal black underline as in Bảo Dưỡng */}
                <div className="w-16 h-0.5 bg-black mt-2 mb-6" />
              </div>

              <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed text-justify mb-4">
                Với <strong className="font-bold text-gray-900">Vinfast Touch</strong>, chiếc xe của
                bạn không chỉ đơn thuần là phương tiện di chuyển, mà còn là một tác phẩm nghệ thuật
                cần được chăm sóc và bảo vệ. Chúng tôi mang đến dịch vụ chăm sóc xe toàn diện, giúp
                xe luôn mới mẻ và bền đẹp theo thời gian, từ ngoại thất đến nội thất:
              </p>

              <div className="space-y-3.5">
                {[
                  {
                    bold: "Làm sạch Ngoại thất:",
                    rest: "Rửa sạch và đánh bóng bề mặt xe, chăm sóc từng chi tiết nhỏ nhất để xe luôn sáng bóng như mới.",
                    icon: Sparkles,
                  },
                  {
                    bold: "Chăm sóc Nội thất:",
                    rest: "Làm sạch kỹ lưỡng từ ghế ngồi, thảm sàn đến bảng điều khiển, mang lại không gian thoáng đãng, sạch sẽ.",
                    icon: ShieldCheck,
                  },
                  {
                    bold: "Dịch vụ Làm đẹp xe:",
                    rest: "Ứng dụng các kỹ thuật và sản phẩm chuyên dụng để bảo vệ sơn xe, đánh bóng và duy trì vẻ đẹp nguyên bản.",
                    icon: Award,
                  },
                  {
                    bold: "Bảo vệ toàn diện:",
                    rest: "Ngăn ngừa tác động của tia UV, mưa axit, hóa chất và bụi bẩn công nghiệp ăn mòn.",
                    icon: Zap,
                  },
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-[15px] text-gray-800">
                      <div className="w-5 h-5 rounded-md bg-[#f80000] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                        <ItemIcon className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div>
                        <strong>{item.bold}</strong> {item.rest}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Images (Clean straight rectangular matching Bảo Dưỡng) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/14-2.jpg"
                  alt="Dịch vụ làm sạch ngoại thất VinFast Touch"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-sm border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/12-1.jpg"
                  alt="Chăm sóc nội thất xe VinFast"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3. STATS COUNTERS (ĐỒNG BỘ VỚI BẢO DƯỠNG) */}
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

      {/* 3. CÁC GÓI DỊCH VỤ VINFAST TOUCH (ĐỒNG BỘ LAYOUT VỚI HẠNG MỤC BẢO DƯỠNG NHANH) */}
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
              CÁC GÓI
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
              DỊCH VỤ VINFAST TOUCH
            </h2>
          </div>

          {/* Cards with geometric texture bottom background */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="border border-gray-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col bg-white"
              >
                {/* Top Image */}
                <div className="relative w-full aspect-[3/2]">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Bottom text with 2607293_4981.jpg polygon texture */}
                <div
                  className="p-6 flex-1 flex flex-col justify-between text-center relative"
                  style={{
                    backgroundImage:
                      "url('https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/2607293_4981.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div>
                    <h3 className="text-sm sm:text-[15px] font-bold text-gray-900 uppercase mb-3 leading-snug">
                      {pkg.title}
                    </h3>
                    <ul className="space-y-2 text-xs text-gray-600 text-left mb-6 pl-2">
                      {pkg.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#f80000] font-bold shrink-0">•</span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <button
                      onClick={() => openBooking(undefined, "dich-vu")}
                      className="w-full py-2.5 rounded-sm bg-[#f80000] hover:bg-[#d50000] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                    >
                      Đăng ký ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. QUY TRÌNH VINFAST TOUCH (THANH SCROLL NGANG MỀM MẠI NHƯ BẢO DƯỠNG) */}
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
                QUY TRÌNH VINFAST TOUCH
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

          {/* Smooth Horizontal Scroll Track */}
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

      {/* 5. VIDEO DỊCH VỤ LÀM ĐẸP XE (ĐỒNG BỘ VỚI VIDEO BẢO DƯỠNG) */}
      <section className="relative w-full py-20 sm:py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/2-3.jpg"
          alt="Video dịch vụ làm đẹp xe tại VinFast Phương Đông"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-[1300px] mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-snug">
            VIDEO DỊCH VỤ LÀM ĐẸP XE VINFAST
            <br />
            TẠI VINFAST PHƯƠNG ĐÔNG
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => openBooking(undefined, "dich-vu")}
              className="px-6 py-2.5 rounded-md bg-[#f80000] hover:bg-red-700 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <span>Xem ngay</span>
              <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 6. TẠI SAO CHỌN DỊCH VỤ VINFAST TOUCH (ĐỒNG BỘ VỚI CAM KẾT BẢO DƯỠNG) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left: Image (Vertical, stretching to match the exact height of the right content) */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="relative w-full flex-1 min-h-[460px] lg:min-h-full rounded-sm overflow-hidden shadow-xs border border-gray-200">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/4-4.jpg"
                  alt="Dịch vụ VinFast Touch tại VinFast Phương Đông"
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
                  TẠI SAO CHỌN DỊCH VỤ VINFAST TOUCH
                </h2>
                <p className="text-sm sm:text-base font-bold text-gray-900 uppercase mt-1">
                  tại VINFAST PHƯƠNG ĐÔNG
                </p>
                <p className="text-xs sm:text-[13px] text-gray-600 mt-3 leading-relaxed text-justify">
                  Khi nói đến việc chăm sóc và duy trì vẻ đẹp cho chiếc xe yêu quý của bạn, việc lựa
                  chọn dịch vụ chất lượng là yếu tố quan trọng hàng đầu. Tại VinFast Phương Đông, dịch
                  vụ VinFast Touch không chỉ mang đến sự hài lòng về mặt thẩm mỹ mà còn đảm bảo sự bền
                  bỉ, duy trì giá trị lâu dài cho xe. Dưới đây là 6 lý do bạn nên lựa chọn dịch vụ này
                  tại VinFast Phương Đông:
                </p>
              </div>

              {/* 6 Combo boxes in 3 columns x 2 rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7">
                {commitments.map((c, idx) => {
                  const Icon = c.icon;
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
                        <p>{c.desc}</p>
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
