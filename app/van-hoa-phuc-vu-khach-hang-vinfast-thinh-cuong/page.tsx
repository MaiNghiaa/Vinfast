"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X, ZoomIn } from "lucide-react";

export default function CustomerCulturePage() {
  // State for Video Modal
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close video modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when video modal is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isVideoOpen]);

  return (
    <div className="w-full bg-white text-[#151515] font-sans antialiased selection:bg-[#EB0000] selection:text-white">

      {/* 2. HERO BANNER - FULL WIDTH (Elementor 66fdaf04) */}
      <section
        className="relative w-full min-h-[28vh] sm:min-h-[45vh] md:min-h-[65vh] lg:min-h-[88vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: `url("https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/03/banner-web-TVBH-web1-1.jpg")`,
        }}
        aria-label="Văn hóa Phục vụ Khách hàng VinFast Phương Đông"
      >
        <div className="sr-only">
          <h1>Văn hóa Phục vụ Khách hàng tại Tập đoàn VinFast Phương Đông</h1>
        </div>
      </section>

      {/* 3. TRIẾT LÝ PHỤC VỤ KHÁCH HÀNG (Elementor 275becdb) */}
      <section className="relative py-12 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden bg-white">
        {/* Subtle Watermark Background Pattern - Full Component Coverage */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/train-in-japan-2021-10-06-19-06-22-utc.jpg")`,
            filter: "grayscale(100%)",
          }}
        />

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: TVBH Image (Elementor 3a8e603e) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="group relative w-full h-[360px] sm:h-[420px] lg:h-[485px] overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/03/web-TVBH-web-o-duoi1-1.jpg"
                  alt="VinFast Phương Đông - Tư vấn bán hàng tận tâm"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/40 border border-white/80 flex items-center justify-center text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Philosophy Text Content (Elementor 67e98df7) */}
            <div className="lg:col-span-7 space-y-4 lg:pl-6 text-center lg:text-left">
              {/* Subheading */}
              <h5 className="text-[#F70300] font-[800] text-base sm:text-[18px] uppercase tracking-wider text-center">
                TRIẾT LÝ PHỤC VỤ KHÁCH HÀNG
              </h5>

              {/* Main Heading */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-[800] text-[#151515] leading-tight text-center">
                Phục vụ bằng trái tim – Kết nối bằng giá trị
              </h3>

              {/* Quote */}
              <p className="text-center font-bold text-base sm:text-[18px] text-black pt-1 pb-2">
                “Lắng nghe – Thấu hiểu – Hành động”
              </p>

              {/* Body Text */}
              <div className="space-y-3.5 text-black text-[14px] sm:text-[15px] leading-relaxed text-justify sm:text-left">
                <p>
                  Tại VinFast Phương Đông, mỗi dịch vụ không chỉ đơn thuần là một quy trình, mà là{" "}
                  <strong>một hành trình gắn kết cảm xúc giữa thương hiệu và khách hàng</strong>.
                </p>

                <p>
                  Chúng tôi luôn tâm niệm rằng:{" "}
                  <strong>
                    Sự chuyên nghiệp trong phục vụ khách hàng bắt đầu từ khoảnh khắc đầu tiên khách hàng quan tâm và tìm hiểu về đại lý
                  </strong>
                  , cho đến khi khách hàng quyết định lựa chọn và trở thành người đồng hành cùng thương hiệu.
                </p>

                <p>
                  Ở mỗi điểm chạm trong hành trình trải nghiệm, đội ngũ VinFast Phương Đông luôn:
                </p>

                <ul className="list-disc pl-6 space-y-1.5 font-bold text-black text-left">
                  <li>Chú trọng từng chi tiết nhỏ nhất</li>
                  <li>Tỉ mỉ trong từng hành động</li>
                  <li>Chu đáo trong từng quy trình phục vụ</li>
                </ul>

                <p>
                  Tất cả đều xuất phát từ{" "}
                  <strong>lòng biết ơn và sự thấu hiểu sâu sắc nhu cầu của khách hàng</strong>, nhằm mang đến trải nghiệm hài lòng và trọn vẹn nhất.
                </p>

                <p>
                  Đối với chúng tôi,{" "}
                  <strong>sự hài lòng của khách hàng chính là nền tảng cho thành công bền vững</strong>, đồng thời là nguồn cảm hứng để VinFast Phương Đông{" "}
                  <strong>không ngừng sáng tạo, cải tiến và phát triển mạnh mẽ hơn mỗi ngày</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BỘ 3 XE VINFAST: VF9, VF3, VF7 (Elementor 295306a2) */}
      <section className="w-full bg-white py-2 sm:py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 px-2 sm:px-4">
          {/* Card 1: VF9 (Elementor 57f9a9b7) */}
          <div className="group relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[500px] overflow-hidden">
            <Image
              src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/11/vinfast-vf9-12-0e2b.webp"
              alt="VinFast VF9"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle hover overlay with zoom icon (no click popup) */}
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-black/40 border border-white/80 flex items-center justify-center text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Card 2: VF3 (Elementor 442efd5e) */}
          <div className="group relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[500px] overflow-hidden">
            <Image
              src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/12/vinfast-vf3-253996.jpeg"
              alt="VinFast VF3"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle hover overlay with zoom icon (no click popup) */}
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-black/40 border border-white/80 flex items-center justify-center text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Card 3: VF7 (Elementor 254f3fa7) */}
          <div className="group relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[500px] overflow-hidden">
            <Image
              src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/10/VF7-14.jpg"
              alt="VinFast VF7"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center-right group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle hover overlay with zoom icon (no click popup) */}
            <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 rounded-full bg-black/40 border border-white/80 flex items-center justify-center text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn className="w-5 h-5 stroke-[2.2]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VỊ THẾ DẪN ĐẦU – SỨ MỆNH PHỤC VỤ (Elementor 6cc9e3d5) */}
      <section className="relative w-full py-14 sm:py-20 px-4 sm:px-6 bg-[#fafafa] overflow-hidden">
        {/* Watermark Pattern Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35 bg-repeat"
          style={{
            backgroundImage: `url("https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/pattern-omotenashi-toyota-thai-hoa-tu-liem.jpg")`,
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          <h4 className="text-[#EB0000] font-[800] text-base sm:text-[18px] uppercase tracking-wider">
            VỊ THẾ DẪN ĐẦU – SỨ MỆNH PHỤC VỤ
          </h4>

          <h5 className="text-2xl sm:text-3xl lg:text-[32px] font-[800] text-[#151515] uppercase tracking-tight leading-snug">
            KINH DOANH VÀ DỊCH VỤ SỬA CHỮA BẢO DƯỠNG
          </h5>

          <div className="pt-2 space-y-3.5 text-black text-[15px] sm:text-[16px] leading-relaxed">
            <p>
              VinFast Phương Đông hướng tới mục tiêu trở thành{" "}
              <strong>nhà phân phối ô tô điện VinFast số 1 Việt Nam</strong>, được khách hàng tin tưởng và lựa chọn. Đến với Phương Đông, khách hàng không chỉ tìm thấy:
            </p>

            <p className="font-[800] text-[16px] sm:text-[18px] text-black">
              Những sản phẩm ô tô điện chất lượng cao, chính hãng
            </p>

            <p className="font-[800] text-[16px] sm:text-[18px] text-black">
              Hệ thống Xưởng dịch vụ hiện đại, dịch vụ uy tín, tin cậy
            </p>

            <p className="font-[800] text-[16px] sm:text-[18px] text-black">
              Đội ngũ cán bộ – nhân viên tận tâm và chuyên nghiệp
            </p>

            <p className="pt-2">
              Cảm nhận rõ nét{" "}
              <strong>tinh thần phục vụ bằng trái tim</strong>, xuyên suốt từ{" "}
              <strong>tư vấn – trải nghiệm – bàn giao xe – đến dịch vụ hậu mãi sau bán hàng</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. 09 SHOWROOM VINFAST HIỆN ĐẠI (Elementor 2c668a5f) */}
      <section className="py-14 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Overlapping Showroom Photos (Elementor 74147b87) */}
            <div className="lg:col-span-6 relative flex flex-col items-start justify-center">
              {/* Main Photo (width 65-70%) */}
              <div className="group relative w-[72%] aspect-[1280/1920] max-h-[500px] overflow-hidden rounded-md shadow-md border border-gray-100 z-10">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/09/album-omotenashi-toyota-thai-hoa-tu-liem113.webp"
                  alt="Showroom đón tiếp khách hàng VinFast Phương Đông"
                  fill
                  sizes="(max-width: 1024px) 70vw, 35vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/40 border border-white/80 flex items-center justify-center text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>
              </div>

              {/* Overlapping Badge / Sticker Image (width 40-45%, overlapping bottom right) */}
              <div className="relative w-[48%] -mt-[38%] self-end z-20 drop-shadow-xl hover:rotate-3 transition-transform duration-300">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/01/mvpvpvp.png"
                  alt="Các phiên bản màu và ưu đãi VinFast"
                  width={526}
                  height={526}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Right Column: Showroom Text (Elementor 2737408) */}
            <div className="lg:col-span-6 space-y-4 lg:pl-6 text-center lg:text-left">
              <h6 className="text-[#EB0000] font-[800] text-base sm:text-[18px] uppercase tracking-wider text-center lg:text-left">
                09 SHOWROOM VINFAST HIỆN ĐẠI
              </h6>

              <h5 className="text-2xl sm:text-3xl font-[800] text-[#151515] uppercase tracking-tight leading-tight text-center lg:text-left">
                ĐÓN TIẾP KHÁCH HÀNG THAM QUAN SHOWROOM
              </h5>

              <div className="space-y-4 text-black text-[14px] sm:text-[15px] leading-relaxed text-justify sm:text-left">
                <p>
                  Với tâm niệm: “Những gì xuất phát từ trái tim sẽ chạm đến trái tim”, VinFast Phương Đông luôn áp dụng văn hóa phục vụ khách hàng bằng cả tấm lòng ngay từ lần đầu tiên Quý khách hàng tham quan xe tại Đại lý.
                </p>

                <p>
                  Để đề cao tinh thần tận tâm phục vụ, VinFast Phương Đông luôn chú trọng đào tạo cho nhân viên các tính năng sản phẩm cùng phong cách phục vụ chuyên nghiệp với mong muốn làm hài lòng tối đa nhất tất cả khách hàng khi đến tìm hiểu và sử dụng dịch vụ tại VinFast Phương Đông.
                </p>
              </div>

              <div className="pt-3 text-center sm:text-left">
                <h6 className="text-black font-[800] text-[17px] sm:text-[18px] tracking-wide">
                  Chu đáo - Chuyên nghiệp
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 14 XƯỞNG DỊCH VỤ CHẤT LƯỢNG (Elementor 9df280e) */}
      <section className="relative py-14 sm:py-20 lg:py-24 px-4 sm:px-6 bg-[#fcfcfc] border-t border-gray-100 overflow-hidden">
        {/* Subtle Watermark Pattern - Full Component Coverage */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://vinfastthinhcuong.com.vn/wp-content/uploads/2024/08/train-in-japan-2021-10-06-19-06-22-utc.jpg")`,
            filter: "grayscale(100%)",
          }}
        />

        <div className="max-w-[1300px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Workshop Text (Elementor 094537d) */}
            <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
              <h6 className="text-[#F70300] font-[800] text-base sm:text-[18px] uppercase tracking-wider text-center lg:text-left">
                14 XƯỞNG DỊCH VỤ CHẤT LƯỢNG
              </h6>

              <h2 className="text-2xl sm:text-3xl font-[800] text-[#151515] uppercase tracking-tight leading-tight text-center lg:text-left">
                ĐÓN TIẾP KHÁCH HÀNG LÀM DỊCH VỤ
              </h2>

              <div className="space-y-4 text-black text-[14px] sm:text-[15px] leading-relaxed text-justify sm:text-left">
                <p>
                  VinFast Phương Đông thấu hiểu, mỗi chiếc xe đều là một người bạn tri kỷ, người đồng hành cùng Quý khách trên mọi nẻo đường. Do vậy, đối với chúng tôi, việc chăm sóc một chiếc xe có ý nghĩa giống như chăm sóc người thân quay trở về nhà sau mỗi hành trình dài!
                </p>

                <p>
                  Mỗi khách hàng đến VinFast Phương Đông là điều trân quý, chăm sóc xe VinFast không chỉ là bảo dưỡng thông thường, mà đó là cả tinh thần phục vụ khách hàng như người nhà, chuyên nghiệp, chân thành. Từ những dịch vụ như: Bảo dưỡng, chăm sóc làm đẹp xe, vệ sinh điều hòa, vệ sinh động cơ, vệ sinh nội thất… cho tới việc sửa chữa phục hồi vết móp, sơn sửa vết xước trên thân xe đều được chăm sóc tỉ mỉ, cẩn thận bởi những kỹ thuật viên lành nghề theo tiêu chuẩn VinFast Phương Đông, cùng với đó là sự chuẩn bị kĩ càng, tuyển chọn phụ tùng chính hãng, phù hợp cho chiếc xe, nhằm đem lại cho chiếc xe chất lượng tốt nhất khi vận hành!
                </p>
              </div>

              {/* Slogan */}
              <div className="pt-3">
                <h5 className="text-center font-bold text-black text-[15px] sm:text-[16px] leading-snug">
                  Phục vụ khách hàng bằng cả trái tim và sự chuyên nghiệp chính là niềm tự hào của VinFast Phương Đông!
                </h5>
              </div>
            </div>

            {/* Right Column: Workshop Image (Elementor c720ff3 / 350a581) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="group relative w-full h-[320px] sm:h-[362px] lg:h-[386px] overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/10/557643152_122103037797044175_747372450738561641_n.jpg"
                  alt="Kỹ thuật viên lành nghề tại Xưởng dịch vụ VinFast Phương Đông"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-black/40 border border-white/80 flex items-center justify-center text-white shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-5 h-5 stroke-[2.2]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. VIDEO BANNER PARALLAX: TẬP ĐOÀN VINFAST PHƯƠNG ĐÔNG (Elementor f32dd12) */}
      <section
        className="relative w-full min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center bg-cover bg-center bg-no-repeat lg:bg-fixed overflow-hidden"
        style={{
          backgroundImage: `url("https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/10/Thiet-ke-chua-co-ten-9.png")`,
        }}
      >
        {/* Dark overlay (matches Elementor: bg #000, opacity 0.87) */}
        <div className="absolute inset-0 bg-black/85 backdrop-brightness-110" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-[800] uppercase tracking-wide leading-tight drop-shadow-md">
            TẬP ĐOÀN VINFAST PHƯƠNG ĐÔNG
          </h2>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-3 bg-[#EB0000] hover:bg-[#d00000] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-xl group cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full border border-white/60 flex items-center justify-center group-hover:border-white transition-colors">
                <Play className="w-3 h-3 fill-current ml-0.5" />
              </span>
              <span>Xem video</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. YOUTUBE VIDEO POPUP MODAL */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 bg-black/70 hover:bg-[#EB0000] text-white rounded-full transition-colors"
              aria-label="Đóng video"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/CHs3CMu4EVY?autoplay=1&rel=0"
              title="Tập đoàn VinFast Phương Đông Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
