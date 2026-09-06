"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Phone, Play, Check } from "lucide-react";
import NewsSection from "@/components/NewsSection";
import { useModal } from "@/components/ClientLayout";

export default function DichVuPage() {
  const { openBooking } = useModal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const quickLinks = [
    {
      title: "BẢO DƯỠNG",
      icon: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/icon1_2.png",
      href: "/dich-vu/bao-duong",
    },
    {
      title: "SỬA CHỮA NHANH",
      icon: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/icon4_2.png",
      onClick: () => openBooking(undefined, "dich-vu"),
    },
    {
      title: "ĐỒNG SƠN",
      icon: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/icon5_2.png",
      href: "/dich-vu/dong-son",
    },
    {
      title: "CỨU HỘ VINFAST",
      icon: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/icon3_2.png",
      href: "tel:0902422522",
    },
  ];

  const repairItems = [
    {
      title: "SỬA CHỮA CHUNG",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/123456.jpg",
      description:
        "Kiểm tra chẩn đoán các vấn đề gặp phải trên xe của Khách hàng. Đưa ra phương án xử lý để chiếc xe luôn vận hành ở trạng thái an toàn nhất. Tất cả các phụ tùng bảo dưỡng, sửa chữa thay thế đều được cung cấp chính hãng, luôn sẵn sàng đáp ứng nhu cầu của Khách hàng nhanh nhất và chất lượng tốt nhất.",
    },
    {
      title: "ĐỒNG SƠN",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/12345.jpg",
      description:
        "Sử dụng các trang thiết bị hiện đại, giúp rút ngắn thời gian sửa chữa. Hạn chế tối đa việc biến dạng bề mặt vỏ xe cũng như thay đổi kết cấu vật liệu vỏ xe sau khi sửa chữa. Sử dụng máy hàn dây Mig CO2 với đường kính 0.8 mm không làm phát sinh nhiệt và biến dạng vỏ xe trong quá trình sửa chữa.",
    },
    {
      title: "CĂN CHỈNH GÓC ĐẶT BÁNH XE VÀ CÂN BẰNG LỐP",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/1234.jpg",
      description:
        "Sau thời gian sử dụng, vận hành. Do nhiều nguyên nhân khác nhau như: Điều kiện mặt đường, xe chở quá tải, va quệt… Các sai lệch trong góc đặt bánh xe sẽ xuất hiện, lốp xe bào mòn không đều. Từ đó dẫn tới các hiện tượng như: rung lắc vô lăng ở tốc độ cao, lệch lái, nhao lái. VinFast Thịnh Cường sử dụng các trang thiết bị hiện đại, trả lại các thông số góc đặt như xe mới sản xuất, giúp xe vận hành ổn định, êm ái và tránh những hao mòn lốp, các chi tiết cơ khí… và đặc biệt là an toàn khi vận hành.",
    },
    {
      title: "SỬA CHỮA LƯU ĐỘNG",
      image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/123.jpg",
      description:
        "Mobile Service là dịch vụ gia tăng được triển khai song song với hệ thống mạng lưới các Xưởng dịch vụ và chính sách cứu hộ hiện có của VinFast để đáp ứng tối đa nhu cầu dịch vụ và mang lại sự thuận tiện cao nhất cho khách hàng. Dịch vụ 24/7 sẵn sàng hỗ trợ bất kể nơi đâu ngay sau khi nhận được cuộc gọi của khách hàng. Cứu hộ miễn phí cho các lỗi/ hư hỏng… Gây dừng vận hành khi xe còn đang trong điều kiện bảo hành. (Áp dụng với khách hàng sử dụng xe VinFast hoặc Chervolet).",
    },
  ];

  const processSteps = [
    {
      id: 1,
      title: "Nhắc bảo dưỡng & Đặt lịch hẹn",
      color: "#f33490",
      content:
        "Khách hàng mua xe mới và làm dịch vụ tại xưởng sẽ được nhắc bảo dưỡng trước 10 ngày so với ngày dự kiến đến kỳ bảo dưỡng. Các cuộc hẹn trước ít nhất 4 tiếng được tiếp nhận và xác nhận hẹn.",
    },
    {
      id: 2,
      title: "Tiếp nhận & Tư vấn dịch vụ",
      color: "#f48415",
      content:
        "Khách hàng được nhận biết và hướng dẫn đỗ xe ngay khi tới Xưởng dịch vụ. Khách hàng được chào đón, ghi nhận yêu cầu hoặc hướng dẫn chờ tiếp nhận ngay khi ra khỏi xe. Báo giá sửa chữa đầy đủ thông tin và có chữ ký xác nhận của Khách hàng.",
    },
    {
      id: 3,
      title: "Sửa chữa Nhanh chóng",
      color: "#f7ca00",
      content:
        "Khách hàng được phục vụ, hỗ trợ theo yêu cầu (nếu có) và luôn được cập nhật tiến độ sửa chữa trong thời gian chờ sửa chữa. Khách hàng được thông báo và xin ý kiến về những nội dung công việc phát sinh trong quá trình sửa chữa. Các hạng mục bảo dưỡng/ Sửa chữa được kiểm tra.",
    },
    {
      id: 4,
      title: "Bàn giao xe đúng hạn",
      color: "#00b7dd",
      content:
        "Xe được rửa sạch sẽ trước khi giao (nếu Khách hàng có nhu cầu rửa xe). Xe được giao đúng hẹn như cam kết với Khách hàng. Quyết toán đầy đủ thông tin và có chữ ký xác nhận của Khách hàng. Khách hàng được chỉ dẫn khu vực nhận xe, cảm ơn và chào tạm biệt.",
    },
    {
      id: 5,
      title: "Chăm sóc sau sửa chữa",
      color: "#b35ad9",
      content:
        "Mọi Khách hàng làm dịch vụ sẽ được gọi điện để ghi nhận phản hồi/ ý kiến trong vòng 2 ngày sau khi xe ra xưởng. Phản ánh, khiếu nại được phản hồi về giải pháp muộn nhất trong ngày T+1 (T là ngày tiếp nhập phản ánh, khiếu nại).",
    },
  ];

  const faqs = [
    {
      q: "Thời gian bảo dưỡng định kỳ cho xe ô tô điện VinFast là bao lâu một lần?",
      a: "Theo khuyến cáo của VinFast, xe ô tô điện nên được bảo dưỡng định kỳ 6 tháng/lần hoặc sau mỗi 10.000 km, tùy theo điều kiện nào đến trước, để đảm bảo hiệu suất và độ bền.",
    },
    {
      q: "Xưởng có cung cấp phụ tùng chính hãng cho xe ô tô điện VinFast không?",
      a: "Chúng tôi cam kết sử dụng 100% phụ tùng chính hãng từ VinFast, đảm bảo chất lượng và tương thích hoàn toàn với xe của bạn.",
    },
    {
      q: "Nếu xe VinFast của tôi hết bảo hành, xưởng có hỗ trợ sửa chữa không?",
      a: "Có, chúng tôi nhận sửa chữa xe VinFast cả trong và ngoài thời gian bảo hành, với chi phí minh bạch và dịch vụ chuyên nghiệp.",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. TOP BANNER (EXACT 1:1 CLONE OF THỊNH CƯỜNG LIVE SITE) */}
      <section className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/BAODUONG.jpg"
          alt="Xưởng dịch vụ VinFast Thịnh Cường"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 text-center px-4 max-w-[1300px] mx-auto">
          <h3 className="text-sm sm:text-lg md:text-[24px] font-semibold uppercase tracking-normal text-[#f80000] mb-3 sm:mb-4 md:mb-5 drop-shadow-sm font-sans">
            XƯỞNG DỊCH VỤ VINFAST THỊNH CƯỜNG
          </h3>
          <h1 className="text-2xl sm:text-3xl md:text-[36px] font-black text-white uppercase leading-tight font-mulish drop-shadow-md tracking-normal">
            SỬA CHỮA NHANH
          </h1>
        </div>
      </section>

      {/* 2. 4 QUICK ACTION ICONS */}
      <section className="py-10 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center text-center">
            {quickLinks.map((item, idx) => {
              const content = (
                <div className="flex flex-col items-center group cursor-pointer w-full max-w-[200px]">
                  <div className="relative w-[110px] h-[110px] mb-3 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      fill
                      sizes="120px"
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#f80000] transition-colors uppercase">
                    {item.title}
                  </h2>
                </div>
              );

              if (item.href) {
                return (
                  <Link key={idx} href={item.href} className="w-full flex justify-center">
                    {content}
                  </Link>
                );
              }

              return (
                <div key={idx} onClick={item.onClick} className="w-full flex justify-center">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. GIỚI THIỆU XƯỞNG DỊCH VỤ */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/Untitled-12.jpg"
                  alt="Giới thiệu về xưởng dịch vụ VinFast Thịnh Cường"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#f80000]">
                  Giới thiệu về xưởng dịch vụ
                </h3>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  VINFAST THỊNH CƯỜNG
                </h2>
              </div>
              <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed text-justify">
                VinFast Thịnh Cường luôn nỗ lực mang đến những trải nghiệm sau bán hàng vượt mong đợi. Chúng tôi coi dịch vụ hậu mãi không chỉ là một phần trong hành trình sở hữu xe, mà là <strong className="font-bold text-gray-900">cam kết đồng hành lâu dài</strong>, là giá trị cốt lõi giúp VinFast chinh phục niềm tin của khách hàng.
              </p>
              <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed text-justify">
                Tại xưởng dịch vụ VinFast Thịnh Cường, mỗi chiếc xe đều được chăm sóc bởi đội ngũ kỹ thuật viên tay nghề cao, được đào tạo bài bản theo tiêu chuẩn khắt khe của VinFast toàn cầu. Hệ thống trang thiết bị hiện đại, công nghệ chẩn đoán tiên tiến cùng nguồn phụ tùng chính hãng 100% đảm bảo xe của bạn luôn vận hành trong tình trạng hoàn hảo và an toàn nhất.
              </p>
              <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed text-justify">
                Không chỉ dừng lại ở chất lượng kỹ thuật, chúng tôi còn chú trọng đến trải nghiệm của khách hàng với quy trình tiếp nhận nhanh chóng, khu vực phòng chờ tiện nghi, sang trọng cùng thái độ phục vụ tận tâm, minh bạch và chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÁC HẠNG MỤC SỬA CHỮA NHANH */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
              CÁC HẠNG MỤC SỬA CHỮA NHANH
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {repairItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image container with floating "Đăng kí dịch vụ" button */}
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button
                      onClick={() => openBooking(undefined, "dich-vu")}
                      className="bg-black/60 hover:bg-[#f80000] text-white border-2 border-[#ff0000] px-6 py-2.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-xs"
                    >
                      Đăng kí dịch vụ
                    </button>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed text-justify flex-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. QUY TRÌNH XƯỞNG DỊCH VỤ */}
      <section className="py-14 sm:py-20 bg-[#EEEEEE]">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase tracking-tight">
              QUY TRÌNH XƯỞNG DỊCH VỤ
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {processSteps.map((step) => (
              <div
                key={step.id}
                style={{ borderColor: step.color }}
                className="bg-white rounded-[20px] border-[3px] p-5 flex flex-col shadow-xs hover:shadow-md transition-all"
              >
                <div className="mb-3">
                  <span
                    style={{ color: step.color }}
                    className="text-xs font-black uppercase tracking-wider block mb-1"
                  >
                    Bước 0{step.id}
                  </span>
                  <h3
                    style={{ color: step.color }}
                    className="text-[15px] font-bold uppercase leading-snug min-h-[42px]"
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed text-justify">
                  {step.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TẠI SAO NÊN LỰA CHỌN XƯỞNG DỊCH VỤ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            {/* Red Box Content */}
            <div className="bg-[#ff0000] text-white p-8 sm:p-12 flex flex-col justify-center">
              <h3 className="text-base sm:text-lg font-bold text-white/90 mb-1">
                Tại sao nên lựa chọn
              </h3>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight uppercase">
                Xưởng dịch vụ
                <br />
                VINFAST THỊNH CƯỜNG
              </h2>
              <p className="text-sm sm:text-base text-white/95 leading-relaxed mb-6">
                Với kĩ thuật sửa chữa theo tiêu chuẩn toàn cầu, trang bị thiết bị vật tư chất lượng cao (được chỉ định bởi Vinfast Việt Nam), các đại lý của Vinfast sẽ phục hồi hình dạng cũng như diện mạo lớp sơn trên chiếc xe của bạn về như ban đầu.
              </p>
              <ul className="space-y-3 text-sm sm:text-base font-semibold">
                {[
                  "Đại lý chính hãng",
                  "Kĩ thuật viên trên 10 năm kinh nghiệm",
                  "Thái độ phục vụ tận tình chu đáo",
                  "Giá dịch vụ tốt nhất",
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white text-[#ff0000] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="relative min-h-[300px] lg:min-h-[460px]">
              <Image
                src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/tinh-than-phuc-vu-omotenashi-toyota-thai-hoa-tu-liem-8111.jpg"
                alt="Tinh thần phục vụ VinFast Thịnh Cường"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIDEO ĐÁNH GIÁ KHÁCH HÀNG */}
      <section className="relative w-full py-20 sm:py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/thinhcuong-vinfast.jpg"
          alt="Khách hàng đánh giá VinFast Thịnh Cường"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-[1300px] mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            KHÁCH HÀNG ĐÁNH GIÁ XƯỞNG DỊCH VỤ
            <br />
            CỦA VINFAST THỊNH CƯỜNG
          </h2>
          <div className="flex justify-center">
            <button
              onClick={() => openBooking(undefined, "dich-vu")}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-[#f80000] text-white flex items-center justify-center transition-all duration-300 border-2 border-white/60 hover:border-[#f80000] hover:scale-110 shadow-2xl backdrop-blur-xs group"
              aria-label="Play video"
            >
              <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1 group-hover:scale-105" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. FAQ & VIDEO */}
      <section className="pt-10 sm:pt-14 pb-4 sm:pb-6 bg-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left video thumbnail with Play button (stretching to exactly match the right column) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="relative w-full flex-1 min-h-[360px] lg:min-h-full rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/showroom-3s-vinfast-vinh-phuc-3.jpg"
                  alt="Showroom 3S VinFast Thịnh Cường"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    onClick={() => openBooking(undefined, "dich-vu")}
                    className="w-16 h-16 rounded-full bg-white/90 text-[#f80000] flex items-center justify-center hover:scale-110 transition-transform shadow-xl cursor-pointer"
                    aria-label="Xem video dịch vụ"
                  >
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right FAQ Content */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#3ab3ff] mb-1">
                  Bạn hỏi - Chúng tôi trả lời
                </h3>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  Các câu hỏi thường gặp
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  Hiểu được sự vận hành cũng như quy định bảo dưỡng, bảo hàng, sửa chữa sẽ giúp tăng độ bền cho phụ tùng xe và tăng tuổi thọ cho chiếc xe của bạn.
                </p>
              </div>

              {/* Accordion with Smooth CSS Grid Animation (Zero layout jump) */}
              <div className="space-y-3 pt-1">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                        isOpen
                          ? "border-[#3ab3ff]/70 shadow-xs ring-1 ring-[#3ab3ff]/15 bg-white"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className={`w-full flex items-center justify-between p-4 text-left font-bold text-sm sm:text-[15px] transition-colors duration-200 cursor-pointer ${
                          isOpen
                            ? "text-[#008fe5] bg-sky-50/40"
                            : "text-gray-800 bg-gray-50/50 hover:bg-gray-50"
                        }`}
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-in-out ${
                            isOpen ? "rotate-180 text-[#3ab3ff]" : "text-gray-400"
                          }`}
                        />
                      </button>

                      {/* Smooth animated collapsible content */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="p-4 pt-2.5 bg-white text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <a
                  href="tel:0902422522"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#e9e9e9] hover:bg-gray-200 text-gray-900 font-bold text-sm rounded border-l-4 border-[#3ab3ff] transition-colors"
                >
                  <Phone className="w-4 h-4 fill-current text-[#3ab3ff]" />
                  <span>Liên hệ với chúng tôi</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TIN TỨC MỚI NHẤT (Cân đối khoảng cách phía trên) */}
      <NewsSection className="pt-4 sm:pt-6 pb-12 sm:pb-16" />
    </div>
  );
}
