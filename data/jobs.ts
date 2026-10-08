// data/jobs.ts

export interface JobDetails {
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

export interface Job {
  id: number;
  slug: string;
  title: string;
  day: string;
  month: string;
  date: string;
  categories: string[];
  department: string;
  location: string;
  salary: string;
  image: string;
  description: string;
  details: JobDetails;
}

export const JOBS_DATA: Job[] = [
  {
    id: 1,
    slug: "chuyen-vien-media-quay-dung",
    title: "TUYỂN DỤNG: CHUYÊN VIÊN MEDIA, QUAY, DỰNG",
    day: "06",
    month: "Th3",
    date: "06/03/2026",
    categories: ["Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "15 – 18 triệu",
    image: "/images/about/pd-showroom-1.jpg",
    description:
      "1. GIỚI THIỆU VỀ VINFAST PHƯƠNG ĐÔNG VinFast Phương Đông là đại lý ủy quyền chính hãng của VinFast Việt Nam...",
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
    slug: "chuyen-vien-sourcing-data-insights-specialist",
    title: "TUYỂN DỤNG: CHUYÊN VIÊN SOURCING & DATA INSIGHTS SPECIALIST",
    day: "06",
    month: "Th3",
    date: "06/03/2026",
    categories: ["Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "15 – 25 triệu",
    image: "/images/about/pd-showroom-2.jpg",
    description:
      "1. GIỚI THIỆU VỀ VINFAST PHƯƠNG ĐÔNG VinFast Phương Đông là đơn vị tiên phong trong phân phối ô tô điện VinFast...",
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
    slug: "chuyen-vien-content-marketing",
    title: "TUYỂN DỤNG: CHUYÊN VIÊN CONTENT MARKETING",
    day: "11",
    month: "Th2",
    date: "11/02/2026",
    categories: ["Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "12 – 15 triệu",
    image: "/images/about/pd-showroom-3.jpg",
    description:
      "1. GIỚI THIỆU VỀ VINFAST PHƯƠNG ĐÔNG VinFast Phương Đông là hệ thống đại lý hàng đầu mang giải pháp xanh...",
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
    slug: "ke-toan-truong-vinfast-phuong-dong",
    title: "Tuyển Dụng Kế Toán Trưởng – VinFast Phương Đông – Thu nhập: 25 – 30 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Tài chính & Kế toán",
    location: "Trụ sở Hà Nội",
    salary: "25 – 30 triệu",
    image: "/images/about/pd-delivery-1.jpg",
    description:
      "VinFast Phương Đông tuyển dụng kế toán trưởng. Thu nhập 25 - 30 triệu. Quản lý toàn bộ hệ thống tài chính kế toán đại lý...",
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
    slug: "chuyen-vien-dao-tao-noi-bo",
    title: "Tuyển Dụng Chuyên Viên Đào Tạo Nội Bộ – VinFast Phương Đông – Thu nhập: 12 – 20 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "12 – 20 triệu",
    image: "/images/about/pd-delivery-2.jpg",
    description:
      "VinFast Phương Đông tuyển dụng 2 Chuyên viên đào tạo nội bộ. Thu nhập 12 - 20 triệu. Xây dựng giáo trình và đào tạo kỹ năng...",
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
    slug: "nhan-vien-tieng-trung-thuong-mai",
    title: "Tuyển Dụng Nhân Viên Tiếng Trung Thương Mại – VinFast Phương Đông – Thu nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "15 – 25 triệu",
    image: "/images/about/pd-delivery-3.jpg",
    description:
      "VinFast Phương Đông tuyển dụng 4 Nhân viên tiếng Trung thương mại. Thu nhập hấp dẫn. Phiên dịch và làm việc cùng đối tác quốc tế...",
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
    slug: "tro-ly-chu-tich-tong-giam-doc",
    title: "Tuyển Dụng Trợ Lý Chủ Tịch/Tổng Giám Đốc – VinFast Phương Đông – Thu nhập: 25 – 35 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "25 – 35 triệu",
    image: "/images/about/pd-delivery-4.jpg",
    description:
      "VinFast Phương Đông tuyển dụng 4 Trợ Lý Chủ Tịch/Tổng Giám Đốc. Hỗ trợ điều hành chiến lược kinh doanh toàn hệ thống...",
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
        "Chế độ phúc lợi toàn diện bậc nhất hệ thống Phương Đông.",
      ],
    },
  },
  {
    id: 8,
    slug: "tro-ly-ban-lanh-dao",
    title: "Tuyển Dụng Trợ Lý Ban Lãnh Đạo – VinFast Phương Đông – Thu nhập: 25 – 30 triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "25 – 30 triệu",
    image: "/images/about/pd-delivery-5.jpg",
    description:
      "VinFast Phương Đông tuyển dụng 4 Trợ Lý Ban Lãnh Đạo. Điều phối các phòng ban chức năng, giám sát thực thi mục tiêu OKR...",
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
    slug: "tro-ly-tieng-trung",
    title: "Tuyển Dụng Trợ Lý Tiếng Trung – VinFast Phương Đông – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Trụ sở Hà Nội",
    salary: "18 – 28 triệu",
    image: "/images/banners/banner-he-thong-phuong-dong.jpg",
    description:
      "VinFast Phương Đông tuyển dụng 1 Trợ Lý Tiếng Trung. Lương thưởng cạnh tranh, hỗ trợ trực tiếp các chương trình hợp tác quốc tế...",
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
    slug: "giam-doc-kinh-doanh-vinfast",
    title: "Tuyển Dụng Giám Đốc Kinh Doanh – VinFast Phương Đông – Thu Nhập 30-60 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "30 – 60 triệu",
    image: "/images/banners/banner-lai-thu-phuong-dong.jpg",
    description:
      "VinFast Phương Đông tuyển dụng Giám đốc kinh doanh ô tô. Lãnh đạo đội ngũ tư vấn bán hàng toàn hệ thống showroom...",
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
    slug: "ky-thuat-vien-sua-chua-chung-o-to",
    title: "Tuyển Dụng Kỹ Thuật Viên Sửa Chữa Chung Ô Tô VinFast – Thu Nhập 9-18 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kỹ thuật & Xưởng",
    location: "Hà Nội / Quảng Ninh",
    salary: "9 – 18 triệu",
    image: "/images/about/pd-showroom-1.jpg",
    description:
      "VinFast Phương Đông tuyển dụng Kỹ thuật viên bảo dưỡng & sửa chữa chung xưởng dịch vụ. Đào tạo trực tiếp từ hãng...",
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
    slug: "nhan-vien-kho-xuong-dich-vu",
    title: "Tuyển Dụng Nhân Viên Kho Xưởng Dịch Vụ Ô Tô VinFast – Thu Nhập 9-14 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kỹ thuật & Xưởng",
    location: "Hà Nội / Quảng Ninh",
    salary: "9 – 14 triệu",
    image: "/images/about/pd-showroom-2.jpg",
    description:
      "VinFast Phương Đông tuyển dụng Nhân viên quản lý kho phụ tùng chính hãng xưởng dịch vụ ô tô...",
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
    slug: "nhan-vien-content-marketing-12-15-trieu",
    title: "Tuyển Dụng Nhân Viên Content Marketing – VinFast Phương Đông – Thu Nhập 12-15 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "12 – 15 triệu",
    image: "/images/about/pd-showroom-3.jpg",
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
    slug: "thuc-tap-sinh-marketing",
    title: "Tuyển Thực Tập Sinh Marketing – VinFast Phương Đông – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "Trợ cấp hấp dẫn",
    image: "/images/about/pd-delivery-1.jpg",
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
    slug: "nhan-vien-kinh-doanh-b2b",
    title: "Tuyển Dụng Nhân Viên Kinh Doanh B2B – VinFast Phương Đông – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "20 – 45 triệu",
    image: "/images/about/pd-delivery-2.jpg",
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
    slug: "nhan-vien-media-quay-dung-video",
    title: "Tuyển Dụng Nhân Viên Media Quay Dựng Video – Lương 15-18 Triệu/Tháng",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "15 – 18 triệu",
    image: "/images/about/pd-delivery-3.jpg",
    description:
      "Sản xuất các thước phim ấn tượng ghi dấu hành trình chuyển đổi xanh của các chủ xe VinFast Phương Đông...",
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
    slug: "truong-phong-kinh-doanh-vinfast",
    title: "Tuyển Dụng Trưởng Phòng Kinh Doanh – VinFast Phương Đông – Thu Nhập 20-50 Triệu",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "20 – 50 triệu",
    image: "/images/about/pd-delivery-4.jpg",
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
    slug: "nhan-vien-kinh-doanh-tu-van-ban-hang",
    title: "Tuyển Dụng Nhân Viên Kinh Doanh – VinFast Phương Đông – Thu Nhập Hấp Dẫn",
    day: "16",
    month: "Th8",
    date: "16/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Kinh doanh & Bán hàng",
    location: "Hệ thống Showroom",
    salary: "15 – 45 triệu",
    image: "/images/about/pd-delivery-5.jpg",
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
    slug: "chuyen-vien-content-visual-marketing",
    title: "Tuyển Dụng Chuyên viên Content & Visual Marketing – Lương 10-20 Triệu/Tháng",
    day: "15",
    month: "Th8",
    date: "15/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Marketing & Media",
    location: "Trụ sở Hà Nội",
    salary: "10 – 20 triệu",
    image: "/images/banners/banner-he-thong-phuong-dong.jpg",
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
    slug: "chuyen-gia-an-ninh-quan-ly-doi-bao-ve",
    title: "Tuyển Dụng Chuyên Gia An Ninh Nội Bộ & Quản Lý Đội Bảo Vệ",
    day: "15",
    month: "Th8",
    date: "15/08/2025",
    categories: ["Tin nội bộ", "Tin tuyển dụng"],
    department: "Nhân sự & Ban Lãnh đạo",
    location: "Hệ thống Showroom",
    salary: "12 – 18 triệu",
    image: "/images/banners/banner-lai-thu-phuong-dong.jpg",
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

export const DEPARTMENTS = [
  "Tất cả",
  "Kinh doanh & Bán hàng",
  "Marketing & Media",
  "Kỹ thuật & Xưởng",
  "Tài chính & Kế toán",
  "Nhân sự & Ban Lãnh đạo",
];

export const LOCATIONS = [
  "Tất cả địa điểm",
  "Trụ sở Hà Nội",
  "Hà Nội / Quảng Ninh",
  "Hệ thống Showroom",
];

export const SALARY_RANGES = [
  "Tất cả mức lương",
  "Trên 25 triệu",
  "15 – 25 triệu",
  "Dưới 15 triệu",
];

export function getAllJobs(): Job[] {
  return JOBS_DATA;
}

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS_DATA.find((j) => j.slug === slug || String(j.id) === slug);
}

export function getRelatedJobs(currentId: number, limit = 3): Job[] {
  return JOBS_DATA.filter((j) => j.id !== currentId).slice(0, limit);
}
