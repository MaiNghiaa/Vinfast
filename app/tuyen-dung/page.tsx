"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  DollarSign,
  Briefcase,
  ChevronRight,
  Bookmark,
  Calendar,
  X,
  Phone,
  Mail,
  CheckCircle2,
  Filter,
  RotateCcw,
} from "lucide-react";

// Dữ liệu 20 vị trí tuyển dụng thực tế từ vinfastthinhcuong.com.vn
const JOBS_DATA = [
  {
    id: 1,
    title: "TUYỂN DỤNG: CHUYÊN VIÊN MEDIA, QUAY, DỰNG",
    day: "06",
    month: "Th3",
    date: "06/03/2026",
    categories: ["Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "15 – 18 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/03/web-11.jpg",
    description:
      "1. GIỚI THIỆU VỀ VINFAST THỊNH CƯỜNG VinFast Thịnh Cường là đại lý ủy quyền chính hãng của VinFast Việt Nam...",
    details: {
      responsibilities: [
        "Lên ý tưởng, kịch bản, quay phim và hậu kỳ video quảng bá các dòng xe điện VinFast (VF 3, VF 5, VF 6, VF 7, VF 8, VF 9).",
        "Sản xuất video ngắn (TikTok, Reels, Shorts) và video trải nghiệm, review xe, phỏng vấn khách hàng bàn giao xe.",
        "Phối hợp cùng bộ phận Marketing tổ chức các buổi livestream sự kiện ra mắt và lái thử xe.",
        "Quản lý và bảo quản trang thiết bị quay chụp của công ty.",
      ],
      requirements: [
        "Kinh nghiệm từ 1-2 năm vị trí quay dựng video (ưu tiên ngành ô tô, công nghệ).",
        "Sử dụng thành thạo Adobe Premiere, After Effects, CapCut, Photoshop.",
        "Có tư duy thẩm mỹ tốt, nắm bắt nhanh các xu hướng video thịnh hành trên mạng xã hội.",
        "Nhiệt huyết, chịu được áp lực tiến độ sự kiện.",
      ],
      benefits: [
        "Thu nhập: 15 – 18 triệu VNĐ/tháng (Lương cứng + Thưởng KPI dự án).",
        "Môi trường làm việc trẻ trung, sáng tạo, tiếp cận các dòng ô tô điện hiện đại nhất.",
        "Đầy đủ chế độ BHXH, BHYT, thưởng lễ tết và du lịch nghỉ mát thường niên.",
      ],
    },
  },
  {
    id: 2,
    title: "TUYỂN DỤNG: CHUYÊN VIÊN SOURCING & DATA INSIGHTS SPECIALIST",
    day: "06",
    month: "Th3",
    date: "06/03/2026",
    categories: ["Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "15 – 25 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/03/web-12.jpg",
    description:
      "1. GIỚI THIỆU VỀ VINFAST THỊNH CƯỜNG VinFast Thịnh Cường là đơn vị tiên phong trong phân phối ô tô điện VinFast...",
    details: {
      responsibilities: [
        "Nghiên cứu, thu thập và phân tích dữ liệu thị trường ô tô điện, hành vi khách hàng và đối thủ cạnh tranh.",
        "Đánh giá hiệu quả các kênh tìm kiếm khách hàng tiềm năng (Sourcing) và tối ưu hóa chi phí thu hút lead.",
        "Xây dựng báo cáo dữ liệu định kỳ giúp Ban Giám đốc đưa ra chiến lược kinh doanh chính xác.",
      ],
      requirements: [
        "Tốt nghiệp Đại học chuyên ngành Kinh tế, Thống kê, Marketing, Hệ thống thông tin.",
        "Thành thạo công cụ phân tích dữ liệu (Excel nâng cao, PowerBI, Google Analytics).",
        "Tư duy logic tốt, khả năng tổng hợp và trực quan hóa dữ liệu sắc bén.",
      ],
      benefits: [
        "Thu nhập: 15 – 25 triệu VNĐ/tháng (Lương cứng + Thưởng hiệu quả kinh doanh).",
        "Cơ hội thăng tiến lên Trưởng nhóm Phân tích dữ liệu trong vòng 1 năm.",
        "Đầy đủ chế độ phúc lợi và đào tạo chuyên sâu về ngành ô tô điện.",
      ],
    },
  },
  {
    id: 3,
    title: "TUYỂN DỤNG: CHUYÊN VIÊN CONTENT MARKETING",
    day: "11",
    month: "Th2",
    date: "11/02/2026",
    categories: ["Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "12 – 15 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/02/tuyen-dung-web.jpg",
    description:
      "1. GIỚI THIỆU VỀ VINFAST THỊNH CƯỜNG VinFast Thịnh Cường là hệ thống đại lý hàng đầu mang giải pháp xanh...",
    details: {
      responsibilities: [
        "Sáng tạo nội dung bài viết truyền thông trên Fanpage, Website, Zalo OA và các hội nhóm xe VinFast.",
        "Viết bài chuẩn SEO, bài PR báo chí và kịch bản video ngắn cho sản phẩm xe và dịch vụ hậu mãi.",
        "Phối hợp team Designer và Media hoàn thiện các ấn phẩm truyền thông chuyên nghiệp.",
      ],
      requirements: [
        "Tốt nghiệp chuyên ngành Báo chí, Truyền thông, Marketing hoặc ngành liên quan.",
        "Kinh nghiệm viết content từ 1 năm trở lên, có đam mê và hiểu biết về ô tô.",
        "Văn phong cuốn hút, linh hoạt, khả năng bắt trend tốt.",
      ],
      benefits: [
        "Thu nhập: 12 – 15 triệu VNĐ/tháng.",
        "Làm việc tại văn phòng tiện nghi, đồng nghiệp thân thiện, hỗ trợ tối đa.",
        "Được tham gia các khóa đào tạo nâng cao kỹ năng content và truyền thông đa kênh.",
      ],
    },
  },
  {
    id: 4,
    title: "Tuyển Dụng Kế Toán Trưởng – VinFast Thịnh Cường – Thu nhập: 25 – 30 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Tài chính & Kế toán",
    location: "Trụ sở Hà Nội",
    salary: "25 – 30 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-ke-toan-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng kế toán trưởng. Thu nhập 25 - 30 triệu. Quản lý toàn bộ hệ thống tài chính kế toán đại lý...",
    details: {
      responsibilities: [
        "Tổ chức và quản lý toàn bộ hệ thống kế toán, tài chính tại các showroom và xưởng dịch vụ.",
        "Lập báo cáo tài chính, quyết toán thuế, làm việc với cơ quan thuế và ngân hàng đối tác.",
        "Kiểm soát chi phí vận hành, dòng tiền nhập xe và phụ tùng chính hãng VinFast.",
      ],
      requirements: [
        "Tốt nghiệp Đại học chuyên ngành Tài chính - Kế toán, có chứng chỉ Kế toán trưởng.",
        "Tối thiểu 3 năm kinh nghiệm ở vị trí tương đương, ưu tiên trong ngành ô tô hoặc bán lẻ chuỗi.",
        "Nắm vững luật thuế, chuẩn mực kế toán Việt Nam, cẩn trọng và trung thực.",
      ],
      benefits: [
        "Mức lương: 25 – 30 triệu VNĐ/tháng + Thưởng ban lãnh đạo.",
        "Chế độ đãi ngộ cấp quản lý cao cấp, xe đưa đón công tác.",
        "Bảo hiểm sức khỏe đặc biệt cho nhân sự cấp cao.",
      ],
    },
  },
  {
    id: 5,
    title: "Tuyển Dụng Chuyên Viên Đào Tạo Nội Bộ – VinFast Thịnh Cường – Thu nhập: 12 – 20 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "12 – 20 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dao-tao-noi-bo-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng 2 Chuyên viên đào tạo nội bộ. Thu nhập 12 - 20 triệu. Xây dựng giáo trình và đào tạo kỹ năng...",
    details: {
      responsibilities: [
        "Khảo sát nhu cầu đào tạo, lập kế hoạch và tổ chức các lớp đào tạo hội nhập, kỹ năng tư vấn cho nhân sự mới.",
        "Triển khai các chương trình đào tạo chuẩn dịch vụ 5 sao từ VinFast Việt Nam.",
        "Đánh giá năng lực nhân sự sau đào tạo và đề xuất phương án cải tiến.",
      ],
      requirements: [
        "Kinh nghiệm đào tạo nội bộ từ 1-2 năm trở lên (ưu tiên ngành dịch vụ, ô tô).",
        "Kỹ năng thuyết trình, truyền cảm hứng và giao tiếp xuất sắc.",
        "Tác phong chỉn chu, am hiểu văn hóa phục vụ khách hàng tận tâm.",
      ],
      benefits: [
        "Thu nhập: 12 – 20 triệu VNĐ/tháng.",
        "Môi trường chuyên nghiệp, lộ trình thăng tiến rõ ràng lên Trưởng ban Đào tạo.",
        "Đầy đủ các chế độ phúc lợi cao cấp theo quy định tập đoàn.",
      ],
    },
  },
  {
    id: 6,
    title: "Tuyển Dụng Nhân Viên Tiếng Trung Thương Mại – VinFast Thịnh Cường – Thu nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "15 – 25 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-tro-ly-phien-dich-tieng-trung-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng 4 Nhân viên tiếng Trung thương mại. Thu nhập hấp dẫn. Phiên dịch và làm việc cùng đối tác quốc tế...",
    details: {
      responsibilities: [
        "Biên phiên dịch tiếng Trung trong các buổi đàm phán thương mại, ký kết hợp đồng và gặp gỡ đối tác quốc tế.",
        "Soạn thảo văn bản, hợp đồng thương mại và tài liệu kỹ thuật song ngữ Trung - Việt.",
        "Hỗ trợ triển khai các dự án hợp tác chuỗi cung ứng và phụ tùng xe.",
      ],
      requirements: [
        "Thành thạo tiếng Trung (HSK 5-6 hoặc tương đương), phát âm chuẩn, lưu loát.",
        "Ưu tiên ứng viên có kinh nghiệm thương mại, xuất nhập khẩu hoặc ngành kỹ thuật ô tô.",
        "Nhanh nhẹn, cẩn trọng, khả năng xử lý tình huống linh hoạt.",
      ],
      benefits: [
        "Thu nhập cạnh tranh: 15 – 25 triệu VNĐ/tháng (thương lượng theo năng lực).",
        "Cơ hội đi công tác và làm việc với các tập đoàn công nghệ lớn.",
        "Đầy đủ chế độ bảo hiểm, nghỉ phép và thưởng năng suất định kỳ.",
      ],
    },
  },
  {
    id: 7,
    title: "Tuyển Dụng Trợ Lý Chủ Tịch/Tổng Giám Đốc – VinFast Thịnh Cường – Thu nhập: 25 – 35 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "25 – 35 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-tro-ly-giam-doc-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng 4 Trợ Lý Chủ Tịch/Tổng Giám Đốc. Hỗ trợ điều hành chiến lược kinh doanh toàn hệ thống...",
    details: {
      responsibilities: [
        "Tham mưu, hỗ trợ Chủ tịch/Tổng Giám Đốc trong công tác điều hành chiến lược các khối kinh doanh và vận hành.",
        "Sắp xếp lịch trình, chuẩn bị tài liệu, chủ trì các cuộc họp và theo dõi tiến độ thực thi quyết định của Ban Lãnh đạo.",
        "Đại diện Ban Lãnh đạo làm việc với các đối tác chiến lược cấp cao.",
      ],
      requirements: [
        "Tốt nghiệp Đại học các ngành Kinh tế, Quản trị kinh doanh, Ngoại giao.",
        "Tối thiểu 2 năm kinh nghiệm ở vị trí trợ lý lãnh đạo cấp cao.",
        "Ngoại hình sáng, tác phong chuyên nghiệp, kỹ năng bảo mật thông tin tuyệt đối.",
      ],
      benefits: [
        "Thu nhập: 25 – 35 triệu VNĐ/tháng + Thưởng hiệu quả điều hành.",
        "Làm việc trực tiếp cùng dàn lãnh đạo tâm huyết, tầm nhìn chiến lược lớn.",
        "Chế độ phúc lợi toàn diện bậc nhất hệ thống Thịnh Cường.",
      ],
    },
  },
  {
    id: 8,
    title: "Tuyển Dụng Trợ Lý Ban Lãnh Đạo – VinFast Thịnh Cường – Thu nhập: 25 – 30 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "25 – 30 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-tro-ly-phien-dich-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng 4 Trợ Lý Ban Lãnh Đạo. Điều phối các phòng ban chức năng, giám sát thực thi mục tiêu OKR...",
    details: {
      responsibilities: [
        "Đóng vai trò cầu nối thông tin giữa Ban Lãnh đạo và các khối kinh doanh, showroom, xưởng dịch vụ.",
        "Tổng hợp báo cáo tuần/tháng, phân tích số liệu kinh doanh để đề xuất giải pháp tối ưu.",
        "Quản lý công văn, giấy tờ hành chính quan trọng của Ban Giám đốc.",
      ],
      requirements: [
        "Kinh nghiệm làm việc từ 2 năm trở lên tại các vị trí thư ký, trợ lý quản lý.",
        "Kỹ năng tin học văn phòng xuất sắc, thành thạo công cụ quản lý dự án.",
        "Khả năng chịu áp lực cao, quản lý thời gian hiệu quả.",
      ],
      benefits: [
        "Thu nhập: 25 – 30 triệu VNĐ/tháng.",
        "Thưởng doanh số quý, năm theo kết quả kinh doanh chung.",
        "Môi trường làm việc chuẩn mực tập đoàn lớn.",
      ],
    },
  },
  {
    id: 9,
    title: "Tuyển Dụng Trợ Lý Tiếng Trung – VinFast Thịnh Cường – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "18 – 28 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-tro-ly-phien-dich-nam-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng 1 Trợ Lý Tiếng Trung. Lương thưởng cạnh tranh, hỗ trợ trực tiếp các chương trình hợp tác quốc tế...",
    details: {
      responsibilities: [
        "Đồng hành cùng lãnh đạo trong các chuyến công tác và đàm phán hợp tác với đối tác nước ngoài.",
        "Dịch thuật chuyên sâu tài liệu kỹ thuật xe điện và trạm sạc.",
        "Xây dựng mối quan hệ bền vững với mạng lưới đối tác quốc tế.",
      ],
      requirements: [
        "Tiếng Trung thành thạo 4 kỹ năng nghe, nói, đọc, viết (ưu tiên du học sinh Trung Quốc).",
        "Có tinh thần trách nhiệm cao, năng động và ham học hỏi công nghệ mới.",
      ],
      benefits: [
        "Thu nhập: 18 – 28 triệu VNĐ/tháng + Công tác phí hấp dẫn.",
        "Cơ hội mở rộng network quan hệ đối tác quốc tế trong ngành công nghiệp xanh.",
      ],
    },
  },
  {
    id: 10,
    title: "Tuyển Dụng Giám Đốc Kinh Doanh – VinFast Thịnh Cường – Thu Nhập 30-60 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "30 – 60 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-giam-doc-kinh-doanh-vinfast-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng Giám đốc kinh doanh ô tô. Lãnh đạo đội ngũ tư vấn bán hàng toàn hệ thống showroom...",
    details: {
      responsibilities: [
        "Xây dựng và triển khai chiến lược kinh doanh xe điện VinFast trên toàn hệ thống showroom.",
        "Chịu trách nhiệm về chỉ tiêu doanh số bàn giao xe, doanh thu và phát triển thị phần.",
        "Đào tạo, dẫn dắt và tạo động lực cho đội ngũ Trưởng phòng và Tư vấn bán hàng.",
      ],
      requirements: [
        "Tối thiểu 3 năm kinh nghiệm quản lý kinh doanh trong ngành ô tô (Ưu tiên đã từng làm đại lý VinFast, Toyota, Hyundai, Mercedes).",
        "Kỹ năng lãnh đạo xuất sắc, tư duy chiến lược thương mại vượt trội.",
        "Mạng lưới quan hệ khách hàng doanh nghiệp và đối tác tài chính rộng mở.",
      ],
      benefits: [
        "Thu nhập: 30 – 60 triệu VNĐ/tháng (Lương cứng + Thưởng % hoa hồng doanh số cực khủng).",
        "Cấp xe ô tô công tác, gói bảo hiểm sức khỏe VIP toàn diện.",
        "Được bổ nhiệm tham gia Hội đồng quản trị điều hành của hệ sinh thái.",
      ],
    },
  },
  {
    id: 11,
    title: "Tuyển Dụng Kỹ Thuật Viên Sửa Chữa Chung Ô Tô VinFast – Thu Nhập 9-18 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kỹ thuật & Xưởng",
    location: "Hà Nội / Quảng Ninh",
    salary: "9 – 18 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-nhan-vien-xuong-vinfast-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng Kỹ thuật viên bảo dưỡng & sửa chữa chung xưởng dịch vụ. Đào tạo trực tiếp từ hãng...",
    details: {
      responsibilities: [
        "Thực hiện công việc bảo dưỡng định kỳ, chẩn đoán lỗi và sửa chữa các dòng ô tô điện VinFast.",
        "Sử dụng máy chẩn đoán chuyên dụng của VinFast để kiểm tra pin, động cơ điện và phần mềm xe.",
        "Tuân thủ nghiêm ngặt quy trình an toàn kỹ thuật xưởng 5S.",
      ],
      requirements: [
        "Tốt nghiệp Trung cấp/Cao đẳng chuyên ngành Công nghệ Ô tô, Cơ khí động lực.",
        "Có kinh nghiệm từ 1 năm trở lên sửa chữa máy gầm, điện ô tô.",
        "Cẩn thận, tỉ mỉ, có trách nhiệm cao với tay nghề.",
      ],
      benefits: [
        "Thu nhập: 9 – 18 triệu VNĐ/tháng (Lương cơ bản + Lương khoán năng suất giờ công).",
        "Được cấp chứng chỉ kỹ thuật viên chuẩn hãng VinFast.",
        "Phụ cấp ăn trưa, đồng phục, đồ bảo hộ cao cấp và bảo hiểm tai nạn 24/7.",
      ],
    },
  },
  {
    id: 12,
    title: "Tuyển Dụng Nhân Viên Kho Xưởng Dịch Vụ Ô Tô VinFast – Thu Nhập 9-14 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kỹ thuật & Xưởng",
    location: "Hà Nội / Quảng Ninh",
    salary: "9 – 14 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-nhan-vien-xuong2-vinfast-thinhcuong.jpg",
    description:
      "VinFast Thịnh Cường tuyển dụng Nhân viên quản lý kho phụ tùng chính hãng xưởng dịch vụ ô tô...",
    details: {
      responsibilities: [
        "Tiếp nhận, kiểm đếm và sắp xếp phụ tùng, phụ kiện chính hãng VinFast nhập xưởng.",
        "Cấp phát phụ tùng cho kỹ thuật viên theo lệnh sửa chữa trên hệ thống phần mềm DMS.",
        "Kiểm kê kho định kỳ, quản lý hạn dùng và bảo quản phụ tùng theo đúng tiêu chuẩn 5S.",
      ],
      requirements: [
        "Tốt nghiệp Trung cấp trở lên ngành Kế toán kho, Kỹ thuật ô tô hoặc ngành liên quan.",
        "Kinh nghiệm quản lý kho từ 1 năm (ưu tiên từng làm kho ô tô, xe máy).",
        "Sử dụng thành thạo phần mềm quản lý kho và Excel.",
      ],
      benefits: [
        "Thu nhập: 9 – 14 triệu VNĐ/tháng.",
        "Môi trường xưởng dịch vụ hiện đại, trang bị điều hòa thông thoáng.",
        "Đầy đủ quyền lợi BHXH, BHYT và thưởng hoàn thành chỉ tiêu kho.",
      ],
    },
  },
  {
    id: 13,
    title: "Tuyển Dụng Nhân Viên Content Marketing – VinFast Thịnh Cường – Thu Nhập 12-15 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "12 – 15 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-nhan-vien-marketing-vinfast-thinhcuong.jpg",
    description:
      "Tuyển dụng chuyên viên sáng tạo nội dung truyền thông cho các chiến dịch marketing xe điện xanh...",
    details: {
      responsibilities: [
        "Lên kế hoạch nội dung truyền thông cho các mẫu xe chiến lược VF 3, VF 5, VF 7.",
        "Quản trị Fanpage đại lý, tương tác và phản hồi giải đáp thông tin cho khách hàng.",
        "Hỗ trợ triển khai các sự kiện lái thử xe tại các trung tâm thương mại Vincom.",
      ],
      requirements: [
        "Kinh nghiệm 1 năm ở vị trí Content Creator/Copywriter.",
        "Kỹ năng viết lách đa dạng, biết chụp ảnh và chỉnh sửa cơ bản là lợi thế lớn.",
      ],
      benefits: [
        "Thu nhập: 12 – 15 triệu VNĐ/tháng.",
        "Cơ hội tiếp xúc trải nghiệm lái thử tất cả các dòng xe VinFast mới nhất.",
      ],
    },
  },
  {
    id: 14,
    title: "Tuyển Thực Tập Sinh Marketing – VinFast Thịnh Cường – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "Trợ cấp hấp dẫn",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-tts-vinfast-thinhcuong.jpg",
    description:
      "Cơ hội thực chiến tuyệt vời dành cho các bạn sinh viên năm cuối đam mê ngành ô tô và truyền thông thương hiệu...",
    details: {
      responsibilities: [
        "Hỗ trợ đội ngũ Marketing chuẩn bị nội dung và hình ảnh cho các chiến dịch quảng bá.",
        "Hỗ trợ điều phối tại các sự kiện bàn giao xe và ngày hội lái thử.",
        "Thu thập dữ liệu phản hồi của khách hàng sau khi trải nghiệm sản phẩm.",
      ],
      requirements: [
        "Sinh viên năm 3, năm 4 hoặc mới tốt nghiệp các trường ĐH chuyên ngành Marketing, QTKD.",
        "Chăm chỉ, chủ động, ham học hỏi và có laptop cá nhân.",
      ],
      benefits: [
        "Hỗ trợ trợ cấp thực tập hấp dẫn hàng tháng + Thưởng dự án.",
        "Được hướng dẫn 1:1 bởi các chuyên gia marketing giàu kinh nghiệm.",
        "Cơ hội được nhận làm nhân viên chính thức ngay sau kỳ thực tập.",
      ],
    },
  },
  {
    id: 15,
    title: "Tuyển Dụng Nhân Viên Kinh Doanh B2B – VinFast Thịnh Cường – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "20 – 45 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-nhan-vien-kinh-doanh-b2b-vinfast-thinhcuong.jpg",
    description:
      "Phát triển khách hàng doanh nghiệp, các đơn vị vận tải taxi điện Xanh SM, cơ quan nhà nước và tập đoàn...",
    details: {
      responsibilities: [
        "Tìm kiếm và xây dựng mối quan hệ với các khách hàng doanh nghiệp, công ty vận tải, du lịch có nhu cầu mua xe lô.",
        "Tư vấn giải pháp chuyển đổi xanh từ xe xăng sang xe điện cho các đội xe doanh nghiệp.",
        "Đàm phán hợp đồng, phối hợp cùng các ngân hàng hỗ trợ giải pháp tài chính cho đối tác B2B.",
      ],
      requirements: [
        "Tối thiểu 1 năm kinh nghiệm bán hàng B2B hoặc kinh doanh dự án ô tô.",
        "Kỹ năng đàm phán, thuyết trình dự án sắc bén.",
        "Khả năng mở rộng quan hệ đối tác khách hàng doanh nghiệp.",
      ],
      benefits: [
        "Thu nhập: 20 – 45 triệu VNĐ/tháng (Lương cứng + Hoa hồng hợp đồng lô xe cực cao).",
        "Cơ hội ký các hợp đồng giá trị lớn hàng chục tỷ đồng.",
      ],
    },
  },
  {
    id: 16,
    title: "Tuyển Dụng Nhân Viên Media Quay Dựng Video – Lương 15-18 Triệu/Tháng",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "15 – 18 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-media-vinfast-thinhcuong.jpg",
    description:
      "Sản xuất các thước phim ấn tượng ghi dấu hành trình chuyển đổi xanh của các chủ xe VinFast Thịnh Cường...",
    details: {
      responsibilities: [
        "Tạo ra các video highlight, phóng sự bàn giao xe và hành trình lái thử đầy cảm xúc.",
        "Phối hợp cùng ekip xây dựng các chuỗi video series chia sẻ kinh nghiệm sử dụng xe điện an toàn.",
      ],
      requirements: [
        "Kinh nghiệm tối thiểu 1 năm quay phim, dựng clip đa phương tiện.",
        "Thành thạo công cụ Adobe Creative Suite, kỹ năng bay flycam là lợi thế.",
      ],
      benefits: [
        "Thu nhập: 15 – 18 triệu VNĐ/tháng.",
        "Trang bị máy móc, thiết bị quay chụp hiện đại hàng đầu.",
      ],
    },
  },
  {
    id: 17,
    title: "Tuyển Dụng Trưởng Phòng Kinh Doanh – VinFast Thịnh Cường – Thu Nhập 20-50 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "20 – 50 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/tuyen-dung-truong-phong-kinh-doanh-vinfast-thinhcuong.jpg",
    description:
      "Lãnh đạo đội ngũ 10-15 nhân viên tư vấn bán hàng, chịu trách nhiệm doanh số bán xe tại showroom...",
    details: {
      responsibilities: [
        "Quản lý, phân bổ chỉ tiêu doanh số và giám sát hoạt động bán hàng của đội ngũ TVBH.",
        "Hỗ trợ nhân viên xử lý các ca tư vấn khó và chốt hợp đồng khách hàng quan trọng.",
        "Thực hiện các báo cáo kinh doanh hàng tuần cho Giám đốc Kinh doanh.",
      ],
      requirements: [
        "Kinh nghiệm 2 năm quản lý nhóm bán hàng trong lĩnh vực ô tô hoặc BĐS cao cấp.",
        "Kỹ năng đào tạo kỹ năng bán hàng và truyền lửa cho đội ngũ.",
      ],
      benefits: [
        "Thu nhập: 20 – 50 triệu VNĐ/tháng (Lương quản lý + Thưởng doanh số toàn đội ngũ).",
        "Lộ trình thăng tiến trực tiếp lên Giám đốc Showroom.",
      ],
    },
  },
  {
    id: 18,
    title: "Tuyển Dụng Nhân Viên Kinh Doanh – VinFast Thịnh Cường – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "15 – 45 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/van-hoa-vinfast-thinhcuongg.jpg",
    description:
      "Tư vấn giới thiệu các dòng xe điện VinFast thông minh cho khách hàng đến showroom và khách hàng online...",
    details: {
      responsibilities: [
        "Tiếp đón khách hàng tại showroom, tư vấn tính năng kỹ thuật và hướng dẫn lái thử xe.",
        "Tư vấn các gói giải pháp vay trả góp ngân hàng, chính sách giá và ưu đãi tốt nhất cho khách.",
        "Chăm sóc khách hàng sau bán hàng và bàn giao xe chu đáo.",
      ],
      requirements: [
        "Đam mê ô tô, thích giao tiếp và muốn có thu nhập đột phá.",
        "Ngoại hình chỉn chu, tươi cười, tác phong chuẩn mực.",
        "Chưa có kinh nghiệm sẽ được đào tạo bài bản từ đầu.",
      ],
      benefits: [
        "Thu nhập: 15 – 45 triệu VNĐ/tháng (Lương cơ bản + Hoa hồng bán xe không giới hạn).",
        "Được đào tạo trực tiếp bởi chuyên gia đào tạo VinFast Việt Nam.",
      ],
    },
  },
  {
    id: 19,
    title: "Tuyển Dụng Chuyên viên Content & Visual Marketing – Lương 10-20 Triệu/Tháng",
    day: "15",
    month: "Th8",
    date: "15/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "10 – 20 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/Tuyendung-ContentMKT.jpg",
    description:
      "Kết hợp nội dung và thiết kế trực quan để tạo nên các chiến dịch quảng cáo ô tô điện đầy thu hút...",
    details: {
      responsibilities: [
        "Sản xuất nội dung kèm hình ảnh thiết kế banner, poster sự kiện showroom.",
        "Phối hợp chạy các chiến dịch quảng cáo Facebook Ads, Google Ads.",
      ],
      requirements: [
        "Kinh nghiệm làm content visual từ 1 năm, sử dụng được Canva, Photoshop cơ bản.",
        "Tư duy thẩm mỹ hiện đại, hiểu ngôn ngữ thương hiệu xe điện cao cấp.",
      ],
      benefits: [
        "Thu nhập: 10 – 20 triệu VNĐ/tháng.",
        "Môi trường năng động, khuyến khích sáng tạo và đổi mới liên tục.",
      ],
    },
  },
  {
    id: 20,
    title: "Tuyển Dụng Chuyên Gia An Ninh Nội Bộ & Quản Lý Đội Bảo Vệ",
    day: "15",
    month: "Th8",
    date: "15/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Hệ thống Showroom",
    salary: "12 – 18 triệu",
    image: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/08/Tuyendung.jpg",
    description:
      "Đảm bảo an ninh trật tự, an toàn tài sản xe trưng bày và hướng dẫn đón tiếp khách hàng văn minh tại showroom...",
    details: {
      responsibilities: [
        "Quản lý đội ngũ an ninh, điều phối luồng xe ra vào xưởng dịch vụ và showroom.",
        "Kiểm soát hệ thống camera an ninh 24/7 và xử lý các sự cố phát sinh.",
        "Đón tiếp, hỗ trợ mở cửa xe và hướng dẫn khách hàng gửi xe ân cần, lịch sự.",
      ],
      requirements: [
        "Ưu tiên ứng viên từng làm việc trong lực lượng vũ trang, công an hoặc bảo vệ khách sạn 5 sao.",
        "Sức khỏe tốt, trung thực, nghiêm túc và có tinh thần trách nhiệm cao.",
      ],
      benefits: [
        "Thu nhập: 12 – 18 triệu VNĐ/tháng.",
        "Chế độ bảo hiểm đầy đủ, thưởng ngày lễ tết theo quy định.",
      ],
    },
  },
];

const DEPARTMENTS = [
  "Tất cả",
  "Kinh doanh & Bán hàng",
  "Marketing & Media",
  "Kỹ thuật & Xưởng",
  "Tài chính & Kế toán",
  "Nhân sự & Ban Lãnh đạo",
];

const LOCATIONS = [
  "Tất cả địa điểm",
  "Trụ sở Hà Nội",
  "Hà Nội / Quảng Ninh",
  "Hệ thống Showroom",
];

const SALARY_RANGES = [
  "Tất cả mức lương",
  "Trên 25 triệu",
  "15 – 25 triệu",
  "Dưới 15 triệu",
];

const ITEMS_PER_PAGE = 9;

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("Tất cả");
  const [selectedLocation, setSelectedLocation] = useState("Tất cả địa điểm");
  const [selectedSalary, setSelectedSalary] = useState("Tất cả mức lương");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedJob, setSelectedJob] = useState<(typeof JOBS_DATA)[0] | null>(
    null
  );
  const [applyName, setApplyName] = useState("");
  const [applyPhone, setApplyPhone] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [applyNote, setApplyNote] = useState("");
  const [applySuccess, setApplySuccess] = useState(false);

  // Filter logic
  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      // Search
      const searchMatch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase());

      // Department
      const deptMatch =
        selectedDept === "Tất cả" || job.department === selectedDept;

      // Location
      const locMatch =
        selectedLocation === "Tất cả địa điểm" ||
        job.location === selectedLocation;

      // Salary filter
      let salMatch = true;
      if (selectedSalary === "Trên 25 triệu") {
        salMatch =
          job.salary.includes("25") ||
          job.salary.includes("30") ||
          job.salary.includes("60");
      } else if (selectedSalary === "15 – 25 triệu") {
        salMatch =
          job.salary.includes("15") ||
          job.salary.includes("18") ||
          job.salary.includes("20") ||
          job.salary.includes("25");
      } else if (selectedSalary === "Dưới 15 triệu") {
        salMatch =
          job.salary.includes("9") ||
          job.salary.includes("12") ||
          job.salary.includes("14") ||
          job.salary.includes("Trợ cấp");
      }

      return searchMatch && deptMatch && locMatch && salMatch;
    });
  }, [searchTerm, selectedDept, selectedLocation, selectedSalary]);

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE) || 1;
  const currentJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handleResetFilter = () => {
    setSearchTerm("");
    setSelectedDept("Tất cả");
    setSelectedLocation("Tất cả địa điểm");
    setSelectedSalary("Tất cả mức lương");
    setCurrentPage(1);
  };

  const handleOpenDetail = (job: (typeof JOBS_DATA)[0]) => {
    setSelectedJob(job);
    setApplySuccess(false);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setApplySuccess(false);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyPhone) {
      alert("Vui lòng điền họ tên và số điện thoại.");
      return;
    }
    setApplySuccess(true);
  };

  return (
    <div className="w-full bg-[#fdfdfd] min-h-screen">
      {/* 1. HERO BANNER CHUẨN THỊNH CƯỜNG (VF 9 ĐEN TRÊN CAO TỐC) */}
      <section className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/07/anh-dep2.png"
          alt="Tin tuyển dụng VinFast Thịnh Cường"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-4 max-w-[1300px] mx-auto text-white space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">
            Tin Tuyển Dụng
          </h1>
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-white font-medium">Tin tuyển dụng</span>
          </div>
        </div>
      </section>

      {/* 2. THANH LỌC NGANG (HORIZONTAL FILTER BAR) */}
      <section className="sticky top-[72px] z-20 bg-white border-b border-gray-200 shadow-xs">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          {/* Hàng 1: Ô tìm kiếm & Các Dropdown tiêu chí */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Ô tìm kiếm */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Tìm kiếm vị trí tuyển dụng, kỹ năng, chức danh..."
                className="w-full pl-10 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#f80000] focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dropdown Địa điểm */}
            <div className="w-full md:w-52">
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#f80000] focus:bg-white cursor-pointer"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown Mức lương */}
            <div className="w-full md:w-52">
              <select
                value={selectedSalary}
                onChange={(e) => {
                  setSelectedSalary(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#f80000] focus:bg-white cursor-pointer"
              >
                {SALARY_RANGES.map((sal) => (
                  <option key={sal} value={sal}>
                    {sal}
                  </option>
                ))}
              </select>
            </div>

            {/* Nút đặt lại bộ lọc */}
            {(searchTerm ||
              selectedDept !== "Tất cả" ||
              selectedLocation !== "Tất cả địa điểm" ||
              selectedSalary !== "Tất cả mức lương") && (
              <button
                onClick={handleResetFilter}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-red-50 hover:text-[#f80000] rounded-lg transition-colors shrink-0"
                title="Đặt lại bộ lọc"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Đặt lại
              </button>
            )}
          </div>

          {/* Hàng 2: Các tab phòng ban dạng Pills */}
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs">
              {DEPARTMENTS.map((dept) => {
                const count =
                  dept === "Tất cả"
                    ? JOBS_DATA.length
                    : JOBS_DATA.filter((j) => j.department === dept).length;
                const isActive = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => {
                      setSelectedDept(dept);
                      setCurrentPage(1);
                    }}
                    className={`whitespace-nowrap px-4 py-2 rounded-full font-bold transition-all ${
                      isActive
                        ? "bg-[#f80000] text-white shadow-xs"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {dept} ({count})
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:block text-xs text-gray-500 font-medium shrink-0">
              Tìm thấy <strong className="text-[#f80000]">{filteredJobs.length}</strong> việc làm
            </div>
          </div>
        </div>
      </section>

      {/* 3. LƯỚI DANH SÁCH BÀI ĐĂNG TUYỂN DỤNG (3 CỘT CHUẨN THỊNH CƯỜNG) */}
      <section className="py-10 md:py-14">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-8 space-y-4">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">
                Không tìm thấy vị trí tuyển dụng phù hợp
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Rất tiếc không có vị trí nào khớp với tiêu chí tìm kiếm của bạn. Hãy thử thay đổi từ khóa hoặc đặt lại bộ lọc.
              </p>
              <button
                onClick={handleResetFilter}
                className="bg-[#f80000] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#d90000] transition-colors"
              >
                Xem tất cả vị trí
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentJobs.map((job) => (
                <article
                  key={job.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-2xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Image & Date Badge Container */}
                  <div>
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                      <Image
                        src={job.image}
                        alt={job.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Date Badge chuẩn phong cách Thịnh Cường */}
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs rounded-md px-2.5 py-1 text-center shadow-xs border border-gray-100 leading-tight">
                        <span className="block text-[10px] font-bold text-gray-500 uppercase">
                          {job.month}
                        </span>
                        <span className="block text-base font-black text-gray-900">
                          {job.day}
                        </span>
                      </div>

                      {/* Salary Badge */}
                      <div className="absolute bottom-3 right-3 bg-[#f80000]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                        {job.salary}
                      </div>
                    </div>

                    {/* Post Info Container */}
                    <div className="p-5 space-y-3">
                      {/* Meta links */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="flex items-center gap-1 text-[#f80000] font-medium">
                          <Bookmark className="w-3.5 h-3.5" />
                          {job.department}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => handleOpenDetail(job)}
                        className="font-bold text-gray-900 text-[16px] md:text-[17px] leading-snug line-clamp-2 group-hover:text-[#f80000] transition-colors cursor-pointer"
                        title={job.title}
                      >
                        {job.title}
                      </h3>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{job.location}</span>
                      </div>

                      {/* Description excerpt */}
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  {/* Readmore Button Bar */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-gray-400">
                        Cập nhật {job.date}
                      </span>
                      <button
                        onClick={() => handleOpenDetail(job)}
                        className="inline-flex items-center gap-1.5 bg-[#1a1a1a] hover:bg-[#f80000] text-white px-4 py-2 rounded-full text-xs font-bold transition-all hover:gap-2 shadow-xs cursor-pointer"
                      >
                        Chi Tiết »
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* 4. PHÂN TRANG (PAGINATION) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className={`w-9 h-9 rounded-md text-xs font-bold transition-all ${
                    currentPage === page
                      ? "bg-[#3AB3FF] text-white shadow-xs"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {page}
                </button>
              ))}

              {currentPage < totalPages && (
                <button
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                    window.scrollTo({ top: 380, behavior: "smooth" });
                  }}
                  className="px-3 h-9 rounded-md text-xs font-bold bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all flex items-center justify-center"
                >
                  »
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 5. JOB DETAIL & QUICK APPLY MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-[#111827] text-white flex items-start justify-between gap-4 border-b border-gray-800 shrink-0">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#f80000] text-white text-[11px] font-black px-2.5 py-0.5 rounded uppercase">
                    {selectedJob.department}
                  </span>
                  <span className="text-xs text-gray-300 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {selectedJob.location}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Thu nhập: {selectedJob.salary}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-white leading-snug">
                  {selectedJob.title}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-gray-700">
              {/* Job Details Section */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase text-[#f80000] mb-2">
                    1. Mô Tả Công Việc
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
                    {selectedJob.details.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase text-[#f80000] mb-2">
                    2. Yêu Cầu Ứng Viên
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
                    {selectedJob.details.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-sm uppercase text-[#f80000] mb-2">
                    3. Quyền Lợi Được Hưởng
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-gray-600">
                    {selectedJob.details.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application Form */}
              <div className="pt-6 border-t border-gray-200">
                <div className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200">
                  <h4 className="font-black text-gray-900 text-base uppercase mb-1">
                    Nộp Hồ Sơ Ứng Tuyển Nhanh
                  </h4>
                  <p className="text-xs text-gray-500 mb-4">
                    Phòng Nhân sự VinFast Thịnh Cường sẽ phản hồi trong vòng 24h làm việc.
                  </p>

                  {applySuccess ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-center space-y-2 text-xs">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                      <p className="font-bold text-sm">
                        Nộp hồ sơ thành công!
                      </p>
                      <p>
                        Cảm ơn bạn đã ứng tuyển vị trí <strong>{selectedJob.title}</strong>. Chúng tôi sẽ sớm liên hệ phỏng vấn.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">
                            Họ và tên: *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Nguyễn Văn A"
                            value={applyName}
                            onChange={(e) => setApplyName(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#f80000]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">
                            Số điện thoại: *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="09xx xxx xxx"
                            value={applyPhone}
                            onChange={(e) => setApplyPhone(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#f80000]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">
                            Email liên hệ:
                          </label>
                          <input
                            type="email"
                            placeholder="email@example.com"
                            value={applyEmail}
                            onChange={(e) => setApplyEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#f80000]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">
                            Link CV / Portfolio:
                          </label>
                          <input
                            type="text"
                            placeholder="Google Drive, TopCV link..."
                            value={applyNote}
                            onChange={(e) => setApplyNote(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#f80000]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#f80000] hover:bg-[#d90000] text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors mt-2 shadow-sm cursor-pointer"
                      >
                        Gửi Hồ Sơ Ngay
                      </button>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-[#f80000]" /> Hotline tuyển dụng: 090 242 25 22
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-[#f80000]" /> cskh@vinfastthinhcuong.com.vn
                        </span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
